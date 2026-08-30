import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crmfromwithin.com'),
  title: {
    default: 'CRM From Within — A custom CRM for companies without one',
    template: '%s · CRM From Within',
  },
  description: 'For small companies without a CRM: connect approved team email and receive a populated CRM built around how the company works.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'CRM From Within — Build the CRM already inside your company',
    description: 'A final product vision: connect approved team email and receive a populated CRM built around how your company actually works.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#102b2c',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
