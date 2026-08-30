import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal analytics setting — CRM From Within',
  robots: { index: false, follow: false },
};

export default function InternalAnalyticsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
