'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

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
    title: 'Driv leveransen på ert sätt',
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
    tags: ['Leadfördelning', 'Dialler', 'Prognos'],
  },
];

const englishSystemSteps = [
  ['Observe', 'Our software learns which parts of your current CRM people use, where work slows down and what happens outside the system.'],
  ['Ask', 'Approved power users can explain an action in the moment, so we learn why the work happens—not only where they clicked.'],
  ['Design', 'We turn real usage into requirements and working mockups for the safe first move, the better system and the long-term vision.'],
  ['Refine', 'Your leadership and users shape the mockups with our CRM specialists before development begins.'],
  ['Build & move', 'Our engineers build, integrate, import the data, train your team and move people across only when the new system is better.'],
  ['Keep improving', 'The system keeps spotting bugs, repeated work and improvement opportunities, then brings the useful ones to you.'],
];

const swedishSystemSteps = [
  ['Observera', 'Vår programvara lär sig vilka delar av ert CRM som används, var arbetet bromsar och vad som sker utanför systemet.'],
  ['Fråga', 'Utvalda superanvändare kan förklara en handling i stunden, så att vi förstår varför arbetet görs—inte bara var de klickade.'],
  ['Designa', 'Vi omvandlar verklig användning till krav och fungerande skisser för det säkra första steget, det bättre systemet och den långsiktiga visionen.'],
  ['Förfina', 'Ledning och användare formar skisserna tillsammans med våra CRM-specialister innan utvecklingen börjar.'],
  ['Bygg och flytta', 'Våra ingenjörer bygger, integrerar, importerar data, utbildar teamet och flyttar användarna först när det nya systemet är bättre.'],
  ['Fortsätt förbättra', 'Systemet fortsätter hitta buggar, upprepat arbete och förbättringsmöjligheter och presenterar de värdefulla för er.'],
];

const englishPhases = [
  {
    version: 'V0',
    title: 'Value now. No migration.',
    text: 'We add one small, useful improvement to your existing setup. Your team gets an immediate benefit while our system learns how the work really happens.',
    highlight: 'If your team does not use it, you get your money back.',
  },
  {
    version: 'V1',
    title: 'Everything you rely on. Less work.',
    text: 'We recreate what already works, remove manual steps and keep the interface familiar. One or two people prove it first. Nobody moves until it is at least as good as today.',
    highlight: 'Migrate to something proven—not to hope.',
  },
  {
    version: 'V2',
    title: 'A better way to run the business.',
    text: 'Now we redesign the work itself. Sales, marketing, delivery and service become one streamlined customer journey, with more automated behind the scenes.',
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
    text: 'Vi lägger till en liten, användbar förbättring i er befintliga miljö. Teamet får nytta direkt medan vårt system lär sig hur arbetet faktiskt går till.',
    highlight: 'Om teamet inte använder den får ni pengarna tillbaka.',
  },
  {
    version: 'V1',
    title: 'Allt ni behöver. Mindre arbete.',
    text: 'Vi återskapar det som redan fungerar, tar bort manuella steg och håller gränssnittet bekant. En eller två personer bevisar lösningen först. Ingen flyttar förrän den är minst lika bra som idag.',
    highlight: 'Migrera till något bevisat—inte till ett hopp.',
  },
  {
    version: 'V2',
    title: 'Ett bättre sätt att driva verksamheten.',
    text: 'Nu gör vi om själva arbetssättet. Försäljning, marknadsföring, leverans och service blir en sammanhängande kundresa med mer automation i bakgrunden.',
    highlight: 'Förändra processen först när den säkra grunden fungerar.',
  },
  {
    version: 'NORDSTJÄRNAN',
    title: 'Företaget ni vill bli.',
    text: 'Ert CRM växer till verksamhetens kundnära operativsystem—format av er strategi, ert varumärke och era värderingar, och uppdaterat när ambitionen förändras.',
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
        ? 'Vilket CRM använder eller överväger ni idag?'
        : 'Which CRM are you using or considering today?',
    },
  ]);
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<'question' | 'email' | 'complete'>('question');
  const [quickReplies, setQuickReplies] = useState(['HubSpot', 'Salesforce', 'Pipedrive', swedish ? 'Något annat' : 'Something else']);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [messages, working]);

  async function sendAnswer(value: string) {
    const clean = value.trim();
    if (!clean || state === 'complete' || working) return;

    const isEmailStep = state === 'email';
    const nextMessages = isEmailStep ? messages : [...messages, { role: 'user' as const, text: clean }];
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
    } catch (caught) {
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

  return (
    <div className="assessment-window" id="assessment-chat">
      <div className="assessment-topbar">
        <div className="assistant-identity">
          <span className="assistant-orb">AI</span>
          <div><strong>{swedish ? 'CRM-bedömning' : 'CRM assessment'}</strong><small>{swedish ? 'Tar oftast 4–6 minuter' : 'Usually 4–6 minutes'}</small></div>
        </div>
        <span className="private-label">{swedish ? 'Privat samtal' : 'Private conversation'}</span>
      </div>
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
        <div className="quick-answers" aria-label={swedish ? 'Svarsalternativ' : 'Suggested answers'}>
          {quickReplies.map((choice) => (
            <button key={choice} type="button" onClick={() => sendAnswer(choice)}>{choice}</button>
          ))}
        </div>
      )}
      {result && (
        <div className="assessment-result">
          <small>{swedish ? 'ER TROLIGA FÖRSTA MÖJLIGHET' : 'YOUR LIKELY FIRST OPPORTUNITY'}</small>
          <strong>{result.opportunity}</strong>
          <dl>
            <div><dt>{swedish ? 'Vem det hjälper' : 'Who it helps'}</dt><dd>{result.whoBenefits}</dd></div>
            <div><dt>{swedish ? 'Varför före migreringen' : 'Why before migration'}</dt><dd>{result.whyBeforeMigration}</dd></div>
            <div><dt>{swedish ? 'Passform' : 'Fit'}</dt><dd>{result.fit}</dd></div>
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
    <main>
      <nav className="nav shell" aria-label={t('Main navigation', 'Huvudmeny')}>
        <a className="brand" href="#top" aria-label={t('Company Native home', 'Company Native startsida')}>
          <span className="brand-mark" aria-hidden="true">CN</span>
          <span>Company Native</span>
        </a>
        <div className="nav-links">
          <a href="#process">{t('How it works', 'Så fungerar det')}</a>
          <a href="#possibilities">{t('What you can build', 'Vad ni kan bygga')}</a>
          <a href="#story">{t('Why us', 'Varför oss')}</a>
        </div>
        <div className="nav-actions">
          <a className="language-link" href={swedish ? '/en' : '/se'} lang={swedish ? 'en' : 'sv'}>{swedish ? 'EN' : 'SV'}</a>
          <a className="button button-small button-dark" href="#assessment-chat">{t('Start assessment', 'Starta bedömning')} <Arrow /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t('Company-native CRM, handled end to end', 'CRM byggt för ert företag, från början till slut')}</p>
          <h1>{t('Your CRM should fit your business.', 'Ert CRM ska passa er verksamhet.')} <em>{t('Not the other way around.', 'Inte tvärtom.')}</em></h1>
          <p className="hero-lead">{t(
            'We learn how your company really works, design the CRM you actually need, build it, migrate your data and keep improving it—without disrupting your team.',
            'Vi lär oss hur ert företag faktiskt arbetar, designar det CRM ni verkligen behöver, bygger det, migrerar er data och fortsätter förbättra det—utan att störa teamet.',
          )}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment-chat">{t('Start your CRM assessment', 'Starta er CRM-bedömning')} <Arrow /></a>
            <a className="text-link" href="#process">{t('See how we make migration safe', 'Se hur vi gör migreringen trygg')} <Arrow /></a>
          </div>
          <p className="hero-promise"><span>✓</span> {t(
            'Start with one useful improvement—without migrating anything. If your team does not use it, you get your money back.',
            'Börja med en användbar förbättring—utan att migrera något. Om teamet inte använder den får ni pengarna tillbaka.',
          )}</p>
          <div className="proof-line">
            <span className="proof-avatars" aria-hidden="true"><i>YY</i><i>10+</i></span>
            <p><strong>{t('Founded FunnelBud in 2015.', 'Grundade FunnelBud 2015.')}</strong><br />{t('More than 450 Swedish companies served.', 'Har hjälpt fler än 450 svenska företag.')}</p>
          </div>
        </div>

        <div className="journey-card" aria-label={t('The path from your current CRM to your ideal CRM', 'Vägen från ert nuvarande CRM till ert ideala CRM')}>
          <div className="journey-head"><div><span className="status-dot" /> {t('Your CRM transformation', 'Er CRM-förflyttning')}</div><span className="live-label">{t('CONTINUOUS', 'KONTINUERLIG')}</span></div>
          <div className="journey-body">
            <p className="journey-label">{t('A safe path forward', 'En trygg väg framåt')}</p>
            <div className="journey-step active"><span className="step-number">01</span><div><strong>{t('Value before migration', 'Värde före migrering')}</strong><small>{t('One useful pilot. No disruption.', 'En nyttig pilot. Ingen störning.')}</small></div><span className="step-state">START</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">02</span><div><strong>{t('Everything you rely on', 'Allt ni förlitar er på')}</strong><small>{t('Your current CRM, only easier.', 'Ert nuvarande CRM, fast enklare.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line" />
            <div className="journey-step"><span className="step-number">03</span><div><strong>{t('A better way to work', 'Ett bättre arbetssätt')}</strong><small>{t('Remove work. Automate the rest.', 'Ta bort arbete. Automatisera resten.')}</small></div><span className="step-check">✓</span></div>
            <div className="journey-line accent" />
            <div className="journey-step north-star"><span className="step-number">∞</span><div><strong>{t('Your full potential', 'Er fulla potential')}</strong><small>{t('A system as unique as your company.', 'Ett system lika unikt som företaget.')}</small></div><span className="spark" aria-hidden="true">✦</span></div>
          </div>
          <div className="journey-footer"><span>{t('Built around your people', 'Byggt runt era människor')}</span><span>{t('Owned by you', 'Ägs av er')}</span><span>{t('Improves continuously', 'Förbättras löpande')}</span></div>
        </div>
      </section>

      <section className="credentials-strip" aria-label={t('FunnelBud experience', 'Erfarenhet från FunnelBud')}>
        <div className="shell credential-grid">
          <div><strong>{t('10+ years', '10+ år')}</strong><span>{t('building CRM and automation', 'av CRM och automation')}</span></div>
          <div><strong>{t('450+ companies', '450+ företag')}</strong><span>{t('served by FunnelBud', 'hjälpta av FunnelBud')}</span></div>
          <div><strong>{t('Built for SMEs', 'Byggt för SME')}</strong><span>{t('not stripped-down enterprise', 'inte bantad enterprise')}</span></div>
          <div><strong>{t('End to end', 'Hela vägen')}</strong><span>{t('design, build, move and improve', 'designa, bygg, flytta, förbättra')}</span></div>
        </div>
      </section>

      <section className="crm-heart section shell">
        <div className="section-kicker">{t('THE SYSTEM BEHIND THE CUSTOMER EXPERIENCE', 'SYSTEMET BAKOM KUNDUPPLEVELSEN')}</div>
        <div className="heart-grid">
          <h2>{t('Your CRM is not a database. It is how your company', 'Ert CRM är inte en databas. Det är så ert företag')} <em>{t('meets the world.', 'möter världen.')}</em></h2>
          <div className="heart-copy">
            <p>{t('It controls how you find customers, respond to them, win their trust, deliver what you promised, keep them happy and earn the next referral.', 'Det styr hur ni hittar kunder, svarar dem, vinner deras förtroende, levererar det ni lovat, behåller dem och får nästa rekommendation.')}</p>
            <p>{t("Generic software forces your company into somebody else's process. A CRM built around you makes your best way of working easier, faster and consistent.", 'Generisk programvara tvingar in företaget i någon annans process. Ett CRM byggt runt er gör ert bästa arbetssätt enklare, snabbare och konsekvent.')}</p>
          </div>
        </div>
        <div className="customer-flow" aria-label={t('The customer journey controlled by your CRM', 'Kundresan som ert CRM styr')}>
          {(swedish ? ['Attrahera', 'Kvalificera', 'Sälj', 'Leverera', 'Hjälp', 'Väx'] : ['Attract', 'Qualify', 'Sell', 'Deliver', 'Support', 'Grow']).map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>
          ))}
        </div>
        <div className="category-intro"><span>{t('What are you actually buying?', 'Vad köper ni egentligen?')}</span><strong>{t('A managed service that gives you your own software.', 'En hanterad tjänst som ger er er egen programvara.')}</strong></div>
        <div className="category-compare">
          <article><small>{t('GENERIC CRM', 'GENERISKT CRM')}</small><h3>{t('You adapt to the product', 'Ni anpassar er till produkten')}</h3><p>{t('You rent the same system as everybody else and work within the features and process the vendor chooses.', 'Ni hyr samma system som alla andra och arbetar inom funktionerna och processen som leverantören väljer.')}</p></article>
          <article><small>{t('TRADITIONAL CUSTOM BUILD', 'TRADITIONELL SPECIALUTVECKLING')}</small><h3>{t('You manage the project', 'Ni driver projektet')}</h3><p>{t('You explain every requirement, carry the migration risk and often inherit software nobody continues to improve.', 'Ni förklarar varje krav, bär migreringsrisken och ärver ofta programvara som ingen fortsätter förbättra.')}</p></article>
          <article className="recommended"><small>COMPANY NATIVE</small><h3>{t('We adapt the system to you', 'Vi anpassar systemet till er')}</h3><p>{t('Our service learns, designs, builds, moves and improves everything. You own the software; we carry the work.', 'Vår tjänst lär, designar, bygger, flyttar och förbättrar allt. Ni äger programvaran; vi bär arbetet.')}</p></article>
        </div>
        <p className="best-fit"><strong>{t('Best for:', 'Passar bäst för:')}</strong> {t('B2B companies whose CRM has become central to sales, delivery or customer service—and whose important work no longer fits a generic tool.', 'B2B-företag där CRM har blivit centralt för försäljning, leverans eller kundservice—och där det viktiga arbetet inte längre ryms i ett generiskt verktyg.')}</p>
      </section>

      <section className="possibilities section" id="possibilities">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="section-kicker">{t('BUILT AROUND THE WORK THAT MAKES YOU DIFFERENT', 'BYGGT RUNT ARBETET SOM GÖR ER UNIKA')}</p><h2>{t('Stop asking, “Can our CRM do that?”', 'Sluta fråga: ”Kan vårt CRM göra det?”')}</h2></div>
            <p>{t('Your most important processes should become your advantage—not a collection of compromises, workarounds and tabs.', 'Era viktigaste processer ska bli en fördel—inte en samling kompromisser, nödlösningar och flikar.')}</p>
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
          <p className="possibility-foot">{t('And one connected place for calling, queues, email, forecasting, outreach, replies, customer risk, management reporting and the other work your team currently holds together by hand.', 'Och en sammanhängande plats för samtal, köer, mejl, prognoser, uppsökande arbete, svar, kundrisk, ledningsrapportering och allt annat som teamet idag håller ihop för hand.')}</p>
          <div className="mid-cta">
            <div><small>{t('YOUR COMPANY WILL BE DIFFERENT', 'ERT FÖRETAG KOMMER VARA ANNORLUNDA')}</small><strong>{t('Where could a CRM remove the most work from your team?', 'Var skulle ett CRM kunna ta bort mest arbete för ert team?')}</strong></div>
            <a className="button button-dark" href="#assessment-chat">{t('Find your first improvement', 'Hitta er första förbättring')} <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="process section shell" id="process">
        <div className="section-heading centered-heading">
          <p className="section-kicker">{t('MOVE WITHOUT THE BIG-BANG MIGRATION', 'FLYTTA UTAN EN STOR RISKFYLLD MIGRERING')}</p>
          <h2>{t('Get value first. Move only when it is better.', 'Få värde först. Flytta först när det är bättre.')}</h2>
          <p>{t('We keep today working while we build tomorrow. The long-term vision guides every decision, but your team changes one safe step at a time.', 'Vi håller dagens arbete igång medan vi bygger morgondagen. Den långsiktiga visionen styr varje beslut, men teamet förändras ett tryggt steg i taget.')}</p>
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
            <div><p className="section-kicker light">{t('HOW OUR SYSTEM WORKS', 'SÅ FUNGERAR VÅRT SYSTEM')}</p><h2>{t('It learns what to build before we build it.', 'Det lär sig vad som ska byggas innan vi bygger det.')}</h2></div>
            <p>{t('AI can make software quickly. The hard part is understanding what your people need, what the business could become and how to get there safely. That is what our system is built to do.', 'AI kan skapa programvara snabbt. Det svåra är att förstå vad era människor behöver, vad verksamheten kan bli och hur man når dit tryggt. Det är vad vårt system är byggt för.')}</p>
          </div>
          <div className="system-grid">
            {systemSteps.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="system-summary">
            <strong>{t('Think Lovable for CRM—then add everything a real migration needs.', 'Tänk Lovable för CRM—och lägg sedan till allt en verklig migrering kräver.')}</strong>
            <p>{t('We handle the understanding, design, development, integrations, data, training, rollout and continuous improvement. You keep running the business.', 'Vi tar hand om förståelse, design, utveckling, integrationer, data, utbildning, utrullning och löpande förbättring. Ni fortsätter driva verksamheten.')}</p>
          </div>
          <div className="learning-moat">
            <div className="learning-visual" aria-hidden="true"><span>A</span><span>B</span><span>C</span><i>✦</i></div>
            <div>
              <p className="section-kicker light">{t('EVERY IMPLEMENTATION MAKES THE NEXT ONE BETTER', 'VARJE IMPLEMENTATION GÖR NÄSTA BÄTTRE')}</p>
              <h3>{t('Proven solutions do not need to be invented again.', 'Beprövade lösningar behöver inte uppfinnas på nytt.')}</h3>
              <p>{t('Our private system can recognize when a problem resembles work we have already solved, see which approach succeeded and help our engineers start from the strongest pattern. A useful improvement discovered for one company can make our whole service faster and better.', 'Vårt privata system kan känna igen när ett problem liknar något vi redan löst, se vilket angreppssätt som fungerade och hjälpa våra ingenjörer börja med det starkaste mönstret. En värdefull förbättring hos ett företag kan göra hela vår tjänst snabbare och bättre.')}</p>
              <small>{t('Customer data and code stay protected. This learning system is hosted privately in the region and is not shared with frontier AI labs or other customers.', 'Kunddata och kod förblir skyddade. Lärsystemet hostas privat i regionen och delas inte med ledande AI-labb eller andra kunder.')}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="answers section shell">
        <div className="section-heading centered-heading narrow">
          <p className="section-kicker">{t('THE QUESTIONS THAT SHOULD BE ASKED', 'FRÅGORNA SOM SKA STÄLLAS')}</p>
          <h2>{t('A custom CRM should remove risk—not move it onto you.', 'Ett anpassat CRM ska ta bort risk—inte flytta den till er.')}</h2>
        </div>
        <div className="answer-grid">
          <article><span>{t('TIME', 'TID')}</span><h3>{t('“We do not have time for this.”', '”Vi har inte tid med detta.”')}</h3><p>{t('You do not run the project. We observe, specify, build, migrate and train. Your people contribute where their knowledge matters, not as an unpaid software team.', 'Ni driver inte projektet. Vi observerar, specificerar, bygger, migrerar och utbildar. Era människor bidrar där deras kunskap behövs—inte som ett obetalt IT-team.')}</p></article>
          <article><span>{t('MIGRATION', 'MIGRERING')}</span><h3>{t('“What if the new system is worse?”', '”Tänk om det nya systemet är sämre?”')}</h3><p>{t('One or two users test the new system alongside the old one. Everyone moves only after the important work is at least as good—and usually easier.', 'En eller två användare testar det nya systemet parallellt med det gamla. Alla flyttar först när det viktiga arbetet fungerar minst lika bra—och oftast enklare.')}</p></article>
          <article><span>{t('OWNERSHIP', 'ÄGANDE')}</span><h3>{t('“Will we be locked in?”', '”Blir vi inlåsta?”')}</h3><p>{t('No. The software is yours forever. If you leave, we stop supporting and improving it. You can run it yourself or take it to any vendor.', 'Nej. Programvaran är er för alltid. Om ni lämnar slutar vi stödja och förbättra den. Ni kan driva den själva eller ta den till valfri leverantör.')}</p></article>
          <article><span>{t('SECURITY', 'SÄKERHET')}</span><h3>{t('“Where does our sensitive data go?”', '”Vart tar vår känsliga data vägen?”')}</h3><p>{t('You can use our hosting or yours, frontier AI or open models. For sensitive enterprise work, the entire system and custom AI can run on your premises.', 'Ni kan använda vår hosting eller er egen, ledande AI eller öppna modeller. För känsligt enterprisearbete kan hela systemet och en egen AI köras hos er.')}</p></article>
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
            <h2>{t('We spent a decade watching companies bend around CRM software.', 'I ett decennium såg vi företag böja sig efter sina CRM-system.')}</h2>
            <p>{t('Yusuf Young founded FunnelBud in 2015. The company helped more than 450 Swedish businesses with CRM, sales and marketing automation before he exited it.', 'Yusuf Young grundade FunnelBud 2015. Företaget hjälpte fler än 450 svenska verksamheter med CRM, försäljning och marknadsautomation innan han lämnade bolaget.')}</p>
            <p>{t('That work exposed the same problem again and again: every CRM is generic by necessity. Customers pay for workarounds, abandon useful ideas and change good processes to fit the software.', 'Arbetet visade samma problem om och om igen: varje CRM är generiskt av nödvändighet. Kunder betalar för nödlösningar, överger bra idéer och ändrar fungerande processer för att passa programvaran.')}</p>
            <blockquote>{t('“Now that AI has changed the cost of building software, there is no reason your business should keep adapting to a generic CRM. The CRM can finally adapt to you.”', '”Nu när AI har förändrat kostnaden för att bygga programvara finns det ingen anledning att verksamheten ska fortsätta anpassa sig till ett generiskt CRM. CRM:et kan äntligen anpassa sig till er.”')}</blockquote>
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
            <p>{t('Every company will have systems built around how it wants to compete, serve customers and grow. We call this company-native software: software that adapts to your company instead of making your company adapt to it.', 'Varje företag kommer ha system byggda runt hur det vill konkurrera, hjälpa kunder och växa. Vi kallar det företagsspecifik programvara: programvara som anpassar sig till ert företag i stället för att tvinga företaget att anpassa sig.')}</p>
            <p>{t('CRM is where this future starts because it touches the heart of the company: every relationship with every customer. Your CRM should become an extension of your strategy, brand and values—not just a place where salespeople type notes.', 'CRM är där framtiden börjar, eftersom det rör företagets hjärta: varje relation med varje kund. Ert CRM ska bli en förlängning av er strategi, ert varumärke och era värderingar—inte bara en plats där säljare skriver anteckningar.')}</p>
            <div className="vision-outcomes"><span>{t('More speed', 'Högre fart')}</span><span>{t('Fewer mistakes', 'Färre misstag')}</span><span>{t('Less manual work', 'Mindre manuellt arbete')}</span><span>{t('A real competitive advantage', 'En verklig konkurrensfördel')}</span></div>
          </div>
        </div>
      </section>

      <section className="assessment-section section" id="assessment">
        <div className="shell assessment-grid">
          <div className="assessment-copy">
            <p className="section-kicker">{t('YOUR FIRST STEP', 'ERT FÖRSTA STEG')}</p>
            <h2>{t('What would a CRM built around your company change?', 'Vad skulle ett CRM byggt runt ert företag förändra?')}</h2>
            <p>{t('Talk with our assessment assistant. It asks about your current system, where work gets stuck and which improvement could give your team value without a migration.', 'Prata med vår bedömningsassistent. Den frågar om ert nuvarande system, var arbetet fastnar och vilken förbättring som kan ge teamet värde utan migrering.')}</p>
            <ul>
              <li><span>✓</span> {t('A conversation, not a generic lead form', 'Ett samtal, inte ett generiskt leadformulär')}</li>
              <li><span>✓</span> {t('About five minutes', 'Cirka fem minuter')}</li>
              <li><span>✓</span> {t('Your strongest small improvement, who it helps and why it can work before migration', 'Er starkaste lilla förbättring, vem den hjälper och varför den kan fungera före migreringen')}</li>
            </ul>
            <p className="contact-expectation">{t('At the end, we ask for your work email to save the assessment and show it here. A human conversation follows only if both sides see a useful opportunity. You are not booking a sales call.', 'I slutet ber vi om er jobbmejl för att spara bedömningen och visa den här. Ett mänskligt samtal följer bara om båda ser en värdefull möjlighet. Ni bokar inte ett säljsamtal.')}</p>
            <p className="privacy-prompt">{t('We store only what is needed to prepare and follow up on the assessment.', 'Vi sparar bara det som behövs för att förbereda och följa upp bedömningen.')} <a href={`/${locale}/privacy`}>{t('How we handle your information', 'Så hanterar vi era uppgifter')} <Arrow /></a></p>
            <div className="commercial-promise"><strong>{t('Start without increasing your CRM cost.', 'Börja utan att öka er CRM-kostnad.')}</strong><p>{t('If your team does not use the first pilot, you get your money back. If it works, the starting service costs what your current CRM costs today. Our AI-assisted system and reusable engineering patterns make that possible without starting every build from zero.', 'Om teamet inte använder den första piloten får ni pengarna tillbaka. Om den fungerar kostar starttjänsten lika mycket som ert nuvarande CRM idag. Vårt AI-stödda system och återanvändbara utvecklingsmönster gör det möjligt utan att varje bygge börjar från noll.')}</p></div>
          </div>
          <Assessment locale={locale} />
        </div>
      </section>

      <footer>
        <div className="shell footer-top"><a className="brand" href="#top"><span className="brand-mark">CN</span><span>Company Native</span></a><p>{t('Software built around your company.', 'Programvara byggd runt ert företag.')}</p><a href="#assessment-chat" className="button button-small button-primary">{t('Start assessment', 'Starta bedömning')} <Arrow /></a></div>
        <div className="shell footer-bottom"><span>© 2026 Company Native · {t('A Yusuf Young AB company', 'Ett bolag inom Yusuf Young AB')}</span><span><a href={`/${locale}/privacy`}>{t('Privacy', 'Integritet')}</a> · <a href={swedish ? '/en' : '/se'}>{swedish ? 'English' : 'Svenska'}</a></span></div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <Site locale="en" />;
}
