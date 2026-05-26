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

/* ── Rodzaj oprocentowania (radio) ── */
#pkh-root .pkh-typ-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }
#pkh-root .pkh-typ-opt {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 12px; border: 1.5px solid var(--pkh-line-strong);
  border-radius: 8px; background: #fff; cursor: pointer;
  font-size: 13px; transition: all 0.15s;
}
#pkh-root .pkh-typ-opt input { margin: 0; accent-color: var(--pkh-gold); }
#pkh-root .pkh-typ-opt:hover { border-color: var(--pkh-gold); }
#pkh-root .pkh-typ-opt.on { background: var(--pkh-navy); color: #fff; border-color: var(--pkh-navy); }
#pkh-root .pkh-typ-opt.on input { accent-color: #fff; }

/* ── Uniform alignment for edit-panel fields ── */
#pkh-root .pkh-epg { align-items: stretch; row-gap: 12px; }
#pkh-root .pkh-epg > .pkh-ef { display: flex; flex-direction: column; gap: 5px; }
#pkh-root .pkh-epg > .pkh-ef label:first-child {
  min-height: 28px; display: flex; align-items: flex-end; line-height: 1.2;
}
#pkh-root .pkh-epg > .pkh-ef input[type=number],
#pkh-root .pkh-epg > .pkh-ef input[type=text],
#pkh-root .pkh-epg > .pkh-ef select { height: 36px; }
#pkh-root .pkh-addon-grid { align-items: stretch; row-gap: 12px; }
#pkh-root .pkh-addon-grid > .pkh-ef { display: flex; flex-direction: column; gap: 5px; }
#pkh-root .pkh-addon-grid > .pkh-ef label:first-child {
  min-height: 28px; display: flex; align-items: flex-end; line-height: 1.2;
}
#pkh-root .pkh-addon-grid > .pkh-ef input[type=number],
#pkh-root .pkh-addon-grid > .pkh-ef input[type=text],
#pkh-root .pkh-addon-grid > .pkh-ef select { height: 36px; }

/* ── Modular addon sections inside the edit panel ── */
#pkh-root .pkh-addon-wrap {
  display: flex; flex-direction: column; gap: 10px;
  padding-top: 4px; margin-top: 6px;
  border-top: 1px solid var(--pkh-line);
  padding-top: 14px;
}
#pkh-root .pkh-addon-list { display: flex; flex-direction: column; gap: 10px; }
#pkh-root .pkh-addon {
  background: var(--pkh-cream); border: 1px solid var(--pkh-line);
  border-radius: 10px; padding: 12px 14px;
}
#pkh-root .pkh-addon-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
#pkh-root .pkh-addon-t {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 14px; font-weight: 700; color: var(--pkh-navy);
}
#pkh-root .pkh-addon-x {
  width: 26px; height: 26px; border-radius: 6px;
  background: transparent; border: 1px solid var(--pkh-line-strong);
  font-size: 17px; line-height: 1; color: var(--pkh-muted);
  cursor: pointer; transition: all 0.15s;
}
#pkh-root .pkh-addon-x:hover { background: var(--pkh-bad-bg); border-color: var(--pkh-bad); color: var(--pkh-bad); }
#pkh-root .pkh-addon-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}
#pkh-root .pkh-addon-add { margin-top: 4px; }
#pkh-root .pkh-addon-add select {
  width: 100%; padding: 10px 12px; font-size: 13px; font-weight: 500;
  background: #fff; color: var(--pkh-navy);
  border: 1.5px dashed var(--pkh-line-strong);
  border-radius: 8px; cursor: pointer; transition: all 0.15s;
}
#pkh-root .pkh-addon-add select:hover {
  border-color: var(--pkh-gold); border-style: solid;
  background: var(--pkh-gold-tint);
}
#pkh-root .pkh-addon-note {
  font-size: 11px; color: var(--pkh-muted); padding: 8px 12px;
  border: 1px dashed var(--pkh-line-strong); border-radius: 8px;
  background: var(--pkh-cream); text-align: center; font-style: italic;
}
@media (max-width: 600px) {
  #pkh-root .pkh-addon-grid { grid-template-columns: 1fr; }
  #pkh-root .pkh-typ-row { grid-template-columns: 1fr; }
}

/* ── WIBOR scenario presets (editable) ── */
#pkh-root .pkh-pbox-wibor { grid-column: 1 / -1; }
#pkh-root .pkh-wibor-presets { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 9px; }
#pkh-root .pkh-wp {
  background: #fff; border: 1.5px solid var(--pkh-line-strong);
  border-radius: 8px; padding: 9px 10px;
  font-family: inherit;
  text-align: center; transition: all 0.15s; cursor: pointer;
  display: flex; flex-direction: column; gap: 5px;
}
#pkh-root .pkh-wp:hover { border-color: var(--pkh-gold); }
#pkh-root .pkh-wp.on { background: var(--pkh-navy); border-color: var(--pkh-navy); }
#pkh-root .pkh-wp-lbl { font-size: 11px; font-weight: 600; color: var(--pkh-soft); }
#pkh-root .pkh-wp.on .pkh-wp-lbl { color: #fff; }
#pkh-root .pkh-wp-edit {
  display: inline-flex; align-items: baseline; justify-content: center; gap: 2px;
  background: rgba(255,255,255,0.92); border-radius: 6px; padding: 3px 6px;
}
#pkh-root .pkh-wp.on .pkh-wp-edit { background: rgba(0,0,0,0.18); }
#pkh-root .pkh-wp-val {
  border: none; background: transparent; outline: none;
  font-family: inherit; font-size: 16px; font-weight: 700;
  width: 60px; text-align: right; font-variant-numeric: tabular-nums;
  color: var(--pkh-navy); padding: 0;
}
#pkh-root .pkh-wp.on .pkh-wp-val { color: #fff; }
#pkh-root .pkh-wp-edit span { font-size: 13px; font-weight: 700; color: var(--pkh-muted); }
#pkh-root .pkh-wp.on .pkh-wp-edit span { color: rgba(255,255,255,0.85); }

/* ── PRINT preflight modal ── */
#pkh-root .pkh-pmodal {
  display: none; position: fixed; inset: 0; z-index: 999999;
  background: rgba(13,34,64,0.55); backdrop-filter: blur(3px);
  align-items: center; justify-content: center; padding: 20px;
}
#pkh-root .pkh-pmodal.open { display: flex; }
#pkh-root .pkh-pmbox {
  background: #fff; border-radius: 14px; max-width: 460px; width: 100%;
  box-shadow: 0 30px 60px rgba(13,34,64,0.25); overflow: hidden;
}
#pkh-root .pkh-pmhdr {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; border-bottom: 1px solid var(--pkh-line);
  background: var(--pkh-cream);
}
#pkh-root .pkh-pmhdr h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px; font-weight: 700; margin: 0; color: var(--pkh-navy);
}
#pkh-root .pkh-pmclose {
  width: 28px; height: 28px; border: none; background: transparent;
  font-size: 22px; color: var(--pkh-muted); cursor: pointer;
  border-radius: 6px;
}
#pkh-root .pkh-pmclose:hover { background: rgba(0,0,0,0.06); color: var(--pkh-navy); }
#pkh-root .pkh-pmbody { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
#pkh-root .pkh-pmnote { font-size: 12px; color: var(--pkh-muted); line-height: 1.45; margin: 0 0 4px; }
#pkh-root .pkh-pmbody .pkh-ef { display: flex; flex-direction: column; gap: 5px; margin: 0; }
#pkh-root .pkh-pmbody label {
  font-size: 10px; color: var(--pkh-muted); font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
}
#pkh-root .pkh-pmbody input, #pkh-root .pkh-pmbody textarea {
  width: 100%; padding: 9px 12px; font-family: inherit; font-size: 14px;
  border: 1.5px solid var(--pkh-line-strong); border-radius: 8px;
  background: #fff; color: var(--pkh-navy); outline: none; resize: vertical;
}
#pkh-root .pkh-pmbody input:focus, #pkh-root .pkh-pmbody textarea:focus {
  border-color: var(--pkh-gold);
}
#pkh-root .pkh-pmfoot {
  display: flex; gap: 10px; justify-content: flex-end;
  padding: 14px 20px; border-top: 1px solid var(--pkh-line); background: #fafaf6;
}
#pkh-root .pkh-pmbtn {
  padding: 9px 16px; border-radius: 8px; font-family: inherit;
  font-size: 13px; font-weight: 600; cursor: pointer;
  border: 1.5px solid transparent;
}
#pkh-root .pkh-pmbtn-out { background: #fff; color: var(--pkh-soft); border-color: var(--pkh-line-strong); }
#pkh-root .pkh-pmbtn-out:hover { border-color: var(--pkh-muted); }
#pkh-root .pkh-pmbtn-pri { background: var(--pkh-gold); color: var(--pkh-navy); border-color: var(--pkh-gold); }
#pkh-root .pkh-pmbtn-pri:hover { background: var(--pkh-gold-deep); border-color: var(--pkh-gold-deep); color: #fff; }

/* ── PRINT header/footer (only visible in print) ── */
#pkh-root .pkh-print-header,
#pkh-root .pkh-print-footer { display: none; }

/* ── tools row (tabs + presentation/print) ── */
#pkh-root .pkh-tools-row {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 16px; margin: 28px 0 18px; flex-wrap: wrap;
  border-bottom: 1px solid var(--pkh-line);
}
#pkh-root .pkh-tools-row .pkh-tabs { margin: 0; border-bottom: 0; }
#pkh-root .pkh-toolbar { display: flex; gap: 8px; padding-bottom: 8px; }
#pkh-root .pkh-tbtn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 13px; border-radius: 7px;
  background: #fff; color: var(--pkh-navy);
  border: 1px solid var(--pkh-line-strong);
  font-size: 12px; font-weight: 600; cursor: pointer;
  font-family: inherit; transition: all 0.15s;
}
#pkh-root .pkh-tbtn:hover { background: var(--pkh-gold-tint); border-color: var(--pkh-gold); }
#pkh-root .pkh-tbtn.on {
  background: var(--pkh-navy); color: #fff; border-color: var(--pkh-navy);
}

/* ── side-by-side (Bok w bok) view ── */
#pkh-root .pkh-bok-pickers {
  display: grid; grid-template-columns: 1fr 60px 1fr;
  gap: 12px; align-items: end; margin-bottom: 22px;
}
#pkh-root .pkh-bok-pick { display: flex; flex-direction: column; gap: 5px; }
#pkh-root .pkh-bok-pick label {
  font-size: 10px; color: var(--pkh-muted); font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
}
#pkh-root .pkh-bok-pick select {
  padding: 9px 12px; font-size: 14px; font-weight: 600; width: 100%;
}
#pkh-root .pkh-bok-vs {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px; font-weight: 700; color: var(--pkh-gold-deep);
  text-align: center; padding-bottom: 8px; letter-spacing: 0.05em;
}
#pkh-root .pkh-vs-header {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.9fr) minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: 0; padding: 12px 14px; border: 1px solid var(--pkh-line);
  background: var(--pkh-navy); color: #fff;
  border-radius: 10px 10px 0 0; align-items: center;
}
#pkh-root .pkh-vs-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 16px; font-weight: 700;
  display: flex; align-items: center; gap: 8px;
}
#pkh-root .pkh-vs-mid {
  font-size: 10px; color: rgba(255,255,255,0.65);
  text-transform: uppercase; letter-spacing: 0.1em;
  font-weight: 600; text-align: center;
}
#pkh-root .pkh-vs-row {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.9fr) minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: 0; padding: 14px;
  border-left: 1px solid var(--pkh-line);
  border-right: 1px solid var(--pkh-line);
  border-bottom: 1px solid var(--pkh-line);
  background: #fff; align-items: center;
}
#pkh-root .pkh-vs-row:nth-child(even) { background: var(--pkh-cream); }
#pkh-root .pkh-vs-row:last-of-type { border-radius: 0 0 10px 10px; }
#pkh-root .pkh-vs-v {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 17px; font-weight: 700; color: var(--pkh-navy);
  font-variant-numeric: tabular-nums; letter-spacing: -0.005em;
}
#pkh-root .pkh-vs-l {
  font-size: 12px; color: var(--pkh-muted); text-align: center;
  font-weight: 500;
}
#pkh-root .pkh-vs-d { text-align: center; }
#pkh-root .pkh-vs-pill {
  font-size: 11px; padding: 4px 10px; border-radius: 999px; font-weight: 600;
  display: inline-block; font-variant-numeric: tabular-nums;
}
#pkh-root .pkh-vs-pill.save { background: var(--pkh-good-bg); color: var(--pkh-good); }
#pkh-root .pkh-vs-pill.extra { background: var(--pkh-bad-bg); color: var(--pkh-bad); }
#pkh-root .pkh-vs-winner {
  margin-top: 16px; padding: 14px 18px;
  background: var(--pkh-good-bg); border: 1px solid var(--pkh-good);
  border-radius: 10px; color: var(--pkh-good); font-size: 14px;
  text-align: center; line-height: 1.5;
}

/* ── PRESENTATION MODE (clean view for client) ── */
#pkh-root.pkh-presentation .pkh-bsel,
#pkh-root.pkh-presentation #pkh-edit-panels,
#pkh-root.pkh-presentation .pkh-sec:not(:first-of-type),
#pkh-root.pkh-presentation .pkh-wibor-presets,
#pkh-root.pkh-presentation .pkh-sort-row { display: none; }
/* keep the exit button visible — make it stand out */
#pkh-root.pkh-presentation #pkh-pres {
  background: var(--pkh-gold) !important; color: var(--pkh-navy) !important;
  border-color: var(--pkh-gold) !important;
}
#pkh-root.pkh-presentation #pkh-print { background: var(--pkh-navy); color: #fff; border-color: var(--pkh-navy); }
#pkh-root.pkh-presentation { box-shadow: 0 24px 80px rgba(13,34,64,0.2); }
#pkh-root.pkh-presentation .pkh-top h3 { font-size: 32px; }
#pkh-root.pkh-presentation .pkh-cmp-val,
#pkh-root.pkh-presentation .pkh-vs-v { font-size: 26px; }

/* ── PRINT (PDF export) — show only Karty tab + expert info ── */
@media print {
  @page { margin: 12mm 10mm; size: A4; }
  /* Hide everything in the document EXCEPT the calculator widget */
  body.pkh-printing > *:not(#pkh-root):not(script):not(style) { display: none !important; }
  /* Walk up the ancestor chain — only #pkh-root subtree visible */
  body, html {
    background: #fff !important; margin: 0 !important; padding: 0 !important;
    height: auto !important; overflow: visible !important;
  }
  /* Unwrap pkh-root from any positioned ancestors */
  #pkh-root {
    position: static !important; left: auto !important; top: auto !important;
    width: 100% !important; max-width: none !important; margin: 0 !important;
    box-shadow: none !important; border: none !important; border-radius: 0 !important;
    padding: 0 14px !important; background: #fff !important;
    display: block !important;
  }
  /* Hide editing chrome */
  #pkh-root .pkh-top p,
  #pkh-root .pkh-bsel,
  #pkh-root #pkh-edit-panels,
  #pkh-root .pkh-sec,
  #pkh-root .pkh-toolbar,
  #pkh-root .pkh-tools-row,
  #pkh-root .pkh-wibor-presets,
  #pkh-root .pkh-sort-row,
  #pkh-root .pkh-bok-pickers,
  #pkh-root .pkh-pmodal,
  #pkh-root .pkh-tabs,
  #pkh-root .pkh-summary { display: none !important; }
  /* show print header + footer */
  #pkh-root .pkh-print-header {
    display: flex !important; justify-content: space-between; align-items: flex-end;
    padding: 12px 0 14px; border-bottom: 1.5px solid var(--pkh-gold);
    margin-bottom: 16px; gap: 16px;
  }
  #pkh-root .pkh-ph-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px; font-weight: 700; color: var(--pkh-navy);
  }
  #pkh-root .pkh-ph-sub { font-size: 11px; color: var(--pkh-muted); letter-spacing: 0.06em; text-transform: uppercase; margin-top: 2px; }
  #pkh-root .pkh-ph-meta { text-align: right; font-size: 11px; color: var(--pkh-soft); line-height: 1.45; }
  #pkh-root .pkh-ph-meta > div:first-child { font-weight: 600; }
  #pkh-root .pkh-print-footer {
    display: block !important; margin-top: 16px; padding-top: 12px;
    border-top: 1px solid var(--pkh-line); font-size: 11px; color: var(--pkh-soft);
    line-height: 1.5;
  }
  #pkh-root .pkh-top { padding-bottom: 0; border-bottom: none; margin-bottom: 8px; }
  #pkh-root .pkh-top h3 { font-size: 16px; }
  #pkh-root .pkh-summary, #pkh-root #pkh-content { page-break-inside: avoid; }
  #pkh-root .pkh-card, #pkh-root .pkh-cmp-card,
  #pkh-root .pkh-vs-row, #pkh-root .pkh-vs-header,
  #pkh-root table { break-inside: avoid; }
  #pkh-root .pkh-card:hover { transform: none !important; box-shadow: none !important; }
  /* compact for print */
  #pkh-root .pkh-cards { grid-template-columns: repeat(2, 1fr); }
  #pkh-root .pkh-cmp-val, #pkh-root .pkh-vs-v { font-size: 18px; }
  @page { margin: 12mm 10mm; }
}

@media (max-width: 600px) {
  #pkh-root { padding: 20px 18px; border-radius: 14px; }
  #pkh-root .pkh-gp { grid-template-columns: 1fr 1fr; }
  #pkh-root .pkh-bok-pickers { grid-template-columns: 1fr; }
  #pkh-root .pkh-bok-vs { padding: 4px 0; }
  #pkh-root .pkh-vs-header, #pkh-root .pkh-vs-row {
    grid-template-columns: 1fr 1fr; gap: 8px;
  }
  #pkh-root .pkh-vs-mid:nth-of-type(2) { display: none; }
  #pkh-root .pkh-vs-l { grid-column: 1 / -1; padding: 4px 0 0; }
  #pkh-root .pkh-vs-d { grid-column: 1 / -1; padding-top: 6px; }
  #pkh-root .pkh-tools-row { flex-direction: column; align-items: stretch; }
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
    +   '<h3>Porównaj oferty</h3>'
    +   '<p>Masz decyzje kredytowe z różnych banków? Wprowadź ich parametry i zobacz, która oferta jest realnie najtańsza — w racie, kosztach 5-letnich i całkowitych.</p>'
    + '</div>'

    + '<div class="pkh-sec">Parametry kredytu</div>'
    + '<div class="pkh-gp">'
    +   '<div class="pkh-pbox"><label>Kwota kredytu (PLN)</label><input type="number" id="pkh-kwota" value="600000" step="10000"></div>'
    +   '<div class="pkh-pbox"><label>Wartość nieruchomości (PLN)</label><input type="number" id="pkh-wartosc" value="2200000" step="10000"></div>'
    +   '<div class="pkh-pbox"><label>Okres kredytu (mies.)</label><input type="number" id="pkh-okres" value="360" min="12" max="420" step="12"></div>'
    +   '<div class="pkh-pbox pkh-pbox-wibor"><label>WIBOR 3M (%)</label><input type="number" id="pkh-wibor" value="3.84" step="0.01" min="0" max="15">'
    +     '<div class="pkh-wibor-presets">'
    +       '<div class="pkh-wp" data-s="opt"><div class="pkh-wp-lbl">Optymistyczny</div><div class="pkh-wp-edit"><input type="number" class="pkh-wp-val" data-s="opt" value="2.50" step="0.01" min="0" max="15"><span>%</span></div></div>'
    +       '<div class="pkh-wp on" data-s="neu"><div class="pkh-wp-lbl">Neutralny</div><div class="pkh-wp-edit"><input type="number" class="pkh-wp-val" data-s="neu" value="3.84" step="0.01" min="0" max="15"><span>%</span></div></div>'
    +       '<div class="pkh-wp" data-s="pes"><div class="pkh-wp-lbl">Pesymistyczny</div><div class="pkh-wp-edit"><input type="number" class="pkh-wp-val" data-s="pes" value="5.50" step="0.01" min="0" max="15"><span>%</span></div></div>'
    +     '</div></div>'
    +   '<div class="pkh-pbox"><label>Ub. zewn. życie (PLN/mies)</label><input type="number" id="pkh-ubzew-zycie" value="0" step="10" min="0"></div>'
    +   '<div class="pkh-pbox"><label>Ub. zewn. nieruch. (PLN/mies)</label><input type="number" id="pkh-ubzew-nieruch" value="0" step="10" min="0"></div>'
    + '</div>'

    + '<div class="pkh-sec">Wybierz banki do porównania</div>'
    + '<div class="pkh-bsel" id="pkh-bank-selector"></div>'

    + '<div class="pkh-sec" style="margin-top:4px">Parametry banków <span class="pkh-sec-note">(kliknij aby rozwinąć)</span></div>'
    + '<div id="pkh-edit-panels"></div>'

    + '<div class="pkh-tools-row">'
    +   '<div class="pkh-tabs">'
    +     '<button class="pkh-tab active" data-tab="karty">Karty</button>'
    +     '<button class="pkh-tab" data-tab="2bok">Bok w bok</button>'
    +     '<button class="pkh-tab" data-tab="5lat">Porównanie 5 lat</button>'
    +     '<button class="pkh-tab" data-tab="tabela">Tabela</button>'
    +     '<button class="pkh-tab" data-tab="wykres">Wykres</button>'
    +   '</div>'
    +   '<div class="pkh-toolbar">'
    +     '<button type="button" class="pkh-tbtn" id="pkh-pres" title="Schowaj edycję — czysty widok dla klienta">'
    +       '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>'
    +       '<span class="pkh-tbtn-label">Prezentacja</span>'
    +     '</button>'
    +     '<button type="button" class="pkh-tbtn" id="pkh-print" title="Drukuj lub zapisz jako PDF">'
    +       '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>'
    +       '<span class="pkh-tbtn-label">Drukuj / PDF</span>'
    +     '</button>'
    +   '</div>'
    + '</div>'

    + '<div class="pkh-sort-row">'
    +   '<label>Sortuj wg:</label>'
    +   '<select id="pkh-sort-by">'
    +     '<option value="rata">Rata miesięczna</option>'
    +     '<option value="koszty5">Koszty 5 lat</option>'
    +     '<option value="rataPo">Rata po 5 latach</option>'
    +     '<option value="oproc">Oprocentowanie 5 lat</option>'
    +   '</select>'
    +   '<select id="pkh-sort-dir">'
    +     '<option value="asc">Rosnąco</option>'
    +     '<option value="desc">Malejąco</option>'
    +   '</select>'
    + '</div>'

    + '<div class="pkh-summary" id="pkh-summary"></div>'
    + '<div id="pkh-content"></div>';

  // No hard-coded bank notes — generic placeholders, advisor fills in.
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
    var znizka = (b.znizka || 0) / 100;
    // Karta kredytowa — gdy wymagana i klient rezygnuje, marża rośnie
    var rezKartaAdd = (b.kartyKredytowe && !b.kartaOn) ? (b.rezKarta || 0) / 100 : 0;
    // Ub. życie — zawsze liczone od kwoty kredytu, ×liczba kredytobiorców
    var ubZycieMies = 0, ubZycieRezBump = 0;
    if (b.ubZycieOn) {
      var osoby = (b.ubZycieOsoby === 2) ? 2 : 1;
      if (b.ubZewZycieOn) {
        // Prefer per-bank cost; fall back to global p.ubZewZycie
        var extZycie = (b.ubZewZycieKwota > 0) ? b.ubZewZycieKwota : (p.ubZewZycie || 0);
        ubZycieMies = extZycie * osoby;
        ubZycieRezBump = (b.rezUbZycie || 0) / 100;
      } else {
        ubZycieMies = kwota * (b.ubZycie || 0) / 1000 * osoby;
      }
    }
    // Ub. nieruchomości — analogicznie
    var ubNieruchMies = 0, ubNieruchRezBump = 0;
    if (b.ubNieruchOn) {
      if (b.ubZewNieruchOn) {
        ubNieruchMies = (b.ubZewNieruchKwota > 0) ? b.ubZewNieruchKwota : (p.ubZewNieruch || 0);
        ubNieruchRezBump = (b.rezUbNieruch || 0) / 100;
      } else {
        var ubNieruchBase = (b.ubNieruchBase === 'kredyt' ? kwota : wartosc);
        ubNieruchMies = ubNieruchBase * (b.ubNieruch || 0) / 1000;
      }
    }
    var rezTotal = rezKartaAdd + ubZycieRezBump + ubNieruchRezBump;
    var rate5, ratePo;
    if (b.typ === 'zmienne') {
      var rZm = (b.marzaPo / 100) + (wibor / 100) - znizka + rezTotal;
      rate5 = rZm; ratePo = rZm;
    } else {
      rate5 = (b.marza5 / 100) - znizka + rezTotal;
      ratePo = (b.marzaPo / 100) + (wibor / 100) - znizka + rezTotal;
    }
    rate5 = Math.max(0, rate5);
    ratePo = Math.max(0, ratePo);
    var rataBase = calcRata(kwota, rate5, okres);
    var ubZewZycieMies = 0, ubZewNieruchMies = 0; // legacy display fields — keep zero
    var kartaKosztMies = (b.kartyKredytowe && b.kartaOn) ? (b.kartaKosztMies || 0) : 0;
    var rataTotal = rataBase + ubZycieMies + ubNieruchMies + kartaKosztMies;
    var koszty5 = rataTotal * 60;
    var ltv = (kwota / wartosc * 100).toFixed(1);
    /* expose card monthly cost for card display */
    var oprocPo = (rate5 ? ratePo * 100 : ratePo * 100).toFixed(2);
    var oproc5  = (rate5 * 100).toFixed(2);
    return { rataBase: rataBase, ubZycieMies: ubZycieMies, ubNieruchMies: ubNieruchMies,
             ubZewZycieMies: ubZewZycieMies, ubZewNieruchMies: ubZewNieruchMies,
             rataTotal: rataTotal, koszty5: koszty5, rataPo: calcRata(kwota, ratePo, okres > 60 ? okres - 60 : okres),
             rate5: rate5, ratePo: ratePo, ltv: ltv, oprocPo: oprocPo, oproc5: oproc5,
             znizkaApplied: znizka * 100, rezKartaApplied: rezKartaAdd * 100,
             kartaKosztMies: kartaKosztMies };
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

  function addonSection(b, kind) {
    if (kind === 'zycie') {
      return '<div class="pkh-addon" data-rm="' + b.id + '|ubZycieOn">'
        + '<div class="pkh-addon-head"><span class="pkh-addon-t">Ubezpieczenie na życie</span><button type="button" class="pkh-addon-x" data-rm-btn="' + b.id + '|ubZycieOn" title="Usuń">×</button></div>'
        + '<div class="pkh-addon-grid">'
          + '<div class="pkh-ef"><label>Stawka miesięczna (% kwoty kredytu)</label><input type="number" value="' + b.ubZycie + '" step="0.001" min="0" max="5" data-upd="' + b.id + '|ubZycie|num"></div>'
          + '<div class="pkh-ef"><label>Liczba kredytobiorców ubezpieczonych</label>'
            + '<select data-upd="' + b.id + '|ubZycieOsoby|num">'
              + '<option value="1"' + ((b.ubZycieOsoby || 1) === 1 ? ' selected' : '') + '>1 osoba</option>'
              + '<option value="2"' + ((b.ubZycieOsoby || 1) === 2 ? ' selected' : '') + '>2 osoby</option>'
            + '</select>'
          + '</div>'
          + '<div class="pkh-ef" style="grid-column:1/-1">'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.ubZewZycieOn ? 'checked' : '') + ' data-upd="' + b.id + '|ubZewZycieOn|bool"><span>Klient korzysta z ub. zewnętrznego (zamiast banku)</span></label>'
          + '</div>'
          + (b.ubZewZycieOn
            ? '<div class="pkh-ef" style="grid-column:1/-1"><label>Kwota miesięczna ub. zewnętrznego (PLN)</label><input type="number" value="' + (b.ubZewZycieKwota || 0) + '" step="1" min="0" max="2000" placeholder="np. 80" data-upd="' + b.id + '|ubZewZycieKwota|num"></div>'
            : '')
          + '<div class="pkh-ef" style="grid-column:1/-1"><label>Wzrost oprocentowania przy rezygnacji (%)</label><input type="number" value="' + b.rezUbZycie + '" step="0.01" min="0" max="5" placeholder="np. 0.20" data-upd="' + b.id + '|rezUbZycie|num"></div>'
        + '</div>'
      + '</div>';
    }
    if (kind === 'nieruch') {
      return '<div class="pkh-addon" data-rm="' + b.id + '|ubNieruchOn">'
        + '<div class="pkh-addon-head"><span class="pkh-addon-t">Ubezpieczenie nieruchomości</span><button type="button" class="pkh-addon-x" data-rm-btn="' + b.id + '|ubNieruchOn" title="Usuń">×</button></div>'
        + '<div class="pkh-addon-grid">'
          + '<div class="pkh-ef"><label>Stawka miesięczna (%)</label><input type="number" value="' + b.ubNieruch + '" step="0.001" min="0" max="5" data-upd="' + b.id + '|ubNieruch|num"></div>'
          + '<div class="pkh-ef"><label>Liczona od</label>'
            + '<select data-upd="' + b.id + '|ubNieruchBase|str">'
              + '<option value="kredyt"' + (b.ubNieruchBase === 'kredyt' ? ' selected' : '') + '>kwoty kredytu</option>'
              + '<option value="nieruch"' + (b.ubNieruchBase !== 'kredyt' ? ' selected' : '') + '>wartości nieruchomości</option>'
            + '</select>'
          + '</div>'
          + '<div class="pkh-ef" style="grid-column:1/-1">'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.ubZewNieruchOn ? 'checked' : '') + ' data-upd="' + b.id + '|ubZewNieruchOn|bool"><span>Klient korzysta z ub. zewnętrznego (zamiast banku)</span></label>'
          + '</div>'
          + (b.ubZewNieruchOn
            ? '<div class="pkh-ef" style="grid-column:1/-1"><label>Kwota miesięczna ub. zewnętrznego (PLN)</label><input type="number" value="' + (b.ubZewNieruchKwota || 0) + '" step="1" min="0" max="2000" placeholder="np. 60" data-upd="' + b.id + '|ubZewNieruchKwota|num"></div>'
            : '')
          + '<div class="pkh-ef" style="grid-column:1/-1"><label>Wzrost oprocentowania przy rezygnacji (%)</label><input type="number" value="' + b.rezUbNieruch + '" step="0.01" min="0" max="5" placeholder="np. 0.10" data-upd="' + b.id + '|rezUbNieruch|num"></div>'
        + '</div>'
      + '</div>';
    }
    if (kind === 'karta') {
      return '<div class="pkh-addon" data-rm="' + b.id + '|kartyKredytowe">'
        + '<div class="pkh-addon-head"><span class="pkh-addon-t">Karta kredytowa</span><button type="button" class="pkh-addon-x" data-rm-btn="' + b.id + '|kartyKredytowe" title="Usuń">×</button></div>'
        + '<div class="pkh-addon-grid">'
          + '<div class="pkh-ef" style="grid-column:1/-1">'
            + '<label class="pkh-cbr"><input type="checkbox" ' + (b.kartaOn ? 'checked' : '') + ' data-upd="' + b.id + '|kartaOn|bool"><span>Klient godzi się na kartę</span></label>'
          + '</div>'
          + (b.kartaOn
            ? '<div class="pkh-ef" style="grid-column:1/-1"><label>Miesięczny koszt karty (PLN)</label><input type="number" value="' + (b.kartaKosztMies || 0) + '" step="1" min="0" max="500" placeholder="np. 50" data-upd="' + b.id + '|kartaKosztMies|num"></div>'
            : '')
          + '<div class="pkh-ef" style="grid-column:1/-1"><label>Wzrost oprocentowania przy rezygnacji (%)</label><input type="number" value="' + b.rezKarta + '" step="0.01" min="0" max="5" placeholder="np. 0.10" data-upd="' + b.id + '|rezKarta|num"></div>'
        + '</div>'
      + '</div>';
    }
    return '';
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
        + (open ? (function () {
          var addonsHtml = '';
          if (b.ubZycieOn)   addonsHtml += addonSection(b, 'zycie');
          if (b.ubNieruchOn) addonsHtml += addonSection(b, 'nieruch');
          if (b.kartyKredytowe) addonsHtml += addonSection(b, 'karta');
          // Available addons (not yet added) for the dropdown
          var avail = [];
          if (!b.ubZycieOn)     avail.push({ k: 'ubZycieOn',     t: 'Ubezpieczenie na życie' });
          if (!b.ubNieruchOn)   avail.push({ k: 'ubNieruchOn',   t: 'Ubezpieczenie nieruchomości' });
          if (!b.kartyKredytowe) avail.push({ k: 'kartyKredytowe', t: 'Karta kredytowa' });
          var addBtn = avail.length
            ? '<div class="pkh-addon-add">'
              + '<select data-add="' + b.id + '">'
                + '<option value="">+ Dodaj wymaganie banku</option>'
                + avail.map(function (a) { return '<option value="' + a.k + '">' + a.t + '</option>'; }).join('')
              + '</select>'
            + '</div>'
            : '<div class="pkh-addon-note">Wszystkie wymagania banku dodane.</div>';
          return '<div class="pkh-epg">'
            + '<div class="pkh-ef" style="grid-column:1/-1"><label>Nazwa banku</label><input type="text" value="' + b.nazwa.replace(/"/g,'&quot;') + '" maxlength="40" placeholder="np. Bank Polski" data-upd="' + b.id + '|nazwa|str"></div>'
            + '<div class="pkh-ef" style="grid-column:1/-1"><label>Rodzaj oprocentowania</label>'
              + '<div class="pkh-typ-row">'
                + '<label class="pkh-typ-opt' + (b.typ === 'stale' ? ' on' : '') + '"><input type="radio" name="typ-' + b.id + '" ' + (b.typ === 'stale' ? 'checked' : '') + ' data-upd="' + b.id + '|typ|radio" value="stale"><span>Stałe 5 lat + zmienne</span></label>'
                + '<label class="pkh-typ-opt' + (b.typ === 'zmienne' ? ' on' : '') + '"><input type="radio" name="typ-' + b.id + '" ' + (b.typ === 'zmienne' ? 'checked' : '') + ' data-upd="' + b.id + '|typ|radio" value="zmienne"><span>Zmienne od początku</span></label>'
              + '</div>'
            + '</div>'
            + (b.typ === 'stale'
              ? '<div class="pkh-ef"><label>Oprocentowanie 5 lat (stałe, %)</label><input type="number" value="' + b.marza5 + '" step="0.01" min="0" max="20" data-upd="' + b.id + '|marza5|num"></div>'
              : '')
            + '<div class="pkh-ef"><label>Marża' + (b.typ === 'zmienne' ? ' (zmienna, + WIBOR)' : ' (po okresie stałym)') + ' (%)</label><input type="number" value="' + b.marzaPo + '" step="0.01" min="0" max="20" data-upd="' + b.id + '|marzaPo|num"></div>'
            + '<div class="pkh-ef"><label>Dodatkowa zniżka (p.p.)</label><input type="number" value="' + (b.znizka || 0) + '" step="0.01" min="0" max="3" placeholder="0" data-upd="' + b.id + '|znizka|num"></div>'
            + '<div class="pkh-addon-wrap" style="grid-column:1/-1">'
              + (addonsHtml ? '<div class="pkh-addon-list">' + addonsHtml + '</div>' : '')
              + addBtn
            + '</div>'
            + '<div class="pkh-ef" style="grid-column:1/-1"><label>Uwagi / cechy oferty</label><input type="text" value="' + ((b.notatka || '').replace(/"/g,'&quot;')) + '" maxlength="200" placeholder="np. ankieta medyczna, inspekcja przy każdej transzy…" data-upd="' + b.id + '|notatka|str"></div>'
          + '</div>';
        })() : '')
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
        + (c.kartaKosztMies > 0 ? '<div class="pkh-row"><span class="pkh-rl">Karta kredytowa (mies.)</span><span class="pkh-rv">' + fmt(c.kartaKosztMies) + '</span></div>' : '')
        + '<div class="pkh-divider">Oprocentowanie</div>'
        + (b.typ === 'stale' ? '<div class="pkh-row"><span class="pkh-rl">Oprocent. 5 lat (stałe)</span><span class="pkh-rv">' + c.oproc5 + '%</span></div>' : '')
        + '<div class="pkh-row"><span class="pkh-rl">' + (b.typ === 'zmienne' ? 'Marża (zmienna)' : 'Marża (po 5 latach)') + '</span><span class="pkh-rv">' + b.marzaPo.toFixed(2) + '%</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">Oprocent. ' + (b.typ === 'zmienne' ? '(marża + WIBOR)' : 'po 5l (z WIBOR)') + '</span><span class="pkh-rv">' + c.oprocPo + '%</span></div>'
        + (b.znizka > 0 ? '<div class="pkh-row"><span class="pkh-rl">Dod. zniżka eksperta</span><span class="pkh-rv g">−' + b.znizka.toFixed(2) + ' p.p.</span></div>' : '')
        + (b.kartyKredytowe && !b.kartaOn ? '<div class="pkh-row"><span class="pkh-rl">Bez karty (+marża)</span><span class="pkh-rv r">+' + b.rezKarta.toFixed(2) + '%</span></div>' : '')
        + '<div class="pkh-divider">Koszty</div>'
        + '<div class="pkh-row"><span class="pkh-rl">Koszty 5 lat łącznie</span><span class="pkh-rv">' + fmt(c.koszty5) + '</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">Rata po 5 latach</span><span class="pkh-rv">' + fmt(c.rataPo) + '</span></div>'
        + '<div class="pkh-row"><span class="pkh-rl">LTV</span><span class="pkh-rv">' + c.ltv + '%</span></div>'
        + (b.kartyKredytowe ? '<div class="pkh-row"><span class="pkh-rl">Rez. karty (+' + b.rezKarta.toFixed(2) + '% marży)</span><span class="pkh-rv">' + b.rezKarta.toFixed(2) + '%</span></div>' : '')
        + (b.notatka ? '<div class="pkh-note">' + b.notatka.replace(/[<>]/g, '') + '</div>' : '')
        + '</div>';
    }).join('') + '</div>';
  }

  function render5lat(sorted) {
    if (!sorted.length) return '<div class="pkh-empty">Wybierz co najmniej jeden bank.</div>';
    var best5 = sorted[0];
    var p = gp();
    var html = '';
    html += '<div class="pkh-cmp-section"><div class="pkh-cmp-title">Koszt kredytu w okresie stałego oprocentowania (60 rat)</div><div class="pkh-cmp-grid">';
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
    html += '<div class="pkh-cmp-section"><div class="pkh-cmp-title">Rata po okresie stałym (marża zmienna + WIBOR ' + p.wibor + '%)</div><div class="pkh-cmp-grid">';
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
      + '<th>Oproc. 5l</th><th>Marża</th><th>Oprocent. po 5l</th><th>Koszty 5l</th><th>Rata po 5l</th><th>LTV</th>'
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
      + bars(sortedPo, maxP, function (c) { return c.rataPo; }, 'Rata po okresie stałym (marża + WIBOR)');
  }

  function render(skipPanels) {
    var sorted = getSorted();
    renderSummary(sorted);
    if (!skipPanels) renderEditPanels();
    var el = root.querySelector('#pkh-content');
    if (activeTab === 'karty') el.innerHTML = renderCards(sorted);
    else if (activeTab === '2bok') el.innerHTML = render2Bok(sorted);
    else if (activeTab === '5lat') el.innerHTML = render5lat(sorted);
    else if (activeTab === 'tabela') el.innerHTML = renderTabela(sorted);
    else el.innerHTML = renderWykres(sorted);
    if (activeTab === '2bok') wireBokPickers();
  }

  /* state for side-by-side view */
  var bok = { a: null, b: null };

  function wireBokPickers() {
    var pa = root.querySelector('#pkh-bok-a'), pb = root.querySelector('#pkh-bok-b');
    if (!pa || !pb) return;
    pa.addEventListener('change', function () { bok.a = pa.value; render(); });
    pb.addEventListener('change', function () { bok.b = pb.value; render(); });
  }

  function render2Bok(sorted) {
    if (sorted.length < 2) return '<div class="pkh-empty">Aktywuj co najmniej 2 banki, żeby je porównać bok w bok.</div>';
    // pick defaults — best vs second best by total rata
    if (!bok.a || !sorted.find(function(x){return x.b.id===bok.a;})) bok.a = sorted[0].b.id;
    if (!bok.b || !sorted.find(function(x){return x.b.id===bok.b;}) || bok.b === bok.a) {
      bok.b = (sorted.find(function(x){return x.b.id!==bok.a;}) || sorted[1]).b.id;
    }
    var opt = function(curr) { return sorted.map(function(x){
      return '<option value="'+x.b.id+'"'+(x.b.id===curr?' selected':'')+'>'+x.b.nazwa+'</option>';
    }).join(''); };
    var a = sorted.find(function(x){return x.b.id===bok.a;});
    var b = sorted.find(function(x){return x.b.id===bok.b;});
    var rataDiff = b.c.rataTotal - a.c.rataTotal;
    var k5Diff = b.c.koszty5 - a.c.koszty5;
    var rataPoDiff = b.c.rataPo - a.c.rataPo;
    function rowVs(label, vA, vB, diff, fmtFn, betterLow) {
      var sign = diff > 0 ? '+' : '';
      var dCls = (betterLow ? (diff > 0 ? 'extra' : 'save') : (diff < 0 ? 'extra' : 'save'));
      var dTxt = Math.abs(diff) < 0.5 ? '—' : (sign + fmtFn(diff));
      return '<div class="pkh-vs-row">'
        + '<div class="pkh-vs-v">' + fmtFn(vA) + '</div>'
        + '<div class="pkh-vs-l">' + label + '</div>'
        + '<div class="pkh-vs-v">' + fmtFn(vB) + '</div>'
        + '<div class="pkh-vs-d"><span class="pkh-vs-pill ' + dCls + '">' + dTxt + '</span></div>'
        + '</div>';
    }
    function pct(x) { return x.toFixed(2) + '%'; }
    var html = '<div class="pkh-bok-pickers">'
      + '<div class="pkh-bok-pick"><label>Lewy</label><select id="pkh-bok-a">' + opt(bok.a) + '</select></div>'
      + '<div class="pkh-bok-vs">VS</div>'
      + '<div class="pkh-bok-pick"><label>Prawy</label><select id="pkh-bok-b">' + opt(bok.b) + '</select></div>'
    + '</div>';
    html += '<div class="pkh-vs-header">'
      + '<div class="pkh-vs-name"><span class="pkh-dot" style="background:' + a.b.kolor + '"></span>' + a.b.nazwa + '</div>'
      + '<div class="pkh-vs-mid">parametr</div>'
      + '<div class="pkh-vs-name"><span class="pkh-dot" style="background:' + b.b.kolor + '"></span>' + b.b.nazwa + '</div>'
      + '<div class="pkh-vs-mid">różnica</div>'
    + '</div>';
    html += rowVs('Rata całkowita', a.c.rataTotal, b.c.rataTotal, rataDiff, fmt, true);
    html += rowVs('Rata bazowa', a.c.rataBase, b.c.rataBase, b.c.rataBase - a.c.rataBase, fmt, true);
    html += rowVs('Oproc. 5 lat (stałe)', a.b.marza5, b.b.marza5, b.b.marza5 - a.b.marza5, pct, true);
    html += rowVs('Marża', a.b.marzaPo, b.b.marzaPo, b.b.marzaPo - a.b.marzaPo, pct, true);
    html += rowVs('Oproc. po 5l (z WIBOR)', +a.c.oprocPo, +b.c.oprocPo, +b.c.oprocPo - +a.c.oprocPo, pct, true);
    html += rowVs('Koszty 5 lat łącznie', a.c.koszty5, b.c.koszty5, k5Diff, fmt, true);
    html += rowVs('Rata po 5 latach', a.c.rataPo, b.c.rataPo, rataPoDiff, fmt, true);
    var totA = a.c.koszty5 + a.c.rataPo * Math.max(0, gp().okres - 60);
    var totB = b.c.koszty5 + b.c.rataPo * Math.max(0, gp().okres - 60);
    html += rowVs('Szacunkowy koszt całkowity', totA, totB, totB - totA, fmt, true);
    var winner = totB > totA ? a : (totA > totB ? b : null);
    if (winner) {
      var savedFinal = Math.abs(totB - totA);
      html += '<div class="pkh-vs-winner"><strong>' + winner.b.nazwa + '</strong> jest tańszy o <strong>' + fmt(savedFinal) + '</strong> w całym okresie spłaty.</div>';
    }
    return html;
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
    // edit panels: toggle open / remove addon
    root.querySelector('#pkh-edit-panels').addEventListener('click', function (e) {
      var rmBtn = e.target.closest('[data-rm-btn]');
      if (rmBtn) {
        var parts = rmBtn.dataset.rmBtn.split('|');
        var b = findBank(parts[0]);
        if (b) { b[parts[1]] = false; renderEditPanels(); render(true); }
        return;
      }
      var head = e.target.closest('.pkh-eph');
      if (!head) return;
      var id = head.dataset.toggle;
      openPanels[id] = !openPanels[id];
      renderEditPanels();
    });
    // edit panels: add-addon dropdown
    root.querySelector('#pkh-edit-panels').addEventListener('change', function (e) {
      var sel = e.target;
      if (!sel.dataset || !sel.dataset.add) return;
      var b = findBank(sel.dataset.add);
      if (!b || !sel.value) return;
      b[sel.value] = true;
      renderEditPanels();
      render(true);
    });
    // edit panels: field updates
    root.querySelector('#pkh-edit-panels').addEventListener('input', function (e) {
      var t = e.target;
      if (!t.dataset || !t.dataset.upd) return;
      var parts = t.dataset.upd.split('|');
      var b = findBank(parts[0]);
      if (!b) return;
      if (parts[2] === 'bool')       b[parts[1]] = t.checked;
      else if (parts[2] === 'radio') b[parts[1]] = t.value;
      else if (parts[2] === 'str')   b[parts[1]] = t.value;
      else                           b[parts[1]] = +t.value;
      // Re-render selector + render results. Skip edit-panel rebuild on text
      // input to keep focus on the input being edited.
      if (parts[1] === 'nazwa') renderSelector();
      // Structural changes re-render the whole panel so newly-revealed
      // inputs show up. Everything else (typing into a number field) MUST
      // skip the panel re-render — otherwise focus jumps after each keystroke
      // and the user has to click back into the input for every digit.
      var structural = (parts[1] === 'typ' || parts[1] === 'kartyKredytowe' || parts[1] === 'ubZewZycieOn' || parts[1] === 'ubZewNieruchOn' || parts[1] === 'kartaOn');
      render(!structural);
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
    // WIBOR scenario presets — click card body to apply, edit input to change preset value
    root.querySelectorAll('.pkh-wp').forEach(function (card) {
      // Clicking the card (outside input) applies the scenario
      card.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT') return; // edit, not select
        var s = card.dataset.s;
        var input = root.querySelector('.pkh-wp-val[data-s="' + s + '"]');
        root.querySelector('#pkh-wibor').value = input.value;
        root.querySelectorAll('.pkh-wp').forEach(function (c) { c.classList.toggle('on', c === card); });
        render();
      });
    });
    // Editing the preset value — re-apply if it's the currently active scenario
    root.querySelectorAll('.pkh-wp-val').forEach(function (input) {
      input.addEventListener('input', function () {
        var card = input.closest('.pkh-wp');
        if (card.classList.contains('on')) {
          root.querySelector('#pkh-wibor').value = input.value;
          render();
        }
      });
    });
    // Presentation mode toggle
    var presBtn = root.querySelector('#pkh-pres');
    var presLabel = presBtn ? presBtn.querySelector('span.pkh-tbtn-label') : null;
    function updatePresBtn() {
      if (!presBtn) return;
      var on = root.classList.contains('pkh-presentation');
      presBtn.classList.toggle('on', on);
      var lbl = presBtn.querySelector('.pkh-tbtn-label');
      if (lbl) lbl.textContent = on ? 'Wyjdź z prezentacji' : 'Prezentacja';
      presBtn.title = on ? 'Wyjdź z trybu prezentacyjnego' : 'Tryb prezentacyjny — schowaj edycję';
    }
    if (presBtn) {
      presBtn.addEventListener('click', function () {
        root.classList.toggle('pkh-presentation');
        updatePresBtn();
      });
      // Esc to exit
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && root.classList.contains('pkh-presentation')) {
          root.classList.remove('pkh-presentation');
          updatePresBtn();
        }
      });
    }
    // Print / PDF — show preflight modal asking for expert info
    var printBtn = root.querySelector('#pkh-print');
    if (printBtn) {
      printBtn.addEventListener('click', function () { openPrintModal(); });
    }
    wirePrintModal();
  }

  function defaultBanks() {
    // Universal template — names are placeholders ("Bank 1"..6) and can be
    // renamed in the edit panel. All banks share the same starting values
    // (ERSTE template) so the advisor sees a neutral baseline.
    var template = { typ: 'stale', marza5: 5.55, marzaPo: 1.70,
                     ubZycie: 0.35, ubNieruch: 0.90,
                     ubZycieOsoby: 1,         // 1 lub 2 (kredytobiorców)
                     ubNieruchBase: 'nieruch', // 'kredyt' | 'nieruch'
                     rezUbZycie: 0.200, rezUbNieruch: 0.100, rezKarta: 0.100,
                     kartaKosztMies: 50,       // miesięczny koszt karty (PLN)
                     ubZewZycieKwota: 0,       // kwota mies. ub. życia zewn. (PLN)
                     ubZewNieruchKwota: 0,     // kwota mies. ub. nieruch. zewn. (PLN)
                     // Wymagania banku — domyślnie żadne
                     ubZycieOn: false, ubNieruchOn: false, kartyKredytowe: false,
                     ubZewZycieOn: false, ubZewNieruchOn: false, kartaOn: true,
                     znizka: 0 };
    var out = [];
    for (var i = 1; i <= 3; i++) {
      out.push(Object.assign({}, template, {
        id: 'bank' + i,
        nazwa: 'Bank ' + i,
        active: true,
        kolor: COLORS[(i - 1) % COLORS.length]
      }));
    }
    return out;
  }

  /* ── PRINT preflight modal ── */
  function ensurePrintModal() {
    if (root.querySelector('#pkh-print-modal')) return;
    var html = '<div id="pkh-print-modal" class="pkh-pmodal">'
      +   '<div class="pkh-pmbox">'
      +     '<div class="pkh-pmhdr">'
      +       '<h3>Drukuj / zapisz jako PDF</h3>'
      +       '<button type="button" class="pkh-pmclose" aria-label="Zamknij">×</button>'
      +     '</div>'
      +     '<div class="pkh-pmbody">'
      +       '<p class="pkh-pmnote">Te dane pojawią się w nagłówku wydruku/PDF. Możesz zostawić puste.</p>'
      +       '<div class="pkh-ef"><label>Imię i nazwisko eksperta</label><input type="text" id="pkh-pi-name" placeholder="np. Łukasz Wojda"></div>'
      +       '<div class="pkh-ef"><label>Telefon</label><input type="tel" id="pkh-pi-phone" placeholder="np. +48 509 361 982"></div>'
      +       '<div class="pkh-ef"><label>Uwaga dla klienta (opcjonalnie)</label><textarea id="pkh-pi-note" rows="3" placeholder="np. Wyliczenia ważne do 31.12.2026. Dla finalnej oferty wymagana decyzja kredytowa."></textarea></div>'
      +     '</div>'
      +     '<div class="pkh-pmfoot">'
      +       '<button type="button" class="pkh-pmbtn pkh-pmbtn-out" id="pkh-pm-cancel">Anuluj</button>'
      +       '<button type="button" class="pkh-pmbtn pkh-pmbtn-pri" id="pkh-pm-print">Drukuj / PDF</button>'
      +     '</div>'
      +   '</div>'
      + '</div>';
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    root.appendChild(tmp.firstChild);
  }
  function openPrintModal() {
    ensurePrintModal();
    // restore last entered values
    var saved;
    try { saved = JSON.parse(localStorage.getItem('pkh-expert-info') || '{}'); } catch (e) { saved = {}; }
    root.querySelector('#pkh-pi-name').value  = saved.name  || '';
    root.querySelector('#pkh-pi-phone').value = saved.phone || '';
    root.querySelector('#pkh-pi-note').value  = saved.note  || '';
    root.querySelector('#pkh-print-modal').classList.add('open');
  }
  function closePrintModal() {
    var m = root.querySelector('#pkh-print-modal');
    if (m) m.classList.remove('open');
  }
  function wirePrintModal() {
    ensurePrintModal();
    root.querySelector('.pkh-pmclose').addEventListener('click', closePrintModal);
    root.querySelector('#pkh-pm-cancel').addEventListener('click', closePrintModal);
    root.querySelector('#pkh-print-modal').addEventListener('click', function (e) {
      if (e.target.id === 'pkh-print-modal') closePrintModal();
    });
    root.querySelector('#pkh-pm-print').addEventListener('click', function () {
      var name  = root.querySelector('#pkh-pi-name').value.trim();
      var phone = root.querySelector('#pkh-pi-phone').value.trim();
      var note  = root.querySelector('#pkh-pi-note').value.trim();
      try { localStorage.setItem('pkh-expert-info', JSON.stringify({ name: name, phone: phone, note: note })); } catch (e) {}
      closePrintModal();

      var p = gp();
      var sorted = getSorted();
      var today = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

      function summCard(label, val, color) {
        return '<div style="background:#fff;padding:12px 14px">'
          + '<div style="font-size:10px;color:#6E7A8C;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3px">' + label + '</div>'
          + '<div style="font-family:Georgia,serif;font-size:20px;font-weight:700;color:' + (color||'#0D2240') + ';font-variant-numeric:tabular-nums;line-height:1.1">' + val + '</div>'
          + '</div>';
      }

      var cardsHtml = sorted.map(function (item, i) {
        var b = item.b, c = item.c;
        var iB = i === 0, iW = i === sorted.length - 1 && sorted.length > 1;
        var badgeHtml = iB
          ? '<span style="background:#3B6D11;color:#fff;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:600;margin-left:auto;flex-shrink:0">Najlepsza</span>'
          : iW ? '<span style="background:#A32D2D;color:#fff;font-size:10px;padding:3px 9px;border-radius:999px;font-weight:600;margin-left:auto;flex-shrink:0">Najwyższa</span>' : '';
        var borderStyle = iB ? '2px solid #3B6D11' : iW ? '2px solid #A32D2D' : '1px solid #E4DFD2';
        var bgStyle = iB ? 'background:linear-gradient(180deg,#F4FAEC 0%,#fff 60%)' : 'background:#fff';
        function row(label, val, cls) {
          var color = cls === 'g' ? '#3B6D11' : cls === 'r' ? '#A32D2D' : '#0D2240';
          return '<tr><td style="color:#6E7A8C;font-size:12px;padding:5px 0;white-space:nowrap">' + label + '</td>'
               + '<td style="font-weight:600;text-align:right;font-size:12px;color:' + color + ';font-variant-numeric:tabular-nums;padding-left:12px">' + val + '</td></tr>';
        }
        return '<div style="border:' + borderStyle + ';border-radius:12px;padding:16px;' + bgStyle + ';break-inside:avoid;page-break-inside:avoid">'
          + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid #E4DFD2;flex-wrap:wrap">'
            + '<span style="width:12px;height:12px;border-radius:50%;background:' + b.kolor + ';flex-shrink:0;display:inline-block"></span>'
            + '<span style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#0D2240">' + b.nazwa + '</span>'
            + badgeHtml
          + '</div>'
          + '<table style="width:100%;border-collapse:collapse">'
            + row('Rata całkowita', fmt(c.rataTotal), iB ? 'g' : iW ? 'r' : '')
            + row('Rata bazowa', fmt(c.rataBase), '')
            + (c.ubZycieMies > 0 ? row('Ub. życie', fmt(c.ubZycieMies), '') : '')
            + (c.ubNieruchMies > 0 ? row('Ub. nieruchomości', fmt(c.ubNieruchMies), '') : '')
            + '<tr><td colspan="2" style="padding:7px 0 3px;font-size:10px;font-weight:600;color:#A8893A;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #E4DFD2">Oprocentowanie</td></tr>'
            + (b.typ === 'stale' ? row('Oprocent. 5 lat (stałe)', c.oproc5 + '%', '') : '')
            + row(b.typ === 'zmienne' ? 'Marża (zmienna)' : 'Marża (po 5 latach)', b.marzaPo.toFixed(2) + '%', '')
            + row('Oprocent. ' + (b.typ === 'zmienne' ? '(marża+WIBOR)' : 'po 5l (z WIBOR)'), c.oprocPo + '%', '')
            + (b.znizka > 0 ? row('Zniżka eksperta', '-' + b.znizka.toFixed(2) + ' p.p.', 'g') : '')
            + '<tr><td colspan="2" style="padding:7px 0 3px;font-size:10px;font-weight:600;color:#A8893A;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #E4DFD2">Koszty</td></tr>'
            + row('Koszty 5 lat łącznie', fmt(c.koszty5), '')
            + row('Rata po 5 latach', fmt(c.rataPo), '')
            + row('LTV', c.ltv + '%', '')
          + '</table>'
          + (b.notatka ? '<div style="font-size:11px;color:#2C3E5C;background:#FBF6E6;border:1px solid rgba(201,168,76,0.3);border-radius:6px;padding:7px 10px;margin-top:10px;line-height:1.5">' + b.notatka.replace(/[<>]/g,'') + '</div>' : '')
          + '</div>';
      }).join('');

      var rates = sorted.map(function(x){ return x.c.rataTotal; });
      var k5arr = sorted.map(function(x){ return x.c.koszty5; });
      var minR = Math.min.apply(null, rates), maxR = Math.max.apply(null, rates);
      var minK = Math.min.apply(null, k5arr), maxK = Math.max.apply(null, k5arr);

      var summaryHtml = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#E4DFD2;border:1px solid #E4DFD2;border-radius:10px;overflow:hidden;margin-bottom:20px">'
        + summCard('Najlepsza rata', fmt(minR), '#3B6D11')
        + summCard('Najwyższa rata', fmt(maxR), '#A32D2D')
        + summCard('Różnica rat', fmt(maxR - minR), '')
        + summCard('Najniższe koszty 5l', fmtK(minK), '#3B6D11')
        + summCard('Najwyższe koszty 5l', fmtK(maxK), '#A32D2D')
        + summCard('Oszczędność 5l', fmtK(maxK - minK), '')
        + '</div>';

      var paramsHtml = '<table style="font-size:11px;color:#6E7A8C;margin-bottom:16px;border-collapse:collapse"><tr>'
        + '<td style="padding-right:20px">Kwota: <strong style="color:#0D2240">' + fmt(p.kwota) + '</strong></td>'
        + '<td style="padding-right:20px">Okres: <strong style="color:#0D2240">' + p.okres + ' mies.</strong></td>'
        + '<td style="padding-right:20px">WIBOR 3M: <strong style="color:#0D2240">' + p.wibor + '%</strong></td>'
        + '<td>LTV: <strong style="color:#0D2240">' + (p.kwota / p.wartosc * 100).toFixed(1) + '%</strong></td>'
        + '</tr></table>';

      var printWin = window.open('', '_blank', 'width=920,height=750');
      if (!printWin) { alert('Zezwól na otwieranie okien popup dla tej strony i spróbuj ponownie.'); return; }

      printWin.document.write('<!doctype html><html lang="pl"><head><meta charset="utf-8">'
        + '<title>Porownanie ofert — Sprawdzony Ekspert Kredytowy</title>'
        + '<link rel="preconnect" href="https://fonts.googleapis.com">'
        + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap">'
        + '<style>'
        + '*{box-sizing:border-box;margin:0;padding:0}'
        + 'body{font-family:"DM Sans",system-ui,sans-serif;font-size:13px;color:#0D2240;background:#fff;padding:22px 26px}'
        + '.ph{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:14px;border-bottom:2.5px solid #C9A84C;margin-bottom:18px;gap:16px}'
        + '.ph-title{font-family:"Playfair Display",Georgia,serif;font-size:22px;font-weight:700;color:#0D2240}'
        + '.ph-sub{font-size:11px;color:#6E7A8C;letter-spacing:0.06em;text-transform:uppercase;margin-top:4px}'
        + '.ph-meta{text-align:right;font-size:12px;color:#2C3E5C;line-height:1.6}'
        + '.ph-meta .bold{font-size:13px;font-weight:600;color:#0D2240}'
        + '.cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:20px}'
        + '.footer{margin-top:16px;padding-top:12px;border-top:1px solid #E4DFD2;font-size:11px;color:#6E7A8C;line-height:1.5}'
        + '.disclaimer{font-size:10px;color:#9AA3AE;margin-top:6px;line-height:1.4}'
        + '@media print{@page{margin:8mm 7mm;size:A4}body{padding:0 4mm}}'
        + '</style></head><body>'
        + '<div class="ph">'
          + '<div>'
            + '<div class="ph-title">Sprawdzony Ekspert Kredytowy</div>'
            + '<div class="ph-sub">Porównanie ofert kredytowych</div>'
          + '</div>'
          + '<div class="ph-meta">'
            + '<div>' + today + '</div>'
            + (name ? '<div class="bold">' + name + '</div>' : '')
            + (phone ? '<div>' + phone + '</div>' : '')
          + '</div>'
        + '</div>'
        + paramsHtml
        + summaryHtml
        + '<div class="cards-grid">' + cardsHtml + '</div>'
        + '<div class="footer">'
          + (note ? '<div style="margin-bottom:6px"><strong>Uwagi:</strong> ' + note.replace(/[<>]/g, '') + '</div>' : '')
          + '<div class="disclaimer">Wyliczenia mają charakter informacyjny i opierają się na danych wprowadzonych przez eksperta. Ostateczne warunki kredytu zależą od decyzji banku. Sprawdzony Ekspert Kredytowy · kontakt@sprawdzonyekspertkredytowy.pl · 509 361 982</div>'
        + '</div>'
        + '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},400);}</scr' + 'ipt>'
        + '</body></html>');
      printWin.document.close();
    });;
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
