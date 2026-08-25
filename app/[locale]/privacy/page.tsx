import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Privacy — Company Native',
  robots: { index: true, follow: true },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'se') notFound();
  const swedish = locale === 'se';

  return (
    <main className="legal-page" lang={swedish ? 'sv' : 'en'}>
      <nav className="nav shell" aria-label={swedish ? 'Huvudmeny' : 'Main navigation'}>
        <a className="brand" href={`/${locale}`}><span className="brand-mark">CN</span><span>Company Native</span></a>
        <a className="button button-small button-dark" href={`/${locale}`}>{swedish ? 'Tillbaka till startsidan' : 'Back to the website'} <span aria-hidden="true">→</span></a>
      </nav>
      <article className="legal-content shell">
        <p className="section-kicker">{swedish ? 'INTEGRITET' : 'PRIVACY'}</p>
        <h1>{swedish ? 'Så hanterar vi uppgifter i CRM-bedömningen.' : 'How we handle information in the CRM assessment.'}</h1>
        <p className="legal-lead">{swedish
          ? 'Company Native drivs av Yusuf Young AB i Sverige. Vi samlar bara in det som behövs för att skapa, leverera och följa upp den bedömning ni ber om.'
          : 'Company Native is operated by Yusuf Young AB in Sweden. We collect only what is needed to create, deliver and follow up on the assessment you request.'}</p>

        <section>
          <h2>{swedish ? 'Det vi sparar' : 'What we store'}</h2>
          <p>{swedish
            ? 'Vi sparar samtalet, er jobbmejl, den bedömning som skapas och grundläggande uppgifter om ert företag, ert CRM, teamets storlek och det problem ni beskriver.'
            : 'We store the conversation, your work email, the assessment produced, and basic facts you provide about your company, CRM, team size and business problem.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Varför vi använder det' : 'Why we use it'}</h2>
          <p>{swedish
            ? 'Vi använder uppgifterna för att visa och spara bedömningen, avgöra om en första pilot verkar värdefull och följa upp när det finns en rimlig möjlighet. Att lämna uppgifterna är frivilligt och är inte samma sak som att boka ett säljsamtal.'
            : 'We use the information to show and save the assessment, judge whether a first pilot appears useful and follow up when there is a sensible opportunity. Providing the information is voluntary and does not book a sales call.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'AI och lagring' : 'AI and storage'}</h2>
          <p>{swedish
            ? 'Svaren behandlas av en AI-modell som körs genom vår Cloudflare-miljö och resultatet lagras i vår Cloudflare-databas. Använd inte bedömningen för känsliga kunduppgifter, personnummer, hälsodata, inloggningsuppgifter eller konfidentiella affärsdetaljer.'
            : 'Answers are processed by an AI model through our Cloudflare environment and the result is stored in our Cloudflare database. Do not use the assessment for sensitive customer data, government identifiers, health data, credentials or confidential deal details.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Besöksstatistik' : 'Visitor analytics'}</h2>
          <p>{swedish
            ? 'Vi använder Cloudflare Web Analytics för att se aggregerade besök, sidvisningar och hur webbplatsen fungerar. Cloudflare samlar in minsta möjliga mängd information och spårar inte enskilda personer mellan olika kunders webbplatser.'
            : 'We use Cloudflare Web Analytics to see aggregated visits, page views and how the website performs. Cloudflare collects the minimum amount of information and does not track individual people across its customers’ websites.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Delning och gallring' : 'Sharing and retention'}</h2>
          <p>{swedish
            ? 'Vi säljer inte uppgifterna och delar dem inte med andra kunder. Endast personer och leverantörer som behövs för att driva tjänsten får behandla dem. Vi behåller dem så länge de behövs för bedömningen och en rimlig affärsuppföljning, och raderar eller anonymiserar därefter.'
            : 'We do not sell the information or share it with other customers. Only people and service providers needed to operate the service may process it. We retain it for the assessment and reasonable business follow-up, then delete or anonymise it.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Era rättigheter' : 'Your rights'}</h2>
          <p>{swedish
            ? 'Ni kan be att få se, rätta eller radera de uppgifter vi har om er och invända mot fortsatt uppföljning. Svara på den kommunikation ni får från oss så hjälper vi er.'
            : 'You may ask to access, correct or delete the information we hold about you and object to further follow-up. Reply to any communication you receive from us and we will help.'}</p>
        </section>
        <p className="legal-updated">{swedish ? 'Senast uppdaterad: 24 augusti 2026.' : 'Last updated: 24 August 2026.'}</p>
      </article>
    </main>
  );
}
