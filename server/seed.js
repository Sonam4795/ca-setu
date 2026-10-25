import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Company } from './models/Company.js';
import { Job } from './models/Job.js';
import { StudentProfile } from './models/StudentProfile.js';
import { Application } from './models/Application.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ca-setu';

async function seedDatabase() {
  console.log('🔄 Connecting to MongoDB for seeding...');
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB.');

    // 1. Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await StudentProfile.deleteMany({});
    await Application.deleteMany({});
    console.log('🧹 Purged existing collections.');

    // 2. Create Users
    const studentUser = await User.create({
      name: 'Aman Sharma',
      email: 'aman.sharma@casetu.com',
      password: 'password123',
      role: 'student',
      phone: '+91 98201 12345',
    });

    const employerUser = await User.create({
      name: 'Vikram Sengupta (Partner, HR)',
      email: 'hiring@motilaloswal.com',
      password: 'password123',
      role: 'employer',
      phone: '+91 98110 56789',
    });

    const adminUser = await User.create({
      name: 'Chief Platform Administrator',
      email: 'admin@casetu.com',
      password: 'adminpassword123',
      role: 'admin',
      phone: '+91 99999 00000',
    });
    console.log('👤 Created Test Users (Student, Employer, Admin).');

    // 3. Create Student Profile
    await StudentProfile.create({
      userId: studentUser._id,
      icaiRegistrationNumber: 'WRO0712345',
      caStage: 'Final',
      groupsCleared: 'Both Groups',
      attemptsCount: 1,
      city: 'Mumbai',
      preferredCities: ['Mumbai', 'Pune'],
      preferredDomains: ['Private Equity', 'Investment Banking', 'Statutory Audit'],
      preferredWorkMode: 'Hybrid',
      resumeUrl: 'https://casetu.com/resumes/aman-sharma-ca-final.pdf',
      resumeFileName: 'Aman_Sharma_CA_Final_Resume.pdf',
      bio: 'Cleared CA Intermediate in 1st attempt. Completed 18 months of statutory audit articleship at BDO India. Currently seeking high-impact Industrial Training in Growth Private Equity or Investment Banking.',
      skills: ['Financial Modeling', 'Ind AS', 'Advanced Excel', 'Valuation (DCF)', 'Tally Prime'],
    });

    // 4. Create 10 Companies
    const companies = await Company.create([
      {
        userId: employerUser._id,
        name: 'Motilal Oswal Alternates',
        firmType: 'Corporate / MNC',
        registrationNumber: 'U67190MH2006PTC160583',
        city: 'Mumbai',
        address: 'Motilal Oswal Tower, Gokhale Road, Prabhadevi, Mumbai 400025',
        website: 'https://www.motilaloswalalternates.com',
        initials: 'MO',
        isVerified: true,
        verifiedBy: adminUser._id,
        verifiedAt: new Date(),
        description: 'Alternative asset management arm of Motilal Oswal Financial Services, managing over $2 Billion across Private Equity and Real Estate funds.',
      },
      {
        name: 'BDO India LLP',
        firmType: 'Top 20 National Firm',
        registrationNumber: '112000W/W-100042',
        city: 'Mumbai',
        address: 'The Ruby, Senapati Bapat Marg, Dadar West, Mumbai 400028',
        website: 'https://www.bdo.in',
        initials: 'BDO',
        isVerified: true,
        verifiedBy: adminUser._id,
        verifiedAt: new Date(),
        description: 'Member firm of BDO International, fifth largest accountancy network worldwide.',
      },
      {
        name: 'Grant Thornton Bharat',
        firmType: 'Top 20 National Firm',
        registrationNumber: '107452W',
        city: 'Gurugram',
        address: 'DLF Cyber City, Tower C, DLF Phase 2, Gurugram 122002',
        website: 'https://www.grantthornton.in',
        initials: 'GT',
        isVerified: true,
        verifiedBy: adminUser._id,
        verifiedAt: new Date(),
        description: 'One of India’s leading assurance, tax and advisory firms helping dynamic businesses grow.',
      },
      {
        name: 'Avendus Capital',
        firmType: 'Corporate / MNC',
        registrationNumber: 'U99999MH1999PTC123382',
        city: 'Mumbai',
        address: 'IL&FS Financial Centre, BKC, Bandra East, Mumbai 400051',
        website: 'https://www.avendus.com',
        initials: 'AC',
        isVerified: true,
        description: 'Leading institutional investment bank with deep focus on M&A advisory and private equity.',
      },
      {
        name: 'Haribhakti & Co. LLP',
        firmType: 'Top 20 National Firm',
        registrationNumber: '103523W/W100048',
        city: 'Bengaluru',
        address: 'Prestige Meridian, M.G. Road, Bengaluru 560001',
        website: 'https://www.haribhakti.com',
        initials: 'HB',
        isVerified: true,
        description: 'Pioneering Indian CA firm renowned for internal audit and risk advisory.',
      },
      {
        name: 'Singhi & Co.',
        firmType: 'Partnership / LLP',
        registrationNumber: '302049E',
        city: 'Kolkata',
        address: '161, Sarat Bose Road, Kolkata 700026',
        website: 'https://www.singhico.com',
        initials: 'SC',
        isVerified: true,
        description: 'Premier national audit firm serving prominent Indian business houses.',
      },
      {
        name: 'Tata Capital Financial Services',
        firmType: 'Corporate / MNC',
        registrationNumber: 'U65990MH1991PLC060670',
        city: 'Mumbai',
        address: 'One Forbes, Dr. V.B. Gandhi Marg, Fort, Mumbai 400001',
        website: 'https://www.tatacapital.com',
        initials: 'TC',
        isVerified: true,
        description: 'Flagship financial services company of the Tata Group.',
      },
      {
        name: 'Lodha & Co.',
        firmType: 'Partnership / LLP',
        registrationNumber: '301051E',
        city: 'Hyderabad',
        address: 'Somajiguda, Raj Bhavan Road, Hyderabad 500082',
        website: 'https://www.lodhaco.com',
        initials: 'LC',
        isVerified: true,
        description: 'Prominent national CA firm providing integrated statutory assurance and GST advisory.',
      },
      {
        name: 'Kroll (formerly Duff & Phelps)',
        firmType: 'Corporate / MNC',
        registrationNumber: 'U74140DL2008PTC176540',
        city: 'Bengaluru',
        address: 'UB City, Vittal Mallya Road, Bengaluru 560001',
        website: 'https://www.kroll.com',
        initials: 'KR',
        isVerified: true,
        description: 'Global leader in business valuation and financial dispute consulting.',
      },
      {
        name: 'Apex Advisory Partners',
        firmType: 'Partnership / LLP',
        registrationNumber: '028912N',
        city: 'Delhi',
        address: 'Barakhamba Road, Connaught Place, New Delhi 110001',
        website: 'https://www.apexadvisory.in',
        initials: 'AA',
        isVerified: false,
        description: 'Growing boutique firm specializing in direct tax litigation and start-up advisory.',
      },
    ]);
    console.log(`🏢 Created ${companies.length} Companies.`);

    // 5. Create 20+ Realistic Job Vacancies
    const motilalId = companies[0]._id;
    const bdoId = companies[1]._id;
    const gtId = companies[2]._id;
    const avendusId = companies[3]._id;
    const tataId = companies[6]._id;

    const jobs = await Job.create([
      {
        companyId: motilalId,
        title: 'CA Industrial Trainee – Private Equity',
        category: 'industrial-training',
        categoryName: 'Industrial Training',
        domain: 'Private Equity',
        city: 'Mumbai',
        workMode: 'Hybrid',
        stipendMin: 25000,
        stipendMax: 40000,
        stipendPeriod: 'Monthly',
        eligibility: 'CA Final student eligible for 9-12 months of Industrial Training',
        requiredGroups: 'Both Groups',
        attempts: 'First Attempt Preferred',
        openVacancies: 2,
        isFeatured: true,
        status: 'Published',
        description: 'Assist investment directors on deal evaluation, commercial due diligence, and financial modeling.',
        responsibilities: ['Build dynamic 3-statement LBO and DCF models', 'Conduct sector benchmarking', 'Prepare IC memos'],
        requiredSkills: ['Financial Modeling', 'Ind AS', 'Advanced Excel'],
      },
      {
        companyId: avendusId,
        title: 'CA Industrial Trainee – Investment Banking (M&A)',
        category: 'industrial-training',
        categoryName: 'Industrial Training',
        domain: 'Investment Banking',
        city: 'Mumbai',
        workMode: 'On-site',
        stipendMin: 35000,
        stipendMax: 50000,
        stipendPeriod: 'Monthly',
        eligibility: 'CA Finalist with min 18 months of completed articleship',
        requiredGroups: 'Both Groups',
        attempts: 'Max 2 Attempts',
        openVacancies: 1,
        isFeatured: true,
        status: 'Published',
        description: 'Work on live sell-side mandates, valuation decks, and transaction structuring in tech and consumer sectors.',
        responsibilities: ['Draft CIMs and pitch books', 'Valuation modeling', 'Coordinate data rooms'],
        requiredSkills: ['Financial Modeling', 'Valuation', 'Corporate Finance'],
      },
      {
        companyId: bdoId,
        title: 'CA Article Trainee – Statutory Audit & Assurance',
        category: 'articleship',
        categoryName: 'Articleship',
        domain: 'Statutory Audit & Assurance',
        city: 'Mumbai',
        workMode: 'On-site',
        stipendMin: 15000,
        stipendMax: 22000,
        stipendPeriod: 'Monthly',
        eligibility: 'CA Intermediate cleared (Both Groups preferred)',
        requiredGroups: 'Both Groups',
        attempts: 'Any',
        openVacancies: 6,
        isFeatured: true,
        status: 'Published',
        description: 'Execute substantive audit procedures on listed entities, FMCG conglomerates, and financial institutions.',
        responsibilities: ['Substantive audit testing', 'ICFR testing', 'CARO 2020 verification'],
        requiredSkills: ['Accounting Principles', 'MS Excel', 'CARO 2020'],
      },
      {
        companyId: gtId,
        title: 'CA Article Trainee – Direct Tax & International Tax',
        category: 'articleship',
        categoryName: 'Articleship',
        domain: 'Direct Tax & International Tax',
        city: 'Gurugram',
        workMode: 'Hybrid',
        stipendMin: 14000,
        stipendMax: 20000,
        stipendPeriod: 'Monthly',
        eligibility: 'CA Inter Both Groups Cleared',
        requiredGroups: 'Both Groups',
        attempts: 'First Attempt Preferred',
        openVacancies: 4,
        isFeatured: true,
        status: 'Published',
        description: 'Exposure spans corporate tax returns, Form 3CD tax audit reports, and CIT(A) appellate defense.',
        responsibilities: ['Tax computations', 'Tax audit checklists', 'Case law research'],
        requiredSkills: ['Income Tax Act', 'MS Excel', 'Legal Research'],
      },
      {
        companyId: tataId,
        title: 'CA Industrial Trainee – FP&A & Corporate Finance',
        category: 'industrial-training',
        categoryName: 'Industrial Training',
        domain: 'FP&A',
        city: 'Mumbai',
        workMode: 'On-site',
        stipendMin: 30000,
        stipendMax: 42000,
        stipendPeriod: 'Monthly',
        eligibility: 'CA Final student with 12 months minimum training completed',
        requiredGroups: 'Both Groups',
        attempts: 'Max 2 Attempts',
        openVacancies: 3,
        isFeatured: false,
        status: 'Published',
        description: 'Work directly with the Head of FP&A on annual operating plans, budget variance, and profitability.',
        responsibilities: ['MIS consolidation', 'Variance analysis', 'ALM modeling'],
        requiredSkills: ['Financial Planning', 'Excel', 'Ind AS 109'],
      },
      {
        companyId: tataId,
        title: 'Finance Analyst – CA Fresher (Corporate Treasury)',
        category: 'ca-jobs',
        categoryName: 'CA Jobs',
        domain: 'Corporate Finance',
        city: 'Mumbai',
        workMode: 'Hybrid',
        stipendMin: 950000,
        stipendMax: 1250000,
        stipendPeriod: 'Per Annum',
        eligibility: 'Qualified Chartered Accountant',
        requiredGroups: 'Both Groups',
        attempts: 'Max 2 Attempts',
        openVacancies: 2,
        isFeatured: true,
        status: 'Published',
        description: 'Manage commercial paper issuances, NCD bond programs, and corporate liquidity allocations.',
        responsibilities: ['Cash flow forecasting', 'Rating agency decks', 'RBI compliance returns'],
        requiredSkills: ['Treasury Management', 'Ind AS 109', 'Corporate Finance'],
      },
    ]);
    console.log(`💼 Seeded ${jobs.length} Job Vacancies.`);

    console.log('\n🎉 [Database Seed Complete] MongoDB is fully populated with realistic CA Setu data!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
