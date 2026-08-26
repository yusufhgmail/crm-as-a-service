import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type Locale = 'en' | 'se';
type Message = { role: 'assistant' | 'user'; text: string };

type Assessment = {
  opportunity: string;
  whoBenefits: string;
  whyBeforeMigration: string;
  fit: string;
};

type AssessmentResponse = {
  message: string;
  state: 'question' | 'email' | 'complete';
  quickReplies: string[];
  assessment: Assessment | null;
  facts: {
    company: string;
    currentCrm: string;
    teamSize: string;
    primaryPain: string;
  };
  qualification: 'strong' | 'possible' | 'early' | 'not-fit';
};

type WorkerBindings = {
  AI: Ai;
  LEADS_DB: D1Database;
  ASSESSMENT_LIMITER: RateLimit;
};

const MODEL = '@cf/openai/gpt-oss-120b' as const;
const FALLBACK_MODEL = '@cf/zai-org/glm-4.7-flash' as const;
const MAX_MESSAGES = 14;
const MAX_TEXT_LENGTH = 1_200;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const responseSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    message: { type: 'string' },
    state: { type: 'string', enum: ['question', 'email', 'complete'] },
    quickReplies: { type: 'array', items: { type: 'string' }, maxItems: 4 },
    assessment: {
      anyOf: [
        { type: 'null' },
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            opportunity: { type: 'string' },
            whoBenefits: { type: 'string' },
            whyBeforeMigration: { type: 'string' },
            fit: { type: 'string' },
          },
          required: ['opportunity', 'whoBenefits', 'whyBeforeMigration', 'fit'],
        },
      ],
    },
    facts: {
      type: 'object',
      additionalProperties: false,
      properties: {
        company: { type: 'string' },
        currentCrm: { type: 'string' },
        teamSize: { type: 'string' },
        primaryPain: { type: 'string' },
      },
      required: ['company', 'currentCrm', 'teamSize', 'primaryPain'],
    },
    qualification: {
      type: 'string',
      enum: ['strong', 'possible', 'early', 'not-fit'],
    },
  },
  required: ['message', 'state', 'quickReplies', 'assessment', 'facts', 'qualification'],
} as const;

function cleanMessages(value: unknown): Message[] | null {
  if (!Array.isArray(value) || value.length > MAX_MESSAGES) return null;

  const messages: Message[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const role = 'role' in item ? item.role : null;
    const text = 'text' in item ? item.text : null;
    if ((role !== 'assistant' && role !== 'user') || typeof text !== 'string') return null;
    const clean = text.trim().slice(0, MAX_TEXT_LENGTH);
    if (!clean) return null;
    messages.push({ role, text: clean });
  }
  return messages;
}

function isWorkEmail(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function parseModelResponse(value: unknown): AssessmentResponse | null {
  if (!value || typeof value !== 'object' || !('choices' in value)) return null;
  const choices = value.choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== 'object') return null;
  const choice = choices[0] as { message?: { content?: string | null } };
  if (!choice.message?.content) return null;

  try {
    const content = choice.message.content.trim();
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start < 0 || end <= start) return null;
    return JSON.parse(content.slice(start, end + 1)) as AssessmentResponse;
  } catch {
    return null;
  }
}

function normalizeResult(result: AssessmentResponse, userAnswerCount: number, hasEmail: boolean, locale: Locale) {
  if (hasEmail) result.state = 'complete';
  else if (userAnswerCount < 4) result.state = 'question';
  else if (userAnswerCount >= 6) result.state = 'email';

  if (result.state === 'question') result.assessment = null;
  if (result.state !== 'question' && (!result.assessment || !result.assessment.opportunity)) {
    throw new Error('The assessment model did not produce an assessment.');
  }
  if (result.assessment && /^(strong|possible|early|not[- ]?fit)$/i.test(result.assessment.fit.trim())) {
    const fitMessages: Record<AssessmentResponse['qualification'], [string, string]> = {
      strong: ['Company Native appears to be a strong fit for this need.', 'Company Native verkar passa det här behovet mycket väl.'],
      possible: ['This looks worth exploring as a small first pilot.', 'Det här verkar värt att undersöka i en liten första pilot.'],
      early: ['The opportunity is still early, but the next useful question is now clearer.', 'Behovet är fortfarande i ett tidigt skede, men nästa viktiga fråga är nu tydligare.'],
      'not-fit': ['This does not yet look like the right kind of CRM problem for the Company Native service.', 'Det här verkar ännu inte vara rätt sorts CRM-problem för Company Natives tjänst.'],
    };
    result.assessment.fit = fitMessages[result.qualification][locale === 'se' ? 1 : 0];
  }
  if (result.state === 'email') {
    result.message = locale === 'se'
      ? 'Din första bedömning är klar. Ange din jobbmejl så kan den sparas och visas här. Det bokar inte ett säljsamtal.'
      : 'Your initial assessment is ready. Enter your work email so it can be saved and shown here. This does not book a sales call.';
  }
  if (result.state === 'complete') {
    result.message = locale === 'se'
      ? 'Tack. Din bedömning är klar nedan och har sparats för uppföljning om det verkar finnas något relevant att prata vidare om.'
      : 'Thank you. Your assessment is ready below and has been saved for follow-up if the opportunity looks useful.';
  }
  result.quickReplies = result.state === 'question' && Array.isArray(result.quickReplies)
    ? result.quickReplies.slice(0, 4)
    : [];
  return result;
}

async function generateAssessment(bindings: WorkerBindings, aiMessages: Array<{ role: 'system' | 'assistant' | 'user'; content: string }>) {
  let lastError: unknown;
  for (const model of [MODEL, FALLBACK_MODEL] as const) {
    try {
      const raw = await bindings.AI.run(model, {
        messages: aiMessages,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'crm_assessment',
            strict: true,
            schema: responseSchema,
          },
        },
        temperature: 0.35,
        max_completion_tokens: 900,
      });
      const parsed = parseModelResponse(raw);
      if (parsed) return parsed;
      lastError = new Error(`${model} returned an invalid response.`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('No assessment model was available.');
}

function systemPrompt(locale: Locale, hasEmail: boolean) {
  const language = locale === 'se' ? 'natural Swedish' : 'natural English';
  return `You are the Company Native CRM assessment assistant for B2B small and medium-sized companies.

Speak in ${language}. Be warm, concise and commercially perceptive. Never use internal scoring language with the visitor.
${locale === 'se' ? 'Address the visitor as du/din/ditt, never ni/er/ert. Write idiomatic Swedish, not literal translations of English business language. Prefer familiar terms such as CRM-byte or migrering, kontaktformulär, driftmiljö and arbetssätt.' : ''}

Your job is to understand: the company and industry, current CRM or planned CRM, number and roles of users, the most painful workaround or delay, the work they want removed, and whether a small no-migration pilot could create immediate value. Ask exactly one relevant question at a time. Adapt the next question to what the visitor already said. Do not repeat a question. Do not ask for customer names, employee names, deal details, credentials, financial account data or any sensitive personal information.

Listen for concrete signs that an established CRM no longer fits: spreadsheets beside the CRM, excessive custom fields, special reports only one person can produce, manual copying between teams, important context in inboxes or notes, and handoffs that happen outside the system. Use only signs the visitor actually confirms; do not assume or invent them.

After 4 to 6 useful visitor answers, set state to "email". In that response, give a brief, specific preview of the likely first opportunity and ask for a work email so the assessment can be saved and shown on screen. Explain that this is not booking a sales call. Include an assessment object with: the strongest small improvement, who it helps, why it can be tested before migration, and whether Company Native appears sensible. The assessment.fit field must be a short visitor-facing sentence, never a score or a word such as strong, possible, early or not-fit. Keep each field to 1–2 short sentences.

${hasEmail ? 'A valid work email has now been supplied. Set state to "complete". Thank the visitor, say their assessment is ready below and has been saved so the team can follow up if the opportunity looks useful. Do not claim an email was or will be sent. Return the final assessment object based only on the conversation. Do not ask another question.' : 'Do not set state to "complete" and never invent an email.'}

Set qualification to strong only when the CRM is central, the pain is concrete, multiple people depend on it and a useful pilot is plausible. Use possible for a real but less-developed need, early when the visitor is mainly exploring, and not-fit when the problem is unrelated or there is no meaningful CRM need.

Return only JSON matching the supplied schema. quickReplies may contain up to four short, relevant choices for the next question; otherwise use an empty array. Use empty strings for unknown facts.`;
}

async function saveAssessment(
  bindings: WorkerBindings,
  email: string,
  locale: Locale,
  messages: Message[],
  result: AssessmentResponse,
  sessionId: string | null,
) {
  if (!result.assessment) return;
  const id = crypto.randomUUID();
  await bindings.LEADS_DB.prepare(`
    INSERT INTO assessments (
      id, locale, email, transcript_json, opportunity, who_benefits,
      why_before_migration, fit, company, current_crm, team_size,
      primary_pain, qualification
      , session_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    locale,
    email.trim().toLowerCase(),
    JSON.stringify(messages),
    result.assessment.opportunity,
    result.assessment.whoBenefits,
    result.assessment.whyBeforeMigration,
    result.assessment.fit,
    result.facts.company || null,
    result.facts.currentCrm || null,
    result.facts.teamSize || null,
    result.facts.primaryPain || null,
    result.qualification,
    sessionId,
  ).run();
}

export async function POST(request: Request) {
  let body: { locale?: unknown; messages?: unknown; email?: unknown; sessionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const locale: Locale = body.locale === 'se' ? 'se' : 'en';
  const messages = cleanMessages(body.messages);
  const sessionId = typeof body.sessionId === 'string' && UUID.test(body.sessionId) ? body.sessionId : null;
  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: 'A conversation is required.' }, { status: 400 });
  }

  const hasEmail = body.email !== undefined;
  if (hasEmail && !isWorkEmail(body.email)) {
    return NextResponse.json({
      error: locale === 'se' ? 'Ange en giltig jobbmejl.' : 'Please enter a valid work email.',
    }, { status: 400 });
  }

  try {
    const bindings = env as unknown as WorkerBindings;
    const rateKey = request.headers.get('CF-Connecting-IP')
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || 'local-development';
    const rateLimit = await bindings.ASSESSMENT_LIMITER.limit({ key: rateKey });
    if (!rateLimit.success) {
      return NextResponse.json({
        error: locale === 'se'
          ? 'För många svar på kort tid. Vänta en minut och försök igen.'
          : 'Too many answers in a short time. Wait a minute and try again.',
      }, { status: 429 });
    }
    const aiMessages = [
      { role: 'system' as const, content: systemPrompt(locale, hasEmail) },
      ...messages.map((message) => ({ role: message.role, content: message.text })),
      ...(hasEmail ? [{ role: 'user' as const, content: '[A valid work email was supplied separately and must not be repeated in the response.]' }] : []),
    ];

    const parsed = await generateAssessment(bindings, aiMessages);
    const userAnswerCount = messages.filter((message) => message.role === 'user').length;
    const result = normalizeResult(parsed, userAnswerCount, hasEmail, locale);
    if (hasEmail) {
      await saveAssessment(bindings, body.email, locale, messages, result, sessionId);
    }

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Assessment failed', error);
    return NextResponse.json({
      error: locale === 'se'
        ? 'Assistenten kunde inte svara just nu. Försök igen om en stund.'
        : 'The assistant could not respond just now. Please try again shortly.',
    }, { status: 503 });
  }
}
