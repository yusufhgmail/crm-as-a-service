import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type Locale = 'en' | 'se';
type Message = { role: 'assistant' | 'user'; text: string };

type Assessment = {
  opportunity: string;
  whoBenefits: string;
  whyThisStart: string;
  fit: string;
};

type AssessmentResponse = {
  message: string;
  state: 'question' | 'email' | 'complete';
  quickReplies: string[];
  assessment: Assessment | null;
  facts: {
    company: string;
    currentSetup: string;
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
            whyThisStart: { type: 'string' },
            fit: { type: 'string' },
          },
          required: ['opportunity', 'whoBenefits', 'whyThisStart', 'fit'],
        },
      ],
    },
    facts: {
      type: 'object',
      additionalProperties: false,
      properties: {
        company: { type: 'string' },
        currentSetup: { type: 'string' },
        teamSize: { type: 'string' },
        primaryPain: { type: 'string' },
      },
      required: ['company', 'currentSetup', 'teamSize', 'primaryPain'],
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
      strong: ['This looks like a strong candidate for an early design-partner CRM.', 'Det här verkar vara en stark kandidat för ett tidigt CRM-bygge som designpartner.'],
      possible: ['This looks worth reviewing as a focused adaptive CRM.', 'Det här verkar värt att granska som ett fokuserat anpassningsbart CRM.'],
      early: ['The opportunity is still early, but the next useful question is now clearer.', 'Behovet är fortfarande i ett tidigt skede, men nästa viktiga fråga är nu tydligare.'],
      'not-fit': ['A standard free CRM may be the better starting point for this need.', 'Ett kostnadsfritt standard-CRM kan vara en bättre start för det här behovet.'],
    };
    result.assessment.fit = fitMessages[result.qualification][locale === 'se' ? 1 : 0];
  }
  if (result.state === 'email') {
    result.message = locale === 'se'
      ? 'Ditt förslag till anpassningsbart CRM är klart. Ange din jobbmejl så visas det här och vi kan bedöma om företaget passar för ett designpartnerbygge utan byggkostnad. Inget konto kopplas nu.'
      : 'Your adaptive CRM proposal is ready. Enter your work email so it can be shown here and we can review whether the company fits the design-partner build without a build fee. No account is connected now.';
  }
  if (result.state === 'complete') {
    result.message = locale === 'se'
      ? 'Tack. Ditt förslag till anpassningsbart CRM visas nedan. Vi granskar ansökan och kontaktar dig om företaget passar för ett av designpartnerbyggena.'
      : 'Thank you. Your adaptive CRM proposal is shown below. We will review the application and contact you if the company fits one of the design-partner builds.';
  }
  result.quickReplies = result.state === 'question' && Array.isArray(result.quickReplies)
    ? result.quickReplies.slice(0, 4)
    : [];
  return result;
}

function plainSwedish(text: string) {
  return text
    .replace(/\bNi\b/g, 'Teamet')
    .replace(/\bni\b/g, 'teamet')
    .replace(/\bErt\b/g, 'Teamets')
    .replace(/\bert\b/g, 'teamets')
    .replace(/\bEra\b/g, 'Teamets')
    .replace(/\bera\b/g, 'teamets')
    .replace(/\bEr (?=[A-Za-zÅÄÖåäö])/g, 'Teamets ')
    .replace(/\ber (?=[A-Za-zÅÄÖåäö])/g, 'teamets ')
    .replace(/\bEr\b/g, 'Teamet')
    .replace(/\ber\b/g, 'teamet')
    .replace(/\bImplementera\b/g, 'Bygg')
    .replace(/\bimplementera\b/g, 'bygga')
    .replace(/\bImplementering\b/g, 'Bygget')
    .replace(/\bimplementering\b/g, 'bygget')
    .replace(/\bCRM[‑-]?lösningen\b/gi, 'CRM-systemet')
    .replace(/\bCRM[‑-]?lösningar\b/gi, 'CRM-system')
    .replace(/\bCRM[‑-]?lösning\b/gi, 'CRM-system')
    .replace(/\bLösningen\b/g, 'CRM-systemet')
    .replace(/\blösningen\b/g, 'CRM-systemet')
    .replace(/\bLösningar\b/g, 'CRM-system')
    .replace(/\blösningar\b/g, 'CRM-system')
    .replace(/\bLösning\b/g, 'CRM-system')
    .replace(/\blösning\b/g, 'CRM-system')
    .replace(/\bSmärtpunkter\b/g, 'Problem')
    .replace(/\bsmärtpunkter\b/g, 'problem')
    .replace(/\bSmärtpunkt\b/g, 'Problem')
    .replace(/\bsmärtpunkt\b/g, 'problem')
    .replace(/\bAd hoc\b/g, 'Från gång till gång')
    .replace(/\bad hoc\b/g, 'från gång till gång');
}

function cleanVisitorCopy(result: AssessmentResponse, locale: Locale) {
  if (locale === 'se') {
    result.message = plainSwedish(result.message);
    result.quickReplies = result.quickReplies.map(plainSwedish);
    if (result.assessment) {
      result.assessment.opportunity = plainSwedish(result.assessment.opportunity);
      result.assessment.whoBenefits = plainSwedish(result.assessment.whoBenefits);
      result.assessment.whyThisStart = plainSwedish(result.assessment.whyThisStart);
      result.assessment.fit = plainSwedish(result.assessment.fit);
    }
  }

  if (result.state === 'question') {
    const firstQuestionEnd = result.message.indexOf('?');
    if (firstQuestionEnd >= 0) result.message = result.message.slice(0, firstQuestionEnd + 1);
  }
  return result;
}

function fallbackAssessment(messages: Message[], locale: Locale, hasEmail: boolean): AssessmentResponse {
  const answers = messages.filter((message) => message.role === 'user').map((message) => message.text);
  const state: AssessmentResponse['state'] = hasEmail ? 'complete' : answers.length >= 5 ? 'email' : 'question';
  const nextQuestions = locale === 'se'
    ? [
        'Hur många personer behöver följa upp leads och kunder?',
        'Var brukar information eller uppföljning tappas bort idag?',
        'Hur fördelar teamet ansvaret för varje lead?',
        'Vad ska en gemensam översikt visa för att arbetet ska bli enklare?',
      ]
    : [
        'How many people need to follow up leads and customers?',
        'Where does information or follow-up get lost today?',
        'How does the team assign ownership for each lead?',
        'What should a shared view show to make the work easier?',
      ];

  const assessment = state === 'question' ? null : locale === 'se'
    ? {
        opportunity: 'Börja med en gemensam översikt över leads, kundhistorik, ansvarig person och nästa steg.',
        whoBenefits: 'Personerna som följer upp leads och kunder får samma aktuella bild.',
        whyThisStart: 'Det samlar utspridda uppdateringar och gör ansvar och nästa steg tydliga utan att CRM-grunden blir för stor.',
        fit: 'Det här verkar värt att granska som ett fokuserat anpassningsbart CRM.',
      }
    : {
        opportunity: 'Start with one shared view of leads, customer history, ownership and next steps.',
        whoBenefits: 'The people who follow up leads and customers get the same current view.',
        whyThisStart: 'It brings scattered updates together and makes ownership and the next action clear without making the CRM core too large.',
        fit: 'This looks worth reviewing as a focused adaptive CRM.',
      };

  return {
    message: state === 'question'
      ? nextQuestions[Math.min(Math.max(answers.length - 1, 0), nextQuestions.length - 1)]
      : locale === 'se'
        ? 'Ditt förslag till anpassningsbart CRM är klart.'
        : 'Your adaptive CRM proposal is ready.',
    state,
    quickReplies: [],
    assessment,
    facts: {
      company: '',
      currentSetup: answers[0] || '',
      teamSize: answers[1] || '',
      primaryPain: answers[2] || '',
    },
    qualification: 'possible',
  };
}

async function generateAssessment(
  bindings: WorkerBindings,
  aiMessages: Array<{ role: 'system' | 'assistant' | 'user'; content: string }>,
  locale: Locale,
) {
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
      if (parsed) return cleanVisitorCopy(parsed, locale);
      lastError = new Error(`${model} returned an invalid response.`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('No assessment model was available.');
}

function systemPrompt(locale: Locale, hasEmail: boolean, userAnswerCount: number) {
  const language = locale === 'se' ? 'natural Swedish' : 'natural English';
  return `You are the CRM From Within early-access assistant for established SMEs that need a useful CRM but do not want to design, customize or administer one themselves.

Speak in ${language}. Be warm, concise and commercially perceptive. Never use internal scoring language with the visitor.
${locale === 'se' ? 'Address the visitor as du/din/ditt, never ni/er/ert/era. When several people are meant, say teamet, säljarna or medarbetarna. Write short, idiomatic Swedish, not literal translations of English business language. Use familiar terms such as bygga, arbetssätt, problem, CRM-byte or migrering. Never use implementera, lösning, smärtpunkt or ad hoc.' : ''}

Your primary visitor has no useful CRM administrator and either no useful CRM or a basic system that does not fit. They may track leads and customers in spreadsheets, inboxes, notes, chat or memory. They want a CRM that works and keeps adapting without becoming a CRM project. If the visitor has an established HubSpot, Salesforce or similar CRM that they want to replace and own, explain briefly that Company Native is the separate migration service and continue only if they still want to explore a managed adaptive CRM.

Your job is to understand: the company and industry, how it tracks leads and customers today, the number and roles of people who need the CRM, where information or follow-up gets lost, what is unique about the customer process, which work is repeated, and what the most useful CRM should make easier. Ask exactly one relevant question at a time. Adapt the next question to what the visitor already said. Do not repeat a question. Do not ask for customer names, employee names, deal details, credentials, financial account data or any sensitive personal information.

For visitors without a CRM, listen for concrete signs that a shared system could help: spreadsheet customer lists, follow-up depending on memory, important context in inboxes or notes, manual copying between people, missed handoffs, unclear ownership and reporting that must be assembled by hand. For visitors with a CRM, listen for confirmed signs that the current system no longer fits. Use only signs the visitor actually confirms; do not assume or invent them.

After 4 to 6 useful visitor answers, set state to "email". In that response, give a brief, specific preview of the most useful adaptive CRM starting point and ask for a work email so the proposal can be shown on screen and reviewed for the limited design-partner program without a build fee. Explain that no inbox or account is connected at this step. Include an assessment object with: the best CRM workflow to begin with, who it helps, why this is the right place to start, and whether the company appears suitable for a focused adaptive CRM. The assessment.fit field must be a short visitor-facing sentence, never a score or a word such as strong, possible, early or not-fit. Keep each field to 1–2 short sentences.

${hasEmail ? 'A valid work email has now been supplied. Set state to "complete". Thank the visitor, say their adaptive CRM proposal is ready below, and explain that the application will be reviewed and a person may contact them if the company fits a design-partner build. Do not claim an email was sent. Return the final assessment object based only on the conversation. Do not ask another question.' : 'Do not set state to "complete" and never invent an email.'}
${!hasEmail && userAnswerCount >= 5 ? `The visitor has now answered ${userAnswerCount} questions. Set state to "email" now, include the complete assessment object and do not ask another question.` : ''}

Set qualification to strong only when customer work is important, the pain is concrete, multiple people depend on a shared view and an adaptive CRM could remove meaningful administration or workarounds. Use possible for a real but less-developed need, early when the visitor is mainly exploring, and not-fit when a standard free CRM is likely sufficient, the problem is unrelated or there is no meaningful CRM need. Having no CRM must never lower the qualification by itself.

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
    result.assessment.whyThisStart,
    result.assessment.fit,
    result.facts.company || null,
    result.facts.currentSetup || null,
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
  const validEmail = isWorkEmail(body.email) ? body.email : null;
  if (hasEmail && !validEmail) {
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
    const userAnswerCount = messages.filter((message) => message.role === 'user').length;
    const aiMessages = [
      { role: 'system' as const, content: systemPrompt(locale, hasEmail, userAnswerCount) },
      ...messages.map((message) => ({ role: message.role, content: message.text })),
      ...(hasEmail ? [{ role: 'user' as const, content: '[A valid work email was supplied separately and must not be repeated in the response.]' }] : []),
    ];

    let parsed: AssessmentResponse;
    try {
      parsed = await generateAssessment(bindings, aiMessages, locale);
    } catch (error) {
      console.warn('Assessment models failed; using the structured fallback.', error);
      parsed = fallbackAssessment(messages, locale, hasEmail);
    }
    const result = normalizeResult(parsed, userAnswerCount, hasEmail, locale);
    if (validEmail) {
      await saveAssessment(bindings, validEmail, locale, messages, result, sessionId);
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
