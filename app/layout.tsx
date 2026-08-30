import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from './analytics';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crmfromwithin.com'),
  title: 'CRM From Within — Your first CRM, built around how you work',
  description: 'CRM From Within builds an SME’s first CRM around the way its team already works. Paid migration and customization are available for companies leaving an existing CRM.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
  openGraph: {
    title: 'Your first CRM, built around how you work.',
    description: 'Turn spreadsheets, inboxes and memory into one CRM shaped around your company.',
    type: 'website',
    images: [{ url: 'https://crmfromwithin.com/og-crm-from-within.png', width: 1200, height: 630, alt: 'CRM From Within' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your first CRM, built around how you work.',
    description: 'Turn spreadsheets, inboxes and memory into one CRM shaped around your company.',
    images: ['https://crmfromwithin.com/og-crm-from-within.png'],
  },
  icons: {
    icon: '/crm-from-within-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
