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
  ['Understand', 'We map how leads, customers and follow-up move through spreadsheets, inboxes, chat and people today.'],
  ['Choose', 'Together, we decide what the first useful CRM must make easier and what can wait.'],
  ['Build', 'Company Native specialists design and build the first working CRM around that real process.'],
  ['Use', 'Your team uses it in real work instead of judging it only in a requirements meeting.'],
  ['Measure', 'We record what people keep, change or ignore and ask whether the CRM genuinely helped.'],
  ['Improve', 'Useful lessons shape the next version, the next customer build and eventually the self-builder.'],
];

const swedishSystemSteps = [
  ['Förstå', 'Vi kartlägger hur leads, kunder och uppföljning idag rör sig mellan kalkylblad, inkorgar, chattar och människor.'],
  ['Välj', 'Tillsammans bestämmer vi vad det första användbara CRM-systemet måste göra enklare och vad som kan vänta.'],
  ['Bygg', 'Company Natives specialister designar och bygger det första fungerande CRM-systemet runt det verkliga arbetssättet.'],
  ['Använd', 'Teamet använder systemet i det dagliga arbetet i stället för att bara bedöma det i ett kravmöte.'],
  ['Mät', 'Vi ser vad teamet behåller, ändrar eller väljer bort och frågar om CRM-systemet faktiskt hjälpte.'],
  ['Förbättra', 'Det som fungerar formar nästa version, nästa kundbygge och så småningom självbyggaren.'],
];

const englishPhases = [
  {
    version: 'START',
    title: 'Show us how customer work happens today.',
    text: 'We look at the spreadsheets, inboxes, notes and handoffs your team already relies on. Then we choose the smallest useful CRM worth building first.',
    highlight: 'Start from real work—not a generic feature list.',
  },
  {
    version: 'BUILD',
    title: 'Get a useful first CRM.',
    text: 'Company Native specialists design and build one clear place for the customer work that matters most. The first version stays focused so your team can begin using it quickly.',
    highlight: 'Your company gets working software, not a requirements document.',
  },
  {
    version: 'USE',
    title: 'Improve it through real use.',
    text: 'Your team shows us what helps, what is missing and what creates more work. We use those reactions and satisfaction checks to improve the CRM.',
    highlight: 'Real use decides what deserves to stay.',
  },
  {
    version: 'GROW',
    title: 'Add what proves useful.',
    text: 'Once the foundation works, add automation, reporting, integrations and the parts of delivery or service that should live beside sales.',
    highlight: 'The CRM grows with the company instead of arriving as a burden.',
  },
];

const swedishPhases = [
  {
    version: 'START',
    title: 'Visa hur kundarbetet går till idag.',
    text: 'Vi tittar på kalkylbladen, inkorgarna, anteckningarna och överlämningarna som teamet redan använder. Sedan väljer vi det minsta användbara CRM-systemet att bygga först.',
    highlight: 'Börja med det verkliga arbetet—inte en generell funktionslista.',
  },
  {
    version: 'BYGG',
    title: 'Få ett användbart första CRM.',
    text: 'Company Natives specialister designar och bygger en tydlig plats för det kundarbete som betyder mest. Den första versionen är fokuserad så att teamet snabbt kan börja använda den.',
    highlight: 'Företaget får fungerande programvara, inte ett kravdokument.',
  },
  {
    version: 'ANVÄND',
    title: 'Förbättra genom verklig användning.',
    text: 'Teamet visar vad som hjälper, vad som saknas och vad som skapar mer arbete. Vi använder reaktionerna och kundnöjdheten för att förbättra CRM-systemet.',
    highlight: 'Verklig användning avgör vad som ska vara kvar.',
  },
  {
    version: 'VÄX',
    title: 'Lägg till det som visar sig värdefullt.',
    text: 'När grunden fungerar kan du lägga till automation, rapportering, integrationer och de delar av leverans eller service som ska hänga ihop med försäljningen.',
    highlight: 'CRM-systemet växer med företaget i stället för att bli en belastning.',
  },
];

type Message = { role: 'assistant' | 'user'; text: string };
type Locale = 'en' | 'se';
type AssessmentResult = {
  opportunity: string;
  whoBenefits: string;
  whyThisStart: string;
  fit: string;
};

function Assessment({ locale }: { locale: Locale }) {
  const swedish = locale === 'se';
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: swedish
        ? 'Hur håller teamet reda på leads och kunder idag?'
        : 'How does your team keep track of leads and customers today?',
    },
  ]);
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<'question' | 'email' | 'complete'>('question');
  const [quickReplies, setQuickReplies] = useState(swedish
    ? ['Kalkylblad', 'Inkorgar och anteckningar', 'Minne och chatt', 'Ett befintligt CRM']
    : ['Spreadsheets', 'Inboxes and notes', 'Memory and chat', 'An existing CRM']);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const [contactOpen, setContactOpen] = useState(false);
  const [contactStep, setContactStep] = useState<'message' | 'email'>('message');
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
    if (contactStep === 'message') {
      if (!contactMessage.trim()) return;
      setContactStep('email');
      return;
    }
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
          <div><strong>{swedish ? 'Planera ditt första CRM' : 'Plan your first CRM'}</strong><small>{swedish ? 'Tar oftast 4–6 minuter' : 'Usually 4–6 minutes'}</small></div>
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
              ? (swedish ? 'Till CRM-planen' : 'Back to CRM plan')
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
              <button type="button" onClick={returnToAssessment}>{swedish ? 'Fortsätt med CRM-planen' : 'Continue with the CRM plan'} <Arrow /></button>
            </div>
          ) : (
            <>
              <div className="messages contact-messages" aria-live="polite">
                <div className="message assistant"><span className="tiny-orb">AI</span><p>{swedish ? 'Vad vill du att vi ska veta?' : 'What would you like us to know?'}</p></div>
                {contactStep === 'email' && (
                  <>
                    {contactMessage.trim() && <div className="message user"><p>{contactMessage.trim()}</p></div>}
                    <div className="message assistant"><span className="tiny-orb">AI</span><p>{swedish ? 'Vilken jobbmejl kan vi svara till?' : 'Which work email should we reply to?'}</p></div>
                  </>
                )}
              </div>
              {contactStep === 'message' && (
                <div className="quick-answers contact-quick-answers">
                  <button type="button" onClick={() => setContactStep('email')}>{swedish ? 'Jag vill bara bli kontaktad' : 'I only need a reply'}</button>
                </div>
              )}
              <form className="chat-input" onSubmit={submitContact}>
                <label className="sr-only" htmlFor="contact-answer">{contactStep === 'message' ? (swedish ? 'Ditt meddelande' : 'Your message') : (swedish ? 'Jobbmejl' : 'Work email')}</label>
                <input
                  id="contact-answer"
                  type={contactStep === 'email' ? 'email' : 'text'}
                  autoComplete={contactStep === 'email' ? 'email' : 'off'}
                  maxLength={contactStep === 'email' ? 254 : 1200}
                  value={contactStep === 'email' ? contactEmail : contactMessage}
                  onChange={(event) => contactStep === 'email' ? setContactEmail(event.target.value) : setContactMessage(event.target.value)}
                  placeholder={contactStep === 'email'
                    ? (swedish ? 'du@foretag.se' : 'you@company.com')
                    : (swedish ? 'Skriv ditt meddelande…' : 'Type your message…')}
                  required
                />
                <button type="submit" disabled={contactWorking || (contactStep === 'email' ? !contactEmail.trim() : !contactMessage.trim())} aria-label={contactStep === 'email' ? (swedish ? 'Be oss kontakta dig' : 'Ask us to contact you') : (swedish ? 'Fortsätt' : 'Continue')}>{contactWorking ? '…' : '↑'}</button>
              </form>
              {contactError && <p className="assessment-error" role="alert">{contactError}</p>}
              <p className="assessment-note">{swedish ? 'Dela inte känsliga kund- eller personuppgifter.' : 'Do not share sensitive customer or personal data.'}</p>
              <button className="continue-assessment" type="button" onClick={returnToAssessment}>
                {swedish ? 'Tillbaka till planen för ditt första CRM' : 'Back to your first CRM plan'}
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
              <small>{swedish ? 'DIN BÄSTA STARTPUNKT' : 'YOUR BEST STARTING POINT'}</small>
              <strong>{result.opportunity}</strong>
              <dl>
                <div><dt>{swedish ? 'Vem det hjälper' : 'Who it helps'}</dt><dd>{result.whoBenefits}</dd></div>
                <div><dt>{swedish ? 'Varför börja här' : 'Why start here'}</dt><dd>{result.whyThisStart}</dd></div>
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
                ? (swedish ? 'CRM-planen är klar' : 'CRM plan complete')
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
          <a href="#process">{t('How we build it', 'Så bygger vi det')}</a>
          <a href="#possibilities">{t('What you can build', 'Vad du kan bygga')}</a>
          <a href="#story">{t('Why us', 'Varför oss')}</a>
        </div>
        <div className="nav-actions">
          <a className="language-link" href={swedish ? '/en' : '/se'} lang={swedish ? 'en' : 'sv'} data-funnel-event="language_change" data-funnel-location="navigation">{swedish ? 'EN' : 'SV'}</a>
          <a className="button button-small button-dark" href="#assessment-chat" data-funnel-location="navigation">{t('Plan your first CRM', 'Planera ditt första CRM')} <Arrow /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t('A first CRM for small companies', 'Ett första CRM för mindre företag')}</p>
          <h1>{t('Your first CRM,', 'Ditt första CRM,')} <em>{t('built around how you work.', 'byggt runt hur du arbetar.')}</em></h1>
          <p className="hero-lead">{t(
            'If leads live in spreadsheets, inboxes or memory, Company Native turns the way your team already works into one clear CRM—and improves it with you.',
            'Om leads finns i kalkylblad, inkorgar eller någons minne gör Company Native om teamets verkliga arbetssätt till ett tydligt CRM—och förbättrar det tillsammans med dig.',
          )}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment-chat" data-funnel-location="hero">{t('Plan my first CRM', 'Planera mitt första CRM')} <Arrow /></a>
            <a className="text-link" href="#process">{t('See how we build it', 'Se hur vi bygger det')} <Arrow /></a>
          </div>
          <p className="hero-promise"><span>✓</span> {t(
            'We are starting with about five paid, hands-on CRM builds. You get a working system; your use and feedback help shape what comes next.',
            'Vi börjar med omkring fem betalda CRM-byggen där vi arbetar nära kunden. Du får ett fungerande system; användningen och återkopplingen hjälper oss att bygga nästa steg.',
          )}</p>
          <div className="proof-line">
            <span className="proof-avatars" aria-hidden="true"><i>YY</i><i>10+</i></span>
            <p><strong>{t('Founded FunnelBud in 2015.', 'Grundade FunnelBud 2015.')}</strong><br />{t('More than 450 Swedish companies served.', 'Har hjälpt fler än 450 svenska företag.')}</p>
          </div>
        </div>

        <div className="journey-card" role="group" aria-label={t('The path from scattered customer work to your first CRM', 'Vägen från utspritt kundarbete till ditt första CRM')}>
          <div className="journey-head"><div><span className="status-dot" /> {t('Your first CRM', 'Ditt första CRM')}</div><span className="live-label">{t('BUILT WITH YOU', 'BYGGT MED DIG')}</span></div>
          <div className="journey-body">
            <p className="journey-label">{t('From scattered work to one clear system', 'Från utspritt arbete till ett tydligt system')}</p>
            <div className="journey-step active"><span className="step-number">01</span><div><strong>{t('Bring the customer work together', 'Samla kundarbetet')}</strong><small>{t('Leads, history and next steps.', 'Leads, historik och nästa steg.')}</small></div><span className="step-state">START</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">02</span><div><strong>{t('Fit the CRM to your team', 'Anpassa CRM-systemet efter teamet')}</strong><small>{t('Based on how the work really happens.', 'Utifrån hur arbetet faktiskt går till.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">03</span><div><strong>{t('Remove repeated work', 'Ta bort onödigt dubbelarbete')}</strong><small>{t('Automate the useful steps.', 'Automatisera det som hjälper.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line accent" />
            <div className="journey-step north-star"><span className="step-number">∞</span><div><strong>{t('Keep improving', 'Fortsätt förbättra')}</strong><small>{t('Grow the CRM with the company.', 'Låt CRM-systemet växa med företaget.')}</small></div><span className="spark" aria-hidden="true">✦</span></div>
          </div>
          <div className="journey-footer"><span>{t('Starts simple', 'Börjar enkelt')}</span><span>{t('Owned by you', 'Ägs av dig')}</span><span>{t('Built around your work', 'Byggt runt ditt arbete')}</span></div>
        </div>
      </section>

      <section className="credentials-strip" aria-label={t('FunnelBud experience', 'Erfarenhet från FunnelBud')}>
        <div className="shell credential-grid">
          <div><strong>{t('10+ years', '10+ år')}</strong><span>{t('building CRM and automation', 'med CRM och automation')}</span></div>
          <div><strong>{t('450+ companies', '450+ företag')}</strong><span>{t('served by FunnelBud', 'som FunnelBud har hjälpt')}</span></div>
          <div><strong>{t('Built for SMEs', 'Byggt för mindre företag')}</strong><span>{t('starting without a CRM', 'som börjar utan CRM')}</span></div>
          <div><strong>{t('End to end', 'Hela vägen')}</strong><span>{t('understand, build and improve', 'förstå, bygg och förbättra')}</span></div>
        </div>
      </section>

      <section className="recognition section" aria-labelledby="recognition-heading">
        <div className="shell">
          <div className="recognition-heading">
            <p className="section-kicker">{t('WHEN YOU DO NOT HAVE A CRM YET', 'NÄR DU ÄNNU INTE HAR ETT CRM')}</p>
            <h2 id="recognition-heading">{t('The customer information exists.', 'Kundinformationen finns.')} <em>{t('It is just scattered everywhere.', 'Den är bara utspridd överallt.')}</em></h2>
            <p>{t(
              'Leads, conversations and promises are spread across spreadsheets, inboxes, notes and the people who happen to remember what should happen next.',
              'Leads, samtal och löften är utspridda över kalkylblad, inkorgar, anteckningar och de personer som råkar minnas vad som ska hända härnäst.',
            )}</p>
          </div>
          <div className="recognition-grid">
            <article><small>01</small><h3>{t('The spreadsheet is the customer list', 'Kalkylbladet är kundlistan')}</h3><p>{t('Names and deals are recorded, but the full conversation and next step rarely live beside them.', 'Namn och affärer finns där, men hela dialogen och nästa steg gör det sällan.')}</p></article>
            <article><small>02</small><h3>{t('Follow-up depends on memory', 'Uppföljningen beror på minnet')}</h3><p>{t('A lead moves forward when the right person remembers to call, write or ask what happened.', 'En lead går vidare när rätt person minns att ringa, skriva eller fråga vad som hände.')}</p></article>
            <article><small>03</small><h3>{t('Customer history lives in inboxes', 'Kundhistoriken finns i inkorgar')}</h3><p>{t('The useful context exists, but only the people inside each email thread can see it.', 'Den viktiga informationen finns, men bara personerna i varje mejltråd kan se den.')}</p></article>
            <article><small>04</small><h3>{t('Nobody sees the whole picture', 'Ingen ser hela bilden')}</h3><p>{t('Sales, delivery and service each know one part, so handoffs and reporting take manual work.', 'Försäljning, leverans och service känner till varsin del, så överlämningar och rapportering kräver manuellt arbete.')}</p></article>
          </div>
          <p className="recognition-conclusion">{t(
            'Your first CRM should bring this together without forcing a big-company sales process onto a small team.',
            'Ditt första CRM ska samla allt detta utan att tvinga på ett litet team en säljprocess för storföretag.',
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
        <div className="category-intro"><span>{t('Which first step fits?', 'Vilket första steg passar?')}</span><strong>{t('A standard CRM can be enough. Company Native is for work that needs a better fit.', 'Ett standard-CRM kan räcka. Company Native är till för arbete som behöver passa bättre.')}</strong></div>
        <div className="category-compare">
          <article><small>{t('SPREADSHEETS & INBOXES', 'KALKYLBLAD OCH INKORGAR')}</small><h3>{t('Easy to start. Hard to share.', 'Enkelt att börja. Svårt att dela.')}</h3><p>{t('They work while one person can hold the whole customer picture. They weaken as the team and number of handoffs grow.', 'De fungerar så länge en person kan hålla hela kundbilden i huvudet. De blir svagare när teamet och antalet överlämningar växer.')}</p></article>
          <article><small>{t('FREE STANDARD CRM', 'GRATIS STANDARD-CRM')}</small><h3>{t('A good answer for a standard pipeline', 'Ett bra svar för en standardprocess')}</h3><p>{t('If you mainly need contacts, deals and tasks, a free off-the-shelf CRM may be the right place to start.', 'Om du främst behöver kontakter, affärer och uppgifter kan ett kostnadsfritt standard-CRM vara rätt start.')}</p></article>
          <article className="recommended"><small>COMPANY NATIVE</small><h3>{t('Your first CRM starts with your work', 'Ditt första CRM börjar med ditt arbete')}</h3><p>{t('Company Native handles the understanding, design and build. You get software shaped around how your company sells, delivers and serves customers.', 'Company Native tar hand om kartläggning, design och utveckling. Du får programvara formad efter hur företaget säljer, levererar och hjälper kunder.')}</p></article>
        </div>
        <p className="best-fit"><strong>{t('Best for:', 'Passar bäst för:')}</strong> {t('Founders and customer-facing leaders at SMEs that need their first shared system for sales, delivery or service—and whose real work is more than a standard sales pipeline.', 'Grundare och kundansvariga chefer på mindre företag som behöver sitt första gemensamma system för försäljning, leverans eller service—och där det verkliga arbetet är mer än en vanlig säljprocess.')}</p>
      </section>

      <section className="possibilities section" id="possibilities">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">{t('BUILT AROUND THE WORK THAT MAKES YOU DIFFERENT', 'BYGGT RUNT DET SOM GÖR DITT FÖRETAG UNIKT')}</p><h2>{t('Your first CRM can do more than track deals.', 'Ditt första CRM kan göra mer än att följa affärer.')}</h2></div>
            <p>{t('Bring the customer journey together from the first enquiry through delivery, service and the next opportunity.', 'Samla kundresan från den första förfrågan genom leverans och service till nästa möjlighet.')}</p>
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
            <div><small>{t('START WITH YOUR REAL WORK', 'BÖRJA MED DET VERKLIGA ARBETET')}</small><strong>{t('What should your first CRM make easier?', 'Vad ska ditt första CRM göra enklare?')}</strong></div>
            <a className="button button-dark" href="#assessment-chat" data-funnel-location="after_examples">{t('Plan my first CRM', 'Planera mitt första CRM')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="process section shell" id="process">
        <div className="section-heading centered-heading">
          <p className="section-kicker">{t('HOW YOUR FIRST CRM GETS BUILT', 'SÅ BYGGS DITT FÖRSTA CRM')}</p>
          <h2>{t('Start with the work you already do.', 'Börja med arbetet som redan görs.')}</h2>
          <p>{t('You do not need to design a CRM before talking to us. We start with how the team finds, wins, delivers to and keeps customers, then build the smallest useful system around it.', 'Du behöver inte designa ett CRM innan du pratar med oss. Vi börjar med hur teamet hittar, vinner, levererar till och behåller kunder och bygger sedan det minsta användbara systemet runt det.')}</p>
        </div>
        <div className="phase-list">
          {phases.map((phase, index) => (
            <article className="phase" key={phase.version}>
              <div className="phase-rail"><span>{phase.version}</span>{index < phases.length - 1 && <i />}</div>
              <div className="phase-content"><h3>{phase.title}</h3><p>{phase.text}</p><strong>{phase.highlight}</strong></div>
            </article>
          ))}
        </div>
        <div className="mid-cta migration-cta">
          <div><small>{t('ALREADY HAVE A CRM?', 'HAR DU REDAN ETT CRM?')}</small><strong>{t('You can still start here.', 'Du kan fortfarande börja här.')}</strong><p>{t('Company Native can build the simpler replacement first, then provide paid data migration and customization when you are ready.', 'Company Native kan bygga den enklare ersättaren först och sedan erbjuda betald datamigrering och anpassning när du är redo.')}</p></div>
          <a className="button button-dark" href="#assessment-chat" data-funnel-location="existing_crm">{t('Tell us what you want to leave', 'Berätta vad du vill lämna')} <Arrow /></a>
        </div>
      </section>

      <section className="system-section section">
        <div className="shell">
          <div className="system-intro">
            <div><p className="section-kicker light">{t('WHY THE FIRST BUILDS MATTER', 'VARFÖR DE FÖRSTA BYGGENA ÄR VIKTIGA')}</p><h2>{t('Each CRM should teach us how to build the next one better.', 'Varje CRM ska lära oss att bygga nästa bättre.')}</h2></div>
            <p>{t('Company Native is starting with hands-on builds. We will connect each design choice with real use and customer satisfaction, then use what holds up to improve the next build.', 'Company Native börjar med byggen där vi arbetar nära kunden. Vi kopplar varje designval till verklig användning och kundnöjdhet och använder det som håller för att förbättra nästa bygge.')}</p>
          </div>
          <div className="system-grid">
            {systemSteps.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="system-summary">
            <strong>{t('Today: a paid, hands-on service. Later: a free first-CRM self-builder.', 'Idag: en betald tjänst där vi bygger nära kunden. Senare: en kostnadsfri självbyggare för det första CRM-systemet.')}</strong>
            <p>{t('Paid services will remain for companies that want a much better tailored CRM, deeper automation or help moving from an existing system.', 'Betalda tjänster finns kvar för företag som vill ha ett betydligt bättre anpassat CRM, mer automation eller hjälp att flytta från ett befintligt system.')}</p>
          </div>
          <div className="learning-moat">
            <div className="learning-visual" aria-hidden="true"><span>A</span><span>B</span><span>C</span><i>✦</i></div>
            <div>
              <p className="section-kicker light">{t('SHARED LESSONS, SEPARATE CUSTOMER DATA', 'GEMENSAMMA LÄRDOMAR, SEPARERAD KUNDDATA')}</p>
              <h3>{t('The goal is to reuse what works—not another customer’s private information.', 'Målet är att återanvända det som fungerar—inte en annan kunds privata information.')}</h3>
              <p>{t('As the learning system is built, reusable CRM patterns and measured outcomes should improve future work. Raw messages, customer-specific rules, code and operational data must remain inside each customer’s boundary.', 'När lärsystemet byggs ska återanvändbara CRM-mönster och uppmätta resultat förbättra kommande arbete. Råa meddelanden, kundspecifika regler, kod och verksamhetsdata måste stanna inom varje kunds gräns.')}</p>
              <small>{t('The exact technical and contractual protections are still being designed and must be agreed before customer data is imported.', 'Det exakta tekniska och avtalsmässiga skyddet utformas fortfarande och måste avtalas innan kunddata importeras.')}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="answers section shell">
        <div className="section-heading centered-heading narrow">
          <p className="section-kicker">{t('WHAT STARTING REALLY MEANS', 'VAD DET INNEBÄR ATT BÖRJA')}</p>
          <h2>{t('Your first CRM should make work clearer—not add another project.', 'Ditt första CRM ska göra arbetet tydligare—inte skapa ännu ett projekt.')}</h2>
        </div>
        <div className="answer-grid">
          <article><span>{t('TIME', 'TID')}</span><h3>{t('“We do not have time to design a CRM.”', '”Vi har inte tid att designa ett CRM.”')}</h3><p>{t('You show us how the work happens and react to working versions. Company Native carries the design and development.', 'Du visar hur arbetet går till och reagerar på fungerande versioner. Company Native ansvarar för design och utveckling.')}</p></article>
          <article><span>{t('SIMPLICITY', 'ENKELHET')}</span><h3>{t('“Will a CRM create more admin?”', '”Skapar ett CRM mer administration?”')}</h3><p>{t('It should not. The first version stays small and starts with work the team already does. Anything that adds effort without enough value should change or go.', 'Det ska det inte göra. Den första versionen är liten och börjar med arbete som teamet redan gör. Det som ökar arbetsbördan utan tillräckligt värde ska ändras eller tas bort.')}</p></article>
          <article><span>{t('OWNERSHIP & DATA', 'ÄGANDE OCH DATA')}</span><h3>{t('“Will we own it and control our data?”', '”Kommer vi att äga systemet och styra över vår data?”')}</h3><p>{t('The CRM, code and data are yours. Before any customer data is imported, the hosting, access and protection must be agreed clearly.', 'CRM-systemet och koden är dina. Du styr över datan. Innan kunddata importeras ska drift, åtkomst och skydd vara tydligt överenskomna.')}</p></article>
          <article><span>{t('EXISTING CRM', 'BEFINTLIGT CRM')}</span><h3>{t('“What if we already have a CRM?”', '”Vad händer om vi redan har ett CRM?”')}</h3><p>{t('You are still welcome. We can build the simpler replacement first, then provide paid migration and customization when you are ready to move.', 'Du är fortfarande välkommen. Vi kan bygga den enklare ersättaren först och sedan erbjuda betald migrering och anpassning när du är redo att byta.')}</p></article>
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
            <h2>{t('A decade inside CRM showed what small companies need before complexity takes over.', 'Tio år med CRM visade vad mindre företag behöver innan komplexiteten tar över.')}</h2>
            <p>{t('Yusuf Young founded FunnelBud in 2015. The company helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.', 'Yusuf Young grundade FunnelBud 2015. Företaget hjälpte fler än 450 svenska verksamheter med CRM, försäljning och marknadsautomation innan han lämnade bolaget.')}</p>
            <p>{t('That work showed how quickly customer knowledge becomes scattered and how often a generic CRM adds structure that does not match the company. AI now makes it possible to begin with the company instead of the template.', 'Arbetet visade hur snabbt kundkunskap blir utspridd och hur ofta ett generiskt CRM lägger till struktur som inte passar företaget. AI gör det nu möjligt att börja med företaget i stället för mallen.')}</p>
            <blockquote>{t('“A small company should not have to become a CRM expert before it can stop running customer relationships from spreadsheets and memory.”', '”Ett mindre företag ska inte behöva bli CRM-expert för att slippa sköta kundrelationer med kalkylblad och minne.”')}</blockquote>
            <a href="https://www.funnelbud.com/om-oss/" target="_blank" rel="noreferrer" className="text-link">{t('See the FunnelBud story', 'Läs historien om FunnelBud')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="vision section">
        <div className="shell vision-grid">
          <div className="vision-number">01<span>{t('CRM', 'CRM')}<br />{t('AT A TIME', 'I TAGET')}</span></div>
          <div className="vision-copy">
            <p className="section-kicker light">{t('WHERE THIS IS GOING', 'VART DETTA ÄR PÅ VÄG')}</p>
            <h2>{t('Hands-on builds become a self-builder anyone can start.', 'Byggen nära kunden blir grunden för en självbyggare som alla kan använda.')}</h2>
            <p>{t('The first customer builds teach Company Native what a genuinely useful CRM needs. The next system connects those choices with real use and satisfaction. Then the Build your first CRM button can give smaller companies a free starting point.', 'De första kundbyggena lär Company Native vad ett verkligt användbart CRM behöver. Nästa system kopplar valen till verklig användning och kundnöjdhet. Därefter kan knappen Bygg ditt första CRM ge mindre företag en kostnadsfri start.')}</p>
            <p>{t('Paid services make that CRM substantially better, add tailored work and move data for customers leaving an existing CRM. Over time, more of both building and migration should happen automatically.', 'Betalda tjänster gör CRM-systemet betydligt bättre, lägger till anpassat arbete och flyttar data för kunder som lämnar ett befintligt CRM. Med tiden ska mer av både byggandet och migreringen ske automatiskt.')}</p>
            <div className="vision-outcomes"><span>{t('Hands-on first builds', 'Första byggen nära kunden')}</span><span>{t('Learning from satisfaction', 'Lärande från kundnöjdhet')}</span><span>{t('Free first-CRM builder', 'Kostnadsfri CRM-självbyggare')}</span><span>{t('Paid improvement and migration', 'Betald förbättring och migrering')}</span></div>
          </div>
        </div>
      </section>

      <section className="assessment-section section" id="assessment">
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">{t('YOUR FIRST STEP', 'DITT FÖRSTA STEG')}</p>
            <h2>{t('Find out what your first CRM should do first.', 'Ta reda på vad ditt första CRM ska göra först.')}</h2>
            <p>{t('The planning assistant asks how you track leads and customers today, where work gets lost or repeated and which first CRM workflow could help most.', 'Planeringsassistenten frågar hur du följer leads och kunder idag, var arbete tappas bort eller upprepas och vilket första CRM-flöde som kan hjälpa mest.')}</p>
            <ul>
              <li><span>✓</span> {t('A conversation, not a generic lead form', 'Ett samtal, inte ett vanligt kontaktformulär')}</li>
              <li><span>✓</span> {t('About five minutes', 'Cirka fem minuter')}</li>
              <li><span>✓</span> {t('Your best starting workflow, who it helps and why to start there', 'Ditt bästa startflöde, vem det hjälper och varför du ska börja där')}</li>
            </ul>
            <p className="contact-expectation">{t('Prefer a person? Ask for a personal reply in the same window. The assistant asks what you want us to know and where we can reply, one question at a time. The CRM plan asks for your work email only at the end so the result can be saved and followed up when useful.', 'Föredrar du en person? Be om ett personligt svar i samma fönster. Assistenten frågar vad du vill att vi ska veta och vart vi kan svara, en fråga i taget. CRM-planen frågar efter din jobbmejl först i slutet så att resultatet kan sparas och följas upp när det är relevant.')}</p>
            <p className="privacy-prompt">{t('Only what is needed to prepare and follow up on the CRM plan is stored.', 'Bara det som behövs för att förbereda och följa upp CRM-planen sparas.')} <a href={`/${locale}/privacy`}>{t('How we handle your information', 'Så hanteras dina uppgifter')} <Arrow /></a></p>
            <div className="commercial-promise"><strong>{t('If the plan shows a strong fit, the next step is a paid, hands-on CRM build.', 'Om planen visar att behovet passar är nästa steg ett betalt CRM-bygge där vi arbetar nära dig.')}</strong><p>{t('You get working software; Company Native learns from what your team uses and how satisfied you are.', 'Du får fungerande programvara; Company Native lär sig av vad teamet använder och hur nöjd du är.')}</p></div>
          </div>
          <Assessment locale={locale} />
        </div>
      </section>

      <footer>
        <div className="shell footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true" /><span>Company Native</span></a><p>{t('Your first CRM, built around how you work.', 'Ditt första CRM, byggt runt hur du arbetar.')}</p><a href="#assessment-chat" className="button button-small button-primary" data-funnel-location="footer">{t('Plan my first CRM', 'Planera mitt första CRM')} <Arrow /></a></div>
        <div className="shell footer-bottom"><span>© 2026 Company Native · {t('A Yusuf Young AB company', 'Ett bolag inom Yusuf Young AB')}</span><span><a href={`/${locale}/privacy`}>{t('Privacy', 'Integritet')}</a> · <a href={swedish ? '/en' : '/se'}>{swedish ? 'English' : 'Svenska'}</a></span></div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <Site locale="en" />;
}
