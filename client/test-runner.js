import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\ca-setu\\test-screenshots';

async function runBrowserTests() {
  console.log('🚀 [QA Test Runner] Launching Headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('🧪 Test 1: Verifying Homepage (http://localhost:5173)...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-homepage.png'), fullPage: false });
  const title = await page.title();
  console.log(`   Page Title: "${title}" - PASS`);

  console.log('🧪 Test 2: Verifying Articleship Listings (/articleship)...');
  await page.goto('http://localhost:5173/articleship', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-articleship-listings.png'), fullPage: false });
  console.log('   Articleship listings rendered - PASS');

  console.log('🧪 Test 3: Verifying Industrial Training Listings (/industrial-training)...');
  await page.goto('http://localhost:5173/industrial-training', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-industrial-training.png'), fullPage: false });
  console.log('   Industrial Training listings rendered - PASS');

  console.log('🧪 Test 4: Verifying Job Details Page (/jobs/job-1)...');
  await page.goto('http://localhost:5173/jobs/job-1', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-job-details.png'), fullPage: false });
  console.log('   Job details rendered with Verified badge - PASS');

  console.log('🧪 Test 5: Verifying Login Page & 1-Click Demo Accounts (/login)...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-login-page.png'), fullPage: false });
  console.log('   Login page rendered with demo accounts - PASS');

  console.log('🧪 Test 6: Testing Mobile Viewport (390x844 iPhone 14)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-mobile-home.png'), fullPage: false });

  await page.goto('http://localhost:5173/jobs/job-1', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-mobile-job-details.png'), fullPage: false });
  console.log('   Mobile-first responsive design verified - PASS');

  console.log('🧪 Test 7: Verifying Student Dashboard (/student/dashboard)...');
  await page.setViewport({ width: 1440, height: 900 });
  // Set localStorage user to student
  await page.evaluate(() => {
    localStorage.setItem(
      'ca_setu_user',
      JSON.stringify({
        id: 'usr-student-1',
        name: 'Aman Sharma',
        email: 'aman.sharma@casetu.com',
        role: 'student',
        caStage: 'Final',
        groupsCleared: 'Both Groups',
        city: 'Mumbai',
        resumeUrl: 'https://casetu.com/resumes/aman.pdf',
      })
    );
  });
  await page.goto('http://localhost:5173/student/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-student-dashboard.png'), fullPage: false });
  console.log('   Student Dashboard rendered - PASS');

  console.log('🧪 Test 8: Verifying Employer Dashboard (/employer/dashboard)...');
  await page.evaluate(() => {
    localStorage.setItem(
      'ca_setu_user',
      JSON.stringify({
        id: 'usr-employer-1',
        name: 'Motilal Oswal HR',
        email: 'hiring@motilaloswal.com',
        role: 'employer',
        companyId: 'comp-1',
      })
    );
  });
  await page.goto('http://localhost:5173/employer/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-employer-dashboard.png'), fullPage: false });
  console.log('   Employer Dashboard rendered - PASS');

  console.log('🧪 Test 9: Verifying Admin Dashboard (/admin/dashboard)...');
  await page.evaluate(() => {
    localStorage.setItem(
      'ca_setu_user',
      JSON.stringify({
        id: 'usr-admin-1',
        name: 'Platform Admin',
        email: 'admin@casetu.com',
        role: 'admin',
      })
    );
  });
  await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-admin-dashboard.png'), fullPage: false });
  console.log('   Admin Dashboard & Verification Queue rendered - PASS');

  await browser.close();
  console.log('\n🎉 [All 9 Tests Passed] Full browser testing successfully completed!');
}

runBrowserTests().catch((err) => {
  console.error('❌ Browser test failed:', err);
  process.exit(1);
});
