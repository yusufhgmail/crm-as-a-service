import type { Metadata } from 'next';
import './funnel.css';

export const metadata: Metadata = {
  title: 'Customer acquisition — CRM From Within',
  robots: { index: false, follow: false },
};

export default function FunnelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
