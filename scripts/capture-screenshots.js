const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });

  // 1. Dark Mode Desktop Hero & Components
  {
    console.log('Capturing Dark Mode View...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Dark Mode Hero
    await page.screenshot({ path: path.join(outputDir, 'hero-dark.png') });

    // Architecture Visualizer
    const arch = await page.$('#ebpf-architecture-visualizer');
    if (arch) {
      await arch.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await arch.screenshot({ path: path.join(outputDir, 'ebpf-architecture.png') });
    }

    // CLI Simulator
    const cli = await page.$('#interactive-cli-simulator');
    if (cli) {
      await cli.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await cli.screenshot({ path: path.join(outputDir, 'cli-simulator.png') });
    }

    // Step-by-Step Code Snippets
    const steps = await page.$('#step-by-step-workflow');
    if (steps) {
      await steps.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await steps.screenshot({ path: path.join(outputDir, 'code-snippets.png') });
    }

    await context.close();
  }

  // 2. Search Modal Overlay
  {
    console.log('Capturing Search Modal...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    const searchBtn = await page.$('button:has-text("Search")');
    if (searchBtn) {
      await searchBtn.click();
      await page.waitForTimeout(600);
      // Type a query in search box
      await page.keyboard.type('eBPF');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(outputDir, 'search-modal.png') });
    }
    await context.close();
  }

  // 3. Light Mode Hero
  {
    console.log('Capturing Light Mode...');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Toggle theme to light mode
    const headerBtns = await page.$$('header button');
    for (const b of headerBtns) {
      const html = await b.innerHTML();
      if (html.includes('lucide-sun') || html.includes('lucide-moon')) {
        await b.click();
        await page.waitForTimeout(500);
        break;
      }
    }
    await page.screenshot({ path: path.join(outputDir, 'hero-light.png') });
    await context.close();
  }

  // 4. Mobile Viewport (Dark Mode)
  {
    console.log('Capturing Mobile View...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outputDir, 'mobile-view.png') });
    await context.close();
  }

  await browser.close();
  console.log('✨ All screenshots captured successfully in public/screenshots/ !');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
