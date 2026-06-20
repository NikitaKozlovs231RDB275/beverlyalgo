const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,  // headed so WebGL works
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'C:/Users/nex7/AppData/Local/Temp/hero_bg_gpu.png' });

  // Check pixel color at top-right area (where gradient corners should show)
  const pixel = await page.evaluate(() => {
    // sample from the gradient area using canvas trick
    const canvas = document.querySelector('canvas');
    if (!canvas) return 'no canvas';
    try {
      const ctx = canvas.getContext('2d') || canvas.getContext('webgl');
      return 'canvas present, type: ' + canvas.getAttribute('data-engine');
    } catch {
      return 'canvas access error';
    }
  });
  console.log('canvas check:', pixel);

  // Check computed background of the hero section
  const heroStyle = await page.evaluate(() => {
    const hero = document.querySelector('section');
    return hero ? window.getComputedStyle(hero).backgroundColor : null;
  });
  console.log('hero bg:', heroStyle);

  const checks = await page.evaluate(() => ({
    hasNightImg: !!document.querySelector('img[src*="night-background"]'),
    canvases: document.querySelectorAll('canvas').length,
    grainDiv: !!document.querySelector('[class*="GrainGradient"], canvas'),
  }));
  console.log('checks:', JSON.stringify(checks));

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
