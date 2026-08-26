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
  ['Observe', 'The system learns which parts of your current CRM people use, where work slows down and what happens outside the system.'],
  ['Ask', 'Approved power users can explain an action in the moment, so the system learns why the work happens—not only where they clicked.'],
  ['Design', 'Real usage becomes requirements and working mockups for the safe first move, the better system and the long-term vision.'],
  ['Refine', 'Your leadership and users shape the mockups with Company Native CRM specialists before development begins.'],
  ['Build & move', 'Company Native engineers build, integrate, import the data, train your team and move people across only when the new system is better.'],
  ['Keep improving', 'The system keeps spotting bugs, repeated work and improvement opportunities, then brings the useful ones to you.'],
];

const swedishSystemSteps = [
  ['Observera', 'Systemet lär sig vilka delar av ditt CRM som används, var arbetet bromsar och vad som händer utanför systemet.'],
  ['Fråga', 'Utvalda superanvändare kan förklara ett moment medan de arbetar, så att systemet förstår varför det görs—inte bara var de klickade.'],
  ['Designa', 'Det teamet faktiskt gör blir tydliga krav och fungerande skisser för det säkra första steget, det bättre systemet och den långsiktiga visionen.'],
  ['Förfina', 'Ledning och användare formar skisserna tillsammans med Company Natives CRM-specialister innan utvecklingen börjar.'],
  ['Bygg och flytta', 'Company Native bygger, integrerar, importerar data, utbildar teamet och flyttar användarna först när det nya systemet är bättre.'],
  ['Fortsätt förbättra', 'Systemet fortsätter att hitta buggar, dubbelarbete och förbättringsmöjligheter och lyfter fram det som ger mest värde.'],
];

const englishPhases = [
  {
    version: 'V0',
    title: 'Value now. No migration.',
    text: 'You get one small, useful improvement in your existing setup. Your team benefits immediately while the system learns how the work really happens.',
    highlight: 'If your team does not use it, you get your money back.',
  },
  {
    version: 'V1',
    title: 'Everything you rely on. Less work.',
    text: 'Company Native recreates what already works, removes manual steps and keeps the interface familiar. One or two people prove it first. Nobody moves until it is at least as good as today.',
    highlight: 'Migrate to something proven—not to hope.',
  },
  {
    version: 'V2',
    title: 'A better way to run the business.',
    text: 'Now the work itself can be redesigned. Sales, marketing, delivery and service become one streamlined customer journey, with more automated behind the scenes.',
    highlight: 'Change the process after the safe foundation works.',
  },
  {
    version: 'NORTH STAR',
    title: 'The company you want to become.',
    text: 'Your CRM grows into the customer-facing operating system of the business—shaped by your strategy, brand and values, and updated as your ambition changes.',
    highlight: 'Every improvement points in the same direction.',
  },
];

const swedishPhases = [
  {
    version: 'V0',
    title: 'Värde nu. Ingen migrering.',
    text: 'Du får en liten, användbar förbättring i ditt nuvarande CRM. Teamet får nytta direkt medan systemet lär sig hur arbetet faktiskt går till.',
    highlight: 'Om teamet inte använder den får du pengarna tillbaka.',
  },
  {
    version: 'V1',
    title: 'Allt du behöver. Mindre arbete.',
    text: 'Company Native återskapar det som redan fungerar, tar bort manuella steg och behåller ett välbekant gränssnitt. En eller två personer testar lösningen först. Resten av teamet byter först när den fungerar minst lika bra som dagens CRM.',
    highlight: 'Byt till något som redan fungerar—inte till ett löfte.',
  },
  {
    version: 'V2',
    title: 'Ett bättre sätt att driva verksamheten.',
    text: 'När grunden fungerar kan arbetssättet förbättras. Försäljning, marknadsföring, leverans och service blir en sammanhängande kundresa där fler moment automatiseras i bakgrunden.',
    highlight: 'Förändra arbetssättet först när den säkra grunden fungerar.',
  },
  {
    version: 'NORDSTJÄRNAN',
    title: 'Företaget du vill bygga.',
    text: 'Ditt CRM växer till systemet som håller ihop alla kundrelationer—format av din strategi, ditt varumärke och dina värderingar, och utvecklat i takt med din ambition.',
    highlight: 'Varje förbättring pekar åt samma håll.',
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
        ? 'Vilket CRM använder eller överväger du idag?'
        : 'Which CRM are you using or considering today?',
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
          <div><strong>{swedish ? 'CRM-bedömning' : 'CRM assessment'}</strong><small>{swedish ? 'Tar oftast 4–6 minuter' : 'Usually 4–6 minutes'}</small></div>
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
              <small>{swedish ? 'DIN BÄSTA FÖRSTA FÖRBÄTTRING' : 'YOUR LIKELY FIRST OPPORTUNITY'}</small>
              <strong>{result.opportunity}</strong>
              <dl>
                <div><dt>{swedish ? 'Vem det hjälper' : 'Who it helps'}</dt><dd>{result.whoBenefits}</dd></div>
                <div><dt>{swedish ? 'Varför före migreringen' : 'Why before migration'}</dt><dd>{result.whyBeforeMigration}</dd></div>
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
          <a href="#process">{t('How it works', 'Så fungerar det')}</a>
          <a href="#possibilities">{t('What you can build', 'Vad du kan bygga')}</a>
          <a href="#story">{t('Why us', 'Varför oss')}</a>
        </div>
        <div className="nav-actions">
          <a className="language-link" href={swedish ? '/en' : '/se'} lang={swedish ? 'en' : 'sv'} data-funnel-event="language_change" data-funnel-location="navigation">{swedish ? 'EN' : 'SV'}</a>
          <a className="button button-small button-dark" href="#assessment-chat" data-funnel-location="navigation">{t('Start assessment', 'Starta bedömning')} <Arrow /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t('Company-native CRM, handled end to end', 'CRM byggt för ditt företag, från början till slut')}</p>
          <h1>{t('Your CRM should fit your business.', 'Ditt CRM ska passa din verksamhet.')} <em>{t('Not the other way around.', 'Inte tvärtom.')}</em></h1>
          <p className="hero-lead">{t(
            'Your company gets a CRM built around how it actually works. Company Native maps the work, designs and builds the system, migrates your data and keeps improving it—without disrupting your team.',
            'Du får ett CRM byggt runt hur verksamheten faktiskt fungerar. Company Native kartlägger arbetet, designar och bygger systemet, flyttar din data och fortsätter förbättra det—utan att störa teamet.',
          )}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment-chat" data-funnel-location="hero">{t('Start your CRM assessment', 'Starta din CRM-bedömning')} <Arrow /></a>
            <a className="text-link" href="#process">{t('See the safe path to migration', 'Se den trygga vägen till migrering')} <Arrow /></a>
          </div>
          <p className="hero-promise"><span>✓</span> {t(
            'Start with one useful improvement—without migrating anything. If your team does not use it, you get your money back.',
            'Börja med en användbar förbättring—utan att migrera något. Om teamet inte använder den får du pengarna tillbaka.',
          )}</p>
          <div className="proof-line">
            <span className="proof-avatars" aria-hidden="true"><i>YY</i><i>10+</i></span>
            <p><strong>{t('Founded FunnelBud in 2015.', 'Grundade FunnelBud 2015.')}</strong><br />{t('More than 450 Swedish companies served.', 'Har hjälpt fler än 450 svenska företag.')}</p>
          </div>
        </div>

        <div className="journey-card" role="group" aria-label={t('The path from your current CRM to your ideal CRM', 'Vägen från ditt nuvarande CRM till det CRM du egentligen behöver')}>
          <div className="journey-head"><div><span className="status-dot" /> {t('Your CRM transformation', 'Din CRM-migrering')}</div><span className="live-label">{t('CONTINUOUS', 'LÖPANDE')}</span></div>
          <div className="journey-body">
            <p className="journey-label">{t('A safe path forward', 'En trygg väg framåt')}</p>
            <div className="journey-step active"><span className="step-number">01</span><div><strong>{t('Value before migration', 'Värde före migrering')}</strong><small>{t('One useful pilot. No disruption.', 'En användbar pilot. Inget avbrott.')}</small></div><span className="step-state">START</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">02</span><div><strong>{t('Everything you rely on', 'Allt du behöver finns kvar')}</strong><small>{t('Your current CRM, only easier.', 'Samma stöd som idag, fast enklare.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">03</span><div><strong>{t('A better way to work', 'Ett bättre arbetssätt')}</strong><small>{t('Remove work. Automate the rest.', 'Minska arbetet. Automatisera resten.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line accent" />
            <div className="journey-step north-star"><span className="step-number">∞</span><div><strong>{t('Your full potential', 'Din fulla potential')}</strong><small>{t('A system as unique as your company.', 'Ett system lika unikt som ditt företag.')}</small></div><span className="spark" aria-hidden="true">✦</span></div>
          </div>
          <div className="journey-footer"><span>{t('Built around your people', 'Byggt runt ditt team')}</span><span>{t('Owned by you', 'Ägs av dig')}</span><span>{t('Improves continuously', 'Förbättras löpande')}</span></div>
        </div>
      </section>

      <section className="credentials-strip" aria-label={t('FunnelBud experience', 'Erfarenhet från FunnelBud')}>
        <div className="shell credential-grid">
          <div><strong>{t('10+ years', '10+ år')}</strong><span>{t('building CRM and automation', 'med CRM och automation')}</span></div>
          <div><strong>{t('450+ companies', '450+ företag')}</strong><span>{t('served by FunnelBud', 'som FunnelBud har hjälpt')}</span></div>
          <div><strong>{t('Built for SMEs', 'Byggt för SME')}</strong><span>{t('not stripped-down enterprise', 'inte en nedbantad storföretagsprodukt')}</span></div>
          <div><strong>{t('End to end', 'Hela vägen')}</strong><span>{t('design, build, move and improve', 'från design till löpande förbättring')}</span></div>
        </div>
      </section>

      <section className="recognition section" aria-labelledby="recognition-heading">
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
        <div className="category-intro"><span>{t('What are you actually buying?', 'Vad köper du egentligen?')}</span><strong>{t('A managed service that gives you your own software.', 'En tjänst som ger dig din egen programvara—utan att du behöver driva utvecklingen.')}</strong></div>
        <div className="category-compare">
          <article><small>{t('GENERIC CRM', 'GENERISKT CRM')}</small><h3>{t('You adapt to the product', 'Du anpassar dig till produkten')}</h3><p>{t('You rent the same system as everybody else and work within the features and process the vendor chooses.', 'Du hyr samma system som alla andra och arbetar inom funktionerna och processen som leverantören väljer.')}</p></article>
          <article><small>{t('TRADITIONAL CUSTOM BUILD', 'TRADITIONELL SPECIALUTVECKLING')}</small><h3>{t('You manage the project', 'Du driver projektet')}</h3><p>{t('You explain every requirement, carry the migration risk and often inherit software nobody continues to improve.', 'Du förklarar varje krav, bär migreringsrisken och ärver ofta programvara som ingen fortsätter förbättra.')}</p></article>
          <article className="recommended"><small>COMPANY NATIVE</small><h3>{t('The system adapts to you', 'Systemet anpassas efter dig')}</h3><p>{t('Company Native learns, designs, builds, moves and improves everything. You own the software; Company Native carries the work.', 'Company Native lär sig hur verksamheten fungerar, bygger systemet, migrerar datan och fortsätter att förbättra det. Du äger programvaran; Company Native gör jobbet.')}</p></article>
        </div>
        <p className="best-fit"><strong>{t('Best for:', 'Passar bäst för:')}</strong> {t('Founders, CEOs and sales leaders at B2B SMEs whose CRM has become central to sales, delivery or customer service—and whose important work no longer fits a generic tool.', 'Grundare, vd:ar och säljchefer på B2B-företag där CRM har blivit centralt för försäljning, leverans eller kundservice—och där det viktiga arbetet inte längre ryms i ett generiskt verktyg.')}</p>
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
            <a className="button button-dark" href="#assessment-chat" data-funnel-location="after_examples">{t('Find your first improvement', 'Hitta din första förbättring')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="process section shell" id="process">
        <div className="section-heading centered-heading">
          <p className="section-kicker">{t('MOVE WITHOUT THE BIG-BANG MIGRATION', 'BYT CRM UTAN ETT RISKFYLLT STORPROJEKT')}</p>
          <h2>{t('Get value first. Move only when it is better.', 'Få värde först. Byt CRM först när det nya är bättre.')}</h2>
          <p>{t('Your current work keeps running while the replacement is built. The long-term vision guides every decision, but your team changes one safe step at a time.', 'Verksamheten fortsätter som vanligt medan det nya systemet byggs. Den långsiktiga visionen styr varje beslut, men teamet byter ett tryggt steg i taget.')}</p>
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
            <div><p className="section-kicker light">{t('HOW THE SYSTEM WORKS', 'SÅ FUNGERAR SYSTEMET')}</p><h2>{t('It learns what to build before development begins.', 'Det lär sig vad som ska byggas innan utvecklingen börjar.')}</h2></div>
            <p>{t('AI can make software quickly. The hard part is understanding what your people need, what the business could become and how to get there safely. That is what the Company Native system is built to do.', 'AI kan skapa programvara snabbt. Det svåra är att förstå vad ditt team behöver, vad verksamheten kan bli och hur man når dit tryggt. Det är vad Company Natives system är byggt för.')}</p>
          </div>
          <div className="system-grid">
            {systemSteps.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="system-summary">
            <strong>{t('Think Lovable for CRM—then add everything a real migration needs.', 'Tänk Lovable för CRM—och lägg sedan till allt en verklig migrering kräver.')}</strong>
            <p>{t('Company Native handles the understanding, design, development, integrations, data, training, rollout and continuous improvement. You keep running the business.', 'Company Native tar hand om kartläggning, design, utveckling, integrationer, data, utbildning, lansering och löpande förbättring. Du fortsätter att driva verksamheten.')}</p>
          </div>
          <div className="learning-moat">
            <div className="learning-visual" aria-hidden="true"><span>A</span><span>B</span><span>C</span><i>✦</i></div>
            <div>
              <p className="section-kicker light">{t('PROVEN PATTERNS, PRIVATE CUSTOMER DATA', 'BEPRÖVADE MÖNSTER, PRIVAT KUNDDATA')}</p>
              <h3>{t('Benefit from what others have learned—without sharing your CRM or data.', 'Dra nytta av vad andra har lärt sig—utan att dela ditt CRM eller din data.')}</h3>
              <p>{t('The private Company Native system can recognize when a problem resembles work already solved, see which approach succeeded and help engineers start from the strongest pattern. One useful improvement can make the next implementation faster and better.', 'Company Natives privata system kan känna igen problem som liknar sådant som redan har lösts, se vilket arbetssätt som fungerade och hjälpa ingenjörerna att börja med den bästa beprövade lösningen. En värdefull förbättring kan göra nästa projekt snabbare och bättre.')}</p>
              <small>{t('Your CRM, code and data remain yours. Reusable engineering patterns can improve the service without customer data or code being shared with AI labs or other customers.', 'Du äger ditt CRM, koden och all data. Beprövade tekniska lösningar kan förbättra tjänsten utan att kunddata eller kod delas med AI-labb eller andra kunder.')}</small>
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
          <article><span>{t('TIME', 'TID')}</span><h3>{t('“We do not have time for this.”', '”Jag har inte tid med ett sådant här projekt.”')}</h3><p>{t('You do not run the project. Company Native observes, specifies, builds, migrates and trains. Your people contribute where their knowledge matters, not as an unpaid software team.', 'Du driver inte projektet. Company Native kartlägger, planerar, bygger, migrerar och utbildar. Ditt team bidrar där kunskapen behövs—inte som ett obetalt IT-team.')}</p></article>
          <article><span>{t('MIGRATION', 'MIGRERING')}</span><h3>{t('“What if the new system is worse?”', '”Tänk om det nya systemet är sämre?”')}</h3><p>{t('One or two users test the new system alongside the old one. Everyone moves only after the important work is at least as good—and usually easier.', 'En eller två användare testar det nya systemet parallellt med det gamla. Alla flyttar först när det viktiga arbetet fungerar minst lika bra—och oftast enklare.')}</p></article>
          <article><span>{t('OWNERSHIP', 'ÄGANDE')}</span><h3>{t('“Will we be locked in?”', '”Blir jag inlåst?”')}</h3><p>{t('No. The software is yours forever. If you leave, Company Native stops supporting and improving it. You can run it yourself or take it to any vendor.', 'Nej. Programvaran är din för alltid. Om du avslutar samarbetet upphör supporten och den löpande utvecklingen. Du kan driva systemet själv eller ta det till valfri leverantör.')}</p></article>
          <article><span>{t('SECURITY', 'SÄKERHET')}</span><h3>{t('“Where does our sensitive data go?”', '”Vart tar känsliga data vägen?”')}</h3><p>{t('You can use Company Native hosting or your own, frontier AI or open models. For sensitive enterprise work, the entire system and custom AI can run on your premises.', 'Du kan använda Company Natives driftmiljö eller din egen, och välja mellan kommersiella eller öppna AI-modeller. För särskilt känsliga miljöer kan hela systemet och en egen AI köras i din egen infrastruktur.')}</p></article>
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
            <h2>{t('A decade inside CRM exposed how companies bend around the software.', 'Tio år med CRM visade hur företag tvingas anpassa sig efter programvaran.')}</h2>
            <p>{t('Yusuf Young founded FunnelBud in 2015. The company helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.', 'Yusuf Young grundade FunnelBud 2015. Företaget hjälpte fler än 450 svenska verksamheter med CRM, försäljning och marknadsautomation innan han lämnade bolaget.')}</p>
            <p>{t('That work exposed the same problem again and again: every CRM is generic by necessity. Customers pay for workarounds, abandon useful ideas and change good processes to fit the software.', 'Arbetet visade samma problem om och om igen: alla CRM-system måste i grunden vara generella. Kunder betalar för nödlösningar, överger bra idéer och ändrar fungerande processer för att passa programvaran.')}</p>
            <blockquote>{t('“Now that AI has changed the cost of building software, there is no reason your business should keep adapting to a generic CRM. The CRM can finally adapt to you.”', '”Nu när AI har förändrat kostnaden för att bygga programvara finns det ingen anledning att din verksamhet ska fortsätta anpassa sig till ett generiskt CRM. CRM-systemet kan äntligen anpassa sig till dig.”')}</blockquote>
            <a href="https://www.funnelbud.com/om-oss/" target="_blank" rel="noreferrer" className="text-link">{t('See the FunnelBud story', 'Läs historien om FunnelBud')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="vision section">
        <div className="shell vision-grid">
          <div className="vision-number">2030<span>{t('AND', 'OCH')}<br />{t('BEYOND', 'FRAMÅT')}</span></div>
          <div className="vision-copy">
            <p className="section-kicker light">{t('THE LARGER VISION', 'DEN STÖRRE VISIONEN')}</p>
            <h2>{t('The future is company-native.', 'Framtiden är programvara byggd för varje företag.')}</h2>
            <p>{t('Every company will have systems built around how it wants to compete, serve customers and grow. This is company-native software: software that adapts to your company instead of making your company adapt to it.', 'Varje företag kommer att ha system byggda runt hur det vill konkurrera, hjälpa kunder och växa. Företagsspecifik programvara anpassar sig till ditt företag i stället för att tvinga företaget att anpassa sig.')}</p>
            <p>{t('CRM is where this future starts because it touches the heart of the company: every relationship with every customer. Your CRM should become an extension of your strategy, brand and values—not just a place where salespeople type notes.', 'CRM är där framtiden börjar, eftersom det rör företagets hjärta: varje relation med varje kund. Ditt CRM ska bli en förlängning av din strategi, ditt varumärke och dina värderingar—inte bara en plats där säljare skriver anteckningar.')}</p>
            <div className="vision-outcomes"><span>{t('More speed', 'Högre fart')}</span><span>{t('Fewer mistakes', 'Färre misstag')}</span><span>{t('Less manual work', 'Mindre manuellt arbete')}</span><span>{t('A real competitive advantage', 'En verklig konkurrensfördel')}</span></div>
          </div>
        </div>
      </section>

      <section className="assessment-section section" id="assessment">
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">{t('YOUR FIRST STEP', 'DITT FÖRSTA STEG')}</p>
            <h2>{t('What would a CRM built around your company change?', 'Vad skulle ett CRM byggt runt ditt företag förändra?')}</h2>
            <p>{t('The assessment assistant asks about your current system, where work gets stuck and which improvement could give your team value without a migration.', 'Bedömningsassistenten frågar om ditt nuvarande system, var arbetet fastnar och vilken förbättring som kan ge teamet värde innan du byter CRM.')}</p>
            <ul>
              <li><span>✓</span> {t('A conversation, not a generic lead form', 'Ett samtal, inte ett vanligt kontaktformulär')}</li>
              <li><span>✓</span> {t('About five minutes', 'Cirka fem minuter')}</li>
              <li><span>✓</span> {t('Your strongest small improvement, who it helps and why it can work before migration', 'Din starkaste lilla förbättring, vem den hjälper och varför den kan fungera före migreringen')}</li>
            </ul>
            <p className="contact-expectation">{t('Prefer a person? You can request a personal reply from the assistant window before answering anything. The assessment asks for your work email only at the end so the result can be saved and followed up when useful.', 'Föredrar du en person? Du kan be om ett personligt svar i assistentfönstret innan du svarar på något. Din jobbmejl efterfrågas först i slutet så att resultatet kan sparas och följas upp om det finns något relevant att prata vidare om.')}</p>
            <p className="privacy-prompt">{t('Only what is needed to prepare and follow up on the assessment is stored.', 'Bara det som behövs för att förbereda och följa upp bedömningen sparas.')} <a href={`/${locale}/privacy`}>{t('How we handle your information', 'Så hanteras dina uppgifter')} <Arrow /></a></p>
            <div className="commercial-promise"><strong>{t('Start without increasing your CRM cost.', 'Börja utan att öka din CRM-kostnad.')}</strong><p>{t('If your team does not use the first pilot, you get your money back. If it works, the starting service costs what your current CRM costs today. AI-assisted development and reusable engineering patterns make that possible without starting every build from zero.', 'Om teamet inte använder den första piloten får du pengarna tillbaka. Om den fungerar kostar tjänsten till en början lika mycket som ditt nuvarande CRM. AI-stödd utveckling och beprövade tekniska lösningar gör det möjligt utan att varje projekt börjar från noll.')}</p></div>
          </div>
          <Assessment locale={locale} />
        </div>
      </section>

      <footer>
        <div className="shell footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true" /><span>Company Native</span></a><p>{t('Software built around your company.', 'Programvara byggd runt ditt företag.')}</p><a href="#assessment-chat" className="button button-small button-primary" data-funnel-location="footer">{t('Start assessment', 'Starta bedömning')} <Arrow /></a></div>
        <div className="shell footer-bottom"><span>© 2026 Company Native · {t('A Yusuf Young AB company', 'Ett bolag inom Yusuf Young AB')}</span><span><a href={`/${locale}/privacy`}>{t('Privacy', 'Integritet')}</a> · <a href={swedish ? '/en' : '/se'}>{swedish ? 'English' : 'Svenska'}</a></span></div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <Site locale="en" />;
}
