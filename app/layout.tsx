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
  metadataBase: new URL('https://companynative.com'),
  title: 'Company Native — Own and control your CRM replacement',
  description: 'Replace HubSpot or Salesforce with a CRM your company owns, can self-host and can keep changing with any qualified team.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
  openGraph: {
    title: 'Replace HubSpot or Salesforce with a CRM your company owns and controls.',
    description: 'Prove the replacement first. Then self-host it, keep Company Native as operator or choose who changes it next.',
    type: 'website',
    images: [{ url: 'https://companynative.com/og-company-native.png', width: 1200, height: 630, alt: 'Company Native' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Replace HubSpot or Salesforce with a CRM your company owns and controls.',
    description: 'Prove the replacement first, then choose who runs and changes it.',
    images: ['https://companynative.com/og-company-native.png'],
  },
  icons: {
    icon: '/company-native-logo.svg',
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
