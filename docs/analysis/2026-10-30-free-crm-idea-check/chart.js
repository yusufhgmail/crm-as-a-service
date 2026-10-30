// Draws the monthly charts from MODEL (injected) with visible checkboxes and a fixed scale per view.
(function () {
  const css = getComputedStyle(document.documentElement);
  const tok = n => css.getPropertyValue(n).trim();
  const COLORS = { A: tok('--sA'), B: tok('--sB'), C: tok('--sC'), D: tok('--sD'), E: tok('--sE') };
  const keys = Object.keys(MODEL);
  const views = {
    revenue: { label: 'Revenue per month', field: 'revenue' },
    profit: { label: 'Earnings per month', field: 'profit' },
    cum: { label: 'Total earnings so far', field: 'cum' }
  };
  let view = 'profit';
  const on = Object.fromEntries(keys.map(k => [k, true]));
  const fmt = v => (v < 0 ? '−' : '') + '$' + (Math.abs(v) >= 1e6 ? (Math.abs(v) / 1e6).toFixed(1) + 'M' : Math.abs(v) >= 1e3 ? Math.round(Math.abs(v) / 1e3) + 'k' : Math.round(Math.abs(v)));
  const svg = document.getElementById('chart');
  const tip = document.getElementById('chart-tip');
  const W = 760, H = 340, L = 64, R = 16, T = 16, B = 34;
  function niceStep(span) { const raw = span / 5; const p = Math.pow(10, Math.floor(Math.log10(raw))); const n = raw / p; return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * p; }
  function draw() {
    const f = views[view].field;
    // fixed scale: computed from all shapes so toggling never rescales
    let lo = 0, hi = 0;
    keys.forEach(k => MODEL[k].rows.forEach(r => { lo = Math.min(lo, r[f]); hi = Math.max(hi, r[f]); }));
    const step = niceStep(hi - lo); lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
    const x = m => L + (m - 1) / 35 * (W - L - R);
    const y = v => T + (hi - v) / (hi - lo) * (H - T - B);
    let s = '';
    for (let v = lo; v <= hi + 1e-9; v += step) {
      s += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="${v === 0 ? 'zero' : 'grid'}"/>`;
      s += `<text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" class="tick">${fmt(v)}</text>`;
    }
    [1, 6, 12, 18, 24, 30, 36].forEach(m => { s += `<text x="${x(m)}" y="${H - 10}" text-anchor="middle" class="tick">${m === 1 ? 'Month 1' : m}</text>`; });
    [12, 24].forEach(m => { s += `<line x1="${x(m)}" x2="${x(m)}" y1="${T}" y2="${H - B}" class="year"/>`; });
    keys.forEach(k => {
      if (!on[k]) return;
      const pts = MODEL[k].rows.map(r => `${x(r.m).toFixed(1)},${y(r[f]).toFixed(1)}`).join(' ');
      s += `<polyline points="${pts}" fill="none" stroke="${COLORS[k]}" stroke-width="2.4" stroke-linejoin="round"/>`;
      const last = MODEL[k].rows[35];
      s += `<circle cx="${x(36)}" cy="${y(last[f])}" r="3.5" fill="${COLORS[k]}"/>`;
    });
    s += `<line id="hover-line" x1="0" x2="0" y1="${T}" y2="${H - B}" class="hover" visibility="hidden"/>`;
    s += `<rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="transparent" id="hit"/>`;
    svg.innerHTML = s;
    document.getElementById('chart-title').textContent = views[view].label;
    const hit = document.getElementById('hit'), hl = document.getElementById('hover-line');
    function move(ev) {
      const rect = svg.getBoundingClientRect();
      const px = (ev.clientX - rect.left) / rect.width * W;
      const m = Math.max(1, Math.min(36, Math.round((px - L) / (W - L - R) * 35 + 1)));
      hl.setAttribute('x1', x(m)); hl.setAttribute('x2', x(m)); hl.setAttribute('visibility', 'visible');
      tip.innerHTML = `<b>Month ${m}</b>` + keys.filter(k => on[k]).map(k => `<span><i style="background:${COLORS[k]}"></i>${k} ${fmt(MODEL[k].rows[m - 1][f])}</span>`).join('');
      tip.hidden = false;
    }
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerleave', () => { tip.hidden = true; hl.setAttribute('visibility', 'hidden'); });
  }
  const box = document.getElementById('series');
  box.innerHTML = keys.map(k => `<label class="chk"><input type="checkbox" id="s-${k}" checked><i style="background:${COLORS[k]}"></i>${k} · ${MODEL[k].short}</label>`).join('');
  keys.forEach(k => document.getElementById('s-' + k).addEventListener('change', e => { on[k] = e.target.checked; draw(); }));
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    view = b.dataset.view; document.querySelectorAll('[data-view]').forEach(o => o.setAttribute('aria-pressed', o === b)); draw();
  }));
  draw();
})();
