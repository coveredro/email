// Builds drafts/variant-c.html  (node drafts/build-c.js)
const fs = require('fs');
const path = require('path');

const Y = '#F5B100', INK = '#0A0A0B', FG = '#F3F3EF', MUT = '#B2B2AF', EYE = '#9A9A98', FAINT = '#7F7F7D',
  STR = '#8C8C8B', CARD = '#121213', CARDB = '#1F1F20', LINE = '#262626', S2 = '#111113';
const FD = "font-family:Archivo,'Arial Black','Helvetica Neue',Arial,sans-serif;";
const FB = "font-family:Archivo,'Helvetica Neue',Arial,sans-serif;";
const FM = "font-family:'Martian Mono','Courier New',monospace;";
const T = 'role="presentation" cellpadding="0" cellspacing="0" border="0"';
const UTM = 'utm_source=email&amp;utm_medium=newsletter&amp;utm_campaign=30-la-2-skinuri&amp;utm_content=';
const u = (p, s, hash = '') => `https://covered.ro${p}${p.includes('?') ? '&amp;' : '?'}${UTM}${s}${hash}`;
const CDN = 'https://cdn.shopify.com/s/files/1/0059/0466/2626/files/';
const ARR = '&#8594;';
const DOT = `<span style="font-family:Arial,sans-serif;font-size:10px;color:${Y};">&#9679;</span>`;

const sp = (h, bg) => `<tr><td height="${h}" style="height:${h}px;font-size:0;line-height:0;${bg ? `background-color:${bg};` : ''}">&nbsp;</td></tr>`;

const eyebrow = (t, c = EYE, extra = '') =>
  `<div class="eb" style="${FM}font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${c};${extra}">${DOT}&nbsp;&nbsp;${t}</div>`;

const h2 = (t, extra = '') =>
  `<h2 class="h2" style="margin:10px 0 0;${FD}font-size:34px;line-height:40px;font-weight:800;font-stretch:122%;letter-spacing:-0.015em;text-transform:uppercase;color:${FG};${extra}">${t}</h2>`;

function btn(label, href, kind = 'p') {
  const bg = kind === 'p' ? Y : INK, col = kind === 'p' ? INK : FG, bd = kind === 'p' ? Y : '#4B4B4B';
  return `<table ${T} class="bt"><tr><td align="center" bgcolor="${bg}" style="background-color:${bg};border:1px solid ${bd};border-radius:5px;"><a href="${href}" style="display:inline-block;padding:16px 26px;${FB}font-size:13px;line-height:16px;font-weight:700;font-stretch:112%;letter-spacing:.04em;text-transform:uppercase;color:${col};text-decoration:none;border-radius:5px;mso-padding-alt:0;"><!--[if mso]><i style="letter-spacing:26px;mso-font-width:-100%;mso-text-raise:24pt;">&nbsp;</i><![endif]--><span style="mso-text-raise:12pt;">${label}</span><!--[if mso]><i style="letter-spacing:26px;mso-font-width:-100%;">&nbsp;</i><![endif]--></a></td></tr></table>`;
}
const pair = (a, b, center) =>
  `<table ${T} class="full"${center ? ' style="margin:0 auto;"' : ''}><tr><td class="stack" valign="top">${a}</td><td class="stack gap" width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td><td class="stack" valign="top">${b}</td></tr></table>`;

function pill(t, kind) {
  const s = {
    sale: `background-color:${Y};color:${INK};`,
    best: `background-color:${INK};color:${Y};`,
    nou: `background-color:#FFFFFF;color:${INK};border:1px solid #D9D9D5;`,
  }[kind];
  const txt = kind === 'nou' ? `<span style="color:${Y};">&#9679;</span> NOU` : t;
  return `<span style="display:inline-block;${s}${FM}font-size:10px;line-height:12px;font-weight:600;letter-spacing:.06em;padding:4px 8px;border-radius:100px;margin:0 4px 4px 0;white-space:nowrap;">${txt}</span>`;
}

function card(p, slug) {
  const href = u('/products/' + p.h, slug);
  let pills = '';
  if (p.d) pills += pill(`-${p.d}%`, 'sale');
  if (p.best) pills += pill('&#9733; CEL MAI VÂNDUT', 'best');
  if (p.nou) pills += pill('', 'nou');
  const price = `<span style="white-space:nowrap;">RON ${p.p}</span>${p.c ? ` <s style="white-space:nowrap;font-size:11px;font-weight:400;color:${STR};">RON ${p.c}</s>` : ''}`;
  const rating = p.r ? `<div style="margin-top:4px;${FM}font-size:11px;line-height:16px;color:${MUT};"><span style="color:${Y};">&#9733;</span> ${p.r} <span style="color:${STR};">(${p.n})</span></div>` : '';
  return `<td class="pc" width="50%" valign="top" bgcolor="${CARD}" style="background-color:${CARD};border:1px solid ${CARDB};border-radius:18px;padding:6px;">
<table ${T} width="100%"><tr><td class="tile" bgcolor="#EFEFEB" style="background-color:#EFEFEB;border-radius:12px;padding:10px 10px 14px;"><div style="font-size:0;line-height:0;min-height:20px;">${pills}</div>
<a href="${href}" style="display:block;text-decoration:none;"><img src="${CDN}${p.img}&amp;width=300" width="140" alt="${p.alt}" style="display:block;margin:4px auto 0;width:100%;max-width:140px;height:auto;border:0;${FB}font-size:12px;line-height:16px;color:#45433E;"></a></td></tr>
<tr><td class="ci" style="padding:14px 8px 8px;"><a href="${href}" class="ct" style="${FB}font-size:14.5px;line-height:19px;font-weight:600;color:${FG};text-decoration:none;">${p.t}</a>
<div class="pr" style="margin-top:8px;${FM}font-size:12.5px;line-height:18px;font-weight:500;color:${Y};">${price}</div>${rating}</td></tr></table></td>`;
}

function grid(arr, slug, start = 1) {
  let out = '';
  for (let k = 0; k < arr.length; k += 2) {
    out += `<tr><td class="px" style="padding:0 32px;"><table ${T} width="100%" style="border-collapse:separate;"><tr>${card(arr[k], slug)}<td class="gut" width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>${card(arr[k + 1], slug)}</tr></table></td></tr>${sp(12)}`;
  }
  return out;
}

function seeAll(label, count, href) {
  return `<tr><td class="px" style="padding:0 32px;"><table ${T} width="100%" bgcolor="${CARD}" class="seeall" style="background-color:${CARD};border:1px solid #8F6909;border-radius:12px;border-collapse:separate;"><tr>
<td valign="middle" style="padding:14px 8px 14px 18px;"><a href="${href}" class="sa" style="${FD}font-size:14px;line-height:18px;font-weight:800;font-stretch:112%;letter-spacing:.01em;text-transform:uppercase;color:${FG};text-decoration:none;">${label}</a></td>
<td valign="middle" align="right" width="44" style="padding:0 12px 0 0;${FM}font-size:12px;line-height:18px;font-weight:500;color:${Y};">${count}</td>
<td valign="middle" width="40" style="padding:10px 10px 10px 0;"><table ${T}><tr><td width="40" height="40" align="center" bgcolor="${Y}" style="width:40px;height:40px;background-color:${Y};border-radius:20px;"><a href="${href}" style="display:block;${FB}font-size:18px;line-height:40px;font-weight:700;color:${INK};text-decoration:none;">${ARR}</a></td></tr></table></td>
</tr></table></td></tr>`;
}

const sectionHead = (eb, title, sub) => `<tr><td class="px" style="padding:0 32px;">${eyebrow(eb)}${h2(title)}${sub ? `<p class="bd" style="margin:12px 0 0;${FB}font-size:15px;line-height:23px;color:${MUT};">${sub}</p>` : ''}
<div style="height:22px;line-height:22px;font-size:1px;border-bottom:1px solid ${LINE};">&nbsp;</div></td></tr>${sp(20)}`;

// ---------- DATA (verified 2026-10-06) ----------
const IPH = [
  { t: 'Skin iPhone Dark - Rafinat cu Aur 22K - EDITIE SPECIALA', h: 'skin-iphone-dark-rafinat-cu-aur-22k-editie-speciala', p: '120.00', c: '150.00', d: 20, r: '4,6', n: 36, img: 'dark.png?v=1728115103', alt: 'Skin iPhone Dark rafinat cu aur 22K, marmură neagră cu vene aurii' },
  { t: 'Skin iPhone - Titanium 3D', h: 'skin-iphone-titanium', p: '89.00', c: '120.00', d: 25, best: 1, r: '4,9', n: 40, img: 'titan.png?v=1728021089', alt: 'Skin iPhone Titanium 3D, titan periat argintiu' },
  { t: 'Skin iPhone - Negru Mat', h: 'skin-iphone-negru-mat', p: '69.00', c: '120.00', d: 42, best: 1, r: '4,8', n: 26, img: 'negru_mat.png?v=1728021074', alt: 'Skin iPhone negru mat' },
  { t: 'Skin iPhone - Black Titanium 3D', h: 'skin-iphone-black-titanium-3d', p: '89.00', c: '120.00', d: 25, r: '4,8', n: 38, img: 'black_titan.png?v=1728021014', alt: 'Skin iPhone Black Titanium 3D, titan periat gri închis' },
];
const SAM = [
  { t: 'Skin Samsung - Negru Mat', h: 'skin-samsung-negru-mat', p: '69.00', c: '120.00', d: 42, best: 1, r: '4,4', n: 7, img: 'negru_mat_95624e23-a169-476e-9935-f8fb196dee76.png?v=1729360165', alt: 'Skin Samsung negru mat' },
  { t: 'Skin Samsung - Personalizat', h: 'skin-samsung-personalizat-finisaj-mat', p: '99.00', c: '120.00', d: 17, r: '4,5', n: 13, img: 'pers_e3680e7b-0828-4971-8b14-e4e12d82ede5.png?v=1729197166', alt: 'Skin Samsung personalizat cu poza ta' },
  { t: 'Skin Samsung - Transparent (folie ppf)', h: 'skin-samsung-transparent-folie-protectie-flexibila', p: '99.00', c: '150.00', d: 34, r: '5,0', n: 7, img: 'sk_transparent_d777e951-0376-4cf6-9796-10374c3e18ca.png?v=1729194674', alt: 'Skin Samsung transparent, folie PPF' },
  { t: 'Skin Samsung - Splash', h: 'skin-samsung-splash-finisaj-mat', p: '99.00', c: '120.00', d: 17, r: '4,5', n: 12, img: 'splash_8efdf64c-ffd7-472c-af26-39ce7cc196ca.png?v=1729194600', alt: 'Skin Samsung Splash, marmură gri cu stropi aurii' },
];
const NEW2 = [
  { t: 'Skin iPhone - OFF Silver', h: 'skin-iphone-off-silver', p: '120.00', nou: 1, img: 'Final_iPhonduosilvere17ProMaxFullWrapSkinDesignMockupFrontBackandSide.png?v=1791017326', alt: 'Skin iPhone OFF Silver, ramă argintie și spate alb' },
  { t: 'Skin iPhone - DUO Pink', h: 'skin-iphone-duo-pink', p: '99.00', c: '120.00', d: 17, nou: 1, img: 'duopink.png?v=1789890742', alt: 'Skin iPhone DUO Pink, două nuanțe de roz' },
];

// ---------- BLOCKS ----------
const preheader = `<div style="display:none;max-height:0;max-width:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${INK};opacity:0;">−30% la 2 skinuri. Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.${'&#847;&zwnj;&nbsp;'.repeat(45)}</div>`;

const ticker = `<tr><td bgcolor="#000000" style="background-color:#000000;border-bottom:1px solid #181818;padding:11px 20px;text-align:center;${FM}font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#C2C2BF;"><span style="color:${Y};">&#9670;</span>&nbsp; PLATĂ RAMBURS LA LIVRARE<span class="hm">&nbsp;&nbsp;&nbsp;<span style="color:${Y};">&#9670;</span>&nbsp; RETUR ÎN 30 DE ZILE</span></td></tr>`;

const header = `<tr><td class="px" bgcolor="${INK}" style="background-color:${INK};padding:22px 32px;border-bottom:1px solid ${LINE};">
<table ${T} width="100%"><tr>
<td valign="middle"><a href="${u('/', 'header')}" style="text-decoration:none;"><img src="${CDN}covered_logo_white.png?v=1629830648&amp;width=220" width="110" alt="covered" class="logo" style="display:block;width:110px;max-width:110px;height:auto;border:0;${FB}font-size:20px;line-height:24px;font-weight:700;color:${FG};"></a></td>
<td valign="middle" align="right" class="nav" style="${FM}font-size:10.5px;line-height:16px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;">
<a href="${u('/collections/apple-skin', 'header')}" style="color:#C2C2BF;text-decoration:none;">iPhone</a><span style="color:#50504F;">&nbsp;&nbsp;/&nbsp;&nbsp;</span><a href="${u('/collections/samsung-skin', 'header')}" style="color:#C2C2BF;text-decoration:none;">Samsung</a><span style="color:#50504F;">&nbsp;&nbsp;/&nbsp;&nbsp;</span><a href="${u('/collections/google', 'header')}" style="color:#C2C2BF;text-decoration:none;">Pixel</a></td>
</tr></table></td></tr>`;

const corner = (sides) => `<td width="16" height="16" style="width:16px;height:16px;font-size:0;line-height:0;${sides.map(s => `border-${s}:1px solid #50504F;`).join('')}">&nbsp;</td>`;
const tag = (t) => `<span style="display:inline-block;background-color:${INK};border:1px solid #2F2F2F;border-radius:4px;padding:6px 9px;${FM}font-size:9.5px;line-height:12px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${FG};white-space:nowrap;"><span style="color:${Y};">&#9679;</span>&nbsp; ${t}</span>`;
const phone = (img, w, src, alt, href, cls) => `<a href="${href}" style="display:block;text-decoration:none;"><img class="${cls}" src="${CDN}${img}&amp;width=${src}" width="${w}" alt="${alt}" style="display:block;margin:0 auto;width:100%;max-width:${w}px;height:auto;border:0;${FB}font-size:12px;line-height:16px;color:${MUT};"></a>`;

const hero = `<tr><td class="px hero-bg" bgcolor="${INK}" style="background-color:${INK};padding:44px 32px 0;">
${eyebrow('Ofertă pachet', '#A8A8A6')}
<h1 style="margin:16px 0 0;${FD}font-weight:800;font-stretch:125%;text-transform:uppercase;color:${FG};">
<span class="h1a" style="display:block;font-size:52px;line-height:60px;letter-spacing:-0.02em;">Două skinuri.</span>
<span class="h1b ol" style="display:block;font-size:124px;line-height:128px;letter-spacing:-0.02em;color:${Y};">−30%.</span>
</h1>
<p class="lead" style="margin:16px 0 0;max-width:440px;${FB}font-size:17px;line-height:26px;color:#B2B2AF;">Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.</p>
<div style="height:28px;line-height:28px;font-size:1px;">&nbsp;</div>
${pair(btn(`Alege-ți telefonul&nbsp;&nbsp;${ARR}`, u('/', 'hero', '#alege-telefonul')), btn('Vezi cele mai vândute', u('/collections/toate-produsele', 'hero'), 's'))}
<div style="height:36px;line-height:36px;font-size:1px;">&nbsp;</div>
<table ${T} width="100%" style="border-collapse:separate;">
<tr>${corner(['top', 'left'])}<td style="font-size:0;line-height:0;">&nbsp;</td>${corner(['top', 'right'])}</tr>
<tr><td colspan="3" class="glow" align="center" style="padding:4px 14px 6px;">
<table ${T} width="100%"><tr><td align="left" style="padding:0 0 10px;">${tag('Vinil premium · 0,2 mm')}</td></tr></table>
<table ${T} width="100%"><tr>
<td width="30%" valign="bottom" style="width:30%;padding:0 0 22px;">${phone('titan_73b7554c-81af-4043-9e5c-32f9fc5c942a.png?v=1729196487', 150, 300, 'Skin Samsung Titanium, titan periat', u('/products/skin-samsung-titanium', 'hero'), '')}</td>
<td width="40%" valign="bottom" style="width:40%;">${phone('off-black_final.png?v=1777186461', 206, 420, 'Skin iPhone OFF-Black', u('/products/skin-iphone-duo-jet-black', 'hero'), '')}</td>
<td width="30%" valign="bottom" style="width:30%;padding:0 0 22px;">${phone('piele.png?v=1730971401', 150, 300, 'Skin Google Pixel aspect piele neagră', u('/products/skin-google-pixel-aspect-piele-neagra-full-grain', 'hero'), '')}</td>
</tr></table>
<table ${T} width="100%"><tr><td align="right" style="padding:12px 0 0;">${tag('Tăiat laser pe model')}</td></tr></table>
</td></tr>
<tr>${corner(['bottom', 'left'])}<td style="font-size:0;line-height:0;">&nbsp;</td>${corner(['bottom', 'right'])}</tr>
</table>
</td></tr>${sp(40, INK)}`;

const tRow = (k, v, last) => `<tr><td valign="top" style="padding:10px 12px 10px 0;${last ? '' : 'border-bottom:1px solid #2E2711;'}${FM}font-size:10.5px;line-height:16px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#A8A8A6;white-space:nowrap;">${k}</td><td valign="top" align="right" class="tv" style="padding:10px 0;${last ? '' : 'border-bottom:1px solid #2E2711;'}${FM}font-size:12px;line-height:16px;font-weight:500;letter-spacing:.02em;text-transform:uppercase;color:${FG};">${v}</td></tr>`;
const perf = `<tr><td style="padding:0;"><table ${T} width="100%"><tr><td width="10" height="20" bgcolor="${INK}" style="width:10px;height:20px;background-color:${INK};border-radius:0 10px 10px 0;font-size:0;line-height:0;">&nbsp;</td><td style="padding:0 8px;"><div style="height:1px;border-top:1px dashed #6A520F;font-size:0;line-height:0;">&nbsp;</div></td><td width="10" height="20" bgcolor="${INK}" style="width:10px;height:20px;background-color:${INK};border-radius:10px 0 0 10px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>`;

const ticket = `<tr><td class="px" bgcolor="${INK}" style="background-color:${INK};padding:0 32px;">
<table ${T} width="100%" bgcolor="#1D170A" style="background-color:#1D170A;border:1px dashed ${Y};border-radius:14px;border-collapse:separate;">
<tr><td class="tk" style="padding:22px 24px 18px;">
<table ${T} width="100%"><tr>
<td width="40" valign="middle" style="width:40px;"><table ${T}><tr><td width="40" height="40" align="center" bgcolor="${Y}" style="width:40px;height:40px;background-color:${Y};border-radius:20px;${FD}font-size:18px;line-height:40px;font-weight:800;color:${INK};">%</td></tr></table></td>
<td valign="middle" style="padding-left:14px;"><div style="${FM}font-size:10.5px;line-height:14px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${Y};">Ofertă pachet · fără cod</div>
<div class="tt" style="margin-top:4px;${FD}font-size:24px;line-height:28px;font-weight:800;font-stretch:112%;letter-spacing:.01em;text-transform:uppercase;color:${FG};">−30% la 2 skinuri</div></td>
</tr></table></td></tr>
${perf}
<tr><td class="tk" style="padding:6px 24px 8px;"><table ${T} width="100%">
${tRow('Combini', 'Oricare 2 skinuri')}${tRow('Telefon', 'Orice model, orice brand')}${tRow('Cod', 'Nu ai nevoie')}${tRow('Reducere', 'Automat, în coș', 1)}
</table></td></tr>
${perf}
<tr><td class="tk" style="padding:16px 24px 22px;">
<div style="${FM}font-size:10.5px;line-height:16px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#A8A8A6;"><a href="${u('/products/skin-iphone-negru-mat', 'ticket')}" style="color:#A8A8A6;text-decoration:none;">Exemplu · 2 × Skin iPhone - Negru Mat&nbsp;${ARR}</a></div>
<table ${T} width="100%" style="margin-top:8px;"><tr>
<td valign="bottom" style="${FD}font-size:34px;line-height:38px;font-weight:800;font-stretch:112%;letter-spacing:-0.01em;color:${Y};" class="tp">RON 96.60</td>
<td valign="bottom" align="right" style="${FM}font-size:13px;line-height:20px;color:${STR};padding-bottom:4px;"><s>RON 138.00</s></td>
</tr></table>
<div style="margin-top:6px;${FM}font-size:12px;line-height:18px;letter-spacing:.02em;color:#C2C2BF;"><strong style="font-size:13.5px;font-weight:600;color:${FG};">RON 48.30</strong> / buc. când iei 2</div>
</td></tr>
</table>
<div style="margin-top:12px;${FM}font-size:10px;line-height:15px;letter-spacing:.08em;text-transform:uppercase;color:${FAINT};text-align:center;">Husele, foliile și extraopțiunile nu intră în ofertă.</div>
</td></tr>${sp(48, INK)}`;

const star = `<span class="spk" style="color:${INK};font-size:.55em;">&#10022;</span>`;
const bandW = (t, ol) => `<span class="${ol ? 'olk' : ''}" style="color:${INK};">${t}</span>`;
const band = `<tr><td bgcolor="${INK}" class="bandwrap" style="background-color:${INK};padding:8px 0;">
<div class="tilt"><table ${T} width="100%" bgcolor="${Y}" style="background-color:${Y};"><tr><td style="padding:7px 0;"><table ${T} width="100%"><tr><td class="band" align="center" style="border-top:1px solid #C18C02;border-bottom:1px solid #C18C02;padding:14px 16px;${FD}font-size:27px;line-height:34px;font-weight:800;font-stretch:125%;letter-spacing:-0.01em;text-transform:uppercase;color:${INK};">
<div>${bandW('Vinil premium')} ${star} ${bandW('Tăiat laser', 1)}</div>
<div>${bandW('Aplicare în 60 de secunde')}</div>
<div>${bandW('Zero volum', 1)} ${star} ${bandW('Retur 30 de zile')}</div>
</td></tr></table></td></tr></table></div>
</td></tr>${sp(48, INK)}`;

const iphone = `${sectionHead('Skinuri iPhone', 'Top vânzări iPhone')}${grid(IPH, 'top-iphone')}${seeAll('Vezi toate skinurile iPhone', '199', u('/collections/apple-skin', 'top-iphone'))}${sp(56)}`;
const samsung = `${sectionHead('Skinuri Samsung', 'Top vânzări Samsung')}${grid(SAM, 'top-samsung')}${seeAll('Vezi toate skinurile Samsung', '138', u('/collections/samsung-skin', 'top-samsung'))}${sp(56)}`;

const leadHref = u('/products/skin-iphone-negru-ultra-matte', 'noutati');
const lead = `<tr><td class="px" style="padding:0 32px;">
<table ${T} width="100%" bgcolor="${CARD}" style="background-color:${CARD};border:1px solid ${CARDB};border-radius:18px;border-collapse:separate;"><tr>
<td class="stack" width="250" valign="top" style="width:250px;padding:6px;">
<table ${T} width="100%"><tr><td class="tile tile-lg" bgcolor="#EFEFEB" style="background-color:#EFEFEB;border-radius:12px;padding:12px 12px 20px;">
<div style="font-size:0;line-height:0;">${pill('', 'nou')}${pill('-25%', 'sale')}</div>
<a href="${leadHref}" style="display:block;text-decoration:none;"><img src="${CDN}ultramatte.png?v=1791104171&amp;width=440" width="190" alt="Skin iPhone Negru ULTRA Matte" style="display:block;margin:8px auto 0;width:100%;max-width:190px;height:auto;border:0;${FB}font-size:12px;line-height:16px;color:#45433E;"></a>
</td></tr></table></td>
<td class="stack li" valign="middle" style="padding:22px 24px 24px 18px;">
<div style="${FM}font-size:10.5px;line-height:16px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${EYE};">01 · Cel mai nou skin</div>
<a href="${leadHref}" style="display:block;margin-top:10px;${FD}font-size:24px;line-height:28px;font-weight:800;font-stretch:116%;letter-spacing:-0.012em;text-transform:uppercase;color:${FG};text-decoration:none;" class="lt">Skin iPhone - Negru ULTRA Matte</a>
<p style="margin:12px 0 0;${FB}font-size:15px;line-height:22px;color:${MUT};">Skin Negru ULTRA mat, realizat din autocolant 3M Premium.</p>
<div style="margin-top:14px;${FM}font-size:17px;line-height:22px;font-weight:500;color:${Y};">RON 90.00&nbsp; <s style="font-size:12px;font-weight:400;color:${STR};">RON 120.00</s></div>
<table ${T} width="100%" style="margin-top:16px;border-collapse:separate;" bgcolor="#1D170A"><tr><td style="background-color:#1D170A;border:1px solid #6A520F;border-radius:10px;padding:10px 12px;">
<table ${T} width="100%"><tr><td width="24" valign="top" style="width:24px;"><table ${T}><tr><td width="24" height="24" align="center" bgcolor="${Y}" style="width:24px;height:24px;background-color:${Y};border-radius:12px;${FD}font-size:12px;line-height:24px;font-weight:800;color:${INK};">%</td></tr></table></td>
<td style="padding-left:10px;"><div style="${FB}font-size:13px;line-height:17px;font-weight:700;font-stretch:112%;letter-spacing:.02em;text-transform:uppercase;color:${FG};">−30% la 2 skinuri</div><div style="margin-top:2px;${FM}font-size:11px;line-height:16px;letter-spacing:.02em;color:#C2C2BF;"><strong style="font-weight:600;color:${Y};">RON 63.00</strong> / buc. când iei 2</div></td></tr></table>
</td></tr></table>
<div style="height:18px;line-height:18px;font-size:1px;">&nbsp;</div>
${btn(`Vezi skinul&nbsp;&nbsp;${ARR}`, leadHref)}
</td></tr></table></td></tr>${sp(12)}`;

const noutati = `${sectionHead('Noutăți', 'Drop-urile noi.', 'Cele mai noi finisaje din magazin. Intră și ele în oferta −30% la 2 skinuri.')}${lead}${grid(NEW2, 'noutati', 2)}${seeAll('Vezi toate skinurile', '', u('/collections/toate-produsele', 'noutati'))}${sp(56)}`;

const USP = [
  ['Vinil premium', 'Doar 0,2 mm grosime. Zero volum adăugat.'],
  ['Tăiat laser pe modelul tău', 'Decupaje exacte pentru camere și butoane.'],
  ['Aplicare în 60 de secunde', 'Fără bule. Șervețel de curățare inclus.'],
  ['Plată ramburs', 'Plătești când primești coletul. Livrare în 1–2 zile lucrătoare.'],
  ['Retur în 30 de zile', 'Pentru produsele nefolosite, în ambalajul original.'],
  ['Înlocuire gratuită', 'Dacă aplicarea nu iese, îți trimitem un skin nou. Plătești doar transportul.'],
];
const uspCell = (k) => `<td class="stack uc" width="50%" valign="top" style="width:50%;padding:18px 0 18px;border-top:1px solid ${LINE};"><table ${T} width="100%"><tr><td width="30" valign="top" style="width:30px;${FM}font-size:10px;line-height:20px;font-weight:500;letter-spacing:.08em;color:${Y};">${String(k + 1).padStart(2, '0')}</td><td valign="top" style="padding-right:16px;"><div style="${FB}font-size:15px;line-height:20px;font-weight:700;font-stretch:108%;color:${FG};">${USP[k][0]}</div><div class="bd" style="margin-top:4px;${FB}font-size:14px;line-height:20px;color:#9F9F9D;">${USP[k][1]}</div></td></tr></table></td>`;
let uspRows = '';
for (let k = 0; k < 6; k += 2) uspRows += `<tr>${uspCell(k)}${uspCell(k + 1)}</tr>`;
const usp = `<tr><td class="px" style="padding:0 32px;">${eyebrow('De ce covered')}${h2('Tăiat pe modelul tău.')}</td></tr>${sp(24)}
<tr><td class="px" style="padding:0 32px;"><table ${T} width="100%">${uspRows}</table></td></tr>${sp(56)}`;

const stat = (i, num, plus, label, note) => `<td class="sc" width="50%" valign="top" style="width:50%;padding:22px 16px 24px 0;">
<table ${T} width="100%"><tr><td width="26" style="width:26px;${FM}font-size:10px;line-height:12px;font-weight:500;letter-spacing:.08em;color:${FAINT};">${i}</td><td valign="middle"><div style="height:1px;line-height:1px;font-size:1px;background-color:${Y};">&nbsp;</div></td></tr></table>
<div class="sn" style="margin-top:14px;${FD}font-size:44px;line-height:46px;font-weight:800;font-stretch:118%;letter-spacing:-0.02em;color:${FG};">${num}${plus ? `<span style="color:${Y};font-size:26px;line-height:26px;vertical-align:top;">+</span>` : ''}</div>
<div style="margin-top:10px;${FM}font-size:10.5px;line-height:15px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#A8A8A6;">${label}</div>
<div class="bd" style="margin-top:6px;${FB}font-size:14px;line-height:20px;color:#9F9F9D;">${note}</div></td>`;

const proof = `<tr><td class="px" bgcolor="${S2}" style="background-color:${S2};padding:52px 32px 36px;">
${eyebrow('covered în cifre')}${h2('Cifrele care ne recomandă.')}
<table ${T} width="100%" style="margin-top:26px;border-collapse:separate;" bgcolor="${INK}"><tr><td class="rbox" style="background-color:${INK};border:1px solid #313132;border-radius:14px;padding:22px 24px;">
<table ${T} width="100%"><tr>
<td class="stack" valign="middle" style="${FD}font-weight:800;font-stretch:118%;color:${FG};white-space:nowrap;"><span style="color:${Y};font-size:40px;line-height:64px;vertical-align:middle;">&#9733;</span>&nbsp;<span class="rv" style="font-size:64px;line-height:64px;letter-spacing:-0.02em;vertical-align:middle;">4,69</span><span style="font-size:24px;line-height:24px;color:${FAINT};vertical-align:middle;">/5</span></td>
<td class="stack rl" valign="middle" align="right" style="${FM}font-size:11px;line-height:17px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#A8A8A6;"><span style="color:${Y};letter-spacing:.2em;">&#9733;&#9733;&#9733;&#9733;&#9733;</span><br>Pe baza a 1.278 de recenzii</td>
</tr></table></td></tr></table>
<table ${T} width="100%" style="margin-top:8px;">
<tr>${stat('01', '37.000', 1, 'Clienți mulțumiți', 'Din 2018 până azi.')}${stat('02', '60.000', 1, 'Skinuri realizate', 'Fiecare tăiat laser pe forma exactă a telefonului.')}</tr>
<tr>${stat('03', '1,7', 0, 'Skinuri per client, în medie', 'Un singur finisaj e rareori de ajuns.')}${stat('04', '2018', 0, 'Anul în care am început', 'De atunci îmbrăcăm telefoane.')}</tr>
</table>
</td></tr>`;

const closing = `<tr><td class="px cta-bg" bgcolor="${INK}" align="center" style="background-color:${INK};padding:64px 32px 64px;text-align:center;">
<div style="${FM}font-size:11px;line-height:16px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${EYE};">${DOT}&nbsp;&nbsp;Din 2018</div>
<h2 class="h2c" style="margin:16px 0 0;${FD}font-size:44px;line-height:52px;font-weight:800;font-stretch:125%;letter-spacing:-0.02em;text-transform:uppercase;color:${FG};"><span style="color:${Y};">60.000+</span> skinuri<br>realizate.<br>Al tău urmează.</h2>
<p class="bd" style="margin:18px auto 0;max-width:480px;${FB}font-size:16px;line-height:24px;color:${MUT};">Alege modelul, alege finisajul. Restul durează 60 de secunde.</p>
<div style="height:28px;line-height:28px;font-size:1px;">&nbsp;</div>
${pair(btn(`Alege-ți telefonul&nbsp;&nbsp;${ARR}`, u('/', 'closing', '#alege-telefonul')), btn('Vezi toate skinurile', u('/collections/toate-produsele', 'closing'), 's'), 1)}
<div style="margin-top:22px;${FM}font-size:10.5px;line-height:16px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#A8A8A6;"><span style="color:${Y};">&#9670;</span>&nbsp; −30% la 2 skinuri · se aplică automat în coș</div>
</td></tr>`;

const fl = (t, href) => `<a href="${href}" style="color:#B2B2AF;text-decoration:underline;">${t}</a>`;
const idRow = (k, v) => `<tr><td style="padding:9px 0;border-top:1px solid #181818;${FM}font-size:10.5px;line-height:16px;letter-spacing:.1em;text-transform:uppercase;color:#999997;white-space:nowrap;">${k}</td><td align="right" style="padding:9px 0;border-top:1px solid #181818;${FM}font-size:12px;line-height:16px;color:#E0E0DC;">${v}</td></tr>`;
const soc = (t, href) => `<td style="padding-right:8px;"><table ${T}><tr><td style="border:1px solid #2F2F2F;border-radius:22px;"><a href="${href}" style="display:inline-block;padding:14px 18px;${FM}font-size:10.5px;line-height:14px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#DBDBD7;text-decoration:none;">${t}</a></td></tr></table></td>`;

const footer = `<tr><td class="px" bgcolor="#000000" style="background-color:#000000;padding:48px 32px 8px;border-top:1px solid #181818;">
<table ${T} width="100%"><tr>
<td class="stack" width="50%" valign="top" style="width:50%;padding-right:20px;">
<a href="${u('/', 'footer')}" style="text-decoration:none;"><img src="${CDN}covered_logo_white.png?v=1629830648&amp;width=220" width="110" alt="covered" style="display:block;width:110px;height:auto;border:0;${FB}font-size:20px;line-height:24px;font-weight:700;color:${FG};"></a>
<div style="margin-top:18px;${FD}font-size:15px;line-height:20px;font-weight:800;font-stretch:118%;text-transform:uppercase;color:${FG};">Skinuri din vinil premium, tăiate laser pe modelul tău.</div>
<div style="margin-top:12px;${FM}font-size:10px;line-height:15px;letter-spacing:.08em;text-transform:uppercase;color:#999997;">Din 2018 · 37.000+ clienți · 60.000+ skinuri</div>
<table ${T} style="margin-top:20px;"><tr>${soc('Instagram', 'https://www.instagram.com/covered.ro')}${soc('TikTok', 'https://www.tiktok.com/@covered.ro')}</tr></table>
</td>
<td class="stack fc" width="50%" valign="top" style="width:50%;">
<div style="${FM}font-size:10.5px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;color:#999997;">Firmă &amp; contact</div>
<div style="margin-top:10px;${FD}font-size:16px;line-height:20px;font-weight:800;font-stretch:118%;text-transform:uppercase;color:${FG};">SC Covered SRL</div>
<table ${T} width="100%" style="margin-top:12px;">${idRow('CUI', '47818139')}${idRow('Nr. Reg. Com.', 'J20/341/2023')}${idRow('E-mail', `<a href="mailto:covered.ro@gmail.com" style="color:#E0E0DC;text-decoration:none;">covered.ro@gmail.com</a>`)}${idRow('Telefon', `<a href="tel:0750422122" style="color:#E0E0DC;text-decoration:none;">0750 422 122</a>`)}</table>
<div style="margin-top:10px;${FB}font-size:13px;line-height:19px;color:#B2B2AF;">Str. Principală nr. 98, 335309 Strei, Hunedoara, România</div>
</td></tr></table>
<table ${T} width="100%" style="margin-top:32px;"><tr><td style="border-top:1px solid #181818;padding:22px 0 0;${FB}font-size:13px;line-height:22px;color:#B2B2AF;">
${fl('Termeni și condiții', u('/pages/termeni-si-conditii', 'footer'))} &nbsp;·&nbsp; ${fl('Politica de confidențialitate', u('/pages/politica-de-confidentialitate', 'footer'))} &nbsp;·&nbsp; ${fl('Politica de returnare', u('/policies/refund-policy', 'footer'))} &nbsp;·&nbsp; ${fl('Politica de livrare', u('/policies/shipping-policy', 'footer'))} &nbsp;·&nbsp; ${fl('ANPC', 'https://anpc.ro/ce-este-sal/')} &nbsp;·&nbsp; ${fl('SOL', 'https://ec.europa.eu/consumers/odr')}
<p style="margin:16px 0 0;${FB}font-size:13px;line-height:20px;color:#999997;">Primești acest e-mail pentru că te-ai abonat la noutățile covered. <a href="{{view_in_browser_url}}" style="color:#E0E0DC;text-decoration:underline;">Vezi emailul în browser</a> &nbsp;·&nbsp; <a href="{{unsubscribe_url}}" style="color:#E0E0DC;text-decoration:underline;">Dezabonare</a></p>
<p style="margin:14px 0 0;${FM}font-size:10.5px;line-height:16px;letter-spacing:.08em;text-transform:uppercase;color:#999997;">© 2026 covered.</p>
</td></tr></table>
</td></tr>
<tr><td bgcolor="#000000" aria-hidden="true" style="background-color:#000000;padding:0;mso-hide:all;"><div class="wm" style="overflow:hidden;height:78px;text-align:center;${FD}font-size:104px;line-height:104px;font-weight:800;font-stretch:125%;letter-spacing:-0.045em;color:#141414;mso-hide:all;">covered</div></td></tr>`;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Martian+Mono:wght@400..600&display=swap');
:root{color-scheme:dark;supported-color-schemes:dark}
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table,td{mso-table-lspace:0;mso-table-rspace:0}
img{-ms-interpolation-mode:bicubic}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
u+#body a{color:inherit;text-decoration:none}
.bt a:hover{opacity:.88}
.hero-bg{background-image:radial-gradient(ellipse 70% 55% at 50% 72%,#2A1F06 0%,#140F05 45%,#0A0A0B 75%)}
.glow{background-image:radial-gradient(closest-side,rgba(245,177,0,.22),rgba(245,177,0,.06) 55%,rgba(10,10,11,0))}
.tile{background-image:radial-gradient(120% 85% at 50% 6%,#FBFBF9 0%,#EFEFEB 56%,#E3E3DE 100%)}
.seeall{background-image:linear-gradient(100deg,rgba(245,177,0,.12),rgba(18,18,19,0) 70%)}
.cta-bg{background-image:radial-gradient(ellipse 60% 60% at 50% 40%,#1A160A 0%,#0A0A0B 70%)}
@supports (-webkit-text-stroke:1px #000){
.ol{-webkit-text-fill-color:${INK};-webkit-text-stroke:3px ${Y};paint-order:stroke fill}
.olk{-webkit-text-fill-color:${Y};-webkit-text-stroke:1.5px ${INK};paint-order:stroke fill}
}
@supports (transform:rotate(-2deg)){
.bandwrap{overflow:hidden}
.tilt{transform:rotate(-2deg);margin:14px -24px;box-shadow:0 16px 40px -16px rgba(0,0,0,.6)}
}
@media (max-width:620px){
.container{width:100%!important;max-width:100%!important}
.px{padding-left:20px!important;padding-right:20px!important}
.stack{display:block!important;width:auto!important;max-width:100%!important;padding-left:0!important;padding-right:0!important;box-sizing:border-box}
.gap{height:12px!important;width:100%!important}
.full,.bt{width:100%!important}
.bt a{display:block!important}
.h1a{font-size:34px!important;line-height:40px!important}
.h1b{font-size:84px!important;line-height:90px!important}
.lead{font-size:16px!important;line-height:24px!important}
.h2{font-size:26px!important;line-height:31px!important}
.h2c{font-size:27px!important;line-height:33px!important}
.logo{width:96px!important}
.hm{display:none!important}
.nav{font-size:9.5px!important}
.pc{padding:4px!important;border-radius:14px!important}
.gut{width:8px!important}
.tile{padding:8px 8px 10px!important}
.ci{padding:12px 6px 6px!important}
.ct{font-size:13px!important;line-height:17px!important}
.pr{font-size:11.5px!important;font-stretch:87.5%}
.band{font-size:17px!important;line-height:24px!important;padding:12px 10px!important}
.tk{padding-left:18px!important;padding-right:18px!important}
.tt{font-size:20px!important;line-height:24px!important}
.tv{font-size:11px!important}
.li{padding:18px 16px 20px!important}
.tile-lg{padding:12px 12px 16px!important}
.uc{padding:16px 0!important}
.sc{padding:18px 10px 18px 0!important}
.sn{font-size:30px!important;line-height:34px!important}
.rv{font-size:52px!important}
.rl{text-align:left!important;padding-top:10px!important}
.fc{padding-top:32px!important}
.wm{font-size:64px!important;line-height:64px!important;height:48px!important}
.bd{font-size:14px!important}
}`.trim();

const html = `<!DOCTYPE html>
<html lang="ro" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>−30% la 2 skinuri · covered</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><style>*{font-family:Arial,sans-serif!important}</style><![endif]-->
<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&amp;family=Martian+Mono:wght@400..600&amp;display=swap" rel="stylesheet"><!--<![endif]-->
<style>
${css}
</style>
</head>
<body id="body" bgcolor="${INK}" style="margin:0;padding:0;width:100%;background-color:${INK};">
${preheader}
<table ${T} width="100%" bgcolor="${INK}" style="background-color:${INK};"><tr><td align="center" bgcolor="${INK}" style="background-color:${INK};">
<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center"><tr><td><![endif]-->
<table ${T} width="600" class="container" bgcolor="${INK}" style="width:600px;max-width:600px;background-color:${INK};margin:0 auto;">
${ticker}
${header}
${hero}
${ticket}
${band}
${iphone}
${samsung}
${noutati}
${usp}
${proof}
${closing}
${footer}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>
</body>
</html>
`;

function upper(h) {
  const VOID = /^<(img|br|meta|link|hr|input|col|source)\b/i;
  const stack = []; let out = '';
  for (const tok of h.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g)) {
    if (tok.startsWith('<!--')) { out += tok; continue; }
    if (tok.startsWith('</')) { stack.pop(); out += tok; continue; }
    if (tok.startsWith('<')) {
      if (!VOID.test(tok) && !tok.endsWith('/>') && !/^<!doctype/i.test(tok)) stack.push(/text-transform:uppercase/.test(tok) || (stack.length && stack[stack.length - 1]));
      out += tok.replace(/text-transform:uppercase;?/g, ''); continue;
    }
    if (stack.length && stack[stack.length - 1]) out += tok.replace(/(&[#a-zA-Z0-9]+;)|([^&]+)/g, (m, e, t) => e ? e : t.toLocaleUpperCase('ro'));
    else out += tok;
  }
  return out;
}
const out = path.join(__dirname, 'variant-c.html');
const fin = upper(html).replace(/\n{2,}/g, '\n');
fs.writeFileSync(out, fin);
console.log('final bytes', Buffer.byteLength(fin));
