import { ImageResponse } from 'next/og';

export const alt = 'Company Native — Your company already contains its CRM';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#102b2c', color: '#f4f1e9', padding: '72px', fontFamily: 'Arial, sans-serif', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: 28, fontWeight: 700 }}>
        <div style={{ width: 52, height: 52, border: '8px solid #b9f6ca', borderRightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 15, height: 15, background: '#ff7a66' }} /></div>
        Company Native
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 900 }}>
        <div style={{ display: 'flex', color: '#b9f6ca', fontSize: 22, letterSpacing: '3px', textTransform: 'uppercase' }}>Final product vision · In development</div>
        <div style={{ display: 'flex', fontSize: 76, lineHeight: 1.02, fontWeight: 700 }}>Your company already contains the CRM it needs.</div>
        <div style={{ display: 'flex', fontSize: 27, color: '#cbd9d4' }}>Connect your team’s email. Company Native builds and fills the CRM around how you actually work.</div>
      </div>
    </div>,
    size,
  );
}
