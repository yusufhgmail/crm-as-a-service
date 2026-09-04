import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Privacy — CRM From Within',
  robots: { index: true, follow: true },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'se') notFound();
  const swedish = locale === 'se';

  return (
    <main className="legal-page" lang={swedish ? 'sv' : 'en'}>
      <nav className="nav shell" aria-label={swedish ? 'Huvudmeny' : 'Main navigation'}>
        <a className="brand" href={`/${locale}`}><span className="brand-mark" aria-hidden="true" /><span>CRM From Within</span></a>
        <a className="button button-small button-dark" href={`/${locale}`}>{swedish ? 'Tillbaka till startsidan' : 'Back to the website'} <span aria-hidden="true">→</span></a>
      </nav>
      <article className="legal-content shell">
        <p className="section-kicker">{swedish ? 'INTEGRITET' : 'PRIVACY'}</p>
        <h1>{swedish ? 'Så hanteras uppgifter i CRM-planen och kontaktförfrågningar.' : 'How information is handled in the CRM plan and contact requests.'}</h1>
        <p className="legal-lead">{swedish
          ? 'CRM From Within drivs av Yusuf Young AB i Sverige. Bara det som behövs för att svara på din kontaktförfrågan eller skapa, visa och följa upp CRM-planen du ber om samlas in.'
          : 'CRM From Within is operated by Yusuf Young AB in Sweden. Only what is needed to reply to your contact request or create, deliver and follow up on the CRM plan you request is collected.'}</p>

        <section>
          <h2>{swedish ? 'Det som sparas' : 'What is stored'}</h2>
          <p>{swedish
            ? 'Om du kontaktar CRM From Within direkt sparas din jobbmejl och meddelandet du väljer att lämna. Om du använder CRM-planen sparas samtalet, din jobbmejl, planen som skapas och grundläggande uppgifter om ditt företag, hur du följer leads och kunder idag, teamets storlek och problemet du beskriver.'
            : 'If you contact CRM From Within directly, your work email and optional message are stored. If you use the CRM plan, the conversation, your work email, the plan produced and the basic facts you provide about your company, current way of tracking leads and customers, team size and business problem are stored.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Varför uppgifterna används' : 'Why the information is used'}</h2>
          <p>{swedish
            ? 'Uppgifterna används för att svara personligen när du ber om kontakt, visa och spara CRM-planen, avgöra om ett CRM-bygge verkar värdefullt och följa upp om det finns ett relevant affärsbehov. Det är frivilligt att lämna uppgifterna och det bokar inte ett säljsamtal.'
            : 'The information is used to reply personally when you ask for contact, show and save the CRM plan, judge whether a CRM build appears useful and follow up when there is a sensible opportunity. Providing the information is voluntary and does not book a sales call.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'AI och lagring' : 'AI and storage'}</h2>
          <p>{swedish
            ? 'Svaren behandlas av en AI-modell i Cloudflares miljö för CRM From Within och resultatet lagras i CRM From Withins Cloudflare-databas. Använd inte CRM-planen för känsliga kunduppgifter, personnummer, hälsodata, inloggningsuppgifter eller konfidentiella affärsdetaljer.'
            : 'Answers are processed by an AI model through the CRM From Within Cloudflare environment and the result is stored in the CRM From Within Cloudflare database. Do not use the CRM plan for sensitive customer data, government identifiers, health data, credentials or confidential deal details.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Besöksstatistik' : 'Visitor analytics'}</h2>
          <p>{swedish
            ? 'CRM From Within använder Cloudflare Web Analytics för samlad besöksstatistik och egen statistik för att se vilken länk som ledde till besöket och vilka steg i CRM-planen som slutfördes. Kampanjtaggar, webbplatsen som skickade dig hit, ungefärligt land och enhetstyp sparas, men inte IP-adress, meddelandetext eller en bestående besökaridentitet. Statistiken använder inga analyscookies och följer inte dig mellan olika webbplatser eller senare besök.'
            : 'CRM From Within uses Cloudflare Web Analytics for aggregate visits and first-party analytics to see which link brought a visit and which CRM-plan steps were completed. Campaign tags, the referring website, approximate country and device type are stored, but not the IP address, message text or a persistent visitor identity. The analytics use no analytics cookies and do not follow you across websites or later visits.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Delning och lagringstid' : 'Sharing and retention'}</h2>
          <p>{swedish
            ? 'Uppgifterna säljs inte och delas inte med andra kunder. Endast personer och leverantörer som behövs för att driva tjänsten får behandla dem. De behålls så länge de behövs för CRM-planen och en rimlig affärsuppföljning, och raderas eller anonymiseras därefter.'
            : 'The information is not sold or shared with other customers. Only people and service providers needed to operate the service may process it. It is retained for the CRM plan and reasonable business follow-up, then deleted or anonymised.'}</p>
        </section>
        <section>
          <h2>{swedish ? 'Dina rättigheter' : 'Your rights'}</h2>
          <p>{swedish
            ? 'Du kan be att få se, rätta eller radera de uppgifter CRM From Within har om dig och invända mot fortsatt uppföljning. Svara på den kommunikation du får så hjälper CRM From Within dig.'
            : 'You may ask to access, correct or delete the information CRM From Within holds about you and object to further follow-up. Reply to any communication you receive and CRM From Within will help.'}</p>
        </section>
        <p className="legal-updated">{swedish ? 'Senast uppdaterad: 30 augusti 2026.' : 'Last updated: 30 August 2026.'}</p>
      </article>
    </main>
  );
}
