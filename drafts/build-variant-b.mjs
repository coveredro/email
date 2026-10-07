// Generates drafts/variant-b.html (BOLD OFFER / RETAIL) for covered.ro
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'variant-b.html');

const Y = '#F5B100', INK = '#0A0A0B', TX = '#F3F3EF', MU = '#B2B2AF', FA = '#9A9A98', HL = '#262626';
const FD = "Archivo,'Arial Black','Helvetica Neue',Arial,sans-serif";
const FB = "Archivo,'Helvetica Neue',Arial,sans-serif";
const FM = "'Martian Mono','Courier New',monospace";
const fd = `font-family:${FD}`, fb = `font-family:${FB}`, fm = `font-family:${FM}`;
const T = 'role="presentation" cellpadding="0" cellspacing="0" border="0"';
const TW = `${T} width="100%"`;
const UTM = s => `utm_source=email&amp;utm_medium=newsletter&amp;utm_campaign=30-la-2-skinuri&amp;utm_content=${s}`;
const u = (p, s) => { const b = 'https://covered.ro' + p; return b + (b.includes('?') ? '&amp;' : '?') + UTM(s); };
const A = (href, style, inner, extra = '') => `<a href="${href}"${extra} style="${style}">${inner}</a>`;
const ron = n => 'RON&nbsp;' + n.toFixed(2);
const SH = 'https://cdn.shopify.com/s/files/1/0059/0466/2626/files/';
const CV = 'https://covered.ro/cdn/shop/files/';
const sp = h => `<tr><td height="${h}" style="font-size:0;line-height:0">&nbsp;</td></tr>`;
const dot = `<span style="color:${Y}">&#9679;</span>`;
const dia = `<span style="color:${Y}">&#9670;</span>`;

const IPH = [
  { h: 'skin-iphone-dark-rafinat-cu-aur-22k-editie-speciala', t: 'Skin iPhone Dark - Rafinat cu Aur 22K - EDITIE SPECIALA', p: 120, c: 150, off: 20, img: SH + 'dark.png?v=1728115103', alt: 'Skin iPhone Dark rafinat cu aur 22K: marmură neagră cu vene aurii' },
  { h: 'skin-iphone-titanium', t: 'Skin iPhone - Titanium 3D', p: 89, c: 120, off: 25, best: 1, img: SH + 'titan.png?v=1728021089', alt: 'Skin iPhone Titanium 3D: titan periat argintiu' },
  { h: 'skin-iphone-negru-mat', t: 'Skin iPhone - Negru Mat', p: 69, c: 120, off: 42, best: 1, img: SH + 'negru_mat.png?v=1728021074', alt: 'Skin iPhone Negru Mat pe spatele unui iPhone' },
  { h: 'skin-iphone-black-titanium-3d', t: 'Skin iPhone - Black Titanium 3D', p: 89, c: 120, off: 25, img: SH + 'black_titan.png?v=1728021014', alt: 'Skin iPhone Black Titanium 3D: titan periat gri închis' },
  { h: 'skin-iphone-transparent-folie-protectie-flexibila', t: 'Skin iPhone - Transparent (folie ppf)', p: 99, c: 150, off: 34, best: 1, img: SH + 'ppf.png?v=1769533628', alt: 'Skin iPhone transparent: culoarea originală rămâne la vedere' },
  { h: 'skin-iphone-waves-rafinat-cu-aur-22k-editie-speciala', t: 'Skin iPhone Waves - Rafinat cu Aur 22K - EDITIE SPECIALA', p: 120, c: 150, off: 20, img: SH + 'waves.png?v=1728115104', alt: 'Skin iPhone Waves rafinat cu aur 22K: valuri albastre cu fir auriu' },
];
const SAM = [
  { h: 'skin-samsung-negru-mat', t: 'Skin Samsung - Negru Mat', p: 69, c: 120, off: 42, best: 1, img: SH + 'negru_mat_95624e23-a169-476e-9935-f8fb196dee76.png?v=1729360165', alt: 'Skin Samsung Negru Mat pe spatele unui Galaxy Ultra' },
  { h: 'skin-samsung-transparent-folie-protectie-flexibila', t: 'Skin Samsung - Transparent (folie ppf)', p: 99, c: 150, off: 34, img: SH + 'sk_transparent_d777e951-0376-4cf6-9796-10374c3e18ca.png?v=1729194674', alt: 'Skin Samsung transparent: culoarea originală rămâne la vedere' },
  { h: 'skin-samsung-splash-finisaj-mat', t: 'Skin Samsung - Splash', p: 99, c: 120, off: 17, img: SH + 'splash_8efdf64c-ffd7-472c-af26-39ce7cc196ca.png?v=1729194600', alt: 'Skin Samsung Splash: marmură gri-negru cu stropi aurii' },
  { h: 'skin-samsung-honeycomb', t: 'Skin Samsung - Honeycomb 3D', p: 99, c: 120, off: 17, img: SH + 'honey_9497cee7-e8ed-44ac-b7b7-6483887fe764.png?v=1729194187', alt: 'Skin Samsung Honeycomb 3D: textură fagure negru' },
];
const NEW = [
  { h: 'skin-iphone-negru-ultra-matte', t: 'Skin iPhone - Negru ULTRA Matte', p: 90, c: 120, off: 25, nou: 1, img: CV + 'ultramatte.png?v=1791104171', alt: 'Skin iPhone Negru ULTRA Matte: negru ultra mat pe tot spatele' },
  { h: 'skin-iphone-off-silver', t: 'Skin iPhone - OFF Silver', p: 120, nou: 1, img: CV + 'Final_iPhonduosilvere17ProMaxFullWrapSkinDesignMockupFrontBackandSide.png?v=1791017326', alt: 'Skin iPhone OFF Silver: ramă argintie, spate alb' },
  { h: 'skin-iphone-duo-pink', t: 'Skin iPhone - DUO Pink', p: 99, c: 120, off: 17, nou: 1, img: CV + 'duopink.png?v=1789890742', alt: 'Skin iPhone DUO Pink: două nuanțe de roz' },
  { h: 'skin-iphone-glacier', t: 'Skin iPhone - Glacier', p: 99, c: 120, off: 17, nou: 1, img: CV + 'glaciersimple.png?v=1789278794', alt: 'Skin iPhone Glacier: albastru gheață pe tot spatele' },
];

const pill = (txt, bg, fg, x = '') => `<span style="display:inline-block;padding:4px 7px 3px;margin:0 2px 4px 0;border-radius:99px;background-color:${bg};color:${fg};font-size:9.5px;line-height:12px;font-weight:600;letter-spacing:.06em;${x}">${txt}</span>`;

function card(p, n, slug) {
  const href = u('/products/' + p.h, slug);
  let pills = '';
  if (p.off) pills += pill(`-${p.off}%`, Y, INK);
  if (p.best) pills += pill('&#9733;<span class="hide-m">&nbsp;CEL&nbsp;MAI&nbsp;VÂNDUT</span>', INK, Y);
  if (p.nou) pills += pill(`<span style="color:${Y}">&#9679;</span>&nbsp;NOU`, '#FFFFFF', INK, 'border:1px solid #D4D4CE;padding:3px 7px 2px;');
  const bundle = ron(p.p * 0.7);
  return `<table ${TW} bgcolor="#121213" style="background-color:#121213;border:1px solid #1F1F20;border-radius:16px"><tr><td style="padding:6px;${fm}">
<table ${TW} bgcolor="#EFEFEB" class="tile" style="background-color:#EFEFEB;border-radius:11px"><tr><td valign="top" height="24" style="padding:9px 0 0 9px;line-height:12px">${pills}</td><td valign="top" align="right" class="hide-m" style="padding:10px 10px 0 0;font-size:10px;color:#6B6B69">${String(n).padStart(2, '0')}</td></tr>
<tr><td colspan="2" align="center" style="padding:2px 18px 14px"><a href="${href}"><img src="${p.img}&amp;width=400" width="150" alt="${p.alt}" style="display:block;width:100%;max-width:150px;height:auto;border:0;margin:0 auto;font-size:12px;color:#45433E"></a></td></tr></table>
<div class="ci" style="padding:10px 4px 6px"><div class="tt" style="height:38px;${fb};font-size:14px;line-height:19px;font-weight:600;color:${TX}">${p.t}</div>
<p style="margin:6px 0 10px;font-size:13px;line-height:18px;font-weight:500;color:${Y}"><span class="p1">${ron(p.p)}</span>${p.c ? ` &nbsp;<s class="p2" style="font-size:11px;font-weight:400;color:#8C8C8B">${ron(p.c)}</s>` : `<span class="p2" style="font-size:11px">&nbsp;</span>`}</p>
<div class="chip" style="background-color:#2D2511;border:1px solid #5E480C;border-radius:8px;padding:7px 9px 8px;font-size:12px;line-height:17px;font-weight:600;color:${TX}"><span style="font-size:9.5px;letter-spacing:.06em;color:${Y}">&minus;30% CÂND IEI 2</span><br><span class="p1">${bundle}</span><span class="p3" style="font-size:10.5px;font-weight:400;color:${MU}">&nbsp;/&nbsp;buc.</span></div>
<table ${TW} style="margin-top:10px"><tr><td align="center" style="border:1px solid #4B4B4B;border-radius:5px"><a href="${href}" class="gb" style="display:block;padding:13px 6px;${fb};font-size:12px;line-height:16px;font-weight:700;letter-spacing:.06em;color:${TX};text-decoration:none">VEZI SKINUL &rarr;</a></td></tr></table>
</div></td></tr></table>`;
}

function grid(items, slug) {
  let r = '';
  for (let i = 0; i < items.length; i += 2) {
    r += `<tr><td width="49%" valign="top">${card(items[i], i + 1, slug)}</td><td width="2%" style="font-size:0;line-height:0">&nbsp;</td><td width="49%" valign="top">${items[i + 1] ? card(items[i + 1], i + 2, slug) : '&nbsp;'}</td></tr>`;
    if (i + 2 < items.length) r += `<tr><td colspan="3" height="12" style="font-size:0;line-height:0">&nbsp;</td></tr>`;
  }
  return `<tr><td class="px" style="padding:0 28px"><table ${TW}>${r}</table></td></tr>`;
}

function head(eyebrow, idx, h2, sub) {
  return `<tr><td class="px" style="padding:60px 28px 0">
<table ${TW}><tr><td style="${fm};font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;color:${FA}">${dot}&nbsp; ${eyebrow}</td><td align="right" style="${fm};font-size:11px;line-height:16px;letter-spacing:.08em;color:#7F7F7D">${idx}</td></tr></table>
<h2 class="h2" style="margin:12px 0 0;${fd};font-size:34px;line-height:39px;font-weight:800;letter-spacing:-.015em;color:${TX};font-stretch:122%">${h2}</h2>
${sub ? `<p class="bt" style="margin:10px 0 0;font-size:15px;line-height:23px;color:${MU}">${sub}</p>` : ''}
<table ${TW}><tr><td height="22" style="font-size:0;line-height:0;border-bottom:1px solid ${HL}">&nbsp;</td></tr><tr><td height="20" style="font-size:0;line-height:0">&nbsp;</td></tr></table>
</td></tr>`;
}

function seeAll(label, count, href) {
  return `<tr><td class="px" style="padding:16px 28px 0"><table ${TW} bgcolor="#121213" class="sa" style="background-color:#121213;border:1px solid #8C6806;border-radius:12px"><tr>
<td style="padding:0 0 0 20px">${A(href, `display:block;padding:22px 0;${fd};font-size:15px;line-height:20px;font-weight:800;letter-spacing:.01em;color:${TX};text-decoration:none;font-stretch:112%`, label)}</td>
<td align="right" width="96" style="padding:0 14px 0 8px"><table ${T} align="right"><tr><td style="padding-right:12px;${fm};font-size:12px;line-height:16px;font-weight:500;color:${Y}">${count}</td><td width="40" height="40" align="center" bgcolor="${Y}" style="background-color:${Y};border-radius:20px">${A(href, `display:block;width:40px;line-height:40px;${fb};font-size:18px;font-weight:700;color:${INK};text-decoration:none;text-align:center`, '&rarr;', ` aria-label="${label}"`)}</td></tr></table></td>
</tr></table></td></tr>`;
}

function strip(html, slug) {
  return `<tr><td height="56" style="font-size:0;line-height:0">&nbsp;</td></tr><tr><td bgcolor="${Y}" style="background-color:${Y};padding:5px 0"><table ${TW} style="border-top:1px solid #C18C02;border-bottom:1px solid #C18C02"><tr><td align="center" class="px" style="padding:12px 28px">${A(u('/', slug), `${fd};font-size:15px;line-height:21px;font-weight:800;letter-spacing:.01em;color:${INK};text-decoration:none;font-stretch:118%`, html)}</td></tr></table></td></tr>`;
}

function btn(label, href, kind, cls = '') {
  const y = kind === 'y', k = kind === 'k';
  const bg = y ? Y : k ? INK : '';
  const fg = y ? INK : TX;
  const td = bg ? `bgcolor="${bg}" style="background-color:${bg};border-radius:5px;mso-padding-alt:16px 30px"` : `style="border:1px solid ${k ? INK : '#4B4B4B'};border-radius:5px;mso-padding-alt:15px 30px"`;
  return `<table ${T} class="btn-m${cls}"><tr><td align="center" ${td}>${A(href, `display:inline-block;padding:${bg ? 16 : 15}px 30px;${fb};font-size:13px;line-height:18px;font-weight:700;letter-spacing:.06em;color:${fg};text-decoration:none;font-stretch:112%`, label, y ? ' class="yb"' : '')}</td></tr></table>`;
}

// ---------- ruler (decorative, class-driven) ----------
let ruler = '<tr>';
for (let i = 0; i <= 24; i++) ruler += `<td class="rt0"><div class="${i % 4 === 0 ? 'rM' : 'rm'}"></div></td>`;
ruler += `</tr>`;

// ---------- receipt (verified cart: Negru Mat iPhone + Samsung Burgundy) ----------
const rline = (name, href, was, now) => `<tr><td style="padding:12px 0;border-top:1px solid ${HL};font-size:13px;line-height:18px;font-weight:600">${A(href, `color:${TX};text-decoration:none`, name)}</td><td align="right" valign="top" style="padding:12px 0;border-top:1px solid ${HL};${fm};white-space:nowrap"><span style="font-size:10.5px;line-height:15px;color:#8C8C8B;text-decoration:line-through">${was}</span><br><span style="font-size:13px;line-height:18px;font-weight:600;color:${Y}">${now}</span></td></tr>`;
const receipt = `<table ${TW} bgcolor="${INK}" style="background-color:${INK};border-radius:14px"><tr><td style="padding:16px 18px 16px">
<table ${TW}><tr><td colspan="2" style="padding-bottom:10px;${fm};font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;color:${FA}">${dot}&nbsp; EXEMPLU DE COȘ · 2 SKINURI</td></tr>
${rline('Skin iPhone - Negru Mat', u('/products/skin-iphone-negru-mat', 'hero-exemplu'), 'RON 69.00', 'RON 48.30')}
${rline('Skin Samsung - Burgundy', u('/products/skin-samsung-burgundy', 'hero-exemplu'), 'RON 89.00', 'RON 62.30')}
</table><table ${TW}><tr><td valign="bottom" style="padding:12px 0 0;border-top:1px solid #4B4B4B;${fm};font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;color:${FA}">TOTAL ESTIMAT</td><td align="right" style="padding:12px 0 0;border-top:1px solid #4B4B4B;white-space:nowrap"><span style="${fm};font-size:11px;line-height:15px;color:#8C8C8B;text-decoration:line-through">RON 158.00</span><br><span class="rt" style="${fd};font-size:24px;line-height:30px;font-weight:800;color:${TX};font-stretch:108%">RON 110.60</span></td></tr>
</table>
<table ${T} style="margin-top:12px"><tr><td bgcolor="${Y}" style="background-color:${Y};border-radius:4px;padding:6px 8px 5px;${fm};font-size:10.5px;line-height:13px;font-weight:600;letter-spacing:.08em;color:${INK}">ECONOMISEȘTI RON 47.40</td></tr></table>
<p style="margin:10px 0 0;font-size:12px;line-height:17px;color:${FA}">TVA inclus. Livrarea se calculează la finalizarea comenzii.</p>
</td></tr></table>`;

const phone = (src, alt, href, label) => `<td width="94" align="center" valign="bottom">${A(href, 'text-decoration:none', `<img src="${src}&amp;width=200" width="88" alt="${alt}" style="display:block;width:88px;max-width:88px;height:auto;border:0;margin:0 auto;font-size:12px;line-height:16px;color:${INK}">`)}<p style="margin:8px 0 0;${fm};font-size:10px;line-height:14px;font-weight:600;letter-spacing:.1em;color:${INK}">${label}</p></td>`;


// ---------- USPs ----------
const USP = [
  ['Vinil premium', 'Doar 0,2 mm grosime. Zero volum adăugat.'],
  ['Tăiat laser pe modelul tău', 'Decupaje exacte pentru camere și butoane.'],
  ['Aplicare în 60 de secunde', 'Fără bule. Șervețel de curățare inclus.'],
  ['Plată ramburs', 'Plătești când primești coletul. Livrare în 1–2 zile lucrătoare.'],
  ['Retur în 30 de zile', 'Pentru produsele nefolosite, în ambalajul original.'],
  ['Înlocuire gratuită la aplicare greșită', 'Dacă aplicarea nu iese, îți trimitem un skin nou. Plătești doar transportul.'],
];
const uspCell = (i) => `<td width="48%" valign="top" style="padding:16px 0 18px;border-top:1px solid ${HL}"><p style="margin:0;${fm};font-size:10px;line-height:14px;font-weight:500;letter-spacing:.08em;color:${Y}">${String(i + 1).padStart(2, '0')}</p><p style="margin:8px 0 0;font-size:15px;line-height:19px;font-weight:700;color:${TX};font-stretch:108%">${USP[i][0]}</p><p class="bt" style="margin:6px 0 0;font-size:13px;line-height:19px;color:${MU}">${USP[i][1]}</p></td>`;
let usps = '';
for (let i = 0; i < 6; i += 2) usps += `<tr>${uspCell(i)}<td width="4%">&nbsp;</td>${uspCell(i + 1)}</tr>`;

// ---------- stats ----------
const stat = (val, label, first) => `<td width="33%" align="center" valign="top" style="padding:20px 6px 0;${first ? '' : `border-left:1px solid #2B2B2B;`}"><p class="sv" style="margin:0;${fd};font-size:32px;line-height:36px;font-weight:800;letter-spacing:-.01em;color:${TX};font-stretch:118%">${val}</p><p style="margin:8px 0 0;${fm};font-size:10px;line-height:15px;font-weight:500;letter-spacing:.08em;color:#A8A8A6">${label}</p></td>`;

const pre = 'Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.';
const filler = '&#847;&zwnj;&nbsp;'.repeat(18);

const html = `<!DOCTYPE html>
<html lang="ro" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>&minus;30% la 2 skinuri · covered</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><style>body,table,td,p,a,span,h1,h2{font-family:Arial,Helvetica,sans-serif!important}</style><![endif]-->
<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&amp;family=Martian+Mono:wdth,wght@75..112.5,100..800&amp;display=swap" rel="stylesheet"><!--<![endif]-->
<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Martian+Mono:wdth,wght@75..112.5,100..800&display=swap');
:root{color-scheme:dark;supported-color-schemes:dark}
body{margin:0!important;padding:0!important;width:100%!important;background-color:#0A0A0B}
table,td{mso-table-lspace:0;mso-table-rspace:0;border-collapse:separate}
img{-ms-interpolation-mode:bicubic}
a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}
.rt0{width:4%;height:12px;vertical-align:bottom;font-size:0;line-height:0;border-bottom:1px solid #0A0A0B}
.rm,.rM{width:1px;height:6px;font-size:0;line-height:0;background-color:#0A0A0B}.rM{height:12px}
.tile{background:radial-gradient(120% 85% at 50% 6%,#FBFBF9 0%,#EFEFEB 56%,#E3E3DE 100%)!important}
.sa{background:linear-gradient(100deg,rgba(245,177,0,.14),rgba(18,18,19,0) 70%),#121213!important}
.glow{background:radial-gradient(closest-side,rgba(245,177,0,.18),rgba(245,177,0,.05) 55%,rgba(10,10,11,0)),#0A0A0B!important}
.gb:hover{background-color:#F5B100!important;color:#0A0A0B!important}
.yb:hover{background-color:#FFFFFF!important}
@supports (-webkit-text-stroke:1px #000){.ol{color:#0A0A0B!important;-webkit-text-stroke:1.5px #F3F3EF}}
@media (max-width:620px){
.px{padding-left:20px!important;padding-right:20px!important}
.hx{font-size:92px!important;line-height:84px!important}
.hl{font-size:27px!important;line-height:32px!important}
.h2{font-size:26px!important;line-height:31px!important}
.hc{font-size:28px!important;line-height:33px!important}
.bt{font-size:14px!important;line-height:21px!important}
.stack{display:block!important;width:100%!important;max-width:100%!important;padding-left:0!important;padding-right:0!important}
.hide-m{display:none!important}
.tt{height:51px!important}
.tt{font-size:13px!important;line-height:17px!important}
.ci{padding:8px 7px 10px!important}
.p1{font-size:11.5px!important}.p2{font-size:10px!important;display:block!important;line-height:15px!important}.p3{font-size:9.5px!important}.chip{padding:7px 7px 8px!important}.chip .p1{font-size:11px!important}.nv{font-size:9.5px!important;letter-spacing:.03em!important}
.btn-m{width:100%!important}.btn-m a{display:block!important}
.pt-m{padding-top:16px!important}.pt-f{padding-top:32px!important}.pt-b{padding-top:10px!important}
.sv{font-size:20px!important;line-height:24px!important}
.mn{font-size:14px!important;line-height:21px!important}
.wm{font-size:64px!important;line-height:52px!important;height:42px!important}
.rt{font-size:22px!important}
}
</style>
</head>
<body id="body" bgcolor="#0A0A0B" style="margin:0;padding:0;background-color:#0A0A0B;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#0A0A0B;opacity:0">${pre}${filler}</div>
<div role="article" aria-roledescription="email" aria-label="−30% la 2 skinuri" lang="ro">
<table ${TW} bgcolor="#0A0A0B" style="background-color:#0A0A0B"><tr><td align="center" bgcolor="#0A0A0B" style="background-color:#0A0A0B;padding:0">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table ${TW} align="center" bgcolor="#0A0A0B" style="width:100%;max-width:600px;margin:0 auto;background-color:#0A0A0B;${fb};color:${TX}">

<tr><td bgcolor="#000000" class="px" style="background-color:#000000;border-bottom:1px solid #181818;padding:10px 28px"><table ${TW}><tr>
<td style="${fm};font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;color:#C2C2BF">${dia}&nbsp;PLATĂ RAMBURS LA LIVRARE<span class="hide-m"> &nbsp;${dia} RETUR ÎN 30 DE ZILE</span></td>
<td align="right" style="${fm};font-size:10px;line-height:14px;letter-spacing:.1em">${A('{{view_in_browser_url}}', 'color:#C2C2BF;text-decoration:underline', 'VEZI ÎN BROWSER')}</td>
</tr></table></td></tr>

<tr><td class="px" style="padding:22px 28px 20px"><table ${TW}><tr>
<td>${A(u('/', 'header'), 'text-decoration:none', `<img src="https://covered.ro/cdn/shop/files/covered_logo_white.png?v=1629830648&amp;width=240" width="120" height="20" alt="covered" style="display:block;width:120px;height:auto;border:0;${fd};font-size:20px;line-height:20px;font-weight:800;color:${TX}">`)}</td>
<td align="right" class="hide-m" style="${fm};font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;color:${FA}">VINIL PREMIUM · TĂIAT LASER</td>
</tr></table></td></tr>

<tr><td style="border-top:1px solid ${HL};border-bottom:1px solid ${HL}"><table ${TW}><tr>
${[['IPHONE', '/collections/apple-skin'], ['SAMSUNG', '/collections/samsung-skin'], ['PIXEL', '/collections/google'], ['ALT TELEFON', '/collections/skin-orice-telefon']].map(([l, p], i) => `<td width="${[23,26,20,31][i]}%" align="center"${i ? ` style="border-left:1px solid ${HL}"` : ''}>${A(u(p, 'nav'), `display:block;padding:15px 0;${fm};font-size:10.5px;line-height:15px;font-weight:500;letter-spacing:.08em;color:${TX};text-decoration:none`, l, ' class="nv"')}</td>`).join('')}
</tr></table></td></tr>

<tr><td bgcolor="${Y}" class="px" style="background-color:${Y};padding:28px 28px 34px">
<table ${TW}><tr><td style="${fm};font-size:11px;line-height:16px;font-weight:600;letter-spacing:.1em;color:${INK}">&#9670; OFERTĂ PACHET</td><td align="right" style="${fm};font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;color:#3B2D06">FĂRĂ COD</td></tr></table>
<h1 style="margin:18px 0 0;${fd};font-weight:800;color:${INK};font-stretch:125%"><span class="hx" style="display:block;font-size:158px;line-height:138px;letter-spacing:-.04em;margin-left:-4px">&minus;30%</span><span class="hl" style="display:block;font-size:42px;line-height:48px;letter-spacing:-.01em">LA 2 SKINURI.</span></h1>
<table ${TW} class="rl" style="margin-top:18px">${ruler}</table>
<p class="bt" style="margin:18px 0 0;font-size:18px;line-height:27px;font-weight:500;color:${INK}">Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.</p>
<p class="bt" style="margin:8px 0 0;font-size:15px;line-height:23px;color:#3B2D06">Iei 3? Și al treilea are &minus;30%. Husele și foliile de ecran nu intră în ofertă.</p>
<table ${TW} style="margin-top:26px"><tr>
<td class="stack" width="40%" align="center" valign="middle" style="padding:0 12px 0 0"><table ${T} align="center"><tr>
${phone(SH + 'negru_mat.png?v=1728021074', 'Skin iPhone Negru Mat', u('/products/skin-iphone-negru-mat', 'hero-exemplu'), 'IPHONE')}
<td align="center" valign="middle" style="padding:0 2px 24px;${fd};font-size:26px;line-height:26px;font-weight:800;color:${INK}">+</td>
${phone(SH + 'samsungburgundy.png?v=1789278841', 'Skin Samsung Burgundy', u('/products/skin-samsung-burgundy', 'hero-exemplu'), 'SAMSUNG')}
</tr></table></td>
<td class="stack pt-m" width="60%" valign="middle">${receipt}</td>
</tr></table>
<table ${TW} style="margin-top:26px"><tr><td>${btn('ALEGE-ȚI TELEFONUL &rarr;', u('/', 'hero'), 'k')}</td></tr></table>
</td></tr>

${head('CELE MAI VÂNDUTE', '01 / 03', 'TOP VÂNZĂRI IPHONE.', 'Iei oricare 2 și fiecare skin costă cu 30% mai puțin.')}
${grid(IPH, 'iphone')}
${seeAll('VEZI TOATE SKINURILE IPHONE', '199', u('/collections/apple-skin', 'iphone-toate'))}

${strip(`IPHONE + SAMSUNG? MERGE. <span style="color:${INK}">&#10022;</span> &minus;30% LA AMBELE`, 'strip-1')}

${head('CELE MAI VÂNDUTE', '02 / 03', 'TOP VÂNZĂRI SAMSUNG.', 'Același vinil premium, tăiat laser pe Galaxy-ul tău.')}
${grid(SAM, 'samsung')}
${seeAll('VEZI TOATE SKINURILE SAMSUNG', '138', u('/collections/samsung-skin', 'samsung-toate'))}

${strip(`&minus;30% LA 2 SKINURI <span style="color:${INK}">&#10022;</span> IEI 3? TOATE 3 AU &minus;30%`, 'strip-2')}

${head('DROP-URI NOI', '03 / 03', 'SKINURI NOI.', 'Finisaje abia lansate. Intră și ele la &minus;30% când iei 2.')}
${grid(NEW, 'noutati')}
<tr><td class="px" style="padding:28px 28px 0">
<p style="margin:0 0 12px;${fm};font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;color:${FA}">${dot}&nbsp; MODELE NOI</p>
<table ${TW} bgcolor="#121213" style="background-color:#121213;border:1px solid ${HL};border-radius:12px"><tr><td style="padding:14px 16px">${A(u('/collections/apple-skin', 'modele-noi'), 'display:block;text-decoration:none', `<span style="display:inline-block;padding:3px 6px 2px;border-radius:4px;background-color:${Y};${fm};font-size:9px;line-height:11px;font-weight:600;letter-spacing:.06em;color:${INK}">NOU</span>&nbsp; <span class="mn" style="${fd};font-size:16px;line-height:24px;font-weight:800;color:${TX};font-stretch:116%">IPHONE&nbsp;DUO · 18&nbsp;PRO&nbsp;MAX · 18&nbsp;PRO</span><br><span style="${fm};font-size:10px;line-height:18px;letter-spacing:.08em;color:${MU}">VEZI&nbsp;SKINURI&nbsp;&rarr;</span>`)}</td></tr></table>
<table ${TW} style="margin-top:16px"><tr><td>${btn('VEZI TOATE NOUTĂȚILE &rarr;', u('/collections/apple-skin?sort_by=created-descending', 'noutati-toate'), 'g')}</td></tr></table>
</td></tr>

<tr><td class="px" style="padding:64px 28px 0">
<table ${TW}><tr><td style="${fm};font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;color:${FA}">${dot}&nbsp; DE CE COVERED</td></tr></table>
<h2 class="h2" style="margin:12px 0 22px;${fd};font-size:34px;line-height:39px;font-weight:800;letter-spacing:-.015em;color:${TX};font-stretch:122%">ZERO VOLUM, STIL MAXIM.</h2>
<table ${TW}>${usps}</table>
</td></tr>

<tr><td height="48" style="font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td class="px glow" align="center" bgcolor="#0A0A0B" style="background-color:#0A0A0B;border-top:1px solid ${HL};padding:60px 28px 52px">
<p style="margin:0;${fm};font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;color:${FA}">${dot}&nbsp; DIN 2018</p>
<h2 class="hc" style="margin:14px 0 0;${fd};font-size:40px;line-height:46px;font-weight:800;letter-spacing:-.02em;color:${TX};font-stretch:125%"><span style="color:${Y}">60.000+</span> SKINURI REALIZATE.<br><span class="ol" style="color:${TX}">AL TĂU URMEAZĂ.</span></h2>
<p class="bt" style="margin:14px 0 0;font-size:16px;line-height:24px;color:${MU}">Alege modelul, alege finisajul. Restul durează 60 de secunde.</p>
<table ${T} align="center" width="100%" style="max-width:460px;margin:26px auto 0"><tr><td bgcolor="#2B230B" style="background-color:#2B230B;border:1px solid #8C6806;border-radius:12px;padding:12px 14px 13px"><table ${TW}><tr>
<td width="28" valign="top"><table ${T}><tr><td width="28" height="28" align="center" bgcolor="${Y}" style="background-color:${Y};border-radius:14px;font-size:14px;line-height:28px;font-weight:800;color:${INK}">%</td></tr></table></td>
<td style="padding-left:12px;text-align:left"><p style="margin:3px 0 0;${fd};font-size:15px;line-height:20px;font-weight:700;letter-spacing:.02em;color:${TX};font-stretch:112%">&minus;30% LA 2 SKINURI</p><p style="margin:4px 0 0;font-size:13px;line-height:19px;color:#B8B6AE">${pre}</p></td>
</tr></table></td></tr></table>
<table ${T} align="center" style="margin:26px auto 0"><tr>
<td class="stack" style="padding:0 6px 0 0">${btn('ALEGE-ȚI TELEFONUL &rarr;', u('/', 'cta'), 'y')}</td>
<td class="stack pt-b" style="padding:0 0 0 6px">${btn('VEZI TOATE SKINURILE', u('/pages/categorii-produse', 'cta'), 'g')}</td>
</tr></table>
<table ${TW} style="margin-top:36px;border-top:1px solid #2B2B2B"><tr>
${stat(`<span style="color:${Y}">&#9733;</span> 4,69<span style="font-size:60%;color:${FA}">/5</span>`, '1.278 DE RECENZII', 1)}
${stat('37.000+', 'CLIENȚI')}
${stat('1,7', 'SKINURI PER CLIENT, ÎN MEDIE')}
</tr></table>
<p style="margin:22px 0 0;font-size:14px;line-height:21px;color:${MU}">Un singur finisaj e rareori de ajuns.</p>
</td></tr>

<tr><td bgcolor="#000000" class="px" style="background-color:#000000;padding:48px 28px 0">
<table ${TW}><tr>
<td class="stack" width="52%" valign="top" style="padding-right:24px">
${A(u('/', 'footer'), 'text-decoration:none', `<img src="https://covered.ro/cdn/shop/files/covered_logo_white.png?v=1629830648&amp;width=240" width="120" height="20" alt="covered" style="display:block;width:120px;height:auto;border:0;${fd};font-size:20px;line-height:20px;font-weight:800;color:${TX}">`)}
<p style="margin:18px 0 0;${fd};font-size:16px;line-height:20px;font-weight:800;color:${TX};font-stretch:118%">SKINURI DIN VINIL PREMIUM, TĂIATE LASER PE MODELUL TĂU.</p>
<p style="margin:12px 0 0;${fm};font-size:10px;line-height:15px;letter-spacing:.08em;color:#7F7F7D">DIN 2018 · 37.000+ CLIENȚI · 60.000+ SKINURI</p>
<table ${T} style="margin-top:20px;${fm}"><tr>
<td style="border:1px solid #2F2F2F;border-radius:99px">${A('https://www.instagram.com/covered.ro', `display:block;padding:14px 16px;font-size:10px;line-height:14px;font-weight:500;letter-spacing:.08em;color:#DCDCD8;text-decoration:none`, 'INSTAGRAM')}</td>
<td width="8">&nbsp;</td>
<td style="border:1px solid #2F2F2F;border-radius:99px">${A('https://www.tiktok.com/@covered.ro', `display:block;padding:14px 16px;font-size:10px;line-height:14px;font-weight:500;letter-spacing:.08em;color:#DCDCD8;text-decoration:none`, 'TIKTOK')}</td>
</tr></table>
</td>
<td class="stack pt-f" width="48%" valign="top">
<p style="margin:0;${fm};font-size:10px;line-height:15px;letter-spacing:.12em;color:#8C8C8B">FIRMĂ &amp; CONTACT</p>
<p style="margin:10px 0 0;${fd};font-size:16px;line-height:20px;font-weight:800;color:${TX};font-stretch:118%">SC COVERED SRL</p>
<table ${TW} style="margin-top:12px;${fm};line-height:15px">
${[['CUI', '47818139'], ['NR. REG. COM.', 'J20/341/2023'], ['E-MAIL', A('mailto:covered.ro@gmail.com', `color:${TX};text-decoration:none`, 'covered.ro@gmail.com')], ['TELEFON', A('tel:0750422122', `color:${TX};text-decoration:none`, '0750 422 122')]].map(([k, v]) => `<tr><td style="padding:9px 8px 9px 0;border-top:1px solid #1E1E1E;font-size:10px;letter-spacing:.08em;color:#8C8C8B;white-space:nowrap">${k}</td><td align="right" style="padding:9px 0;border-top:1px solid #1E1E1E;font-size:12px;color:#E6E6E2">${v}</td></tr>`).join('')}
</table>
<p style="margin:12px 0 0;font-size:13px;line-height:19px;color:${MU}">Str. Principală nr. 98, 335309 Strei, Hunedoara, România</p>
</td></tr></table>
<p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #1E1E1E;font-size:12px;line-height:20px;color:${FA}">${[['Termeni și condiții', u('/pages/termeni-si-conditii', 'footer')], ['Politica de confidențialitate', u('/pages/politica-de-confidentialitate', 'footer')], ['Politica de retur', u('/policies/refund-policy', 'footer')], ['Livrarea', u('/policies/shipping-policy', 'footer')], ['ANPC', 'https://anpc.ro/ce-este-sal/'], ['SOL', 'https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&amp;lng=RO']].map(([l, h]) => A(h, `color:${FA};text-decoration:underline`, l)).join(' &nbsp;·&nbsp; ')}</p>
<p style="margin:14px 0 0;font-size:12px;line-height:19px;color:#8C8C8B">Primești acest e-mail pentru că te-ai abonat la newsletterul covered. ${A('{{view_in_browser_url}}', `color:${FA};text-decoration:underline`, 'Vezi emailul în browser')} &nbsp;·&nbsp; ${A('{{unsubscribe_url}}', `color:${FA};text-decoration:underline`, 'Dezabonare')}</p>
<p style="margin:16px 0 0;${fm};font-size:10px;line-height:15px;letter-spacing:.08em;color:#7F7F7D">© 2026 COVERED.</p>
<div class="wm" aria-hidden="true" style="margin-top:18px;height:74px;overflow:hidden;${fd};font-size:112px;line-height:92px;font-weight:800;letter-spacing:-.045em;color:#141414;text-align:center;white-space:nowrap;font-stretch:125%">covered</div>
</td></tr>

</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>
</div>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log('wrote', OUT, Buffer.byteLength(html), 'bytes');
