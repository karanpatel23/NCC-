/**
 * forensic-crawl.mjs — website forensic extractor for client-rendered SPAs
 *
 * Purpose: nccinfraspace.com is a client-rendered Create React App shell. Server-side
 * fetching returns only "You need to enable JavaScript to run this app", so no remote
 * tool can read its content. This script renders the site in a real browser and dumps
 * everything a reconstruction report needs.
 *
 * SETUP
 *   mkdir ncc-forensics && cd ncc-forensics
 *   npm init -y
 *   npm i playwright
 *   npx playwright install chromium
 *   # save this file here, then:
 *   node forensic-crawl.mjs https://nccinfraspace.com/
 *
 * OUTPUT (./out)
 *   out/pages/<slug>.json      per-route structured extraction
 *   out/shots/<slug>.<vw>.png  full-page screenshots at 1440 / 834 / 390
 *   out/assets.json            every image/font/video/pdf with dimensions + reuse map
 *   out/network.json           every request, grouped by type and third-party host
 *   out/tokens.json            colour / type / spacing / radius / shadow frequency tables
 *   out/raw/index.html         raw server HTML (script tags intact)
 *   out/raw/*.js               downloaded JS bundles (route table + hard-coded content)
 *   out/HANDOFF-INPUT.md       <- paste THIS into Claude for the full report
 */

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] || 'https://nccinfraspace.com/';
const ORIGIN = new URL(BASE).origin;
const OUT = 'out';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];
const MAX_PAGES = 120;

const slug = (u) => {
  const p = new URL(u).pathname.replace(/\/$/, '') || '/home';
  return p.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'home';
};
const write = async (p, data) => {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};

/* ---------- runs inside the page ---------- */
const EXTRACT = () => {
  const txt = (el) => (el?.innerText || '').trim().replace(/\s+\n/g, '\n');
  const uniq = (a) => [...new Set(a)];
  const cs = getComputedStyle;

  // ---- meta ----
  const metas = {};
  document.querySelectorAll('meta').forEach((m) => {
    const k = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('http-equiv');
    if (k) metas[k] = m.getAttribute('content');
  });
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);

  // ---- headings in document order ----
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
    level: +h.tagName[1],
    text: txt(h),
    fontSize: cs(h).fontSize,
    fontWeight: cs(h).fontWeight,
    fontFamily: cs(h).fontFamily,
    lineHeight: cs(h).lineHeight,
    letterSpacing: cs(h).letterSpacing,
    textTransform: cs(h).textTransform,
    color: cs(h).color,
  }));

  // ---- top-level section map (page skeleton, top to bottom) ----
  const roots = [...document.querySelectorAll('body > div > *, main > *, #root > * > *')];
  const sections = roots.slice(0, 60).map((el, i) => {
    const r = el.getBoundingClientRect();
    const s = cs(el);
    return {
      order: i,
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      class: el.className?.toString?.().slice(0, 200) || null,
      heightPx: Math.round(r.height),
      background: s.backgroundColor,
      backgroundImage: s.backgroundImage === 'none' ? null : s.backgroundImage,
      padding: s.padding,
      display: s.display,
      gridTemplateColumns: s.gridTemplateColumns === 'none' ? null : s.gridTemplateColumns,
      childCount: el.children.length,
      headings: [...el.querySelectorAll('h1,h2,h3,h4')].map(txt).slice(0, 12),
      textSample: txt(el).slice(0, 1200),
      imageCount: el.querySelectorAll('img,svg,video').length,
      buttons: uniq([...el.querySelectorAll('button,a[class*=btn],a[class*=button]')].map(txt)).slice(0, 12),
    };
  });

  // ---- links ----
  const links = [...document.querySelectorAll('a[href]')].map((a) => ({
    text: txt(a),
    href: a.href,
    internal: a.href.startsWith(location.origin),
    target: a.target || null,
    rel: a.rel || null,
    inNav: !!a.closest('nav,header'),
    inFooter: !!a.closest('footer'),
    isTel: a.href.startsWith('tel:'),
    isMail: a.href.startsWith('mailto:'),
    isDoc: /\.(pdf|docx?|xlsx?|zip)$/i.test(a.href),
  }));

  // ---- forms ----
  const forms = [...document.querySelectorAll('form')].map((f) => ({
    action: f.action || null,
    method: f.method || null,
    fields: [...f.querySelectorAll('input,select,textarea')].map((el) => ({
      tag: el.tagName.toLowerCase(),
      type: el.type || null,
      name: el.name || null,
      id: el.id || null,
      placeholder: el.placeholder || null,
      required: el.required,
      pattern: el.pattern || null,
      maxLength: el.maxLength > 0 ? el.maxLength : null,
      label:
        (el.labels && el.labels[0] && el.labels[0].innerText.trim()) ||
        el.getAttribute('aria-label') ||
        null,
      options: el.tagName === 'SELECT' ? [...el.options].map((o) => o.text) : undefined,
    })),
    submitText: txt(f.querySelector('[type=submit],button')),
    hasCaptcha: !!document.querySelector('.g-recaptcha,[class*=recaptcha],iframe[src*=recaptcha],[class*=hcaptcha]'),
  }));
  // SPAs often skip <form>; capture stray inputs too
  const looseInputs = [...document.querySelectorAll('input,textarea,select')]
    .filter((el) => !el.closest('form'))
    .map((el) => ({
      tag: el.tagName.toLowerCase(), type: el.type || null, name: el.name || null,
      placeholder: el.placeholder || null, required: el.required,
      options: el.tagName === 'SELECT' ? [...el.options].map((o) => o.text) : undefined,
    }));

  // ---- media ----
  const images = [...document.querySelectorAll('img')].map((img) => ({
    src: img.currentSrc || img.src,
    srcset: img.srcset || null,
    alt: img.alt,
    natural: [img.naturalWidth, img.naturalHeight],
    rendered: [Math.round(img.getBoundingClientRect().width), Math.round(img.getBoundingClientRect().height)],
    loading: img.loading || null,
    objectFit: cs(img).objectFit,
    borderRadius: cs(img).borderRadius,
    decorative: img.alt === '',
  }));
  const bgImages = [...document.querySelectorAll('*')]
    .map((el) => cs(el).backgroundImage)
    .filter((v) => v && v !== 'none' && v.includes('url('))
    .map((v) => v.match(/url\(["']?(.*?)["']?\)/)?.[1])
    .filter(Boolean);
  const videos = [...document.querySelectorAll('video,iframe[src*=youtube],iframe[src*=vimeo]')].map((v) => ({
    tag: v.tagName.toLowerCase(), src: v.currentSrc || v.src || v.querySelector('source')?.src,
    autoplay: v.autoplay ?? null, loop: v.loop ?? null, muted: v.muted ?? null, controls: v.controls ?? null,
  }));
  const iframes = [...document.querySelectorAll('iframe')].map((f) => ({ src: f.src, title: f.title || null }));
  const inlineSvgCount = document.querySelectorAll('svg').length;
  const favicons = [...document.querySelectorAll('link[rel*=icon],link[rel=manifest],link[rel=apple-touch-icon]')]
    .map((l) => ({ rel: l.rel, href: l.href, sizes: l.sizes?.value || null }));

  // ---- design token frequency ----
  const all = [...document.querySelectorAll('*')].slice(0, 6000);
  const tally = (fn) => {
    const m = {};
    all.forEach((el) => { const v = fn(cs(el), el); if (v && v !== 'none' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') m[v] = (m[v] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 40);
  };
  const tokens = {
    color: tally((s) => s.color),
    backgroundColor: tally((s) => s.backgroundColor),
    borderColor: tally((s) => (s.borderTopWidth !== '0px' ? s.borderTopColor : null)),
    fontFamily: tally((s) => s.fontFamily),
    fontSize: tally((s) => s.fontSize),
    fontWeight: tally((s) => s.fontWeight),
    lineHeight: tally((s) => s.lineHeight),
    letterSpacing: tally((s) => s.letterSpacing),
    borderRadius: tally((s) => (s.borderRadius !== '0px' ? s.borderRadius : null)),
    boxShadow: tally((s) => s.boxShadow),
    transition: tally((s) => s.transition),
    gap: tally((s) => (s.gap && s.gap !== 'normal' ? s.gap : null)),
    padding: tally((s) => (s.padding !== '0px' ? s.padding : null)),
    maxWidth: tally((s) => (s.maxWidth !== 'none' ? s.maxWidth : null)),
    zIndex: tally((s) => (s.zIndex !== 'auto' ? s.zIndex : null)),
  };
  const cssVars = (() => {
    const out = {};
    try {
      for (const sheet of document.styleSheets) {
        let rules; try { rules = sheet.cssRules; } catch { continue; }
        for (const r of rules) {
          if (r.selectorText === ':root' || r.selectorText === 'html') {
            for (const p of r.style) if (p.startsWith('--')) out[p] = r.style.getPropertyValue(p).trim();
          }
        }
      }
    } catch {}
    return out;
  })();

  // ---- header / footer / nav ----
  const header = document.querySelector('header,[class*=header],[class*=navbar]');
  const footer = document.querySelector('footer,[class*=footer]');
  const chrome = {
    header: header && {
      heightPx: Math.round(header.getBoundingClientRect().height),
      position: cs(header).position,
      background: cs(header).backgroundColor,
      navItems: [...header.querySelectorAll('a')].map(txt).filter(Boolean),
      hasDropdown: !!header.querySelector('ul ul,[class*=dropdown],[class*=submenu]'),
      hasBurger: !!header.querySelector('[class*=burger],[class*=hamburger],[class*=menu-toggle],[class*=mobile]'),
    },
    footer: footer && {
      background: cs(footer).backgroundColor,
      columns: [...footer.querySelectorAll(':scope > div > div, :scope > div > ul')].length,
      text: txt(footer).slice(0, 3000),
      links: [...footer.querySelectorAll('a')].map((a) => ({ text: txt(a), href: a.href })),
    },
  };

  // ---- stack fingerprints ----
  const stack = {
    reactRoot: !!document.getElementById('root') || !!document.querySelector('[data-reactroot]'),
    reactDevtools: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
    nextData: !!window.__NEXT_DATA__,
    nuxt: !!window.__NUXT__,
    vue: !!window.__VUE__ || !!document.querySelector('[data-v-app]'),
    angular: !!window.ng || !!document.querySelector('[ng-version]'),
    jquery: !!window.jQuery && (window.jQuery.fn?.jquery || true),
    gtm: !!window.dataLayer,
    ga: !!window.gtag || !!window.ga,
    fbPixel: !!window.fbq,
    bootstrapClasses: !!document.querySelector('.container,.row,.col-md-6,.col-lg-4'),
    tailwindClasses: !!document.querySelector('[class*="flex "],[class*="px-"],[class*="text-sm"]'),
    aos: !!window.AOS || !!document.querySelector('[data-aos]'),
    swiper: !!document.querySelector('.swiper,.swiper-slide'),
    slick: !!document.querySelector('.slick-slider'),
    owl: !!document.querySelector('.owl-carousel'),
    framerMotion: !!document.querySelector('[style*="transform"][data-projection-id]'),
    fontLinks: [...document.querySelectorAll('link[href*=fonts],link[href*=font]')].map((l) => l.href),
    scripts: [...document.querySelectorAll('script[src]')].map((s) => s.src),
    stylesheets: [...document.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href),
  };

  return {
    url: location.href,
    title: document.title,
    lang: document.documentElement.lang || null,
    canonical: document.querySelector('link[rel=canonical]')?.href || null,
    metas, jsonld, headings, sections, links, forms, looseInputs,
    images, bgImages: [...new Set(bgImages)], videos, iframes, inlineSvgCount, favicons,
    tokens, cssVars, chrome, stack,
    fullText: txt(document.body),
    docHeight: document.body.scrollHeight,
  };
};

/* ---------- interaction probe ---------- */
const PROBE = async (page) => {
  const results = [];
  const record = (name, detail) => results.push({ name, ...detail });

  // sticky header on scroll
  try {
    const before = await page.evaluate(() => {
      const h = document.querySelector('header,[class*=header],[class*=navbar]');
      return h ? { pos: getComputedStyle(h).position, bg: getComputedStyle(h).backgroundColor, h: h.getBoundingClientRect().height } : null;
    });
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => {
      const h = document.querySelector('header,[class*=header],[class*=navbar]');
      return h ? { pos: getComputedStyle(h).position, bg: getComputedStyle(h).backgroundColor, h: h.getBoundingClientRect().height, top: h.getBoundingClientRect().top } : null;
    });
    record('headerOnScroll', { before, after, sticky: after && after.top >= -1 });
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (e) { record('headerOnScroll', { error: String(e) }); }

  // scroll-reveal animation detection
  try {
    const reveal = await page.evaluate(() => {
      const els = [...document.querySelectorAll('[data-aos],[class*=fade],[class*=reveal],[class*=animate],[class*=wow]')];
      return { count: els.length, samples: els.slice(0, 10).map((e) => e.className?.toString?.().slice(0, 80)) };
    });
    record('scrollReveal', reveal);
  } catch {}

  // hover states on first primary button and first card
  for (const sel of ['a[class*=btn], button', '[class*=card]']) {
    try {
      const el = page.locator(sel).first();
      if (await el.count()) {
        const base = await el.evaluate((e) => { const s = getComputedStyle(e); return { bg: s.backgroundColor, color: s.color, transform: s.transform, shadow: s.boxShadow, border: s.border }; });
        await el.hover({ timeout: 2000 });
        await page.waitForTimeout(450);
        const hover = await el.evaluate((e) => { const s = getComputedStyle(e); return { bg: s.backgroundColor, color: s.color, transform: s.transform, shadow: s.boxShadow, border: s.border }; });
        record(`hover:${sel}`, { base, hover, changed: JSON.stringify(base) !== JSON.stringify(hover) });
      }
    } catch {}
  }

  // nav dropdown probe
  try {
    const navLinks = page.locator('header a, nav a');
    const n = Math.min(await navLinks.count(), 8);
    for (let i = 0; i < n; i++) {
      const l = navLinks.nth(i);
      const label = (await l.innerText().catch(() => '')).trim();
      if (!label) continue;
      const beforeVisible = await page.locator('ul ul, [class*=dropdown], [class*=submenu]').count();
      await l.hover({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(350);
      const openNow = await page.locator('ul ul:visible, [class*=dropdown]:visible, [class*=submenu]:visible').count();
      if (openNow > 0) {
        const items = await page.locator('ul ul:visible a, [class*=dropdown]:visible a, [class*=submenu]:visible a').allInnerTexts();
        record('navDropdown', { trigger: label, items, beforeVisible });
      }
    }
  } catch {}

  // mobile menu probe
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    const burger = page.locator('[class*=burger],[class*=hamburger],[class*=menu-toggle],[aria-label*=menu i],button:has(svg)').first();
    if (await burger.count()) {
      await burger.click({ timeout: 2000 });
      await page.waitForTimeout(700);
      const panel = await page.evaluate(() => {
        const cands = [...document.querySelectorAll('nav,[class*=menu],[class*=drawer],[class*=offcanvas]')]
          .filter((e) => e.getBoundingClientRect().height > 100 && getComputedStyle(e).visibility !== 'hidden');
        const e = cands[0];
        if (!e) return null;
        const s = getComputedStyle(e);
        return { position: s.position, width: s.width, height: s.height, background: s.backgroundColor, transform: s.transform, items: [...e.querySelectorAll('a')].map((a) => a.innerText.trim()).filter(Boolean) };
      });
      record('mobileMenu', { opened: !!panel, panel });
    } else record('mobileMenu', { opened: false, note: 'no burger element matched' });
  } catch (e) { record('mobileMenu', { error: String(e) }); }

  return results;
};

/* ---------- main ---------- */
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: undefined });

  const network = [];
  ctx.on('request', (r) => network.push({ url: r.url(), type: r.resourceType(), method: r.method() }));

  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  // raw HTML + robots + sitemap + JS bundles
  const raw = await ctx.request.get(BASE);
  const rawHtml = await raw.text();
  await write(`${OUT}/raw/index.html`, rawHtml);
  for (const f of ['robots.txt', 'sitemap.xml', 'asset-manifest.json', 'manifest.json']) {
    try {
      const r = await ctx.request.get(new URL(f, ORIGIN).href);
      if (r.ok()) await write(`${OUT}/raw/${f}`, await r.text());
    } catch {}
  }
  const bundleUrls = [...rawHtml.matchAll(/src="([^"]+\.js)"/g)].map((m) => new URL(m[1], ORIGIN).href);
  for (const b of bundleUrls) {
    try {
      const r = await ctx.request.get(b);
      if (r.ok()) await write(`${OUT}/raw/${path.basename(new URL(b).pathname)}`, await r.text());
    } catch {}
  }

  const queue = [BASE];
  const seen = new Set();
  const pages = [];

  while (queue.length && pages.length < MAX_PAGES) {
    const url = queue.shift();
    const key = url.replace(/\/$/, '').split('#')[0];
    if (seen.has(key)) continue;
    seen.add(key);

    let resp;
    try { resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); }
    catch { try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); } catch { continue; } }
    await page.waitForTimeout(2500);                    // let React + animations settle
    await page.evaluate(async () => {                   // trigger lazy-load / scroll reveals
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);

    const data = await page.evaluate(EXTRACT);
    data.httpStatus = resp?.status() ?? null;
    data.consoleErrors = consoleErrors.splice(0);

    // screenshots at three widths
    const s = slug(url);
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(900);
      await fs.mkdir(`${OUT}/shots`, { recursive: true });
      await page.screenshot({ path: `${OUT}/shots/${s}.${vp.width}.png`, fullPage: true }).catch(() => {});
    }
    await page.setViewportSize({ width: 1440, height: 900 });

    // responsive deltas
    data.responsive = {};
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(700);
      data.responsive[vp.name] = await page.evaluate(() => {
        const h = document.querySelector('header,[class*=header],[class*=navbar]');
        const body = getComputedStyle(document.body);
        return {
          docHeight: document.body.scrollHeight,
          headerHeight: h ? Math.round(h.getBoundingClientRect().height) : null,
          burgerVisible: !!(document.querySelector('[class*=burger],[class*=hamburger],[class*=menu-toggle]') || {}).offsetParent,
          navLinksVisible: [...document.querySelectorAll('header a, nav a')].filter((a) => a.offsetParent).length,
          bodyFontSize: body.fontSize,
          h1FontSize: document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')).fontSize : null,
          gridColumns: [...document.querySelectorAll('*')].map((e) => getComputedStyle(e).gridTemplateColumns).filter((v) => v && v !== 'none').slice(0, 8),
        };
      });
    }
    await page.setViewportSize({ width: 1440, height: 900 });

    if (pages.length === 0) data.interactions = await PROBE(page);   // deep probe on homepage
    await page.setViewportSize({ width: 1440, height: 900 });

    await write(`${OUT}/pages/${s}.json`, data);
    pages.push({ url, slug: s, title: data.title, headings: data.headings.filter((h) => h.level <= 2).map((h) => h.text) });
    console.log(`✓ ${url}  (${data.headings.length} headings, ${data.images.length} images)`);

    for (const l of data.links) {
      if (!l.internal || l.isDoc) continue;
      const clean = l.href.split('#')[0].replace(/\/$/, '');
      if (!seen.has(clean) && !queue.includes(clean)) queue.push(l.href);
    }
  }

  // ---- aggregate assets ----
  const assetMap = {};
  for (const p of pages) {
    const d = JSON.parse(await fs.readFile(`${OUT}/pages/${p.slug}.json`, 'utf8'));
    for (const img of d.images) {
      const k = img.src;
      assetMap[k] = assetMap[k] || { src: k, alts: [], natural: img.natural, usedOn: [], rendered: [] };
      assetMap[k].usedOn.push(p.slug);
      assetMap[k].rendered.push(img.rendered);
      if (img.alt) assetMap[k].alts.push(img.alt);
    }
    for (const bg of d.bgImages) {
      assetMap[bg] = assetMap[bg] || { src: bg, background: true, usedOn: [] };
      assetMap[bg].usedOn.push(p.slug);
    }
  }
  await write(`${OUT}/assets.json`, Object.values(assetMap));

  const hosts = {};
  network.forEach((r) => { const h = new URL(r.url).host; (hosts[h] = hosts[h] || []).push(r.type); });
  await write(`${OUT}/network.json`, {
    thirdPartyHosts: Object.entries(hosts).filter(([h]) => !h.includes(new URL(BASE).host))
      .map(([h, t]) => ({ host: h, types: [...new Set(t)], count: t.length })),
    all: network,
  });

  // ---- HANDOFF-INPUT.md ----
  const home = JSON.parse(await fs.readFile(`${OUT}/pages/${pages[0].slug}.json`, 'utf8'));
  const md = [
    `# Forensic extraction — ${BASE}`,
    `Crawled ${pages.length} routes on ${new Date().toISOString()}`,
    ``,
    `## Routes`,
    ...pages.map((p) => `- \`${new URL(p.url).pathname}\` — "${p.title}" — ${p.headings.slice(0, 4).join(' | ')}`),
    ``,
    `## Stack fingerprints (homepage)`,
    '```json', JSON.stringify(home.stack, null, 2), '```',
    ``,
    `## Third-party hosts`,
    '```json', JSON.stringify(JSON.parse(await fs.readFile(`${OUT}/network.json`, 'utf8')).thirdPartyHosts, null, 2), '```',
    ``,
    `## Design tokens (homepage frequency)`,
    '```json', JSON.stringify(home.tokens, null, 2), '```',
    ``,
    `## CSS variables`,
    '```json', JSON.stringify(home.cssVars, null, 2), '```',
    ``,
    `## Interaction probe`,
    '```json', JSON.stringify(home.interactions, null, 2), '```',
    ``,
    `## Per-page section maps`,
  ];
  for (const p of pages) {
    const d = JSON.parse(await fs.readFile(`${OUT}/pages/${p.slug}.json`, 'utf8'));
    md.push(
      ``, `### ${new URL(p.url).pathname} — ${d.title}`,
      `meta: \`${JSON.stringify(d.metas)}\``,
      `canonical: ${d.canonical || 'none'} | jsonld: ${d.jsonld.length}`,
      ``, `**Headings**`,
      ...d.headings.map((h) => `- H${h.level}: ${h.text}  \`${h.fontSize}/${h.lineHeight} ${h.fontWeight} ${h.fontFamily.split(',')[0]} ${h.color}\``),
      ``, `**Sections (top→bottom)**`,
      ...d.sections.map((s) => `- [${s.order}] <${s.tag}> ${s.heightPx}px bg:${s.background} cols:${s.gridTemplateColumns || '—'} imgs:${s.imageCount} — ${s.headings.join(' / ')} — btns: ${s.buttons.join(', ')}\n  > ${s.textSample.replace(/\n/g, ' ⏎ ').slice(0, 500)}`),
      ``, `**Forms**`, '```json', JSON.stringify({ forms: d.forms, looseInputs: d.looseInputs }, null, 2), '```',
      ``, `**Images**`,
      ...d.images.map((i) => `- ${i.src} | alt:"${i.alt}" | natural ${i.natural.join('x')} | rendered ${i.rendered.join('x')} | fit:${i.objectFit} radius:${i.borderRadius}`),
      ``, `**Responsive**`, '```json', JSON.stringify(d.responsive, null, 2), '```',
      ``, `**Full text**`, '```', d.fullText.slice(0, 12000), '```',
    );
  }
  await write(`${OUT}/HANDOFF-INPUT.md`, md.join('\n'));

  await browser.close();
  console.log(`\nDone. ${pages.length} routes → ./out\nPaste ./out/HANDOFF-INPUT.md into Claude, and attach ./out/shots/*.1440.png + *.390.png`);
})();
