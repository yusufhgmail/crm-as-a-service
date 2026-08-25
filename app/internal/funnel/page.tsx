'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';

type DashboardData = {
  days: '7' | '30' | '90' | 'all';
  funnel: {
    visits?: number;
    cta_visits?: number;
    assessment_views?: number;
    assessment_starts?: number;
    three_answers?: number;
    email_reached?: number;
    contact_opens?: number;
  };
  leads: {
    leads?: number;
    assessment_leads?: number;
    contact_leads?: number;
    qualified?: number;
    conversations?: number;
    proposals?: number;
    customers?: number;
    lost?: number;
  };
  sources: Array<{
    source: string;
    medium: string;
    locale: 'en' | 'se';
    campaign: string;
    content: string;
    visits: number;
    starts: number;
    leads: number;
    qualified: number;
    customers: number;
  }>;
  recentLeads: Array<{
    id: string;
    lead_type: 'assessment' | 'contact';
    created_at: string;
    email: string;
    company: string | null;
    current_crm: string | null;
    team_size: string | null;
    primary_pain: string | null;
    qualification: string;
    sales_status: SalesStatus;
    outcome_note: string | null;
    source: string | null;
    medium: string | null;
    campaign: string | null;
  }>;
  generatedAt: string;
};

type SalesStatus = 'new' | 'contacted' | 'conversation' | 'pilot_proposed' | 'won' | 'lost';

const statusLabels: Record<SalesStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  conversation: 'Conversation',
  pilot_proposed: 'Pilot proposed',
  won: 'Customer won',
  lost: 'Lost',
};

function number(value: number | undefined) {
  return Number(value || 0);
}

function rate(numerator: number, denominator: number) {
  return denominator ? `${Math.round((numerator / denominator) * 100)}%` : '—';
}

function nextMove(data: DashboardData) {
  const visits = number(data.funnel.visits);
  const cta = number(data.funnel.cta_visits);
  const contactOpens = number(data.funnel.contact_opens);
  const starts = number(data.funnel.assessment_starts);
  const leads = number(data.leads.leads);
  const qualified = number(data.leads.qualified);
  const assessmentLeads = number(data.leads.assessment_leads);
  const customers = number(data.leads.customers);

  if (visits < 20) return 'Bring at least 20 relevant people through tagged links before changing the page. The current sample is too small to locate a real bottleneck.';
  if ((cta + contactOpens) / visits < 0.1) return 'Most visitors are not choosing either way to continue. Test a sharper first-screen promise or a more concrete reason to make contact.';
  if (cta >= 3 && starts / cta < 0.4) return 'People click the assessment but do not begin answering. Make the first question and the value of finishing feel easier and more immediate.';
  if (starts >= 3 && assessmentLeads / starts < 0.3) return 'People start the assessment but do not leave a work email. Shorten the conversation or show a more valuable assessment preview earlier.';
  if (assessmentLeads >= 3 && qualified / assessmentLeads < 0.4) return 'The assessments are producing leads, but too few appear commercially useful. Tighten the audience and promise in the sources bringing those visitors.';
  if (customers === 0 && leads >= 3) return 'The website is producing useful leads but no customer yet. Review follow-up speed, conversation outcomes and the pilot offer before buying more traffic.';
  return 'Keep sending traffic through the source producing the most qualified leads, and compare its next batch with the rest before changing the page.';
}

export default function FunnelDashboard() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<DashboardData | null>(null);
  const [days, setDays] = useState<'7' | '30' | '90' | 'all'>('30');
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);
  const [source, setSource] = useState('linkedin');
  const [medium, setMedium] = useState('organic');
  const [campaign, setCampaign] = useState('launch');
  const [content, setContent] = useState('founder-post');
  const [locale, setLocale] = useState<'en' | 'se'>('en');
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (nextDays: typeof days, suppliedPassword = password) => {
    setWorking(true);
    setError('');
    try {
      const response = await fetch(`/api/internal/funnel?days=${nextDays}`, {
        headers: { Authorization: `Bearer ${suppliedPassword}` },
        cache: 'no-store',
      });
      const result = await response.json() as DashboardData & { error?: string };
      if (!response.ok) throw new Error(result.error || 'The dashboard could not be loaded.');
      setData(result);
    } catch (caught) {
      setData(null);
      setError(caught instanceof Error ? caught.message : 'The dashboard could not be loaded.');
    } finally {
      setWorking(false);
    }
  }, [password]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    await load(days);
  }

  async function changeDays(value: typeof days) {
    setDays(value);
    await load(value);
  }

  async function saveLead(event: FormEvent<HTMLFormElement>, leadId: string, leadType: 'assessment' | 'contact') {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setWorking(true);
    setError('');
    try {
      const response = await fetch('/api/internal/funnel', {
        method: 'POST',
        headers: { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, leadType, status: form.get('status'), note: form.get('note') }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'The lead could not be updated.');
      await load(days);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The lead could not be updated.');
      setWorking(false);
    }
  }

  const campaignUrl = useMemo(() => {
    const url = new URL(`https://companynative.com/${locale}`);
    if (source.trim()) url.searchParams.set('utm_source', source.trim().toLowerCase().replace(/\s+/g, '-'));
    if (medium.trim()) url.searchParams.set('utm_medium', medium.trim().toLowerCase().replace(/\s+/g, '-'));
    if (campaign.trim()) url.searchParams.set('utm_campaign', campaign.trim().toLowerCase().replace(/\s+/g, '-'));
    if (content.trim()) url.searchParams.set('utm_content', content.trim().toLowerCase().replace(/\s+/g, '-'));
    return url.toString();
  }, [campaign, content, locale, medium, source]);

  async function copyCampaignUrl() {
    await navigator.clipboard.writeText(campaignUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_500);
  }

  if (!data) {
    return (
      <main className="funnel-login">
        <form onSubmit={signIn}>
          <span className="funnel-kicker">COMPANY NATIVE</span>
          <h1>Customer acquisition</h1>
          <p>Enter the private dashboard password.</p>
          <label htmlFor="dashboard-password">Password</label>
          <input id="dashboard-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus />
          <button type="submit" disabled={working || !password}>{working ? 'Opening…' : 'Open dashboard'}</button>
          {error && <p className="funnel-error" role="alert">{error}</p>}
        </form>
      </main>
    );
  }

  const visits = number(data.funnel.visits);
  const stages = [
    ['Visits', visits],
    ['Clicked an assessment button', number(data.funnel.cta_visits)],
    ['Started answering', number(data.funnel.assessment_starts)],
    ['Answered at least 3 questions', number(data.funnel.three_answers)],
    ['Reached the work-email step', number(data.funnel.email_reached)],
    ['Completed assessments', number(data.leads.assessment_leads)],
    ['Opened human contact', number(data.funnel.contact_opens)],
    ['Direct contact requests', number(data.leads.contact_leads)],
    ['Qualified assessments', number(data.leads.qualified)],
    ['Sales conversations', number(data.leads.conversations)],
    ['Pilots proposed', number(data.leads.proposals)],
    ['Customers won', number(data.leads.customers)],
  ] as const;

  return (
    <main className="funnel-dashboard">
      <header className="funnel-header">
        <div><span className="funnel-kicker">COMPANY NATIVE</span><h1>Customer acquisition</h1></div>
        <label>Period
          <select value={days} onChange={(event) => void changeDays(event.target.value as typeof days)} disabled={working}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </label>
      </header>

      {error && <p className="funnel-error" role="alert">{error}</p>}

      <section className="next-move-card">
        <div className="goal-progress"><strong>{number(data.leads.customers)}/10</strong><small>customers won</small></div>
        <div><span>WHAT TO DO NEXT</span><p>{nextMove(data)}</p></div>
      </section>

      <section className="funnel-panel">
        <div className="panel-heading"><div><span>ACQUISITION FUNNEL</span><h2>Where people stop</h2></div><p>Each percentage is the share of all {visits} tracked visits in this period.</p></div>
        <div className="stage-grid">
          {stages.map(([label, count]) => (
            <div className="stage-card" key={label}><strong>{count}</strong><span>{label}</span><small>{rate(count, visits)} of visits</small></div>
          ))}
        </div>
      </section>

      <section className="funnel-panel">
        <div className="panel-heading"><div><span>MARKETING SOURCES</span><h2>Which links bring useful companies</h2></div><p>Leads include completed assessments and direct contact requests. Qualified applies only to assessments judged strong or possible.</p></div>
        {data.sources.length ? (
          <div className="table-wrap"><table>
            <thead><tr><th>Source</th><th>Language</th><th>Campaign / message</th><th>Visits</th><th>Started</th><th>Leads</th><th>Qualified</th><th>Customers</th><th>Lead rate</th></tr></thead>
            <tbody>{data.sources.map((row) => <tr key={`${row.source}-${row.medium}-${row.locale}-${row.campaign}-${row.content}`}>
              <td><strong>{row.source}</strong><small>{row.medium}</small></td><td>{row.locale.toUpperCase()}</td><td>{row.campaign || '—'}<small>{row.content || 'No message tag'}</small></td><td>{row.visits}</td><td>{row.starts}</td><td>{row.leads}</td><td>{row.qualified}</td><td>{row.customers}</td><td>{rate(row.leads, row.visits)}</td>
            </tr>)}</tbody>
          </table></div>
        ) : <p className="empty-state">No tracked visits in this period yet.</p>}
      </section>

      <section className="funnel-panel campaign-builder">
        <div className="panel-heading"><div><span>CAMPAIGN LINK</span><h2>Tag every link you publish or send</h2></div><p>Use one campaign for the initiative and a distinct message tag for each post, ad or outreach version.</p></div>
        <div className="campaign-fields">
          <label>Source<input value={source} onChange={(event) => setSource(event.target.value)} /></label>
          <label>Medium<input value={medium} onChange={(event) => setMedium(event.target.value)} /></label>
          <label>Campaign<input value={campaign} onChange={(event) => setCampaign(event.target.value)} /></label>
          <label>Message<input value={content} onChange={(event) => setContent(event.target.value)} /></label>
          <label>Language<select value={locale} onChange={(event) => setLocale(event.target.value as 'en' | 'se')}><option value="en">English</option><option value="se">Swedish</option></select></label>
        </div>
        <div className="campaign-output"><code>{campaignUrl}</code><button type="button" onClick={() => void copyCampaignUrl()}>{copied ? 'Copied' : 'Copy link'}</button></div>
      </section>

      <section className="funnel-panel">
        <div className="panel-heading"><div><span>LEADS AND CUSTOMERS</span><h2>Record what happened after the assessment</h2></div><p>Updating the outcome closes the loop between marketing and actual customers.</p></div>
        {data.recentLeads.length ? <div className="lead-list">{data.recentLeads.map((lead) => (
          <article className="lead-card" key={`${lead.lead_type}-${lead.id}`}>
            <div className="lead-summary"><div><strong>{lead.company || lead.email}</strong><a href={`mailto:${lead.email}`}>{lead.email}</a></div><span className={`qualification qualification-${lead.qualification}`}>{lead.lead_type === 'contact' ? 'direct contact' : lead.qualification}</span></div>
            <dl>
              <div><dt>Source</dt><dd>{lead.source || 'Unattributed'}{lead.campaign ? ` · ${lead.campaign}` : ''}</dd></div>
              <div><dt>CRM</dt><dd>{lead.current_crm || 'Unknown'}</dd></div>
              <div><dt>Team</dt><dd>{lead.team_size || 'Unknown'}</dd></div>
              <div><dt>{lead.lead_type === 'contact' ? 'Message' : 'Main pain'}</dt><dd>{lead.primary_pain || 'Not captured'}</dd></div>
            </dl>
            <form onSubmit={(event) => void saveLead(event, lead.id, lead.lead_type)}>
              <label>Outcome<select name="status" defaultValue={lead.sales_status}>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
              <label>What we learned<input name="note" defaultValue={lead.outcome_note || ''} placeholder="Why it moved forward or stopped" maxLength={2000} /></label>
              <button type="submit" disabled={working}>Save</button>
            </form>
          </article>
        ))}</div> : <p className="empty-state">No completed assessments in this period yet.</p>}
      </section>

      <footer className="funnel-dashboard-footer">Anonymous funnel events begin when this version goes live. Cloudflare’s aggregate visitor history remains separate.</footer>
    </main>
  );
}
