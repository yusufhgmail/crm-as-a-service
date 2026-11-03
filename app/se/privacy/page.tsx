import type { Metadata } from 'next';
import { PrivacyPage, privacyMetadata } from '../../privacy';

export const metadata: Metadata = privacyMetadata('se');

export default function SwedishPrivacyPage() {
  return <PrivacyPage locale="se" />;
}
