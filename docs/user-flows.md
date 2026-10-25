# User Flows & System Interaction Blueprints — CA Setu

**Document Version:** 1.0 (V0 Planning)  
**Product Stage:** V0 — Requirement Analysis & Product Planning  

This document visualizes the exact step-by-step pathways for the three primary user roles: **Student**, **Employer**, and **Admin**, including normal paths and critical exception flows.

---

## 1. Student User Flows

### 1.1 Complete End-to-End Student Journey

The journey begins from public discovery to application tracking and eventual selection:

```mermaid
flowchart TD
    Start(["1. Student Lands on CA Setu"]) --> Browse["2. Browse Categories or Enter Search Keyword"]
    Browse --> ApplyFilters["3. Filter by City, Domain, Groups Cleared, Stipend, Firm Type"]
    ApplyFilters --> JobDetails["4. Open Job Details Page (/jobs/:id)"]
    
    JobDetails --> AuthCheck{"Is Student Logged In?"}
    
    AuthCheck -- No --> AuthModal["5a. Prompt Login / Register (Role: Student)"]
    AuthModal --> ProfileCheck{"Is Profile & Resume Complete?"}
    
    AuthCheck -- Yes --> ProfileCheck
    
    ProfileCheck -- No --> CompleteProfile["5b. Redirect to /student/profile (Add ICAI details & upload Resume PDF)"]
    CompleteProfile --> ReturnToJob["5c. Return to Job Details Page"]
    
    ProfileCheck -- Yes --> ReturnToJob
    ReturnToJob --> DuplicateCheck{"Has Already Applied?"}
    
    DuplicateCheck -- Yes --> ShowAppliedBtn["Show 'Already Applied' Badge (Disabled)"]
    DuplicateCheck -- No --> ClickApply["6. Click 'Apply Now' Button"]
    
    ClickApply --> CoverNoteModal["7. Optional Cover Note Modal & Confirmation"]
    CoverNoteModal --> SubmitApp["8. Application Created (Status: Applied)"]
    
    SubmitApp --> AppDashboard["9. Track Application at /student/applications"]
    AppDashboard --> StatusUpdates["10. Receive Live Status Updates (Under Review -> Shortlisted -> Interview -> Selected)"]
```

---

### 1.2 Student Saved Jobs Flow

Students frequently research multiple openings before submitting applications:

```mermaid
flowchart LR
    JobCard["View Job Card or Detail"] --> ClickSave["Click 'Bookmark / Save'"]
    ClickSave --> CheckLogin{"Logged In?"}
    CheckLogin -- No --> PromptLogin["Prompt Sign In"]
    CheckLogin -- Yes --> SaveRecord["Save to /student/saved-jobs"]
    SaveRecord --> Notification["Toast Alert: 'Saved to your bookmarks'"]
```

---

## 2. Employer User Flows

### 2.1 Complete Employer Onboarding & Hiring Lifecycle

Employers must be verified before their listings are visible to students:

```mermaid
flowchart TD
    EmpStart(["1. Employer Enters CA Setu"]) --> EmpReg["2. Register at /register (Role: Employer)"]
    EmpReg --> CreateCompany["3. Complete Company Profile (/employer/company)"]
    CreateCompany --> UploadDocs["4. Enter FRN/CIN & Upload Certificate"]
    UploadDocs --> SubmitVerification["5. Submit Profile for CA Setu Verification"]
    
    SubmitVerification --> AdminQueue[/"Admin Verification Queue"\]
    
    AdminQueue --> VerificationDecision{"Admin Verification Decision"}
    VerificationDecision -- Rejected --> FixProfile["Notify Employer with Reason (Re-upload/Correct details)"]
    FixProfile --> SubmitVerification
    
    VerificationDecision -- Approved --> VerifiedBadge["Employer Profile Verified (Badge Awarded)"]
    VerifiedBadge --> PostJob["6. Create New Job Post (/employer/post-job)"]
    
    PostJob --> JobModeration{"Admin Moderation Policy"}
    JobModeration -- Requires Review --> AdminJobQueue[/"Admin Job Approval Queue"\]
    AdminJobQueue --> JobApproved["7. Job Status: Published"]
    JobModeration -- Auto Publish for Trusted --> JobApproved
    
    JobApproved --> ReceiveApplicants["8. Applications Flow into /employer/applicants"]
    ReceiveApplicants --> ReviewProfile["9. Review Student ICAI details & Resume PDF"]
    
    ReviewProfile --> ActionDecision{"Employer Action"}
    ActionDecision -- Not Fit --> RejectStatus["Mark as 'Rejected'"]
    ActionDecision -- Fit --> ShortlistStatus["Mark as 'Shortlisted'"]
    ShortlistStatus --> InterviewSchedule["Mark as 'Interview' (Provide date/link)"]
    InterviewSchedule --> OfferFinal["Mark as 'Selected'"]
```

---

## 3. Administrator Governance Flows

The platform Admin ensures trust, data validity, and safety across the ecosystem:

```mermaid
flowchart TD
    AdminLogin(["Admin Login (/login)"]) --> AdminDashboard["Admin Control Center (/admin/dashboard)"]
    
    AdminDashboard --> ActionHub{"Select Moderation Stream"}
    
    ActionHub -- Firm KYC --> FirmQueue["1. Review Firm Registrations (/admin/companies)"]
    FirmQueue --> InspectDocs["Inspect FRN, Partner Name, ICAI Certificate"]
    InspectDocs --> FirmDecision{"Decision"}
    FirmDecision -- Approve --> MarkFirmVerified["Set verified = true (Notify Employer)"]
    FirmDecision -- Reject --> MarkFirmRejected["Set verified = false (Provide rejection note)"]
    
    ActionHub -- Job Moderation --> JobQueue["2. Review Job Postings (/admin/jobs)"]
    JobQueue --> InspectJob["Inspect Stipend, Description, Anti-Spam Guidelines"]
    JobQueue --> JobDecision{"Decision"}
    JobDecision -- Approve --> PublishJob["Set status = 'Published'"]
    JobDecision -- Reject --> RejectJob["Set status = 'Rejected' (Notify Employer)"]
    
    ActionHub -- Platform Safety --> ReportsQueue["3. View Reported Jobs/Users (/admin/reports)"]
    ReportsQueue --> TakeAction["Warning / Suspend Listing / Ban Account"]
```

---

## 4. Exception & Edge Case Workflows

Handling edge cases cleanly prevents user frustration and system errors:

| Edge Case Scenario | Trigger Condition | System Behavior & User Experience |
| :--- | :--- | :--- |
| **Unverified Employer attempts to post a job** | Employer tries to access `/employer/post-job` while `isVerified == false`. | Job posting form allows drafting, but publishing button is locked with message: *"Your firm verification is currently in progress. You can save drafts, but listings will go live once verified by Admin."* |
| **Student attempts duplicate application** | Student clicks "Apply Now" on a job they previously applied to. | Frontend displays disabled button labeled **"Applied on [Date]"**. Backend API rejects any repeated POST with HTTP `409 Conflict`. |
| **Student applies with incomplete profile** | Student clicks "Apply", but `studentProfile` lacks resume PDF or ICAI Registration Number. | Intercepted with a modal: *"Please complete your CA details and upload your resume before applying."* with a one-click redirect to `/student/profile`. |
| **Job expires or closes while student is applying** | Employer changes job status to `Closed` or deadline elapses while student has the page open. | When student hits "Submit Application", system validates job status. Displays: *"This vacancy has just been closed by the employer and is no longer accepting submissions."* |
| **Guest bookmarks a job** | Non-logged-in user clicks the "Bookmark" icon on a job card. | Saves the job ID to local storage temporarily and redirects to `/login?redirect=/jobs/:id`. Upon successful login, syncs bookmark to database. |
| **Firm Registration Number (FRN) duplicate check** | An employer tries to register with an FRN that already exists in the system. | System alerts: *"This ICAI Firm Registration Number is already registered. If you are an authorized partner, contact support@casetu.com."* |
