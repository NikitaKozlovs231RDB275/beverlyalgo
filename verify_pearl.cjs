const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // 1. Check style tag was injected into <head>
  const styleInHead = await page.evaluate(() => {
    const styles = [...document.head.querySelectorAll('style')];
    return styles.map(s => ({
      href: s.getAttribute('data-href') || s.getAttribute('href') || '(no href)',
      snippet: (s.textContent || '').trim().substring(0, 80),
    }));
  });
  console.log('styles in head:', JSON.stringify(styleInHead, null, 2));

  // 2. Compute display value on the two spans at rest
  const spanStates = await page.evaluate(() => {
    const btns = document.querySelectorAll('.pearl-button');
    if (!btns.length) return 'no pearl-buttons found';
    const btn = btns[0];
    const spans = btn.querySelectorAll('.wrap p span');
    return [...spans].map((s, i) => ({
      i: i + 1,
      text: s.textContent,
      display: window.getComputedStyle(s).display,
    }));
  });
  console.log('span computed display (rest):', JSON.stringify(spanStates));

  // 3. Check wrap::before is rendered (non-zero size)
  const pseudoBefore = await page.evaluate(() => {
    const btn = document.querySelector('.pearl-button .wrap');
    if (!btn) return null;
    const cs = window.getComputedStyle(btn, '::before');
    return { content: cs.content, bgColor: cs.backgroundColor };
  });
  console.log('wrap::before computed:', JSON.stringify(pseudoBefore));

  // 4. Snapshot: navbar + hero area
  await page.screenshot({ path: 'C:/Users/nex7/AppData/Local/Temp/pearl_before.png', clip: { x: 0, y: 0, width: 1280, height: 320 } });

  // 5. Hover over first button
  const btn = page.locator('.pearl-button').first();
  await btn.hover();
  await page.waitForTimeout(350);

  const spanHover = await page.evaluate(() => {
    const spans = document.querySelectorAll('.pearl-button .wrap p span');
    return [...spans].map((s, i) => ({
      i: i + 1,
      text: s.textContent,
      display: window.getComputedStyle(s).display,
    }));
  });
  console.log('span computed display (hover):', JSON.stringify(spanHover));

  await page.screenshot({ path: 'C:/Users/nex7/AppData/Local/Temp/pearl_hover.png', clip: { x: 900, y: 55, width: 350, height: 90 } });

  // 6. Scroll to hero CTA and screenshot
  await page.evaluate(() => window.scrollTo({ top: 500 }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/nex7/AppData/Local/Temp/pearl_hero.png', clip: { x: 350, y: 0, width: 580, height: 900 } });

  // 7. Scroll to CTA section
  await page.evaluate(() => {
    document.querySelectorAll('section').forEach(s => {
      if (s.textContent?.includes('Start trading')) s.scrollIntoView({ behavior: 'instant' });
    });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/nex7/AppData/Local/Temp/pearl_cta.png', clip: { x: 0, y: 0, width: 1280, height: 500 } });

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
