// Builds drafts/variant-a.html — covered.ro "SKIN LAB / SPEC SHEET" email.
const fs = require('fs');
const path = require('path');

// Body font is set once on the wrapper (inherits); display + mono are set inline where used.
const BF = "font-family:Archivo,'Helvetica Neue',Arial,sans-serif;";
const D = "font-family:Archivo,'Arial Black','Helvetica Neue',Arial,sans-serif;font-weight:800;text-transform:uppercase;";
const M = "font-family:'Martian Mono',Menlo,Consolas,'Courier New',monospace;";
const UTM = 'utm_source=email&utm_medium=newsletter&utm_campaign=30-la-2-skinuri&utm_content=';
const u = (p, slug) => { const url = p.startsWith('http') ? p : 'https://covered.ro' + p; return url + (url.includes('?') ? '&' : '?') + UTM + slug; };
const T = 'role="presentation" cellpadding="0" cellspacing="0" border="0"';
const shop = f => 'https://cdn.shopify.com/s/files/1/0059/0466/2626/files/' + f;
const cvcdn = f => 'https://covered.ro/cdn/shop/files/' + f;
const L0 = 'font-size:10px;line-height:12px;font-weight:500;letter-spacing:.08em;';
const LBL = M + L0;

// ---------- atoms ----------
const dot = `<td width="13" valign="top" style="padding:1px 9px 0 0;"><div style="width:7px;height:7px;border:3px solid #392B09;border-radius:7px;background-color:#F5B100;font-size:0;line-height:0;">&nbsp;</div></td>`;
const eyebrow = (t, color = '#9A9A98') => `<table ${T}><tr>${dot}<td style="${M}font-size:11px;line-height:15px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:${color};">${t}</td></tr></table>`;
const tag = t => `<span class="tag" style="font-size:10px;line-height:12px;font-weight:500;text-transform:uppercase;color:#F3F3EF;background-color:#0A0A0B;border:1px solid #2F2F2F;display:inline-block;padding:5px 9px;border-radius:4px;letter-spacing:.08em;white-space:nowrap;"><span style="color:#F5B100;">&#9679;</span>&nbsp;${t}</span>`;
const rule = (c = '#262626') => `<div style="height:1px;line-height:1px;font-size:1px;background-color:${c};">&nbsp;</div>`;
const gapDiv = h => `<div style="height:${h}px;line-height:${h}px;font-size:1px;">&nbsp;</div>`;
const spacer = h => `<tr><td height="${h}" style="font-size:0;line-height:0;">&nbsp;</td></tr>`;
const open = (cls = '') => `<tr><td bgcolor="#0A0A0B" class="px${cls}" style="background-color:#0A0A0B;padding:0 24px;">`;

const btn = (label, href, primary, vmlW) => {
  const bg = primary ? '#F5B100' : '#0A0A0B';
  const html = `<table ${T} class="bt"><tr><td align="center" bgcolor="${bg}" style="background-color:${bg};border-radius:5px;${primary ? '' : 'border:1px solid #4B4B4B;'}"><a href="${href}" style="display:block;padding:0 26px;height:48px;line-height:48px;${BF}font-size:13px;font-weight:700;font-stretch:112%;letter-spacing:.04em;text-transform:uppercase;color:${primary ? '#0A0A0B' : '#F3F3EF'};text-decoration:none;white-space:nowrap;border-radius:5px;">${label}</a></td></tr></table>`;
  if (!vmlW) return html;
  return `<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:48px;v-text-anchor:middle;width:${vmlW}px;" arcsize="10%" stroke="f" fillcolor="#F5B100"><w:anchorlock/><center style="color:#0A0A0B;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;">${label}</center></v:roundrect><![endif]--><!--[if !mso]><!-- -->${html}<!--<![endif]-->`;
};

const H2 = (txt, cls = 'h2', extra = '') => `<h2 class="${cls}" style="margin:0;${D}font-size:30px;line-height:36px;font-stretch:122%;letter-spacing:-.015em;color:#F3F3EF;${extra}">${txt}</h2>`;
const meter = (idx, w = 30) => `<table ${T} width="100%"><tr><td width="${w}" style="${LBL}color:#7F7F7D;">${idx}</td><td>${rule('#F5B100')}</td></tr></table>`;
const secHead = (idx, eb, h2, intro, noRule) => `${open()}
${meter(idx)}
<div style="padding:18px 0 10px 0;">${eyebrow(eb)}</div>
${H2(h2)}
${intro ? `<div style="padding-top:10px;font-size:15px;line-height:23px;color:#B2B2AF;">${intro}</div>` : ''}
${noRule ? '' : `<div style="padding-top:22px;">${rule()}</div>`}
</td></tr>`;

// ---------- product data (verified live 2026-10-06) ----------
const fmt = n => 'RON ' + n.toFixed(2);
const P = o => Object.assign(o, { bundle: fmt(Math.round(o.price * 70) / 100) });
const IPH = [
  P({ t: 'Skin iPhone Dark - Rafinat cu Aur 22K - EDITIE SPECIALA', h: 'skin-iphone-dark-rafinat-cu-aur-22k-editie-speciala', img: shop('dark.png?v=1728115103'), price: 120, cmp: 150, pct: 20, fin: 'Aur 22K · marmură', rate: '4,6 (36)', alt: 'Skin iPhone Dark rafinat cu aur 22K, marmură neagră cu vene aurii' }),
  P({ t: 'Skin iPhone - Titanium 3D', h: 'skin-iphone-titanium', img: shop('titan.png?v=1728021089'), price: 89, cmp: 120, pct: 25, best: 1, fin: '3D · titan argintiu', rate: '4,9 (40)', alt: 'Skin iPhone Titanium 3D, titan periat argintiu' }),
  P({ t: 'Skin iPhone - Negru Mat', h: 'skin-iphone-negru-mat', img: shop('negru_mat.png?v=1728021074'), price: 69, cmp: 120, pct: 42, best: 1, fin: 'Mat · negru', rate: '4,8 (26)', alt: 'Skin iPhone Negru Mat pe spatele telefonului' }),
  P({ t: 'Skin iPhone - Black Titanium 3D', h: 'skin-iphone-black-titanium-3d', img: shop('black_titan.png?v=1728021014'), price: 89, cmp: 120, pct: 25, fin: '3D · titan gri închis', rate: '4,8 (38)', alt: 'Skin iPhone Black Titanium 3D, titan periat gri închis' }),
  P({ t: 'Skin iPhone - Transparent (folie ppf)', h: 'skin-iphone-transparent-folie-protectie-flexibila', img: shop('ppf.png?v=1769533628'), price: 99, cmp: 150, pct: 34, best: 1, fin: 'PPF · transparent', rate: '4,4 (12)', alt: 'Skin iPhone transparent, folie PPF peste culoarea originală' }),
  P({ t: 'Skin iPhone Waves - Rafinat cu Aur 22K - EDITIE SPECIALA', h: 'skin-iphone-waves-rafinat-cu-aur-22k-editie-speciala', img: shop('waves.png?v=1728115104'), price: 120, cmp: 150, pct: 20, fin: 'Aur 22K · albastru', rate: '4,6 (28)', alt: 'Skin iPhone Waves rafinat cu aur 22K, valuri albastre cu linie aurie' }),
];
const SAM = [
  P({ t: 'Skin Samsung - Negru Mat', h: 'skin-samsung-negru-mat', img: shop('negru_mat_95624e23-a169-476e-9935-f8fb196dee76.png?v=1729360165'), price: 69, cmp: 120, pct: 42, best: 1, fin: 'Mat · negru', rate: '4,4 (7)', alt: 'Skin Samsung Negru Mat pe spatele unui Galaxy' }),
  P({ t: 'Skin Samsung - Transparent (folie ppf)', h: 'skin-samsung-transparent-folie-protectie-flexibila', img: shop('sk_transparent_d777e951-0376-4cf6-9796-10374c3e18ca.png?v=1729194674'), price: 99, cmp: 150, pct: 34, fin: 'PPF · transparent', rate: '5,0 (7)', alt: 'Skin Samsung transparent, folie PPF pe un Galaxy' }),
  P({ t: 'Skin Samsung - Splash', h: 'skin-samsung-splash-finisaj-mat', img: shop('splash_8efdf64c-ffd7-472c-af26-39ce7cc196ca.png?v=1729194600'), price: 99, cmp: 120, pct: 17, fin: 'Print · mat', rate: '4,5 (12)', alt: 'Skin Samsung Splash, marmură gri cu stropi aurii' }),
  P({ t: 'Skin Samsung - Honeycomb 3D', h: 'skin-samsung-honeycomb', img: shop('honey_9497cee7-e8ed-44ac-b7b7-6483887fe764.png?v=1729194187'), price: 99, cmp: 120, pct: 17, fin: '3D · fagure', rate: '4,5 (11)', alt: 'Skin Samsung Honeycomb 3D, textură fagure neagră' }),
];
const NEW = [
  P({ t: 'Skin iPhone - Negru ULTRA Matte', h: 'skin-iphone-negru-ultra-matte', img: cvcdn('ultramatte.png?v=1791104171'), price: 90, cmp: 120, pct: 25, fin: 'Ultra mat · negru', d: 'Skin Negru ULTRA mat, realizat din autocolant 3M Premium.', alt: 'Skin iPhone Negru ULTRA Matte' }),
  P({ t: 'Skin iPhone - OFF Silver', h: 'skin-iphone-off-silver', img: cvcdn('Final_iPhonduosilvere17ProMaxFullWrapSkinDesignMockupFrontBackandSide.png?v=1791017326'), price: 120, cmp: 0, pct: 0, fin: 'OFF · două tonuri', d: 'Ramă și platou de camere argintii, panou alb pe spate.', alt: 'Skin iPhone OFF Silver, ramă argintie și panou alb' }),
  P({ t: 'Skin iPhone - DUO Pink', h: 'skin-iphone-duo-pink', img: cvcdn('duopink.png?v=1789890742'), price: 99, cmp: 120, pct: 17, fin: 'DUO · două tonuri', d: 'Platou și ramă roz deschis, panou roz prăfuit.', alt: 'Skin iPhone DUO Pink în două nuanțe de roz' }),
  P({ t: 'Skin iPhone - Glacier', h: 'skin-iphone-glacier', img: cvcdn('glaciersimple.png?v=1789278794'), price: 99, cmp: 120, pct: 17, fin: 'Culoare plină · GL', d: 'Albastru gheață, pe tot spatele telefonului.', alt: 'Skin iPhone Glacier, albastru gheață' }),
];

// ---------- product pieces ----------
const pill = (txt, bg, fg, cls = '', extra = '') => `<span class="pl${cls ? ' ' + cls : ''}" style="font-size:10px;font-weight:600;color:${fg};background-color:${bg};${extra}">${txt}</span>`;
const badges = p => `<div style="text-transform:uppercase;text-align:left;">${p.pct ? pill('-' + p.pct + '%', '#F5B100', '#0A0A0B') : ''}${p.best ? pill('&#9733; Cel mai vândut', '#0A0A0B', '#F5B100', 'hm') : ''}</div>`;
const priceRow = p => `<div style="font-size:11px;line-height:18px;"><span class="pv" style="font-size:13px;font-weight:500;color:#F5B100;white-space:nowrap;">${fmt(p.price)}</span>${p.cmp ? ` <s style="color:#8C8C8B;white-space:nowrap;margin-left:4px;">${fmt(p.cmp)}</s>` : ''}</div>`;
const offerChip = p => `<div class="oc" style="background-color:#2D2511;border:1px solid #634B0C;border-radius:10px;padding:6px 8px;font-size:10px;line-height:22px;color:#C9C6BC;"><span class="pc" style="background-color:#F5B100;color:#0A0A0B;font-size:11px;">%</span><b style="font-size:11px;color:#F3F3EF;white-space:nowrap;">${p.bundle}</b><span class="ob"> / buc. când iei 2</span></div>`;
const imgStyle = mw => `display:block;width:100%;max-width:${mw}px;height:auto;margin:0 auto;border:0;font-size:12px;line-height:16px;color:#45433E;`;

// Row-split cards so title / price / offer rows align across a pair.
const sd = '';
function grid(list, slug) {
  let out = '';
  for (let i = 0; i < list.length; i += 2) {
    const pair = [list[i], list[i + 1]];
    const row = fn => `<tr>${pair.map((p, k) => (k ? '<td class="gap" width="12"></td>' : '') + fn(p, u('/products/' + p.h, slug))).join('')}</tr>`;
    out += (i ? gapDiv(12) : '') + `<table ${T} width="100%" style="${M}">
${row((p, l) => `<td class="cw cb ctp" width="270" valign="top" bgcolor="#121213" style="padding:6px 6px 0 6px;"><table ${T} width="100%"><tr><td class="tile" bgcolor="#EFEFEB" align="center" style="background-color:#EFEFEB;border-radius:12px;padding:10px 10px 14px 10px;">${badges(p)}<a href="${l}"><img class="pimg" src="${p.img}&amp;width=400" width="180" alt="${p.alt}" style="${imgStyle(180)}"></a></td></tr></table></td>`)}
${row((p, l) => `<td valign="top" bgcolor="#121213" class="ci cb" style="${sd}padding:14px 14px 0 14px;font-size:9.5px;line-height:13px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#9A9A98;">${p.fin}<span class="hide" style="color:#B2B2AF;letter-spacing:0;"> &nbsp;<span style="color:#F5B100;">&#9733;</span> ${p.rate}</span><a href="${l}" class="ttl" style="display:block;padding-top:7px;${BF}font-size:14.5px;line-height:19px;font-weight:600;letter-spacing:-.005em;text-transform:none;color:#F3F3EF;text-decoration:none;">${p.t}</a></td>`)}
${row(p => `<td valign="bottom" bgcolor="#121213" class="ci cb" style="${sd}padding:10px 14px 12px 14px;">${priceRow(p)}</td>`)}
${row(p => `<td valign="top" bgcolor="#121213" class="cb cbt" style="padding:0 6px 6px 6px;">${offerChip(p)}</td>`)}
</table>`;
  }
  return out;
}

const seeAll = (label, count, href) => `<table ${T} width="100%" bgcolor="#1A170D" style="background-color:#1A170D;border:1px solid #8C6806;border-radius:12px;"><tr><td style="padding:12px 0 12px 18px;"><a href="${href}" class="sa" style="${BF}font-size:14px;line-height:18px;font-weight:800;font-stretch:112%;text-transform:uppercase;color:#F3F3EF;text-decoration:none;">${label}</a></td><td align="right" style="padding:12px 10px;${M}font-size:12px;line-height:18px;font-weight:500;color:#F5B100;white-space:nowrap;">${count}</td><td width="40" style="padding:8px 10px 8px 0;"><a href="${href}" style="display:block;width:40px;height:40px;line-height:40px;border-radius:40px;background-color:#F5B100;text-align:center;font-size:18px;font-weight:700;color:#0A0A0B;text-decoration:none;">&rarr;</a></td></tr></table>`;

function newRows(list, slug) {
  return list.map((p, i) => {
    const l = u('/products/' + p.h, slug);
    return (i ? gapDiv(12) : '') + `<table ${T} width="100%" bgcolor="#121213" style="${M}background-color:#121213;border:1px solid #1F1F20;border-radius:16px;"><tr>
<td class="nimg" width="150" valign="top" style="padding:6px;"><table ${T} width="100%"><tr><td class="tile" bgcolor="#EFEFEB" align="center" style="background-color:#EFEFEB;border-radius:12px;padding:8px 10px 10px 10px;"><div style="text-transform:uppercase;text-align:left;">${pill('<span style="color:#F5B100;">&#9679;</span> Nou', '#FFFFFF', '#0A0A0B', '', 'border:1px solid #DADAD4;')}</div><a href="${l}"><img class="nimgi" src="${p.img}&amp;width=300" width="112" alt="${p.alt}" style="${imgStyle(112)}"></a></td></tr></table></td>
<td valign="middle" class="ninfo" style="padding:12px 16px 12px 12px;">
<div style="${LBL}text-transform:uppercase;color:#9A9A98;"><span style="color:#7F7F7D;">N&deg;&nbsp;0${i + 1}</span>&nbsp;&nbsp;${p.fin}</div>
<div style="padding-top:8px;"><a href="${l}" class="nttl" style="${BF}font-size:18px;line-height:22px;font-weight:700;font-stretch:108%;color:#F3F3EF;text-decoration:none;">${p.t}</a></div>
<div class="hide" style="padding-top:6px;${BF}font-size:14px;line-height:20px;color:#B2B2AF;">${p.d}</div>
<div style="padding-top:10px;">${priceRow(p)}</div>
<div style="padding-top:10px;">${offerChip(p)}</div>
</td></tr></table>`;
  }).join('');
}

// ---------- corner brackets (arms meet the straddling tags at their midline) ----------
const cTop = pos => `<td width="16" valign="top"><div style="height:12px;font-size:0;line-height:0;"></div><div style="width:15px;height:11px;font-size:0;line-height:0;border-top:1px solid #50504F;border-${pos}:1px solid #50504F;"></div></td>`;
const cBot = pos => `<td width="16" valign="top"><div style="width:15px;height:11px;font-size:0;line-height:0;border-bottom:1px solid #50504F;border-${pos}:1px solid #50504F;"></div></td>`;

// ---------- sections ----------
const preheader = 'Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.';
const pad = '&#847;&zwnj;&nbsp;'.repeat(24);

const topbar = `<tr><td bgcolor="#000000" class="px" style="background-color:#000000;padding:10px 24px;border-bottom:1px solid #181818;${M}font-size:10px;line-height:14px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;">
<table ${T} width="100%"><tr>
<td class="hide" style="color:#C2C2BF;white-space:nowrap;"><span style="color:#F5B100;">&#9670;</span>&nbsp; Plată ramburs la livrare</td>
<td align="right" class="tc" style="white-space:nowrap;"><a href="{{view_in_browser_url}}" style="color:#C2C2BF;text-decoration:underline;">Vezi emailul în browser</a></td>
</tr></table></td></tr>`;

const navA = (l, p) => `<a href="${u(p, 'header')}" style="color:#F3F3EF;text-decoration:none;">${l}</a>`;
const header = `<tr><td bgcolor="#0A0A0B" class="px" style="background-color:#0A0A0B;padding:20px 24px;border-bottom:1px solid #262626;">
<table ${T} width="100%"><tr>
<td><a href="${u('/', 'header')}"><img class="logo" src="https://covered.ro/cdn/shop/files/covered_logo_white.png?v=1629830648&amp;width=240" width="120" alt="covered" style="display:block;width:120px;height:auto;border:0;font-size:20px;line-height:22px;font-weight:800;color:#F3F3EF;"></a></td>
<td align="right" style="${LBL}letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;">${navA('iPhone', '/collections/apple-skin')}<span style="color:#50504F;"> &nbsp;/&nbsp; </span>${navA('Samsung', '/collections/samsung-skin')}<span style="color:#50504F;"> &nbsp;/&nbsp; </span>${navA('Pixel', '/collections/google')}</td>
</tr></table></td></tr>`;

const capTd = (a, b) => `<td align="center" style="padding:10px 0 18px 0;${L0}line-height:14px;color:#F3F3EF;">${a}<br><span style="color:#9A9A98;">${b}</span></td>`;
const heroImg = (href, src, alt, w) => `<td align="center" style="padding-top:12px;"><a href="${href}"><img class="himg" src="${src}" width="${w}" alt="${alt}" style="${imgStyle(w)}"></a></td>`;
const hero = `<tr><td bgcolor="#0A0A0B" class="px" style="background-color:#0A0A0B;padding:40px 24px 0 24px;">
${eyebrow('Ofertă pachet · Skinuri pentru iPhone, Samsung și Pixel', '#A8A8A6')}
${gapDiv(22)}
<table ${T} width="100%" style="${M}">
<tr>${cTop('left')}<td style="padding:0 8px;">${tag('Oricare 2 skinuri')}</td>${cTop('right')}</tr>
<tr><td width="16"></td><td class="hin" style="padding:22px 8px 26px 8px;">
<h1 style="margin:0;${D}font-stretch:125%;letter-spacing:-.02em;">
<span class="hxl" style="display:block;font-size:132px;line-height:124px;color:#F5B100;">&minus;30%</span>
<span class="hl" style="display:block;font-size:76px;line-height:84px;color:#F3F3EF;">la 2</span>
<span class="hl ol" style="display:block;font-size:76px;line-height:84px;color:#F3F3EF;">skinuri.</span>
</h1>
<p class="lead" style="margin:22px 0 0 0;max-width:440px;${BF}font-size:17px;line-height:26px;color:#B2B2AF;">Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat&nbsp;în&nbsp;coș.</p>
</td><td width="16"></td></tr>
<tr>${cBot('left')}<td align="right" style="padding:0 8px;">${tag('Orice telefon')} ${tag('Automat în coș')}</td>${cBot('right')}</tr>
</table>
</td></tr>
${spacer(26)}
${open()}
<table ${T} width="100%" bgcolor="#111113" class="panel" style="${M}background-color:#111113;border:1px solid #262626;border-radius:16px;">
<tr><td width="44%" align="center" style="padding-top:22px;${L0}color:#9A9A98;">SKIN 01</td><td width="12%"></td><td width="44%" align="center" style="padding-top:22px;${L0}color:#9A9A98;">SKIN 02</td></tr>
<tr>
${heroImg(u('/collections/samsung-skin', 'hero'), 'https://covered.ro/cdn/shop/files/titan_73b7554c-81af-4043-9e5c-32f9fc5c942a.png?v=1729196487&amp;width=400', 'Samsung Galaxy cu skin Titanium, titan periat', 172)}
<td align="center" valign="middle"><div style="width:38px;height:38px;line-height:38px;border-radius:38px;background-color:#F5B100;text-align:center;${D}font-size:22px;color:#0A0A0B;margin:0 auto;">+</div></td>
${heroImg(u('/products/skin-iphone-off-burgundy', 'hero'), 'https://covered.ro/cdn/shop/files/burgundy18.png?v=1789278719&amp;width=400', 'iPhone cu skin OFF Burgundy', 190)}
</tr>
<tr>${capTd('SAMSUNG', 'TITANIUM')}<td></td>${capTd('IPHONE', 'OFF BURGUNDY')}</tr>
<tr><td colspan="3" style="padding:0 12px;">${rule()}</td></tr>
<tr><td colspan="3" align="center" style="padding:14px 12px 16px 12px;font-size:11px;line-height:16px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#F3F3EF;">= <span style="color:#F5B100;">&minus;30%</span> la ambele &middot; automat în coș</td></tr>
</table>
</td></tr>
${spacer(24)}
${open()}
<table ${T} class="ctab"><tr>
<td class="stack" style="padding-right:12px;">${btn('Alege-ți telefonul &rarr;', u('/', 'hero'), true, 250)}</td>
<td class="stack sp">${btn('Vezi cele mai vândute', u('/collections/toate-produsele', 'hero'), false)}</td>
</tr></table>
</td></tr>
${spacer(48)}`;

const band = `<tr><td bgcolor="#F5B100" style="background-color:#F5B100;padding:5px 0;">
<table ${T} width="100%"><tr><td align="center" class="band" style="border-top:1px solid #C18C02;border-bottom:1px solid #C18C02;padding:10px 12px 9px 12px;${D}font-size:30px;line-height:34px;font-stretch:125%;letter-spacing:-.01em;color:#0A0A0B;white-space:nowrap;">Tăiat laser <span style="font-size:.6em;vertical-align:middle;">&#10022;</span> <span class="olb">zero volum</span></td></tr></table>
</td></tr>
${spacer(56)}`;

const sRow = (k, v, first, last) => `<tr><td class="sk" width="140" valign="top" style="padding:14px 12px 14px 0;${first ? '' : 'border-top:1px solid #262626;'}font-size:10px;line-height:18px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#9A9A98;">${k}</td><td valign="top" style="padding:14px 0;${first ? '' : 'border-top:1px solid #262626;'}${BF}font-size:15px;line-height:22px;color:#F3F3EF;">${v}</td></tr>`;
const offerSpec = `${secHead('01', 'Cum funcționează', 'Fără cod. Direct în&nbsp;coș.')}
${open()}
<table ${T} width="100%" style="${M}border-bottom:1px solid #262626;">
${sRow('Produse', 'Oricare 2 skinuri de telefon. Același finisaj sau două diferite.', 1)}
${sRow('Telefon', 'Orice telefon. Poți combina iPhone, Samsung și Pixel în aceeași comandă.')}
${sRow('Cod', 'Nu ai nevoie de cod. Reducerea se aplică automat în coș.')}
${sRow('Exemplu', `2 &times; Skin iPhone - Negru Mat<div style="${M}font-size:12px;line-height:20px;padding-top:2px;"><s style="color:#8C8C8B;">RON 138.00</s> &nbsp;<b style="color:#F5B100;font-weight:600;">RON 96.60</b> &nbsp;<span style="color:#B2B2AF;white-space:nowrap;">(RON 48.30 / buc.)</span></div>`)}
${sRow('Nu intră', '<span style="color:#B2B2AF;">Husele, folia de ecran și extraopțiunile.</span>')}
</table>
</td></tr>
${spacer(56)}`;

const prodSection = (idx, eb, h2, list, slug, label, count, coll) => `${secHead(idx, eb, h2)}
${spacer(20)}
${open()}${grid(list, slug)}
${gapDiv(16)}${seeAll(label, count, u(coll, slug))}</td></tr>
${spacer(56)}`;

const iphone = prodSection('02', 'Skinuri iPhone · Cele mai vândute', 'Top vânzări iPhone.', IPH.slice(0, 4), 'top-iphone', 'Vezi toate skinurile iPhone', '199', '/collections/apple-skin');
const samsung = prodSection('03', 'Skinuri Samsung · Cele mai vândute', 'Top vânzări Samsung.', SAM, 'top-samsung', 'Vezi toate skinurile Samsung', '138', '/collections/samsung-skin');

const noutati = `${secHead('04', 'Noutăți · Drop-uri noi', 'Finisaje noi.', 'Cele mai noi skinuri de pe site. Intră și ele în oferta de &minus;30% la 2 skinuri.')}
${spacer(20)}
${open()}${newRows(NEW.slice(0, 3), 'noutati')}
${gapDiv(16)}${seeAll('Vezi toate noutățile', '', u('/collections/all?sort_by=created-descending', 'noutati'))}</td></tr>
${spacer(56)}`;

const USP = [
  ['Vinil premium', 'Doar 0,2 mm grosime. Zero volum adăugat.'],
  ['Tăiat laser pe modelul tău', 'Decupaje exacte pentru camere și butoane.'],
  ['Aplicare în 60 de secunde', 'Fără bule. Șervețel de curățare inclus.'],
  ['Plată ramburs', 'Plătești când primești coletul. Livrare în 1–2 zile lucrătoare.'],
  ['Retur în 30 de zile', 'Pentru produsele nefolosite, în ambalajul original.'],
  ['Înlocuire gratuită', 'Dacă aplicarea nu iese, îți trimitem un skin nou. Plătești doar transportul.'],
];
const uspCell = i => `<td class="stack uc" width="50%" valign="top" style="border-top:1px solid #262626;padding:18px ${i % 2 ? '0 20px 18px' : '18px 20px 0'};${i % 2 ? '' : 'border-right:1px solid #262626;'}"><div style="${L0}color:#7F7F7D;">0${i + 1}</div><div style="padding-top:10px;${BF}font-size:15px;line-height:19px;font-weight:700;font-stretch:108%;color:#F3F3EF;">${USP[i][0]}</div><div style="padding-top:5px;${BF}font-size:14px;line-height:20px;color:#B2B2AF;">${USP[i][1]}</div></td>`;
const usps = `${secHead('05', 'De ce covered', 'Zero volum, stil&nbsp;maxim.', '', 1)}
${spacer(22)}
${open()}
<table ${T} width="100%" style="${M}border-bottom:1px solid #262626;">${[0, 2, 4].map(i => `<tr>${uspCell(i)}${uspCell(i + 1)}</tr>`).join('')}</table>
</td></tr>
${spacer(56)}`;

const stat = (i, big, plus, label, note, l) => `<td class="stc" width="50%" valign="top" style="padding:0 ${l ? '20px 0 0' : '0 0 20px'};${l ? 'border-right:1px solid #313132;' : ''}">
${meter('0' + i, 26)}
<div class="num" style="padding-top:14px;${D}font-size:44px;line-height:46px;font-stretch:118%;letter-spacing:-.02em;color:#F3F3EF;white-space:nowrap;">${big}${plus ? `<span style="font-size:.55em;vertical-align:top;color:#F5B100;">${plus}</span>` : ''}</div>
<div style="padding-top:10px;${L0}line-height:15px;text-transform:uppercase;color:#F3F3EF;">${label}</div>
<div style="padding-top:6px;${BF}font-size:14px;line-height:20px;color:#B2B2AF;">${note}</div></td>`;
const stats = `<tr><td bgcolor="#111113" class="px" style="background-color:#111113;padding:56px 24px;border-top:1px solid #262626;border-bottom:1px solid #262626;">
${meter('06')}
<div style="padding:18px 0 10px 0;">${eyebrow('covered în cifre')}</div>
${H2('Cifrele care ne recomandă.')}
${gapDiv(30)}
<table ${T} width="100%" style="${M}">
<tr>${stat(1, '<span style="font-size:.6em;vertical-align:top;color:#F5B100;padding-right:4px;">&#9733;</span>4,69', '/5', '1.278 de recenzii', 'Scorul mediu dat de clienți.', 1)}${stat(2, '37.000', '+', 'Clienți mulțumiți', 'Din 2018 până azi.', 0)}</tr>
<tr><td colspan="2" style="padding:26px 0;">${rule('#313132')}</td></tr>
<tr>${stat(3, '60.000', '+', 'Skinuri realizate', 'Fiecare tăiat laser pe forma exactă a telefonului.', 1)}${stat(4, '1,7', '', 'Skinuri per client, în medie', 'Un singur finisaj e rareori de ajuns.', 0)}</tr>
</table>
</td></tr>`;

const tile = (brand, count, href) => `<td class="mt" width="50%" valign="top" style="padding:6px;"><table ${T} width="100%" bgcolor="#121213" style="background-color:#121213;border:1px solid #262626;border-radius:12px;"><tr><td style="padding:14px;"><a href="${href}" style="display:block;text-decoration:none;${M}">
<span style="display:block;${L0}font-size:9.5px;text-transform:uppercase;color:#7F7F7D;">${count}</span>
<span class="tn" style="display:block;padding-top:10px;${D}font-size:20px;line-height:24px;font-stretch:116%;color:#F3F3EF;">${brand}</span>
<span style="display:block;padding-top:12px;${L0}text-transform:uppercase;color:#F5B100;">Vezi skinuri &rarr;</span></a></td></tr></table></td>`;

const closing = `<tr><td bgcolor="#0A0A0B" class="px cta" align="center" style="background-color:#0A0A0B;padding:64px 24px 60px 24px;">
<table ${T} align="center"><tr><td>${eyebrow('Din 2018 · −30% la 2 skinuri')}</td></tr></table>
${H2('Alege modelul.<br>Alege <span style="color:#F5B100;">două</span> finisaje.', 'h2c', 'margin-top:16px;font-size:44px;line-height:50px;font-stretch:125%;letter-spacing:-.02em;text-align:center;')}
<p style="margin:16px auto 0 auto;max-width:420px;font-size:16px;line-height:24px;color:#B2B2AF;text-align:center;">Reducerea se aplică automat în coș. Restul durează 60&nbsp;de&nbsp;secunde.</p>
${gapDiv(30)}
<table ${T} width="100%" style="text-align:left;">
<tr>${tile('iPhone', '199 de skinuri', u('/collections/apple-skin', 'cta'))}${tile('Samsung', '138 de skinuri', u('/collections/samsung-skin', 'cta'))}</tr>
<tr>${tile('Google Pixel', '47 de skinuri', u('/collections/google', 'cta'))}${tile('Orice telefon', '47 de skinuri', u('/collections/skin-orice-telefon', 'cta'))}</tr>
</table>
${gapDiv(24)}
<table ${T} align="center" class="ctab"><tr><td>${btn('Alege-ți telefonul &rarr;', u('/', 'cta'), true)}</td></tr></table>
</td></tr>`;

const fRow = (k, v) => `<tr><td style="padding:9px 0;border-top:1px solid #1A1A1A;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#9A9A98;">${k}</td><td align="right" style="padding:9px 0;border-top:1px solid #1A1A1A;font-size:12px;color:#E6E6E2;">${v}</td></tr>`;
const fl = (label, p) => `<a href="${p.startsWith('http') ? p : u(p, 'footer')}" style="color:#B2B2AF;text-decoration:underline;">${label}</a>`;
const social = (label, href) => `<td style="padding-right:8px;"><a href="${href}" style="display:block;padding:0 14px;height:42px;line-height:42px;border:1px solid #2F2F2F;border-radius:99px;${LBL}line-height:42px;text-transform:uppercase;color:#F3F3EF;text-decoration:none;">${label} &#8599;</a></td>`;
const logoImg = `<img src="https://covered.ro/cdn/shop/files/covered_logo_white.png?v=1629830648&amp;width=240" width="120" alt="covered" style="display:block;width:120px;height:auto;border:0;font-size:20px;line-height:22px;font-weight:800;color:#F3F3EF;">`;

const footer = `<tr><td bgcolor="#000000" class="px" style="background-color:#000000;padding:48px 24px 0 24px;">
<table ${T} width="100%"><tr>
<td class="stack" width="50%" valign="top" style="padding-right:20px;">
<a href="${u('/', 'footer')}">${logoImg}</a>
<div style="padding-top:18px;${D}font-size:17px;line-height:21px;font-stretch:118%;color:#F3F3EF;">Skinuri din vinil premium, tăiate laser pe modelul tău.</div>
<div style="padding-top:12px;${LBL}line-height:16px;text-transform:uppercase;color:#9A9A98;">Din 2018 · 37.000+ clienți · 60.000+ skinuri</div>
<table ${T} style="margin-top:20px;"><tr>${social('Instagram', 'https://www.instagram.com/covered.ro')}${social('TikTok', 'https://www.tiktok.com/@covered.ro')}</tr></table>
</td>
<td class="stack fpad" width="50%" valign="top" style="${M}">
<div style="font-size:10px;line-height:14px;letter-spacing:.12em;text-transform:uppercase;color:#9A9A98;">Firmă &amp; contact</div>
<div style="padding:10px 0 12px 0;${D}font-size:17px;line-height:22px;font-stretch:118%;color:#F3F3EF;">SC Covered SRL</div>
<table ${T} width="100%" style="${M}line-height:16px;">
${fRow('CUI', '47818139')}
${fRow('Nr. Reg. Com.', 'J20/341/2023')}
${fRow('E-mail', '<a href="mailto:covered.ro@gmail.com" style="color:#E6E6E2;text-decoration:none;">covered.ro@gmail.com</a>')}
${fRow('Telefon', '<a href="tel:0750422122" style="color:#E6E6E2;text-decoration:none;">0750 422 122</a>')}
</table>
<div style="padding-top:10px;border-top:1px solid #1A1A1A;${BF}font-size:13px;line-height:19px;color:#B2B2AF;">Str. Principală nr. 98, 335309 Strei, Hunedoara, România</div>
</td></tr></table>
${gapDiv(32)}
${rule('#1A1A1A')}
<div style="padding-top:20px;font-size:13px;line-height:22px;color:#B2B2AF;">${fl('Termeni și condiții', '/pages/termeni-si-conditii')} &nbsp;·&nbsp; ${fl('Confidențialitate', '/pages/politica-de-confidentialitate')} &nbsp;·&nbsp; ${fl('Retur', '/policies/refund-policy')} &nbsp;·&nbsp; ${fl('Livrare', '/policies/shipping-policy')} &nbsp;·&nbsp; ${fl('ANPC SAL', 'https://anpc.ro/ce-este-sal/')} &nbsp;·&nbsp; ${fl('SOL', 'https://ec.europa.eu/consumers/odr')}</div>
<div style="padding-top:16px;font-size:13px;line-height:20px;color:#9A9A98;">Primești acest e-mail pentru că ești abonat la newsletterul covered. Prețurile includ TVA; livrarea se calculează la finalizarea comenzii.</div>
<div style="padding-top:16px;${LBL}line-height:18px;text-transform:uppercase;"><a href="{{view_in_browser_url}}" style="color:#F3F3EF;text-decoration:underline;">Vezi emailul în browser</a><span style="color:#50504F;"> &nbsp;/&nbsp; </span><a href="{{unsubscribe_url}}" style="color:#F3F3EF;text-decoration:underline;">Dezabonare</a></div>
<div style="padding-top:16px;${LBL}color:#7F7F7D;">&copy; 2026 COVERED.</div>
</td></tr>
<tr><td bgcolor="#000000" align="center" aria-hidden="true" style="background-color:#000000;padding:18px 0 0 0;"><div class="wm" style="${D}text-transform:none;font-size:118px;line-height:92px;font-stretch:125%;letter-spacing:-.045em;color:#141414;white-space:nowrap;overflow:hidden;">covered</div></td></tr>`;

const css = `@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=Martian+Mono:wght@400;500;600&display=swap');
:root{color-scheme:dark;supported-color-schemes:dark}
body{margin:0!important;padding:0!important;width:100%!important;background-color:#0A0A0B}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
@supports (-webkit-text-stroke:1px #000){.ol{-webkit-text-fill-color:#0A0A0B;-webkit-text-stroke:2px #F3F3EF;paint-order:stroke fill}.olb{-webkit-text-fill-color:#F5B100;-webkit-text-stroke:1.5px #0A0A0B}}
.panel{background-image:radial-gradient(circle at 50% 44%,rgba(245,177,0,.22) 0,rgba(245,177,0,.06) 150px,rgba(17,17,19,0) 270px),linear-gradient(rgba(243,243,239,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(243,243,239,.045) 1px,transparent 1px);background-size:100% 100%,32px 32px,32px 32px;background-position:center}
.cta{background-image:linear-gradient(rgba(243,243,239,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(243,243,239,.035) 1px,transparent 1px);background-size:48px 48px;background-position:center}
.tile{background-image:radial-gradient(120% 85% at 50% 6%,#FBFBF9 0%,#EFEFEB 56%,#E3E3DE 100%)}
.pl{display:inline-block;line-height:12px;letter-spacing:.06em;border-radius:99px;padding:4px 8px;margin:0 3px 3px 0;white-space:nowrap}
.pc{display:inline-block;width:22px;height:22px;line-height:22px;border-radius:22px;text-align:center;font-weight:600;vertical-align:top;margin-right:6px}
.cb{border-left:1px solid #1F1F20;border-right:1px solid #1F1F20}
.ctp{border-top:1px solid #1F1F20;border-radius:16px 16px 0 0}
.cbt{border-bottom:1px solid #1F1F20;border-radius:0 0 16px 16px}
.bt a:hover{background-color:#FFFFFF!important;color:#0A0A0B!important}
[data-ogsb] .tile{background-color:#EFEFEB!important}
@media (max-width:620px){
.wrap{width:100%!important}
.px{padding-left:20px!important;padding-right:20px!important}
.hin{padding:18px 4px 22px 4px!important}
.hxl{font-size:86px!important;line-height:84px!important}
.hl{font-size:46px!important;line-height:52px!important}
.lead{font-size:16px!important;line-height:24px!important}
.h2{font-size:24px!important;line-height:29px!important}
.h2c{font-size:27px!important;line-height:32px!important}
.stack{display:block!important;width:100%!important;padding-left:0!important;padding-right:0!important;border-right:0!important}
.sp{padding-top:12px!important}
.hide,.hm{display:none!important}
.tc{text-align:center!important}
.bt,.ctab{width:100%!important}
.logo{width:100px!important}
.gap{width:10px!important}
.ci{padding-left:10px!important;padding-right:10px!important}
.ttl{font-size:14px!important;line-height:18px!important}
.pv{font-size:12px!important}
.tile{padding:8px 6px 10px 6px!important}
.himg{max-width:120px!important}
.nimg{width:116px!important}
.nimgi{max-width:88px!important}
.ninfo{padding:10px 10px 10px 6px!important}
.nttl{font-size:15px!important;line-height:19px!important}
.sk{width:92px!important}
.num{font-size:25px!important;line-height:30px!important}
.stc{padding-left:10px!important;padding-right:10px!important}
.uc{padding:16px 0 18px 0!important}
.fpad{padding-top:32px!important}
.band{font-size:19px!important;line-height:24px!important}
.tn{font-size:15px!important;line-height:19px!important}
.mt{padding:5px!important}
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
<table ${T} width="100%" bgcolor="#0A0A0B" style="background-color:#0A0A0B;">
<tr><td align="center" bgcolor="#0A0A0B" style="background-color:#0A0A0B;">
<table ${T} width="600" class="wrap" bgcolor="#0A0A0B" style="width:600px;max-width:600px;background-color:#0A0A0B;${BF}font-size:15px;line-height:24px;color:#F3F3EF;">
${topbar}
${header}
${hero}
${band}
${offerSpec}
${iphone}
${samsung}
${noutati}
${usps}
${stats}
${closing}
${footer}
</table>
</td></tr>
</table>
</body>
</html>
`;

const out = path.join(__dirname, 'variant-a.html');
fs.writeFileSync(out, html.replace(/\n{2,}/g, '\n').replace(/>\n</g, '><').replace(/<\/tr><tr>/g, '</tr>\n<tr>'));
console.log('bytes', Buffer.byteLength(fs.readFileSync(out)));
