'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { getFunnelSessionId, trackFunnelEvent } from './funnel';

const Arrow = () => <span aria-hidden="true">→</span>;

const englishPhases = [
  {
    version: 'SHOW',
    title: 'Show how customer work already happens.',
    text: 'Choose which Google or Microsoft accounts, history and other sources CRM From Within may use. The system observes the work without silently changing it.',
    highlight: 'You control what the CRM may learn from.',
  },
  {
    version: 'PROPOSE',
    title: 'React to a working CRM, not a requirements document.',
    text: 'The builder finds customers, conversations, opportunities and next steps, then proposes a useful CRM around the way your company works.',
    highlight: 'The CRM starts with your work already inside it.',
  },
  {
    version: 'DECIDE',
    title: 'Answer only what the work cannot explain.',
    text: 'The CRM asks a power user why an exception, handoff or report matters. An expert resolves the difficult decisions and checks the important records.',
    highlight: 'Activity shows what happens. People explain what should happen.',
  },
  {
    version: 'ADAPT',
    title: 'Keep working while the CRM keeps adapting.',
    text: 'Leave a comment when something should change. Our experts turn it into a tested release, ask for approval and keep a safe way back.',
    highlight: 'Every material change is tested, approved and reversible.',
  },
];

const swedishPhases = [
  {
    version: 'VISA',
    title: 'Visa hur kundarbetet redan går till.',
    text: 'Välj vilka Google- eller Microsoft-konton, vilken historik och vilka andra källor CRM From Within får använda. Systemet observerar arbetet utan att göra dolda ändringar.',
    highlight: 'Du styr vad CRM-systemet får lära sig från.',
  },
  {
    version: 'FÖRESLÅ',
    title: 'Reagera på ett fungerande CRM, inte ett kravdokument.',
    text: 'Byggaren hittar kunder, samtal, affärer och nästa steg och föreslår sedan ett användbart CRM runt hur företaget arbetar.',
    highlight: 'CRM-systemet börjar med företagets arbete redan på plats.',
  },
  {
    version: 'AVGÖR',
    title: 'Svara bara på det arbetet inte kan förklara.',
    text: 'CRM-systemet frågar en ansvarig person varför ett undantag, en överlämning eller en rapport spelar roll. En expert löser de svåra besluten och kontrollerar de viktiga posterna.',
    highlight: 'Aktiviteten visar vad som händer. Människor förklarar vad som borde hända.',
  },
  {
    version: 'ANPASSA',
    title: 'Fortsätt arbeta medan CRM-systemet fortsätter anpassa sig.',
    text: 'Lämna en kommentar när något ska ändras. Våra experter gör den till en testad version, ber om godkännande och behåller en trygg väg tillbaka.',
    highlight: 'Varje viktig ändring testas, godkänns och kan återställas.',
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
        ? 'Hur hanterar teamet leads och kunder idag, och vad fungerar inte som ni vill?'
        : 'How does your team handle leads and customers today, and what does not work the way you want?',
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
          <div><strong>{swedish ? 'Se vilket CRM som skulle passa' : 'See what CRM would fit'}</strong><small>{swedish ? 'Tar oftast 4–6 minuter' : 'Usually 4–6 minutes'}</small></div>
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
                ? `Ditt meddelande är sparat. En person från CRM From Within svarar dig på ${contactEmail.trim()}.`
                : `Your message is saved. A person from CRM From Within will reply to you at ${contactEmail.trim()}.`}</p>
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
                {swedish ? 'Tillbaka till planen för ditt CRM' : 'Back to your CRM plan'}
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
              <small>{swedish ? 'DITT FÖRSTA CRM' : 'YOUR FIRST CRM'}</small>
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
  const phases = swedish ? swedishPhases : englishPhases;
  const comparisonRows = swedish ? [
    { aspect: 'Komma igång', old: 'Välj ett system och lägg veckor på att ställa in, lära och anpassa det. Ofta använder teamet det ändå som det är.', fresh: 'Fortsätt arbeta. Du får ett fungerande CRM byggt runt hur företaget redan hanterar kunder.' },
    { aspect: 'Fortsätta passa', old: 'Ta reda på vad systemet stöder och hur det kan anpassas—eller anlita konsulter för att arbeta runt gränserna.', fresh: 'CRM-systemet ser hur arbetet utvecklas, föreslår förbättringar och frågar bara när avsikten är oklar.' },
    { aspect: 'Göra en ändring', old: 'Beställ ännu en konsultinsats och vänta medan befintliga funktioner konfigureras om.', fresh: 'Skriv en kommentar. Våra experter bygger och testar ändringen, ber om ditt godkännande och kan återställa den tryggt.' },
  ] : [
    { aspect: 'Getting started', old: 'Choose a system and spend weeks configuring, learning and adapting it. The team often ends up using it as it is.', fresh: 'Keep working. Receive a working CRM built around how your company already handles customers.' },
    { aspect: 'Keeping it useful', old: 'Work out what the system supports and how to customize it—or hire consultants to work around its limits.', fresh: 'The CRM observes how the work develops, proposes improvements and asks only when the intent is unclear.' },
    { aspect: 'Making a change', old: 'Commission another consulting project and wait while existing features are reconfigured.', fresh: 'Leave a comment. Our experts build and test the change, ask for your approval and can roll it back safely.' },
  ];

  return (
    <main lang={swedish ? 'sv' : 'en'}>
      <nav className="nav shell" aria-label={t('Main navigation', 'Huvudmeny')}>
        <a className="brand" href="#top" aria-label={t('CRM From Within home', 'CRM From Within startsida')}>
          <span className="brand-mark" aria-hidden="true" />
          <span>CRM From Within</span>
        </a>
        <div className="nav-links">
          <a href="#capabilities">{t('What you get', 'Det här får du')}</a>
          <a href="#compare">{t('Compare', 'Jämför')}</a>
          <a href="#pricing">{t('Early access', 'Tidig tillgång')}</a>
        </div>
        <div className="nav-actions">
          <a className="language-link" href={swedish ? '/en' : '/se'} lang={swedish ? 'en' : 'sv'} data-funnel-event="language_change" data-funnel-location="navigation">{swedish ? 'EN' : 'SV'}</a>
          <a className="button button-small button-dark" href="#assessment-chat" data-funnel-location="navigation">{t('See if it fits', 'Se om det passar')} <Arrow /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t('MANAGED ADAPTIVE CRM · IN DEVELOPMENT', 'HANTERAT, ANPASSNINGSBART CRM · UNDER UTVECKLING')}</p>
          <h1>{t('A production-ready CRM that', 'Ett produktionsklart CRM som')} <em>{t('shapes itself around your company.', 'formar sig efter ditt företag.')}</em></h1>
          <p className="hero-lead">{t(
            'Keep working as you do now. CRM From Within learns from the customer work you approve, asks a power user what the activity cannot explain and safely adapts the CRM for your team.',
            'Fortsätt arbeta som i dag. CRM From Within lär sig av kundarbetet du godkänner, frågar en ansvarig person om det aktiviteten inte kan förklara och anpassar CRM-systemet tryggt för teamet.',
          )}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment-chat" data-funnel-location="hero">{t('See if it fits your company', 'Se om det passar ditt företag')} <Arrow /></a>
            <a className="text-link" href="#process">{t('See how it adapts', 'Se hur det anpassar sig')} <Arrow /></a>
          </div>
          <p className="hero-promise"><span>✓</span> {t(
            'You do not configure it yourself. The system proposes; an expert checks the important decisions; your company approves every material change.',
            'Du ställer inte in det själv. Systemet föreslår, en expert kontrollerar de viktiga besluten och företaget godkänner varje större ändring.',
          )}</p>
          <div className="proof-line">
            <span className="proof-avatars" aria-hidden="true"><i>YY</i><i>10+</i></span>
            <p><strong>{t('Founded FunnelBud in 2015.', 'Grundade FunnelBud 2015.')}</strong><br />{t('More than 450 Swedish companies served.', 'Har hjälpt fler än 450 svenska företag.')}</p>
          </div>
        </div>

        <div className="journey-card" role="group" aria-label={t('How CRM From Within adapts to your company', 'Så anpassar sig CRM From Within till företaget')}>
          <div className="journey-head"><div><span className="status-dot" /> {t('Your adaptive CRM', 'Ditt anpassningsbara CRM')}</div><span className="live-label">{t('SHAPES ITSELF AROUND YOU', 'FORMAR SIG EFTER DIG')}</span></div>
          <div className="journey-body">
            <p className="journey-label">{t('From the work you do to the CRM you need', 'Från arbetet du gör till det CRM du behöver')}</p>
            <div className="journey-step active"><span className="step-number">01</span><div><strong>{t('Show how the work happens', 'Visa hur arbetet går till')}</strong><small>{t('Approved activity reveals customers and handoffs.', 'Godkänd aktivitet visar kunder och överlämningar.')}</small></div><span className="step-state">START</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">02</span><div><strong>{t('React to a working version', 'Reagera på en fungerande version')}</strong><small>{t('The CRM asks only what the work cannot answer.', 'CRM-systemet frågar bara om det arbetet inte kan svara på.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line" />
            <div className="journey-step north-star"><span className="step-number">03</span><div><strong>{t('Keep using it as needs change', 'Fortsätt använda det när behoven ändras')}</strong><small>{t('Experts test, approve and safely release changes.', 'Experter testar, godkänner och lanserar ändringar tryggt.')}</small></div><span className="spark" aria-hidden="true">✦</span></div>
          </div>
          <div className="journey-footer"><span>{t('No setup project', 'Inget installationsprojekt')}</span><span>{t('Expert verified', 'Granskat av expert')}</span><span>{t('Safe rollback', 'Trygg återställning')}</span></div>
        </div>
      </section>

      <section className="credentials-strip" aria-label={t('FunnelBud experience', 'Erfarenhet från FunnelBud')}>
        <div className="shell credential-grid">
          <div><strong>{t('10+ years', '10+ år')}</strong><span>{t('building CRM and automation', 'med CRM och automation')}</span></div>
          <div><strong>{t('450+ companies', '450+ företag')}</strong><span>{t('served by FunnelBud', 'som FunnelBud har hjälpt')}</span></div>
          <div><strong>{t('Built for established SMEs', 'Byggt för etablerade små och medelstora företag')}</strong><span>{t('without a dedicated CRM administrator', 'utan en särskild CRM-administratör')}</span></div>
          <div><strong>{t('Adapts as you work', 'Anpassar sig medan du arbetar')}</strong><span>{t('observe, ask, build, test and improve', 'observera, fråga, bygg, testa och förbättra')}</span></div>
        </div>
      </section>

      <section className="recognition section" id="capabilities" aria-labelledby="recognition-heading">
        <div className="shell">
          <div className="recognition-heading">
            <p className="section-kicker">{t('WHEN YOU NEED A CRM—NOT A CRM PROJECT', 'NÄR DU BEHÖVER ETT CRM—INTE ETT CRM-PROJEKT')}</p>
            <h2 id="recognition-heading">{t('Your company has its own way of working.', 'Ditt företag har sitt eget sätt att arbeta.')} <em>{t('Your CRM should follow it.', 'CRM-systemet ska följa det.')}</em></h2>
            <p>{t(
              'Most companies do not follow a generic pipeline. They have their own customers, handoffs, exceptions and measures—but nobody wants to spend months turning those differences into CRM settings.',
              'De flesta företag följer inte en generell pipeline. De har sina egna kunder, överlämningar, undantag och mått—men ingen vill lägga månader på att göra de skillnaderna till CRM-inställningar.',
            )}</p>
          </div>
          <div className="recognition-grid">
            <article><small>01</small><h3>{t('The real process crosses tools', 'Det verkliga arbetet går mellan flera verktyg')}</h3><p>{t('Customer history, next steps and handoffs live across inboxes, spreadsheets, calls and the people who remember.', 'Kundhistorik, nästa steg och överlämningar finns i inkorgar, kalkylblad, samtal och hos personerna som minns.')}</p></article>
            <article><small>02</small><h3>{t('A standard pipeline is not enough', 'En standardpipeline räcker inte')}</h3><p>{t('The company may sell, onboard, deliver and support in one connected process that a generic sales CRM does not represent.', 'Företaget kan sälja, introducera, leverera och hjälpa kunden i ett sammanhängande flöde som ett generellt sälj-CRM inte visar.')}</p></article>
            <article><small>03</small><h3>{t('Flexibility becomes another job', 'Flexibilitet blir ännu ett arbete')}</h3><p>{t('A powerful CRM can support more, but somebody must learn it, design it and keep every rule working.', 'Ett kraftfullt CRM kan stödja mer, men någon måste lära sig det, utforma det och hålla varje regel fungerande.')}</p></article>
            <article><small>04</small><h3>{t('Nobody wants to administer the CRM', 'Ingen vill administrera CRM-systemet')}</h3><p>{t('The team wants clear customer work—not another system that needs an owner before it becomes useful.', 'Teamet vill ha tydligt kundarbete—inte ännu ett system som behöver en ansvarig innan det blir användbart.')}</p></article>
          </div>
          <p className="recognition-conclusion">{t(
            'CRM From Within gives you the fit of custom software without making your team design, build or administer it.',
            'CRM From Within ger dig passformen hos specialbyggd programvara utan att teamet behöver designa, bygga eller administrera den.',
          )}</p>
          <div className="capabilities-heading">
            <p className="section-kicker">{t('WHAT YOUR CRM CAN DO', 'VAD DITT CRM KAN GÖRA')}</p>
            <h3>{t('Everything you need to turn more leads into customers.', 'Allt du behöver för att göra fler leads till kunder.')}</h3>
            <p>{t('Start with the essentials. Add the advanced parts only when they solve a real problem or create enough value.', 'Börja med det viktigaste. Lägg bara till avancerade delar när de löser ett verkligt problem eller skapar tillräckligt värde.')}</p>
          </div>
          <div className="capability-grid">
            <article><span>01</span><h4>{t('Manage incoming leads', 'Hantera inkommande leads')}</h4><p>{t('Capture every enquiry, assign the next step and see who needs attention.', 'Samla varje förfrågan, tilldela nästa steg och se vem som behöver uppmärksamhet.')}</p></article>
            <article><span>02</span><h4>{t('Automatically update your opportunities', 'Uppdatera affärsmöjligheter automatiskt')}</h4><p>{t('Keep stages, values and next actions current without chasing people for updates.', 'Håll steg, värden och nästa aktiviteter aktuella utan att jaga teamet efter uppdateringar.')}</p></article>
            <article><span>03</span><h4>{t('Get the perfect dashboards', 'Få perfekta dashboards')}</h4><p>{t('See the numbers your company actually uses instead of adapting to a generic report.', 'Se siffrorna som företaget faktiskt använder i stället för att anpassa er till en generell rapport.')}</p></article>
            <article><span>04</span><h4>{t('Automate lead outreach', 'Automatisera bearbetning av leads')}</h4><p>{t('Send the right follow-up and stop the sequence when a real conversation starts.', 'Skicka rätt uppföljning och stoppa sekvensen när en riktig dialog börjar.')}</p></article>
            <article><span>05</span><h4>{t('Convert leads on your website', 'Konvertera leads på webbplatsen')}</h4><p>{t('Turn forms and chat conversations into qualified leads inside the CRM.', 'Gör formulär och chattdialoger till kvalificerade leads direkt i CRM-systemet.')}</p></article>
            <article><span>06</span><h4>{t('Log calls and meetings', 'Logga samtal och möten')}</h4><p>{t('Keep the conversation, outcome and next step beside the customer record.', 'Spara samtalet, resultatet och nästa steg tillsammans med kundposten.')}</p></article>
          </div>
          <p className="capability-note">{t('Email, phone and other external connections are added carefully and priced separately because they need more testing than an in-app feature.', 'Kopplingar till e-post, telefoni och andra externa system läggs till varsamt och prissätts separat eftersom de behöver testas mer än en funktion inne i CRM-systemet.')}</p>
          <div className="build-boundary" aria-labelledby="build-boundary-heading">
            <div className="build-boundary-heading">
              <p className="section-kicker">{t('CUSTOM WHERE IT HELPS. PROVEN WHERE FAILURE HURTS.', 'ANPASSAT DÄR DET HJÄLPER. BEPRÖVAT DÄR FEL GÖR SKADA.')}</p>
              <h3 id="build-boundary-heading">{t('Your workflow can be unique. Security and customer data should not be experiments.', 'Ditt arbetsflöde kan vara unikt. Säkerhet och kunddata ska inte vara experiment.')}</h3>
              <p>{t('The system may generate company-specific code for the work that makes you different. Authentication, permissions, synchronization, audit history and backups come from a tested foundation and are checked again when your CRM changes.', 'Systemet kan generera företagsspecifik kod för arbetet som gör er unika. Inloggning, behörigheter, synkronisering, ändringshistorik och säkerhetskopiering kommer från en testad grund och kontrolleras igen när CRM-systemet ändras.')}</p>
            </div>
            <div className="build-boundary-grid">
              <article>
                <small>{t('TESTED CRM FOUNDATION', 'TESTAD CRM-GRUND')}</small>
                <h4>{t('The parts that must work every time', 'Delarna som måste fungera varje gång')}</h4>
                <ul><li>{t('Users and permissions', 'Användare och behörigheter')}</li><li>{t('Contact and company matching', 'Matchning av kontakter och företag')}</li><li>{t('Duplicate handling and synchronization', 'Dubbletthantering och synkronisering')}</li><li>{t('Audit history, undo and backups', 'Ändringshistorik, ångra och säkerhetskopiering')}</li></ul>
              </article>
              <article className="adaptive">
                <small>{t('GENERATED AROUND YOUR COMPANY', 'GENERERAT RUNT DITT FÖRETAG')}</small>
                <h4>{t('The parts that should be different', 'Delarna som ska vara annorlunda')}</h4>
                <ul><li>{t('Customer stages and handoffs', 'Kundsteg och överlämningar')}</li><li>{t('Fields, views and dashboards', 'Fält, vyer och dashboards')}</li><li>{t('Next-step and opportunity rules', 'Regler för nästa steg och affärer')}</li><li>{t('Special workflows and automation', 'Särskilda arbetsflöden och automation')}</li></ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison section" id="compare">
        <div className="shell">
          <div className="section-heading centered-heading comparison-heading">
            <p className="section-kicker">{t('THE CRM YOU ADAPT VS THE CRM THAT ADAPTS', 'CRM-SYSTEMET DU ANPASSAR MOT CRM-SYSTEMET SOM ANPASSAR SIG')}</p>
            <h2>{t('Do not choose between a quick start and a CRM that fits.', 'Välj inte mellan en snabb start och ett CRM som passar.')}</h2>
            <p>{t('A simple CRM starts quickly but stays rigid. A flexible CRM becomes a project. CRM From Within is built to start useful and keep changing for you.', 'Ett enkelt CRM går snabbt att börja med men förblir stelt. Ett flexibelt CRM blir ett projekt. CRM From Within är byggt för att vara användbart snabbt och fortsätta förändras åt dig.')}</p>
          </div>
          <div className="comparison-table" role="table" aria-label={t('Comparison of a standard CRM and CRM From Within', 'Jämförelse mellan ett standard-CRM och CRM From Within')}>
            <div className="comparison-table-head" role="row">
              <div className="comparison-aspect-head" role="columnheader">{t('WHAT CHANGES', 'VAD SOM FÖRÄNDRAS')}</div>
              <div className="comparison-option old" role="columnheader">
                {/* Vinext's current next/image shim breaks client hydration; dimensions keep this local asset stable without it. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/comparison-standard-crm.webp" alt={t('A crowded standard CRM with many controls, panels and settings', 'Ett fullt standard-CRM med många kontroller, paneler och inställningar')} width="1448" height="1086" loading="lazy" decoding="async" />
                <div><small>{t('THE OLD WAY', 'DET GAMLA SÄTTET')}</small><h3>{t('You adapt to the CRM.', 'Du anpassar dig till CRM-systemet.')}</h3><p>{t('Buy the software, configure it and keep somebody responsible for making the company fit inside it.', 'Köp systemet, ställ in det och gör någon ansvarig för att få företaget att passa in i det.')}</p></div>
              </div>
              <div className="comparison-option fresh" role="columnheader">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/comparison-perfect-fit-crm.webp" alt={t('A calm CRM with a focused pipeline, follow-up list and useful dashboard', 'Ett lugnt CRM med en fokuserad pipeline, uppföljningslista och användbar dashboard')} width="1448" height="1086" loading="lazy" decoding="async" />
                <div><small>CRM FROM WITHIN</small><h3>{t('The CRM adapts to you.', 'CRM-systemet anpassar sig till dig.')}</h3><p>{t('Keep working. The system learns, asks focused questions and is safely changed for your team.', 'Fortsätt arbeta. Systemet lär sig, ställer fokuserade frågor och ändras tryggt för teamet.')}</p></div>
              </div>
            </div>
            <div role="rowgroup">
              {comparisonRows.map((row) => (
                <div className="comparison-row" role="row" key={row.aspect}>
                  <strong className="comparison-aspect" role="rowheader">{row.aspect}</strong>
                  <div className="comparison-cell old" role="cell"><span>{t('OLD WAY', 'GAMLA SÄTTET')}</span>{row.old}</div>
                  <div className="comparison-cell fresh" role="cell"><span>CRM FROM WITHIN</span>{row.fresh}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process section shell" id="process">
        <div className="section-heading centered-heading">
          <p className="section-kicker">{t('HOW YOUR CRM KEEPS ADAPTING', 'SÅ FORTSÄTTER DITT CRM ATT ANPASSA SIG')}</p>
          <h2>{t('Start with the work. Improve it through use.', 'Börja med arbetet. Förbättra det genom användning.')}</h2>
          <p>{t('You do not need to name every field or design a pipeline. Approved activity shows what exists, focused conversations explain the intent, and real use shows what should improve next.', 'Du behöver inte namnge varje fält eller designa en pipeline. Godkänd aktivitet visar vad som finns, fokuserade samtal förklarar avsikten och verklig användning visar vad som bör förbättras härnäst.')}</p>
        </div>
        <div className="phase-list">
          {phases.map((phase, index) => (
            <article className="phase" key={phase.version}>
              <div className="phase-rail"><span>{phase.version}</span>{index < phases.length - 1 && <i />}</div>
              <div className="phase-content"><h3>{phase.title}</h3><p>{phase.text}</p><strong>{phase.highlight}</strong></div>
            </article>
          ))}
        </div>
        <div className="mid-cta migration-cta" id="migration">
          <div><small>{t('ALREADY STUCK IN HUBSPOT OR SALESFORCE?', 'REDAN FAST I HUBSPOT ELLER SALESFORCE?')}</small><strong>{t('That is a different job.', 'Det är ett annat uppdrag.')}</strong><p>{t('Company Native builds an owned replacement beside your current CRM and handles the migration only after the new system proves itself.', 'Company Native bygger en ägd ersättare bredvid ditt nuvarande CRM och genomför migreringen först när det nya systemet har bevisat sig.')}</p></div>
          <a className="button button-dark" href="https://companynative.com" data-funnel-location="existing_crm">{t('See Company Native', 'Se Company Native')} <Arrow /></a>
        </div>
      </section>

      <section className="pricing section" id="pricing">
        <div className="shell">
          <div className="section-heading centered-heading pricing-heading">
            <p className="section-kicker">{t('EARLY ACCESS FOR DESIGN PARTNERS', 'TIDIG TILLGÅNG FÖR DESIGNPARTNERS')}</p>
            <h2>{t('Selected design partners can test the first useful version without a build fee.', 'Utvalda designpartners kan testa den första användbara versionen utan byggkostnad.')}</h2>
            <p>{t('The narrow first version proves whether an adaptive CRM helps. Continued operation, expert adaptation and external integrations are paid only after their scope and price are agreed.', 'Den avgränsade första versionen visar om ett anpassningsbart CRM hjälper. Fortsatt drift, expertanpassning och externa integrationer betalas först när omfattning och pris är överenskomna.')}</p>
          </div>
          <div className="pricing-grid">
            <article className="price-card core">
              <div className="price-label"><span>{t('ADAPTIVE CRM PROOF', 'BEVIS FÖR ETT ANPASSNINGSBART CRM')}</span><strong>{t('SELECTED COMPANIES', 'UTVALDA FÖRETAG')}</strong></div>
              <h3>{t('Adaptive CRM proof', 'Bevis för ett anpassningsbart CRM')}</h3>
              <p className="price-intro">{t('A focused working CRM built from approved sources, a short consultation and expert review.', 'Ett fokuserat fungerande CRM byggt från godkända källor, ett kort samtal och expertgranskning.')}</p>
              <div className="price"><strong>{t('$0', '0 kr')}</strong><span>{t('build fee', 'byggkostnad')}</span></div>
              <div className="monthly"><strong>{t('Limited early access', 'Begränsad tidig tillgång')}</strong><span>{t('We select companies where a focused adaptive CRM can create a clear, testable benefit.', 'Vi väljer företag där ett fokuserat anpassningsbart CRM kan skapa en tydlig nytta som går att testa.')}</span></div>
              <ul><li>{t('Contacts, companies and customer history', 'Kontakter, företag och kundhistorik')}</li><li>{t('Likely opportunities, ownership and next steps', 'Troliga affärer, ansvariga och nästa steg')}</li><li>{t('One focused pipeline and useful dashboard', 'En fokuserad pipeline och användbar dashboard')}</li><li>{t('Expert review before the team relies on it', 'Expertgranskning innan teamet förlitar sig på det')}</li><li>{t('A clear way to correct the builder', 'Ett tydligt sätt att rätta byggaren')}</li></ul>
              <a className="button button-primary" href="#assessment-chat" data-funnel-location="pricing_core">{t('Apply as a design partner', 'Ansök som designpartner')} <Arrow /></a>
            </article>
            <article className="price-card">
              <div className="price-label"><span>{t('KEEP IT RUNNING', 'HÅLL DET IGÅNG')}</span></div>
              <h3>{t('Managed operation', 'Hanterad drift')}</h3>
              <p className="price-intro">{t('Hosting, synchronization, backups and support after the working version proves useful.', 'Drift, synkronisering, säkerhetskopiering och support efter att den fungerande versionen har visat nytta.')}</p>
              <div className="price"><strong>{t('Agreed later', 'Bestäms senare')}</strong><span>{t('no commitment before the first build', 'inget åtagande före första bygget')}</span></div>
              <ul><li>{t('Reliable hosting and monitoring', 'Tillförlitlig drift och övervakning')}</li><li>{t('Approved email and calendar synchronization', 'Godkänd synkronisering av e-post och kalender')}</li><li>{t('Backups and recovery', 'Säkerhetskopiering och återställning')}</li><li>{t('Security and core-module updates', 'Säkerhets- och grunduppdateringar')}</li><li>{t('Help when something stops working', 'Hjälp när något slutar fungera')}</li></ul>
              <a className="button button-dark" href="#assessment-chat" data-funnel-location="pricing_features">{t('See if it fits', 'Se om det passar')} <Arrow /></a>
            </article>
            <article className="price-card connected">
              <div className="price-label"><span>{t('ADD WHEN IT CREATES VALUE', 'LÄGG TILL NÄR DET SKAPAR VÄRDE')}</span></div>
              <h3>{t('Expert adaptation and integrations', 'Expertanpassning och integrationer')}</h3>
              <p className="price-intro">{t('Request a change inside the CRM. Special workflows and external connections are designed, tested and priced before work begins.', 'Be om en ändring inne i CRM-systemet. Särskilda arbetsflöden och externa kopplingar designas, testas och prissätts innan arbetet börjar.')}</p>
              <div className="price"><strong>{t('Quoted first', 'Offert först')}</strong><span>{t('pay only for approved work', 'betala bara för godkänt arbete')}</span></div>
              <ul><li>{t('Custom workflows and dashboards', 'Anpassade arbetsflöden och dashboards')}</li><li>{t('Lead outreach and website conversion', 'Bearbetning av leads och webbkonvertering')}</li><li>{t('Phone, SMS or WhatsApp systems', 'System för telefoni, SMS eller WhatsApp')}</li><li>{t('Accounting and operational systems', 'Ekonomi- och verksamhetssystem')}</li><li>{t('Permissions, error handling and end-to-end testing', 'Behörigheter, felhantering och testning från början till slut')}</li></ul>
              <a className="button button-dark" href="#assessment-chat" data-funnel-location="pricing_integrations">{t('Tell us what should change', 'Berätta vad som ska ändras')} <Arrow /></a>
            </article>
          </div>
          <p className="pricing-note">{t('The free build is an early design-partner offer, not a permanent free plan. We will agree any hosting, expert work, supplier charges and usage costs before you accept them.', 'Det kostnadsfria bygget är ett tidigt erbjudande för designpartners, inte en permanent gratisplan. Vi kommer överens om drift, expertarbete, leverantörsavgifter och användningskostnader innan du accepterar dem.')}</p>
        </div>
      </section>

      <section className="answers section shell">
        <div className="section-heading centered-heading narrow">
          <p className="section-kicker">{t('WHEN THIS IS THE RIGHT START', 'NÄR DET HÄR ÄR RÄTT START')}</p>
          <h2>{t('Choose CRM From Within when the company needs a better fit—but nobody wants a CRM project.', 'Välj CRM From Within när företaget behöver bättre passform—men ingen vill ha ett CRM-projekt.')}</h2>
        </div>
        <div className="answer-grid">
          <article><span>{t('NO CRM ADMIN', 'INGEN CRM-ADMINISTRATÖR')}</span><h3>{t('“Who is going to customize and maintain it?”', '”Vem ska anpassa och underhålla det?”')}</h3><p>{t('Not your team. The CRM observes the work, asks focused questions and is changed by the system and our experts. Your company decides what is approved.', 'Inte ditt team. CRM-systemet observerar arbetet, ställer fokuserade frågor och ändras av systemet och våra experter. Företaget avgör vad som godkänns.')}</p></article>
          <article><span>{t('SIMPLICITY', 'ENKELHET')}</span><h3>{t('“Will a CRM create more admin?”', '”Skapar ett CRM mer administration?”')}</h3><p>{t('It should not. The core stays small and starts with work the team already does. Anything that adds effort without enough value should change or go.', 'Det ska det inte göra. Grunden är liten och börjar med arbete som teamet redan gör. Det som ökar arbetsbördan utan tillräckligt värde ska ändras eller tas bort.')}</p></article>
          <article><span>{t('DATA & CONTROL', 'DATA OCH KONTROLL')}</span><h3>{t('“What happens to our data?”', '”Vad händer med vår data?”')}</h3><p>{t('You choose the approved sources and history. Data export, deletion, hosting, access and protection must be agreed clearly before real customer information is imported.', 'Du väljer godkända källor och historik. Dataexport, radering, drift, åtkomst och skydd ska vara tydligt överenskomna innan riktig kundinformation importeras.')}</p></article>
          <article><span>{t('STANDARD CRM', 'STANDARD-CRM')}</span><h3>{t('“Why not just use HubSpot Free?”', '”Varför inte bara använda HubSpot Free?”')}</h3><p>{t('You should if a generic pipeline is enough and you are happy to configure it. Choose CRM From Within when the main problem is having to design, populate and adapt the CRM yourself.', 'Det bör du göra om en generell pipeline räcker och du gärna ställer in den själv. Välj CRM From Within när huvudproblemet är att själv behöva designa, fylla och anpassa CRM-systemet.')}</p></article>
        </div>
      </section>

      <section className="story section" id="story">
        <div className="shell story-grid">
          <div className="story-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/yusuf-young.jpg" alt={t('Yusuf Young, founder of CRM From Within and FunnelBud', 'Yusuf Young, grundare av CRM From Within och FunnelBud')} />
            <span>YUSUF YOUNG · {t('FOUNDER', 'GRUNDARE')}</span>
          </div>
          <div className="story-copy">
            <p className="section-kicker">{t('WHY WE ARE BUILDING THIS', 'VARFÖR VI BYGGER DETTA')}</p>
            <h2>{t('A decade inside CRM showed why every company wants a different system—but few want to build one.', 'Tio år med CRM visade varför varje företag vill ha ett annorlunda system—men få vill bygga ett.')}</h2>
            <p>{t('Yusuf Young founded FunnelBud in 2015. The company helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.', 'Yusuf Young grundade FunnelBud 2015. Företaget hjälpte fler än 450 svenska verksamheter med CRM, försäljning och marknadsautomation innan han lämnade bolaget.')}</p>
            <p>{t('That work showed how quickly customer knowledge becomes scattered and how often a generic CRM adds structure that does not match the company. AI now makes it possible to begin with the company instead of the template.', 'Arbetet visade hur snabbt kundkunskap blir utspridd och hur ofta ett generiskt CRM lägger till struktur som inte passar företaget. AI gör det nu möjligt att börja med företaget i stället för mallen.')}</p>
            <blockquote>{t('“A company should not have to become a CRM expert before it can get a CRM that follows the way it works.”', '”Ett företag ska inte behöva bli CRM-expert för att få ett CRM som följer hur det arbetar.”')}</blockquote>
            <a href="https://www.funnelbud.com/om-oss/" target="_blank" rel="noreferrer" className="text-link">{t('See the FunnelBud story', 'Läs historien om FunnelBud')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="assessment-section section" id="assessment">
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">{t('APPLY FOR EARLY ACCESS', 'ANSÖK OM TIDIG TILLGÅNG')}</p>
            <h2>{t('See what an adaptive CRM could change for your company.', 'Se vad ett anpassningsbart CRM skulle kunna förändra för ditt företag.')}</h2>
            <p>{t('Answer a few questions about how leads and customers are handled today and what does not fit. You will see the most useful place to begin, then leave a work email so we can review whether the design-partner build is suitable.', 'Svara på några frågor om hur leads och kunder hanteras idag och vad som inte passar. Du får se var det är mest värdefullt att börja och lämnar sedan en jobbmejl så att vi kan bedöma om designpartnerbygget passar.')}</p>
            <p className="contact-expectation">{t('If selected, a person will contact you before any account is connected or customer data is imported.', 'Om företaget väljs ut kontaktar en person dig innan något konto kopplas eller kunddata importeras.')}</p>
            <p className="privacy-prompt">{t('Do not share sensitive customer data.', 'Dela inte känsliga kunduppgifter.')} <a href={`/${locale}/privacy`}>{t('How we handle your information', 'Så hanteras dina uppgifter')} <Arrow /></a></p>
          </div>
          <Assessment locale={locale} />
        </div>
      </section>

      <footer>
        <div className="shell footer-top"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true" /><span>CRM From Within</span></a><p>{t('A production-ready CRM that shapes itself around your company.', 'Ett produktionsklart CRM som formar sig efter ditt företag.')}</p><a href="#assessment-chat" className="button button-small button-primary" data-funnel-location="footer">{t('See if it fits', 'Se om det passar')} <Arrow /></a></div>
        <div className="shell footer-bottom"><span>© 2026 CRM From Within · {t('A Yusuf Young AB company', 'Ett bolag inom Yusuf Young AB')}</span><span><a href={`/${locale}/privacy`}>{t('Privacy', 'Integritet')}</a> · <a href={swedish ? '/en' : '/se'}>{swedish ? 'English' : 'Svenska'}</a></span></div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <Site locale="en" />;
}
