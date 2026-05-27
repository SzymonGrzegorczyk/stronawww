// ============================================================================
// Kalkulator kredytowy — advanced widget
// Adapted from WordPress shortcode `kalkulator_kredytowy_render`.
// Restyled to Sprawdzony Ekspert Kredytowy brand (navy + gold + cream).
// Mount with: window.mountKKCalculator(el)
// ============================================================================

(function () {
  if (window.__kkCalcDefined) return;
  window.__kkCalcDefined = true;

  // -- BRAND-RESTYLED CSS ------------------------------------------------------
  var CSS = `
#kk-root *,#kk-root *::before,#kk-root *::after{box-sizing:border-box;margin:0;padding:0}
#kk-root{
  --kb50:#FBF6E6;          /* light gold tint (was light blue) */
  --kb100:rgba(201,168,76,0.28);
  --kb400:#C9A84C;         /* gold */
  --kb600:#A8893A;         /* gold deep */
  --kb800:#0D2240;         /* navy */
  --kb900:#081628;         /* navy deep */
  --kt50:#EAF3DE;
  --kt100:#C8E2B5;
  --kt400:#3B6D11;
  --kt600:#2F5610;
  --kt800:#0D2240;         /* result strip uses navy, not teal */
  --kg50:#F9F7F2;          /* cream */
  --kg100:#E4DFD2;         /* line */
  --kg400:#8A8579;
  --kg600:#5F5A50;
  --kg900:#0D2240;         /* ink = navy */
  --ka50:#FBF1D8;
  --ka400:#A8893A;
  --ka600:#7A6224;
  --kr50:#FCEBEB;
  --kr400:#A32D2D;
  --kr600:#7A2222;
  --kgr50:#EAF3DE;
  --kgr400:#3B6D11;
  --kgr600:#2F5610;
  font-family:'DM Sans', 'Inter', system-ui, sans-serif;
  color:var(--kg900);
  max-width:100%;
  overflow-x:hidden;
}
#kk-root .kk-hdr{
  background:linear-gradient(135deg,#1A3D6B 0%,#081628 100%);
  color:#fff;padding:30px 34px;border-radius:18px 18px 0 0;
  position:relative;overflow:hidden;margin-bottom:0;
  border:1px solid rgba(201,168,76,0.22);
  border-bottom:0;
}
#kk-root .kk-hdr::before{
  content:'';position:absolute;right:-60px;top:-60px;width:280px;height:280px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%);
}
#kk-root .kk-hdr .kk-eyebrow{
  font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
  color:#C9A84C;font-weight:500;margin-bottom:8px;position:relative;z-index:1;
}
#kk-root .kk-hdr h2{
  font-family:'Playfair Display', Georgia, serif;
  font-size:26px;font-weight:700;letter-spacing:-0.01em;
  position:relative;z-index:1;color:#fff;margin:0;line-height:1.15;
}
#kk-root .kk-hdr p{font-size:13px;color:rgba(249,247,242,0.65);margin-top:8px;font-weight:400;position:relative;z-index:1;line-height:1.55}

#kk-root .kk-shell{
  background:#fff;border:1px solid var(--kg100);border-top:0;
  border-radius:0 0 18px 18px;
  padding:24px;
  box-shadow:0 24px 56px rgba(13,34,64,0.12);
}
#kk-root .kk-layout{display:grid;grid-template-columns:320px minmax(0,1fr);gap:22px;align-items:start}
#kk-root .kk-layout > *{min-width:0}


#kk-root .kk-card{background:var(--kg50);border-radius:14px;border:1px solid var(--kg100);overflow:visible;margin-bottom:14px}
#kk-root .kk-card-hdr{padding:14px 18px;border-bottom:1px solid var(--kg100);display:flex;align-items:center;gap:10px;background:#fff}
#kk-root .kk-card-icon{
  width:32px;height:32px;border-radius:8px;
  display:flex;align-items:center;justify-content:center;
  background:var(--kb50);color:var(--kb600);flex-shrink:0;
}
#kk-root .kk-card-title{font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--kg900)}
#kk-root .kk-card-body{padding:18px}

#kk-root .kk-field{margin-bottom:14px}
#kk-root .kk-field:last-child{margin-bottom:0}
#kk-root .kk-field label{display:block;font-size:11px;font-weight:500;color:var(--kg600);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px}
#kk-root .kk-field input[type=number],#kk-root .kk-field select{
  width:100%;padding:11px 12px;border:1px solid var(--kg100);border-radius:8px;
  font-family:'DM Sans', sans-serif;font-size:14px;color:var(--kg900);
  background:#fff;outline:none;-moz-appearance:textfield;
  transition:border-color .15s, box-shadow .15s, background .15s;
}
#kk-root .kk-field input[type=number]::-webkit-inner-spin-button{display:none}
#kk-root .kk-field input[type=number]:focus,#kk-root .kk-field select:focus{
  border-color:var(--kb400);box-shadow:0 0 0 3px rgba(201,168,76,0.15);
}
#kk-root .kk-field input[type=number]{font-variant-numeric:tabular-nums}
#kk-root .kk-field select{cursor:pointer}

#kk-root .kk-chk{
  display:flex;align-items:center;gap:10px;padding:11px 12px;background:#fff;
  border-radius:8px;border:1px solid var(--kg100);cursor:pointer;margin-bottom:14px;
  transition:border-color .15s, background .15s;
}
#kk-root .kk-chk:hover{border-color:var(--kb400)}
#kk-root .kk-chk input[type=checkbox]{width:15px;height:15px;accent-color:var(--kb400);cursor:pointer;flex-shrink:0;margin:0}
#kk-root .kk-chk span{font-size:13px;color:var(--kg900)}

#kk-root .kk-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:11px 16px;border-radius:8px;font-family:'DM Sans', sans-serif;
  font-size:13px;font-weight:600;letter-spacing:0.01em;cursor:pointer;
  border:none;white-space:normal;transition:all .2s;line-height:1.2;
}
#kk-root .kk-btn-primary{
  background:var(--kb400);color:var(--kb800);width:100%;padding:14px;font-size:14px;border-radius:10px;
  box-shadow:0 8px 22px rgba(201,168,76,0.28);
}
#kk-root .kk-btn-primary:hover{background:#E8C97A;transform:translateY(-1px);box-shadow:0 12px 30px rgba(201,168,76,0.36)}
#kk-root .kk-btn-primary:active{transform:translateY(0);background:#A8893A}
#kk-root .kk-btn-outline{
  background:#fff;color:var(--kb800);border:1px solid var(--kg100);font-weight:500;
}
#kk-root .kk-btn-outline:hover{border-color:var(--kb400);color:var(--kb600);background:var(--kb50)}
#kk-root .kk-btn-group{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}

#kk-gpFields{display:none;padding:16px;background:var(--kb50);border-radius:10px;border:1px solid var(--kb100);margin-bottom:14px}
#kk-root .kk-tr-rem{font-size:11px;color:var(--kt600);font-weight:500;margin-top:6px;font-variant-numeric:tabular-nums}

#kk-root .kk-result-card{background:#fff;border-radius:14px;border:1px solid var(--kg100);overflow:visible;width:100%;box-sizing:border-box}
#kk-root .kk-res-empty{padding:64px 20px;text-align:center}
#kk-root .kk-res-empty .kk-ico{
  width:56px;height:56px;border-radius:50%;
  background:var(--kb50);color:var(--kb600);
  display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;
}
#kk-root .kk-res-empty .kk-ico svg{width:26px;height:26px}
#kk-root .kk-res-empty p{font-size:14px;color:var(--kg600);line-height:1.6}
#kk-root .kk-res-empty strong{color:var(--kg900);font-weight:600}

#kk-root .kk-sv-strip{
  background:linear-gradient(135deg,#163459 0%,#081628 100%);
  padding:18px 22px;display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:10px;
}
#kk-root .kk-sv-strip h3{
  font-family:'Playfair Display', Georgia, serif;
  font-size:18px;font-weight:600;color:#fff;margin:0;
}
#kk-root .kk-sv-strip p{font-size:12px;color:rgba(249,247,242,0.65);margin:4px 0 0}
#kk-root .kk-sv-badge{background:var(--kb400);color:var(--kb800);border-radius:999px;padding:5px 12px;font-size:11px;font-weight:600;letter-spacing:0.04em}

#kk-root .kk-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--kg100)}

#kk-root .kk-kpi{background:#fff;padding:16px 18px}
#kk-root .kk-kpi .kk-kl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;font-weight:500;color:var(--kg400);margin-bottom:6px;line-height:1.3}
#kk-root .kk-kpi .kk-kv{font-family:'Playfair Display', Georgia, serif;font-size:22px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums;letter-spacing:-0.01em}
#kk-root .kk-kpi .kk-ks{font-size:11px;color:var(--kg400);margin-top:5px;line-height:1.4}

#kk-root .kk-chart{background:#fff;border-top:1px solid var(--kg100);padding:22px 22px 24px}
#kk-root .kk-chart-title{font-size:10px;text-transform:uppercase;letter-spacing:0.14em;font-weight:600;color:var(--kg600);margin-bottom:18px}
#kk-root .kk-stacked-section{margin-bottom:20px}
#kk-root .kk-stacked-label{font-size:12px;color:var(--kg600);margin-bottom:8px;font-weight:500}
#kk-root .kk-stacked-bar{height:36px;border-radius:8px;overflow:hidden;display:flex;width:100%;border:1px solid var(--kg100)}
#kk-root .kk-stacked-seg{height:100%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;font-variant-numeric:tabular-nums;color:#fff;overflow:hidden;white-space:nowrap;min-width:0;transition:width .8s cubic-bezier(.23,1,.32,1)}
#kk-root .kk-seg-cap{background:var(--kb800)}
#kk-root .kk-seg-int{background:var(--kr400)}
#kk-root .kk-seg-save{background:var(--kgr400)}
#kk-root .kk-stacked-legend{display:flex;flex-wrap:wrap;gap:10px;margin-top:9px}
#kk-root .kk-leg-item{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--kg600)}
#kk-root .kk-leg-dot{width:10px;height:10px;border-radius:2px;flex-shrink:0}

#kk-root .kk-scen-rows{display:flex;flex-direction:column;gap:10px}
#kk-root .kk-scen-row{display:flex;align-items:center;gap:12px}
#kk-root .kk-scen-lbl{font-size:11px;color:var(--kg600);width:140px;flex-shrink:0;line-height:1.3}
#kk-root .kk-scen-track{flex:1;background:var(--kg100);border-radius:6px;height:28px;overflow:hidden}
#kk-root .kk-scen-fill{height:100%;border-radius:6px;display:flex;align-items:center;padding:0 9px;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums;color:#fff;min-width:0;overflow:hidden;white-space:nowrap;transition:width .8s cubic-bezier(.23,1,.32,1)}
#kk-root .kk-sf-base{background:var(--kb800)}
#kk-root .kk-sf-reduce{background:var(--ka400)}
#kk-root .kk-sf-keep{background:var(--kgr400)}
#kk-root .kk-scen-amt{font-size:10px;font-variant-numeric:tabular-nums;color:var(--kg600);width:50px;text-align:right;flex-shrink:0}

#kk-root .kk-highlight{
  display:flex;align-items:center;gap:14px;background:var(--kgr50);
  border:1px solid #C8E2B5;border-radius:10px;padding:14px 18px;margin-top:16px;flex-wrap:wrap;
}
#kk-root .kk-highlight .kk-hico{
  width:42px;height:42px;border-radius:50%;background:var(--kgr400);color:#fff;
  display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;
}
#kk-root .kk-highlight .kk-hval{font-family:'Playfair Display', Georgia, serif;font-size:22px;font-weight:700;color:var(--kt600);font-variant-numeric:tabular-nums;letter-spacing:-0.01em}
#kk-root .kk-highlight .kk-hlbl{font-size:12px;color:var(--kg600);margin-top:3px}

#kk-root .kk-rate-pills{display:flex;flex-wrap:wrap;gap:6px;padding:12px 22px;border-bottom:1px solid var(--kg100);background:var(--kg50)}
#kk-root .kk-rate-pill{font-size:11px;font-variant-numeric:tabular-nums;padding:4px 10px;border-radius:999px;font-weight:600;letter-spacing:0.02em}

#kk-root .kk-simple-sum{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--kg100);border-bottom:1px solid var(--kg100)}

#kk-root .kk-sbox{background:#fff;padding:16px 18px}
#kk-root .kk-sbox .kk-sl{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;font-weight:500;color:var(--kg400);margin-bottom:5px}
#kk-root .kk-sbox .kk-sv{font-family:'Playfair Display', Georgia, serif;font-size:22px;font-weight:700;color:var(--kb800);font-variant-numeric:tabular-nums;letter-spacing:-0.01em;line-height:1.1}
#kk-root .kk-sbox .kk-sv-red{color:var(--kr400)}

#kk-root .kk-tbl-wrap{overflow-x:auto;overflow-y:auto;-webkit-overflow-scrolling:touch;max-height:560px;padding:0 0 14px;position:relative;border:1px solid var(--kg100);border-radius:8px;width:100%;display:block;box-sizing:border-box}
#kk-root table.kk-amort{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;min-width:780px}
#kk-root table.kk-amort col.kk-c-m{width:62px}
#kk-root table.kk-amort col.kk-c-amt{width:auto}
#kk-root table.kk-amort col.kk-c-extra{width:110px}
#kk-root table.kk-amort thead th{padding:11px 14px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;font-weight:600;color:var(--kg600);background:var(--kg50);border-bottom:1px solid var(--kg100);white-space:nowrap;position:sticky;top:0;z-index:5;box-shadow:0 1px 0 var(--kg100)}
#kk-root table.kk-amort th:first-child{text-align:center}
#kk-root table.kk-amort td{padding:9px 14px;text-align:right;font-variant-numeric:tabular-nums;font-size:12.5px;border-bottom:1px solid rgba(13,34,64,0.04);color:var(--kg900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#kk-root table.kk-amort td:first-child{text-align:center;font-weight:500;color:var(--kg600);font-size:11px}
#kk-root table.kk-amort tbody tr:hover{background:var(--kb50)}
#kk-root table.kk-amort .kk-ci{color:var(--kr400)}
#kk-root table.kk-amort .kk-cp{color:var(--kt600)}
#kk-root table.kk-amort .kk-co{color:var(--ka400);font-weight:600}
#kk-root table.kk-amort tr[data-rc] td{background:var(--ka50)!important}

#kk-root .kk-modal{display:none;position:fixed;z-index:99999;inset:0;background:rgba(13,34,64,0.6);backdrop-filter:blur(4px);overflow-y:auto;padding:40px 16px}
#kk-root .kk-mbox{background:#fff;border-radius:16px;width:100%;max-width:460px;margin:0 auto;overflow:hidden;border:1px solid var(--kg100);box-shadow:0 24px 56px rgba(13,34,64,0.18)}
#kk-root .kk-mhdr{padding:18px 20px;border-bottom:1px solid var(--kg100);display:flex;align-items:center;justify-content:space-between;background:var(--kg50)}
#kk-root .kk-mhdr h3{font-family:'Playfair Display', Georgia, serif;font-size:18px;font-weight:700;margin:0;color:var(--kg900);letter-spacing:-0.01em}
#kk-root .kk-mclose{width:30px;height:30px;border-radius:8px;background:#fff;border:1px solid var(--kg100);cursor:pointer;color:var(--kg600);display:flex;align-items:center;justify-content:center;font-size:16px;line-height:1}
#kk-root .kk-mclose:hover{background:var(--kr50);color:var(--kr400);border-color:#F1C7C7}
#kk-root .kk-mbody{padding:20px;max-height:calc(100vh - 220px);overflow-y:auto}
#kk-root .kk-mfoot{padding:16px 20px;border-top:1px solid var(--kg100);background:var(--kg50)}
#kk-root .kk-mfoot .kk-btn{width:100%}

#kk-root .kk-erow{background:var(--kg50);border:1px solid var(--kg100);border-radius:10px;padding:14px;margin-bottom:12px;position:relative}
#kk-root .kk-erow .kk-field{margin-bottom:10px}
#kk-root .kk-erow .kk-field:last-child{margin-bottom:0}
#kk-root .kk-erow .kk-field input,#kk-root .kk-erow .kk-field select{background:#fff}
#kk-root .kk-rmbtn{position:absolute;top:10px;right:10px;background:var(--kr50);border:none;border-radius:6px;color:var(--kr400);font-size:11px;font-weight:500;padding:4px 9px;cursor:pointer;font-family:'DM Sans',sans-serif}
#kk-root .kk-rmbtn:hover{background:#F4C4C4}

#kk-root .kk-strat-note{font-size:11px;padding:8px 11px;border-radius:7px;margin-top:7px;line-height:1.55}
#kk-root .kk-sn-shorten{background:var(--kb50);color:var(--kb600)}
#kk-root .kk-sn-reduce{background:var(--ka50);color:var(--ka600)}

#kk-root .kk-keep-opt{display:none;margin-top:10px;padding:10px 12px;background:#fff;border:1px solid var(--kt100);border-radius:8px}
#kk-root .kk-keep-opt label{display:flex;align-items:flex-start;gap:9px;cursor:pointer}
#kk-root .kk-keep-opt input[type=checkbox]{width:14px;height:14px;margin-top:2px;accent-color:var(--kt600);flex-shrink:0}
#kk-root .kk-ko-txt{font-size:11px;color:var(--kg900);line-height:1.55}
#kk-root .kk-ko-txt strong{display:block;font-size:11px;font-weight:600;color:var(--kt600);margin-bottom:3px}

#kk-root .kk-add-btn{
  display:flex;align-items:center;justify-content:center;gap:6px;
  padding:10px 14px;background:#fff;border:1px dashed var(--kg100);border-radius:8px;
  color:var(--kb600);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
  cursor:pointer;width:100%;margin-top:4px;transition:all .15s;
}
#kk-root .kk-add-btn:hover{background:var(--kb50);border-color:var(--kb400);border-style:solid}

@media(max-width:900px){
  #kk-root .kk-layout{grid-template-columns:minmax(0,1fr);gap:14px}
}
@media(max-width:600px){
  #kk-root{max-width:100%;overflow:hidden;border-radius:14px}
  #kk-root .kk-hdr{padding:20px 16px;border-radius:14px 14px 0 0}
  #kk-root .kk-hdr h2{font-size:20px}
  #kk-root .kk-shell{padding:12px 10px;border-radius:0 0 14px 14px}
  #kk-root .kk-card-body{padding:12px}
  #kk-root .kk-btn-group{display:flex;flex-direction:column;gap:8px}
  #kk-root .kk-btn,#kk-root .kk-btn-primary{width:100%;max-width:100%;white-space:normal;text-align:center;justify-content:center}
  #kk-root .kk-tbl-wrap{margin:0 -10px;border-radius:0;border-left:0;border-right:0;max-width:100vw}
  #kk-root table.kk-amort{min-width:560px;font-size:11.5px}
  #kk-root table.kk-amort th,#kk-root table.kk-amort td{padding:7px 8px}
  #kk-root .kk-kpis{grid-template-columns:1fr}
  #kk-root .kk-simple-sum{grid-template-columns:1fr}
  #kk-root .kk-btn{width:100%}
  #kk-root .kk-btn-primary{width:100%;font-size:14px}
  #kk-root .kk-field input[type=number],#kk-root .kk-field select{font-size:16px}
  #kk-root .kk-result-card{width:100%;max-width:100%}
  #kk-root .kk-tbl-wrap{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:8px;display:block;box-sizing:border-box}
  #kk-root table.kk-amort{min-width:640px}
  #kk-root table.kk-amort th,#kk-root table.kk-amort td{font-size:11px;padding:6px 8px;white-space:nowrap}
  #kk-root .kk-kpis{grid-template-columns:1fr}
  #kk-root .kk-simple-sum{grid-template-columns:1fr}
}

`;

  // -- HTML TEMPLATE ----------------------------------------------------------
  // Inline SVG icons replace the original emoji for editorial feel.
  var ICO_WALLET = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>';
  var ICO_EMPTY = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
  var ICO_COIN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';

  var HTML = ''
    + '<div class="kk-hdr">'
    +   '<div class="kk-eyebrow">Kalkulator zaawansowany</div>'
    +   '<h2>Kalkulator kredytowy</h2>'
    +   '<p>Harmonogram spłat &middot; Nadpłaty &middot; Analiza oszczędności &middot; Zmiana oprocentowania</p>'
    + '</div>'
    + '<div class="kk-shell">'
    + '<div class="kk-layout">'
    +   '<div>'
    +     '<div class="kk-card">'
    +       '<div class="kk-card-hdr"><div class="kk-card-icon">' + ICO_WALLET + '</div><span class="kk-card-title">Parametry kredytu</span></div>'
    +       '<div class="kk-card-body">'
    +         '<div class="kk-field"><label>Kwota kredytu (PLN)</label><input type="number" id="kk_loanAmount" step="1000" min="0" placeholder="np. 300 000"></div>'
    +         '<div class="kk-field"><label>Oprocentowanie roczne (%)</label><input type="number" id="kk_annualRate" step="0.01" min="0" placeholder="np. 7.50"></div>'
    +         '<div class="kk-field"><label>Okres kredytowania (miesiące)</label><input type="number" id="kk_loanTerm" min="1" max="420" placeholder="np. 240"></div>'
    +         '<div class="kk-field"><label>Prowizja (PLN)</label><input type="number" id="kk_commissionValue" step="0.01" min="0" value="0"></div>'
    +         '<label class="kk-chk"><input type="checkbox" id="kk_commissionCredit"><span>Kredytuj prowizję</span></label>'
    +         '<div class="kk-field"><label>Rodzaj raty</label>'
    +           '<select id="kk_installmentType">'
    +             '<option value="equal">Rata równa (annuitetowa)</option>'
    +             '<option value="decreasing">Rata malejąca</option>'
    +           '</select>'
    +         '</div>'
    +         '<label class="kk-chk" style="margin-bottom:0"><input type="checkbox" id="kk_gracePeriodOption" onchange="kkToggleGP(this)"><span>Włącz karencję</span></label>'
    +       '</div>'
    +     '</div>'
    +     '<div id="kk-gpFields">'
    +       '<div class="kk-field"><label>Okres karencji (miesiące)</label><input type="number" id="kk_gracePeriodMonths" step="1" min="0" max="120" value="0"></div>'
    +       '<div class="kk-field"><label>Liczba transz</label><input type="number" id="kk_numberOfTranches" step="1" min="1" value="1" onchange="kkUpdateTranches()"></div>'
    +       '<div id="kk-trancheContainer">'
    +         '<div class="kk-trancheRow" style="margin-top:8px">'
    +           '<div class="kk-field" style="margin-bottom:4px"><label>Transza 1 &ndash; od miesiąca 1 (PLN)</label><input type="number" class="kk-trancheAmt" step="0.01" min="0" value="0"></div>'
    +           '<div class="kk-tr-rem"></div>'
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="kk-btn-group">'
    +       '<button class="kk-btn kk-btn-outline" onclick="kkOpenPM()">&#8593; Nadpłaty</button>'
    +       '<button class="kk-btn kk-btn-outline" onclick="kkOpenIM()">% Oprocentowanie</button>'
    +     '</div>'
    +     '<button class="kk-btn kk-btn-primary" onclick="kkCalculate()">Oblicz harmonogram &rarr;</button>'
    +   '</div>'
    +   '<div>'
    +     '<div class="kk-result-card">'
    +       '<div class="kk-res-empty" id="kk-resEmpty"><div class="kk-ico">' + ICO_EMPTY + '</div><p>Wypełnij formularz i kliknij<br><strong>Oblicz harmonogram</strong></p></div>'
    +       '<div id="kk-amortResult" style="display:none"></div>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '</div>' /* shell */
    + '<div id="kk-pmModal" class="kk-modal">'
    +   '<div class="kk-mbox">'
    +     '<div class="kk-mhdr"><h3>Nadpłaty</h3><button class="kk-mclose" onclick="kkClosePM()">&#10005;</button></div>'
    +     '<div class="kk-mbody">'
    +       '<div id="kk-pmRows">'
    +         '<div class="kk-erow kk-prepRow">'
    +           '<button class="kk-rmbtn" onclick="kkRemoveRow(this,\'kk-prepRow\')">Usuń</button>'
    +           '<div class="kk-field"><label>Kwota nadpłaty (PLN)</label><input type="number" class="kk-prepAmt" step="0.01" min="0" value="0"></div>'
    +           '<div class="kk-field"><label>Częstotliwość</label><select class="kk-prepFreq" onchange="kkToggleFreq(this)"><option value="one">Jednorazowo</option><option value="monthly">Co miesiąc</option></select></div>'
    +           '<div class="kk-prepOneBox"><div class="kk-field"><label>Numer raty</label><input type="number" class="kk-prepMonth" step="1" min="1" value="1"></div></div>'
    +           '<div class="kk-prepRangeBox" style="display:none">'
    +             '<div class="kk-field"><label>Od miesiąca</label><input type="number" class="kk-prepFrom" step="1" min="1" value="1"></div>'
    +             '<div class="kk-field"><label>Do miesiąca</label><input type="number" class="kk-prepTo" step="1" min="1" value="1"></div>'
    +           '</div>'
    +           '<div class="kk-field">'
    +             '<label>Strategia</label>'
    +             '<select class="kk-prepStrat" onchange="kkOnStratChange(this)"><option value="shorten">Skrócenie okresu</option><option value="reduce">Zmniejszenie raty</option></select>'
    +             '<div class="kk-strat-note kk-sn-shorten">Rata pozostaje ta sama, kredyt spłacasz szybciej.</div>'
    +             '<div class="kk-keep-opt"><label><input type="checkbox" class="kk-keepCb"><div class="kk-ko-txt"><strong>Utrzymaj ratę na poprzednim poziomie</strong>Klient formalnie zmniejsza ratę, ale co miesiąc dopłaca różnicę do pierwotnej wysokości.</div></label></div>'
    +           '</div>'
    +         '</div>'
    +       '</div>'
    +       '<button class="kk-add-btn" onclick="kkAddPrepRow()">+ Dodaj kolejną nadpłatę</button>'
    +     '</div>'
    +     '<div class="kk-mfoot"><button class="kk-btn kk-btn-primary" onclick="kkSaveAndCalc()">Zapisz i oblicz</button></div>'
    +   '</div>'
    + '</div>'
    + '<div id="kk-imModal" class="kk-modal">'
    +   '<div class="kk-mbox">'
    +     '<div class="kk-mhdr"><h3>Zmiana oprocentowania</h3><button class="kk-mclose" onclick="kkCloseIM()">&#10005;</button></div>'
    +     '<div class="kk-mbody">'
    +       '<div id="kk-imRows">'
    +         '<div class="kk-erow kk-irRow">'
    +           '<button class="kk-rmbtn" onclick="kkRemoveRow(this,\'kk-irRow\')">Usuń</button>'
    +           '<div class="kk-field"><label>Miesiąc zmiany</label><input type="number" class="kk-irMonth" step="1" min="1" value="1"></div>'
    +           '<div class="kk-field"><label>Nowe oprocentowanie (%)</label><input type="number" class="kk-irRate" step="0.01" min="0" value="0"></div>'
    +         '</div>'
    +       '</div>'
    +       '<button class="kk-add-btn" onclick="kkAddIRRow()">+ Dodaj kolejną zmianę</button>'
    +     '</div>'
    +     '<div class="kk-mfoot"><button class="kk-btn kk-btn-primary" onclick="kkCloseIM()">Zapisz zmiany</button></div>'
    +   '</div>'
    + '</div>';

  // -- LOGIC (verbatim from source, prefixed kk*) ------------------------------
  var kkRateChangesOn = false;
  var kkRC = [
    { bg: '#FBF1D8', tx: '#A8893A' },
    { bg: '#EAF3DE', tx: '#3B6D11' },
    { bg: '#E6ECF5', tx: '#0D2240' },
    { bg: '#FBEAF0', tx: '#993556' },
    { bg: '#F3E7C3', tx: '#7A6224' },
  ];

  function kkFmt(n) { return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function kkPct(a, b) { return b > 0 ? (a / b * 100).toFixed(1) + '%' : '—'; }
  function kkAnn(rem, r, n) { if (n < 1) return rem; return r === 0 ? rem / n : rem * r / (1 - Math.pow(1 + r, -n)); }
  function kkGetR(m, base, ch) { var r = base; for (var j = 0; j < ch.length; j++) { if (m >= ch[j].month) r = ch[j].rate / 100 / 12; else break; } return r; }
  function kkG(id) { return document.getElementById(id); }

  window.kkToggleGP = function (cb) { kkG('kk-gpFields').style.display = cb.checked ? 'block' : 'none'; };
  window.kkUpdateTranches = function () {
    var n = parseInt(kkG('kk_numberOfTranches').value) || 1;
    var c = kkG('kk-trancheContainer'); c.innerHTML = '';
    for (var i = 1; i <= n; i++) {
      var d = document.createElement('div'); d.className = 'kk-trancheRow'; d.style.marginTop = '8px';
      d.innerHTML = i === 1
        ? '<div class="kk-field" style="margin-bottom:4px"><label>Transza 1 (PLN)</label><input type="number" class="kk-trancheAmt" step="0.01" min="0" value="0"></div><div class="kk-tr-rem"></div>'
        : '<button class="kk-rmbtn" onclick="kkRemoveTranche(this)" style="position:static;display:inline-block;margin-bottom:7px">Usuń</button><div class="kk-field" style="margin-bottom:4px"><label>Transza ' + i + ' (PLN)</label><input type="number" class="kk-trancheAmt" step="0.01" min="0" value="0"></div><div class="kk-field" style="margin-bottom:4px"><label>Aktywacja (miesiąc)</label><input type="number" class="kk-trancheAct" step="1" min="2" value="2"></div><div class="kk-tr-rem"></div>';
      c.appendChild(d);
    }
    kkUpdateTR();
  };
  function kkUpdateTR() {
    var loan = parseFloat(kkG('kk_loanAmount').value) || 0;
    var inp = document.getElementsByClassName('kk-trancheAmt'), s = 0;
    for (var i = 0; i < inp.length; i++) s += parseFloat(inp[i].value) || 0;
    var r = loan - s;
    var spans = document.getElementsByClassName('kk-tr-rem');
    for (var i = 0; i < spans.length; i++) {
      spans[i].textContent = 'Pozostało: ' + r.toFixed(2) + ' PLN';
      spans[i].style.color = r < 0 ? '#A32D2D' : '#3B6D11';
    }
  }
  document.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('kk-trancheAmt')) kkUpdateTR(); });
  window.kkRemoveTranche = function (btn) { btn.closest('.kk-trancheRow').remove(); kkUpdateTR(); };
  window.kkOpenPM = function () { kkG('kk-pmModal').style.display = 'block'; };
  window.kkClosePM = function () { kkG('kk-pmModal').style.display = 'none'; };
  window.kkSaveAndCalc = function () { kkClosePM(); kkCalculate(); };

  function kkPrepRowHtml() {
    return '<button class="kk-rmbtn" onclick="kkRemoveRow(this,\'kk-prepRow\')">Usuń</button><div class="kk-field"><label>Kwota nadpłaty (PLN)</label><input type="number" class="kk-prepAmt" step="0.01" min="0" value="0"></div><div class="kk-field"><label>Częstotliwość</label><select class="kk-prepFreq" onchange="kkToggleFreq(this)"><option value="one">Jednorazowo</option><option value="monthly">Co miesiąc</option></select></div><div class="kk-prepOneBox"><div class="kk-field"><label>Numer raty</label><input type="number" class="kk-prepMonth" step="1" min="1" value="1"></div></div><div class="kk-prepRangeBox" style="display:none"><div class="kk-field"><label>Od miesiąca</label><input type="number" class="kk-prepFrom" step="1" min="1" value="1"></div><div class="kk-field"><label>Do miesiąca</label><input type="number" class="kk-prepTo" step="1" min="1" value="1"></div></div><div class="kk-field"><label>Strategia</label><select class="kk-prepStrat" onchange="kkOnStratChange(this)"><option value="shorten">Skrócenie okresu</option><option value="reduce">Zmniejszenie raty</option></select><div class="kk-strat-note kk-sn-shorten">Rata pozostaje ta sama, kredyt spłacasz szybciej.</div><div class="kk-keep-opt"><label><input type="checkbox" class="kk-keepCb"><div class="kk-ko-txt"><strong>Utrzymaj ratę na poprzednim poziomie</strong>Klient formalnie zmniejsza ratę, ale co miesiąc dopłaca różnicę.</div></label></div></div>';
  }
  window.kkAddPrepRow = function () { var d = document.createElement('div'); d.className = 'kk-erow kk-prepRow'; d.innerHTML = kkPrepRowHtml(); kkG('kk-pmRows').appendChild(d); };
  window.kkRemoveRow = function (btn, cls) { btn.closest('.' + cls).remove(); };
  window.kkToggleFreq = function (sel) {
    var row = sel.closest('.kk-prepRow');
    row.querySelector('.kk-prepOneBox').style.display = sel.value === 'monthly' ? 'none' : 'block';
    row.querySelector('.kk-prepRangeBox').style.display = sel.value === 'monthly' ? 'block' : 'none';
  };
  window.kkOnStratChange = function (sel) {
    var f = sel.closest('.kk-field');
    var note = f.querySelector('.kk-strat-note');
    var ko = f.querySelector('.kk-keep-opt');
    if (sel.value === 'shorten') {
      note.className = 'kk-strat-note kk-sn-shorten';
      note.textContent = 'Rata pozostaje ta sama, kredyt spłacasz szybciej.';
      ko.style.display = 'none';
    } else {
      note.className = 'kk-strat-note kk-sn-reduce';
      note.textContent = 'Rata maleje po każdej nadpłacie.';
      ko.style.display = 'block';
    }
  };

  function kkGetPreps() {
    var out = [], rows = document.getElementsByClassName('kk-prepRow');
    for (var i = 0; i < rows.length; i++) {
      var amt = parseFloat(rows[i].querySelector('.kk-prepAmt').value);
      var freq = rows[i].querySelector('.kk-prepFreq').value;
      var strat = rows[i].querySelector('.kk-prepStrat').value;
      var keepCb = rows[i].querySelector('.kk-keepCb');
      var keep = (strat === 'reduce') && keepCb && keepCb.checked;
      var e = { amt: amt, freq: freq, strat: strat, keep: keep };
      if (freq === 'one') { var m = parseInt(rows[i].querySelector('.kk-prepMonth').value); e.from = m; e.to = m; }
      else { e.from = parseInt(rows[i].querySelector('.kk-prepFrom').value); e.to = parseInt(rows[i].querySelector('.kk-prepTo').value); }
      if (!isNaN(amt) && amt > 0 && !isNaN(e.from) && !isNaN(e.to)) out.push(e);
    }
    return out;
  }

  window.kkOpenIM = function () { kkG('kk-imModal').style.display = 'block'; };
  window.kkCloseIM = function () { kkRateChangesOn = kkGetIR().length > 0; kkG('kk-imModal').style.display = 'none'; };
  window.kkAddIRRow = function () { var d = document.createElement('div'); d.className = 'kk-erow kk-irRow'; d.innerHTML = '<button class="kk-rmbtn" onclick="kkRemoveRow(this,\'kk-irRow\')">Usuń</button><div class="kk-field"><label>Miesiąc zmiany</label><input type="number" class="kk-irMonth" step="1" min="1" value="1"></div><div class="kk-field"><label>Nowe oprocentowanie (%)</label><input type="number" class="kk-irRate" step="0.01" min="0" value="0"></div>'; kkG('kk-imRows').appendChild(d); };
  function kkGetIR() {
    var out = [], rows = document.getElementsByClassName('kk-irRow');
    for (var i = 0; i < rows.length; i++) {
      var m = parseInt(rows[i].querySelector('.kk-irMonth').value);
      var r = parseFloat(rows[i].querySelector('.kk-irRate').value);
      if (!isNaN(m) && m > 0 && !isNaN(r)) out.push({ month: m, rate: r });
    }
    return out.sort(function (a, b) { return a.month - b.month; });
  }

  function kkBaseline(loan, annRate, term, type) {
    var base = annRate / 100 / 12, ch = kkRateChangesOn ? kkGetIR() : [];
    var rem = loan, tp = 0, ti = 0;
    for (var m = 1; m <= term; m++) {
      var r = kkGetR(m, base, ch);
      var interest = rem * r, principal, payment;
      if (type === 'equal') { payment = kkAnn(rem, r, term - m + 1); principal = payment - interest; }
      else { principal = loan / term; payment = principal + interest; }
      if (m === term && rem > 0) { principal = rem; payment = interest + principal; }
      rem = Math.max(0, rem - principal); tp += payment; ti += interest;
    }
    return { tp: tp, ti: ti, months: term };
  }

  function kkRunSim(loan, annRate, term, type, preps, origFixed) {
    var base = annRate / 100 / 12, ch = kkRateChangesOn ? kkGetIR() : [];
    var rows = '', tp = 0, ti = 0, rem = loan, totalOverpay = 0, months = 0;
    var anyEarly = preps.some(function (e) { return e.strat === 'shorten' || e.keep; });
    var maxM = anyEarly ? term + 600 : term;
    // "Skrócenie okresu" lock: once we've made a shorten/keep prepayment, the
    // monthly installment must stay at this locked amount even after rem drops.
    // Otherwise the standard kkAnn() recalc would shrink the installment and
    // the "shorten" effect would not materialise.
    var lockedPayment = origFixed; // current locked installment (equal-only)
    var prevR = base;
    for (var m = 1; m <= maxM && rem > 0.005; m++) {
      var r = kkGetR(m, base, ch);
      var rcIdx = -1;
      if (kkRateChangesOn) { var chx = kkGetIR(); for (var j = 0; j < chx.length; j++) { if (chx[j].month === m) { rcIdx = j; break; } } }
      // Re-lock annuity on rate change (so a new WIBOR drives a new installment)
      if (type === 'equal' && Math.abs(r - prevR) > 1e-12) {
        lockedPayment = kkAnn(rem, r, Math.max(1, term - m + 1));
        prevR = r;
      }
      var eShorten = 0, eReduce = 0, eKeepAmt = 0, hasKeep = false;
      for (var pi = 0; pi < preps.length; pi++) {
        var p = preps[pi];
        if (m >= p.from && m <= p.to) {
          if (p.strat === 'shorten') eShorten += p.amt;
          else if (p.strat === 'reduce' && !p.keep) eReduce += p.amt;
          else if (p.strat === 'reduce' && p.keep) { hasKeep = true; eKeepAmt += p.amt; }
        }
      }
      // Apply prepayments to remaining principal
      if (eReduce > 0) {
        rem = Math.max(0, rem - eReduce); totalOverpay += eReduce;
        // "Zmniejszenie raty" — recompute lockedPayment to drop the installment
        if (type === 'equal') lockedPayment = kkAnn(rem, r, Math.max(1, term - m + 1));
      }
      if (eKeepAmt > 0) {
        rem = Math.max(0, rem - eKeepAmt); totalOverpay += eKeepAmt;
        // "Utrzymanie raty" — DO NOT change lockedPayment (we keep paying origFixed)
      }
      // Shorten prepayment: rem is dropped, lockedPayment stays unchanged
      if (eShorten > 0) {
        rem = Math.max(0, rem - eShorten); totalOverpay += eShorten;
        // lockedPayment unchanged → shorter actual horizon
      }
      var interest = rem * r;
      var principal, payment, extraDisplay = 0;
      if (type === 'equal') {
        if (hasKeep) {
          payment = origFixed;
          principal = payment - interest;
          if (principal > rem) { principal = rem; payment = interest + principal; }
          extraDisplay = eKeepAmt;
        } else {
          payment = lockedPayment;
          principal = payment - interest;
          if (principal > rem) { principal = rem; payment = interest + principal; }
          extraDisplay = eReduce + eShorten;
        }
      } else {
        var basePrincipal = loan / term;
        var xtra = 0;
        if (hasKeep) {
          var np = basePrincipal + rem * r;
          xtra = Math.max(0, origFixed - np);
          totalOverpay += xtra;
          extraDisplay = eKeepAmt + xtra;
        } else {
          extraDisplay = eReduce + eShorten;
        }
        principal = Math.min(basePrincipal + xtra, rem);
        payment = principal + interest;
      }
      var attr = rcIdx >= 0 ? ' data-rc' : '';
      rows += '<tr' + attr + '><td>' + m + '</td><td>' + kkFmt(rem) + '</td><td>' + kkFmt(payment) + '</td><td class="kk-cp">' + kkFmt(principal) + '</td><td class="kk-ci">' + kkFmt(interest) + '</td><td class="kk-co">' + (extraDisplay > 0.005 ? kkFmt(extraDisplay) : '—') + '</td>';
      rem = Math.max(0, rem - principal);
      rows += '<td>' + kkFmt(rem) + '</td></tr>';
      tp += payment; ti += interest; months = m;
    }
    return { rows: rows, tp: tp, ti: ti, months: months, totalOverpay: totalOverpay };
  }

  function kkKpi(label, value, sub, color) {
    var cs = '';
    if (color === 'tel') cs = 'color:#3B6D11';
    if (color === 'red') cs = 'color:#A32D2D';
    if (color === 'blu') cs = 'color:#0D2240';
    if (color === 'gry') cs = 'color:#5F5A50';
    return '<div class="kk-kpi"><div class="kk-kl">' + label + '</div><div class="kk-kv" style="' + cs + '">' + value + '</div>' + (sub ? '<div class="kk-ks">' + sub + '</div>' : '') + '</div>';
  }
  function kkScenRow(label, val, maxV, cls) {
    var w = maxV > 0 ? (val / maxV * 100).toFixed(1) : '0';
    return '<div class="kk-scen-row"><div class="kk-scen-lbl">' + label + '</div><div class="kk-scen-track"><div class="kk-scen-fill ' + cls + '" style="width:' + w + '%">' + kkFmt(val) + '</div></div><div class="kk-scen-amt">PLN</div></div>';
  }

  function kkRenderResult(tableRows, hasPrepay, sd) {
    var rd = kkG('kk-amortResult'); rd.innerHTML = '';
    var savHtml = '';
    if (hasPrepay && sd && sd.baselineTi !== undefined) {
      var savedInt = Math.max(0, sd.baselineTi - sd.mainTi);
      var savedMo = sd.baselineMonths - sd.mainMonths;
      // % of total loan principal that the client saves on interest
      var savingsPctLoan = sd.loan > 0 ? (savedInt / sd.loan * 100) : 0;
      var kpis = '<div class="kk-kpis">'
        + kkKpi('Oszczędność odsetek', kkFmt(savedInt) + ' PLN', savedInt > 0 ? '(−' + kkPct(savedInt, sd.baselineTi) + ' odsetek)' : 'brak oszczędności', 'tel')
        + kkKpi('Skrócenie okresu', savedMo > 0 ? savedMo + ' mies.' : 'bez zmiany', savedMo > 0 ? 'kredyt kończy się wcześniej' : 'ten sam termin', 'tel')
        + kkKpi('Suma nadpłat', kkFmt(sd.totalOverpay) + ' PLN', savingsPctLoan > 0 ? 'oszczędność = ' + savingsPctLoan.toFixed(1) + '% kwoty kredytu' : '', 'blu')
        + kkKpi('Odsetki bez nadpłat', kkFmt(sd.baselineTi) + ' PLN', '', 'red')
        + kkKpi('Odsetki z nadpłatami', kkFmt(sd.mainTi) + ' PLN', '', 'gry')
        + kkKpi('Kwota kredytu', kkFmt(sd.loan) + ' PLN', '', 'gry')
        + '</div>';
      var chart = '<div class="kk-chart"><div class="kk-chart-title">Porównanie struktury kosztów</div>';
      var totalCap = sd.loan;
      var btp = sd.baselineTp;
      var cw = (btp > 0 ? totalCap / btp * 100 : 0).toFixed(1);
      var iw = (btp > 0 ? sd.baselineTi / btp * 100 : 0).toFixed(1);
      chart += '<div class="kk-stacked-section"><div class="kk-stacked-label">Bez nadpłat — łączny koszt: ' + kkFmt(sd.baselineTp) + ' PLN</div><div class="kk-stacked-bar"><div class="kk-stacked-seg kk-seg-cap" style="width:' + cw + '%">' + kkFmt(totalCap) + '</div><div class="kk-stacked-seg kk-seg-int" style="width:' + iw + '%">' + kkFmt(sd.baselineTi) + '</div></div><div class="kk-stacked-legend"><div class="kk-leg-item"><div class="kk-leg-dot" style="background:#0D2240"></div>Kapitał: ' + kkFmt(totalCap) + ' PLN</div><div class="kk-leg-item"><div class="kk-leg-dot" style="background:#A32D2D"></div>Odsetki: ' + kkFmt(sd.baselineTi) + ' PLN</div></div></div>';
      var mtp = sd.mainTp;
      var cw2 = (mtp > 0 ? totalCap / mtp * 100 : 0).toFixed(1);
      var iw2 = (mtp > 0 ? sd.mainTi / mtp * 100 : 0).toFixed(1);
      var sw2 = (mtp > 0 ? savedInt / mtp * 100 : 0).toFixed(1);
      var scenLbl = sd.hasKeep ? 'Utrzymanie raty' : 'Z nadpłatami';
      chart += '<div class="kk-stacked-section"><div class="kk-stacked-label">' + scenLbl + ' — łączny koszt: ' + kkFmt(sd.mainTp) + ' PLN</div><div class="kk-stacked-bar"><div class="kk-stacked-seg kk-seg-cap" style="width:' + cw2 + '%">' + kkFmt(totalCap) + '</div><div class="kk-stacked-seg kk-seg-int" style="width:' + iw2 + '%">' + kkFmt(sd.mainTi) + '</div>' + (savedInt > 0 ? '<div class="kk-stacked-seg kk-seg-save" style="width:' + sw2 + '%">+' + kkFmt(savedInt) + '</div>' : '') + '</div><div class="kk-stacked-legend"><div class="kk-leg-item"><div class="kk-leg-dot" style="background:#0D2240"></div>Kapitał: ' + kkFmt(totalCap) + ' PLN</div><div class="kk-leg-item"><div class="kk-leg-dot" style="background:#A32D2D"></div>Odsetki: ' + kkFmt(sd.mainTi) + ' PLN</div>' + (savedInt > 0 ? '<div class="kk-leg-item"><div class="kk-leg-dot" style="background:#3B6D11"></div>Oszczędność: ' + kkFmt(savedInt) + ' PLN</div>' : '') + '</div></div>';
      if (sd.hasKeep && sd.reduceOnlyTp !== undefined) {
        chart += '<div class="kk-chart-title" style="margin-top:18px;margin-bottom:12px">Porównanie scenariuszy — łączny koszt</div><div class="kk-scen-rows">';
        var maxTP = Math.max(sd.baselineTp, sd.reduceOnlyTp, sd.mainTp);
        chart += kkScenRow('Bez nadpłat', sd.baselineTp, maxTP, 'kk-sf-base')
          + kkScenRow('Zmniejszenie raty', sd.reduceOnlyTp, maxTP, 'kk-sf-reduce')
          + kkScenRow('Utrzymanie raty', sd.mainTp, maxTP, 'kk-sf-keep');
        chart += '</div>';
      }
      if (savedInt > 0) {
        var hlbl = 'oszczędność odsetek' + (savedMo > 0 ? ' · −' + savedMo + ' mies.' : '') + (savingsPctLoan > 0 ? ' · ' + savingsPctLoan.toFixed(1) + '% kwoty kredytu' : '');
        chart += '<div class="kk-highlight"><div class="kk-hico">' + ICO_COIN + '</div><div><div class="kk-hval">' + kkFmt(savedInt) + ' PLN</div><div class="kk-hlbl">' + hlbl + '</div></div></div>';
      }
      chart += '</div>';
      var stripTitle = sd.hasKeep ? 'Utrzymanie raty vs Zmniejszenie raty vs Bez nadpłat' : 'Efekt nadpłat na koszt kredytu';
      savHtml = '<div class="kk-sv-strip"><div><h3>Analiza oszczędności</h3><p>' + stripTitle + '</p></div>' + (savedMo > 0 ? '<div class="kk-sv-badge">−' + savedMo + ' mies.</div>' : '') + '</div>' + kpis + chart;
    }
    var simpleSumHtml = '';
    if (!hasPrepay) {
      var loan2 = parseFloat(kkG('kk_loanAmount').value) || 0;
      simpleSumHtml = '<div class="kk-simple-sum"><div class="kk-sbox"><div class="kk-sl">Kwota kredytu</div><div class="kk-sv">' + kkFmt(loan2) + ' PLN</div></div><div class="kk-sbox"><div class="kk-sl">Suma rat</div><div class="kk-sv">' + kkFmt(sd ? sd.mainTp : 0) + ' PLN</div></div><div class="kk-sbox"><div class="kk-sl">Suma odsetek</div><div class="kk-sv kk-sv-red">' + kkFmt(sd ? sd.mainTi : 0) + ' PLN</div></div></div>';
    }
    var pills = '';
    if (kkRateChangesOn) {
      var ch2 = kkGetIR();
      if (ch2.length) {
        pills = '<div class="kk-rate-pills">';
        for (var i = 0; i < ch2.length; i++) {
          var c = kkRC[i % kkRC.length];
          pills += '<span class="kk-rate-pill" style="background:' + c.bg + ';color:' + c.tx + '">M' + ch2[i].month + ': ' + ch2[i].rate.toFixed(2) + '%</span>';
        }
        pills += '</div>';
      }
    }
    var th, cols;
    if (hasPrepay) {
      th = '<th>Miesiąc</th><th>Zadłużenie pocz.</th><th>Rata</th><th>Kapitał</th><th>Odsetki</th><th>Nadpłata</th><th>Zadłużenie końc.</th>';
      cols = '<col class="kk-c-m"><col class="kk-c-amt"><col class="kk-c-amt"><col class="kk-c-amt"><col class="kk-c-amt"><col class="kk-c-extra"><col class="kk-c-amt">';
    } else {
      th = '<th>Miesiąc</th><th>Zadłużenie pocz.</th><th>Rata</th><th>Kapitał</th><th>Odsetki</th><th>Zadłużenie końc.</th>';
      cols = '<col class="kk-c-m"><col class="kk-c-amt"><col class="kk-c-amt"><col class="kk-c-amt"><col class="kk-c-amt"><col class="kk-c-amt">';
    }
    rd.innerHTML = savHtml + simpleSumHtml + pills + '<div class="kk-tbl-wrap"><table class="kk-amort"><colgroup>' + cols + '</colgroup><thead><tr>' + th + '</tr></thead><tbody>' + tableRows + '</tbody></table></div>';
    kkG('kk-resEmpty').style.display = 'none';
    rd.style.display = 'block';
  }

  window.kkCalculate = function () {
    var P = parseFloat(kkG('kk_loanAmount').value);
    var annRate = parseFloat(kkG('kk_annualRate').value);
    var term = parseInt(kkG('kk_loanTerm').value);
    var comm = parseFloat(kkG('kk_commissionValue').value);
    var addC = kkG('kk_commissionCredit').checked;
    var type = kkG('kk_installmentType').value;
    if (isNaN(P) || isNaN(annRate) || isNaN(term) || isNaN(comm) || P <= 0 || annRate < 0 || term <= 0 || comm < 0) {
      alert('Podaj prawidłowe dane!'); return;
    }
    var loan = addC ? P + comm : P;
    if (kkG('kk_gracePeriodOption').checked) { kkSimGrace(loan, annRate, term, type); }
    else {
      var preps = kkGetPreps();
      if (preps.length > 0) kkSimWithPrep(loan, annRate, term, type, preps);
      else kkSimStandard(loan, annRate, term, type);
    }
  };

  function kkSimStandard(loan, annRate, term, type) {
    var base = annRate / 100 / 12, ch = kkRateChangesOn ? kkGetIR() : [];
    var rows = '', tp = 0, ti = 0, rem = loan;
    for (var m = 1; m <= term; m++) {
      var r = kkGetR(m, base, ch);
      var rcIdx = -1;
      if (kkRateChangesOn) { var cx = kkGetIR(); for (var j = 0; j < cx.length; j++) { if (cx[j].month === m) { rcIdx = j; break; } } }
      var interest = rem * r, principal, payment;
      if (type === 'equal') { payment = kkAnn(rem, r, term - m + 1); principal = payment - interest; }
      else { principal = loan / term; payment = principal + interest; }
      if (m === term && rem > 0) { principal = rem; payment = interest + principal; }
      var attr = rcIdx >= 0 ? ' data-rc' : '';
      rows += '<tr' + attr + '><td>' + m + '</td><td>' + kkFmt(rem) + '</td><td>' + kkFmt(payment) + '</td><td class="kk-cp">' + kkFmt(principal) + '</td><td class="kk-ci">' + kkFmt(interest) + '</td>';
      rem = Math.max(0, rem - principal);
      rows += '<td>' + kkFmt(rem) + '</td></tr>';
      tp += payment; ti += interest;
    }
    kkRenderResult(rows, false, { mainTp: tp, mainTi: ti });
  }

  function kkSimWithPrep(loan, annRate, term, type, preps) {
    var base = annRate / 100 / 12;
    var origFixed = kkAnn(loan, base, term);
    var bl = kkBaseline(loan, annRate, term, type);
    var hasKeep = preps.some(function (e) { return e.keep; });
    var hasReduce = preps.some(function (e) { return e.strat === 'reduce'; });
    var main = kkRunSim(loan, annRate, term, type, preps, origFixed);
    var reduceOnly = null;
    if (hasKeep && hasReduce) {
      var pNK = preps.map(function (e) { return { amt: e.amt, freq: e.freq, strat: e.strat, keep: false, from: e.from, to: e.to }; });
      reduceOnly = kkRunSim(loan, annRate, term, type, pNK, origFixed);
    }
    var sd = { loan: loan, baselineTi: bl.ti, baselineTp: bl.tp, baselineMonths: bl.months, mainTi: main.ti, mainTp: main.tp, mainMonths: main.months, totalOverpay: main.totalOverpay, hasKeep: hasKeep };
    if (reduceOnly) { sd.reduceOnlyTi = reduceOnly.ti; sd.reduceOnlyTp = reduceOnly.tp; sd.reduceOnlyMonths = reduceOnly.months; }
    kkRenderResult(main.rows, true, sd);
    kkClosePM();
  }

  function kkSimGrace(loan, annRate, term, type) {
    var graceM = parseInt(kkG('kk_gracePeriodMonths').value) || 0;
    var total = graceM + term;
    var base = annRate / 100 / 12, ch = kkRateChangesOn ? kkGetIR() : [];
    var tRows = document.getElementsByClassName('kk-trancheRow');
    var rows = '', tp = 0, ti = 0;
    for (var m = 1; m <= graceM; m++) {
      var r = kkGetR(m, base, ch);
      var rcIdx = -1;
      if (kkRateChangesOn) { var cx = kkGetIR(); for (var j = 0; j < cx.length; j++) { if (cx[j].month === m) { rcIdx = j; break; } } }
      var cp = 0;
      for (var i = 0; i < tRows.length; i++) {
        var a = parseFloat(tRows[i].querySelector('.kk-trancheAmt').value) || 0;
        var ai = tRows[i].querySelector('.kk-trancheAct');
        if ((ai ? parseInt(ai.value) : 1) <= m) cp += a;
      }
      var interest = cp * r;
      var attr = rcIdx >= 0 ? ' data-rc' : '';
      rows += '<tr' + attr + '><td>' + m + '</td><td>' + kkFmt(cp) + '</td><td>' + kkFmt(interest) + '</td><td class="kk-cp">0.00</td><td class="kk-ci">' + kkFmt(interest) + '</td><td>' + kkFmt(cp) + '</td></tr>';
      tp += interest; ti += interest;
    }
    var disbursed = 0;
    for (var i = 0; i < tRows.length; i++) {
      var a = parseFloat(tRows[i].querySelector('.kk-trancheAmt').value) || 0;
      var ai = tRows[i].querySelector('.kk-trancheAct');
      if ((ai ? parseInt(ai.value) : 1) <= graceM) disbursed += a;
    }
    var ptr = disbursed;
    for (var m = graceM + 1; m <= total; m++) {
      var r = kkGetR(m, base, ch);
      var rcIdx = -1;
      if (kkRateChangesOn) { var cx = kkGetIR(); for (var j = 0; j < cx.length; j++) { if (cx[j].month === m) { rcIdx = j; break; } } }
      var rp = total - m + 1;
      var payment = kkAnn(ptr, r, rp);
      var interest = ptr * r;
      var pp = payment - interest;
      if (m === total && ptr > 0) { pp = ptr; payment = interest + pp; }
      var attr = rcIdx >= 0 ? ' data-rc' : '';
      rows += '<tr' + attr + '><td>' + m + '</td><td>' + kkFmt(ptr) + '</td><td>' + kkFmt(payment) + '</td><td class="kk-cp">' + kkFmt(pp) + '</td><td class="kk-ci">' + kkFmt(interest) + '</td>';
      ptr = Math.max(0, ptr - pp);
      rows += '<td>' + kkFmt(ptr) + '</td></tr>';
      tp += payment; ti += interest;
    }
    kkRenderResult(rows, false, { mainTp: tp, mainTi: ti });
  }

  // -- MOUNT -------------------------------------------------------------------
  window.mountKKCalculator = function (mountEl) {
    if (!mountEl) return;
    // inject CSS once
    if (!document.getElementById('kk-style')) {
      var st = document.createElement('style');
      st.id = 'kk-style';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    // mount HTML
    mountEl.id = 'kk-root';
    mountEl.innerHTML = HTML;
  };
})();
