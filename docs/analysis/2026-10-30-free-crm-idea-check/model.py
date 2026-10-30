"""Simple month-by-month model of five shapes of the free-CRM idea. USD, 36 months.
Earnings = revenue minus delivery (your build hours at an internal rate), AI, hosting, support and fixed costs."""
import json, sys
M = 36

# ---- shared agency economics (from the 2026-10-25 plan) ----
SETUP = 3000          # paid proof
FEE = 1500            # monthly fee, middle of $1,000-2,000
AG_CHURN = 0.025      # agency clients lost per month
def cogs_share(m):    # all delivery hours (yours at an internal rate), AI, hosting; plan target 60% margin
    return max(0.40, 0.60 - 0.20 * (m - 1) / 18)
def capacity(m):      # max new agency clients a month (two founders, then hires)
    return 2 if m <= 6 else 3 if m <= 12 else 4 if m <= 24 else 6
def content_clients(m):  # new clients a month from content alone (current plan)
    return 0 if m <= 2 else 1 if m <= 6 else 2 if m <= 12 else 3 if m <= 24 else 4

# ---- free CRM economics ----
ACTIVATE = 0.40       # share of signups that start using it
FREE_CHURN = 0.08     # active free accounts lost per month
FREE_COST = 0.60      # $ per active free account a month (hosting, AI, AI-first support)
AGENT_ARPU = 150      # $ a month per paying agent customer
AGENT_CONV = 0.0025   # share of active free accounts that start paying for agents each month
AGENT_CHURN = 0.08   # AI SDR tools report heavy churn
AGENT_COGS = 0.30     # model and messaging cost share of agent revenue
BUILD_CONV = 0.0008   # share of active free accounts that buy a custom build each month
BUILD_FEE, BUILD_SETUP = 1200, 2500   # free-CRM leads are smaller firms on average

def run(shape):
    s = shape
    ag = 0.0; active = 0.0; agents = 0.0; cum = 0.0; signups_total = 0
    rows = []
    for m in range(1, M + 1):
        # signups
        signups = 0
        if s.get('crm_launch') and m >= s['crm_launch']:
            k = m - s['crm_launch']
            signups = min(s['su_start'] * (1.15 ** k), s['su_cap']) * s.get('focus', 1)
        signups_total += signups
        active = active * (1 - FREE_CHURN) + signups * s.get('activate', ACTIVATE)
        # agents
        new_agents = 0
        if s.get('agent_launch') and m >= s['agent_launch']:
            new_agents = active * AGENT_CONV * s.get('focus', 1)
        agents = agents * (1 - AGENT_CHURN) + new_agents
        # agency clients
        new_ag_content = s['content'](m) if s.get('content') else 0
        new_ag_tools = (1 if (s.get('tools') and m >= 5) else 0)
        new_ag_free = active * BUILD_CONV if s.get('builds_from_free') else 0
        new_ag = min(new_ag_content + new_ag_tools + new_ag_free, capacity(m)) if s.get('agency', True) else 0
        # blended fee: content/tools leads pay FEE, free-CRM leads pay BUILD_FEE
        share_free = (new_ag_free / (new_ag_content + new_ag_tools + new_ag_free)) if new_ag > 0 and new_ag_free > 0 else 0
        fee = FEE * (1 - share_free) + BUILD_FEE * share_free
        setup = SETUP * (1 - share_free) + BUILD_SETUP * share_free
        ag = ag * (1 - AG_CHURN) + new_ag
        s.setdefault('_mrr_ag', 0.0)
        s['_mrr_ag'] = s['_mrr_ag'] * (1 - AG_CHURN) + new_ag * fee
        rev_ag = s['_mrr_ag'] + new_ag * setup
        rev_agents = agents * AGENT_ARPU
        rev = rev_ag + rev_agents
        cost = rev_ag * cogs_share(m) + rev_agents * AGENT_COGS + active * FREE_COST
        fixed = 1500 + (300 if s.get('tools') else 0)
        if s.get('crm_build_start') and m >= s['crm_build_start']:
            fixed += 4000   # product engineering contractor, infra, support tooling
        profit = rev - cost - fixed
        cum += profit
        rows.append(dict(m=m, revenue=round(rev), profit=round(profit), cum=round(cum),
                         clients=round(ag, 1), active_free=round(active), agent_customers=round(agents, 1),
                         mrr=round(s['_mrr_ag'] + rev_agents), signups=round(signups),
                         rev_agency=round(rev_ag), rev_agents=round(rev_agents),
                         other_profit=round(rev_ag * (1 - cogs_share(m)) - active * FREE_COST - fixed)))
    return rows

SHAPES = {
 'A': dict(name='Agency only (current plan)', content=content_clients),
 'B': dict(name='Agency + free tools', content=content_clients, tools=True),
 'C': dict(name='Free CRM + AI agents', agency=False, crm_build_start=1, crm_launch=5,
           su_start=150, su_cap=1500, agent_launch=8),
 'D': dict(name='Free CRM first, all three layers', crm_build_start=1, crm_launch=5,
           su_start=150, su_cap=1500, agent_launch=8, builds_from_free=True, focus=0.8),
 'E': dict(name='Agency first, free CRM later', content=content_clients, tools=True,
           crm_build_start=7, crm_launch=10, su_start=225, su_cap=1500, activate=0.45,
           agent_launch=15, builds_from_free=True),
}

out = {}
for k, s in SHAPES.items():
    rows = run(dict(s))
    r36 = rows[-1]
    # rough sale value at month 36: 5x a year of earnings outside agents (agency, minus free-CRM and fixed costs)
    # plus 5x a year of agent revenue (private SaaS sells near 5x revenue)
    val = 5 * max(r36['other_profit'] * 12, 0) + 5 * r36['rev_agents'] * 12
    first3k = next((r['m'] for r in rows if r['mrr'] >= 3000), None)
    out[k] = dict(name=s['name'], rows=rows, value36=round(val), first3k=first3k,
                  trough=min(r['cum'] for r in rows), cum36=r36['cum'],
                  y1=sum(r['profit'] for r in rows[:12]), y2=sum(r['profit'] for r in rows[12:24]),
                  y3=sum(r['profit'] for r in rows[24:]))
    print(k, s['name'], '| $3k MRR month', first3k, '| trough', out[k]['trough'], '| profit y1/y2/y3',
          out[k]['y1'], out[k]['y2'], out[k]['y3'], '| m36 rev', r36['revenue'], 'profit', r36['profit'],
          '| clients', r36['clients'], 'active', r36['active_free'], 'agents', r36['agent_customers'],
          '| value', out[k]['value36'])
json.dump(out, open(sys.argv[1] if len(sys.argv) > 1 else 'model.json', 'w'))
