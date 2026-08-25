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
  title: 'Company Native — Software built around your company',
  description: 'We learn how your company works, design and build the CRM you actually need, migrate your data, train your team and keep improving it.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
  openGraph: {
    title: 'Software should be native to your company.',
    description: 'We learn how your company works, design and build the CRM you actually need, migrate your data and keep improving it.',
    type: 'website',
    images: [{ url: 'https://companynative.com/og-company-native.png', width: 1200, height: 630, alt: 'Company Native' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software should be native to your company.',
    description: 'Custom CRM, handled end to end.',
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
