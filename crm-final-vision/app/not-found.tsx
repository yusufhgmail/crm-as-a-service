import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>This idea lives somewhere else.</h1>
      <p>Return to the Company Native final product vision.</p>
      <Link className="button button-coral" href="/">Go to the customer vision <span aria-hidden="true">→</span></Link>
    </main>
  );
}
