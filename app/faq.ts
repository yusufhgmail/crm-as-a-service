// The "when this is the right start" questions on the home page. The page
// renders them and the FAQPage JSON-LD reads the same text, so the markup
// always matches what a visitor can see.

export type FaqItem = { label: string; question: string; answer: string };

export const faq: Record<'en' | 'se', FaqItem[]> = {
  en: [
    { label: 'NO CRM ADMIN', question: 'Who is going to customize and maintain it?', answer: 'Not your team. The CRM observes the work, asks focused questions and is changed by the system and our experts. Your company decides what is approved.' },
    { label: 'SIMPLICITY', question: 'Will a CRM create more admin?', answer: 'It should not. The core stays small and starts with work the team already does. Anything that adds effort without enough value should change or go.' },
    { label: 'DATA & CONTROL', question: 'What happens to our data?', answer: 'You choose the approved sources and history. Data export, deletion, hosting, access and protection must be agreed clearly before real customer information is imported.' },
    { label: 'STANDARD CRM', question: 'Why not just use HubSpot Free?', answer: 'You should if a generic pipeline is enough and you are happy to configure it. Choose CRM From Within when the main problem is having to design, populate and adapt the CRM yourself.' },
  ],
  se: [
    { label: 'INGEN CRM-ADMINISTRATÖR', question: 'Vem ska anpassa och underhålla det?', answer: 'Inte ditt team. CRM-systemet observerar arbetet, ställer fokuserade frågor och ändras av systemet och våra experter. Företaget avgör vad som godkänns.' },
    { label: 'ENKELHET', question: 'Skapar ett CRM mer administration?', answer: 'Det ska det inte göra. Grunden är liten och börjar med arbete som teamet redan gör. Det som ökar arbetsbördan utan tillräckligt värde ska ändras eller tas bort.' },
    { label: 'DATA OCH KONTROLL', question: 'Vad händer med vår data?', answer: 'Du väljer godkända källor och historik. Dataexport, radering, drift, åtkomst och skydd ska vara tydligt överenskomna innan riktig kundinformation importeras.' },
    { label: 'STANDARD-CRM', question: 'Varför inte bara använda HubSpot Free?', answer: 'Det bör du göra om en generell pipeline räcker och du gärna ställer in den själv. Välj CRM From Within när huvudproblemet är att själv behöva designa, fylla och anpassa CRM-systemet.' },
  ],
};
