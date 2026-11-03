import type { Metadata } from 'next';
import { PrivacyPage, privacyMetadata } from '../../privacy';

export const metadata: Metadata = privacyMetadata('en');

export default function EnglishPrivacyPage() {
  return <PrivacyPage locale="en" />;
}
