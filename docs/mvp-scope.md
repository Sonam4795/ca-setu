# Minimum Viable Product (MVP) Scope & Boundaries — CA Setu

**Document Version:** 1.0 (V0 Planning)  
**Product Stage:** V0 — Requirement Analysis & Product Planning  

---

## 1. What is an MVP? (The Business & Accounting Perspective)

In finance, when an entrepreneur launches a new venture, they do not construct a 20-story commercial complex on day one. They launch a pilot facility to test demand, validate customer willingness to transact, and optimize operating cash flows before committing major capital expenditure (CapEx).

In software development, this pilot is called a **Minimum Viable Product (MVP)**:
- It is the simplest, most reliable version of the product that completely solves the core problem for target users.
- It prevents "feature creep" (spending months building fancy features that nobody actually uses).
- It allows CA Setu to launch quickly, gather real feedback from CA students and partner firms, and iterate based on actual usage data.

---

## 2. In-Scope vs. Out-of-Scope Matrix (The MVP Boundary)

The following table establishes a strict contract for what will be built during the initial MVP release cycle (V1 through V6):

| Functional Area | In-Scope (MVP Core Deliverable) | Out-of-Scope (Deferred to Post-MVP) |
| :--- | :--- | :--- |
| **Authentication & Roles** | Email & password registration with JWT auth; 3 distinct roles: Student, Employer, Admin. | Social logins (Google, LinkedIn SSO); Multi-factor authentication (SMS OTP). |
| **Student Profiles** | ICAI stage (Inter/Final/Qualified), Groups Cleared, Attempts, City, Skills, Bio, and PDF resume upload. | AI resume parser; Video introduction pitch; Direct LinkedIn profile import. |
| **Search & Discovery** | Filter by Category, Domain, City, Work Mode, Groups Cleared, Stipend bracket, and Firm Type. | AI-powered candidate-job recommendation matching score; Geolocation map radius search. |
| **Job Postings** | Employer job creation form (Title, Domain, City, Stipend, Description, Requirements); Draft & Review flow. | Recurring / automated job reposting; Multi-city syndication from external ATS feeds. |
| **Application Workflow** | One-click apply with uploaded resume; Anti-duplicate check; 6 status stages (`Applied` → `Selected`). | Automated email interview scheduling calendar sync (Google Meet / Calendly integration). |
| **Company Verification** | Employer enters FRN/CIN and uploads Certificate; Admin manual verification queue in dashboard. | Automated API integration with ICAI/MCA database (ICAI lacks public API infrastructure). |
| **Communication** | In-app notification cards and automated transactional emails (status changes). | Real-time chat messenger between student and firm; WhatsApp bot integration. |
| **Monetization & Payments** | 100% Free for all early-adopter students and CA firms to maximize liquidity and network effects. | Payment gateway integration (Razorpay/Stripe), paid job slots, sponsored banners. |
| **Analytics & Reporting** | Core Admin statistics (Total users, active jobs, applications submitted, verified firms). | Advanced cohort analytics, heatmaps, employer hiring speed benchmarks. |

---

## 3. Detailed MVP Page & Feature Deliverables

### 3.1 Public Guest Pages
1. **Homepage (`/`)**: Hero banner, quick domain/city search bar, category shortcuts, featured verified firms, value proposition cards.
2. **Category Search Feeds (`/articleship`, `/industrial-training`, `/ca-jobs`)**: Left-hand filter sidebar, job cards grid, pagination.
3. **Job Detail Page (`/jobs/:id`)**: Comprehensive role overview, firm information, stipend badge, "Apply Now" and "Save" buttons.
4. **Company Directory (`/companies`) & Detail (`/companies/:id`)**: Showcase of verified CA firms with active openings.
5. **Static Pages (`/about`, `/contact`)**: Mission statement, team, support contact form.
6. **Authentication (`/login`, `/register`)**: Role-specific tabbed onboarding.

### 3.2 Student Workspace
1. **Student Dashboard (`/student/dashboard`)**: Snapshot of submitted applications and saved jobs.
2. **Profile Editor (`/student/profile`)**: Manage CA academic details and upload/replace resume PDF.
3. **Application Tracker (`/student/applications`)**: Visual status badge and timeline for all submitted applications.
4. **Bookmarks (`/student/saved-jobs`)**: Quick-access list of bookmarked vacancies.
5. **Settings (`/student/settings`)**: Password reset and account management.

### 3.3 Employer Workspace
1. **Employer Dashboard (`/employer/dashboard`)**: Active vacancies overview and recent applicant count.
2. **Company Profile Manager (`/employer/company`)**: Firm description, logo, address, FRN, and verification doc upload.
3. **Job Posting Wizard (`/employer/post-job`)**: Standardized vacancy creation form.
4. **Active Jobs Manager (`/employer/jobs`)**: List of firm's jobs with status toggles (`Published`, `Paused`, `Closed`).
5. **Applicant Review Center (`/employer/applicants`)**: Candidate screening cards, resume viewer, status dropdown (`Shortlisted`, `Interview`, `Selected`, `Rejected`).

### 3.4 Admin Control Center
1. **Admin Dashboard (`/admin/dashboard`)**: Metric overview and pending approval counts.
2. **Company Verification Queue (`/admin/companies`)**: Review firm documents and toggle `CA Setu Verified` status.
3. **Job Moderation Queue (`/admin/jobs`)**: Review pending job posts for compliance before publishing.
4. **User Management (`/admin/users`)**: Search, view, or suspend user accounts.
5. **Report Center (`/admin/reports`)**: Investigate and close user-reported listings or spam.

---

## 4. MVP Risk Management & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **Chicken-and-Egg Liquidity Problem** (Firms won't post without students; students won't visit without jobs). | High | High | Pre-seed the platform with 50+ manually curated, verified articleship and industrial training openings before public launch. Partner with 10 friendly mid-sized CA firms for exclusive initial listings. |
| **Fake or Exploitative Postings** (Phantom firms posting sub-minimum stipends or gathering resumes for spam). | Medium | High | **Zero Self-Publishing Policy:** No firm can go live without Admin verification of their ICAI Firm Registration Number (FRN). |
| **High Drop-off during Registration** (Students abandoning lengthy forms). | Medium | Medium | Two-step registration: Allow quick sign-up with just Name, Email, and Password to browse; only require full CA details when the student actually hits "Apply". |
| **ICAI Regulatory Shifts** (Changes in articleship rules or exam structures). | Low | Medium | Dynamic schema in MongoDB allows adjusting academic fields (e.g., new vs old scheme) without breaking existing historical data. |

---

## 5. MVP Success Metrics & Key Performance Indicators (KPIs)

To evaluate whether the MVP is successful in its first 90 days after launch:

| Metric Category | Target KPI (First 90 Days) | What It Validates |
| :--- | :--- | :--- |
| **Supply (Firms)** | 50+ Verified CA Firms & Corporate Employers | Confirms firms see value in a specialized channel over generic email spam. |
| **Supply (Openings)** | 150+ Published Vacancies across the 3 categories | Provides sufficient variety of choices for students across major metro hubs. |
| **Demand (Students)** | 2,500+ Registered CA Students | Confirms student demand and organic word-of-mouth adoption. |
| **Liquidity (Applications)**| 5,000+ Total Applications submitted | Demonstrates active marketplace engagement. |
| **Quality (Response Rate)**| > 60% of applications reviewed within 7 business days | Ensures students do not feel neglected; validates employer active usage. |
| **Placement Proof** | 50+ Documented Placements (Status = `Selected`) | The ultimate proof of product-market fit (PMF). |
