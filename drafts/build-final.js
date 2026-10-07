// Builds covered-email-30-la-2-skinuri.html (repo root) — final "−30% la 2 skinuri" email.
// Base: variant A (Skin Lab / spec sheet) + judge must_fix + grafts from B and C (research/judgments.json).
// Prices, titles, ratings: verified in the covered Shopify admin on 2026-10-07 (see README.md).
const fs = require('fs');
const path = require('path');

const BF = "font-family:Archivo,'Helvetica Neue',Arial,sans-serif;";
const D = "font-family:Archivo,'Arial Black','Helvetica Neue',Arial,sans-serif;font-weight:800;text-transform:uppercase;";
const M = "font-family:'Martian Mono',Menlo,Consolas,monospace;";
const UTM = 'utm_source=email&amp;utm_medium=newsletter&amp;utm_campaign=30-la-2-skinuri&amp;utm_content=';
const u = (p, slug, hash = '') => { const url = p.startsWith('http') ? p : 'https://covered.ro' + p; return url.replace(/&(?!amp;)/g, '&amp;') + (url.includes('?') ? '&amp;' : '?') + UTM + slug + hash; };
const T = 'role="presentation" cellpadding="0" cellspacing="0" border="0"';
const shop = f => 'https://cdn.shopify.com/s/files/1/0059/0466/2626/files/' + f;
const L0 = 'font-size:10px;line-height:12px;font-weight:500;letter-spacing:.08em;';
const LBL = M + L0;
const INK = '#0A0A0B', Y = '#F5B100', TX = '#F3F3EF', MU = '#B2B2AF', LB = '#9A9A98', CARD = '#121213', BRD = '#262626';

// ---------- atoms ----------
const dot = `<td width="13" valign="top" style="padding:1px 9px 0 0;"><div style="width:7px;height:7px;border:3px solid #392B09;border-radius:7px;background-color:${Y};font-size:0;line-height:0;">&nbsp;</div></td>`;
const eyebrow = (t, color = LB) => `<table ${T}><tr>${dot}<td style="${M}font-size:11px;line-height:15px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${color};">${t}</td></tr></table>`;
const tag = t => `<span class="tag" style="font-size:10px;line-height:12px;font-weight:500;text-transform:uppercase;color:${TX};background-color:${INK};border:1px solid #2F2F2F;display:inline-block;padding:5px 9px;border-radius:4px;letter-spacing:.08em;white-space:nowrap;"><span style="color:${Y};">&#9679;</span>&nbsp;${t}</span>`;
const rule = (c = BRD) => `<div style="height:1px;line-height:1px;font-size:1px;background-color:${c};">&nbsp;</div>`;
const gapDiv = h => `<div style="height:${h}px;line-height:${h}px;font-size:1px;">&nbsp;</div>`;
const spacer = h => `<tr><td height="${h}" style="font-size:0;line-height:0;">&nbsp;</td></tr>`;
const open = () => `<tr><td bgcolor="${INK}" class="px" style="background-color:${INK};padding:0 24px;">`;

// Bulletproof button: VML for Outlook (primary), padded link everywhere else.
const btn = (label, href, primary, vmlW) => {
  const bg = primary ? Y : INK;
  const html = `<table ${T} class="bt"><tr><td align="center" bgcolor="${bg}" style="background-color:${bg};border-radius:5px;${primary ? '' : 'border:1px solid #4B4B4B;'}"><a href="${href}" style="display:block;padding:0 26px;height:48px;line-height:48px;${BF}font-size:13px;font-weight:700;font-stretch:112%;letter-spacing:.04em;text-transform:uppercase;color:${primary ? INK : TX};text-decoration:none;white-space:nowrap;border-radius:5px;">${label}</a></td></tr></table>`;
  return `<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:48px;v-text-anchor:middle;width:${vmlW}px;" arcsize="10%" ${primary ? 'stroke="f"' : 'strokecolor="#4B4B4B"'} fillcolor="${bg}"><w:anchorlock/><center style="color:${primary ? INK : TX};font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">${label}</center></v:roundrect><![endif]--><!--[if !mso]><!-- -->${html}<!--<![endif]-->`;
};

const H2 = (txt, cls = 'h2', extra = '') => `<h2 class="${cls}" style="margin:0;mso-line-height-rule:exactly;${D}font-size:30px;line-height:36px;font-stretch:122%;letter-spacing:-.015em;color:${TX};${extra}">${txt}</h2>`;
const meter = (idx, w = 30) => `<table ${T} width="100%"><tr><td width="${w}" style="${LBL}color:#7F7F7D;">${idx}</td><td>${rule(Y)}</td></tr></table>`;
// Plain site header: dot eyebrow + H2 (+ intro) + hairline. The numbered meter is kept for the stats block only, as on the site.
const secHead = (eb, h2, intro, noRule) => `${open()}
<div style="padding:0 0 10px 0;">${eyebrow(eb)}</div>
${H2(h2)}
${intro ? `<div style="padding-top:10px;font-size:15px;line-height:23px;color:${MU};">${intro}</div>` : ''}
${noRule ? '' : `<div style="padding-top:22px;">${rule()}</div>`}
</td></tr>`;

// ---------- product data (Shopify admin, 2026-10-07) ----------
const fmt = n => 'RON ' + n.toFixed(2);
const P = o => Object.assign(o, { bundle: fmt(Math.round(o.price * 70) / 100) });
const IPH = [
  P({ t: 'Skin iPhone Dark - Rafinat cu Aur 22K - EDITIE SPECIALA', h: 'skin-iphone-dark-rafinat-cu-aur-22k-editie-speciala', img: shop('dark.png?v=1728115103'), price: 120, cmp: 150, pct: 20, fin: 'Aur 22K', rate: '4,6 (36)', alt: 'Skin iPhone Dark rafinat cu aur 22K, marmură neagră cu vene aurii' }),
  P({ t: 'Skin iPhone - Titanium 3D', h: 'skin-iphone-titanium', img: shop('titan.png?v=1728021089'), price: 89, cmp: 120, pct: 25, best: 1, fin: '3D', rate: '4,9 (40)', alt: 'Skin iPhone Titanium 3D, titan periat argintiu' }),
  P({ t: 'Skin iPhone - Negru Mat', h: 'skin-iphone-negru-mat', img: shop('negru_mat.png?v=1728021074'), price: 69, cmp: 120, pct: 42, best: 1, fin: 'Mat', rate: '4,8 (26)', alt: 'Skin iPhone Negru Mat pe spatele telefonului' }),
  P({ t: 'Skin iPhone - Black Titanium 3D', h: 'skin-iphone-black-titanium-3d', img: shop('black_titan.png?v=1728021014'), price: 89, cmp: 120, pct: 25, fin: '3D', rate: '4,8 (38)', alt: 'Skin iPhone Black Titanium 3D, titan periat gri închis' }),
];
const SAM = [
  P({ t: 'Skin Samsung - Negru Mat', h: 'skin-samsung-negru-mat', img: shop('negru_mat_95624e23-a169-476e-9935-f8fb196dee76.png?v=1729360165'), price: 69, cmp: 120, pct: 42, best: 1, fin: 'Mat', rate: '4,4 (7)', alt: 'Skin Samsung Negru Mat pe spatele unui Galaxy' }),
  P({ t: 'Skin Samsung - Transparent (folie ppf)', h: 'skin-samsung-transparent-folie-protectie-flexibila', img: shop('sk_transparent_d777e951-0376-4cf6-9796-10374c3e18ca.png?v=1729194674'), price: 99, cmp: 150, pct: 34, fin: 'PPF', rate: '5,0 (7)', alt: 'Skin Samsung transparent, folie PPF pe un Galaxy' }),
  P({ t: 'Skin Samsung - Splash', h: 'skin-samsung-splash-finisaj-mat', img: shop('splash_8efdf64c-ffd7-472c-af26-39ce7cc196ca.png?v=1729194600'), price: 99, cmp: 120, pct: 17, fin: 'Mat', rate: '4,5 (12)', alt: 'Skin Samsung Splash, marmură gri cu stropi aurii' }),
  P({ t: 'Skin Samsung - Honeycomb 3D', h: 'skin-samsung-honeycomb', img: shop('honey_9497cee7-e8ed-44ac-b7b7-6483887fe764.png?v=1729194187'), price: 99, cmp: 120, pct: 17, fin: '3D', rate: '4,5 (11)', alt: 'Skin Samsung Honeycomb 3D, textură fagure neagră' }),
];
const LEAD = P({ t: 'Skin iPhone - Negru ULTRA Matte', h: 'skin-iphone-negru-ultra-matte', img: shop('ultramatte.png?v=1791104171'), price: 90, cmp: 120, pct: 25, d: 'Skin Negru ULTRA mat, realizat din autocolant 3M Premium.', alt: 'Skin iPhone Negru ULTRA Matte' });
const NEW = [
  P({ t: 'Skin iPhone - OFF Silver', h: 'skin-iphone-off-silver', img: shop('Final_iPhonduosilvere17ProMaxFullWrapSkinDesignMockupFrontBackandSide.png?v=1791017326'), price: 120, cmp: 0, pct: 0, fin: 'OFF', nou: 1, alt: 'Skin iPhone OFF Silver, ramă argintie și panou alb' }),
  P({ t: 'Skin iPhone - DUO Pink', h: 'skin-iphone-duo-pink', img: shop('duopink.png?v=1789890742'), price: 99, cmp: 120, pct: 17, fin: 'DUO', nou: 1, alt: 'Skin iPhone DUO Pink în două nuanțe de roz' }),
];

// ---------- product pieces (pill / % circle / card borders inlined so they survive <style> stripping) ----------
// Pill typography (10px / 600 / .06em / uppercase) comes from the parent: see PT.
const PT = 'font-size:10px;line-height:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;';
const pill = (txt, bg, fg, extra = '') => `<span style="display:inline-block;color:${fg};background-color:${bg};border-radius:9px;padding:4px 8px;margin:0 3px 3px 0;white-space:nowrap;${extra}">${txt}</span>`;
const pctCircle = `<b style="display:inline-block;width:22px;line-height:22px;border-radius:11px;text-align:center;margin-right:6px;background-color:${Y};color:${INK};">%</b>`;
const priceRow = p => `<div style="font-size:11px;line-height:18px;"><span class="pv" style="font-size:13px;font-weight:500;color:${Y};white-space:nowrap;">${fmt(p.price)}</span>${p.cmp ? ` <s style="color:#8C8C8B;white-space:nowrap;margin-left:4px;">${fmt(p.cmp)}</s>` : ''}</div>`;
const offerChip = p => `<div style="background-color:#2D2511;border:1px solid #634B0C;border-radius:10px;padding:6px 8px;font-size:10px;line-height:22px;color:#C9C6BC;">${pctCircle}<b style="font-size:11px;color:${TX};white-space:nowrap;">${p.bundle}</b><span class="ob"> / buc. când iei 2</span></div>`;
const imgStyle = (mw, alt = '#45433E') => `display:block;width:100%;max-width:${mw}px;height:auto;margin:0 auto;border:0;font-size:12px;line-height:16px;color:${alt};`;
const BL = 'border:solid #1F1F20;border-width:0 1px;';

// Row-split cards: tile / info / price / offer rows are shared across each pair, so they line up.
// Badge area has a fixed height (2 lines on mobile) so a wrapping "Cel mai vândut" pill never shifts the phone.
function grid(list, slug, startIdx = 1) {
  let out = '';
  for (let i = 0; i < list.length; i += 2) {
    const pair = [list[i], list[i + 1]];
    const row = fn => `<tr>${pair.map((p, k) => (k ? '<td width="2%"></td>' : '') + fn(p, u('/products/' + p.h, slug), i + k + startIdx)).join('')}</tr>`;
    out += (i ? gapDiv(12) : '') + `<table ${T} width="100%" style="${M}table-layout:fixed;">
${row((p, l) => `<td width="49%" valign="top" bgcolor="${CARD}" style="background-color:${CARD};padding:6px 6px 0 6px;border:solid #1F1F20;border-width:1px 1px 0;border-radius:16px 16px 0 0;"><table ${T} width="100%"><tr><td class="tile" bgcolor="#EFEFEB" style="background-color:#EFEFEB;border-radius:12px;padding:10px 10px 14px 10px;">
<div class="bdg" style="height:22px;${PT}">${p.nou ? pill(`<span style="color:${Y};">&#9679;</span> Nou`, '#FFFFFF', INK, 'border:1px solid #DADAD4;') : ''}${p.pct ? pill('-' + p.pct + '%', Y, INK) : ''}${p.best ? pill('&#9733; Cel mai vândut', INK, Y) : ''}</div>
<a href="${l}"><img class="pimg" src="${p.img}&amp;width=400" width="180" alt="${p.alt}" style="${imgStyle(180)}"></a></td></tr></table></td>`)}
${row((p, l, n) => `<td valign="top" bgcolor="${CARD}" class="ci" style="background-color:${CARD};${BL}padding:14px 14px 0 14px;font-size:10px;line-height:14px;color:${LB};">${String(n).padStart(2, '0')} &middot; ${p.fin.toUpperCase()}${p.rate ? ` <span class="rt" style="color:${MU};white-space:nowrap;">&nbsp;<span style="color:${Y};">&#9733;</span> ${p.rate}</span>` : ''}<a href="${l}" class="ttl" style="display:block;padding-top:7px;${BF}font-size:14.5px;line-height:19px;font-weight:600;color:${TX};text-decoration:none;">${p.t}</a></td>`)}
${row(p => `<td valign="bottom" bgcolor="${CARD}" class="ci" style="background-color:${CARD};${BL}padding:10px 14px 12px 14px;">${priceRow(p)}</td>`)}
${row(p => `<td valign="top" bgcolor="${CARD}" style="background-color:${CARD};border:solid #1F1F20;border-width:0 1px 1px;border-radius:0 0 16px 16px;padding:0 6px 6px 6px;">${offerChip(p)}</td>`)}
</table>`;
  }
  return out;
}

// See-all bar: the whole label is a padded block link (≥ 44px tap row).
const seeAll = (label, count, href) => `<table ${T} width="100%" bgcolor="#1A170D" style="background-color:#1A170D;border:1px solid #8C6806;border-radius:12px;"><tr><td><a href="${href}" class="sa" style="display:block;padding:20px 0 20px 18px;${BF}font-size:14px;line-height:18px;font-weight:800;font-stretch:112%;text-transform:uppercase;color:${TX};text-decoration:none;">${label}</a></td>${count ? `<td align="right" style="padding:0 10px;${M}font-size:12px;line-height:18px;font-weight:500;color:${Y};white-space:nowrap;">${count}</td>` : ''}<td width="44" style="padding:6px 10px 6px 0;"><a href="${href}" style="display:block;width:44px;height:44px;line-height:44px;border-radius:44px;background-color:${Y};text-align:center;font-size:18px;font-weight:700;color:${INK};text-decoration:none;">&rarr;</a></td></tr></table>`;

// ---------- corner brackets ----------
const cTop = pos => `<td width="16" valign="top"><div style="height:12px;font-size:0;line-height:0;"></div><div style="width:15px;height:11px;font-size:0;line-height:0;border-top:1px solid #50504F;border-${pos}:1px solid #50504F;"></div></td>`;
const cBot = pos => `<td width="16" valign="top"><div style="width:15px;height:11px;font-size:0;line-height:0;border-bottom:1px solid #50504F;border-${pos}:1px solid #50504F;"></div></td>`;

// ---------- sections ----------
const preheader = '−30% la 2 skinuri. Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.';
const pad = '&#847;&zwnj;&nbsp;'.repeat(22);

const topbar = `<tr><td bgcolor="#000000" class="px" style="background-color:#000000;padding:10px 24px;border-bottom:1px solid #181818;${M}font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;">
<table ${T} width="100%"><tr>
<td class="hide" style="color:#C2C2BF;white-space:nowrap;"><span style="color:${Y};">&#9670;</span>&nbsp; Plată ramburs la livrare</td>
<td align="right" class="tc" style="white-space:nowrap;"><a href="{{view_in_browser_url}}" style="color:#C2C2BF;text-decoration:underline;">Vezi emailul în browser</a></td>
</tr></table></td></tr>`;

const navA = (l, p) => `<a href="${u(p, 'header')}" style="color:${TX};text-decoration:none;">${l}</a>`;
const logoImg = cls => `<img${cls ? ` class="${cls}"` : ''} src="https://covered.ro/cdn/shop/files/covered_logo_white.png?v=1629830648&amp;width=240" width="120" alt="covered" style="display:block;width:120px;height:auto;border:0;${BF}font-size:22px;line-height:24px;font-weight:800;color:${TX};">`;
const header = `<tr><td bgcolor="${INK}" class="px" style="background-color:${INK};padding:20px 24px;border-bottom:1px solid ${BRD};">
<table ${T} width="100%"><tr>
<td><a href="${u('/', 'header')}" style="text-decoration:none;">${logoImg('logo')}</a></td>
<td align="right" style="${M}font-size:10px;line-height:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;">${navA('iPhone', '/collections/apple-skin')}<span style="color:#50504F;"> &nbsp;/&nbsp; </span>${navA('Samsung', '/collections/samsung-skin')}<span style="color:#50504F;"> &nbsp;/&nbsp; </span>${navA('Pixel', '/collections/google')}</td>
</tr></table></td></tr>`;

// Equation panel = verified cart maths (30% on each skin once there are 2): 89.00 → 62.30, 69.00 → 48.30, 158.00 → 110.60.
const HP = { a: { p: IPH[1], brand: 'iPhone', fin: 'Titanium 3D' }, b: { p: SAM[0], brand: 'Samsung', fin: 'Negru Mat' } };
const heroImg = x => `<td width="44%" align="center" valign="bottom" style="padding-top:10px;"><a href="${u('/products/' + x.p.h, 'hero-exemplu')}"><img class="himg" src="${x.p.img}&amp;width=400" width="150" alt="${x.p.alt}" style="${imgStyle(150, MU)}"></a></td>`;
const capTd = x => `<td align="center" valign="top" style="padding:12px 4px 18px 4px;${L0}line-height:15px;text-transform:uppercase;color:${TX};">${x.brand}<br><span style="color:${LB};">${x.fin}</span><br><span style="display:inline-block;padding-top:6px;font-size:11px;"><s style="color:#8C8C8B;">${fmt(x.p.price)}</s> <b style="color:${Y};font-weight:600;white-space:nowrap;">&rarr; ${x.p.bundle}</b></span></td>`;
const hero = `<tr><td bgcolor="${INK}" class="px" style="background-color:${INK};padding:40px 24px 0 24px;">
${eyebrow('Ofertă pachet · Skinuri pentru iPhone, Samsung și Pixel', '#A8A8A6')}
${gapDiv(22)}
<table ${T} width="100%" style="${M}">
<tr>${cTop('left')}<td style="padding:0 8px;">${tag('Oricare 2 skinuri')}</td>${cTop('right')}</tr>
<tr><td width="16"></td><td class="hin" style="padding:22px 8px 26px 8px;">
<div role="heading" aria-level="1" style="mso-line-height-rule:exactly;${D}font-stretch:125%;letter-spacing:-.02em;">
<div class="hxl" style="font-size:132px;line-height:124px;color:${Y};">&minus;30%</div>
<table ${T} width="100%"><tr><td class="hl" valign="bottom" style="${D}font-stretch:125%;letter-spacing:-.02em;font-size:76px;line-height:84px;color:${TX};white-space:nowrap;">la 2</td>
<td valign="bottom" align="right" style="padding:0 0 12px 12px;"><table ${T} style="border:1px solid #2F2F2F;border-radius:6px;"><tr><td class="hn" style="padding:8px 10px;${M}font-size:10px;line-height:15px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:${LB};white-space:nowrap;">Ex. Negru Mat &times; 2<br><s style="color:#8C8C8B;">RON 138.00</s><br><span class="hnp" style="${D}font-size:22px;line-height:26px;font-stretch:112%;letter-spacing:0;color:${Y};">RON 96.60</span></td></tr></table></td></tr></table>
<div class="hl ol" style="font-size:76px;line-height:84px;color:${TX};">skinuri.</div>
</div>
<p class="lead" style="margin:22px 0 0 0;max-width:440px;${BF}font-size:17px;line-height:26px;color:${MU};">Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat&nbsp;în&nbsp;coș.</p>
</td><td width="16"></td></tr>
<tr>${cBot('left')}<td align="right" style="padding:0 8px;">${tag('Orice telefon')} ${tag('Automat în coș')}</td>${cBot('right')}</tr>
</table>
</td></tr>
${spacer(26)}
${open()}
<table ${T} width="100%" bgcolor="#111113" class="panel" style="${M}background-color:#111113;border:1px solid ${BRD};border-radius:16px;">
<tr><td align="center" style="padding-top:22px;${L0}color:${LB};">SKIN 01</td><td width="12%"></td><td align="center" style="padding-top:22px;${L0}color:${LB};">SKIN 02</td></tr>
<tr>${heroImg(HP.a)}<td align="center" valign="middle"><table ${T} align="center"><tr><td width="38" height="38" align="center" bgcolor="${Y}" style="width:38px;height:38px;border-radius:38px;background-color:${Y};${D}font-size:22px;line-height:38px;color:${INK};">+</td></tr></table></td>${heroImg(HP.b)}</tr>
<tr>${capTd(HP.a)}<td></td>${capTd(HP.b)}</tr>
<tr><td colspan="3" style="padding:0 16px;">${rule()}</td></tr>
<tr><td colspan="3" style="padding:14px 16px 18px 16px;"><table ${T} width="100%"><tr>
<td class="stack" valign="middle" style="${L0}line-height:15px;text-transform:uppercase;color:${TX};">= Total estimat<br><span style="color:${LB};text-transform:none;letter-spacing:0;font-size:11px;line-height:16px;">TVA inclus. Livrarea se calculează la finalizarea comenzii.</span></td>
<td class="stack tl" align="right" valign="middle" style="padding-left:12px;white-space:nowrap;"><s style="font-size:12px;line-height:16px;color:#8C8C8B;">RON 158.00</s> <span class="tot" style="${D}font-size:28px;line-height:32px;font-stretch:112%;color:${TX};">RON 110.60</span><br><span style="${PT}">${pill('Economisești RON 47.40', Y, INK, 'margin:6px 0 0 0;')}</span></td>
</tr></table></td></tr>
</table>
</td></tr>
${spacer(24)}
${open()}
<div style="padding:0 0 22px 0;${BF}font-size:14px;line-height:21px;color:${MU};"><b style="color:${TX};">Fără cod. Iei 3?</b> Și al treilea are &minus;30%: reducerea se aplică fiecărui skin din coș. Husele, foliile de ecran și extraopțiunile nu intră în ofertă.</div>
<table ${T} class="ctab"><tr>
<td class="stack" style="padding-right:12px;">${btn('Alege-ți telefonul &rarr;', u('/', 'hero', '#alege-telefonul'), true, 250)}</td>
<td class="stack sp">${btn('Vezi cele mai vândute', u('/collections/toate-produsele?sort_by=best-selling', 'hero'), false, 240)}</td>
</tr></table>
</td></tr>
${spacer(44)}`;

// Tilted marquee band (from C): site word sequence, outlined alternates, −2° tilt where transforms are supported.
const star = `<span style="font-size:.6em;vertical-align:middle;">&#10022;</span>`;
const bw = (t, ol) => `<span${ol ? ' class="olk"' : ''} style="color:${INK};">${t}</span>`;
const band = `<tr><td bgcolor="${INK}" style="background-color:${INK};"><div class="bandwrap" style="overflow:hidden;padding:6px 0;">
<div class="tilt"><table ${T} width="100%" bgcolor="${Y}" style="background-color:${Y};"><tr><td style="padding:6px 0;"><table ${T} width="100%"><tr><td class="band" align="center" style="border-top:1px solid #C18C02;border-bottom:1px solid #C18C02;padding:14px 16px;${D}font-size:27px;line-height:34px;font-stretch:125%;letter-spacing:-.01em;color:${INK};">
<div>${bw('Vinil premium')} ${star} ${bw('Tăiat laser', 1)}</div>
<div>${bw('Aplicare în 60 de secunde')}</div>
<div>${bw('Zero volum', 1)} ${star} ${bw('Plată ramburs')}</div>
</td></tr></table></td></tr></table></div></div>
</td></tr>
${spacer(52)}`;

const prodSection = (eb, h2, list, slug, label, count, coll) => `${secHead(eb, h2)}
${spacer(20)}
${open()}${grid(list, slug)}
${gapDiv(16)}${seeAll(label, count, u(coll, slug + '-toate'))}</td></tr>
${spacer(52)}`;

const iphone = prodSection('Skinuri iPhone · Cele mai vândute', 'Top vânzări iPhone.', IPH, 'top-iphone', 'Vezi toate skinurile iPhone', '199', '/collections/apple-skin');
const samsung = prodSection('Skinuri Samsung · Cele mai vândute', 'Top vânzări Samsung.', SAM, 'top-samsung', 'Vezi toate skinurile Samsung', '138', '/collections/samsung-skin');

// Noutăți: 1-up lead card (C) + 2-up grid.
const leadL = u('/products/' + LEAD.h, 'noutati');
const lead = `<table ${T} width="100%" bgcolor="${CARD}" style="${M}background-color:${CARD};border:1px solid #1F1F20;border-radius:16px;"><tr>
<td class="stack" width="46%" valign="top" style="padding:6px;"><table ${T} width="100%"><tr><td class="tile" bgcolor="#EFEFEB" align="center" style="background-color:#EFEFEB;border-radius:12px;padding:10px 10px 16px 10px;"><div style="text-align:left;${PT}">${pill(`<span style="color:${Y};">&#9679;</span> Nou`, '#FFFFFF', INK, 'border:1px solid #DADAD4;')}${pill('-' + LEAD.pct + '%', Y, INK)}</div><a href="${leadL}"><img class="limg" src="${LEAD.img}&amp;width=400" width="170" alt="${LEAD.alt}" style="${imgStyle(170)}"></a></td></tr></table></td>
<td class="stack lin" valign="middle" style="padding:18px 20px 18px 14px;">
<div style="${LBL}text-transform:uppercase;color:${LB};"><span style="color:${Y};">01</span> &middot; Cel mai nou skin</div>
<div style="padding-top:10px;"><a href="${leadL}" style="${D}font-size:24px;line-height:28px;font-stretch:112%;color:${TX};text-decoration:none;">Negru ULTRA Matte</a></div>
<div style="padding-top:8px;${BF}font-size:15px;line-height:22px;color:${MU};">${LEAD.d}</div>
<div style="padding-top:12px;">${priceRow(LEAD)}</div>
<div style="padding-top:10px;">${offerChip(LEAD)}</div>
<div style="padding-top:16px;"><a href="${leadL}" style="${LBL}font-size:11px;line-height:16px;text-transform:uppercase;color:${Y};text-decoration:none;">Vezi skinul &rarr;</a></div>
</td></tr></table>`;
const noutati = `${secHead('Noutăți · Drop-uri noi', 'Finisaje noi.', 'Cele mai noi skinuri de pe site. Intră și ele în oferta de &minus;30% la 2 skinuri.')}
${spacer(20)}
${open()}${lead}${gapDiv(12)}${grid(NEW, 'noutati', 2)}
${gapDiv(16)}${seeAll('Vezi toate noutățile', '', u('/collections/all?sort_by=created-descending', 'noutati-toate'))}</td></tr>
${spacer(52)}`;

const USP = [
  ['Vinil premium', 'Doar 0,2 mm grosime. Zero volum adăugat.'],
  ['Tăiat laser pe modelul tău', 'Decupaje exacte pentru camere și butoane.'],
  ['Aplicare în 60 de secunde', 'Fără bule. Șervețel de curățare inclus.'],
  ['Plată ramburs', 'Plătești când primești coletul. Livrare în 1–2 zile lucrătoare.'],
];
const uspCell = i => `<td class="stack uc" width="50%" valign="top" style="border-top:1px solid ${BRD};padding:18px ${i % 2 ? '0 18px 20px' : '18px 20px 0'};${i % 2 ? '' : `border-right:1px solid ${BRD};`}"><div style="${BF}font-size:15px;line-height:19px;font-weight:700;font-stretch:108%;color:${TX};">${USP[i][0]}</div><div style="padding-top:5px;${BF}font-size:14px;line-height:20px;color:${MU};">${USP[i][1]}</div></td>`;
const usps = `${secHead('De ce covered', 'Zero volum, stil&nbsp;maxim.', '', 1)}
${spacer(22)}
${open()}
<table ${T} width="100%" style="border-bottom:1px solid ${BRD};">${[0, 2].map(i => `<tr>${uspCell(i)}${uspCell(i + 1)}</tr>`).join('')}</table>
</td></tr>
${spacer(52)}`;

const stat = (i, big, plus, label, note, l) => `<td class="stc" width="50%" valign="top" style="padding:0 ${l ? '20px 0 0' : '0 0 20px'};${l ? 'border-right:1px solid #313132;' : ''}">
${meter('0' + i, 26)}
<div class="num" style="padding-top:14px;${D}font-size:44px;line-height:46px;font-stretch:118%;letter-spacing:-.02em;color:${TX};white-space:nowrap;">${big}${plus ? `<span style="font-size:.55em;vertical-align:top;color:${Y};">${plus}</span>` : ''}</div>
<div style="padding-top:10px;${L0}line-height:15px;text-transform:uppercase;color:${TX};">${label}</div>
<div style="padding-top:6px;${BF}font-size:14px;line-height:20px;color:${MU};">${note}</div></td>`;
const stats = `<tr><td bgcolor="#111113" class="px" style="background-color:#111113;padding:52px 24px;border-top:1px solid ${BRD};border-bottom:1px solid ${BRD};">
<div style="padding:0 0 10px 0;">${eyebrow('covered în cifre')}</div>
${H2('Cifrele care ne recomandă.')}
${gapDiv(30)}
<table ${T} width="100%" style="${M}">
<tr>${stat(1, `<span style="font-size:.6em;vertical-align:top;color:${Y};padding-right:4px;">&#9733;</span>4,69`, '/5', 'Rating mediu', 'Pe baza a 1.278 de recenzii.', 1)}${stat(2, '37.000', '+', 'Clienți mulțumiți', 'Din 2018 până azi.', 0)}</tr>
<tr><td colspan="2" style="padding:26px 0;">${rule('#313132')}</td></tr>
<tr>${stat(3, '60.000', '+', 'Skinuri realizate', 'Fiecare tăiat laser pe forma exactă a telefonului.', 1)}${stat(4, '1,7', '', 'Skinuri comandate, în medie, de fiecare client', 'Un singur finisaj e rareori de ajuns.', 0)}</tr>
</table>
</td></tr>`;

// Device tiles: separate <div>s (not display:block spans) so Outlook keeps the line breaks.
const tile = (brand, count, href) => `<td class="mt" width="50%" valign="top" style="padding:6px;"><table ${T} width="100%" bgcolor="${CARD}" style="background-color:${CARD};border:1px solid ${BRD};border-radius:12px;"><tr><td style="padding:14px;${M}"><a href="${href}" style="display:block;text-decoration:none;">
<div style="${L0}text-transform:uppercase;color:#7F7F7D;">${count}</div>
<div class="tn" style="padding-top:10px;${D}font-size:20px;line-height:24px;font-stretch:116%;color:${TX};">${brand}</div>
<div style="padding-top:12px;${L0}text-transform:uppercase;color:${Y};">Vezi skinuri &rarr;</div></a></td></tr></table></td>`;

const closing = `<tr><td bgcolor="${INK}" class="px cta" align="center" style="background-color:${INK};padding:60px 24px 56px 24px;">
<table ${T} align="center"><tr><td>${eyebrow('Din 2018')}</td></tr></table>
${H2(`<span style="color:${Y};">60.000+</span> skinuri realizate.<br>Al tău urmează.`, 'h2c', 'margin-top:16px;font-size:40px;line-height:46px;font-stretch:125%;letter-spacing:-.02em;text-align:center;')}
<p style="margin:16px auto 0 auto;max-width:420px;font-size:16px;line-height:24px;color:${MU};text-align:center;">Alege modelul, alege finisajul. Restul durează 60&nbsp;de&nbsp;secunde.</p>
${gapDiv(28)}
<table ${T} width="100%" style="text-align:left;">
<tr>${tile('iPhone', '199 de skinuri', u('/collections/apple-skin', 'cta'))}${tile('Samsung', '138 de skinuri', u('/collections/samsung-skin', 'cta'))}</tr>
<tr>${tile('Google Pixel', '47 de skinuri', u('/collections/google', 'cta'))}${tile('Orice telefon', '47 de skinuri', u('/collections/skin-orice-telefon', 'cta'))}</tr>
</table>
${gapDiv(24)}
<table ${T} align="center" class="ctab"><tr><td>${btn('Alege-ți telefonul &rarr;', u('/', 'cta', '#alege-telefonul'), true, 250)}</td></tr></table>
<div style="padding-top:18px;${LBL}line-height:16px;text-transform:uppercase;color:${TX};"><span style="color:${Y};">&#9670;</span> &minus;30% la 2 skinuri &middot; se aplică automat în coș</div>
</td></tr>`;

const fRow = (k, v) => `<tr><td style="padding:9px 0;border-top:1px solid #1A1A1A;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:${LB};">${k}</td><td align="right" style="padding:9px 0;border-top:1px solid #1A1A1A;font-size:12px;color:#E6E6E2;">${v}</td></tr>`;
const fl = (label, p) => `<a href="${p.startsWith('http') ? p : u(p, 'footer')}" style="color:${MU};text-decoration:underline;">${label}</a>`;
const social = (label, href) => `<td style="padding-right:8px;"><a href="${href}" style="display:block;padding:0 16px;height:46px;line-height:46px;border:1px solid #2F2F2F;border-radius:99px;${M}font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${TX};text-decoration:none;">${label} &#8599;</a></td>`;

const footer = `<tr><td bgcolor="#000000" class="px" style="background-color:#000000;padding:48px 24px 0 24px;">
<table ${T} width="100%"><tr>
<td class="stack" width="50%" valign="top" style="padding-right:20px;">
<a href="${u('/', 'footer')}" style="text-decoration:none;">${logoImg()}</a>
<div style="padding-top:18px;${D}font-size:17px;line-height:21px;font-stretch:118%;color:${TX};">Skinuri din vinil premium, tăiate laser pe modelul tău.</div>
<div style="padding-top:12px;${LBL}line-height:16px;text-transform:uppercase;color:${LB};">Din 2018 · 37.000+ clienți · 60.000+ skinuri</div>
<table ${T} style="margin-top:20px;"><tr>${social('Instagram', 'https://www.instagram.com/covered.ro')}${social('TikTok', 'https://www.tiktok.com/@covered.ro')}</tr></table>
</td>
<td class="stack fpad" width="50%" valign="top" style="${M}">
<div style="font-size:10px;line-height:14px;letter-spacing:.12em;text-transform:uppercase;color:${LB};">Firmă &amp; contact</div>
<div style="padding:10px 0 12px 0;${D}font-size:17px;line-height:22px;font-stretch:118%;color:${TX};">SC Covered SRL</div>
<table ${T} width="100%" style="${M}line-height:16px;">
${fRow('CUI', '47818139')}
${fRow('Nr. Reg. Com.', 'J20/341/2023')}
${fRow('E-mail', '<a href="mailto:covered.ro@gmail.com" style="color:#E6E6E2;text-decoration:none;">covered.ro@gmail.com</a>')}
${fRow('Telefon', '<a href="tel:0750422122" style="color:#E6E6E2;text-decoration:none;">0750 422 122</a>')}
</table>
<div style="padding-top:10px;border-top:1px solid #1A1A1A;${BF}font-size:13px;line-height:19px;color:${MU};">Str. Principală nr. 98, 335309 Strei, Hunedoara, România</div>
</td></tr></table>
${gapDiv(32)}
${rule('#1A1A1A')}
<div style="padding-top:20px;font-size:13px;line-height:22px;color:${MU};">${fl('Termeni și condiții', '/pages/termeni-si-conditii')} &nbsp;·&nbsp; ${fl('Confidențialitate', '/pages/politica-de-confidentialitate')} &nbsp;·&nbsp; ${fl('Retur', '/policies/refund-policy')} &nbsp;·&nbsp; ${fl('Livrare', '/policies/shipping-policy')} &nbsp;·&nbsp; ${fl('ANPC SAL', 'https://anpc.ro/ce-este-sal/')} &nbsp;·&nbsp; ${fl('SOL', 'https://ec.europa.eu/consumers/odr')}</div>
<div style="padding-top:16px;font-size:13px;line-height:20px;color:${LB};">Primești acest e-mail pentru că ești abonat la newsletterul covered. Prețurile includ TVA; livrarea se calculează la finalizarea comenzii. Husele, foliile de ecran și extraopțiunile nu intră în ofertă.</div>
<div style="padding-top:16px;${LBL}line-height:18px;text-transform:uppercase;"><a href="{{view_in_browser_url}}" style="color:${TX};text-decoration:underline;">Vezi emailul în browser</a><span style="color:#50504F;"> &nbsp;/&nbsp; </span><a href="{{unsubscribe_url}}" style="color:${TX};text-decoration:underline;">Dezabonare</a></div>
<div style="padding-top:16px;${LBL}color:#7F7F7D;">&copy; 2026 COVERED.</div>
</td></tr>
<tr><td bgcolor="#000000" align="center" aria-hidden="true" style="background-color:#000000;padding:18px 0 0 0;mso-hide:all;"><div class="wm" style="${D}text-transform:none;font-size:118px;line-height:92px;font-stretch:125%;letter-spacing:-.045em;color:#141414;white-space:nowrap;overflow:hidden;">covered</div></td></tr>`;

const css = `:root{color-scheme:dark;supported-color-schemes:dark}
body{margin:0!important;padding:0!important;width:100%!important;background-color:#0A0A0B}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
u+#body a{color:inherit;text-decoration:none}
@supports (-webkit-text-stroke:1px #000){.ol{-webkit-text-fill-color:#0A0A0B;-webkit-text-stroke:2px #F3F3EF;paint-order:stroke fill}.olk{-webkit-text-fill-color:#F5B100;-webkit-text-stroke:1.5px #0A0A0B;paint-order:stroke fill}}
@supports (transform:rotate(-2deg)){.bandwrap{padding:26px 0!important}.tilt{transform:rotate(-2deg);margin:0 -24px;box-shadow:0 16px 40px -16px rgba(0,0,0,.6)}}
.panel{background-image:radial-gradient(circle at 50% 38%,rgba(245,177,0,.2) 0,rgba(245,177,0,.05) 150px,rgba(17,17,19,0) 270px),linear-gradient(rgba(243,243,239,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(243,243,239,.045) 1px,transparent 1px);background-size:100% 100%,32px 32px,32px 32px;background-position:center}
.cta{background-image:linear-gradient(rgba(243,243,239,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(243,243,239,.035) 1px,transparent 1px);background-size:48px 48px;background-position:center}
.tile{background-image:radial-gradient(120% 85% at 50% 6%,#FBFBF9 0%,#EFEFEB 56%,#E3E3DE 100%)}
.bt a:hover{background-color:#FFFFFF!important;color:#0A0A0B!important}
[data-ogsb] .tile{background-color:#EFEFEB!important}
@media (max-width:620px){
.px{padding-left:16px!important;padding-right:16px!important}
.hin{padding:18px 4px 22px 4px!important}
.hxl{font-size:86px!important;line-height:84px!important}
.hl{font-size:46px!important;line-height:52px!important}
.hn{font-size:9px!important;line-height:13px!important;padding:6px 8px!important}
.hnp{font-size:16px!important;line-height:20px!important}
.lead{font-size:16px!important;line-height:24px!important}
.h2{font-size:24px!important;line-height:29px!important}
.h2c{font-size:27px!important;line-height:32px!important}
.stack{display:block!important;width:100%!important;box-sizing:border-box;padding-left:0!important;padding-right:0!important;border-right:0!important}
.tl{text-align:left!important;padding-top:10px!important}
.tot{font-size:24px!important}
.sp{padding-top:12px!important}
.hide{display:none!important}
.tc{text-align:center!important}
.bt,.ctab{width:100%!important}
.logo{width:100px!important}
.ci{padding-left:10px!important;padding-right:10px!important}
.rt{display:block;padding-top:3px}
.ttl{font-size:14px!important;line-height:18px!important}
.pv{font-size:12px!important}
.tile{padding:8px 6px 10px 6px!important}
.bdg{height:46px!important}
.himg{max-width:118px!important}
.limg{max-width:150px!important}
.lin{padding:14px 16px 18px 16px!important}
.sk{width:84px!important}
.num{font-size:25px!important;line-height:30px!important}
.stc{padding-left:10px!important;padding-right:10px!important}
.uc{padding:16px 0 18px 0!important}
.fpad{padding-top:32px!important}
.band{font-size:17px!important;line-height:24px!important;padding:12px 8px!important}
.tilt{margin:0 -10px!important}
.tn{font-size:15px!important;line-height:19px!important}
.mt{padding:4px!important}
.tag{font-size:9px!important;padding:5px 7px!important}
.ob{display:block;line-height:14px!important;padding:2px 0 1px 0}
.wm{font-size:68px!important;line-height:54px!important}
}`;

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
<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&amp;family=Martian+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet"><!--<![endif]-->
<style>
${css}
</style>
</head>
<body id="body" bgcolor="#0A0A0B" style="margin:0;padding:0;width:100%;background-color:#0A0A0B;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#0A0A0B;opacity:0;">${preheader}${pad}</div>
<div role="article" aria-roledescription="email" aria-label="−30% la 2 skinuri" lang="ro">
<table ${T} width="100%" bgcolor="#0A0A0B" style="background-color:#0A0A0B;">
<tr><td align="center" bgcolor="#0A0A0B" style="background-color:#0A0A0B;">
<!--[if mso]><table ${T} width="600" align="center"><tr><td><![endif]-->
<table ${T} width="100%" class="wrap" bgcolor="#0A0A0B" style="width:100%;max-width:600px;margin:0 auto;background-color:#0A0A0B;${BF}font-size:15px;line-height:24px;color:#F3F3EF;">
${topbar}
${header}
${hero}
${band}
${iphone}
${samsung}
${noutati}
${usps}
${stats}
${closing}
${footer}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</div>
</body>
</html>
`;

// Compact, then hard-wrap between table tags so no line exceeds 998 chars (RFC 5322) even without QP encoding.
let out = html.replace(/\n{2,}/g, '\n').replace(/>\n</g, '><');
out = out.replace(/(<\/td>|<\/tr>|<\/table>)(?=<)/g, '$1\n').replace(/<\/div>(?=<div|<table|<a href)/g, '</div>\n');
// Still-long lines: break before block-level tags (whitespace there never renders), and between footer links.
out = out.split('\n').map(l => l.length < 900 ? l : l.replace(/(?<=>)(?=<(table|tr|td|div|p |!--\[if|v:roundrect|center))/g, '\n').replace(/ &nbsp;·&nbsp; /g, '\n&nbsp;·&nbsp; ')).join('\n');
const file = path.join(__dirname, '..', 'covered-email-30-la-2-skinuri.html');
fs.writeFileSync(file, out);
const lines = out.split('\n');
console.log('bytes', Buffer.byteLength(out), 'lines', lines.length, 'max line', Math.max(...lines.map(l => Buffer.byteLength(l))));
