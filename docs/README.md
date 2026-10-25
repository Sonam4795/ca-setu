# CA Setu — Version 0: Product Architecture & Planning Master Guide

Welcome to the central product blueprint for **CA Setu**, a specialized digital career marketplace tailored exclusively for the Chartered Accountancy (CA) ecosystem in India.

This repository directory contains the comprehensive **Version 0 (V0) Software Development Life Cycle (SDLC) documentation**. It serves as the single source of truth for the Product Owner, future UI/UX designers, and software engineers.

---

## 1. Project Overview

The CA career pipeline in India (Articleship, Industrial Training, and Post-Qualification employment) is historically fragmented, relying on informal WhatsApp groups, LinkedIn cold messaging, and word-of-mouth references. 

**CA Setu** replaces this chaos with a structured, verified, and specialized platform that understands:
- ICAI regulations (2-year articleship, eligibility criteria, groups cleared, attempt counts).
- Specialized finance domains (Statutory Audit, Direct/Indirect Tax, FP&A, Investment Banking, M&A Valuation, etc.).
- Firm structures (Sole Proprietorships, Mid-sized CA firms, Top 20 firms, Big 4 / Big 6 networks, and Corporates).

---

## 2. SDLC Roadmap (Where We Stand)

In software development, building directly without thorough planning is equivalent to filing a tax audit report without maintaining books of accounts. We follow a strict 8-stage **Software Development Life Cycle (SDLC)**:

| Stage | Phase Name | Focus Area | Status |
| :--- | :--- | :--- | :--- |
| **V0** | **Requirement Analysis & Product Planning** | Defining business rules, user journeys, data structure, and technical scope. | **CURRENT PHASE** |
| **V1** | **UI/UX Design** | Wireframes, user interface screens, design systems, and responsive layout mockups. | Upcoming Next |
| **V2** | **Frontend Development** | Building the client-facing website & dashboards using React.js. | Future Stage |
| **V3** | **Backend Development** | Building business logic, security controls, and APIs using Node.js & Express. | Future Stage |
| **V4** | **Database & Integration** | Connecting React (Frontend) to MongoDB via Express/Node (Backend). | Future Stage |
| **V5** | **Testing & Quality Assurance** | Verification of rules, security audit, bug fixing, and user acceptance testing. | Future Stage |
| **V6** | **Deployment & Launch** | Hosting on cloud servers, domain configuration, and public rollout. | Future Stage |
| **V7** | **Improvements & Post-Launch Support**| Ongoing maintenance, user feedback loops, feature expansions. | Future Stage |

> [!IMPORTANT]
> In accordance with Version 0 rules: **No production application code, database clusters, or complex dependencies are written during this stage.** All efforts are strictly concentrated on clear, unambiguous product planning.

---

## 3. Documentation Map

The V0 deliverables are modularized into 7 dedicated blueprints inside this `/docs` folder:

| Document File | Purpose & Contents | Primary Audience |
| :--- | :--- | :--- |
| [product-requirements.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/product-requirements.md) | **Product Requirements Document (PRD):** Core vision, problem statement, user personas, category definitions, domain taxonomies, and functional requirements. | Product Owner, Designers, Developers |
| [user-flows.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/user-flows.md) | **User Journeys & Process Maps:** Visual step-by-step navigation flows for Students, Employers, and Admins from landing to final action. | UI/UX Designers, Frontend Developers |
| [database-plan.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/database-plan.md) | **Data Architecture & Collections:** 11 database registers (collections), field types, unique identifiers, and relational links explained simply. | Backend Developers, Database Architects |
| [business-rules.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/business-rules.md) | **Platform Compliance & Logic Rules:** Permissions matrix, job and application lifecycle states, anti-spam protections, and verification guardrails. | Backend Developers, QA Testers |
| [technical-architecture.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/technical-architecture.md) | **System Engineering Blueprint:** Plain-English explanation of MERN stack, client-server communication, security protocols, and cloud storage. | Full-Stack Developers, Devops Engineers |
| [mvp-scope.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/mvp-scope.md) | **Minimum Viable Product (MVP) Boundaries:** Clear demarcation of what is included in the initial launch versus deferred features. | Product Owner, Project Manager |
| [future-roadmap.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/future-roadmap.md) | **Strategic Vision (Phases 2 to 4):** Post-launch expansion including monetization models, community features, mentorship, and ecosystem tools. | Product Owner, Investors, Founders |

---

## 4. Commerce & Finance Friendly Technical Glossary

For non-programmers from an accounting or CA background, technology terms often sound like impenetrable jargon. Here is a handy translation table using accounting and auditing analogies:

| Technical Term | Meaning in Plain English | Accounting / CA Analogy |
| :--- | :--- | :--- |
| **Frontend (React.js)** | The visible user interface—buttons, forms, cards, and pages you see on your computer or mobile screen. | **The Branch Office / Reception Counter** where clients enter, fill out challans/forms, and see marketing brochures. |
| **Backend (Node.js & Express)** | The server engine running behind the scenes that processes data, checks rules, calculates outputs, and enforces security. | **The Back-Office Compliance & Audit Department** that verifies whether vouchers are valid before approving transactions. |
| **Database (MongoDB)** | The digital filing storage system where all records (users, profiles, jobs, applications) are permanently stored. | **The Central Filing Vault / Master Books of Accounts** where all registers and general ledgers are safeguarded. |
| **Collection (MongoDB)** | A specific table or group of related records within the database (e.g., `users`, `jobs`). | **An Individual Register / Sub-Ledger** (e.g., Debtors Register, Fixed Assets Register, Payroll Sheet). |
| **Document (in MongoDB)** | A single row or record inside a collection (e.g., one student's profile or one job vacancy). | **A Single Voucher or Journal Entry** containing distinct field lines. |
| **Schema** | The blueprint or standard format that defines what fields every document must have (e.g., name, email, FRN number). | **Standard Accounting Voucher Format / Mandatory Disclosure Checklist** specifying mandatory vs optional entries. |
| **API (Application Programming Interface)** | A secure messenger gateway that allows the frontend (screen) to request or submit information to the backend server. | **The Bank Clearing House / RTGS Gateway** that takes an instruction, validates credentials, and safely executes the transfer. |
| **MERN Stack** | An acronym for MongoDB (Data), Express.js (Server routing), React.js (User screen), and Node.js (Server engine). | **The ERP Suite (like SAP or Tally Prime)** where every department is integrated under one standard technology family. |
| **Authentication & Auth Token (JWT)** | Verifying identity through login credentials, and issuing a time-limited digital pass. | **A Signed Visitor Gate-Pass or Digital Signature Certificate (DSC)** that proves who you are without re-entering passwords on every page. |
| **RBAC (Role-Based Access Control)** | Restricting screen and data access depending on whether the user is a Student, Employer, or Admin. | **Internal Control & Segregation of Duties (SoD)** ensuring an articleship student cannot approve journal vouchers in the partner's cabin. |

---

## 5. Next Steps for Version 1 (UI/UX)

Once the Product Owner reviews and signs off on this Version 0 documentation package:
1. Proceed to **V1: UI/UX Wireframing & Prototyping** (Designing low-fidelity and high-fidelity screen layouts in Figma).
2. Validate responsive mobile and desktop screen mockups against the user flows specified in [user-flows.md](file:///C:/Users/Admin/.gemini/antigravity/scratch/ca-setu/docs/user-flows.md).
3. Finalize visual branding (typography, brand colors, badge icons for verified firms).
