import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { Analytics } from './analytics';
import { htmlLang, LOCALE_HEADER, SITE } from './seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Canonical, hreflang and Open Graph are set per page (see seo.tsx), so no
// page can inherit another page's canonical from here.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'CRM From Within',
  icons: {
    icon: '/crm-from-within-logo.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get(LOCALE_HEADER) === 'se' ? 'se' : 'en';
  return (
    <html lang={htmlLang(locale)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
