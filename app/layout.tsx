import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  metadataBase: new URL('https://crmthatfits.com'),
  title: 'CRM That Fits — Your business, without software limits',
  description: 'We learn how your company works, design and build the CRM you actually need, migrate your data, train your team and keep improving it.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
  openGraph: {
    title: 'Your CRM should fit your business.',
    description: 'We learn how your company works, design and build the CRM you actually need, migrate your data and keep improving it.',
    type: 'website',
    images: [{ url: 'https://crmthatfits.com/og.png', width: 1200, height: 630, alt: 'CRM That Fits' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your CRM should fit your business.',
    description: 'Custom CRM, handled end to end.',
    images: ['https://crmthatfits.com/og.png'],
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
      </body>
    </html>
  );
}
