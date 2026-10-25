# Product Requirements Document (PRD) — CA Setu

**Document Version:** 1.0 (V0 Planning)  
**Product Stage:** V0 — Requirement Analysis & Product Planning  
**Target Architecture:** MERN Stack (MongoDB, Express.js, React.js, Node.js)  

---

## 1. Executive Summary & Problem Statement

### 1.1 The Context of the CA Ecosystem
Becoming a Chartered Accountant under the Institute of Chartered Accountants of India (ICAI) requires not just passing rigorous examinations, but also completing mandatory hands-on practical training:
- **Articleship:** Mandatory practical training (under the new scheme: 2 continuous years) served under an active CA holding a Certificate of Practice (COP).
- **Industrial Training:** Optional practical training served in approved financial institutions or corporate companies during the final 9 to 12 months of the training period.
- **Qualified CA Employment:** Specialized finance, audit, taxation, and consulting opportunities for freshly qualified or experienced Chartered Accountants.

### 1.2 The Problem
Generic job boards (such as Naukri, Indeed, or LinkedIn) treat all candidates identically:
- They do not possess fields for **ICAI Registration Numbers, Groups Cleared (Group 1, Group 2, or Both), Number of Attempts, or Articleship Eligibility Dates**.
- They treat stipend as "salary", leading to mismatched filters or completely misleading compensation tags.
- They lack awareness of CA Firm classifications (Sole Proprietorships, Mid-size Partnership firms, Top 20 firms, and Big 4/Big 6 networks).
- Articleship and Industrial Training vacancies are overwhelmingly circulated through chaotic, unverified WhatsApp/Telegram groups, leading to high spam, outdated posts, and privacy leaks of students' personal contact numbers.

### 1.3 The Solution: CA Setu
**CA Setu** ("The Bridge for Chartered Accountants") is a specialized, trusted career marketplace designed from the ground up for the Indian CA community. It standardizes profiles, validates employers, enforces structured filters, and provides end-to-end transparent application tracking.

---

## 2. Product Positioning & Value Proposition

CA Setu is **not** a general-purpose job board. Its positioning principles are:

1. **Ecosystem-Native Vocabulary:** Uses CA-specific terminology natively (e.g., Articleship, Industrial Training, Stipend, FRN, COP, Groups Cleared, Attempts).
2. **Strict Verification & Zero-Spam Guarantee:** No employer can publish listings without manual or document verification by CA Setu Admins.
3. **Structured Taxonomy:** Pre-built domains tailored to financial services, audit, taxation, and advisory.
4. **Candidate Dignity & Transparency:** Real-time visibility into whether an application has been viewed, shortlisted, scheduled for interview, or rejected.

---

## 3. User Personas

### Persona A: The CA Student (Aman Sharma)
- **Profile:** Cleared CA Intermediate (Both Groups on 1st attempt). Looking for a 2-year articleship in Direct Tax or Statutory Audit in a reputable mid-sized or Top 20 firm in Mumbai or Delhi NCR.
- **Pain Point:** Tired of cold emailing partners on LinkedIn with no response and joining hundreds of spammy WhatsApp groups.
- **Need on CA Setu:** Filter firms by city, domain, and stipend, submit a standardized profile and resume, and track which firms reviewed his application.

### Persona B: The CA Finalist / Industrial Trainee (Priya Mehta)
- **Profile:** Completed 15 months of articleship in a mid-sized firm; eligible for 9-12 months of Industrial Training. Wants an Investment Banking or FP&A role at an MNC bank in Bengaluru.
- **Pain Point:** Industrial training openings are notoriously opaque and usually filled through internal corporate references before public awareness.
- **Need on CA Setu:** Dedicated "Industrial Training" section filtered specifically by high-finance domains, with clear start-date eligibility matching.

### Persona C: The Qualified / Semi-Qualified CA (Rahul Verma, ACA)
- **Profile:** Qualified Chartered Accountant with 2 years of post-qualification experience in Internal Audit and Risk Advisory.
- **Pain Point:** Generic job portals flood him with irrelevant accounts-executive or sales jobs.
- **Need on CA Setu:** Exclusive access to verified CA jobs with transparent CTC brackets and domain specialization.

### Persona D: The CA Firm Partner / HR Manager (M/s K.S. & Associates)
- **Profile:** Managing Partner of a 6-partner firm in Ahmedabad with 15 articleship vacancies across Audit and GST.
- **Pain Point:** Receives hundreds of irrelevant resumes in email inbox; no easy way to filter candidates by groups cleared or location.
- **Need on CA Setu:** A dashboard to post vacancies, review pre-screened CA students, shortlist the best candidates, and manage interview schedules.

### Persona E: The CA Setu Platform Admin
- **Profile:** Operations and compliance lead responsible for marketplace integrity.
- **Need on CA Setu:** Verification queue to review CA firm registration certificates (ICAI Firm Registration Number - FRN / Corporate CIN) before granting posting privileges.

---

## 4. Core Categories & Taxonomy Specifications

### 4.1 Primary Opportunity Categories
Every job post on CA Setu must belong strictly to one of three categories:
1. **Articleship** (Mandatory practical training under ICAI regulations)
2. **Industrial Training** (Corporate training for CA Final students)
3. **CA Jobs** (Full-time career opportunities for Semi-Qualified and Qualified CAs)

---

### 4.2 Specialized Domains by Category

#### Articleship Domains:
- Statutory Audit & Assurance
- Internal Audit & Risk Advisory
- Direct Taxation & International Tax
- Indirect Taxation (GST & Customs)
- Transfer Pricing
- Corporate Law & Secretarial Compliance
- Accounting Advisory & Bookkeeping
- Management Consulting & M&A Support

#### Industrial Training Domains:
- Investment Banking
- Private Equity
- Venture Capital
- Equity Research
- Valuation & Financial Modeling
- Corporate Finance
- FP&A (Financial Planning & Analysis)
- Risk Management & Compliance
- Consulting & Strategy
- Treasury & Cash Management
- Finance & Corporate Accounts
- Direct & International Tax
- Internal Audit & Controls

#### CA Job Domains:
- Statutory Audit & Assurance
- Internal Audit & Risk Advisory
- Direct & International Tax
- Indirect Tax (GST)
- Finance & Accounting Leadership
- FP&A (Financial Planning & Analysis)
- Investment Banking & Deal Advisory
- Private Equity & Venture Capital
- Valuation & Due Diligence
- Corporate Finance & Treasury
- Management Consulting

---

### 4.3 Search & Filter Dimensions

To ensure lightning-fast candidate-job matching, the platform supports the following filters:

| Filter Attribute | Supported Options / Logic | Applicable Categories |
| :--- | :--- | :--- |
| **City / Location** | Mumbai, Delhi NCR, Bengaluru, Chennai, Kolkata, Pune, Hyderabad, Ahmedabad, Jaipur, Tier-2/3 Pan India | All Categories |
| **Domain** | Pre-populated category domains (as listed above) | All Categories |
| **Work Mode** | On-site, Hybrid, Remote | All Categories |
| **Groups Cleared** | Both Groups, Group 1 Only, Group 2 Only, Single Group Remaining | Articleship & Industrial Training |
| **Attempt Count** | First Attempt, 2 Attempts, 3+ Attempts | Articleship & Industrial Training |
| **Firm Type** | Big 4 / Big 6, Top 20 National Firm, Mid-sized CA Firm (3-10 Partners), Boutique / Sole Proprietor, Corporate / MNC | Articleship |
| **Monthly Stipend / CTC** | Range sliders or brackets (e.g. ₹5,000–₹10,000 / ₹10,000–₹20,000 / ₹20,000+ for training; CTC in LPA for Jobs) | All Categories |
| **Verification Badge** | CA Setu Verified Only (Default on) | All Categories |

---

## 5. Functional Requirements by Module

### 5.1 Public Experience (Unauthenticated Users)
- **FR-PUB-01 (Homepage):** Clean hero banner with quick search bar (Domain + City), category pills (Articleship, Industrial Training, CA Jobs), featured verified firms, and real-time statistics (Active Vacancies, Verified Firms, Placed Candidates).
- **FR-PUB-02 (Category Feeds):** Dedicated SEO-friendly routes (`/articleship`, `/industrial-training`, `/ca-jobs`) with multi-facet sidebar filtering.
- **FR-PUB-03 (Job Details Page):** Detailed vacancy view displaying firm overview, role description, stipend/salary, eligibility requirements, location map tag, and firm verification status.
- **FR-PUB-04 (Public Directory of Firms):** Browse verified CA firms and corporate hiring partners at `/companies` and `/companies/:id`.
- **FR-PUB-05 (Authentication):** Unified registration and login modals/pages with distinct role selection (**Student** vs **Employer**).

---

### 5.2 Student Portal Module
- **FR-STU-01 (Profile Creation):** Standardized resume-builder capture:
  - Personal Information (Name, Phone, Email, City).
  - ICAI Student Details (Student Registration Number - SRN/WRO/NRO/CRO/ERO, CA Inter / Final status, Groups cleared, Passing month/year, Attempt count).
  - Education (Graduation, 10th, 12th marks).
  - Technical Skills (Tally Prime, SAP, Advanced Excel, PowerBI, Zoho Books).
  - Resume PDF upload (Stored securely in cloud storage).
- **FR-STU-02 (Save Jobs):** One-click bookmarking of vacancies to `/student/saved-jobs`.
- **FR-STU-03 (Apply with One Click):** Instant application using pre-built profile and uploaded resume, with optional short cover note.
- **FR-STU-04 (Application Tracker):** Dedicated visual tracker at `/student/applications` displaying timeline status for every applied job:
  - `Applied` → `Under Review` → `Shortlisted` → `Interview` → `Selected` / `Rejected`.
- **FR-STU-05 (Anti-Duplicate Check):** Immediate UI feedback preventing multiple submissions to the same active job post.

---

### 5.3 Employer Portal Module
- **FR-EMP-01 (Company Registration & Verification):** Form to submit Firm/Company details:
  - Legal Entity Type (Sole Proprietorship, Partnership Firm, LLP, Private Limited, Public Limited).
  - ICAI Firm Registration Number (FRN) or Corporate CIN.
  - Head Office Address, Partner details, and official website/domain email.
  - Upload of ICAI Constitution Certificate or Corporate Incorporation Certificate for verification.
- **FR-EMP-02 (Job Posting Engine):** Structured job creation form enforcing mandatory fields:
  - Title, Category, Domain, City, Work Mode, Stipend/CTC range, Vacancy count, Eligibility criteria.
  - Save as `Draft` or submit as `Pending Review`.
- **FR-EMP-03 (Applicant Management Dashboard):** Filterable list of all applicants for each job:
  - View summary cards (Groups cleared, attempts, location, skills).
  - Preview/download candidate resume PDF.
  - One-click status updates (`Under Review`, `Shortlisted`, `Interview`, `Selected`, `Rejected`).
  - Add internal private notes regarding candidate performance.

---

### 5.4 Admin Operations Module
- **FR-ADM-01 (Verification Center):** Dedicated queue of newly registered firms:
  - Inspect uploaded FRN/CIN documents.
  - Action: Approve (grants "CA Setu Verified" badge and posting rights) or Reject (with rejection comments).
- **FR-ADM-02 (Job Moderation Queue):** Review pending job listings to ensure no discriminatory criteria, spam text, or sub-minimum stipend violations exist before setting status to `Published`.
- **FR-ADM-03 (Platform Governance):** Ability to ban spam users, pause suspicious job posts, and view reported listings at `/admin/reports`.
- **FR-ADM-04 (Analytics & Metrics):** Real-time counter of total users, active listings, application throughput, and placement conversions.

---

## 6. Non-Functional Requirements (NFRs)

### 6.1 Data Privacy & Security
- **Student Contact Protection:** Students' phone numbers and email addresses are masked from public view. Only verified employers whose jobs the student has explicitly applied to can view contact details.
- **Encryption:** Passwords hashed with salted bcrypt (cost factor 10+). API communications strictly over HTTPS (SSL/TLS).
- **Session Security:** Short-lived JSON Web Tokens (JWT) stored in secure HTTP-only cookies to prevent unauthorized access.

### 6.2 Performance & Responsiveness
- **Page Load Budget:** Search result pages must render within 1.5 seconds on standard 4G broadband connections.
- **Mobile First UX:** Over 70% of CA students browse postings on mobile phones; all layouts must be 100% responsive across mobile, tablet, and desktop viewports.

### 6.3 Auditability & Compliance
- **Audit Trails:** Every status transition of an application or firm verification logs timestamp and actor ID for accountability.
- **ICAI Regulation Alignment:** Warning banners remind students of ICAI transfer norms (Regulation 56) and maximum allowable industrial training tenure.
