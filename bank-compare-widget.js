/* ==========================================================================
   Porównywarka kredytów hipotecznych — branded widget
   Brand: navy (#0D2240) + gold (#C9A84C) + cream (#F9F7F2)
   Mount with: window.mountPkhWidget(el)
   ========================================================================== */
(function () {
  if (window.__pkhDefined) return;
  window.__pkhDefined = true;

  var CSS = `
#pkh-root *, #pkh-root *::before, #pkh-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
#pkh-root {
  font-family: 'DM Sans', 'Inter', system-ui, sans-serif;
  color: #0D2240;
  font-size: 14px;
  line-height: 1.5;
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(201,168,76,0.22);
  box-shadow: 0 24px 56px rgba(13,34,64,0.12);
  padding: 28px 32px;
  --pkh-navy: #0D2240;
  --pkh-navy-deep: #081628;
  --pkh-gold: #C9A84C;
  --pkh-gold-deep: #A8893A;
  --pkh-gold-tint: #FBF6E6;
  --pkh-cream: #F9F7F2;
  --pkh-line: #E4DFD2;
  --pkh-line-strong: #C9C2AE;
  --pkh-muted: #6E7A8C;
  --pkh-soft: #2C3E5C;
  --pkh-good: #3B6D11;
  --pkh-good-bg: #EAF3DE;
  --pkh-bad: #A32D2D;
  --pkh-bad-bg: #FCEBEB;
}
#pkh-root .pkh-top {
  padding-bottom: 18px;
  border-bottom: 0.5px solid var(--pkh-line);
  margin-bottom: 22px;
}
#pkh-root .pkh-eyebrow {
  font-size: 11px; font-weight: 600; color: var(--pkh-gold-deep);
  letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px;
}
#pkh-root .pkh-top h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 26px; font-weight: 700; color: var(--pkh-navy);
  letter-spacing: -0.01em; line-height: 1.15;
}
#pkh-root .pkh-top p { font-size: 13px; color: var(--pkh-muted); margin-top: 6px; line-height: 1.55; }

#pkh-root .pkh-sec {
  font-size: 11px; font-weight: 600; color: var(--pkh-muted);
  letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 10px;
}
#pkh-root .pkh-sec-note { font-weight: 400; text-transform: none; font-size: 11px; color: var(--pkh-muted); letter-spacing: 0.02em; }
#pkh-root .pkh-gp {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px; margin-bottom: 22px;
}
#pkh-root .pkh-pbox {
  background: var(--pkh-cream); border: 1px solid var(--pkh-line);
  border-radius: 10px; padding: 11px 14px;
}
#pkh-root .pkh-pbox label {
  font-size: 10px; color: var(--pkh-muted); display: block; margin-bottom: 4px;
  font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
}
#pkh-root .pkh-pbox input[type=number] {
  width: 100%; background: transparent; border: 0; border-bottom: 1px solid var(--pkh-line-strong);
  padding: 3px 0; font-size: 15px; font-weight: 600; color: var(--pkh-navy);
  outline: none; font-family: inherit; font-variant-numeric: tabular-nums;
}
#pkh-root .pkh-pbox input:focus { border-bottom-color: var(--pkh-gold); }
#pkh-root .pkh-pbox input[type=number]::-webkit-inner-spin-button { display: none; }

#pkh-root .pkh-bsel { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
#pkh-root .pkh-btog {
  display: flex; align-items: center; gap: 7px;
  padding: 7px 14px; border-radius: 8px;
  border: 1px solid var(--pkh-line-strong); cursor: pointer;
  font-size: 13px; font-weight: 500; user-select: none;
  background: #fff; color: var(--pkh-soft);
  transition: all .15s;
}
#pkh-root .pkh-btog:hover { border-color: var(--pkh-gold); }
#pkh-root .pkh-btog.on {
  background: var(--pkh-navy); color: #fff; border-color: var(--pkh-navy);
}
#pkh-root .pkh-btog input { display: none; }
#pkh-root .pkh-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

#pkh-root .pkh-ep {
  background: #fff; border: 1px solid var(--pkh-line);
  border-radius: 10px; padding: 14px 16px; margin-bottom: 7px;
  transition: border-color 0.15s;
}
#pkh-root .pkh-ep:hover { border-color: var(--pkh-line-strong); }
#pkh-root .pkh-ep.off { opacity: 0.45; }
#pkh-root .pkh-eph {
  display: flex; align-items: center; gap: 9px; cursor: pointer; user-select: none;
}
#pkh-root .pkh-ep-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 15px; font-weight: 700; color: var(--pkh-navy);
}
#pkh-root .pkh-ep-tog {
  font-size: 11px; color: var(--pkh-gold-deep); margin-left: auto; font-weight: 600;
  letter-spacing: 0.06em;
}
#pkh-root .pkh-epg {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--pkh-line);
}
#pkh-root .pkh-ef { display: flex; flex-direction: column; gap: 4px; }
#pkh-root .pkh-ef label {
  font-size: 10px; color: var(--pkh-muted); font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.08em;
}
#pkh-root .pkh-ef input[type=number], #pkh-root .pkh-ef input[type=text] {
  border: 1px solid var(--pkh-line-strong); border-radius: 6px;
  padding: 6px 8px; font-size: 13px; background: #fff; color: var(--pkh-navy);
  width: 100%; outline: none; font-family: inherit; font-variant-numeric: tabular-nums;
  transition: border-color 0.15s, box-shadow 0.15s;
}
#pkh-root .pkh-ef input:focus { border-color: var(--pkh-gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
#pkh-root .pkh-cbr {
  display: flex; align-items: center; gap: 7px;
  font-size: 11px; color: var(--pkh-soft); margin-top: 5px; cursor: pointer;
}
#pkh-root .pkh-cbr input[type=checkbox] {
  width: 14px; height: 14px; cursor: pointer; flex-shrink: 0;
  accent-color: var(--pkh-gold);
}
#pkh-root .pkh-note {
  font-size: 11px; color: var(--pkh-soft);
  background: var(--pkh-gold-tint); border: 1px solid rgba(201,168,76,0.3);
  border-radius: 8px; padding: 8px 11px; margin-top: 8px; line-height: 1.5;
}

#pkh-root .pkh-tabs {
  display: flex; gap: 4px; margin: 28px 0 18px;
  border-bottom: 1px solid var(--pkh-line); overflow-x: auto;
}
#pkh-root .pkh-tab {
  font-size: 13px; padding: 10px 18px; cursor: pointer;
  border: 0; background: transparent; color: var(--pkh-muted);
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  font-family: inherit; font-weight: 500; white-space: nowrap;
  transition: color 0.15s;
}
#pkh-root .pkh-tab:hover { color: var(--pkh-navy); }
#pkh-root .pkh-tab.active {
  color: var(--pkh-navy); border-bottom-color: var(--pkh-gold);
  font-weight: 600;
}
#pkh-root .pkh-sort-row {
  display: flex; align-items: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap;
}
#pkh-root .pkh-sort-row label { font-size: 12px; color: var(--pkh-muted); font-weight: 500; }
#pkh-root select {
  font-size: 13px; padding: 6px 10px; border-radius: 7px;
  border: 1px solid var(--pkh-line-strong); background: #fff;
  color: var(--pkh-navy); font-family: inherit; cursor: pointer; outline: none;
  transition: border-color 0.15s;
}
#pkh-root select:focus { border-color: var(--pkh-gold); }

#pkh-root .pkh-summary {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px; margin-bottom: 22px; background: var(--pkh-line);
  border: 1px solid var(--pkh-line); border-radius: 10px; overflow: hidden;
}
#pkh-root .pkh-stat { background: #fff; padding: 14px 16px; }
#pkh-root .pkh-stat .pkh-sl {
  font-size: 10px; color: var(--pkh-muted); margin-bottom: 4px;
  text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;
}
#pkh-root .pkh-stat .pkh-sv {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px; font-weight: 700; color: var(--pkh-navy);
  font-variant-numeric: tabular-nums; letter-spacing: -0.01em; line-height: 1.1;
}
#pkh-root .pkh-stat .pkh-sv.g { color: var(--pkh-good); }
#pkh-root .pkh-stat .pkh-sv.r { color: var(--pkh-bad); }

#pkh-root .pkh-cards {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;
}
#pkh-root .pkh-card {
  background: #fff; border: 1px solid var(--pkh-line);
  border-radius: 12px; padding: 18px;
  transition: transform 0.2s, box-shadow 0.2s;
}
#pkh-root .pkh-card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(13,34,64,0.1); }
#pkh-root .pkh-card.best {
  border: 2px solid var(--pkh-good); background: linear-gradient(180deg, #F4FAEC 0%, #fff 60%);
}
#pkh-root .pkh-card.worst { border: 2px solid var(--pkh-bad); }

#pkh-root .pkh-ch {
  display: flex; align-items: center; gap: 9px; margin-bottom: 12px;
  padding-bottom: 12px; border-bottom: 0.5px solid var(--pkh-line);
}
#pkh-root .pkh-cn {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 17px; font-weight: 700; color: var(--pkh-navy); letter-spacing: -0.005em;
}
#pkh-root .pkh-badge {
  font-size: 10px; padding: 3px 9px; border-radius: 999px;
  margin-left: auto; font-weight: 600; letter-spacing: 0.04em;
}
#pkh-root .pkh-bg { background: var(--pkh-good); color: #fff; }
#pkh-root .pkh-br { background: var(--pkh-bad); color: #fff; }

#pkh-root .pkh-row {
  display: flex; justify-content: space-between; padding: 6px 0;
  border-bottom: 1px solid #F4F1E8; font-size: 13px; gap: 10px;
}
#pkh-root .pkh-row:last-of-type { border-bottom: 0; }
#pkh-root .pkh-rl { color: var(--pkh-muted); flex-shrink: 0; }
#pkh-root .pkh-rv {
  font-weight: 600; text-align: right; color: var(--pkh-navy);
  font-variant-numeric: tabular-nums;
}
#pkh-root .pkh-rv.g { color: var(--pkh-good); }
#pkh-root .pkh-rv.r { color: var(--pkh-bad); }

#pkh-root .pkh-divider {
  font-size: 10px; font-weight: 600; color: var(--pkh-gold-deep);
  text-transform: uppercase; letter-spacing: 0.12em;
  padding: 9px 0 4px; border-top: 1px solid var(--pkh-line); margin-top: 6px;
}

#pkh-root .pkh-tbl-wrap { overflow-x: auto; border: 1px solid var(--pkh-line); border-radius: 10px; }
#pkh-root table { width: 100%; border-collapse: collapse; font-size: 12px; }
#pkh-root th {
  font-size: 10px; font-weight: 600; color: var(--pkh-muted);
  padding: 11px 12px; text-align: left;
  background: var(--pkh-cream); border-bottom: 1px solid var(--pkh-line);
  white-space: nowrap; text-transform: uppercase; letter-spacing: 0.06em;
}
#pkh-root td {
  padding: 10px 12px; border-bottom: 1px solid rgba(228,223,210,0.5);
  white-space: nowrap; color: var(--pkh-navy);
  font-variant-numeric: tabular-nums;
}
#pkh-root tbody tr:hover { background: var(--pkh-cream); }
#pkh-root tbody tr:last-child td { border-bottom: 0; }
#pkh-root .pkh-td-g { color: var(--pkh-good); font-weight: 600; }
#pkh-root .pkh-td-r { color: var(--pkh-bad); font-weight: 600; }

#pkh-root .pkh-bw { margin-bottom: 24px; }
#pkh-root .pkh-bt2 {
  font-size: 11px; color: var(--pkh-muted); margin-bottom: 9px;
  text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;
}
#pkh-root .pkh-brow { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
#pkh-root .pkh-bl {
  font-size: 12px; color: var(--pkh-soft); width: 110px;
  text-align: right; flex-shrink: 0; font-weight: 500;
}
#pkh-root .pkh-btr {
  flex: 1; height: 26px; background: var(--pkh-cream);
  border-radius: 6px; overflow: hidden;
}
#pkh-root .pkh-bf {
  height: 100%; border-radius: 6px; display: flex; align-items: center;
  padding: 0 8px; font-size: 11px; color: #fff; font-weight: 600;
  transition: width .4s ease; white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
#pkh-root .pkh-bv2 {
  font-size: 12px; font-weight: 600; width: 110px; flex-shrink: 0;
  color: var(--pkh-navy); font-variant-numeric: tabular-nums;
}

#pkh-root .pkh-cmp-section { margin-bottom: 28px; }
#pkh-root .pkh-cmp-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 16px; font-weight: 700; color: var(--pkh-navy);
  margin-bottom: 14px; padding-bottom: 8px;
  border-bottom: 1px solid var(--pkh-line); letter-spacing: -0.005em;
}
#pkh-root .pkh-cmp-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;
}
#pkh-root .pkh-cmp-card {
  border: 1px solid var(--pkh-line); border-radius: 10px; padding: 16px; text-align: center;
  background: #fff;
}
#pkh-root .pkh-cmp-card.best-c {
  border: 2px solid var(--pkh-good);
  background: linear-gradient(180deg, #F4FAEC 0%, #fff 70%);
}
#pkh-root .pkh-cmp-card.worst-c { border: 2px solid var(--pkh-bad); }
#pkh-root .pkh-cmp-bank {
  font-size: 13px; font-weight: 600; color: var(--pkh-navy);
  margin-bottom: 7px; display: flex; align-items: center; justify-content: center; gap: 6px;
}
#pkh-root .pkh-cmp-val {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px; font-weight: 700; color: var(--pkh-navy);
  font-variant-numeric: tabular-nums; letter-spacing: -0.01em; line-height: 1.1;
}
#pkh-root .pkh-cmp-val.g { color: var(--pkh-good); }
#pkh-root .pkh-cmp-val.r { color: var(--pkh-bad); }
#pkh-root .pkh-cmp-sub { font-size: 11px; color: var(--pkh-muted); margin-top: 4px; }

#pkh-root .pkh-diff-bar {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; margin-top: 8px; flex-wrap: wrap;
}
#pkh-root .pkh-diff-label { font-size: 10px; color: var(--pkh-muted); }
#pkh-root .pkh-diff-pill {
  font-size: 10px; padding: 3px 9px; border-radius: 999px;
  font-weight: 600; letter-spacing: 0.02em;
}
#pkh-root .pkh-diff-pill.save { background: var(--pkh-good-bg); color: var(--pkh-good); }
#pkh-root .pkh-diff-pill.extra { background: var(--pkh-bad-bg); color: var(--pkh-bad); }

#pkh-root .pkh-empty {
  color: var(--pkh-muted); padding: 28px 12px; text-align: center;
  font-size: 14px; font-style: italic;
}

@media (max-width: 600px) {
  #pkh-root { padding: 20px 18px; border-radius: 14px; }
  #pkh-root .pkh-gp { grid-template-columns: 1fr 1fr; }
  #pkh-root .pkh-cards { grid-template-columns: 1fr; }
  #pkh-root .pkh-cmp-grid { grid-template-columns: 1fr 1fr; }
  #pkh-root .pkh-summary { grid-template-columns: 1fr 1fr; }
  #pkh-root .pkh-top h3 { font-size: 22px; }
  #pkh-root .pkh-bl { width: 80px; font-size: 11px; }
  #pkh-root .pkh-bv2 { width: 90px; font-size: 11px; }
}
`;

  var HTML = ''
    + '<div class="pkh-top">'
    +   '<div class="pkh-eyebrow">Porównywarka kredytów</div>'
    +   '<h3>Realne koszty u 6 banków, obok siebie</h3>'
    +   '<p>Edytuj parametry każdego banku · wybierz banki do porównania · zobacz różnice w racie, kosztach 5-letnich i całkowitych.</p>'
    + '</div>'

    + '<div class="pkh-sec">Parametry kredytu</div>'
    + '<div class="pkh-gp">'
    +   '<div class="pkh-pbox"><label>Kwota kredytu (PLN)</label><input type="number" id="pkh-kwota" value="600000" step="10000"></div>'
    +   '<div class="pkh-pbox"><label>Wartość nieruchomości (PLN)</label><input type="number" id="pkh-wartosc" value="2200000" step="10000"></div>'
    +   '<div class="pkh-pbox"><label>Okres kredytu (mies.)</label><input type="number" id="pkh-okres" value="360" min="12" max="420" step="12"></div>'
    +   '<div class="pkh-pbox"><label>WIBOR 3M (%)</label><input type="number" id="pkh-wibor" value="3.84" step="0.01" min="0" max="15"></div>'
    +   '<div class="pkh-pbox"><label>Ub. zewn. życie (PLN/mies)</label><input type="number" id="pkh-ubzew-zycie" value="0" step="10" min="0"></div>'
    +   '<div class="pkh-pbox"><label>Ub. zewn. nieruch. (PLN/mies)</label><input type="number" id="pkh-ubzew-nieruch" value="0" step="10" min="0"></div>'
    + '</div>'

    + '<div class="pkh-sec">Wybierz banki do porównania</div>'
    + '<div class="pkh-bsel" id="pkh-bank-selector"></div>'

    + '<div class="pkh-sec" style="margin-top:4px">Parametry banków <span class="pkh-sec-note">(kliknij aby rozwinąć)</span></div>'
    + '<div id="pkh-edit-panels"></div>'

    + '<div class="pkh-tabs">'
    +   '<button class="pkh-tab active" data-tab="karty">Karty</button>'
    +   '<button class="pkh-tab" data-tab="5lat">Porównanie 5 lat</button>'
    +   '<button class="pkh-tab" data-tab="tabela">Tabela</button>'
    +   '<button class="pkh-tab" data-tab="wykres">Wykres</button>'
    + '</div>'

    + '<div class="pkh-sort-row">'
    +   '<label>Sortuj wg:</label>'
    +   '<select id="pkh-sort-by">'
    +     '<option value="rata">Rata miesięczna</option>'
    +     '<option value="koszty5">Koszty 5 lat</option>'
    +     '<option value="rataPo">Rata po 5 latach</option>'
    +     '<option value="oproc">Marża 5 lat</option>'
    +   '</select>'
    +   '<select id="pkh-sort-dir">'
    +     '<option value="asc">Rosnąco</option>'
    +     '<option value="desc">Malejąco</option>'
    +   '</select>'
    + '</div>'

    + '<div class="pkh-summary" id="pkh-summary"></div>'
    + '<div id="pkh-content"></div>';

  var NOTES = {
    'Erste': 'Transze wypłacane na podstawie zdjęć i wpisu w dziennik budowy.',
    'PKO BP': 'Inspekcja nieruchomości 200 zł – płatna dodatkowo.',
    'mBank': 'Ankieta medyczna przed podpisaniem umowy. Inspekcja przed wypłatą każdej transzy. Ub. życie na 2 osoby proporcjonalnie.',
    'Pekao SA': 'Ub. nieruchomości liczone jako składka roczna od wartości kredytu.',
    'ING': 'Ub. nieruchomości: składka miesięczna.',
    'Millennium': 'Ub. nieruchomości: składka miesięczna.'
  };
  // brand-tinted dot colors per bank
  var COLORS = ['#A8893A', '#1F4475', '#3B6D11', '#C9A84C', '#7A4E2A', '#5B3F8E'];

  var banks, openPanels, activeTab, root;

  function gp() {
    return {
      kwota: +root.querySelector('#pkh-kwota').value || 600000,
      wartosc: +root.querySelector('#pkh-wartosc').value || 2200000,
      okres: +root.querySelector('#pkh-okres').value || 360,
      wibor: +root.querySelector('#pkh-wibor').value || 3.84,
      ubZewZycie: +root.querySelector('#pkh-ubzew-zycie').value || 0,
      ubZewNieruch: +root.querySelector('#pkh-ubzew-nieruch').value || 0
    };
  }
  function calcRata(p, r, n) { var rm = r / 12; if (rm === 0) return p / n; return p * rm * Math.pow(1 + rm, n) / (Math.pow(1 + rm, n) - 1); }
  function calcBank(b, p) {
    var kwota = p.kwota, wartosc = p.wartosc, okres = p.okres, wibor = p.wibor;
    var rate5 = b.marza5 / 100;
    var ratePo = (b.marzaPo / 100) + wibor / 100;
    var rataBase = calcRata(kwota, rate5, okres);
    var ubZycieMies = b.ubZycieOn ? (kwota * b.ubZycie / 100) : 0;
    var ubNieruchMies = b.ubNieruchOn ? (kwota * b.ubNieruch / 100) : 0;
    var ubZewZycieMies = b.ubZewZycieOn ? p.ubZewZycie : 0;
    var ubZewNieruchMies = b.ubZewNieruchOn ? p.ubZewNieruch : 0;
    var rataTotal = rataBase + ubZycieMies + ubNieruchMies + ubZewZycieMies + ubZewNieruchMies;
    var koszty5 = rataTotal * 60;
    var rataPo = calcRata(kwota, ratePo, okres > 60 ? okres - 60 : okres);
    var ltv = (kwota / wartosc * 100).toFixed(1);
    var oprocPo = (b.marzaPo + wibor).toFixed(2);
    return { rataBase: rataBase, ubZycieMies: ubZycieMies, ubNieruchMies: ubNieruchMies, ubZewZycieMies: ubZewZycieMies, ubZewNieruchMies: ubZewNieruchMies, rataTotal: rataTotal, koszty5: koszty5, rataPo: rataPo, rate5: rate5, ratePo: ratePo, ltv: ltv, oprocPo: oprocPo };
  }
  function fmt(n) { return Math.round(n).toLocaleString('pl-PL') + '\u00a0z\u0142'; }
  function fmtK(n) { return (Math.round(n / 100) / 10).toLocaleString('pl-PL', { minimumFractionDigits: 1 }) + 'k\u00a0z\u0142'; }
  function activeB() { return banks.filter(function (b) { return b.active; }); }
  function getSorted() {
    var p = gp();
    var by = root.querySelector('#pkh-sort-by').value;
    var dir = root.querySelector('#pkh-sort-dir').value;
    var arr = activeB().map(function (b) { return { b: b, c: calcBank(b, p) }; });
    arr.sort(function (a, z) {
      var va = by === 'rata' ? a.c.rataTotal : by === 'koszty5' ? a.c.koszty5 : by === 'rataPo' ? a.c.rataPo : a.b.marza5;
      var vz = by === 'rata' ? z.c.rataTotal : by === 'koszty5' ? z.c.koszty5 : by === 'rataPo' ? z.c.rataPo : z.b.marza5;
      return dir === 'asc' ? va - vz : vz - va;
    });
    return arr;
  }
  function findBank(id) { return banks.filter(function (b) { return b.id === id; })[0]; }

  function renderSelector() {
    root.querySelector('#pkh-bank-selector').innerHTML = banks.map(function (b) {
      return '<label class="pkh-btog ' + (b.active ? 'on' : '') + '" data-bid="' + b.id + '">'
        + '<input type="checkbox" ' + (b.active ? 'checked' : '') + '>'
        + '<span class="pkh-dot" style="background:' + b.kolor + '"></span>' + b.nazwa + '</label>';
    }).join('');
  }

  function renderEditPanels() {
    root.querySelector('#pkh-edit-panels').innerHTML = banks.map(function (b) {
      var open = openPanels[b.id];
      return '<div class="pkh-ep ' + (b.active ? '' : 'off') + '">'
        + '<div class="pkh-eph" data-toggle="' + b.id + '">'
        + '<span class="pkh-dot" style="background:' + b.kolor + ';width:11px;height:11px;border-radius:50%"></span>'
        + '<span class="pkh-ep-name">' + b.nazwa + '</span>'
        + '<span class="pkh-ep-tog">' + (open ? '▲ zwiń' : '▼ rozwiń') + '</span>'
        + '</div>'
        + (open ? '<div class="pkh-epg">'
          + '<div class="pkh-ef"><label>Marża 5 lat (%)</label><input type="number" value="' + b.marza5 + '" step="0.01" min="0" max="20" data-upd="' + b.id + '|marza5|num"></div>'
          + '<div class="pkh-ef"><label>Marża po 5 latach (%)</label><input type="number" value="' + b.marzaPo + '" step="0.01" min="0" max="20" data-upd="' + b.id + '|marzaPo|num"></div>'
          + '<div class="pkh-ef"><label>Ub. życie bank (% kredytu/mies)</label>'
            + '<input type="number" value="' + b.ubZycie + '" step="0.001" min="0" max="5" data-upd="' + b.id + '|ubZycie|num">'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.ubZycieOn ? 'checked' : '') + ' data-upd="' + b.id + '|ubZycieOn|bool"><span>Uwzględnij</span></label>'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.ubZewZycieOn ? 'checked' : '') + ' data-upd="' + b.id + '|ubZewZycieOn|bool"><span>Użyj ub. zewnętrznego</span></label>'
          + '</div>'
          + '<div class="pkh-ef"><label>Ub. nieruchomości bank (% kredytu/mies)</label>'
            + '<input type="number" value="' + b.ubNieruch + '" step="0.001" min="0" max="5" data-upd="' + b.id + '|ubNieruch|num">'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.ubNieruchOn ? 'checked' : '') + ' data-upd="' + b.id + '|ubNieruchOn|bool"><span>Uwzględnij</span></label>'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.ubZewNieruchOn ? 'checked' : '') + ' data-upd="' + b.id + '|ubZewNieruchOn|bool"><span>Użyj ub. zewnętrznego</span></label>'
          + '</div>'
          + '<div class="pkh-ef"><label>Rez. ub. życie – wzrost marży (%)</label><input type="number" value="' + b.rezUbZycie + '" step="0.01" min="0" max="5" data-upd="' + b.id + '|rezUbZycie|num"></div>'
          + '<div class="pkh-ef"><label>Rez. ub. nieruch. – wzrost marży (%)</label><input type="number" value="' + b.rezUbNieruch + '" step="0.01" min="0" max="5" data-upd="' + b.id + '|rezUbNieruch|num"></div>'
          + (b.kartyKredytowe ? '<div class="pkh-ef"><label>Rez. karty kredyt. – wzrost marży (%)</label><input type="number" value="' + b.rezKarta + '" step="0.01" min="0" max="5" data-upd="' + b.id + '|rezKarta|num"></div>' : '')
        + '</div>' : '')
        + '</div>';
    }).join('');
  }

  function renderSummary(sorted) {
    if (!sorted.length) { root.querySelector('#pkh-summary').innerHTML = ''; return; }
    var rates = sorted.map(function (x) { return x.c.rataTotal; });
    var k5 = sorted.map(function (x) { return x.c.koszty5; });
    var min = Math.min.apply(null, rates), max = Math.max.apply(null, rates);
    var minK = Math.min.apply(null, k5), maxK = Math.max.apply(null, k5);
    root.querySelector('#pkh-summary').innerHTML =
      '<div class="pkh-stat"><div class="pkh-sl">Najlepsza rata</div><div class="pkh-sv g">' + fmt(min) + '</div></div>'
      + '<div class="pkh-stat"><div class="pkh-sl">Najwyższa rata</div><div class="pkh-sv r">' + fmt(max) + '</div></div>'
      + '<div class="pkh-stat"><div class="pkh-sl">Różnica rat</div><div class="pkh-sv">' + fmt(max - min) + '</div></div>'
      + '<div class="pkh-stat"><div class="pkh-sl">Najniższe koszty 5l</div><div class="pkh-sv g">' + fmtK(minK) + '</div></div>'
      + '<div class="pkh-stat"><div class="pkh-sl">Najwyższe koszty 5l</div><div class="pkh-sv r">' + fmtK(maxK) + '</div></div>'
      + '<div class="pkh-stat"><div class="pkh-sl">Oszczędność 5l</div><div class="pkh-sv">' + fmtK(maxK - minK) + '</div></div>';
  }

  function renderCards(sorted) {
    if (!sorted.length) return '<div class="pkh-empty">Wybierz co najmniej jeden bank.</div>';
    return '<div class="pkh-cards">' + sorted.map(function (item, i) {
      var b = item.b, c = item.c;
      var iB = i === 0, iW = i === sorted.length - 1 && sorted.length > 1;
      return '<div class="pkh-card ' + (iB ? 'best' : iW ? 'worst' : '') + '">'
        + '<div class="pkh-ch"><span class="pkh-dot" style="background:' + b.kolor + ';width:12px;height:12px"></span><span class="pkh-cn">' + b.nazwa + '</span>' + (iB ? '<span class="pkh-badge pkh-bg">Najlepsza</span>' : iW ? '<span class="pkh-badge pkh-br">Najwyższa</span>' : '') + '</div>'
        + '<div class="pkh-row"><span class="pkh-rl">Rata całkowita</span><span class="pkh-rv ' + (iB ? 'g' : iW ? 'r' : '') + '">' + fmt(c.rataTotal) + '</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">Rata bazowa</span><span class="pkh-rv">' + fmt(c.rataBase) + '</span></div>'
        + (c.ubZycieMies > 0 ? '<div class="pkh-row"><span class="pkh-rl">Ub. życie bank</span><span class="pkh-rv">' + fmt(c.ubZycieMies) + '</span></div>' : '')
        + (c.ubZewZycieMies > 0 ? '<div class="pkh-row"><span class="pkh-rl">Ub. życie zewn.</span><span class="pkh-rv">' + fmt(c.ubZewZycieMies) + '</span></div>' : '')
        + (c.ubNieruchMies > 0 ? '<div class="pkh-row"><span class="pkh-rl">Ub. nieruch. bank</span><span class="pkh-rv">' + fmt(c.ubNieruchMies) + '</span></div>' : '')
        + (c.ubZewNieruchMies > 0 ? '<div class="pkh-row"><span class="pkh-rl">Ub. nieruch. zewn.</span><span class="pkh-rv">' + fmt(c.ubZewNieruchMies) + '</span></div>' : '')
        + '<div class="pkh-divider">Oprocentowanie</div>'
        + '<div class="pkh-row"><span class="pkh-rl">Marża 5 lat (stała)</span><span class="pkh-rv">' + b.marza5.toFixed(2) + '%</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">Marża po 5 latach</span><span class="pkh-rv">' + b.marzaPo.toFixed(2) + '%</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">Oprocent. po 5l (z WIBOR)</span><span class="pkh-rv">' + c.oprocPo + '%</span></div>'
        + '<div class="pkh-divider">Koszty</div>'
        + '<div class="pkh-row"><span class="pkh-rl">Koszty 5 lat łącznie</span><span class="pkh-rv">' + fmt(c.koszty5) + '</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">Rata po 5 latach</span><span class="pkh-rv">' + fmt(c.rataPo) + '</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">LTV</span><span class="pkh-rv">' + c.ltv + '%</span></div>'
        + (b.kartyKredytowe ? '<div class="pkh-row"><span class="pkh-rl">Rez. karty (+' + b.rezKarta.toFixed(2) + '% marży)</span><span class="pkh-rv">' + b.rezKarta.toFixed(2) + '%</span></div>' : '')
        + (NOTES[b.nazwa] ? '<div class="pkh-note">' + NOTES[b.nazwa] + '</div>' : '')
        + '</div>';
    }).join('') + '</div>';
  }

  function render5lat(sorted) {
    if (!sorted.length) return '<div class="pkh-empty">Wybierz co najmniej jeden bank.</div>';
    var best5 = sorted[0];
    var p = gp();
    var html = '';
    html += '<div class="pkh-cmp-section"><div class="pkh-cmp-title">Koszt kredytu w pierwszych 5 latach (60 rat)</div><div class="pkh-cmp-grid">';
    sorted.forEach(function (item, i) {
      var b = item.b, c = item.c;
      var iB = i === 0, iW = i === sorted.length - 1 && sorted.length > 1;
      var diff = c.koszty5 - best5.c.koszty5;
      html += '<div class="pkh-cmp-card ' + (iB ? 'best-c' : iW ? 'worst-c' : '') + '">'
        + '<div class="pkh-cmp-bank"><span class="pkh-dot" style="background:' + b.kolor + ';width:9px;height:9px"></span>' + b.nazwa + '</div>'
        + '<div class="pkh-cmp-val ' + (iB ? 'g' : iW ? 'r' : '') + '">' + fmtK(c.koszty5) + '</div>'
        + '<div class="pkh-cmp-sub">' + fmt(c.rataTotal) + ' / mies.</div>'
        + (iB ? '<div class="pkh-diff-bar"><span class="pkh-diff-pill save">Najniższy koszt</span></div>'
          : '<div class="pkh-diff-bar"><span class="pkh-diff-label">vs najlepsza:</span><span class="pkh-diff-pill extra">+' + fmt(diff) + '</span></div>')
        + '</div>';
    });
    html += '</div></div>';
    var sortedPo = sorted.slice().sort(function (a, z) { return a.c.rataPo - z.c.rataPo; });
    var bestRata = sortedPo[0].c.rataPo;
    html += '<div class="pkh-cmp-section"><div class="pkh-cmp-title">Marża i rata po 5 latach (zmienna, WIBOR ' + p.wibor + '%)</div><div class="pkh-cmp-grid">';
    sortedPo.forEach(function (item, i) {
      var b = item.b, c = item.c;
      var iB = i === 0, iW = i === sortedPo.length - 1 && sortedPo.length > 1;
      var diff = c.rataPo - bestRata;
      html += '<div class="pkh-cmp-card ' + (iB ? 'best-c' : iW ? 'worst-c' : '') + '">'
        + '<div class="pkh-cmp-bank"><span class="pkh-dot" style="background:' + b.kolor + ';width:9px;height:9px"></span>' + b.nazwa + '</div>'
        + '<div class="pkh-cmp-val ' + (iB ? 'g' : iW ? 'r' : '') + '">' + fmt(c.rataPo) + '</div>'
        + '<div class="pkh-cmp-sub">Marża ' + b.marzaPo.toFixed(2) + '% + WIBOR = ' + c.oprocPo + '%</div>'
        + (iB ? '<div class="pkh-diff-bar"><span class="pkh-diff-pill save">Najniższa marża</span></div>'
          : '<div class="pkh-diff-bar"><span class="pkh-diff-label">vs najlepsza:</span><span class="pkh-diff-pill extra">+' + fmt(diff) + '/mies.</span></div>')
        + '</div>';
    });
    html += '</div></div>';
    html += '<div class="pkh-cmp-section"><div class="pkh-cmp-title">Szacunkowy koszt całkowity (' + p.okres + ' mies.)</div><div class="pkh-cmp-grid">';
    var bestEst = best5.c.koszty5 + best5.c.rataPo * (p.okres - 60);
    sorted.forEach(function (item, i) {
      var b = item.b, c = item.c;
      var totalEst = c.koszty5 + c.rataPo * (p.okres - 60);
      var diff = totalEst - bestEst;
      var iB = i === 0, iW = i === sorted.length - 1 && sorted.length > 1;
      html += '<div class="pkh-cmp-card ' + (iB ? 'best-c' : iW ? 'worst-c' : '') + '">'
        + '<div class="pkh-cmp-bank"><span class="pkh-dot" style="background:' + b.kolor + ';width:9px;height:9px"></span>' + b.nazwa + '</div>'
        + '<div class="pkh-cmp-val ' + (iB ? 'g' : iW ? 'r' : '') + '">' + fmtK(totalEst) + '</div>'
        + '<div class="pkh-cmp-sub">Szacunkowy koszt całkowity</div>'
        + (iB ? '<div class="pkh-diff-bar"><span class="pkh-diff-pill save">Najtańsza opcja</span></div>'
          : '<div class="pkh-diff-bar"><span class="pkh-diff-label">drożej o:</span><span class="pkh-diff-pill extra">+' + fmtK(diff) + '</span></div>')
        + '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function renderTabela(sorted) {
    if (!sorted.length) return '<div class="pkh-empty">Wybierz co najmniej jeden bank.</div>';
    var html = '<div class="pkh-tbl-wrap"><table><thead><tr>'
      + '<th>Bank</th><th>Rata całk.</th><th>Rata baza</th><th>Ub. życie</th><th>Ub. nieruch.</th>'
      + '<th>Marża 5l</th><th>Marża po 5l</th><th>Oprocent. po 5l</th><th>Koszty 5l</th><th>Rata po 5l</th><th>LTV</th>'
      + '</tr></thead><tbody>';
    sorted.forEach(function (item, i) {
      var b = item.b, c = item.c;
      var iB = i === 0, iW = i === sorted.length - 1 && sorted.length > 1;
      var ubZ = c.ubZycieMies + c.ubZewZycieMies;
      var ubN = c.ubNieruchMies + c.ubZewNieruchMies;
      html += '<tr>'
        + '<td style="font-weight:600"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:' + b.kolor + ';margin-right:6px;vertical-align:middle"></span>' + b.nazwa + '</td>'
        + '<td class="' + (iB ? 'pkh-td-g' : iW ? 'pkh-td-r' : '') + '">' + fmt(c.rataTotal) + '</td>'
        + '<td>' + fmt(c.rataBase) + '</td>'
        + '<td>' + (ubZ > 0 ? fmt(ubZ) : '—') + '</td>'
        + '<td>' + (ubN > 0 ? fmt(ubN) : '—') + '</td>'
        + '<td>' + b.marza5.toFixed(2) + '%</td>'
        + '<td>' + b.marzaPo.toFixed(2) + '%</td>'
        + '<td>' + c.oprocPo + '%</td>'
        + '<td class="' + (iB ? 'pkh-td-g' : iW ? 'pkh-td-r' : '') + '">' + fmt(c.koszty5) + '</td>'
        + '<td>' + fmt(c.rataPo) + '</td>'
        + '<td>' + c.ltv + '%</td>'
        + '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  function renderWykres(sorted) {
    if (!sorted.length) return '<div class="pkh-empty">Wybierz co najmniej jeden bank.</div>';
    var maxR = Math.max.apply(null, sorted.map(function (x) { return x.c.rataTotal; }));
    var maxK = Math.max.apply(null, sorted.map(function (x) { return x.c.koszty5; }));
    var sortedPo = sorted.slice().sort(function (a, z) { return a.c.rataPo - z.c.rataPo; });
    var maxP = Math.max.apply(null, sortedPo.map(function (x) { return x.c.rataPo; }));
    function bars(arr, max, vfn, label) {
      var h = '<div class="pkh-bw"><div class="pkh-bt2">' + label + '</div>';
      arr.forEach(function (item) {
        var b = item.b, v = vfn(item.c), pct = (v / max * 100).toFixed(1);
        h += '<div class="pkh-brow"><div class="pkh-bl">' + b.nazwa + '</div><div class="pkh-btr"><div class="pkh-bf" style="width:' + pct + '%;background:' + b.kolor + '">' + pct + '%</div></div><div class="pkh-bv2">' + fmt(v) + '</div></div>';
      });
      return h + '</div>';
    }
    return bars(sorted, maxR, function (c) { return c.rataTotal; }, 'Rata miesięczna całkowita')
      + bars(sorted, maxK, function (c) { return c.koszty5; }, 'Koszty 5 lat')
      + bars(sortedPo, maxP, function (c) { return c.rataPo; }, 'Rata po 5 latach (marża zmienna + WIBOR)');
  }

  function render() {
    var sorted = getSorted();
    renderSummary(sorted);
    renderEditPanels();
    var el = root.querySelector('#pkh-content');
    if (activeTab === 'karty') el.innerHTML = renderCards(sorted);
    else if (activeTab === '5lat') el.innerHTML = render5lat(sorted);
    else if (activeTab === 'tabela') el.innerHTML = renderTabela(sorted);
    else el.innerHTML = renderWykres(sorted);
  }

  function attachEvents() {
    // bank selector toggles
    root.querySelector('#pkh-bank-selector').addEventListener('change', function (e) {
      var lbl = e.target.closest('.pkh-btog');
      if (!lbl) return;
      var b = findBank(lbl.dataset.bid);
      b.active = e.target.checked;
      lbl.classList.toggle('on', b.active);
      render();
    });
    // edit panels: toggle open
    root.querySelector('#pkh-edit-panels').addEventListener('click', function (e) {
      var head = e.target.closest('.pkh-eph');
      if (!head) return;
      var id = head.dataset.toggle;
      openPanels[id] = !openPanels[id];
      renderEditPanels();
    });
    // edit panels: field updates
    root.querySelector('#pkh-edit-panels').addEventListener('input', function (e) {
      var t = e.target;
      if (!t.dataset || !t.dataset.upd) return;
      var parts = t.dataset.upd.split('|');
      var b = findBank(parts[0]);
      if (!b) return;
      b[parts[1]] = parts[2] === 'bool' ? t.checked : +t.value;
      render();
    });
    // global params
    ['#pkh-kwota', '#pkh-wartosc', '#pkh-okres', '#pkh-wibor', '#pkh-ubzew-zycie', '#pkh-ubzew-nieruch'].forEach(function (sel) {
      var el = root.querySelector(sel);
      if (el) el.addEventListener('input', render);
    });
    // sort
    root.querySelector('#pkh-sort-by').addEventListener('change', render);
    root.querySelector('#pkh-sort-dir').addEventListener('change', render);
    // tabs
    root.querySelector('.pkh-tabs').addEventListener('click', function (e) {
      var btn = e.target.closest('.pkh-tab');
      if (!btn) return;
      activeTab = btn.dataset.tab;
      root.querySelectorAll('.pkh-tab').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === activeTab); });
      render();
    });
  }

  function defaultBanks() {
    return [
      { id: 'erste',      nazwa: 'Erste',      active: true, kolor: COLORS[0], marza5: 5.55, marzaPo: 1.70, ubZycie: 0.035, ubNieruch: 0.090,  rezUbZycie: 0.200, rezUbNieruch: 0.100, kartyKredytowe: true,  rezKarta: 0.100, ubZycieOn: true, ubNieruchOn: true,  ubZewZycieOn: false, ubZewNieruchOn: false },
      { id: 'pekao',      nazwa: 'Pekao SA',   active: true, kolor: COLORS[1], marza5: 6.24, marzaPo: 2.35, ubZycie: 0.036, ubNieruch: 0.100,  rezUbZycie: 0,     rezUbNieruch: 0.100, kartyKredytowe: false, rezKarta: 0,     ubZycieOn: true, ubNieruchOn: true,  ubZewZycieOn: false, ubZewNieruchOn: false },
      { id: 'pko',        nazwa: 'PKO BP',     active: true, kolor: COLORS[2], marza5: 5.81, marzaPo: 1.75, ubZycie: 0.035, ubNieruch: 0.080,  rezUbZycie: 0.200, rezUbNieruch: 0,     kartyKredytowe: false, rezKarta: 0,     ubZycieOn: true, ubNieruchOn: true,  ubZewZycieOn: false, ubZewNieruchOn: false },
      { id: 'ing',        nazwa: 'ING',        active: true, kolor: COLORS[3], marza5: 6.00, marzaPo: 1.70, ubZycie: 0.055, ubNieruch: 0.0096, rezUbZycie: 0.400, rezUbNieruch: 0,     kartyKredytowe: false, rezKarta: 0,     ubZycieOn: true, ubNieruchOn: true,  ubZewZycieOn: false, ubZewNieruchOn: false },
      { id: 'millennium', nazwa: 'Millennium', active: true, kolor: COLORS[4], marza5: 6.45, marzaPo: 2.30, ubZycie: 0.035, ubNieruch: 0.0075, rezUbZycie: 0.200, rezUbNieruch: 0,     kartyKredytowe: false, rezKarta: 0,     ubZycieOn: true, ubNieruchOn: true,  ubZewZycieOn: false, ubZewNieruchOn: false },
      { id: 'mbank',      nazwa: 'mBank',      active: true, kolor: COLORS[5], marza5: 5.55, marzaPo: 1.30, ubZycie: 0.050, ubNieruch: 0,      rezUbZycie: 2.000, rezUbNieruch: 0,     kartyKredytowe: false, rezKarta: 0,     ubZycieOn: true, ubNieruchOn: false, ubZewZycieOn: false, ubZewNieruchOn: false }
    ];
  }

  window.mountPkhWidget = function (mountEl) {
    if (!mountEl) return;
    if (!document.getElementById('pkh-style')) {
      var st = document.createElement('style');
      st.id = 'pkh-style';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    mountEl.id = 'pkh-root';
    mountEl.innerHTML = HTML;
    root = mountEl;
    banks = defaultBanks();
    openPanels = {};
    activeTab = 'karty';
    renderSelector();
    attachEvents();
    render();
  };
})();
