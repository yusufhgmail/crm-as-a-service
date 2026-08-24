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
  metadataBase: new URL('http://localhost:3001'),
  title: 'Software Migration as a Service — Own the software that runs your company',
  description: 'We learn how your company works, build the software it actually needs, migrate your data and keep improving the system—handled end to end.',
  openGraph: {
    title: 'Own the software that runs your company.',
    description: 'Built for the way you create value. Software migration, handled end to end.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Own the software that runs your company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Own the software that runs your company.',
    description: 'Built for the way you create value. Software migration, handled end to end.',
    images: ['/og.png'],
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
