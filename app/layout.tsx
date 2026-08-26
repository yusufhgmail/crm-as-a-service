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
  description: 'Your company gets a CRM built around how it works, with design, development, data migration, training and continuous improvement handled end to end.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
  openGraph: {
    title: 'Software should be native to your company.',
    description: 'Get a CRM built around how your company works, with migration and continuous improvement handled end to end.',
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
