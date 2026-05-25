/* ==========================================================================
   Kalkulator Refinansowania — branded widget
   Brand: navy (#0D2240) + gold (#C9A84C) + cream (#F9F7F2)
   Mount with: window.mountRfWidget(el)
   - "Obecny kredyt" vs "Refinans (bez zmian okresu)" vs "Skrócenie okresu"
   - Generuje treść maila + PDF (jsPDF on demand)
   ========================================================================== */
(function () {
  if (window.__rfDefined) return;
  window.__rfDefined = true;

  var CSS = `
#rf-root *, #rf-root *::before, #rf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
#rf-root {
  font-family: 'DM Sans', 'Inter', system-ui, sans-serif;
  color: #0D2240;
  font-size: 14px;
  line-height: 1.5;
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(201,168,76,0.22);
  box-shadow: 0 24px 56px rgba(13,34,64,0.12);
  padding: 28px 32px;
  --rf-navy: #0D2240;
  --rf-navy-mid: #163459;
  --rf-navy-deep: #081628;
  --rf-gold: #C9A84C;
  --rf-gold-deep: #A8893A;
  --rf-gold-tint: #FBF6E6;
  --rf-cream: #F9F7F2;
  --rf-line: #E4DFD2;
  --rf-line-strong: #C9C2AE;
  --rf-muted: #6E7A8C;
  --rf-soft: #2C3E5C;
  --rf-good: #3B6D11;
  --rf-good-bg: #EAF3DE;
  --rf-bad: #A32D2D;
}
#rf-root .rf-top { padding-bottom: 18px; border-bottom: 0.5px solid var(--rf-line); margin-bottom: 22px; }
#rf-root .rf-eyebrow { font-size: 11px; font-weight: 600; color: var(--rf-gold-deep); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }
#rf-root .rf-top h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 700; color: var(--rf-navy); letter-spacing: -0.01em; line-height: 1.15; }
#rf-root .rf-top p { font-size: 13px; color: var(--rf-muted); margin-top: 6px; line-height: 1.55; }

#rf-root .rf-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
@media(max-width:680px){#rf-root .rf-input-grid{grid-template-columns:1fr;}}
#rf-root .rf-card { background: var(--rf-cream); border: 1px solid var(--rf-line); border-radius: 12px; padding: 18px; }
#rf-root .rf-card-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; color: var(--rf-muted); margin-bottom: 14px; display: flex; align-items: center; gap: 9px; }
#rf-root .rf-badge { width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', Georgia, serif; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
#rf-root .rf-badge-a { background: var(--rf-soft); }
#rf-root .rf-badge-b { background: var(--rf-navy); }
#rf-root .rf-badge-c { background: var(--rf-gold-deep); }

#rf-root .rf-field { margin-bottom: 10px; }
#rf-root .rf-field:last-child { margin-bottom: 0; }
#rf-root .rf-field label { display: block; font-size: 10px; font-weight: 500; color: var(--rf-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
#rf-root .rf-field input {
  width: 100%; padding: 10px 12px; font-size: 15px;
  font-family: inherit; font-variant-numeric: tabular-nums; font-weight: 500;
  border: 1px solid var(--rf-line-strong); border-radius: 8px;
  background: #fff; color: var(--rf-navy); outline: none;
  transition: border-color .15s, box-shadow .15s;
}
#rf-root .rf-field input:focus { border-color: var(--rf-gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
#rf-root .rf-field input::-webkit-inner-spin-button { display: none; }

#rf-root .rf-skroc-card {
  background: var(--rf-gold-tint); border: 1px solid rgba(201,168,76,0.4);
  border-radius: 12px; padding: 14px 18px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}
#rf-root .rf-skroc-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--rf-gold-deep); }
#rf-root .rf-skroc-card input {
  width: 150px; padding: 9px 12px;
  font-family: inherit; font-variant-numeric: tabular-nums;
  font-size: 15px; font-weight: 600;
  border: 1px solid var(--rf-line-strong); border-radius: 8px;
  background: #fff; color: var(--rf-navy); outline: none;
}
#rf-root .rf-skroc-card input:focus { border-color: var(--rf-gold); }
#rf-root .rf-skroc-note { font-size: 12px; color: var(--rf-soft); flex: 1; line-height: 1.55; }

#rf-root .rf-calc-btn {
  display: block; width: 100%; max-width: 340px; margin: 6px auto 24px;
  padding: 16px 22px; font-family: inherit; font-size: 14px; font-weight: 600;
  background: var(--rf-gold); color: var(--rf-navy);
  border: 0; border-radius: 10px; cursor: pointer;
  box-shadow: 0 8px 22px rgba(201,168,76,0.28);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  letter-spacing: 0.01em;
}
#rf-root .rf-calc-btn:hover { background: #E8C97A; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(201,168,76,0.36); }
#rf-root .rf-calc-btn:active { transform: translateY(0); background: var(--rf-gold-deep); }

#rf-root .rf-result { display: none; }
#rf-root .rf-result.visible { display: block; }

#rf-root .rf-section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; color: var(--rf-gold-deep); margin-bottom: 12px; }

#rf-root .rf-scen-overview { margin-bottom: 22px; overflow-x: auto; border: 1px solid var(--rf-line); border-radius: 12px; }
#rf-root table.rf-scen-table { width: 100%; border-collapse: collapse; font-size: 13px; }
#rf-root table.rf-scen-table thead th {
  padding: 13px 16px; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em; text-align: left;
  white-space: nowrap; border: 0; line-height: 1.4; color: #fff;
}
#rf-root table.rf-scen-table thead th.rf-th-lbl { background: var(--rf-cream); color: var(--rf-muted); }
#rf-root table.rf-scen-table thead th.rf-th-a { background: var(--rf-soft); }
#rf-root table.rf-scen-table thead th.rf-th-b { background: var(--rf-navy); }
#rf-root table.rf-scen-table thead th.rf-th-c { background: var(--rf-gold-deep); }
#rf-root table.rf-scen-table thead th .rf-badge-tag {
  background: rgba(255,255,255,0.18); border-radius: 999px;
  padding: 2px 9px; font-size: 10px; margin-left: 7px;
  letter-spacing: 0.04em; font-variant-numeric: tabular-nums;
}
#rf-root table.rf-scen-table tbody td {
  padding: 11px 16px; border-bottom: 1px solid var(--rf-line);
  font-size: 13px; vertical-align: middle; line-height: 1.4;
}
#rf-root table.rf-scen-table tbody td:first-child {
  font-size: 11px; color: var(--rf-muted); font-weight: 500;
  background: var(--rf-cream); white-space: nowrap; width: 150px;
  text-transform: uppercase; letter-spacing: 0.06em;
}
#rf-root table.rf-scen-table tbody td.rf-td-a { background: #fff; font-variant-numeric: tabular-nums; }
#rf-root table.rf-scen-table tbody td.rf-td-b { background: #F2F4F8; font-variant-numeric: tabular-nums; }
#rf-root table.rf-scen-table tbody td.rf-td-c { background: #FBF6E6; font-variant-numeric: tabular-nums; }
#rf-root table.rf-scen-table tbody tr:last-child td { border-bottom: 0; }
#rf-root table.rf-scen-table tbody tr.rf-tr-footer td {
  padding: 18px 16px; font-size: 11px; color: var(--rf-muted);
  border-top: 2px solid var(--rf-line-strong);
  text-transform: uppercase; letter-spacing: 0.06em;
}
#rf-root table.rf-scen-table tbody tr.rf-tr-footer td.rf-td-b { background: #E6ECF5; }
#rf-root table.rf-scen-table tbody tr.rf-tr-footer td.rf-td-c { background: var(--rf-gold-tint); }

#rf-root .rf-big-val {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px; font-weight: 700; display: block; margin-top: 4px;
  font-variant-numeric: tabular-nums; letter-spacing: -0.01em;
  color: var(--rf-navy);
}
#rf-root .rf-big-val.rf-green { color: var(--rf-good); }
#rf-root .rf-big-val.rf-purple { color: var(--rf-gold-deep); }
#rf-root .rf-c-green { color: var(--rf-good); font-weight: 700; }
#rf-root .rf-c-purple { color: var(--rf-gold-deep); font-weight: 700; }
#rf-root .rf-c-red { color: var(--rf-bad); }

#rf-root .rf-dual-savings { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; }
@media(max-width:560px){#rf-root .rf-dual-savings{grid-template-columns:1fr;}}
#rf-root .rf-sav-box {
  border-radius: 12px; padding: 16px 20px;
  display: flex; align-items: center; gap: 14px;
  border: 1px solid;
}
#rf-root .rf-sav-box.rf-blue-sav { background: #F2F4F8; border-color: rgba(13,34,64,0.18); }
#rf-root .rf-sav-box.rf-purple-sav { background: var(--rf-gold-tint); border-color: rgba(201,168,76,0.35); }
#rf-root .rf-sav-ico {
  font-family: 'Playfair Display', Georgia, serif;
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 700; color: #fff; flex-shrink: 0;
}
#rf-root .rf-sav-box.rf-blue-sav .rf-sav-ico { background: var(--rf-navy); }
#rf-root .rf-sav-box.rf-purple-sav .rf-sav-ico { background: var(--rf-gold-deep); }
#rf-root .rf-sav-main { flex: 1; min-width: 0; }
#rf-root .rf-sav-main .rf-sv {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px; font-weight: 700; line-height: 1.1;
  font-variant-numeric: tabular-nums; letter-spacing: -0.01em;
}
#rf-root .rf-sav-box.rf-blue-sav .rf-sv { color: var(--rf-navy); }
#rf-root .rf-sav-box.rf-purple-sav .rf-sv { color: var(--rf-gold-deep); }
#rf-root .rf-sav-main .rf-sl { font-size: 11px; color: var(--rf-muted); margin-top: 4px; line-height: 1.45; }
#rf-root .rf-sav-badge {
  padding: 4px 11px; border-radius: 999px; font-size: 10px;
  font-weight: 600; color: #fff; letter-spacing: 0.04em;
  white-space: nowrap; flex-shrink: 0;
}
#rf-root .rf-sav-box.rf-blue-sav .rf-sav-badge { background: var(--rf-navy); }
#rf-root .rf-sav-box.rf-purple-sav .rf-sav-badge { background: var(--rf-gold-deep); }

#rf-root .rf-payback-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 22px; }
@media(max-width:560px){#rf-root .rf-payback-row{grid-template-columns:1fr;}}
#rf-root .rf-payback-box {
  background: #FFF7E6; border: 1px solid #F2D88B;
  border-radius: 10px; padding: 12px 16px;
  font-size: 12px; color: #7A6224; line-height: 1.55;
}
#rf-root .rf-payback-box strong { display: block; font-size: 12px; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.06em; }
#rf-root .rf-payback-box em { font-style: normal; font-weight: 700; color: var(--rf-navy); font-variant-numeric: tabular-nums; }

#rf-root .rf-cmp-wrap { overflow-x: auto; margin-bottom: 24px; border: 1px solid var(--rf-line); border-radius: 12px; }
#rf-root .rf-cmp-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 600px; }
#rf-root .rf-cmp-table th {
  padding: 11px 14px; background: var(--rf-cream);
  border-bottom: 1px solid var(--rf-line); font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--rf-muted);
  white-space: nowrap;
}
#rf-root .rf-cmp-table th:first-child { text-align: left; }
#rf-root .rf-cmp-table th:not(:first-child) { text-align: right; }
#rf-root .rf-cmp-table td {
  padding: 10px 14px; border-bottom: 1px solid rgba(228,223,210,0.6);
  white-space: nowrap; color: var(--rf-navy);
}
#rf-root .rf-cmp-table tbody tr:last-child td { border-bottom: 0; }
#rf-root .rf-cmp-table td:first-child { color: var(--rf-muted); font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
#rf-root .rf-cmp-table td:not(:first-child) { text-align: right; font-variant-numeric: tabular-nums; font-weight: 500; }
#rf-root .rf-cmp-table .rf-hl-blue td { background: #F2F4F8; }
#rf-root .rf-cmp-table .rf-hl-purple td { background: var(--rf-gold-tint); }
#rf-root .rf-cmp-table .rf-c-blue { color: var(--rf-navy) !important; font-weight: 700 !important; }
#rf-root .rf-cmp-table .rf-row-label { color: var(--rf-muted); font-weight: 500; }

#rf-root .rf-pdf-section {
  background: #fff; border: 1px solid var(--rf-line);
  border-radius: 12px; padding: 24px; margin-top: 8px;
}
#rf-root .rf-pdf-section h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px; font-weight: 700; color: var(--rf-navy);
  margin-bottom: 16px; display: flex; align-items: center; gap: 9px;
  letter-spacing: -0.005em;
}
#rf-root .rf-pdf-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
@media(max-width:560px){#rf-root .rf-pdf-fields{grid-template-columns:1fr;}}
#rf-root .rf-pdf-field label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: var(--rf-muted); margin-bottom: 5px; display: block; }
#rf-root .rf-pdf-field input, #rf-root .rf-pdf-field textarea {
  width: 100%; padding: 9px 12px; font-family: inherit; font-size: 13px;
  border: 1px solid var(--rf-line-strong); border-radius: 8px;
  background: #fff; color: var(--rf-navy); outline: none; resize: vertical;
  transition: border-color 0.15s, box-shadow 0.15s;
}
#rf-root .rf-pdf-field input:focus, #rf-root .rf-pdf-field textarea:focus { border-color: var(--rf-gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
#rf-root .rf-pdf-field.rf-wide { grid-column: 1 / -1; }
#rf-root .rf-chk-wide {
  display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
  background: var(--rf-cream); border: 1px solid var(--rf-line);
  border-radius: 8px; padding: 11px 14px; margin-top: 2px;
  font-size: 13px; line-height: 1.5;
}
#rf-root .rf-chk-wide input[type=checkbox] { width: 16px; height: 16px; accent-color: var(--rf-gold); cursor: pointer; flex-shrink: 0; margin-top: 1px; }
#rf-root .rf-chk-wide strong { color: var(--rf-gold-deep); }

#rf-root .rf-pdf-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
#rf-root .rf-pdf-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 20px; border: 0; border-radius: 8px;
  font-family: inherit; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.15s; letter-spacing: 0.01em;
}
#rf-root .rf-pdf-btn-primary { background: var(--rf-navy); color: #fff; }
#rf-root .rf-pdf-btn-primary:hover { background: var(--rf-navy-mid); }
#rf-root .rf-pdf-btn-blue { background: #fff; color: var(--rf-navy); border: 1px solid var(--rf-line-strong); }
#rf-root .rf-pdf-btn-blue:hover { border-color: var(--rf-gold); color: var(--rf-gold-deep); }

#rf-root .rf-modal-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(13,34,64,0.6); backdrop-filter: blur(4px);
  z-index: 99999; padding: 28px 16px; overflow-y: auto;
}
#rf-root .rf-modal-overlay.open { display: flex; align-items: flex-start; justify-content: center; }
#rf-root .rf-modal {
  background: #fff; border-radius: 14px; width: 100%; max-width: 700px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.3); overflow: hidden;
  border: 1px solid var(--rf-line);
}
#rf-root .rf-modal-head {
  padding: 16px 22px; border-bottom: 1px solid var(--rf-line);
  display: flex; align-items: center; justify-content: space-between;
  background: var(--rf-cream);
}
#rf-root .rf-modal-head h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 17px; font-weight: 700; color: var(--rf-navy); margin: 0; }
#rf-root .rf-modal-close {
  width: 32px; height: 32px; border: 0; background: #fff;
  border: 1px solid var(--rf-line-strong); border-radius: 8px;
  cursor: pointer; font-size: 15px; color: var(--rf-muted);
  display: flex; align-items: center; justify-content: center;
}
#rf-root .rf-modal-close:hover { color: var(--rf-bad); border-color: #F1C7C7; }
#rf-root .rf-modal-body { padding: 22px; max-height: calc(100vh - 220px); overflow-y: auto; }
#rf-root .rf-email-preview {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 12px; line-height: 1.7; color: var(--rf-navy);
  background: var(--rf-cream); border: 1px solid var(--rf-line);
  border-radius: 8px; padding: 18px; white-space: pre-wrap;
  max-height: 480px; overflow-y: auto;
}
#rf-root .rf-modal-foot {
  padding: 14px 22px; border-top: 1px solid var(--rf-line);
  display: flex; gap: 10px; justify-content: flex-end; background: var(--rf-cream);
}
@media(max-width:600px){
  #rf-root { padding: 22px 18px; border-radius: 14px; }
  #rf-root .rf-top h3 { font-size: 22px; }
}
`;

  var HTML = ''
    + '<div class="rf-top">'
    +   '<div class="rf-eyebrow">Kalkulator refinansowania</div>'
    +   '<h3>Sprawdź, czy zmiana banku Ci się opłaca</h3>'
    +   '<p>Trzy scenariusze obok siebie: obecny kredyt, refinans na ten sam okres, refinans ze skróceniem okresu. Możesz wygenerować gotowy e-mail dla klienta i PDF z porównaniem.</p>'
    + '</div>'

    + '<div class="rf-input-grid">'
    +   '<div class="rf-card">'
    +     '<div class="rf-card-title"><span class="rf-badge rf-badge-a">A</span> Obecny kredyt</div>'
    +     '<div class="rf-field"><label>Kwota pozostała (PLN)</label><input id="rf-a-principal" type="number" step="1000" value="300000"></div>'
    +     '<div class="rf-field"><label>Pozostały okres (miesiące)</label><input id="rf-a-months" type="number" value="240"></div>'
    +     '<div class="rf-field"><label>Oprocentowanie roczne (%)</label><input id="rf-a-rate" type="number" step="0.01" value="6.5"></div>'
    +   '</div>'
    +   '<div class="rf-card">'
    +     '<div class="rf-card-title"><span class="rf-badge rf-badge-b">B</span> Nowy kredyt (refinans)</div>'
    +     '<div class="rf-field"><label>Kwota refinansowania (PLN)</label><input id="rf-b-principal" type="number" step="1000" value="300000"></div>'
    +     '<div class="rf-field"><label>Oprocentowanie roczne (%)</label><input id="rf-b-rate" type="number" step="0.01" value="4.2"></div>'
    +     '<div class="rf-field"><label>Koszt refinansowania (PLN)</label><input id="rf-b-cost" type="number" step="100" value="3000"></div>'
    +   '</div>'
    + '</div>'

    + '<div class="rf-skroc-card">'
    +   '<span class="rf-badge rf-badge-c">C</span>'
    +   '<span class="rf-skroc-label">Opcja skrócenia okresu (mies.)</span>'
    +   '<input id="rf-b-months-shorter" type="number" value="180" min="12">'
    +   '<span class="rf-skroc-note">Podaj nowy, krótszy okres — porównamy oba warianty refinansu obok siebie.</span>'
    + '</div>'

    + '<button class="rf-calc-btn" id="rf-calc-btn">Oblicz porównanie</button>'

    + '<div class="rf-result" id="rf-result">'
    +   '<div class="rf-section-label">Porównanie trzech scenariuszy</div>'
    +   '<div class="rf-scen-overview" id="rf-scen-overview"></div>'
    +   '<div class="rf-dual-savings" id="rf-dual-savings"></div>'
    +   '<div class="rf-payback-row" id="rf-payback-row"></div>'
    +   '<div class="rf-section-label">Szczegółowa tabela</div>'
    +   '<div class="rf-cmp-wrap"><table class="rf-cmp-table" id="rf-cmp-table"></table></div>'

    +   '<div class="rf-pdf-section">'
    +     '<h4>Wygeneruj wiadomość dla klienta</h4>'
    +     '<div class="rf-pdf-fields">'
    +       '<div class="rf-pdf-field"><label>Imię i nazwisko klienta</label><input id="rf-pdf-klient" type="text" placeholder="Jan Kowalski"></div>'
    +       '<div class="rf-pdf-field"><label>Doradca</label><input id="rf-pdf-doradca" type="text" value="Łukasz Wojda"></div>'
    +       '<div class="rf-pdf-field"><label>Telefon doradcy</label><input id="rf-pdf-tel" type="text" value="+48 509 361 982"></div>'
    +       '<div class="rf-pdf-field"><label>Email doradcy</label><input id="rf-pdf-email" type="text" value="kontakt@sprawdzonyekspertkredytowy.pl"></div>'
    +       '<div class="rf-pdf-field rf-wide"><label>Komentarz / następny krok</label><textarea id="rf-pdf-koment" rows="2" placeholder="Oferta ważna do … / Proszę o przesłanie dokumentów …"></textarea></div>'
    +       '<div class="rf-pdf-field rf-wide">'
    +         '<label class="rf-chk-wide">'
    +           '<input type="checkbox" id="rf-chk-show-c" checked>'
    +           '<span>Uwzględnij w wiadomości i&nbsp;PDF <strong>opcję skrócenia okresu</strong> (Opcja 2)</span>'
    +         '</label>'
    +       '</div>'
    +     '</div>'
    +     '<div class="rf-pdf-btn-row">'
    +       '<button class="rf-pdf-btn rf-pdf-btn-blue" id="rf-preview-btn">Podgląd wiadomości</button>'
    +       '<button class="rf-pdf-btn rf-pdf-btn-primary" id="rf-pdf-btn">Pobierz PDF</button>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    + '<div class="rf-modal-overlay" id="rf-modal">'
    +   '<div class="rf-modal">'
    +     '<div class="rf-modal-head">'
    +       '<h3>Podgląd wiadomości email</h3>'
    +       '<button class="rf-modal-close" id="rf-modal-close" aria-label="Zamknij">&#x2715;</button>'
    +     '</div>'
    +     '<div class="rf-modal-body"><div class="rf-email-preview" id="rf-email-preview"></div></div>'
    +     '<div class="rf-modal-foot">'
    +       '<button class="rf-pdf-btn rf-pdf-btn-blue" id="rf-copy-btn">Kopiuj treść</button>'
    +       '<button class="rf-pdf-btn rf-pdf-btn-primary" id="rf-pdf-btn-2">Pobierz PDF</button>'
    +     '</div>'
    +   '</div>'
    + '</div>';

  var rfLastResult = null;
  var root;
  var jsPdfPromise = null;

  function rfFmt(n) { return Number(n).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function rfFi(n) { return Math.round(n).toLocaleString('pl-PL'); }
  function rfSchedule(principal, months, annualRate) {
    var r = annualRate / 100 / 12, bal = principal;
    var pmt = r === 0 ? principal / months : principal * r / (1 - Math.pow(1 + r, -months));
    var ti = 0, tp = 0;
    for (var m = 1; m <= months; m++) {
      var interest = bal * r, pp = pmt - interest;
      if (m === months) { pp = bal; pmt = interest + pp; }
      bal -= pp; if (bal < 0.01) bal = 0;
      ti += interest; tp += pmt;
    }
    return { pmt: pmt, ti: ti, tp: tp };
  }
  function $(id) { return root.querySelector(id); }
  function rfShowC() { return $('#rf-chk-show-c').checked; }

  function rfCalculate() {
    var aP = parseFloat($('#rf-a-principal').value);
    var aM = parseInt($('#rf-a-months').value);
    var aR = parseFloat($('#rf-a-rate').value);
    var bP = parseFloat($('#rf-b-principal').value);
    var bR = parseFloat($('#rf-b-rate').value);
    var bCost = parseFloat($('#rf-b-cost').value) || 0;
    var cM = parseInt($('#rf-b-months-shorter').value);
    if (!aP || !aM || isNaN(aR) || !bP || isNaN(bR) || !cM) { alert('Wypełnij wszystkie pola.'); return; }
    var A = rfSchedule(aP, aM, aR);
    var B = rfSchedule(bP, aM, bR);
    var C = rfSchedule(bP, cM, bR);
    var diffB = { rata: A.pmt - B.pmt, int: A.ti - B.ti, real: A.tp - (B.tp + bCost) };
    var diffC = { rata: A.pmt - C.pmt, int: A.ti - C.ti, real: A.tp - (C.tp + bCost) };
    var pbB = diffB.rata > 0 ? Math.ceil(bCost / diffB.rata) : null;
    var pbC = diffC.rata > 0 ? Math.ceil(bCost / diffC.rata) : null;
    rfLastResult = { A: A, B: B, C: C, aP: aP, aM: aM, aR: aR, bP: bP, bM: aM, cM: cM, bR: bR, bCost: bCost, diffB: diffB, diffC: diffC, pbB: pbB, pbC: pbC };
    rfRenderResults(rfLastResult);
    $('#rf-result').classList.add('visible');
    setTimeout(function () { $('#rf-result').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
  }

  function rfRenderResults(r) {
    var tbl = '<table class="rf-scen-table">';
    tbl += '<thead><tr>'
      + '<th class="rf-th-lbl"></th>'
      + '<th class="rf-th-a">Obecny kredyt</th>'
      + '<th class="rf-th-b">Refinans — bez zmian okresu<span class="rf-badge-tag">' + r.bM + ' mies.</span></th>'
      + '<th class="rf-th-c">Refinans — skrócenie<span class="rf-badge-tag">' + r.cM + ' mies.</span></th>'
      + '</tr></thead><tbody>';
    function tr(label, a, b, c) {
      return '<tr><td>' + label + '</td><td class="rf-td-a">' + a + '</td><td class="rf-td-b">' + b + '</td><td class="rf-td-c">' + c + '</td></tr>';
    }
    tbl += tr('Kwota', rfFi(r.aP) + ' zł', rfFi(r.bP) + ' zł', rfFi(r.bP) + ' zł');
    tbl += tr('Oprocentowanie', r.aR.toFixed(2) + '%', r.bR.toFixed(2) + '%', r.bR.toFixed(2) + '%');
    tbl += '<tr><td>Okres</td><td class="rf-td-a">' + r.aM + ' mies.</td><td class="rf-td-b">' + r.bM + ' mies.</td><td class="rf-td-c"><span class="rf-c-purple">' + r.cM + ' mies. (\u22122' + (r.aM - r.cM) + ')</span></td></tr>';
    tbl += '<tr><td>Rata miesięczna</td><td class="rf-td-a">' + rfFmt(r.A.pmt) + ' zł</td><td class="rf-td-b"><span class="rf-c-green">' + rfFmt(r.B.pmt) + ' zł</span></td><td class="rf-td-c">' + (r.C.pmt < r.A.pmt ? '<span class="rf-c-green">' : '') + rfFmt(r.C.pmt) + ' zł' + (r.C.pmt < r.A.pmt ? '</span>' : '') + '</td></tr>';
    tbl += '<tr><td>Suma odsetek</td><td class="rf-td-a"><span class="rf-c-red">' + rfFmt(r.A.ti) + ' zł</span></td><td class="rf-td-b"><span class="rf-c-green">' + rfFmt(r.B.ti) + ' zł</span></td><td class="rf-td-c"><span class="rf-c-purple">' + rfFmt(r.C.ti) + ' zł</span></td></tr>';
    tbl += tr('Suma rat', rfFmt(r.A.tp) + ' zł', rfFmt(r.B.tp) + ' zł', rfFmt(r.C.tp) + ' zł');
    tbl += tr('Koszt refinansu', '—', rfFmt(r.bCost) + ' zł', rfFmt(r.bCost) + ' zł');
    tbl += '<tr class="rf-tr-footer">'
      + '<td>Rzeczywista oszczędność</td>'
      + '<td class="rf-td-a">—</td>'
      + '<td class="rf-td-b"><span class="rf-big-val rf-green">' + rfFmt(r.diffB.real) + ' zł</span></td>'
      + '<td class="rf-td-c"><span class="rf-big-val rf-purple">' + rfFmt(r.diffC.real) + ' zł</span></td>'
      + '</tr>';
    tbl += '</tbody></table>';
    $('#rf-scen-overview').innerHTML = tbl;

    $('#rf-dual-savings').innerHTML =
      '<div class="rf-sav-box rf-blue-sav"><div class="rf-sav-ico">zł</div>'
      + '<div class="rf-sav-main"><div class="rf-sv">' + rfFmt(r.diffB.real) + ' zł</div>'
      + '<div class="rf-sl">Oszczędność — okres bez zmian<br>Różnica raty: \u22122' + rfFmt(r.diffB.rata) + ' zł/mies.</div></div>'
      + (r.pbB ? '<div class="rf-sav-badge">zwrot po ' + r.pbB + ' mies.</div>' : '')
      + '</div>'
      + '<div class="rf-sav-box rf-purple-sav"><div class="rf-sav-ico">\u23F1</div>'
      + '<div class="rf-sav-main"><div class="rf-sv">' + rfFmt(r.diffC.real) + ' zł</div>'
      + '<div class="rf-sl">Oszczędność — skrócenie do ' + r.cM + ' mies.<br>Skrócenie o ' + (r.aM - r.cM) + ' mies. (' + Math.round((r.aM - r.cM) / 12) + ' lat)</div></div>'
      + (r.pbC ? '<div class="rf-sav-badge">zwrot po ' + r.pbC + ' mies.</div>' : '')
      + '</div>';

    var pbHtml = '';
    if (r.pbB && r.bCost > 0) { var lB = Math.floor(r.pbB / 12), mB = r.pbB % 12; pbHtml += '<div class="rf-payback-box"><strong>Próg opłacalności — bez zmian okresu</strong>Koszt ' + rfFmt(r.bCost) + ' zł zwróci się po <em>' + r.pbB + ' mies.' + (lB > 0 ? ' (' + lB + ' l.' + (mB ? ' ' + mB + ' m.' : '') + ')' : '') + '</em></div>'; } else pbHtml += '<div></div>';
    if (r.pbC && r.bCost > 0) { var lC = Math.floor(r.pbC / 12), mC = r.pbC % 12; pbHtml += '<div class="rf-payback-box"><strong>Próg opłacalności — skrócenie okresu</strong>Koszt ' + rfFmt(r.bCost) + ' zł zwróci się po <em>' + r.pbC + ' mies.' + (lC > 0 ? ' (' + lC + ' l.' + (mC ? ' ' + mC + ' m.' : '') + ')' : '') + '</em></div>'; } else pbHtml += '<div></div>';
    $('#rf-payback-row').innerHTML = pbHtml;

    function dv(val, cls) { return '<td class="' + (val > 0 ? cls : 'rf-c-red') + '">' + (val >= 0 ? '\u22122' : '+') + rfFmt(Math.abs(val)) + ' zł</td>'; }
    var tH = '<thead><tr><th>Parametr</th><th>Obecny kredyt</th><th>Bez zmian okresu</th><th>Różnica B</th><th>Skrócenie (' + r.cM + ' mies.)</th><th>Różnica C</th></tr></thead><tbody>';
    var rows = [
      ['Rata miesięczna', rfFmt(r.A.pmt) + ' zł', rfFmt(r.B.pmt) + ' zł', r.diffB.rata, rfFmt(r.C.pmt) + ' zł', r.diffC.rata],
      ['Okres', '' + r.aM + ' mies.', '' + r.bM + ' mies.', '', '' + r.cM + ' mies. (\u22122' + (r.aM - r.cM) + ')', ''],
      ['Oprocentowanie', '' + r.aR.toFixed(2) + '%', '' + r.bR.toFixed(2) + '%', '', '' + r.bR.toFixed(2) + '%', ''],
      ['Suma odsetek', rfFmt(r.A.ti) + ' zł', rfFmt(r.B.ti) + ' zł', r.diffB.int, rfFmt(r.C.ti) + ' zł', r.diffC.int],
      ['Suma wszystkich rat', rfFmt(r.A.tp) + ' zł', rfFmt(r.B.tp) + ' zł', '', rfFmt(r.C.tp) + ' zł', ''],
      ['Koszt refinansowania', '—', rfFmt(r.bCost) + ' zł', '', rfFmt(r.bCost) + ' zł', '']
    ];
    rows.forEach(function (row) {
      tH += '<tr><td class="rf-row-label">' + row[0] + '</td><td>' + row[1] + '</td><td class="rf-c-blue">' + row[2] + '</td>';
      if (row[3] !== '') tH += dv(row[3], 'rf-c-green'); else tH += '<td>' + row[3] + '</td>';
      tH += '<td class="rf-c-purple">' + row[4] + '</td>';
      if (row[5] !== '') tH += dv(row[5], 'rf-c-green'); else tH += '<td>' + row[5] + '</td>';
      tH += '</tr>';
    });
    tH += '<tr class="rf-hl-blue"><td><strong>Rzeczywista oszczędność — bez zmian</strong></td><td></td><td></td><td class="rf-c-green"><strong>' + rfFmt(r.diffB.real) + ' zł</strong></td><td></td><td></td></tr>';
    tH += '<tr class="rf-hl-purple"><td><strong>Rzeczywista oszczędność — skrócenie</strong></td><td></td><td></td><td></td><td></td><td class="rf-c-purple"><strong>' + rfFmt(r.diffC.real) + ' zł</strong></td></tr>';
    tH += '</tbody>';
    $('#rf-cmp-table').innerHTML = tH;
  }

  function rfBuildEmailText() {
    if (!rfLastResult) return '';
    var r = rfLastResult;
    var klient = $('#rf-pdf-klient').value || 'Szanowny Kliencie';
    var doradca = $('#rf-pdf-doradca').value || '';
    var tel = $('#rf-pdf-tel').value || '';
    var emailVal = $('#rf-pdf-email').value || '';
    var koment = $('#rf-pdf-koment').value || '';
    var today = new Date();
    var ds = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    var withC = rfShowC();
    var t = '';
    t += 'Dzień dobry ' + klient + ',\n\n';
    t += 'Przygotowałem dla Państwa analizę refinansowania kredytu hipotecznego.\n';
    t += (withC ? 'Poniżej dwie opcje — mogą Państwo wybrać tę, która lepiej odpowiada Państwa celom.' : 'Poniżej zestawienie obecnego kredytu i opcji refinansowania.') + '\n\n';
    t += '════════════════════════════════════════\n';
    t += 'ANALIZA REFINANSOWANIA — ' + ds + '\n';
    t += '════════════════════════════════════════\n\n';
    t += 'OBECNY KREDYT\n';
    t += '  Kwota pozostała:      ' + rfFi(r.aP) + ' zł\n';
    t += '  Oprocentowanie:       ' + r.aR.toFixed(2) + '%\n';
    t += '  Okres:                ' + r.aM + ' mies. (' + Math.round(r.aM / 12) + ' lat)\n';
    t += '  Rata miesięczna:      ' + rfFmt(r.A.pmt) + ' zł\n';
    t += '  Suma odsetek:         ' + rfFmt(r.A.ti) + ' zł\n\n';
    t += '────────────────────────────────────────\n';
    t += (withC ? 'OPCJA 1 — ' : '') + 'REFINANS, OKRES BEZ ZMIAN (' + r.bM + ' mies.)\n';
    t += '────────────────────────────────────────\n';
    t += '  Kwota:                ' + rfFi(r.bP) + ' zł\n';
    t += '  Oprocentowanie:       ' + r.bR.toFixed(2) + '%\n';
    t += '  Okres:                ' + r.bM + ' mies. — bez zmian\n';
    t += '  Nowa rata:            ' + rfFmt(r.B.pmt) + ' zł\n';
    t += '  Zmiana raty:          −' + rfFmt(r.diffB.rata) + ' zł/mies.\n';
    t += '  Suma odsetek:         ' + rfFmt(r.B.ti) + ' zł\n';
    t += '  Oszczędność odsetek:  ' + rfFmt(r.diffB.int) + ' zł\n';
    t += '  Koszt refinansowania: ' + rfFmt(r.bCost) + ' zł\n';
    t += '  ▶ Rzeczywista oszczędność: ' + rfFmt(r.diffB.real) + ' zł\n\n';
    if (withC) {
      t += '────────────────────────────────────────\n';
      t += 'OPCJA 2 — REFINANS ZE SKRÓCENIEM (' + r.cM + ' mies.)\n';
      t += '────────────────────────────────────────\n';
      t += '  Kwota:                ' + rfFi(r.bP) + ' zł\n';
      t += '  Oprocentowanie:       ' + r.bR.toFixed(2) + '%\n';
      t += '  Nowy okres:           ' + r.cM + ' mies. (skrócenie o ' + (r.aM - r.cM) + ' mies.)\n';
      t += '  Nowa rata:            ' + rfFmt(r.C.pmt) + ' zł\n';
      t += '  Skrócenie okresu:     −' + (r.aM - r.cM) + ' mies. (' + Math.round((r.aM - r.cM) / 12) + ' lat)\n';
      t += '  Suma odsetek:         ' + rfFmt(r.C.ti) + ' zł\n';
      t += '  Oszczędność odsetek:  ' + rfFmt(r.diffC.int) + ' zł\n';
      t += '  Koszt refinansowania: ' + rfFmt(r.bCost) + ' zł\n';
      t += '  ▶ Rzeczywista oszczędność: ' + rfFmt(r.diffC.real) + ' zł\n\n';
    }
    if (koment) { t += '════════════════════════════════════════\nUWAGI I NASTĘPNE KROKI\n' + koment + '\n\n'; }
    t += '════════════════════════════════════════\n';
    t += 'W razie pytań jestem do dyspozycji.\n\nPozdrawiam,\n' + (doradca || '');
    if (tel) t += '\n' + tel;
    if (emailVal) t += '\n' + emailVal;
    t += '\n\n(Dane mają charakter informacyjny i nie stanowią oferty w rozumieniu KC.)';
    return t;
  }

  function rfPreviewEmail() {
    if (!rfLastResult) { alert('Najpierw oblicz porównanie.'); return; }
    $('#rf-email-preview').textContent = rfBuildEmailText();
    $('#rf-modal').classList.add('open');
  }
  function rfCopyEmail() {
    var txt = $('#rf-email-preview').textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(function () { alert('Treść skopiowana do schowka.'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); alert('Treść skopiowana do schowka.'); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  function loadJsPdf() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
    if (jsPdfPromise) return jsPdfPromise;
    jsPdfPromise = new Promise(function (resolve, reject) {
      var s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s1.onload = function () {
        var s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
        s2.onload = resolve;
        s2.onerror = reject;
        document.head.appendChild(s2);
      };
      s1.onerror = reject;
      document.head.appendChild(s1);
    });
    return jsPdfPromise;
  }

  function rfGeneratePDF() {
    if (!rfLastResult) { alert('Najpierw oblicz porównanie.'); return; }
    loadJsPdf().then(function () {
      _doPdf();
    }).catch(function () {
      alert('Nie udało się załadować biblioteki PDF. Sprawdź połączenie z internetem.');
    });
  }
  function _doPdf() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    var r = rfLastResult;
    var W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    var klient = $('#rf-pdf-klient').value || '';
    var doradca = $('#rf-pdf-doradca').value || '';
    var tel = $('#rf-pdf-tel').value || '';
    var emailVal = $('#rf-pdf-email').value || '';
    var koment = $('#rf-pdf-koment').value || '';
    var withC = rfShowC();
    var today = new Date();
    var ds = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    function f(n) { return Number(n).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    function fi2(n) { return Math.round(n).toLocaleString('pl-PL'); }

    // header — navy bar
    doc.setFillColor(13, 34, 64); doc.rect(0, 0, W, 16, 'F');
    // gold accent stripe
    doc.setFillColor(201, 168, 76); doc.rect(0, 16, W, 0.8, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('Analiza refinansowania kredytu' + (withC ? ' — dwie opcje' : ''), 10, 10);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.setTextColor(201, 168, 76); doc.text('Sprawdzony Ekspert Kredytowy', W - 10, 5.5, { align: 'right' });
    doc.setTextColor(220, 220, 220); doc.text(ds, W - 10, 11.5, { align: 'right' });

    var y = 24;
    if (klient || doradca) {
      var bh = (klient && doradca ? 14 : 9);
      doc.setFillColor(249, 247, 242); doc.roundedRect(8, y, W - 16, bh, 2, 2, 'F');
      if (klient) { doc.setTextColor(110, 122, 140); doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.text('Klient:', 12, y + 5); doc.setFont('helvetica', 'normal'); doc.setTextColor(13, 34, 64); doc.text(klient, 30, y + 5); }
      if (doradca) { var dy = klient ? y + 10 : y + 5; doc.setTextColor(110, 122, 140); doc.setFont('helvetica', 'bold'); doc.text('Doradca:', 12, dy); doc.setFont('helvetica', 'normal'); doc.setTextColor(13, 34, 64); doc.text(doradca + (tel ? '  |  ' + tel : '') + (emailVal ? '  |  ' + emailVal : ''), 30, dy); }
      y += bh + 6;
    }

    var colLabels = ['Parametr', 'Obecny kredyt'];
    colLabels.push((withC ? 'Opcja 1 — ' : '') + 'bez zmian (' + r.bM + ' m.)');
    if (withC) colLabels.push('Opcja 2 — skrócenie (' + r.cM + ' m.)');
    var cardRowsFull = [
      ['Kwota', fi2(r.aP) + ' zl', fi2(r.bP) + ' zl', fi2(r.bP) + ' zl'],
      ['Oprocentowanie', r.aR.toFixed(2) + '%', r.bR.toFixed(2) + '%', r.bR.toFixed(2) + '%'],
      ['Okres', r.aM + ' mies.', r.bM + ' mies.', r.cM + ' mies. (-' + (r.aM - r.cM) + ')'],
      ['Rata', f(r.A.pmt) + ' zl', f(r.B.pmt) + ' zl', f(r.C.pmt) + ' zl'],
      ['Suma odsetek', f(r.A.ti) + ' zl', f(r.B.ti) + ' zl', f(r.C.ti) + ' zl'],
      ['Koszt refinansu', '—', f(r.bCost) + ' zl', f(r.bCost) + ' zl'],
      ['Oszczednosc', '—', f(r.diffB.real) + ' zl', f(r.diffC.real) + ' zl']
    ];
    var body = withC ? cardRowsFull : cardRowsFull.map(function (row) { return [row[0], row[1], row[2]]; });

    doc.autoTable({
      startY: y, head: [colLabels], body: body, theme: 'grid',
      styles: { fontSize: 8.5, cellPadding: 3, textColor: [13, 34, 64], lineColor: [228, 223, 210], lineWidth: 0.2 },
      headStyles: { fontStyle: 'bold', fontSize: 8, textColor: [255, 255, 255], fillColor: [13, 34, 64] },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [249, 247, 242], textColor: [110, 122, 140] },
        1: { fillColor: [253, 252, 250] },
        2: { fillColor: [242, 244, 248], textColor: [13, 34, 64] },
        3: withC ? { fillColor: [251, 246, 230], textColor: [168, 137, 58] } : {}
      },
      didDrawCell: function (data) {
        if (data.section === 'head' && data.column.index > 0) {
          var headerColors = [[60, 65, 82], [13, 34, 64], [168, 137, 58]];
          var ci = data.column.index - 1;
          if (ci < headerColors.length) {
            var c = headerColors[ci];
            doc.setFillColor(c[0], c[1], c[2]);
            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
            doc.setTextColor(255, 255, 255); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
            doc.text(data.cell.raw || '', data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2 + 2, { align: 'center' });
          }
        }
      },
      didParseCell: function (data) {
        if (data.section === 'body' && data.row.index === 6) {
          if (data.column.index === 2) { data.cell.styles.fontStyle = 'bold'; data.cell.styles.textColor = [13, 34, 64]; }
          if (withC && data.column.index === 3) { data.cell.styles.fontStyle = 'bold'; data.cell.styles.textColor = [168, 137, 58]; }
        }
      },
      margin: { left: 10, right: 10 }
    });
    y = doc.lastAutoTable.finalY + 8;

    doc.setTextColor(110, 122, 140); doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.text('OSZCZEDNOSCI I PROGI OPLACALNOSCI', 10, y); y += 5;
    var savW = withC ? (W - 24) / 2 : (W - 20);
    var savCols = withC
      ? [
        { label: 'Opcja 1 — bez zmian okresu', sav: f(r.diffB.real) + ' zl', rata: 'Rata: ' + f(r.B.pmt) + ' zl  |  zmiana: -' + f(r.diffB.rata) + ' zl/mies.', pb: r.pbB ? 'Prog: ' + r.pbB + ' mies.' : '', color: [13, 34, 64] },
        { label: 'Opcja 2 — skrocenie do ' + r.cM + ' mies.', sav: f(r.diffC.real) + ' zl', rata: 'Rata: ' + f(r.C.pmt) + ' zl  |  skrocenie -' + (r.aM - r.cM) + ' mies.', pb: r.pbC ? 'Prog: ' + r.pbC + ' mies.' : '', color: [168, 137, 58] }
      ]
      : [{ label: 'Refinans — bez zmian okresu', sav: f(r.diffB.real) + ' zl', rata: 'Rata: ' + f(r.B.pmt) + ' zl  |  zmiana: -' + f(r.diffB.rata) + ' zl/mies.', pb: r.pbB ? 'Prog: ' + r.pbB + ' mies.' : '', color: [13, 34, 64] }];
    savCols.forEach(function (s, i) {
      var sx = 10 + i * (savW + 4);
      doc.setFillColor(249, 247, 242); doc.roundedRect(sx, y, savW, 20, 2, 2, 'F');
      doc.setDrawColor(s.color[0], s.color[1], s.color[2]); doc.setLineWidth(1.2); doc.line(sx, y, sx, y + 20); doc.setLineWidth(0.2);
      doc.setTextColor(s.color[0], s.color[1], s.color[2]); doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.text(s.label, sx + 4, y + 6);
      doc.setFontSize(13); doc.text(s.sav, sx + 4, y + 14);
      doc.setTextColor(110, 122, 140); doc.setFontSize(6.5); doc.setFont('helvetica', 'normal');
      doc.text(s.rata + (s.pb ? '  |  ' + s.pb : ''), sx + savW - 3, y + 14, { align: 'right' });
    });
    y += 26;

    if (koment && y < H - 24) {
      doc.setFillColor(251, 246, 230); doc.roundedRect(8, y, W - 16, 14, 2, 2, 'F');
      doc.setTextColor(168, 137, 58); doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.text('UWAGI:', 12, y + 5);
      doc.setTextColor(13, 34, 64); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      var lines = doc.splitTextToSize(koment, W - 36);
      doc.text(lines.slice(0, 2), 30, y + 5);
    }

    var pages = doc.internal.getNumberOfPages();
    for (var pi = 1; pi <= pages; pi++) {
      doc.setPage(pi);
      doc.setFillColor(249, 247, 242); doc.rect(0, H - 9, W, 9, 'F');
      doc.setDrawColor(228, 223, 210); doc.setLineWidth(0.2); doc.line(0, H - 9, W, H - 9);
      doc.setTextColor(140, 140, 140); doc.setFontSize(6); doc.setFont('helvetica', 'normal');
      doc.text('Dane maja charakter informacyjny i nie stanowia oferty w rozumieniu KC.', 10, H - 3);
      doc.text((doradca || '') + (tel ? '  |  ' + tel : '') + '  |  str. ' + pi + '/' + pages, W - 10, H - 3, { align: 'right' });
    }

    var fname = 'refinansowanie' + (klient ? '-' + klient.replace(/\s+/g, '-').toLowerCase() : '') + '-' + ds.replace(/\./g, '') + '.pdf';
    doc.save(fname);
  }

  function attach() {
    $('#rf-calc-btn').addEventListener('click', rfCalculate);
    $('#rf-preview-btn').addEventListener('click', rfPreviewEmail);
    $('#rf-pdf-btn').addEventListener('click', rfGeneratePDF);
    $('#rf-pdf-btn-2').addEventListener('click', rfGeneratePDF);
    $('#rf-copy-btn').addEventListener('click', rfCopyEmail);
    $('#rf-modal-close').addEventListener('click', function () { $('#rf-modal').classList.remove('open'); });
    $('#rf-modal').addEventListener('click', function (e) { if (e.target === $('#rf-modal')) $('#rf-modal').classList.remove('open'); });
  }

  window.mountRfWidget = function (mountEl) {
    if (!mountEl) return;
    if (!document.getElementById('rf-style')) {
      var st = document.createElement('style');
      st.id = 'rf-style';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    mountEl.id = 'rf-root';
    mountEl.innerHTML = HTML;
    root = mountEl;
    rfLastResult = null;
    attach();
  };
})();
