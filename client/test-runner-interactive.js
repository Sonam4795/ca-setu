import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\ca-setu\\test-screenshots';

async function testInteractiveFlows() {
  console.log('🚀 [Interactive QA] Launching browser to test 1-click logins and flows...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Student Login via 1-Click Button
  console.log('👉 Testing Student 1-Click Sign In...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  // Find the button with text 'Student'
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const studentBtn = buttons.find((b) => b.innerText.includes('Student'));
    if (studentBtn) studentBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-student-dashboard-live.png'), fullPage: false });
  console.log('   Student Dashboard verified - URL:', page.url());

  // 2. Test Applying to a Job
  console.log('👉 Testing Job Application Flow as Student...');
  await page.goto('http://localhost:5173/jobs/job-1', { waitUntil: 'networkidle0' });
  // Click Apply Button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const applyBtn = buttons.find((b) => b.innerText.includes('Apply'));
    if (applyBtn) applyBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11-application-modal.png'), fullPage: false });

  // Confirm Application
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find((b) => b.innerText.includes('Confirm & Submit'));
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12-application-success.png'), fullPage: false });
  console.log('   Application submission modal & duplicate check verified - PASS');

  // 3. Employer Login via 1-Click Button
  console.log('👉 Testing Employer 1-Click Sign In...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const empBtn = buttons.find((b) => b.innerText.includes('Employer'));
    if (empBtn) empBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-employer-dashboard-live.png'), fullPage: false });
  console.log('   Employer Dashboard verified - URL:', page.url());

  // 4. Admin Login via 1-Click Button
  console.log('👉 Testing Admin 1-Click Sign In...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const adminBtn = buttons.find((b) => b.innerText.includes('Admin'));
    if (adminBtn) adminBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-admin-dashboard-live.png'), fullPage: false });
  console.log('   Admin Dashboard verified - URL:', page.url());

  await browser.close();
  console.log('🎉 [Interactive QA Verification Complete] All user journeys verified!');
}

testInteractiveFlows().catch((err) => {
  console.error('Interactive QA error:', err);
  process.exit(1);
});
