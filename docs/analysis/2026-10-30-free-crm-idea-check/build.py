"""Builds the comparison page from model.json, content.json and the style/script files."""
import json, sys, html
D = sys.argv[1]
model = json.load(open(D + '/model.json'))
content = json.load(open(D + '/content.json'))
css = open(D + '/style.css').read()
js = open(D + '/chart.js').read()
SEK = 10  # rounded kr per dollar for the sale-value column

def money(v):
    a = abs(v); s = '−' if v < 0 else ''
    return s + ('$%.1fM' % (a / 1e6) if a >= 1e6 else '$%dk' % round(a / 1e3) if a >= 1e3 else '$%d' % a)

def cls(v): return 's-hi' if v >= 7 else 's-md' if v >= 5 else 's-lo'

keys = list(model.keys())
for k in keys: model[k]['short'] = content['shapes'][k]['short']
slim = {k: dict(short=model[k]['short'], rows=[dict(m=r['m'], revenue=r['revenue'], profit=r['profit'], cum=r['cum']) for r in model[k]['rows']]) for k in keys}

def key(k): return f'<span class="key"><i style="background:var(--s{k})"></i>{k}</span>'

# scorecard
weights = content['weights']
head = ''.join(f'<th class="num">{key(k)}</th>' for k in keys)
rows = ''
totals = {k: 0 for k in keys}
for asp in content['aspects']:
    cells = ''
    for k in keys:
        v = asp['scores'][k]; totals[k] += v * asp.get('w', 1)
        cells += f'<td class="num"><span class="score {cls(v)}" title="{html.escape(asp["why"].get(k, ""))}">{v}</span></td>'
    rows += f'<tr><td><b>{asp["name"]}</b><br><span class="muted small">{asp["what"]}</span></td>{cells}</tr>'
wsum = sum(a.get('w', 1) for a in content['aspects'])
tot = ''.join(f'<td class="num"><span class="score {cls(totals[k] / wsum)}">{totals[k] / wsum:.1f}</span></td>' for k in keys)
rows += f'<tr class="total"><td>Overall (average)</td>{tot}</tr>'
score_table = f'<div class="tablebox"><table><thead><tr><th>Aspect</th>{head}</tr></thead><tbody>{rows}</tbody></table></div>'

# key numbers
def r36(k, f): return model[k]['rows'][-1][f]
numrows = [
  ('Monthly recurring revenue reaches $3,000 (David full-time)', lambda k: f"Month {model[k]['first3k']}" if model[k]['first3k'] else 'Not in 36 months'),
  ('Deepest cash hole before earnings turn positive', lambda k: money(model[k]['trough'])),
  ('Earnings, year 1', lambda k: money(model[k]['y1'])),
  ('Earnings, year 2', lambda k: money(model[k]['y2'])),
  ('Earnings, year 3', lambda k: money(model[k]['y3'])),
  ('Revenue in month 36', lambda k: money(r36(k, 'revenue'))),
  ('Paying build clients, month 36', lambda k: '%d' % round(r36(k, 'clients'))),
  ('Active free users, month 36', lambda k: f"{r36(k, 'active_free'):,}" if r36(k, 'active_free') else '–'),
  ('Paying agent customers, month 36', lambda k: '%d' % round(r36(k, 'agent_customers')) if r36(k, 'agent_customers') else '–'),
  ('Rough sale value at month 36', lambda k: f"{money(model[k]['value36'])} ≈ {model[k]['value36'] * SEK / 1e6:.0f} Mkr"),
]
nr = ''.join('<tr><td>' + n + '</td>' + ''.join(f'<td class="num">{f(k)}</td>' for k in keys) + '</tr>' for n, f in numrows)
num_table = f'<div class="tablebox"><table><thead><tr><th>Base case</th>{head}</tr></thead><tbody>{nr}</tbody></table></div>'

shapes = ''.join(f'''<div class="shape"><h3><span class="tag" style="background:var(--s{k})">{k}</span>{c["name"]}</h3>
<p class="small">{c["what"]}</p><p class="small muted"><b>Earns from:</b> {c["earns"]}</p></div>''' for k, c in content['shapes'].items())

def table(rows, heads):
    h = ''.join(f'<th>{x}</th>' for x in heads)
    b = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows)
    return f'<div class="tablebox"><table><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table></div>'

moat_rows = [[key(k) + ' ' + content['shapes'][k]['short'], content['moat'][k], content['future'][k]] for k in keys]
sens = json.load(open(D + '/sens.json'))
sens_rows = [[key(k) + ' ' + content['shapes'][k]['short']] + [money(sens[k][m]['y3']) + f" <span class='muted'>({sens[k][m]['active']:,} active)</span>" for m in ('0.5', '1', '3')] for k in ('C', 'D', 'E')]
page = open(D + '/template.html').read()
for a, b in {
  '{{CSS}}': css, '{{JS}}': js, '{{DATA}}': json.dumps(slim),
  '{{SHAPES}}': shapes, '{{SENS}}': table(sens_rows, ['Shape', 'Half the signups', 'Base case', 'Three times']), '{{SCORES}}': score_table, '{{NUMBERS}}': num_table,
  '{{MOAT}}': table(moat_rows, ['Shape', 'Moat: what gets harder to copy', 'Future-proof: what could break it']),
  '{{RESEARCH}}': table(content['research'], ['Finding', 'What it means here']),
  '{{ASSUMPTIONS}}': ''.join(f'<li>{x}</li>' for x in content['assumptions']),
  '{{SOURCES}}': ''.join(f'<li>{x}</li>' for x in content['sources']),
  '{{ANSWER}}': ''.join(f'<p>{x}</p>' for x in content['answer']),
}.items():
    page = page.replace(a, b)
open(D + '/free-crm-idea-check.html', 'w').write(page)
print('built', len(page))
