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
        <a className="brand" href={`/${locale}`}><span className="brand-mark" aria-hidden="true" /><span>Company Native</span></a>
        <a className="button button-small button-dark" href={`/${locale}`}>{swedish ? 'Tillbaka till startsidan' : 'Back to the website'} <span aria-hidden="true">→</span></a>
      </nav>
      <article className="legal-content shell">
        <p className="section-kicker">{swedish ? 'INTEGRITET' : 'PRIVACY'}</p>
        <h1>{swedish ? 'Så hanteras uppgifter i CRM-bedömningen och kontaktförfrågningar.' : 'How information is handled in the CRM assessment and contact requests.'}</h1>
        <p className="legal-lead">{swedish
          ? 'Company Native drivs av Yusuf Young AB i Sverige. Bara det som behövs för att svara på din kontaktförfrågan eller skapa, visa och följa upp bedömningen du ber om samlas in.'
          : 'Company Native is operated by Yusuf Young AB in Sweden. Only what is needed to reply to your contact request or create, deliver and follow up on your assessment is collected.'}</p>

        <section>
          <h2>{swedish ? 'Det som sparas' : 'What is stored'}</h2>
          <p>{swedish
            ? 'Om du kontaktar Company Native direkt sparas din jobbmejl och meddelandet du väljer att lämna. Om du använder bedömningen sparas samtalet, din jobbmejl, bedömningen som skapas och grundläggande uppgifter om ditt företag, ditt CRM, teamets storlek och problemet du beskriver.'
            : 'If you contact Company Native directly, your work email and optional message are stored. If you use the assessment, the conversation, your work email, the assessment produced and the basic facts you provide about your company, CRM, team size and business problem are stored.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Varför uppgifterna används' : 'Why the information is used'}</h2>
          <p>{swedish
            ? 'Uppgifterna används för att svara personligen när du ber om kontakt, visa och spara bedömningen, avgöra om en första pilot verkar värdefull och följa upp om det finns ett relevant affärsbehov. Det är frivilligt att lämna uppgifterna och det bokar inte ett säljsamtal.'
            : 'The information is used to reply personally when you ask for contact, show and save the assessment, judge whether a first pilot appears useful and follow up when there is a sensible opportunity. Providing the information is voluntary and does not book a sales call.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'AI och lagring' : 'AI and storage'}</h2>
          <p>{swedish
            ? 'Svaren behandlas av en AI-modell genom Company Natives Cloudflare-miljö och resultatet lagras i Company Natives Cloudflare-databas. Använd inte bedömningen för känsliga kunduppgifter, personnummer, hälsodata, inloggningsuppgifter eller konfidentiella affärsdetaljer.'
            : 'Answers are processed by an AI model through the Company Native Cloudflare environment and the result is stored in the Company Native Cloudflare database. Do not use the assessment for sensitive customer data, government identifiers, health data, credentials or confidential deal details.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Besöksstatistik' : 'Visitor analytics'}</h2>
          <p>{swedish
            ? 'Company Native använder Cloudflare Web Analytics för samlad besöksstatistik och egen statistik för att se vilken länk som ledde till besöket och vilka steg i CRM-bedömningen som slutfördes. Kampanjtaggar, webbplatsen som skickade dig hit, ungefärligt land och enhetstyp sparas, men inte IP-adress, meddelandetext eller en bestående besökaridentitet. Statistiken använder inga analyscookies och följer inte dig mellan olika webbplatser eller senare besök.'
            : 'Company Native uses Cloudflare Web Analytics for aggregate visits and first-party analytics to see which link brought a visit and which CRM assessment steps were completed. Campaign tags, the referring website, approximate country and device type are stored, but not the IP address, message text or a persistent visitor identity. The analytics use no analytics cookies and do not follow you across websites or later visits.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Delning och lagringstid' : 'Sharing and retention'}</h2>
          <p>{swedish
            ? 'Uppgifterna säljs inte och delas inte med andra kunder. Endast personer och leverantörer som behövs för att driva tjänsten får behandla dem. De behålls så länge de behövs för bedömningen och en rimlig affärsuppföljning, och raderas eller anonymiseras därefter.'
            : 'The information is not sold or shared with other customers. Only people and service providers needed to operate the service may process it. It is retained for the assessment and reasonable business follow-up, then deleted or anonymised.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Dina rättigheter' : 'Your rights'}</h2>
          <p>{swedish
            ? 'Du kan be att få se, rätta eller radera de uppgifter Company Native har om dig och invända mot fortsatt uppföljning. Svara på den kommunikation du får så hjälper Company Native dig.'
            : 'You may ask to access, correct or delete the information Company Native holds about you and object to further follow-up. Reply to any communication you receive and Company Native will help.'}</p>
        </section>
        <p className="legal-updated">{swedish ? 'Senast uppdaterad: 25 augusti 2026.' : 'Last updated: 25 August 2026.'}</p>
      </article>
    </main>
  );
}
