'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { getFunnelSessionId, trackFunnelEvent } from './funnel';

const Arrow = () => <span aria-hidden="true">→</span>;

const englishUseCases = [
  {
    number: '01',
    type: 'SERVICE & DELIVERY',
    title: 'Run delivery your way',
    text: 'Connect the sale to onboarding, delivery, billing and follow-up. Everyone sees what should happen next—without another spreadsheet.',
    tags: ['Handoffs', 'Delivery', 'Billing'],
  },
  {
    number: '02',
    type: 'RECRUITMENT',
    title: 'Match candidates to real opportunities',
    text: 'Track candidates and recruitment projects in one place. Let the system surface the strongest matches and keep every conversation moving.',
    tags: ['Candidates', 'Matching', 'Projects'],
  },
  {
    number: '03',
    type: 'CONSTRUCTION',
    title: 'Turn opportunities into projects',
    text: 'Track bids, documents, contractors and milestones. Prepare quotes automatically and carry the full history into delivery.',
    tags: ['Bids', 'Projects', 'Documents'],
  },
  {
    number: '04',
    type: 'INBOUND SALES',
    title: 'Never lose a good lead',
    text: 'Capture, enrich and distribute every lead. Give salespeople a calling queue, record the outcome and update the forecast automatically.',
    tags: ['Lead routing', 'Dialler', 'Forecasting'],
  },
];

const swedishUseCases = [
  {
    number: '01',
    type: 'SERVICE & LEVERANS',
    title: 'Driv leveransen på ditt sätt',
    text: 'Koppla försäljningen till onboarding, leverans, fakturering och uppföljning. Alla ser vad som ska hända härnäst—utan ännu ett kalkylblad.',
    tags: ['Överlämningar', 'Leverans', 'Fakturering'],
  },
  {
    number: '02',
    type: 'REKRYTERING',
    title: 'Matcha kandidater med rätt uppdrag',
    text: 'Följ kandidater och rekryteringsuppdrag på samma plats. Låt systemet hitta de starkaste matchningarna och hålla varje dialog i rörelse.',
    tags: ['Kandidater', 'Matchning', 'Uppdrag'],
  },
  {
    number: '03',
    type: 'BYGG',
    title: 'Gör affärer till projekt',
    text: 'Följ anbud, dokument, underleverantörer och milstolpar. Skapa offerter automatiskt och ta med hela historiken in i leveransen.',
    tags: ['Anbud', 'Projekt', 'Dokument'],
  },
  {
    number: '04',
    type: 'INKOMMANDE FÖRSÄLJNING',
    title: 'Tappa aldrig en bra lead',
    text: 'Samla in, berika och fördela varje lead. Ge säljarna en ringkö, registrera utfallet och uppdatera prognosen automatiskt.',
    tags: ['Leadfördelning', 'Ringverktyg', 'Prognos'],
  },
];

const englishSystemSteps = [
  ['Map the current CRM', 'With permission, we inspect the objects, fields, workflows, integrations, reports and activity your company actually relies on.'],
  ['Understand the intent', 'Your people explain why exceptions, handoffs and reports matter. Usage shows what happens; consultation shows what it means.'],
  ['Build the replacement proof', 'We combine a tested CRM foundation with generated code for the data model, workflow and interfaces that should be unique to your company.'],
  ['Reconcile the data', 'Every imported record, relationship and permission is checked against the current CRM before the proof can be trusted.'],
  ['Run both systems', 'A small group performs real work in the replacement while the existing CRM stays live. The evidence decides whether to continue.'],
  ['Move and keep improving', 'We migrate only after the acceptance tests pass, then operate the owned system or hand it over for your company to run.'],
];

const swedishSystemSteps = [
  ['Kartlägg nuvarande CRM', 'Med godkännande granskar vi objekt, fält, arbetsflöden, integrationer, rapporter och aktivitet som företaget faktiskt förlitar sig på.'],
  ['Förstå avsikten', 'Teamet förklarar varför undantag, överlämningar och rapporter spelar roll. Användningen visar vad som händer; samtalen visar vad det betyder.'],
  ['Bygg ersättningsbeviset', 'Vi kombinerar en testad CRM-grund med genererad kod för datamodellen, arbetsflödet och gränssnitten som ska vara unika för företaget.'],
  ['Stäm av datan', 'Varje importerad post, relation och behörighet kontrolleras mot nuvarande CRM innan ersättningen kan betraktas som pålitlig.'],
  ['Kör båda systemen', 'En liten grupp utför riktigt arbete i ersättningen medan det befintliga CRM-systemet fortsätter. Underlaget avgör om det är värt att gå vidare.'],
  ['Byt och fortsätt förbättra', 'Vi migrerar först när acceptanstesterna är godkända och driver sedan det ägda systemet eller lämnar över det till företaget.'],
];

const englishPhases = [
  {
    version: 'PROOF',
    title: 'Replace one painful workflow first.',
    text: 'Choose a valuable part of HubSpot or Salesforce that creates repeated work or does not fit. We build the owned replacement beside it.',
    highlight: 'A paid, bounded proof—not a migration commitment.',
  },
  {
    version: 'COMPARE',
    title: 'Let real work decide which system is better.',
    text: 'A small group completes the same work in both systems. We compare effort, adoption, accuracy, missing capabilities and operational risk.',
    highlight: 'The current CRM stays live throughout the proof.',
  },
  {
    version: 'DECIDE',
    title: 'See the migration and three-year cost before committing.',
    text: 'The proof shows what must be built, integrated and moved. We compare the complete replacement with licences, consultants, internal work and maintenance today.',
    highlight: 'If ownership is not better and economically credible, do not migrate.',
  },
  {
    version: 'OWN',
    title: 'Move only after the replacement proves itself.',
    text: 'Company Native migrates and reconciles the data, trains the team and handles cutover. Keep us as the operator or run the software elsewhere.',
    highlight: 'You keep the customer-specific code, data and freedom to leave.',
  },
];

const swedishPhases = [
  {
    version: 'BEVIS',
    title: 'Ersätt ett smärtsamt arbetsflöde först.',
    text: 'Välj en värdefull del av HubSpot eller Salesforce som skapar dubbelarbete eller inte passar. Vi bygger den ägda ersättningen bredvid.',
    highlight: 'Ett betalt, avgränsat bevis—inte ett migrationsåtagande.',
  },
  {
    version: 'JÄMFÖR',
    title: 'Låt riktigt arbete avgöra vilket system som är bättre.',
    text: 'En liten grupp utför samma arbete i båda systemen. Vi jämför arbetsinsats, användning, noggrannhet, saknade funktioner och operativ risk.',
    highlight: 'Nuvarande CRM fortsätter vara igång under hela beviset.',
  },
  {
    version: 'BESLUTA',
    title: 'Se migreringen och treårskostnaden före beslutet.',
    text: 'Beviset visar vad som måste byggas, kopplas och flyttas. Vi jämför hela ersättningen med dagens licenser, konsulter, interna arbete och underhåll.',
    highlight: 'Om ägandet inte är bättre och ekonomiskt trovärdigt bör du inte migrera.',
  },
  {
    version: 'ÄG',
    title: 'Byt först när ersättningen har bevisat sig.',
    text: 'Company Native migrerar och stämmer av datan, utbildar teamet och hanterar bytet. Behåll oss som operatör eller kör programvaran någon annanstans.',
    highlight: 'Du behåller kundkoden, datan och friheten att lämna.',
  },
];

type Message = { role: 'assistant' | 'user'; text: string };
type Locale = 'en' | 'se';
type AssessmentResult = {
  opportunity: string;
  whoBenefits: string;
  whyBeforeMigration: string;
  fit: string;
};

function Assessment({ locale }: { locale: Locale }) {
  const swedish = locale === 'se';
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: swedish
        ? 'Vilket CRM använder företaget idag?'
        : 'Which CRM does your company use today?',
    },
  ]);
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<'question' | 'email' | 'complete'>('question');
  const [quickReplies, setQuickReplies] = useState(['HubSpot', 'Salesforce', 'Pipedrive', swedish ? 'Något annat' : 'Something else']);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const [contactOpen, setContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactWorking, setContactWorking] = useState(false);
  const [contactComplete, setContactComplete] = useState(false);
  const [contactError, setContactError] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 1 && !working) return;
    messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [messages, working]);

  async function sendAnswer(value: string) {
    const clean = value.trim();
    if (!clean || state === 'complete' || working) return;

    const isEmailStep = state === 'email';
    const nextMessages = isEmailStep ? messages : [...messages, { role: 'user' as const, text: clean }];
    const answerStep = nextMessages.filter((message) => message.role === 'user').length;
    if (!isEmailStep) {
      if (answerStep === 1) void trackFunnelEvent('assessment_started');
      void trackFunnelEvent('assessment_answered', { step: answerStep });
    }
    if (!isEmailStep) setMessages(nextMessages);
    setAnswer('');
    setQuickReplies([]);
    setError('');
    setWorking(true);

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          messages: nextMessages,
          sessionId: getFunnelSessionId(),
          ...(isEmailStep ? { email: clean } : {}),
        }),
      });
      const data = await response.json() as {
        message?: string;
        state?: 'question' | 'email' | 'complete';
        quickReplies?: string[];
        assessment?: AssessmentResult | null;
        error?: string;
      };
      if (!response.ok || !data.message || !data.state) {
        throw new Error(data.error || (swedish ? 'Något gick fel.' : 'Something went wrong.'));
      }

      setMessages([...nextMessages, { role: 'assistant', text: data.message }]);
      setState(data.state);
      setQuickReplies(data.quickReplies || []);
      setResult(data.state === 'question' ? null : (data.assessment || null));
      if (data.state === 'email' && state !== 'email') {
        void trackFunnelEvent('assessment_email_requested', { step: answerStep });
      }
    } catch (caught) {
      void trackFunnelEvent('assessment_error', { location: isEmailStep ? 'email_submission' : 'answer_submission', step: answerStep });
      setError(caught instanceof Error ? caught.message : (swedish ? 'Något gick fel.' : 'Something went wrong.'));
      if (!isEmailStep) {
        setMessages(messages);
        setAnswer(clean);
      }
    } finally {
      setWorking(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    await sendAnswer(answer);
  }

  async function submitContact(event: FormEvent) {
    event.preventDefault();
    const email = contactEmail.trim();
    if (!email || contactWorking) return;

    setContactError('');
    setContactWorking(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, email, message: contactMessage.trim(), sessionId: getFunnelSessionId() }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || (swedish ? 'Något gick fel.' : 'Something went wrong.'));
      }
      setContactComplete(true);
      void trackFunnelEvent('contact_submitted');
    } catch (caught) {
      void trackFunnelEvent('contact_error', { location: 'contact_submission' });
      setContactError(caught instanceof Error ? caught.message : (swedish ? 'Något gick fel.' : 'Something went wrong.'));
    } finally {
      setContactWorking(false);
    }
  }

  function returnToAssessment() {
    setContactOpen(false);
    setContactError('');
  }

  return (
    <div className="assessment-window" id="assessment-chat">
      <div className="assessment-topbar">
        <div className="assistant-identity">
          <span className="assistant-orb">AI</span>
          <div><strong>{swedish ? 'Bedömning av CRM-byte' : 'CRM replacement assessment'}</strong><small>{swedish ? 'Tar oftast 4–6 minuter' : 'Usually 4–6 minutes'}</small></div>
        </div>
        <div className="assessment-topbar-actions">
          <span className="private-label">{swedish ? 'Privat samtal' : 'Private conversation'}</span>
          <button className="human-contact-button" type="button" onClick={() => {
            if (contactOpen) returnToAssessment();
            else {
              setContactOpen(true);
              void trackFunnelEvent('contact_opened');
            }
          }}>
            {contactOpen
              ? (swedish ? 'Till bedömningen' : 'Back to assessment')
              : (swedish ? 'Prata med en person' : 'Talk to a person')}
          </button>
        </div>
      </div>
      {contactOpen ? (
        <div className="contact-panel">
          {contactComplete ? (
            <div className="contact-success" aria-live="polite">
              <span aria-hidden="true">✓</span>
              <small>{swedish ? 'PERSONLIG UPPFÖLJNING' : 'PERSONAL FOLLOW-UP'}</small>
              <h3>{swedish ? 'Du får ett personligt svar.' : 'You’ll get a personal reply.'}</h3>
              <p>{swedish
                ? `Ditt meddelande är sparat. En person från Company Native svarar dig på ${contactEmail.trim()}.`
                : `Your message is saved. A person from Company Native will reply to you at ${contactEmail.trim()}.`}</p>
              <button type="button" onClick={returnToAssessment}>{swedish ? 'Fortsätt med bedömningen' : 'Continue with the assessment'} <Arrow /></button>
            </div>
          ) : (
            <>
              <div className="contact-intro">
                <small>{swedish ? 'PRATA DIREKT MED EN PERSON' : 'TALK TO A PERSON'}</small>
                <h3>{swedish ? 'Hoppa över assistenten.' : 'Skip the assistant.'}</h3>
                <p>{swedish
                  ? 'Lämna din jobbmejl och gärna vad du vill prata om. En person från Company Native svarar dig.'
                  : 'Leave your work email and, if you like, what you want to discuss. A person from Company Native will reply.'}</p>
              </div>
              <form className="contact-form" onSubmit={submitContact}>
                <label htmlFor="contact-email">{swedish ? 'Jobbmejl' : 'Work email'}</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  placeholder={swedish ? 'du@foretag.se' : 'you@company.com'}
                  required
                />
                <label htmlFor="contact-message">{swedish ? 'Vad vill du prata om? (valfritt)' : 'What would you like to discuss? (optional)'}</label>
                <textarea
                  id="contact-message"
                  maxLength={1200}
                  rows={4}
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  placeholder={swedish ? 'Några rader hjälper oss att förbereda oss.' : 'A few lines will help us prepare.'}
                />
                <button className="contact-submit" type="submit" disabled={contactWorking || !contactEmail.trim()}>
                  {contactWorking
                    ? (swedish ? 'Skickar…' : 'Sending…')
                    : (swedish ? 'Be oss kontakta dig' : 'Ask us to contact you')} <Arrow />
                </button>
              </form>
              {contactError && <p className="assessment-error" role="alert">{contactError}</p>}
              <button className="continue-assessment" type="button" onClick={returnToAssessment}>
                {swedish ? 'Vill du hellre få en bedömning nu? Fortsätt med assistenten.' : 'Want an assessment now instead? Continue with the assistant.'}
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                {message.role === 'assistant' && <span className="tiny-orb">AI</span>}
                <p>{message.text}</p>
              </div>
            ))}
            {working && (
              <div className="message assistant"><span className="tiny-orb">AI</span><p className="thinking">•••</p></div>
            )}
            <div ref={messagesEnd} />
          </div>
          {quickReplies.length > 0 && state === 'question' && !working && (
        <div className="quick-answers" role="group" aria-label={swedish ? 'Svarsalternativ' : 'Suggested answers'}>
              {quickReplies.map((choice) => (
                <button key={choice} type="button" onClick={() => sendAnswer(choice)}>{choice}</button>
              ))}
            </div>
          )}
          {result && (
            <div className="assessment-result">
              <small>{swedish ? 'ERT FÖRSTA ERSÄTTNINGSBEVIS' : 'YOUR FIRST REPLACEMENT PROOF'}</small>
              <strong>{result.opportunity}</strong>
              <dl>
                <div><dt>{swedish ? 'Vem det hjälper' : 'Who it helps'}</dt><dd>{result.whoBenefits}</dd></div>
                <div><dt>{swedish ? 'Varför detta kan testas tryggt' : 'Why this can be tested safely'}</dt><dd>{result.whyBeforeMigration}</dd></div>
                <div><dt>{swedish ? 'Hur väl det passar' : 'Fit'}</dt><dd>{result.fit}</dd></div>
              </dl>
            </div>
          )}
          <form className="chat-input" onSubmit={submit}>
            <label className="sr-only" htmlFor="assessment-answer">{swedish ? 'Ditt svar' : 'Your answer'}</label>
            <input
              id="assessment-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              type={state === 'email' ? 'email' : 'text'}
              autoComplete={state === 'email' ? 'email' : 'off'}
              maxLength={state === 'email' ? 254 : 1200}
              placeholder={state === 'complete'
                ? (swedish ? 'Bedömningen är klar' : 'Assessment complete')
                : state === 'email'
                  ? (swedish ? 'jobbmejl@foretag.se' : 'you@company.com')
                  : (swedish ? 'Skriv ditt svar…' : 'Type your answer…')}
              disabled={state === 'complete' || working}
            />
            <button type="submit" disabled={state === 'complete' || working || !answer.trim()} aria-label={swedish ? 'Skicka svar' : 'Send answer'}>{working ? '…' : '↑'}</button>
          </form>
          {error && <p className="assessment-error" role="alert">{error}</p>}
          <p className="assessment-note">{swedish
            ? 'Assistenten anpassar frågorna efter dina svar. Dela inte känsliga kund- eller personuppgifter.'
            : 'The assistant adapts its questions to your answers. Do not share sensitive customer or personal data.'}</p>
        </>
      )}
    </div>
  );
}

export function Site({ locale = 'en' }: { locale?: Locale }) {
  const swedish = locale === 'se';
  const t = (english: string, svenska: string) => swedish ? svenska : english;
  const useCases = swedish ? swedishUseCases : englishUseCases;
  const systemSteps = swedish ? swedishSystemSteps : englishSystemSteps;
  const phases = swedish ? swedishPhases : englishPhases;

  return (
    <main lang={swedish ? 'sv' : 'en'}>
      <nav className="nav shell" aria-label={t('Main navigation', 'Huvudmeny')}>
        <a className="brand" href="#top" aria-label={t('Company Native home', 'Company Native startsida')}>
          <span className="brand-mark" aria-hidden="true" />
          <span>Company Native</span>
        </a>
        <div className="nav-links">
          <a href="#why-replace">{t('Why replace', 'Varför byta')}</a>
          <a href="#process">{t('How we prove it', 'Så bevisar vi det')}</a>
          <a href="#ownership">{t('Ownership', 'Ägande')}</a>
        </div>
        <div className="nav-actions">
          <a className="language-link" href={swedish ? '/en' : '/se'} lang={swedish ? 'en' : 'sv'} data-funnel-event="language_change" data-funnel-location="navigation">{swedish ? 'EN' : 'SV'}</a>
          <a className="button button-small button-dark" href="#assessment-chat" data-funnel-location="navigation">{t('Plan a replacement proof', 'Planera ett ersättningsbevis')} <Arrow /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t('Owned and adaptable CRM replacement', 'Ett ägt och anpassningsbart CRM')}</p>
          <h1>{t('Replace HubSpot or Salesforce with a CRM', 'Ersätt HubSpot eller Salesforce med ett CRM')} <em>{t('your company owns and controls.', 'som ditt företag äger och styr.')}</em></h1>
          <p className="hero-lead">{t(
            'Built as ordinary software around how your people actually sell and serve customers. Keep Company Native as the operator, self-host it or let your own team or another partner keep changing it.',
            'Byggt som vanlig programvara runt hur teamet faktiskt säljer och hjälper kunder. Behåll Company Native som operatör, driv det själv eller låt det egna teamet eller en annan partner fortsätta ändra det.',
          )}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment-chat" data-funnel-location="hero">{t('Plan a replacement proof', 'Planera ett ersättningsbevis')} <Arrow /></a>
            <a className="text-link" href="#process">{t('See how the proof works', 'Se hur beviset fungerar')} <Arrow /></a>
          </div>
          <p className="hero-promise"><span>✓</span> {t(
            'Prove one workflow beside the current CRM first. Migrate only if the owned replacement works better in real work.',
            'Bevisa ett arbetsflöde bredvid nuvarande CRM först. Migrera bara om den ägda ersättningen fungerar bättre i verkligt arbete.',
          )}</p>
          <div className="proof-line">
            <span className="proof-avatars" aria-hidden="true"><i>YY</i><i>10+</i></span>
            <p><strong>{t('Founded FunnelBud in 2015.', 'Grundade FunnelBud 2015.')}</strong><br />{t('More than 450 Swedish companies served.', 'Har hjälpt fler än 450 svenska företag.')}</p>
          </div>
        </div>

        <div className="journey-card" role="group" aria-label={t('The path from your current CRM to an owned replacement', 'Vägen från nuvarande CRM till en ägd ersättare')}>
          <div className="journey-head"><div><span className="status-dot" /> {t('Your CRM replacement', 'Ditt CRM-byte')}</div><span className="live-label">{t('PROVEN FIRST', 'BEVISAS FÖRST')}</span></div>
          <div className="journey-body">
            <p className="journey-label">{t('Prove the replacement before the migration', 'Bevisa ersättningen före migreringen')}</p>
            <div className="journey-step active"><span className="step-number">01</span><div><strong>{t('Map what people really use', 'Kartlägg vad teamet faktiskt använder')}</strong><small>{t('The system shows what happens. People explain why.', 'Systemet visar vad som händer. Teamet förklarar varför.')}</small></div><span className="step-state">START</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">02</span><div><strong>{t('Build one owned workflow', 'Bygg ett ägt arbetsflöde')}</strong><small>{t('Tested CRM core. Your process and interface.', 'Testad CRM-kärna. Ditt arbetssätt och gränssnitt.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">03</span><div><strong>{t('Compare both systems', 'Jämför båda systemen')}</strong><small>{t('Real users. Real work. Current CRM still live.', 'Riktiga användare. Riktigt arbete. Nuvarande CRM är kvar.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line accent" />
            <div className="journey-step north-star"><span className="step-number">04</span><div><strong>{t('Own it and choose who changes it', 'Äg det och välj vem som ändrar det')}</strong><small>{t('Company Native, your team or another partner.', 'Company Native, ditt team eller en annan partner.')}</small></div><span className="spark" aria-hidden="true">✦</span></div>
          </div>
          <div className="journey-footer"><span>{t('Own the code and data', 'Äg koden och datan')}</span><span>{t('Self-host or choose an operator', 'Driv själv eller välj operatör')}</span><span>{t('Change it with any qualified partner', 'Ändra med valfri kvalificerad partner')}</span></div>
        </div>
      </section>

      <section className="credentials-strip" aria-label={t('FunnelBud experience', 'Erfarenhet från FunnelBud')}>
        <div className="shell credential-grid">
          <div><strong>{t('10+ years', '10+ år')}</strong><span>{t('building CRM and automation', 'med CRM och automation')}</span></div>
          <div><strong>{t('450+ companies', '450+ företag')}</strong><span>{t('served by FunnelBud', 'som FunnelBud har hjälpt')}</span></div>
          <div><strong>{t('Built for established teams', 'Byggt för etablerade team')}</strong><span>{t('whose CRM no longer fits', 'vars CRM inte längre passar')}</span></div>
          <div><strong>{t('Control after the migration', 'Kontroll efter migreringen')}</strong><span>{t('operate, change or hand it over', 'driv, ändra eller lämna över')}</span></div>
        </div>
      </section>

      <section className="recognition section" id="why-replace" aria-labelledby="recognition-heading">
        <div className="shell">
          <div className="recognition-heading">
            <p className="section-kicker">{t('DOES THIS LOOK FAMILIAR?', 'KÄNNER DU IGEN DET HÄR?')}</p>
            <h2 id="recognition-heading">{t('Your CRM works.', 'Ditt CRM fungerar.')} <em>{t('But the business works around it.', 'Men verksamheten jobbar runt det.')}</em></h2>
            <p>{t(
              'The CRM has become central, but the real customer work is spread across fields, spreadsheets, inboxes and reports that only a few people understand.',
              'CRM-systemet har blivit centralt, men det verkliga kundarbetet är utspritt över fält, kalkylblad, inkorgar och rapporter som bara några få förstår.',
            )}</p>
          </div>
          <div className="recognition-grid">
            <article><small>01</small><h3>{t('Excel fills the gaps', 'Excel fyller luckorna')}</h3><p>{t('Sales uses the CRM, delivery uses a spreadsheet, and important customer context lives in inboxes and notes.', 'Sälj använder CRM-systemet, leveransen använder ett kalkylblad och viktig kundinformation finns i inkorgar och anteckningar.')}</p></article>
            <article><small>02</small><h3>{t('100 custom fields. Still no clear overview.', '100 anpassade fält. Ändå ingen tydlig överblick.')}</h3><p>{t('Fields, workflows and exceptions have piled up until nobody knows what is required, reliable or still useful.', 'Fält, arbetsflöden och undantag har staplats på varandra tills ingen vet vad som är obligatoriskt, tillförlitligt eller fortfarande behövs.')}</p></article>
            <article><small>03</small><h3>{t('Every useful answer needs a special report', 'Varje viktig fråga kräver en specialrapport')}</h3><p>{t('Forecasts and management questions depend on one person exporting, fixing and explaining the data.', 'Prognoser och frågor från ledningen kräver att en person exporterar, rättar och förklarar datan.')}</p></article>
            <article><small>04</small><h3>{t('The real process lives between systems', 'Det verkliga arbetet sker mellan systemen')}</h3><p>{t('People copy information between sales, delivery, support and finance because the handoffs do not fit the CRM.', 'Teamet kopierar information mellan försäljning, leverans, support och ekonomi eftersom överlämningarna inte passar i CRM-systemet.')}</p></article>
          </div>
          <p className="recognition-conclusion">{t(
            'That is the problem Company Native is built for: keep what works, remove the workarounds and replace the generic CRM safely.',
            'Det är problemet Company Native är byggt för: behåll det som fungerar, ta bort nödlösningarna och ersätt det generiska CRM-systemet tryggt.',
          )}</p>
        </div>
      </section>

      <section className="crm-heart section shell">
        <div className="section-kicker">{t('THE SYSTEM BEHIND THE CUSTOMER EXPERIENCE', 'SYSTEMET BAKOM KUNDUPPLEVELSEN')}</div>
        <div className="heart-grid">
          <h2>{t('Your CRM is not a database. It is how your company', 'Ditt CRM är inte en databas. Det är så ditt företag')} <em>{t('meets the world.', 'möter världen.')}</em></h2>
          <div className="heart-copy">
            <p>{t('It controls how you find customers, respond to them, win their trust, deliver what you promised, keep them happy and earn the next referral.', 'Det styr hur du hittar kunder, bemöter dem, vinner deras förtroende, levererar det du lovat, behåller dem och får nästa rekommendation.')}</p>
            <p>{t("Generic software forces your company into somebody else's process. A CRM built around you makes your best way of working easier, faster and consistent.", 'Generisk programvara tvingar in företaget i någon annans process. Ett CRM byggt runt dig gör det arbetssätt som fungerar bäst för företaget enklare, snabbare och mer enhetligt.')}</p>
          </div>
        </div>
        <div className="customer-flow" role="group" aria-label={t('The customer journey controlled by your CRM', 'Kundresan som ditt CRM styr')}>
          {(swedish ? ['Attrahera', 'Kvalificera', 'Sälj', 'Leverera', 'Hjälp', 'Väx'] : ['Attract', 'Qualify', 'Sell', 'Deliver', 'Support', 'Grow']).map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>
          ))}
        </div>
        <div className="category-intro"><span>{t('What are you actually buying?', 'Vad köper du egentligen?')}</span><strong>{t('A safe replacement process that leaves your company with software it owns and can keep changing.', 'En trygg ersättningsprocess som lämnar företaget med programvara det äger och kan fortsätta ändra.')}</strong></div>
        <div className="category-compare">
          <article><small>{t('GENERIC CRM', 'GENERISKT CRM')}</small><h3>{t('You adapt to the product', 'Du anpassar dig till produkten')}</h3><p>{t('You rent the same system as everybody else and work within the features and process the vendor chooses.', 'Du hyr samma system som alla andra och arbetar inom funktionerna och processen som leverantören väljer.')}</p></article>
          <article><small>{t('FLEXIBLE OPEN CRM', 'FLEXIBELT ÖPPET CRM')}</small><h3>{t('Your team adapts the platform', 'Ditt team anpassar plattformen')}</h3><p>{t('You gain control and flexibility, but your company or a partner must design the system, migrate the data and keep the complete installation reliable.', 'Du får kontroll och flexibilitet, men företaget eller en partner måste utforma systemet, migrera datan och hålla hela installationen tillförlitlig.')}</p></article>
          <article className="recommended"><small>COMPANY NATIVE</small><h3>{t('Own the system without owning the project', 'Äg systemet utan att själv driva projektet')}</h3><p>{t('We map, build, migrate and prove the replacement. Your company receives the customer-specific code, data and deployment path—and may choose who changes it next.', 'Vi kartlägger, bygger, migrerar och bevisar ersättningen. Företaget får den kundspecifika koden, datan och driftsvägen—och kan välja vem som ändrar det härnäst.')}</p></article>
        </div>
        <p className="best-fit"><strong>{t('Best for:', 'Passar bäst för:')}</strong> {t('Established companies where HubSpot or Salesforce is central, important workflows no longer fit, and ownership or deep adaptability creates substantial value. If the standard suite already fits and costs less than a responsible replacement, keep it.', 'Etablerade företag där HubSpot eller Salesforce är centralt, viktiga arbetsflöden inte längre passar och ägande eller djup anpassningsbarhet skapar stort värde. Om standardpaketet redan passar och kostar mindre än en ansvarsfull ersättare bör du behålla det.')}</p>
      </section>

      <section className="possibilities section" id="possibilities">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">{t('BUILT AROUND THE WORK THAT MAKES YOU DIFFERENT', 'BYGGT RUNT DET SOM GÖR DITT FÖRETAG UNIKT')}</p><h2>{t('Stop asking, “Can our CRM do that?”', 'Sluta fråga: ”Kan vårt CRM göra det?”')}</h2></div>
            <p>{t('Your most important processes should become your advantage—not a collection of compromises, workarounds and tabs.', 'Dina viktigaste processer ska bli en fördel—inte en samling kompromisser, nödlösningar och flikar.')}</p>
          </div>
          <div className="use-case-grid">
            {useCases.map((useCase) => (
              <article className="use-case" key={useCase.number}>
                <div className="case-top"><span>{useCase.number}</span><small>{useCase.type}</small></div>
                <h3>{useCase.title}</h3>
                <p>{useCase.text}</p>
                <div className="case-tags">{useCase.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <p className="possibility-foot">{t('And one connected place for calling, queues, email, forecasting, outreach, replies, customer risk, management reporting and the other work your team currently holds together by hand.', 'Och ett samlat system för samtal, köer, mejl, prognoser, prospektering, kundrisk, ledningsrapportering och allt annat som teamet idag håller ihop för hand.')}</p>
          <div className="mid-cta">
            <div><small>{t('YOUR COMPANY WILL BE DIFFERENT', 'DITT FÖRETAG ÄR INTE SOM ALLA ANDRA')}</small><strong>{t('Where could a CRM remove the most work from your team?', 'Vilket arbete skulle rätt CRM kunna ta bort för ditt team?')}</strong></div>
            <a className="button button-dark" href="#assessment-chat" data-funnel-location="after_examples">{t('Choose a replacement proof', 'Välj ett ersättningsbevis')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="process section shell" id="process">
        <div className="section-heading centered-heading">
          <p className="section-kicker">{t('PROVE THE REPLACEMENT BEFORE THE MIGRATION', 'BEVISA ERSÄTTNINGEN FÖRE MIGRERINGEN')}</p>
          <h2>{t('Let real work decide whether you should move.', 'Låt riktigt arbete avgöra om du ska byta.')}</h2>
          <p>{t('The existing CRM stays live while a small group tests one valuable workflow in the owned replacement. Only the evidence can justify the larger migration.', 'Det befintliga CRM-systemet fortsätter vara igång medan en liten grupp testar ett värdefullt arbetsflöde i den ägda ersättningen. Bara resultatet kan motivera den större migreringen.')}</p>
        </div>
        <div className="phase-list">
          {phases.map((phase, index) => (
            <article className="phase" key={phase.version}>
              <div className="phase-rail"><span>{phase.version}</span>{index < phases.length - 1 && <i />}</div>
              <div className="phase-content"><h3>{phase.title}</h3><p>{phase.text}</p><strong>{phase.highlight}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="system-section section">
        <div className="shell">
          <div className="system-intro">
            <div><p className="section-kicker light">{t('HOW THE REPLACEMENT IS BUILT', 'SÅ BYGGS ERSÄTTNINGEN')}</p><h2>{t('AI reads the system. Your people explain the process. Company Native builds the owned replacement.', 'AI läser systemet. Teamet förklarar arbetssättet. Company Native bygger den ägda ersättningen.')}</h2></div>
            <p>{t('Activity and configuration show what the current CRM does. They cannot explain every exception, commercial choice or future ambition. Focused consultation decides what to preserve, improve or remove before code is generated.', 'Aktivitet och inställningar visar vad nuvarande CRM gör. De kan inte förklara varje undantag, affärsbeslut eller framtida ambition. Fokuserade samtal avgör vad som ska behållas, förbättras eller tas bort innan kod genereras.')}</p>
          </div>
          <div className="system-grid">
            {systemSteps.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="system-summary">
            <strong>{t('A tested foundation where failure would hurt. Ordinary customer-owned code where your company is different.', 'En testad grund där fel skulle göra skada. Vanlig kundägd kod där företaget är annorlunda.')}</strong>
            <p>{t('Identity, permissions, synchronization, audit history, backups and migration checks are reused and tested. Your data model, workflows, interfaces, reports and company rules can be generated as code in your own repository.', 'Identitet, behörigheter, synkronisering, ändringshistorik, säkerhetskopior och migrationskontroller återanvänds och testas. Din datamodell, dina arbetsflöden, gränssnitt, rapporter och företagsregler kan genereras som kod i ditt eget kodarkiv.')}</p>
          </div>
          <div className="learning-moat">
            <div className="learning-visual" aria-hidden="true"><span>A</span><span>B</span><span>C</span><i>✦</i></div>
            <div>
              <p className="section-kicker light">{t('LEARNING THAT DOES NOT EXPOSE THE CUSTOMER', 'LÄRANDE SOM INTE EXPONERAR KUNDEN')}</p>
              <h3>{t('Each replacement can make the next one faster and safer—without sharing private customer work.', 'Varje ersättning kan göra nästa snabbare och tryggare—utan att privat kundarbete delas.')}</h3>
              <p>{t('With explicit permission, Company Native can reuse general implementation patterns, acceptance tests and reliability lessons. Raw records, secrets, customer-specific rules and private code stay inside the customer boundary.', 'Med uttryckligt godkännande kan Company Native återanvända generella byggmönster, acceptanstester och lärdomar om tillförlitlighet. Rådata, hemligheter, kundspecifika regler och privat kod stannar inom kundens gräns.')}</p>
              <small>{t('The exact hosting, model, access, ownership and learning terms are agreed before customer data is connected.', 'Exakta villkor för drift, modeller, åtkomst, ägande och lärande avtalas innan kunddata ansluts.')}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="answers section shell">
        <div className="section-heading centered-heading narrow">
          <p className="section-kicker">{t('THE QUESTIONS THAT SHOULD BE ASKED', 'VANLIGA FRÅGOR INFÖR ETT CRM-BYTE')}</p>
          <h2>{t('A custom CRM should remove risk—not move it onto you.', 'Ett anpassat CRM ska ta bort risk—inte flytta den till dig.')}</h2>
        </div>
        <div className="answer-grid">
          <article><span>{t('COST', 'KOSTNAD')}</span><h3>{t('“Will this actually cost less?”', '”Blir det verkligen billigare?”')}</h3><p>{t('The proof produces a credible three-year comparison: licences, consultants, internal administration, replacement work, integrations, hosting and maintenance. We do not claim a saving before that evidence exists.', 'Beviset ger en trovärdig treårsjämförelse: licenser, konsulter, intern administration, ersättningsarbete, integrationer, drift och underhåll. Vi lovar ingen besparing innan det underlaget finns.')}</p></article>
          <article><span>{t('MIGRATION', 'MIGRERING')}</span><h3>{t('“What if the new system is worse?”', '”Tänk om det nya systemet är sämre?”')}</h3><p>{t('One or two users test the new system alongside the old one. Everyone moves only after the important work is at least as good—and usually easier.', 'En eller två användare testar det nya systemet parallellt med det gamla. Alla flyttar först när det viktiga arbetet fungerar minst lika bra—och oftast enklare.')}</p></article>
          <article id="ownership"><span>{t('OWNERSHIP & CHANGE', 'ÄGANDE OCH ÄNDRINGAR')}</span><h3>{t('“Can we run and change it without you?”', '”Kan vi driva och ändra det utan er?”')}</h3><p>{t('Yes, under the agreed ownership and open-source terms. Company Native can operate and improve it, or hand over the customer-specific repository, documentation and deployment path so your team or another qualified partner can continue.', 'Ja, enligt överenskomna ägande- och open source-villkor. Company Native kan driva och förbättra systemet eller lämna över det kundspecifika kodarkivet, dokumentationen och driftsvägen så att ditt team eller en annan kvalificerad partner kan fortsätta.')}</p></article>
          <article><span>{t('AI SOVEREIGNTY', 'AI-SUVERÄNITET')}</span><h3>{t('“Where do our sensitive data and AI work go?”', '”Vart tar känsliga data och AI-arbete vägen?”')}</h3><p>{t('Choose the hosting, model providers and access boundaries that fit the risk. Sensitive deployments can use your infrastructure and approved models; exact controls are designed and priced before connection.', 'Välj den driftmiljö, de modellleverantörer och åtkomstgränser som passar risken. Känsliga lösningar kan använda er infrastruktur och godkända modeller; exakta kontroller utformas och prissätts före anslutning.')}</p></article>
        </div>
      </section>

      <section className="story section" id="story">
        <div className="shell story-grid">
          <div className="story-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/yusuf-young.jpg" alt={t('Yusuf Young, founder of Company Native and FunnelBud', 'Yusuf Young, grundare av Company Native och FunnelBud')} />
            <span>YUSUF YOUNG · {t('FOUNDER', 'GRUNDARE')}</span>
          </div>
          <div className="story-copy">
            <p className="section-kicker">{t('WHY WE ARE BUILDING THIS', 'VARFÖR VI BYGGER DETTA')}</p>
            <h2>{t('A decade inside CRM exposed why companies pay to customize software they still do not control.', 'Tio år med CRM visade varför företag betalar för att anpassa programvara de ändå inte styr.')}</h2>
            <p>{t('Yusuf Young founded FunnelBud in 2015. The company helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.', 'Yusuf Young grundade FunnelBud 2015. Företaget hjälpte fler än 450 svenska verksamheter med CRM, försäljning och marknadsautomation innan han lämnade bolaget.')}</p>
            <p>{t('That work exposed the same problem again and again: every CRM is generic by necessity. Customers pay for workarounds, abandon useful ideas and change good processes to fit the software.', 'Arbetet visade samma problem om och om igen: alla CRM-system måste i grunden vara generella. Kunder betalar för nödlösningar, överger bra idéer och ändrar fungerande processer för att passa programvaran.')}</p>
            <blockquote>{t('“If adapting rented CRM costs more than building the right system, the company should be able to own, run and keep changing the better system instead.”', '”Om det kostar mer att anpassa ett hyrt CRM än att bygga rätt system ska företaget kunna äga, driva och fortsätta ändra det bättre systemet i stället.”')}</blockquote>
            <a href="https://www.funnelbud.com/om-oss/" target="_blank" rel="noreferrer" className="text-link">{t('See the FunnelBud story', 'Läs historien om FunnelBud')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="assessment-section section" id="assessment">
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">{t('PLAN THE PROOF', 'PLANERA BEVISET')}</p>
            <h2>{t('Prove one CRM workflow before planning the migration.', 'Bevisa ett CRM-arbetsflöde innan du planerar migreringen.')}</h2>
            <p>{t('The assessment identifies the part of HubSpot or Salesforce worth replacing first, the people who must test it and the evidence needed before a larger decision.', 'Bedömningen identifierar den del av HubSpot eller Salesforce som är värd att ersätta först, vilka som måste testa den och vilket underlag som behövs före ett större beslut.')}</p>
            <ul>
              <li><span>✓</span> {t('A conversation, not a generic lead form', 'Ett samtal, inte ett vanligt kontaktformulär')}</li>
              <li><span>✓</span> {t('About five minutes', 'Cirka fem minuter')}</li>
              <li><span>✓</span> {t('A suggested paid replacement proof, who should test it and why it can be isolated safely', 'Ett förslag på betalt ersättningsbevis, vilka som bör testa det och varför det kan avgränsas tryggt')}</li>
            </ul>
            <p className="contact-expectation">{t('Prefer a person? You can request a personal reply from the assistant window before answering anything. The assessment asks for your work email only at the end so the result can be saved and followed up when useful.', 'Föredrar du en person? Du kan be om ett personligt svar i assistentfönstret innan du svarar på något. Din jobbmejl efterfrågas först i slutet så att resultatet kan sparas och följas upp om det finns något relevant att prata vidare om.')}</p>
            <p className="privacy-prompt">{t('Only what is needed to prepare and follow up on the assessment is stored.', 'Bara det som behövs för att förbereda och följa upp bedömningen sparas.')} <a href={`/${locale}/privacy`}>{t('How we handle your information', 'Så hanteras dina uppgifter')} <Arrow /></a></p>
            <div className="commercial-promise"><strong>{t('The first commercial step is a paid, bounded proof.', 'Det första kommersiella steget är ett betalt, avgränsat bevis.')}</strong><p>{t('Scope, price, access and acceptance tests are agreed before work begins. A full migration is proposed only after the proof shows a better fit and a credible total cost.', 'Omfattning, pris, åtkomst och acceptanstester avtalas innan arbetet börjar. En full migrering föreslås först när beviset visar bättre passform och en trovärdig totalkostnad.')}</p></div>
          </div>
          <Assessment locale={locale} />
        </div>
      </section>

      <footer>
        <div className="shell footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true" /><span>Company Native</span></a><p>{t('Replace rented CRM with software your company can own, run and keep changing.', 'Ersätt hyrt CRM med programvara företaget kan äga, driva och fortsätta ändra.')}</p><a href="#assessment-chat" className="button button-small button-primary" data-funnel-location="footer">{t('Plan a replacement proof', 'Planera ett ersättningsbevis')} <Arrow /></a></div>
        <div className="shell footer-bottom"><span>© 2026 Company Native · {t('A Yusuf Young AB company', 'Ett bolag inom Yusuf Young AB')}</span><span><a href={`/${locale}/privacy`}>{t('Privacy', 'Integritet')}</a> · <a href={swedish ? '/en' : '/se'}>{swedish ? 'English' : 'Svenska'}</a></span></div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <Site locale="en" />;
}
