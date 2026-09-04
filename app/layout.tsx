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
  title: 'CRM From Within — The CRM that adapts to your company',
  description: 'A production-ready CRM that learns how your company works and is safely adapted for your team—without making you administer it.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
  openGraph: {
    title: 'A production-ready CRM that shapes itself around your company.',
    description: 'CRM From Within learns how customer work happens, asks focused questions and is safely adapted for your team.',
    type: 'website',
    images: [{ url: 'https://crmfromwithin.com/og-crm-from-within.png', width: 1200, height: 630, alt: 'CRM From Within' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A production-ready CRM that shapes itself around your company.',
    description: 'CRM From Within learns how customer work happens, asks focused questions and is safely adapted for your team.',
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
