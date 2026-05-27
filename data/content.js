/**
 * =============================================================================
 * content.js — Single Source of Truth for All Editable Text
 * =============================================================================
 * QA Onboarding Training Platform
 *
 * PURPOSE:
 * Provides a central configuration object for all text labels, messages, and
 * course metadata. This allows Admins to customize the platform terminology
 * and templates without modifying the core logic.
 *
 * HOW TO USE:
 * call loadContent() to get the current configuration (merged with any local
 * Admin overrides).
 *
 * READS FROM:   localStorage ('qa_content')
 * WRITES TO:    localStorage ('qa_content')
 * =============================================================================
 */

// ── SECTION 0: COURSE DEFINITIONS ─────────────────────────────────────────────
// These are the built-in course structures shipped with the platform.
// Each course contains modules, sub-modules, and quiz references.
// Courses are seeded into IndexedDB on first access by db.js seedCourses().
// Admin can add, remove, or reorder courses here — no code changes needed.
//
// SCHEMA:
// {
//   courseId:      string — Unique identifier. Lowercase, hyphens. e.g. 'agile-scrum-dev'
//   title:         string — Display name shown on course cards and headers
//   description:   string — Short summary shown on the course catalog card
//   imageSvg:      string — SVG markup for the course icon (keep small, no external refs)
//   passingScore:  number — Percentage required to earn certificate (e.g. 80)
//   category:      string — Grouping label for the catalog: 'Development', 'QA', etc.
//   isActive:      bool   — false hides the course from the catalog without deleting it
//   modules:       Array  — Ordered list of modules
//     each module: {
//       moduleId:      string — Unique within this course. e.g. 'mod-1'
//       title:         string — Module name displayed in the module list
//       order:         number — Display order (1-based, for sorting)
//       subModules:    Array  — Ordered list of sub-modules within this module
//         each subModule: {
//           subModuleId:    string — Unique within this course. e.g. 'mod-1-1'
//           title:          string — Sub-module name
//           order:          number — Display order within the module
//           type:           string — 'reading' | 'quiz' | 'exercise' | 'final-exam'
//           estimatedMins:  number — Rough time estimate for the student
//         }
//       quiz: { questionCount, passingScore } — optional, for module quiz
//     }
// }

const COURSE_DEFINITIONS = [

  // ── QA Onboarding Training ─────────────────────────────────────────────────
  // This course delivers lessons via the new course-view.html with modules.
  // Text-based lessons (1, 2, 5) have content in COURSE_CONTENT.
  // Interactive lab lessons (3, 4) will launch standalone HTML mock UIs.
  // isLegacy remains true until all old lesson files are fully deprecated.
  {
    courseId: 'qa-onboarding',
    title: 'QA Onboarding Training',
    description: 'Learn QA fundamentals: testing methodology, bug reporting, CRM tools, Azure DevOps, and test planning. Includes a hands-on capstone assessment.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#2563eb"/><path d="M14 24L20 30L34 16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="10" stroke="white" stroke-width="2" fill="none" opacity="0.3"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'QA',
    isActive: false, // Deactivated — content now covered by Fundamentals courses (acceptance-criteria-basics, dynamics-crm-basics, ado-bug-reports)
    isLegacy: true,

    modules: [

      // ── MODULE 1: Testing 101 ────────────────────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'Testing 101',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview', order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'What Is Software Testing?',     order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-1-2', title: 'Agile and Where You Fit',       order: 2, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-1-3', title: 'Types of Testing',              order: 3, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-1-4', title: 'The Bug Lifecycle',             order: 4, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-1-5', title: 'Writing Test Cases',            order: 5, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',              order: 6, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 2: Acceptance Criteria ────────────────────────────────────
      {
        moduleId: 'mod-2',
        title: 'Acceptance Criteria',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview', order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'What Are Acceptance Criteria?',   order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-2-2', title: 'The Given/When/Then Format',      order: 2, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-2-3', title: 'Reading and Interpreting AC',     order: 3, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-2-4', title: 'When AC Is Missing',              order: 4, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-2-5', title: 'Referencing AC in Bug Reports',   order: 5, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                order: 6, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 3: Dynamics 365 CRM (Reading + Interactive Lab) ───────────
      {
        moduleId: 'mod-3',
        title: 'Dynamics 365 CRM',
        order: 3,
        subModules: [
          { subModuleId: 'mod-3-overview', title: 'Module 3 Overview', order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-3-1', title: 'What is Dynamics 365?',                    order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-3-2', title: 'Understanding Cases in Dynamics 365',      order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-3-3', title: 'Role-Based Testing in Dynamics',           order: 3, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-3-4', title: 'CRM Interactive Lab',                      order: 4, type: 'reading', estimatedMins: 20 },
          { subModuleId: 'quiz-mod-3', title: 'Module 3 Quiz',                         order: 5, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 4: Azure DevOps (Reading + Interactive Lab) ──────────────
      {
        moduleId: 'mod-4',
        title: 'Azure DevOps',
        order: 4,
        subModules: [
          { subModuleId: 'mod-4-overview', title: 'Module 4 Overview', order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-4-1', title: 'What is Azure DevOps?',            order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-4-2', title: 'Anatomy of a Bug Report',           order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-4-3', title: 'The Bug Lifecycle',                 order: 3, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-4-4', title: 'Azure DevOps Interactive Lab',      order: 4, type: 'reading', estimatedMins: 20 },
          { subModuleId: 'quiz-mod-4', title: 'Module 4 Quiz',                  order: 5, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 5: Test Planning & Bug Triage ─────────────────────────────
      {
        moduleId: 'mod-5',
        title: 'Test Planning & Bug Triage',
        order: 5,
        subModules: [
          { subModuleId: 'mod-5-overview', title: 'Module 5 Overview', order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-5-1', title: 'Exploratory vs Planned Testing', order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-5-2', title: 'Anatomy of a Test Case',         order: 2, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-5-3', title: 'Severity & Triage',              order: 3, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-5-4', title: 'Traceability & ACs',             order: 4, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-5-5', title: 'Final Checklist',                order: 5, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'quiz-mod-5', title: 'Module 5 Quiz',               order: 6, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 3, passingScore: 80 },
      },

      // ── MODULE 6: Capstone Assessment ────────────────────────────────────
      {
        moduleId: 'mod-capstone',
        title: 'Capstone Assessment',
        order: 6,
        subModules: [
          { subModuleId: 'capstone-overview', title: 'Capstone Overview', order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'capstone', title: 'Full Scenario Assessment', order: 1, type: 'exercise', estimatedMins: 45 },
        ],
      },
    ],
  },

  // ── NEW COURSE: Agile & Scrum for Developers ──────────────────────────────
  {
    courseId: 'agile-scrum-dev',
    title: 'Agile & Scrum for Developers',
    description: 'A comprehensive course covering Agile principles, the Scrum framework, roles, events, artifacts, and practical application for software developers.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#ea580c"/><circle cx="24" cy="24" r="14" stroke="white" stroke-width="2.5" fill="none"/><path d="M24 14v10l7 4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Development',
    isActive: false, // Deactivated — developer-focused, not part of QA onboarding curriculum
    isLegacy: false,

    // ── MODULE 1: Introduction to Agile and Scrum ──────────────────────────
    modules: [
      {
        moduleId: 'mod-1',
        title: 'Introduction to Agile and Scrum',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',            order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'Overview of Agile Development',      order: 1, type: 'reading', estimatedMins: 15 },
          { subModuleId: 'mod-1-2', title: 'Introduction to Scrum',              order: 2, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-1-3', title: 'Agile vs. Traditional Development',  order: 3, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-1-4', title: 'Agile Mindset',                      order: 4, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-5', title: 'Case Studies and Examples',          order: 5, type: 'reading', estimatedMins: 15 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                  order: 6, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 8, passingScore: 80 },
      },

      // ── MODULE 2: Agile Development Practices ────────────────────────────
      {
        moduleId: 'mod-2',
        title: 'Agile Development Practices',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'Introduction to Agile Practices',  order: 1, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-2-2', title: 'Scrum Framework',                  order: 2, type: 'reading', estimatedMins: 15 },
          { subModuleId: 'mod-2-3', title: 'Kanban Methodology',               order: 3, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                order: 4, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 6, passingScore: 80 },
      },

      // ── MODULE 3: Scrum Roles and Responsibilities ───────────────────────
      {
        moduleId: 'mod-3',
        title: 'Scrum Roles and Responsibilities',
        order: 3,
        subModules: [
          { subModuleId: 'mod-3-overview', title: 'Module 3 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-3-1', title: 'Product Owner',                    order: 1, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-3-2', title: 'Scrum Master',                     order: 2, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-3-3', title: 'Development Team',                 order: 3, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-3-4', title: 'Stakeholders',                     order: 4, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-3', title: 'Module 3 Quiz',                order: 5, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 8, passingScore: 80 },
      },

      // ── MODULE 4: Scrum Events and Artifacts ─────────────────────────────
      {
        moduleId: 'mod-4',
        title: 'Scrum Events and Artifacts',
        order: 4,
        subModules: [
          { subModuleId: 'mod-4-overview', title: 'Module 4 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-4-1', title: 'The Sprint',                        order: 1, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-4-2', title: 'Sprint Planning',                  order: 2, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-4-3', title: 'Daily Scrum',                       order: 3, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-4-4', title: 'Sprint Review',                     order: 4, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-4-5', title: 'Sprint Retrospective',             order: 5, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-4-6', title: 'Product Backlog',                   order: 6, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-4-7', title: 'Sprint Backlog',                   order: 7, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-4-8', title: 'Increment & Definition of Done',    order: 8, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'quiz-mod-4', title: 'Module 4 Quiz',                order: 9, type: 'quiz',    estimatedMins: 10 },
        ],
        quiz: { questionCount: 10, passingScore: 80 },
      },

      // ── MODULE 5: Agile Testing and Continuous Integration ───────────────
      {
        moduleId: 'mod-5',
        title: 'Agile Testing and Continuous Integration',
        order: 5,
        subModules: [
          { subModuleId: 'mod-5-overview', title: 'Module 5 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-5-1', title: 'Agile Testing Quadrants',           order: 1, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-5-2', title: 'Test-Driven Development (TDD)',     order: 2, type: 'reading', estimatedMins: 15 },
          { subModuleId: 'mod-5-3', title: 'Continuous Integration Pipeline',   order: 3, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-5-4', title: 'Automated vs. Manual Testing',      order: 4, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'quiz-mod-5', title: 'Module 5 Quiz',                order: 5, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 6, passingScore: 80 },
      },

      // ── MODULE 6: Scaling Agile ──────────────────────────────────────────
      {
        moduleId: 'mod-6',
        title: 'Scaling Agile',
        order: 6,
        subModules: [
          { subModuleId: 'mod-6-overview', title: 'Module 6 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-6-1', title: 'Scrum of Scrums',                   order: 1, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-6-2', title: 'SAFe (Scaled Agile Framework)',     order: 2, type: 'reading', estimatedMins: 15 },
          { subModuleId: 'mod-6-3', title: 'LeSS (Large-Scale Scrum)',          order: 3, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-6-4', title: 'When to Scale',                     order: 4, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-6', title: 'Module 6 Quiz',                order: 5, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 6, passingScore: 80 },
      },

      // ── MODULE 7: Agile Metrics and Monitoring Progress ──────────────────
      {
        moduleId: 'mod-7',
        title: 'Agile Metrics and Monitoring Progress',
        order: 7,
        subModules: [
          { subModuleId: 'mod-7-overview', title: 'Module 7 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-7-1', title: 'Velocity',                          order: 1, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-7-2', title: 'Burndown / Burnup Charts',          order: 2, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-7-3', title: 'Cycle Time & Lead Time',            order: 3, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-7-4', title: 'Cumulative Flow Diagrams',          order: 4, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'quiz-mod-7', title: 'Module 7 Quiz',                order: 5, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 6, passingScore: 80 },
      },

      // ── MODULE 8: Advanced Topics in Agile ───────────────────────────────
      {
        moduleId: 'mod-8',
        title: 'Advanced Topics in Agile',
        order: 8,
        subModules: [
          { subModuleId: 'mod-8-overview', title: 'Module 8 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-8-1', title: 'Agile Contracts and Governance',    order: 1, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-8-2', title: 'Distributed Teams in Agile',        order: 2, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'mod-8-3', title: 'Agile in Non-Software Contexts',    order: 3, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-8-4', title: 'DevOps and Agile',                  order: 4, type: 'reading', estimatedMins: 12 },
          { subModuleId: 'quiz-mod-8', title: 'Module 8 Quiz',                order: 5, type: 'quiz',    estimatedMins: 8 },
        ],
        quiz: { questionCount: 6, passingScore: 80 },
      },

      // ── MODULE 9: Case Studies and Practical Application ─────────────────
      {
        moduleId: 'mod-9',
        title: 'Case Studies and Practical Application',
        order: 9,
        subModules: [
          { subModuleId: 'mod-9-overview', title: 'Module 9 Overview',           order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-9-1', title: 'End-to-End Scrum Simulation',        order: 1, type: 'exercise', estimatedMins: 20 },
          { subModuleId: 'mod-9-2', title: 'Sprint Retrospective Exercise',      order: 2, type: 'exercise', estimatedMins: 15 },
          { subModuleId: 'mod-9-3', title: 'Backlog Refinement Workshop',        order: 3, type: 'exercise', estimatedMins: 15 },
          { subModuleId: 'final-exam', title: 'Final Exam',                      order: 4, type: 'final-exam', estimatedMins: 30 },
        ],
        quiz: { questionCount: 20, passingScore: 80, isFinalExam: true },
      },
    ],
  },

   // ── QA Onboarding — Advanced ────────────────────────────────────────────────
   // Deep-dive course for graduates of the base QA Onboarding program.
   // Covers real-world D365 testing scenarios, Azure DevOps mastery, and a
   // full end-to-end capstone that ties both platforms together.
   {
     courseId: 'qa-onboarding-advanced',
     title: 'QA Onboarding \u2014 Advanced',
     description: 'Deep-dive into Dynamics 365 testing, Azure DevOps mastery, and a full end-to-end capstone scenario that ties both platforms together. Prerequisite: QA Onboarding Training.',
     imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#b45309"/><path d="M14 24L20 30L34 16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="10" stroke="white" stroke-width="2" fill="none" opacity="0.3"/></svg>',
     passingScore: 80,
     passMode: 'audit',
      category: 'Scenarios',
      isActive: true,
      isLegacy: false,

     modules: [

        // ── MODULE 1: Deep D365 Testing ──────────────────────────────────────
        {
          moduleId: 'mod-1',
          title: 'Deep D365 Testing',
          order: 1,
          subModules: [
            { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',           order: 0, type: 'reading',  estimatedMins: 1 },
            { subModuleId: 'mod-1-1', title: 'Real-World D365 Workflows',          order: 1, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'mod-1-2', title: 'Edge Cases in D365',                  order: 2, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'mod-1-3', title: 'Test Data Setup Strategies',          order: 3, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'mod-1-4', title: 'Integration Testing with D365',       order: 4, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                   order: 5, type: 'quiz',     estimatedMins: 8 },
         ],
         quiz: { questionCount: 6, passingScore: 80 },
       },

        // ── MODULE 2: Azure DevOps Mastery ────────────────────────────────────
        {
          moduleId: 'mod-2',
          title: 'Azure DevOps Mastery',
          order: 2,
          subModules: [
            { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',           order: 0, type: 'reading',  estimatedMins: 1 },
            { subModuleId: 'mod-2-1', title: 'Writing Professional Bug Reports',    order: 1, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'mod-2-2', title: 'Test Plans and Suites in ADO',        order: 2, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'mod-2-3', title: 'Creating and Running Test Cases',     order: 3, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'mod-2-4', title: 'Linking ACs to Tests and Bugs',       order: 4, type: 'reading',  estimatedMins: 15 },
            { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                   order: 5, type: 'quiz',     estimatedMins: 8 },
         ],
         quiz: { questionCount: 6, passingScore: 80 },
       },

        // ── MODULE 3: Full Capstone ───────────────────────────────────────────
        {
          moduleId: 'mod-3',
          title: 'Full Capstone',
          order: 3,
          subModules: [
            { subModuleId: 'mod-3-overview', title: 'Module 3 Overview',          order: 0, type: 'reading',  estimatedMins: 1 },
            { subModuleId: 'capstone-advanced', title: 'End-to-End Assessment',   order: 1, type: 'exercise',  estimatedMins: 60 },
         ],
       },
     ],
   },

   // ── CAPSTONE 1: Beginner Capstone Assessment ─────────────────────────────
   {
     courseId: 'capstone-1',
title: 'Capstone 1: QA Investigation',
  description: 'Your first hands-on capstone assessment. Investigate a case in Dynamics 365 CRM, identify bugs that violate acceptance criteria, and file bug reports in Azure DevOps. Prerequisite: QA Onboarding Training.',
  imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#7c3aed"/><path d="M14 24L20 30L34 16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="10" stroke="white" stroke-width="2" fill="none" opacity="0.3"/></svg>',
  passingScore: 50,
  passMode: 'threshold',
  category: 'Scenarios',
  isActive: true,
  isLegacy: false,
  isCapstone: true,

  modules: [
       {
         moduleId: 'mod-1',
         title: 'Capstone 1 Assessment',
         order: 1,
         subModules: [
           { subModuleId: 'capstone-1-exercise', title: 'Capstone 1 Exercise', order: 1, type: 'exercise', estimatedMins: 45 },
         ],
       },
     ],
   },

   // ── CAPSTONE 2: Advanced Capstone Assessment ────────────────────────────────
   {
     courseId: 'capstone-2',
     title: 'Advanced Capstone 2',
     description: 'Validate the Customer Portal v2.1 release for Sprint 14. Practice finding bugs in login, password reset, and CRM case view before attempting the graded assessment. Prerequisite: Capstone 1.',
     imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#8b5cf6"/><path d="M14 24L20 30L34 16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="10" stroke="white" stroke-width="2" fill="none" opacity="0.3"/></svg>',
     passingScore: 80,
     passMode: 'threshold',
      category: 'Scenarios',
      isActive: true,
      isLegacy: false,
      isCapstone: true,

     modules: [
       {
         moduleId: 'mod-1',
         title: 'Capstone 2 Assessment',
         order: 1,
         subModules: [
           { subModuleId: 'capstone-2-exercise', title: 'Capstone 2 Exercise', order: 1, type: 'exercise', estimatedMins: 45 },
         ],
       },
     ],
    },

  // ── NEW COURSE: Introduction to Dynamics CRM ────────────────────────────
  {
    courseId: 'dynamics-crm-basics',
    title: 'Introduction to Dynamics CRM',
    description: 'Learn to navigate Microsoft Dynamics 365 CRM: the case form layout, reading case data, status and priority fields, and working with the Business Process Flow.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0078d4"/><path d="M14 18h20v4H14zm0 8h20v4H14zm0 8h14v4H14z" fill="white" opacity="0.9"/><circle cx="38" cy="14" r="4" fill="#50e6ff"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Fundamentals',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: Navigating the Case Form ────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'Navigating the Case Form',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'The Dynamics Case Form Layout',     order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-2', title: 'Fields, Tabs and Sections',         order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-3', title: 'The Timeline and Notes',            order: 3, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                  order: 4, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 2: Reading Case Data ───────────────────────────────────
      {
        moduleId: 'mod-2',
        title: 'Reading Case Data',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'Understanding Case Status',         order: 1, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-2-2', title: 'Priority and Severity',             order: 2, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-2-3', title: 'Customer and Product Information',  order: 3, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                  order: 4, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 3: The Business Process Flow ───────────────────────────
      {
        moduleId: 'mod-3',
        title: 'The Business Process Flow',
        order: 3,
        subModules: [
          { subModuleId: 'mod-3-overview', title: 'Module 3 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-3-1', title: 'What is a BPF?',                    order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-3-2', title: 'Working Through Stages',            order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-3', title: 'Module 3 Quiz',                  order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },
    ],
  },

  // ── NEW COURSE: Azure DevOps — Bug Reports ──────────────────────────────
  {
    courseId: 'ado-bug-reports',
    title: 'Azure DevOps \u2014 Bug Reports',
    description: 'Master the anatomy of a bug report in Azure DevOps: writing clear repro steps, setting severity and priority, and avoiding common mistakes.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0078d4"/><circle cx="24" cy="20" r="8" stroke="white" stroke-width="2.5" fill="none"/><path d="M24 16v5l3 2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 36h16l-3-8H19l-3 8z" fill="white" opacity="0.8"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Fundamentals',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: Anatomy of a Bug Report ─────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'Anatomy of a Bug Report',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'The Bug Report Form',               order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-2', title: 'Title and Description',             order: 2, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-1-3', title: 'Expected vs Actual',                order: 3, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                  order: 4, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 2: Writing Great Repro Steps ───────────────────────────
      {
        moduleId: 'mod-2',
        title: 'Writing Great Repro Steps',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'The 3 Exactlys',                    order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-2-2', title: 'Common Repro Mistakes',             order: 2, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                  order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 3: Severity and Priority ───────────────────────────────
      {
        moduleId: 'mod-3',
        title: 'Severity and Priority',
        order: 3,
        subModules: [
          { subModuleId: 'mod-3-overview', title: 'Module 3 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-3-1', title: 'Severity Levels',                   order: 1, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-3-2', title: 'Priority vs Severity',              order: 2, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'quiz-mod-3', title: 'Module 3 Quiz',                  order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },
    ],
  },

  // ── NEW COURSE: Acceptance Criteria Fundamentals ────────────────────────
  {
    courseId: 'acceptance-criteria-basics',
    title: 'Acceptance Criteria Fundamentals',
    description: 'Learn what acceptance criteria are, how to write them in Given/When/Then format, and how to trace bugs back to violated ACs.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#107c10"/><path d="M14 16l8 8 12-12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 28l8 8 12-12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Fundamentals',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: What Are Acceptance Criteria? ───────────────────────
      {
        moduleId: 'mod-1',
        title: 'What Are Acceptance Criteria?',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'Definition and Purpose',            order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-2', title: 'Good vs Bad ACs',                   order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-3', title: 'Where ACs Live',                    order: 3, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                  order: 4, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 2: The Given/When/Then Format ──────────────────────────
      {
        moduleId: 'mod-2',
        title: 'The Given/When/Then Format',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'BDD-Style Criteria',                order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-2-2', title: 'Writing Your Own ACs',              order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                  order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 3: Tracing Bugs to ACs ─────────────────────────────────
      {
        moduleId: 'mod-3',
        title: 'Tracing Bugs to ACs',
        order: 3,
        subModules: [
          { subModuleId: 'mod-3-overview', title: 'Module 3 Overview',          order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-3-1', title: 'Why Traceability Matters',          order: 1, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-3-2', title: 'Referencing ACs in Bug Reports',    order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-3', title: 'Module 3 Quiz',                  order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },
    ],
  },

  // ── NEW COURSE: Microsoft Teams for QA ────────────────────────────────
  {
    courseId: 'teams-for-qa',
    title: 'Microsoft Teams for QA',
    description: 'Learn how QA professionals use Microsoft Teams for daily stand-ups, channel communication, reading briefing documents, and coordinating bug triage with developers.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#6264a7"/><path d="M14 16h12v4H14zm0 8h12v4H14zm0 8h12v4H14z" fill="white" opacity="0.9"/><circle cx="34" cy="16" r="5" fill="#50e6ff"/><path d="M32 18l2 2 4-4" stroke="#6264a7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Tools & Process',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: Navigating Teams ─────────────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'Navigating Teams',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'Channels and Threads',                   order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-1-2', title: 'Reading a QA Briefing',                  order: 2, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                       order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 2: Communicating in Stand-up ─────────────────────────────
      {
        moduleId: 'mod-2',
        title: 'Communicating in Stand-up',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'Giving a Stand-up Update',               order: 1, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'mod-2-2', title: 'Asking Good Questions',                  order: 2, type: 'reading', estimatedMins: 5 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                       order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },
    ],
  },

  // ── NEW COURSE: Agile & Scrum for QA ─────────────────────────────────
  {
    courseId: 'agile-scrum-qa',
    title: 'Agile & Scrum for QA',
    description: 'Learn Agile and Scrum from a QA perspective: sprint ceremonies, bug triage, acceptance criteria, and the testing mindset that makes Agile teams succeed.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#059669"/><circle cx="24" cy="24" r="14" stroke="white" stroke-width="2.5" fill="none"/><path d="M24 14v10l6 4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 30l6 4 6-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Tools & Process',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: Sprint Ceremonies for QA ────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'Sprint Ceremonies for QA',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'Sprint Planning',                        order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-2', title: 'Daily Stand-up',                         order: 2, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-1-3', title: 'Sprint Review & Retro',                  order: 3, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-1', title: 'Module 1 Quiz',                       order: 4, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 2: The QA Role in a Sprint ─────────────────────────────
      {
        moduleId: 'mod-2',
        title: 'The QA Role in a Sprint',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'Bug Triage',                             order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-2-2', title: 'Definition of Done',                     order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-2', title: 'Module 2 Quiz',                       order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 3: Acceptance Criteria in Practice ─────────────────────
      {
        moduleId: 'mod-3',
        title: 'Acceptance Criteria in Practice',
        order: 3,
        subModules: [
          { subModuleId: 'mod-3-overview', title: 'Module 3 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-3-1', title: 'Writing ACs with the Team',              order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-3-2', title: 'Demo-ing Against ACs',                   order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-3', title: 'Module 3 Quiz',                       order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },

      // ── MODULE 4: Agile Testing Mindset ────────────────────────────────
      {
        moduleId: 'mod-4',
        title: 'Agile Testing Mindset',
        order: 4,
        subModules: [
          { subModuleId: 'mod-4-overview', title: 'Module 4 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-4-1', title: 'Shift Left Testing',                     order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-4-2', title: 'Continuous Feedback',                    order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'quiz-mod-4', title: 'Module 4 Quiz',                       order: 3, type: 'quiz',    estimatedMins: 5 },
        ],
        quiz: { questionCount: 5, passingScore: 80 },
      },
    ],
  },

  // ── NEW COURSE: Scenario Deep Dive — Customer Portal ──────────────────
  {
    courseId: 'scenario-deep-dive',
    title: 'Scenario Deep Dive \u2014 Customer Portal',
    description: 'A guided walkthrough of a real-world QA scenario: investigate a customer portal access failure, trace it to its root cause, and file a complete bug report.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#dc2626"/><circle cx="22" cy="22" r="10" stroke="white" stroke-width="2.5" fill="none"/><path d="M30 30l6 6" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Scenarios',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: The Portal Access Failure ────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'The Portal Access Failure',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'The Briefing',                           order: 1, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-1-2', title: 'Examining the Case',                     order: 2, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-1-3', title: 'Finding the Defects',                    order: 3, type: 'reading', estimatedMins: 10 },
          { subModuleId: 'mod-1-4', title: 'Filing Your Report',                     order: 4, type: 'reading', estimatedMins: 8 },
        ],
      },
    ],
  },

  // ── NEW COURSE: End-to-End Bug Lifecycle ─────────────────────────────
  {
    courseId: 'bug-lifecycle',
    title: 'End-to-End Bug Lifecycle',
    description: 'Follow a bug from discovery through investigation, reporting, triage, and resolution. A practical scenario-based course for new QA team members.',
    imageSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#7c3aed"/><path d="M24 8v8m0 16v8" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M24 16l6 6H18l6-6zm0 18l-6-6h12l-6 6z" fill="white" opacity="0.7"/><circle cx="24" cy="24" r="3" fill="white"/></svg>',
    passingScore: 80,
    passMode: 'audit',
    category: 'Scenarios',
    isActive: true,
    isLegacy: false,

    modules: [

      // ── MODULE 1: Investigation Phase ──────────────────────────────────
      {
        moduleId: 'mod-1',
        title: 'Investigation Phase',
        order: 1,
        subModules: [
          { subModuleId: 'mod-1-overview', title: 'Module 1 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-1-1', title: 'Reading the Briefing',                   order: 1, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-1-2', title: 'Opening the Case',                       order: 2, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-1-3', title: 'Checking ACs',                           order: 3, type: 'reading', estimatedMins: 8 },
        ],
      },

      // ── MODULE 2: Reporting Phase ─────────────────────────────────────
      {
        moduleId: 'mod-2',
        title: 'Reporting Phase',
        order: 2,
        subModules: [
          { subModuleId: 'mod-2-overview', title: 'Module 2 Overview',              order: 0, type: 'reading', estimatedMins: 1 },
          { subModuleId: 'mod-2-1', title: 'Filing in ADO',                          order: 1, type: 'reading', estimatedMins: 8 },
          { subModuleId: 'mod-2-2', title: 'Communicating Findings',                 order: 2, type: 'reading', estimatedMins: 6 },
          { subModuleId: 'mod-2-3', title: 'Review and Submit',                      order: 3, type: 'reading', estimatedMins: 6 },
        ],
      },
    ],
  },
  ];



// ── SECTION 0B: COURSE CONTENT (Lesson Body HTML) ────────────────────────────
// This object stores the actual lesson content for each sub-module.
// Structure: COURSE_CONTENT[courseId][subModuleId] = HTML string
//
// Content is written in HTML and supports: <p>, <h2>, <h3>, <ul>, <ol>,
// <blockquote>, <pre>, <code>, and the .callout CSS classes from main.css.
//
// To add content for a new lesson, add an entry here using the subModuleId
// from COURSE_DEFINITIONS above. The course-view.html reads from this object
// automatically — no code changes needed.
//
// HOW TO WRITE LESSON CONTENT:
// - Use <h2> for major sections within a lesson
// - Use <h3> for subsections
// - Use <blockquote> for key takeaways or important quotes
// - Use <pre><code> for code examples
// - Use callout classes: class="callout tip", class="callout warn", class="callout good"
// - Keep paragraphs short and scannable
//
// EXAMPLE:
//   "agile-scrum-dev": {
//     "mod-1-1": "<h2>What is Agile?</h2><p>Agile is...</p>",
//   }

// ── INLINE SVG DIAGRAMS ──────────────────────────────────────────────────────
// Used in COURSE_CONTENT lesson HTML to add visual engagement.
// All SVGs are self-contained (no external refs) for file:// compatibility.
// Each includes <title> and <desc> for accessibility.

/**
 * SVG: Scrum Sprint Cycle
 * Circular flow of Sprint Planning → Daily Scrum → Sprint Review → Retro
 * with the Sprint (development work) at center. Arrows show the sequence.
 */
var SVG_SCRUM_CYCLE = '<div class="svg-diagram-wrapper" style="max-width:560px;margin:var(--space-5) auto;text-align:center;">' +
  '<svg viewBox="0 0 540 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Scrum Sprint Cycle</title>' +
    '<desc>The Scrum framework involves Sprint Planning at the start, Daily Scrum during the Sprint, Sprint Review at the end, and Sprint Retrospective after review, looping back to planning.</desc>' +
    /* ── Background ring ── */
    '<ellipse cx="270" cy="250" rx="200" ry="190" fill="none" stroke="#e2e6f0" stroke-width="2" stroke-dasharray="6,4"/>' +
    /* ── Connector arrows ── */
    '<g fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)">' +
      '<defs>' +
        '<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">' +
          '<path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8"/>' +
        '</marker>' +
      '</defs>' +
      /* Arrow: Planning → Daily Scrum (top to right) */
      '<path d="M345,105 Q420,150 420,210" />' +
      /* Arrow: Daily Scrum → Review (right to bottom) */
      '<path d="M420,290 Q420,360 345,395" />' +
      /* Arrow: Review → Retro (bottom to left) */
      '<path d="M195,395 Q120,360 120,290" />' +
      /* Arrow: Retro → Planning (left to top) */
      '<path d="M120,210 Q120,150 195,105" />' +
    '</g>' +
    /* ── Sprint Planning (top) ── */
    '<g>' +
      '<rect x="195" y="60" width="150" height="60" rx="8" fill="#2563eb" opacity="0.9"/>' +
      '<text x="270" y="88" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Sprint Planning</text>' +
      '<text x="270" y="106" text-anchor="middle" fill="#dbeafe" font-size="11">What can we deliver?</text>' +
    '</g>' +
    /* ── Daily Scrum (right) ── */
    '<g>' +
      '<rect x="420" y="220" width="110" height="60" rx="8" fill="#2563eb" opacity="0.9"/>' +
      '<text x="475" y="248" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Daily Scrum</text>' +
      '<text x="475" y="266" text-anchor="middle" fill="#dbeafe" font-size="11">15-min sync</text>' +
    '</g>' +
    /* ── Sprint Review (bottom) ── */
    '<g>' +
      '<rect x="195" y="380" width="150" height="60" rx="8" fill="#2563eb" opacity="0.9"/>' +
      '<text x="270" y="408" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Sprint Review</text>' +
      '<text x="270" y="426" text-anchor="middle" fill="#dbeafe" font-size="11">Inspect the increment</text>' +
    '</g>' +
    /* ── Sprint Retrospective (left) ── */
    '<g>' +
      '<rect x="10" y="220" width="120" height="60" rx="8" fill="#2563eb" opacity="0.9"/>' +
      '<text x="70" y="248" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Retrospective</text>' +
      '<text x="70" y="266" text-anchor="middle" fill="#dbeafe" font-size="11">Improve process</text>' +
    '</g>' +
    /* ── Center: The Sprint ── */
    '<g>' +
      '<circle cx="270" cy="250" r="55" fill="#f8fafc" stroke="#2563eb" stroke-width="3"/>' +
      '<text x="270" y="240" text-anchor="middle" fill="#2563eb" font-size="16" font-weight="bold">THE SPRINT</text>' +
      '<text x="270" y="260" text-anchor="middle" fill="#64748b" font-size="12">1-4 weeks</text>' +
    '</g>' +
  '</svg>' +
  '<p style="font-size:var(--text-xs);color:var(--color-ink-muted);margin-top:var(--space-1);">The Scrum Sprint Cycle — source: scrumguides.org</p>' +
'</div>';


/**
 * SVG: Agile Testing Quadrants
 * Brian Marick's 2x2 matrix showing four types of testing.
 * Axes: Technology-facing ↔ Business-facing (horizontal),
 *        Support Product ↔ Critique Product (vertical).
 */
var SVG_TESTING_QUADRANTS = '<div class="svg-diagram-wrapper" style="max-width:600px;margin:var(--space-5) auto;">' +
  '<svg viewBox="0 0 580 460" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Agile Testing Quadrants</title>' +
    '<desc>The four testing quadrants by Brian Marick: Q1 unit/component tests, Q2 acceptance/functional tests, Q3 exploratory/usability testing, Q4 performance/security testing.</desc>' +
    /* ── Quadrant backgrounds ── */
    '<rect x="290" y="10" width="270" height="210" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="4,2"/>' +
    '<rect x="10" y="10" width="270" height="210" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4,2"/>' +
    '<rect x="10" y="230" width="270" height="210" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,2"/>' +
    '<rect x="290" y="230" width="270" height="210" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4,2"/>' +
    /* ── Axis labels ── */
    '<text x="280" y="448" text-anchor="middle" fill="#64748b" font-size="12" font-style="italic">Technology-facing →</text>' +
    '<text x="280" y="20" text-anchor="middle" fill="#64748b" font-size="12" font-style="italic">← Business-facing</text>' +
    '<text x="12" y="235" text-anchor="middle" fill="#64748b" font-size="11" transform="rotate(-90,12,235)" font-style="italic">← Critique Product</text>' +
    '<text x="558" y="235" text-anchor="middle" fill="#64748b" font-size="11" transform="rotate(90,558,235)" font-style="italic">Support Product →</text>' +
    /* ── Dividers ── */
    '<line x1="280" y1="10" x2="280" y2="440" stroke="#cbd5e1" stroke-width="1.5"/>' +
    '<line x1="10" y1="225" x2="560" y2="225" stroke="#cbd5e1" stroke-width="1.5"/>' +
    /* ── Q1: Technology-facing / Support Product (top-left) ── */
    '<g>' +
      '<rect x="20" y="20" width="250" height="40" rx="4" fill="#16a34a" opacity="0.85"/>' +
      '<text x="145" y="40" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Q1 · Unit &amp; Component Tests</text>' +
      '<text x="145" y="54" text-anchor="middle" fill="#dcfce7" font-size="10">Technology-facing / Support the team</text>' +
      '<text x="145" y="120" text-anchor="middle" fill="#15803d" font-size="11">Jest · JUnit · pytest · xUnit</text>' +
      '<text x="145" y="140" text-anchor="middle" fill="#15803d" font-size="11">Integration tests · API tests</text>' +
      '<text x="145" y="160" text-anchor="middle" fill="#15803d" font-size="11">Fast · Automated · CI-friendly</text>' +
      '<text x="145" y="190" text-anchor="middle" fill="#166534" font-size="10" font-style="italic">⏱ Runs in seconds, every commit</text>' +
    '</g>' +
    /* ── Q2: Business-facing / Support Product (top-right) ── */
    '<g>' +
      '<rect x="300" y="20" width="250" height="40" rx="4" fill="#2563eb" opacity="0.85"/>' +
      '<text x="425" y="40" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Q2 · Functional &amp; Acceptance</text>' +
      '<text x="425" y="54" text-anchor="middle" fill="#dbeafe" font-size="10">Business-facing / Validate requirements</text>' +
      '<text x="425" y="120" text-anchor="middle" fill="#1e40af" font-size="11">Acceptance Test-Driven Dev (ATDD)</text>' +
      '<text x="425" y="140" text-anchor="middle" fill="#1e40af" font-size="11">Behavior-Driven Dev (BDD)</text>' +
      '<text x="425" y="160" text-anchor="middle" fill="#1e40af" font-size="11">User story tests · End-to-end</text>' +
      '<text x="425" y="190" text-anchor="middle" fill="#1e3a8a" font-size="10" font-style="italic">⏱ Runs in minutes, per build</text>' +
    '</g>' +
    /* ── Q3: Business-facing / Critique Product (bottom-left) ── */
    '<g>' +
      '<rect x="20" y="240" width="250" height="40" rx="4" fill="#dc2626" opacity="0.85"/>' +
      '<text x="145" y="260" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Q3 · Exploratory &amp; Usability</text>' +
      '<text x="145" y="274" text-anchor="middle" fill="#fee2e2" font-size="10">Business-facing / Critique the product</text>' +
      '<text x="145" y="340" text-anchor="middle" fill="#b91c1c" font-size="11">Pair testing · Session-based testing</text>' +
      '<text x="145" y="360" text-anchor="middle" fill="#b91c1c" font-size="11">Usability testing · UAT</text>' +
      '<text x="145" y="380" text-anchor="middle" fill="#b91c1c" font-size="11">Scenario testing · Beta testing</text>' +
      '<text x="145" y="410" text-anchor="middle" fill="#7f1d1d" font-size="10" font-style="italic">⏱ Manual, per feature / release</text>' +
    '</g>' +
    /* ── Q4: Technology-facing / Critique Product (bottom-right) ── */
    '<g>' +
      '<rect x="300" y="240" width="250" height="40" rx="4" fill="#ea580c" opacity="0.85"/>' +
      '<text x="425" y="260" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Q4 · Performance &amp; Security</text>' +
      '<text x="425" y="274" text-anchor="middle" fill="#ffedd5" font-size="10">Technology-facing / Critique quality</text>' +
      '<text x="425" y="340" text-anchor="middle" fill="#9a3412" font-size="11">Load testing · Stress testing</text>' +
      '<text x="425" y="360" text-anchor="middle" fill="#9a3412" font-size="11">Security (OWASP, pen testing)</text>' +
      '<text x="425" y="380" text-anchor="middle" fill="#9a3412" font-size="11">Chaos engineering · Reliability</text>' +
      '<text x="425" y="410" text-anchor="middle" fill="#7c2d12" font-size="10" font-style="italic">⏱ Runs periodically, per release</text>' +
    '</g>' +
  '</svg>' +
  '<p style="font-size:var(--text-xs);color:var(--color-ink-muted);margin-top:var(--space-1);">Agile Testing Quadrants — Brian Marick</p>' +
'</div>';


/**
 * SVG: TDD Cycle
 * Red → Green → Refactor circular flow with arrows.
 */
var SVG_TDD_CYCLE = '<div class="svg-diagram-wrapper" style="max-width:440px;margin:var(--space-5) auto;text-align:center;">' +
  '<svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Test-Driven Development Cycle</title>' +
    '<desc>Red: Write a failing test. Green: Write minimum code to pass. Refactor: Clean up code while keeping tests green. Repeat.</desc>' +
    /* ── Arrows forming a triangle ── */
    '<g fill="none" stroke="#94a3b8" stroke-width="2.5" marker-end="url(#tddArrow)">' +
      '<defs>' +
        '<marker id="tddArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">' +
          '<path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8"/>' +
        '</marker>' +
      '</defs>' +
      '<path d="M210,40 Q320,100 320,180" />' +
      '<path d="M320,180 Q320,260 210,280" />' +
      '<path d="M210,280 Q100,260 100,180" />' +
      '<path d="M100,180 Q100,100 210,40" />' +
    '</g>' +
    /* ── Red: Write failing test (top) ── */
    '<g>' +
      '<circle cx="210" cy="50" r="42" fill="#fef2f2" stroke="#dc2626" stroke-width="3"/>' +
      '<rect x="185" y="28" width="50" height="6" rx="3" fill="#dc2626" opacity="0.6"/>' +
      '<rect x="175" y="40" width="70" height="6" rx="3" fill="#dc2626" opacity="0.6"/>' +
      '<rect x="190" y="52" width="40" height="6" rx="3" fill="#dc2626" opacity="0.6"/>' +
      '<text x="210" y="110" text-anchor="middle" fill="#dc2626" font-size="13" font-weight="bold">🔴 RED</text>' +
      '<text x="210" y="125" text-anchor="middle" fill="#b91c1c" font-size="10">Write a failing test</text>' +
    '</g>' +
    /* ── Green: Make it pass (right) ── */
    '<g>' +
      '<circle cx="320" cy="200" r="42" fill="#f0fdf4" stroke="#16a34a" stroke-width="3"/>' +
      '<rect x="295" y="185" width="50" height="6" rx="3" fill="#16a34a" opacity="0.8"/>' +
      '<rect x="285" y="197" width="70" height="6" rx="3" fill="#16a34a" opacity="0.8"/>' +
      '<rect x="300" y="209" width="40" height="6" rx="3" fill="#16a34a" opacity="0.8"/>' +
      '<text x="320" y="258" text-anchor="middle" fill="#16a34a" font-size="13" font-weight="bold">🟢 GREEN</text>' +
      '<text x="320" y="273" text-anchor="middle" fill="#15803d" font-size="10">Make it pass</text>' +
    '</g>' +
    /* ── Refactor (left) ── */
    '<g>' +
      '<circle cx="100" cy="200" r="42" fill="#fff7ed" stroke="#ea580c" stroke-width="3"/>' +
      '<rect x="80" y="185" width="40" height="6" rx="3" fill="#ea580c" opacity="0.8"/>' +
      '<rect x="75" y="197" width="50" height="6" rx="3" fill="#ea580c" opacity="0.8"/>' +
      '<rect x="82" y="209" width="36" height="6" rx="3" fill="#ea580c" opacity="0.8"/>' +
      '<text x="100" y="258" text-anchor="middle" fill="#ea580c" font-size="13" font-weight="bold">♻️ REFACTOR</text>' +
      '<text x="100" y="273" text-anchor="middle" fill="#c2410c" font-size="10">Clean up code</text>' +
    '</g>' +
    /* ── Center label ── */
    '<text x="210" y="196" text-anchor="middle" fill="#64748b" font-size="11" font-style="italic">Keep tests<br/>passing</text>' +
  '</svg>' +
'</div>';


/**
 * SVG: Burndown Chart
 * Line chart with x-axis (Sprint days), y-axis (Remaining effort),
 * a diagonal "Ideal" line, and a jagged "Actual" line trending downward.
 */
var SVG_BURNDOWN = '<div class="svg-diagram-wrapper" style="max-width:540px;margin:var(--space-5) auto;">' +
  '<svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Sprint Burndown Chart</title>' +
    '<desc>A burndown chart tracking remaining effort over a sprint. The ideal line goes straight from top-left to bottom-right. The actual line shows daily remaining work.</desc>' +
    /* ── Background ── */
    '<rect x="50" y="20" width="450" height="270" fill="#f8fafc" rx="4"/>' +
    /* ── Grid lines ── */
    '<g stroke="#e2e6f0" stroke-width="1">' +
      '<line x1="50" y1="75" x2="500" y2="75"/>' +
      '<line x1="50" y1="130" x2="500" y2="130"/>' +
      '<line x1="50" y1="185" x2="500" y2="185"/>' +
      '<line x1="50" y1="240" x2="500" y2="240"/>' +
    '</g>' +
    /* ── Axes ── */
    '<polyline points="50,20 50,290 500,290" fill="none" stroke="#64748b" stroke-width="2"/>' +
    /* ── X-axis labels ── */
    '<text x="50" y="310" text-anchor="middle" fill="#64748b" font-size="10">Day 1</text>' +
    '<text x="140" y="310" text-anchor="middle" fill="#64748b" font-size="10">3</text>' +
    '<text x="230" y="310" text-anchor="middle" fill="#64748b" font-size="10">6</text>' +
    '<text x="320" y="310" text-anchor="middle" fill="#64748b" font-size="10">9</text>' +
    '<text x="410" y="310" text-anchor="middle" fill="#64748b" font-size="10">12</text>' +
    '<text x="500" y="310" text-anchor="middle" fill="#64748b" font-size="10">15</text>' +
    /* ── Y-axis labels ── */
    '<text x="42" y="24" text-anchor="end" fill="#64748b" font-size="10">100</text>' +
    '<text x="42" y="78" text-anchor="end" fill="#64748b" font-size="10">75</text>' +
    '<text x="42" y="133" text-anchor="end" fill="#64748b" font-size="10">50</text>' +
    '<text x="42" y="188" text-anchor="end" fill="#64748b" font-size="10">25</text>' +
    '<text x="42" y="293" text-anchor="end" fill="#64748b" font-size="10">0</text>' +
    /* ── Y-axis title ── */
    '<text x="18" y="160" text-anchor="middle" fill="#64748b" font-size="10" transform="rotate(-90,18,160)">Remaining Effort</text>' +
    /* ── Ideal line (diagonal) ── */
    '<polyline points="50,40 500,290" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="6,4"/>' +
    '<text x="420" y="295" fill="#94a3b8" font-size="10" font-style="italic">Ideal</text>' +
    /* ── Actual line (jagged) ── */
    '<polyline points="50,45 95,70 140,80 185,110 230,105 275,135 320,140 365,175 410,195 455,235 500,275" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linejoin="round"/>' +
    /* ── Data points ── */
    '<g fill="#2563eb">' +
      '<circle cx="50" cy="45" r="4"/>' +
      '<circle cx="95" cy="70" r="4"/>' +
      '<circle cx="140" cy="80" r="4"/>' +
      '<circle cx="185" cy="110" r="4"/>' +
      '<circle cx="230" cy="105" r="4"/>' +
      '<circle cx="275" cy="135" r="4"/>' +
      '<circle cx="320" cy="140" r="4"/>' +
      '<circle cx="365" cy="175" r="4"/>' +
      '<circle cx="410" cy="195" r="4"/>' +
      '<circle cx="455" cy="235" r="4"/>' +
      '<circle cx="500" cy="275" r="4"/>' +
    '</g>' +
    '<text x="340" y="135" fill="#2563eb" font-size="10" font-weight="bold">Actual</text>' +
  '</svg>' +
'</div>';


/**
 * SVG: Agile vs Traditional Comparison
 * Side-by-side comparison cards for Agile vs Waterfall approaches.
 */
var SVG_AGILE_VS_TRADITIONAL = '<div class="svg-diagram-wrapper" style="max-width:600px;margin:var(--space-5) auto;">' +
  '<svg viewBox="0 0 580 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Agile vs Traditional Development</title>' +
    '<desc>Comparison of Agile and Waterfall approaches across dimensions: Planning, Requirements, Delivery, Change, Team, and Testing.</desc>' +
    /* ── Header row ── */
    '<rect x="10" y="10" width="270" height="36" rx="6" fill="#2563eb"/>' +
    '<text x="145" y="34" text-anchor="middle" fill="#fff" font-size="15" font-weight="bold">Agile</text>' +
    '<rect x="300" y="10" width="270" height="36" rx="6" fill="#64748b"/>' +
    '<text x="435" y="34" text-anchor="middle" fill="#fff" font-size="15" font-weight="bold">Traditional (Waterfall)</text>' +
    /* ── Row 1: Planning ── */
    '<rect x="10" y="56" width="270" height="50" rx="4" fill="#eff6ff"/>' +
    '<text x="145" y="74" text-anchor="middle" fill="#1e40af" font-size="12">Iterative &amp; adaptive</text>' +
    '<text x="145" y="92" text-anchor="middle" fill="#3b82f6" font-size="10">Plan as you go</text>' +
    '<rect x="300" y="56" width="270" height="50" rx="4" fill="#f1f5f9"/>' +
    '<text x="435" y="74" text-anchor="middle" fill="#475569" font-size="12">Big upfront design</text>' +
    '<text x="435" y="92" text-anchor="middle" fill="#94a3b8" font-size="10">Plan everything first</text>' +
    /* ── Row 2: Requirements ── */
    '<rect x="10" y="116" width="270" height="50" rx="4" fill="#f0fdf4"/>' +
    '<text x="145" y="134" text-anchor="middle" fill="#15803d" font-size="12">Evolving, flexible</text>' +
    '<text x="145" y="152" text-anchor="middle" fill="#22c55e" font-size="10">Change is welcome</text>' +
    '<rect x="300" y="116" width="270" height="50" rx="4" fill="#f1f5f9"/>' +
    '<text x="435" y="134" text-anchor="middle" fill="#475569" font-size="12">Fixed, detailed specs</text>' +
    '<text x="435" y="152" text-anchor="middle" fill="#94a3b8" font-size="10">Frozen after sign-off</text>' +
    /* ── Row 3: Delivery ── */
    '<rect x="10" y="176" width="270" height="50" rx="4" fill="#f0fdf4"/>' +
    '<text x="145" y="194" text-anchor="middle" fill="#15803d" font-size="12">Frequent, incremental</text>' +
    '<text x="145" y="212" text-anchor="middle" fill="#22c55e" font-size="10">Every 1-4 weeks</text>' +
    '<rect x="300" y="176" width="270" height="50" rx="4" fill="#f1f5f9"/>' +
    '<text x="435" y="194" text-anchor="middle" fill="#475569" font-size="12">Single final delivery</text>' +
    '<text x="435" y="212" text-anchor="middle" fill="#94a3b8" font-size="10">At end of project</text>' +
    /* ── Row 4: Change ── */
    '<rect x="10" y="236" width="270" height="50" rx="4" fill="#eff6ff"/>' +
    '<text x="145" y="254" text-anchor="middle" fill="#1e40af" font-size="12">Embraced at any point</text>' +
    '<text x="145" y="272" text-anchor="middle" fill="#3b82f6" font-size="10">Low cost of change</text>' +
    '<rect x="300" y="236" width="270" height="50" rx="4" fill="#fef2f2"/>' +
    '<text x="435" y="254" text-anchor="middle" fill="#b91c1c" font-size="12">Discouraged, expensive</text>' +
    '<text x="435" y="272" text-anchor="middle" fill="#ef4444" font-size="10">High cost of change</text>' +
    /* ── Row 5: Team ── */
    '<rect x="10" y="296" width="270" height="50" rx="4" fill="#f0fdf4"/>' +
    '<text x="145" y="314" text-anchor="middle" fill="#15803d" font-size="12">Self-organizing, cross-functional</text>' +
    '<text x="145" y="332" text-anchor="middle" fill="#22c55e" font-size="10">Collaborative ownership</text>' +
    '<rect x="300" y="296" width="270" height="50" rx="4" fill="#f1f5f9"/>' +
    '<text x="435" y="314" text-anchor="middle" fill="#475569" font-size="12">Role-siloed, manager-driven</text>' +
    '<text x="435" y="332" text-anchor="middle" fill="#94a3b8" font-size="10">Top-down control</text>' +
    /* ── Row 6: Testing ── */
    '<rect x="10" y="356" width="270" height="50" rx="4" fill="#eff6ff"/>' +
    '<text x="145" y="374" text-anchor="middle" fill="#1e40af" font-size="12">Continuous, throughout</text>' +
    '<text x="145" y="392" text-anchor="middle" fill="#3b82f6" font-size="10">Automated &amp; manual</text>' +
    '<rect x="300" y="356" width="270" height="50" rx="4" fill="#fef2f2"/>' +
    '<text x="435" y="374" text-anchor="middle" fill="#b91c1c" font-size="12">End-of-cycle phase</text>' +
    '<text x="435" y="392" text-anchor="middle" fill="#ef4444" font-size="10">Testing at the end</text>' +
  '</svg>' +
'</div>';


/**
 * SVG: Kanban Board
 * Three-column board (To Do, In Progress, Done) with WIP limits
 * and example card items, showing the visual workflow method.
 */
var SVG_KANBAN_BOARD = '<div class="svg-diagram-wrapper" style="max-width:600px;margin:var(--space-5) auto;">' +
  '<svg viewBox="0 0 580 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Kanban Board</title>' +
    '<desc>A Kanban board with three columns: To Do (WIP limit 5), In Progress (WIP limit 3), and Done. Example cards show typical work items and a blocked item.</desc>' +
    /* ── Column headers ── */
    '<rect x="10" y="10" width="180" height="40" rx="6" fill="#64748b"/>' +
    '<text x="100" y="30" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">To Do</text>' +
    '<text x="100" y="44" text-anchor="middle" fill="#cbd5e1" font-size="9">WIP: 5</text>' +
    '<rect x="200" y="10" width="180" height="40" rx="6" fill="#2563eb"/>' +
    '<text x="290" y="30" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">In Progress</text>' +
    '<text x="290" y="44" text-anchor="middle" fill="#bfdbfe" font-size="9">WIP: 3</text>' +
    '<rect x="390" y="10" width="180" height="40" rx="6" fill="#16a34a"/>' +
    '<text x="480" y="30" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold">Done</text>' +
    '<text x="480" y="44" text-anchor="middle" fill="#bbf7d0" font-size="9">Today: 2</text>' +
    /* ── Column backgrounds ── */
    '<rect x="10" y="55" width="180" height="310" fill="#f8fafc" stroke="#e2e6f0" stroke-width="1.5" rx="4"/>' +
    '<rect x="200" y="55" width="180" height="310" fill="#f8fafc" stroke="#e2e6f0" stroke-width="1.5" rx="4"/>' +
    '<rect x="390" y="55" width="180" height="310" fill="#f8fafc" stroke="#e2e6f0" stroke-width="1.5" rx="4"/>' +
    /* ── Card: "User login" (To Do) ── */
    '<g>' +
      '<rect x="20" y="65" width="160" height="44" rx="4" fill="#fff" stroke="#e2e6f0" stroke-width="1"/>' +
      '<rect x="20" y="65" width="4" height="44" rx="2" fill="#94a3b8"/>' +
      '<text x="30" y="82" fill="#334155" font-size="11" font-weight="bold">User login</text>' +
      '<text x="30" y="97" fill="#94a3b8" font-size="9">8 pts · Story</text>' +
    '</g>' +
    /* ── Card: "Password reset" (To Do) ── */
    '<g>' +
      '<rect x="20" y="119" width="160" height="44" rx="4" fill="#fff" stroke="#e2e6f0" stroke-width="1"/>' +
      '<rect x="20" y="119" width="4" height="44" rx="2" fill="#94a3b8"/>' +
      '<text x="30" y="136" fill="#334155" font-size="11" font-weight="bold">Password reset</text>' +
      '<text x="30" y="151" fill="#94a3b8" font-size="9">5 pts · Story</text>' +
    '</g>' +
    /* ── Card: "Dashboard API" (To Do) ── */
    '<g>' +
      '<rect x="20" y="173" width="160" height="44" rx="4" fill="#fff" stroke="#e2e6f0" stroke-width="1"/>' +
      '<rect x="20" y="173" width="4" height="44" rx="2" fill="#94a3b8"/>' +
      '<text x="30" y="190" fill="#334155" font-size="11" font-weight="bold">Dashboard API</text>' +
      '<text x="30" y="205" fill="#94a3b8" font-size="9">13 pts · Story</text>' +
    '</g>' +
    /* ── Card: "Fix login bug" (In Progress) ── */
    '<g>' +
      '<rect x="210" y="65" width="160" height="44" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>' +
      '<rect x="210" y="65" width="4" height="44" rx="2" fill="#2563eb"/>' +
      '<text x="220" y="82" fill="#1e40af" font-size="11" font-weight="bold">Fix login bug 🔥</text>' +
      '<text x="220" y="97" fill="#60a5fa" font-size="9">3 pts · Bug</text>' +
    '</g>' +
    /* ── Card: "Email templates" (In Progress) ── */
    '<g>' +
      '<rect x="210" y="119" width="160" height="44" rx="4" fill="#fff" stroke="#e2e6f0" stroke-width="1"/>' +
      '<rect x="210" y="119" width="4" height="44" rx="2" fill="#94a3b8"/>' +
      '<text x="220" y="136" fill="#334155" font-size="11" font-weight="bold">Email templates</text>' +
      '<text x="220" y="151" fill="#94a3b8" font-size="9">5 pts · Task</text>' +
    '</g>' +
    /* ── Card: Blocked (In Progress) ── */
    '<g>' +
      '<rect x="210" y="173" width="160" height="44" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>' +
      '<rect x="210" y="173" width="4" height="44" rx="2" fill="#dc2626"/>' +
      '<text x="220" y="190" fill="#b91c1c" font-size="11" font-weight="bold">SSO integration</text>' +
      '<text x="220" y="205" fill="#ef4444" font-size="9">⛔ Blocked — waiting on Ops</text>' +
    '</g>' +
    /* ── Card: "API docs" (Done) ── */
    '<g>' +
      '<rect x="400" y="65" width="160" height="44" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1"/>' +
      '<rect x="400" y="65" width="4" height="44" rx="2" fill="#16a34a"/>' +
      '<text x="410" y="82" fill="#166534" font-size="11" font-weight="bold">API docs</text>' +
      '<text x="410" y="97" fill="#4ade80" font-size="9">2 pts · Task</text>' +
    '</g>' +
    /* ── Card: "Unit tests" (Done) ── */
    '<g>' +
      '<rect x="400" y="119" width="160" height="44" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1"/>' +
      '<rect x="400" y="119" width="4" height="44" rx="2" fill="#16a34a"/>' +
      '<text x="410" y="136" fill="#166534" font-size="11" font-weight="bold">Unit tests</text>' +
      '<text x="410" y="151" fill="#4ade80" font-size="9">8 pts · Task</text>' +
    '</g>' +
  '</svg>' +
  '<p style="font-size:var(--text-xs);color:var(--color-ink-muted);margin-top:var(--space-1);">A sample Kanban board with WIP limits and a blocked item</p>' +
'</div>';


/**
 * SVG: CI/CD Pipeline
 * Flow chart showing the stages of a CI/CD pipeline:
 * Commit → Build → Unit Tests → Integration Tests → Staging → Deploy.
 * Arrows and checkmarks show the sequential flow.
 */
var SVG_CI_CD_PIPELINE = '<div class="svg-diagram-wrapper" style="max-width:600px;margin:var(--space-5) auto;text-align:center;">' +
  '<svg viewBox="0 0 580 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>CI/CD Pipeline</title>' +
    '<desc>Six stages of a CI/CD pipeline: Commit, Build, Unit Tests, Integration Tests, Staging, and Deploy to production. Green checkmarks show successful stages.</desc>' +
    '<defs>' +
      '<marker id="pipArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">' +
        '<path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8"/>' +
      '</marker>' +
    '</defs>' +
    /* ── Pipeline connector arrows ── */
    '<g fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#pipArrow)">' +
      '<line x1="107" y1="90" x2="130" y2="90"/>' +
      '<line x1="217" y1="90" x2="240" y2="90"/>' +
      '<line x1="327" y1="90" x2="350" y2="90"/>' +
      '<line x1="437" y1="90" x2="460" y2="90"/>' +
      '<line x1="547" y1="90" x2="570" y2="90"/>' +
    '</g>' +
    /* ── Stage 1: Commit ── */
    '<g>' +
      '<rect x="10" y="55" width="95" height="70" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>' +
      '<text x="57" y="82" text-anchor="middle" fill="#1e40af" font-size="13" font-weight="bold">📝 Commit</text>' +
      '<text x="57" y="100" text-anchor="middle" fill="#3b82f6" font-size="10">Push code to</text>' +
      '<text x="57" y="114" text-anchor="middle" fill="#3b82f6" font-size="10">shared repo</text>' +
    '</g>' +
    /* ── Stage 2: Build ── */
    '<g>' +
      '<rect x="135" y="55" width="80" height="70" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>' +
      '<text x="175" y="82" text-anchor="middle" fill="#15803d" font-size="13" font-weight="bold">🔧 Build</text>' +
      '<text x="175" y="100" text-anchor="middle" fill="#22c55e" font-size="10">Compile &amp;</text>' +
      '<text x="175" y="114" text-anchor="middle" fill="#22c55e" font-size="10">package</text>' +
      '<text x="160" y="48" fill="#16a34a" font-size="14">✓</text>' +
    '</g>' +
    /* ── Stage 3: Unit Tests ── */
    '<g>' +
      '<rect x="245" y="55" width="80" height="70" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>' +
      '<text x="285" y="82" text-anchor="middle" fill="#15803d" font-size="13" font-weight="bold">✅ Unit</text>' +
      '<text x="285" y="100" text-anchor="middle" fill="#22c55e" font-size="10">Automated</text>' +
      '<text x="285" y="114" text-anchor="middle" fill="#22c55e" font-size="10">tests</text>' +
      '<text x="270" y="48" fill="#16a34a" font-size="14">✓</text>' +
    '</g>' +
    /* ── Stage 4: Integration ── */
    '<g>' +
      '<rect x="355" y="55" width="80" height="70" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>' +
      '<text x="395" y="82" text-anchor="middle" fill="#15803d" font-size="13" font-weight="bold">🔗 Integ.</text>' +
      '<text x="395" y="100" text-anchor="middle" fill="#22c55e" font-size="10">Integration</text>' +
      '<text x="395" y="114" text-anchor="middle" fill="#22c55e" font-size="10">tests</text>' +
      '<text x="380" y="48" fill="#16a34a" font-size="14">✓</text>' +
    '</g>' +
    /* ── Stage 5: Staging ── */
    '<g>' +
      '<rect x="465" y="55" width="80" height="70" rx="10" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>' +
      '<text x="505" y="82" text-anchor="middle" fill="#c2410c" font-size="13" font-weight="bold">🧪 Stage</text>' +
      '<text x="505" y="100" text-anchor="middle" fill="#ea580c" font-size="10">Deploy to</text>' +
      '<text x="505" y="114" text-anchor="middle" fill="#ea580c" font-size="10">staging</text>' +
    '</g>' +
    /* ── Stage 6: Deploy (with dashed arrow) ── */
    '<g>' +
      '<rect x="465" y="145" width="100" height="44" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>' +
      '<text x="515" y="172" text-anchor="middle" fill="#15803d" font-size="13" font-weight="bold">🚀 Deploy</text>' +
      '<line x1="505" y1="125" x2="515" y2="145" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#pipArrow)"/>' +
    '</g>' +
    /* ── Time axis ── */
    '<text x="290" y="192" text-anchor="middle" fill="#94a3b8" font-size="10" font-style="italic">Time →</text>' +
  '</svg>' +
  '<p style="font-size:var(--text-xs);color:var(--color-ink-muted);margin-top:var(--space-1);">A typical CI/CD pipeline — each stage must pass before moving to the next</p>' +
'</div>';


/**
 * SVG: Sprint Timeline
 * A horizontal timeline showing a Sprint day-by-day:
 * Day 1 (Sprint Planning), Days 2-9 (Daily Scrums + Development),
 * Day 10 (Sprint Review + Retrospective).
 */
var SVG_SPRINT_TIMELINE = '<div class="svg-diagram-wrapper" style="max-width:600px;margin:var(--space-5) auto;">' +
  '<svg viewBox="0 0 580 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Sprint Timeline</title>' +
    '<desc>A 2-week Sprint timeline showing: Day 1 Sprint Planning, 8 days of Daily Scrums and development, Day 10 Sprint Review and Sprint Retrospective.</desc>' +
    /* ── Main timeline bar ── */
    '<line x1="30" y1="110" x2="550" y2="110" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>' +
    /* ── Day markers ── */
    '<g fill="#e2e6f0" stroke="#94a3b8" stroke-width="1.5">' +
      '<circle cx="55" cy="110" r="6" fill="#2563eb" stroke="#2563eb"/>' +
      '<circle cx="110" cy="110" r="6"/>' +
      '<circle cx="165" cy="110" r="6"/>' +
      '<circle cx="220" cy="110" r="6"/>' +
      '<circle cx="275" cy="110" r="6"/>' +
      '<circle cx="330" cy="110" r="6"/>' +
      '<circle cx="385" cy="110" r="6"/>' +
      '<circle cx="440" cy="110" r="6"/>' +
      '<circle cx="495" cy="110" r="6"/>' +
      '<circle cx="525" cy="110" r="6" fill="#2563eb" stroke="#2563eb"/>' +
    '</g>' +
    /* ── Day labels ── */
    '<text x="55" y="133" text-anchor="middle" fill="#64748b" font-size="9">Day 1</text>' +
    '<text x="110" y="133" text-anchor="middle" fill="#64748b" font-size="9">2</text>' +
    '<text x="165" y="133" text-anchor="middle" fill="#64748b" font-size="9">3</text>' +
    '<text x="220" y="133" text-anchor="middle" fill="#64748b" font-size="9">4</text>' +
    '<text x="275" y="133" text-anchor="middle" fill="#64748b" font-size="9">5</text>' +
    '<text x="330" y="133" text-anchor="middle" fill="#64748b" font-size="9">6</text>' +
    '<text x="385" y="133" text-anchor="middle" fill="#64748b" font-size="9">7</text>' +
    '<text x="440" y="133" text-anchor="middle" fill="#64748b" font-size="9">8</text>' +
    '<text x="495" y="133" text-anchor="middle" fill="#64748b" font-size="9">9</text>' +
    '<text x="525" y="133" text-anchor="middle" fill="#64748b" font-size="9">10</text>' +
    /* ── Event: Sprint Planning (Day 1) ── */
    '<g>' +
      '<path d="M55,40 L55,104" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3"/>' +
      '<rect x="20" y="10" width="70" height="30" rx="6" fill="#2563eb" opacity="0.9"/>' +
      '<text x="55" y="30" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Sprint Planning</text>' +
    '</g>' +
    /* ── Event: Daily Scrums + Dev (Days 2-9) ── */
    '<g>' +
      '<rect x="110" y="170" width="385" height="30" rx="6" fill="#6366f1" opacity="0.85"/>' +
      '<text x="302" y="190" text-anchor="middle" fill="#eef2ff" font-size="11" font-weight="bold">Daily Scrum &amp; Development</text>' +
    '</g>' +
    /* ── Event: Sprint Review + Retro (Day 10) ── */
    '<g>' +
      '<path d="M525,60 L525,104" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3"/>' +
      '<rect x="480" y="55" width="90" height="48" rx="6" fill="#2563eb" opacity="0.9"/>' +
      '<text x="525" y="73" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">Sprint Review</text>' +
      '<text x="525" y="90" text-anchor="middle" fill="#dbeafe" font-size="9">+ Retro</text>' +
    '</g>' +
    /* ── Sprint label ── */
    '<rect x="220" y="208" width="160" height="24" rx="12" fill="#e2e6f0"/>' +
    '<text x="300" y="225" text-anchor="middle" fill="#475569" font-size="11" font-weight="bold">2-Week Sprint</text>' +
  '</svg>' +
  '<p style="font-size:var(--text-xs);color:var(--color-ink-muted);margin-top:var(--space-1);">Typical 2-week Sprint timeline showing events across the Sprint</p>' +
'</div>';


/**
 * SVG: Scrum Roles Diagram
 * Shows the four Scrum roles — Product Owner, Scrum Master, Development Team,
 * and Stakeholders — with their relationships. The Dev Team is at center,
 * the SM and PO supporting, and Stakeholders providing input.
 */
var SVG_SCRUM_ROLES = '<div class="svg-diagram-wrapper" style="max-width:500px;margin:var(--space-5) auto;text-align:center;">' +
  '<svg viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">' +
    '<title>Scrum Roles and Responsibilities</title>' +
    '<desc>Four Scrum roles: Product Owner manages the backlog and stakeholders, Scrum Master coaches the team, Development Team self-organizes to deliver increments, and Stakeholders provide input and feedback.</desc>' +
    /* ── Connector lines ── */
    '<g stroke="#cbd5e1" stroke-width="2" fill="none">' +
      '<line x1="240" y1="160" x2="240" y2="200"/>' +
      '<line x1="240" y1="260" x2="240" y2="300"/>' +
      '<line x1="100" y1="200" x2="380" y2="200"/>' +
    '</g>' +
    /* ── Development Team (center) ── */
    '<g>' +
      '<ellipse cx="240" cy="180" rx="90" ry="40" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>' +
      '<text x="240" y="175" text-anchor="middle" fill="#1e40af" font-size="14" font-weight="bold">Development Team</text>' +
      '<text x="240" y="192" text-anchor="middle" fill="#3b82f6" font-size="10">3-9 people · Self-organizing</text>' +
    '</g>' +
    /* ── Product Owner (top) ── */
    '<g>' +
      '<rect x="175" y="60" width="130" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>' +
      '<text x="240" y="82" text-anchor="middle" fill="#15803d" font-size="13" font-weight="bold">Product Owner</text>' +
      '<text x="240" y="98" text-anchor="middle" fill="#22c55e" font-size="10">Manages Backlog</text>' +
    '</g>' +
    /* ── Scrum Master (bottom) ── */
    '<g>' +
      '<rect x="175" y="260" width="130" height="50" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>' +
      '<text x="240" y="282" text-anchor="middle" fill="#c2410c" font-size="13" font-weight="bold">Scrum Master</text>' +
      '<text x="240" y="298" text-anchor="middle" fill="#ea580c" font-size="10">Servant Leader</text>' +
    '</g>' +
    /* ── Stakeholders (left) ── */
    '<g>' +
      '<rect x="10" y="175" width="100" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>' +
      '<text x="60" y="195" text-anchor="middle" fill="#b91c1c" font-size="12" font-weight="bold">Stakeholders</text>' +
      '<text x="60" y="212" text-anchor="middle" fill="#ef4444" font-size="9">Input &amp; feedback</text>' +
    '</g>' +
    /* ── Users / Customers (right) ── */
    '<g>' +
      '<rect x="370" y="175" width="100" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>' +
      '<text x="420" y="195" text-anchor="middle" fill="#b91c1c" font-size="12" font-weight="bold">Users / Customers</text>' +
      '<text x="420" y="212" text-anchor="middle" fill="#ef4444" font-size="9">Value &amp; feedback</text>' +
    '</g>' +
    /* ── Labels on connectors ── */
    '<text x="240" y="149" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">defines priority</text>' +
    '<text x="240" y="253" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">coaches &amp; facilitates</text>' +
    '<text x="170" y="222" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">← provides input to</text>' +
    '<text x="310" y="222" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">delivers value to →</text>' +
  '</svg>' +
  '<p style="font-size:var(--text-xs);color:var(--color-ink-muted);margin-top:var(--space-1);">Scrum Team roles and their relationships</p>' +
'</div>';


const COURSE_CONTENT = {

  // ── Agile & Scrum for Developers ─────────────────────────────────────────
  // Content will be populated as each lesson is written.
  // Structure: "subModuleId": "HTML content string"
  "agile-scrum-dev": {
    // ── MODULE 1 OVERVIEW ────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Introduction to Agile and Scrum</h1>',
        '<p class="chapter-intro">Welcome to Agile & Scrum for Developers. This module introduces the core concepts of Agile development and the Scrum framework — the foundation everything else in this course builds on.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What Agile development is and why it transformed software teams</li>',
          '<li>The four values and twelve principles of the Agile Manifesto</li>',
          '<li>The roles, events, and artifacts that make up Scrum</li>',
          '<li>How Agile differs from traditional waterfall development</li>',
          '<li>Real-world case studies showing Agile in action</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>How This Module Fits</strong>Module 1 gives you the "why" of Agile. Module 2 dives into the practices you\'ll use day-to-day. Modules 3-4 cover the Scrum roles and ceremonies in depth. Modules 5-7 cover testing, scaling, and metrics. Modules 8-9 round out your knowledge with advanced topics and hands-on practice.</div></div>',
        '<p><strong>Time estimate:</strong> ~60 minutes of reading + an 8-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 1: Introduction to Agile and Scrum
    "mod-1-1": [
      "<h2>What is Agile Development?</h2>",
      "<p>Agile development is a methodology that emphasizes <strong>iterative progress, collaboration, and adaptability</strong>. Unlike traditional waterfall approaches, Agile breaks work into small increments called iterations (typically 1-4 weeks), with each iteration delivering a potentially shippable product increment.</p>",

      "<h2>The Agile Manifesto (2001)</h2>",
      "<p>In February 2001, 17 software developers met at a ski resort in Utah and drafted the Agile Manifesto. It consists of four core values:</p>",
      "<ol>",
      "<li><strong>Individuals and interactions</strong> over processes and tools</li>",
      "<li><strong>Working software</strong> over comprehensive documentation</li>",
      "<li><strong>Customer collaboration</strong> over contract negotiation</li>",
      "<li><strong>Responding to change</strong> over following a plan</li>",
      "</ol>",

      "<blockquote>While there is value in the items on the right, we value the items on the left more. — Agile Manifesto</blockquote>",

      "<h2>The 12 Agile Principles</h2>",
      "<p>The Manifesto is supported by 12 principles that guide Agile teams:</p>",
      "<ol>",
      "<li>Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.</li>",
      "<li>Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.</li>",
      "<li>Deliver working software frequently, from a couple of weeks to a couple of months, with a preference for the shorter timescale.</li>",
      "<li>Business people and developers must work together daily throughout the project.</li>",
      "<li>Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.</li>",
      "<li>The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.</li>",
      "<li>Working software is the primary measure of progress.</li>",
      "<li>Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.</li>",
      "<li>Continuous attention to technical excellence and good design enhances agility.</li>",
      "<li>Simplicity — the art of maximizing the amount of work not done — is essential.</li>",
      "<li>The best architectures, requirements, and designs emerge from self-organizing teams.</li>",
      "<li>At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behaviour accordingly.</li>",
      "</ol>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Key Takeaway</strong>Agile is not a process you follow — it is a mindset you adopt. The principles emphasize people, collaboration, and responsiveness over rigid plans.</div></div>"
    ].join("\n"),

    "mod-1-2": [
      "<h2>Introduction to Scrum</h2>",
      "<p>Scrum is the most widely used Agile framework. It was formalized in the early 1990s by Ken Schwaber and Jeff Sutherland, and is described in the <strong>Scrum Guide</strong> (available free at scrumguides.org).</p>",

      "<h2>What is Scrum?</h2>",
      "<p>Scrum is a lightweight framework that helps people, teams, and organizations generate value through adaptive solutions for complex problems. It is:</p>",
      "<ul>",
      "<li><strong>Lightweight</strong> — minimal prescribed elements</li>",
      "<li><strong>Simple to understand</strong> — but difficult to master</li>",
      "<li><strong>Empirical</strong> — based on observation and adaptation</li>",
      "</ul>",

      "<h2>Scrum Theory</h2>",
      "<p>Scrum is grounded in <strong>empiricism</strong> — the idea that knowledge comes from experience and making decisions based on what is known. Three pillars support every implementation:</p>",
      "<ol>",
      "<li><strong>Transparency</strong> — All aspects of the process must be visible to those responsible for the outcome. A common language and shared standards ensure transparency.</li>",
      "<li><strong>Inspection</strong> — Scrum users must frequently inspect Scrum artifacts and progress toward the Sprint Goal to detect undesirable variances. Inspection should not be so frequent that it gets in the way of work.</li>",
      "<li><strong>Adaptation</strong> — If any process aspect deviates outside acceptable limits, adjustments must be made as soon as possible to minimize further deviation.</li>",
      "</ol>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Scrum ≠ Agile</strong>Scrum is one specific framework that implements Agile values. There are many others — Kanban, XP, SAFe — but Scrum is by far the most common.</div></div>",

      // Scrum Sprint Cycle diagram
      SVG_SCRUM_CYCLE
    ].join("\n"),

    "mod-1-3": [
      "<h2>Agile vs. Traditional Development</h2>",
      "<p>Traditional software development typically follows a <strong>Waterfall</strong> model: requirements → design → implementation → testing → deployment. Each phase completes fully before the next begins.</p>",

      // Agile vs. Traditional comparison infographic
      SVG_AGILE_VS_TRADITIONAL,

      "<h2>Key Differences</h2>",

      "<h3>Planning</h3>",
      "<p><strong>Waterfall:</strong> All requirements are gathered and documented upfront. The entire project is planned before any coding begins. Changes require formal change requests.</p>",
      "<p><strong>Agile:</strong> High-level planning is done upfront, but detailed planning happens iteratively. Requirements are refined throughout the project as understanding grows.</p>",

      "<h3>Customer Involvement</h3>",
      "<p><strong>Waterfall:</strong> Customer is involved at the beginning (requirements) and end (acceptance). Limited feedback during development.</p>",
      "<p><strong>Agile:</strong> Customer (or Product Owner) is involved continuously. Feedback is gathered after each iteration and incorporated into the next.</p>",

      "<h3>Delivery</h3>",
      "<p><strong>Waterfall:</strong> A single delivery at the end of the project, often months or years after work begins.</p>",
      "<p><strong>Agile:</strong> Frequent deliveries (every 1-4 weeks). Working software is delivered incrementally.</p>",

      "<h3>Handling Change</h3>",
      "<p><strong>Waterfall:</strong> Change is viewed as a risk to be minimized. Change requests go through formal approval processes.</p>",
      "<p><strong>Agile:</strong> Change is welcomed as a source of competitive advantage. The process is designed to accommodate change even late in development.</p>",

      "<h2>When to Use Each Approach</h2>",
      "<p><strong>Waterfall works well when:</strong></p>",
      "<ul>",
      "<li>Requirements are well-understood and unlikely to change</li>",
      "<li>The project is small or simple</li>",
      "<li>Regulatory or compliance requirements mandate detailed documentation</li>",
      "</ul>",
      "<p><strong>Agile works well when:</strong></p>",
      "<ul>",
      "<li>Requirements are uncertain or likely to evolve</li>",
      "<li>The project is complex or innovative</li>",
      "<li>Speed to market is critical</li>",
      "<li>Customer feedback is readily available</li>",
      "</ul>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Hybrid Approaches</strong>Many organizations use a hybrid model — Waterfall for high-level planning and compliance, Agile for execution and delivery.</div></div>"
    ].join("\n"),

    "mod-1-4": [
      "<h2>The Agile Mindset</h2>",
      "<p>Adopting Agile is not about following a prescribed set of practices — it is about embracing a <strong>mindset</strong> that values collaboration, learning, and adaptability over rigid processes.</p>",

      "<h2>Key Elements of the Agile Mindset</h2>",

      "<h3>1. Customer Focus</h3>",
      "<p>Everything the team does is ultimately about delivering value to the customer. The team seeks frequent feedback and adjusts based on what they learn.</p>",

      "<h3>2. Collaboration Over Silos</h3>",
      "<p>Developers, testers, product owners, and business stakeholders work together throughout the project. No hand-offs over the wall — the team owns the outcome collectively.</p>",

      "<h3>3. Embrace Uncertainty</h3>",
      "<p>In complex domains, you cannot know everything upfront. Agile teams accept this uncertainty and use short feedback loops to learn and adapt.</p>",

      "<h3>4. Continuous Improvement</h3>",
      "<p>Agile teams regularly reflect on their process and look for ways to improve. This is built into Scrum through the Sprint Retrospective.</p>",

      "<h3>5. Sustainable Pace</h3>",
      "<p>Teams should work at a pace they can sustain indefinitely. Burnout is not a sign of dedication — it is a sign of poor process.</p>",

      "<h3>6. Technical Excellence</h3>",
      "<p>Agile teams value quality. Practices like TDD, refactoring, and continuous integration keep the codebase healthy and the team fast.</p>",

      "<blockquote>The Agile mindset is the set of attitudes supporting an Agile working environment. These include respect, collaboration, improvement and learning cycles, pride in ownership, focus on delivering value, and the ability to adapt to change. — Agile Alliance</blockquote>"
    ].join("\n"),

    "mod-1-5": [
      "<h2>Case Studies and Examples</h2>",

      "<h2>Case Study 1: Spotify's Agile Model</h2>",
      "<p>Spotify is famous for its unique Agile model based on Squads, Tribes, Chapters, and Guilds. Each Squad acts like a mini-startup with a clear mission, and Squads that work on related features are grouped into Tribes. Chapters bring together people with similar skills (e.g., all web developers), while Guilds are communities of interest across the entire company.</p>",
      "<p><strong>Key lesson:</strong> Spotify adapted Scrum to fit their culture rather than forcing their culture to fit Scrum.</p>",

      "<h2>Case Study 2: ING's Agile Transformation</h2>",
      "<p>ING Bank underwent a massive Agile transformation in 2015, moving from a traditional hierarchical structure to a Squads-and-Tribes model inspired by Spotify. The transition involved 3,500 IT staff and took over a year.</p>",
      "<p><strong>Key lesson:</strong> Agile transformations at scale require executive commitment, cultural change, and patience.</p>",

      "<h2>Case Study 3: A Failed Agile Adoption</h2>",
      "<p>A large enterprise adopted Scrum ceremonies but kept their traditional command-and-control management structure. Daily standups became status reports to managers, sprint reviews became formal presentations, and retrospectives were treated as complaints sessions with no follow-through. Within 6 months, the team was doing 'Waterfall in Sprint clothing.'</p>",
      "<p><strong>Key lesson:</strong> Adopting ceremonies without the mindset is cargo-cult Agile. Real agility requires trust, empowerment, and psychological safety.</p>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Common Pitfall</strong>The most common reason Agile fails is that organizations adopt the mechanics (standups, sprints, retrospectives) without embracing the underlying values and principles.</div></div>"
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Agile Development Practices</h1>',
        '<p class="chapter-intro">With the principles from Module 1 in mind, Module 2 introduces the hands-on practices that Agile teams use to deliver working software. You\'ll compare Scrum and Kanban and learn when each framework fits best.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The core Agile practices: timeboxing, iteration, and incremental delivery</li>',
          '<li>How the Scrum framework structures work into Sprints with defined roles and events</li>',
          '<li>How Kanban focuses on flow and continuous delivery without fixed iterations</li>',
          '<li>When to use Scrum vs. Kanban — and when to combine them (Scrumban)</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 1</strong>Module 1 gave you the philosophy. Module 2 gives you the toolkit. You\'ll compare Scrum and Kanban, two of the most popular Agile frameworks. Module 3 will dive deeper into the specific Scrum roles.</div></div>',
        '<p><strong>Time estimate:</strong> ~39 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 2: Agile Development Practices
    "mod-2-1": [
      "<h2>Introduction to Agile Practices</h2>",
      "<p>Beyond Scrum, there are several other Agile practices and methodologies that teams commonly use. Each offers unique strengths and can be combined with Scrum for a more comprehensive approach.</p>",

      "<h2>Extreme Programming (XP)</h2>",
      "<p>XP is a methodology focused on <strong>technical excellence</strong> and <strong>customer satisfaction</strong>. Key practices include:</p>",
      "<ul>",
      "<li><strong>Pair Programming</strong> — two developers share one workstation</li>",
      "<li><strong>Test-Driven Development (TDD)</strong> — write tests before code</li>",
      "<li><strong>Continuous Integration</strong> — merge code changes multiple times per day</li>",
      "<li><strong>Refactoring</strong> — improve design without changing behaviour</li>",
      "<li><strong>Simple Design</strong> — the simplest solution that works</li>",
      "</ul>",

      "<h2>Feature-Driven Development (FDD)</h2>",
      "<p>FDD is a model-driven Agile approach that focuses on designing and building features in short iterations. It works well for larger teams and more complex projects because it includes explicit design phases.</p>",

      "<h2>Lean Software Development</h2>",
      "<p>Adapted from Toyota's manufacturing system, Lean principles applied to software include:</p>",
      "<ul>",
      "<li>Eliminate waste (unnecessary code, features, delays)</li>",
      "<li>Amplify learning (short feedback cycles)</li>",
      "<li>Decide as late as possible (defer commitment)</li>",
      "<li>Deliver as fast as possible (quick iterations)</li>",
      "<li>Empower the team (respect people)</li>",
      "<li>Build integrity in (quality from the start)</li>",
      "<li>See the whole (optimize the system, not the parts)</li>",
      "</ul>"
    ].join("\n"),

    "mod-2-2": [
      "<h2>Scrum Framework</h2>",
      "<p>This sub-module provides a deeper dive into the Scrum framework structure, expanding on the introduction from Module 1.</p>",

      "<h2>Scrum Skeleton</h2>",
      "<p>Scrum prescribes:</p>",
      "<ul>",
      "<li><strong>3 Roles:</strong> Product Owner, Scrum Master, Developers</li>",
      "<li><strong>5 Events:</strong> Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective</li>",
      "<li><strong>3 Artifacts:</strong> Product Backlog, Sprint Backlog, Increment</li>",
      "</ul>",

      "<h2>Sprint Cadence</h2>",
      "<p>A Sprint is a timebox of one month or less during which a Done, usable, and potentially releasable product Increment is created. Sprints have consistent durations throughout the development effort. A new Sprint starts immediately after the conclusion of the previous Sprint.</p>",

      "<h2>Scrum Flow</h2>",
      "<ol>",
      "<li><strong>Sprint Planning</strong> — The team selects items from the Product Backlog and plans how to complete them</li>",
      "<li><strong>Sprint Execution</strong> — The team works on the selected items, coordinating daily in the Daily Scrum</li>",
      "<li><strong>Sprint Review</strong> — The team demonstrates what they built and gets feedback</li>",
      "<li><strong>Sprint Retrospective</strong> — The team reflects on the process and identifies improvements</li>",
      "<li>The cycle repeats with the next Sprint Planning</li>",
      "</ol>"
    ].join("\n"),

    "mod-2-3": [
      "<h2>Kanban Methodology</h2>",
      "<p>Kanban (Japanese for 'signboard' or 'billboard') is a visual workflow management method. It originated in Toyota's manufacturing system and was adapted for software development by David Anderson.</p>",

      "<h2>Core Kanban Principles</h2>",
      "<ol>",
      "<li><strong>Visualize the workflow</strong> — Use a board with columns representing workflow stages (To Do, In Progress, Done)</li>",
      "<li><strong>Limit Work in Progress (WIP)</strong> — Restrict how many items can be in progress at once to reduce multitasking</li>",
      "<li><strong>Manage flow</strong> — Monitor and optimize the movement of work through the system</li>",
      "<li><strong>Make process policies explicit</strong> — Define and display the rules of how work moves between stages</li>",
      "<li><strong>Improve collaboratively</strong> — Use data and team insights to improve the process</li>",
      "</ol>",

      // Kanban board visual
      SVG_KANBAN_BOARD,

      "<h2>Kanban vs. Scrum</h2>",
      "<table style=\"width:100%;border-collapse:collapse;font-size:var(--text-sm);margin:var(--space-4) 0;\">",
      "<tr style=\"background:var(--color-bg);\"><th style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);text-align:left;\">Aspect</th><th style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);text-align:left;\">Scrum</th><th style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);text-align:left;\">Kanban</th></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Timeboxing</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Fixed-length Sprints</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Continuous flow</td></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Roles</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">PO, SM, Devs</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">No prescribed roles</td></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">WIP Limits</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Implicit (Sprint scope)</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Explicit</td></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Changes</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Cannot change Sprint scope</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Changes can happen anytime</td></tr>",
      "</table>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Scrumban</strong>Many teams use a hybrid approach called Scrumban — using Scrum's roles and events but Kanban's visual board and WIP limits for flow management.</div></div>"
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3</div>',
        '<h1>Scrum Roles and Responsibilities</h1>',
        '<p class="chapter-intro">Scrum defines three accountabilities: the Product Owner, the Scrum Master, and the Developers. Each has distinct responsibilities that together make the framework work. Understanding these roles — and how they interact — is essential to being an effective team member.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The Product Owner\'s role in maximising value and managing the backlog</li>',
          '<li>The Scrum Master\'s role as servant-leader and process guardian</li>',
          '<li>How Developers self-organise to deliver the Sprint Goal</li>',
          '<li>How Stakeholders interact with the Scrum Team</li>',
          '<li>How these roles collaborate during each Scrum event</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 2</strong>Module 2 introduced Scrum at a high level. Module 3 goes deep into who does what. Module 4 continues with the events and artifacts — the when and what of Scrum.</div></div>',
        '<p><strong>Time estimate:</strong> ~42 minutes of reading + an 8-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 3: Scrum Roles and Responsibilities
    "mod-3-1": [
      "<h2>The Product Owner</h2>",
      "<p>The Product Owner (PO) is the single person responsible for <strong>maximizing the value of the product</strong> resulting from the work of the Development Team. This is a singular role — not a committee.</p>",

      // Scrum roles overview diagram
      SVG_SCRUM_ROLES,

      "<h2>Key Responsibilities</h2>",
      "<ul>",
      "<li><strong>Managing the Product Backlog</strong> — Clearly expressing Product Backlog items, ordering them to best achieve goals, and ensuring the Backlog is visible, transparent, and clear to all.</li>",
      "<li><strong>Defining the Product Goal</strong> — Setting the long-term vision for the product that guides all Sprint work.</li>",
      "<li><strong>Stakeholder Management</strong> — Acting as the primary liaison between stakeholders and the Development Team.</li>",
      "<li><strong>Value Decisions</strong> — Making the final call on priority trade-offs and scope decisions.</li>",
      "</ul>",

      "<h2>PO vs. Product Manager</h2>",
      "<p>In many organizations, the Product Owner role is combined with or supported by a Product Manager. The PO focuses on <strong>backlog refinement and sprint-level decisions</strong>, while a Product Manager may focus on market strategy and customer research. In Scrum, these responsibilities often converge into one person.</p>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Common Antipattern</strong>The PO should not be a 'proxy' who merely relays orders from stakeholders. An effective PO has the authority to make real prioritization decisions.</div></div>"
    ].join("\n"),

    "mod-3-2": [
      "<h2>The Scrum Master</h2>",
      "<p>The Scrum Master is a <strong>servant leader</strong> for the Scrum Team. They are responsible for promoting and supporting Scrum as defined in the Scrum Guide. The SM helps everyone understand Scrum theory, practices, rules, and values.</p>",

      "<h2>Key Responsibilities</h2>",
      "<ul>",
      "<li><strong>Coaching the Team</strong> — Teaching the Development Team self-management and cross-functionality.</li>",
      "<li><strong>Facilitating Events</strong> — Ensuring all Scrum events take place, are productive, and stay within their timebox.</li>",
      "<li><strong>Removing Impediments</strong> — Actively identifying and eliminating blockers that slow the team down.</li>",
      "<li><strong>Protecting the Team</strong> — Shielding the team from external interruptions and pressure during the Sprint.</li>",
      "<li><strong>Coaching the Organization</strong> — Helping stakeholders understand Scrum and the value of empirical process control.</li>",
      "</ul>",

      "<h2>Scrum Master ≠ Project Manager</h2>",
      "<p>Traditional project managers assign tasks, track progress against a plan, and report status upward. Scrum Masters do none of these — they facilitate the team's self-management and remove obstacles. In a Scrum transition, former PMs often find the SM role requires a significant mindset shift.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Servant Leadership</strong>The SM's power comes from influence and service, not authority. The best Scrum Masters make the team better without the team even realizing they were being coached.</div></div>"
    ].join("\n"),

    "mod-3-3": [
      "<h2>The Development Team</h2>",
      "<p>The Development Team consists of professionals who do the work of delivering a potentially releasable Increment of <strong>Done</strong> product at the end of each Sprint. They are self-organizing and cross-functional.</p>",

      "<h2>Characteristics of a Great Dev Team</h2>",
      "<ul>",
      "<li><strong>Self-Organizing</strong> — No one (not even the SM or PO) tells the Dev Team how to turn Product Backlog items into an Increment of value.</li>",
      "<li><strong>Cross-Functional</strong> — The team has all the skills necessary to create a product Increment: design, development, testing, deployment, etc.</li>",
      "<li><strong>Accountable as a Whole</strong> — The entire team shares accountability for delivering on their Sprint commitments.</li>",
      "<li><strong>Stable Membership</strong> — Research shows that stable teams perform better. Frequent churn reduces velocity and cohesion.</li>",
      "<li><strong>Optimal Size</strong> — 3 to 9 people. Smaller teams may lack skills; larger teams struggle with coordination.</li>",
      "</ul>",

      "<h2>No Sub-Teams</h2>",
      "<p>The Scrum Guide explicitly states that there are no sub-teams within the Development Team — no separate QA team, no architecture team, no database team. Everyone works together as one unit. Titles and specializations are recognized (a developer who specializes in security is still a team member first), but accountability is collective.</p>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Cross-Functionality in Practice</strong>A truly cross-functional team can take a feature from idea to deployed, running software without handoffs to external teams. This is the goal — even if it takes time to build the necessary skills.</div></div>"
    ].join("\n"),

    "mod-3-4": [
      "<h2>Stakeholders</h2>",
      "<p>Stakeholders are individuals or groups who have a <strong>vested interest</strong> in the product being built. They are not part of the Scrum Team but are essential to its success. Stakeholders include customers, users, executives, support teams, compliance officers, and anyone affected by the product.</p>",

      "<h2>How Stakeholders Engage with Scrum</h2>",
      "<ul>",
      "<li><strong>Sprint Review</strong> — The primary formal touchpoint. Stakeholders attend the Sprint Review to inspect the Increment and provide feedback that shapes the Product Backlog.</li>",
      "<li><strong>Backlog Refinement</strong> — Stakeholders collaborate with the Product Owner to clarify requirements and priorities.</li>",
      "<li><strong>Transparency</strong> — The Product Backlog is visible to all stakeholders so they can track progress and understand what's coming.</li>",
      "</ul>",

      "<h2>Stakeholder Responsibilities</h2>",
      "<ul>",
      "<li>Provide timely feedback during Sprint Reviews</li>",
      "<li>Respect the Scrum Team's focus during a Sprint (no mid-Sprint scope changes)</li>",
      "<li>Make decisions when needed (e.g., trade-off questions)</li>",
      "<li>Communicate constraints and business priorities clearly</li>",
      "</ul>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Stakeholder Interference</strong>The most common stakeholder antipattern is treating the Daily Scrum as a status-reporting tool or attempting to add scope mid-Sprint. The Scrum Master's role includes protecting the team from these disruptions.</div></div>"
    ].join("\n"),

    // ── MODULE 4 OVERVIEW ────────────────────────────────────────────────
    "mod-4-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 4</div>',
        '<h1>Scrum Events and Artifacts</h1>',
        '<p class="chapter-intro">Scrum\'s strength comes from its defined events (ceremonies) and artifacts. The events create rhythm and inspection points. The artifacts provide transparency. Together they give the team everything needed to deliver value predictably.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The Sprint — Scrum\'s heartbeat and timebox for delivery</li>',
          '<li>Sprint Planning — how the team commits to a Sprint Goal</li>',
          '<li>The Daily Scrum — how the team inspects progress and adapts</li>',
          '<li>Sprint Review — how the team demonstrates value to stakeholders</li>',
          '<li>Sprint Retrospective — how the team improves its process</li>',
          '<li>The Product Backlog, Sprint Backlog, and Increment — what they contain and who owns them</li>',
          '<li>The Definition of Done and why it matters</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 3</strong>Module 3 covered the who (roles). Module 4 covers the when and what (events and artifacts). With this foundation, Module 5 moves into quality — testing and continuous integration within Agile.</div></div>',
        '<p><strong>Time estimate:</strong> ~80 minutes of reading + a 10-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 4: Scrum Events and Artifacts
    "mod-4-1": [
      "<h2>The Sprint</h2>",
      "<p>The Sprint is the <strong>heart of Scrum</strong>. It is a timebox of one month or less during which a Done, usable, and potentially releasable product Increment is created. Sprints have consistent durations throughout a development effort — you don't change Sprint length mid-project.</p>",

      "<h2>Key Rules</h2>",
      "<ul>",
      "<li>A new Sprint starts immediately after the conclusion of the previous Sprint.</li>",
      "<li>All the work necessary to achieve the Product Goal happens within Sprints.</li>",
      "<li>No changes are made that would endanger the Sprint Goal during the Sprint.</li>",
      "<li>Sprint length may be shortened or cancelled by the Product Owner if the Sprint Goal becomes obsolete.</li>",
      "</ul>",

      // Sprint timeline visual
      SVG_SPRINT_TIMELINE,

      "<h2>Why Timeboxing Matters</h2>",
      "<p>Fixed-length Sprints create a predictable rhythm that allows the team to plan, execute, inspect, and adapt. This cadence builds trust with stakeholders who can count on a regular flow of value. It also creates healthy pressure — knowing you have only two weeks to deliver concentrates the mind wonderfully.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Choose Your Cadence</strong>One-week Sprints maximize feedback but increase overhead. Four-week Sprints reduce ceremony but delay feedback. Two weeks is the most common choice for software teams.</div></div>"
    ].join("\n"),

    "mod-4-2": [
      "<h2>Sprint Planning</h2>",
      "<p>Sprint Planning initiates the Sprint by laying out the work to be performed. The plan is created collaboratively by the entire Scrum Team. Sprint Planning is timeboxed to a maximum of <strong>8 hours for a one-month Sprint</strong> (proportionally less for shorter Sprints).</p>",

      "<h2>Three Topics</h2>",
      "<h3>1. Why is this Sprint valuable?</h3>",
      "<p>The Product Owner proposes how the product could increase its value and utility in the upcoming Sprint. The team collaborates on defining a <strong>Sprint Goal</strong> — a single, concise objective for the Sprint.</p>",

      "<h3>2. What can be Done this Sprint?</h3>",
      "<p>The Development Team selects items from the Product Backlog to include in the current Sprint. The team considers past performance, capacity, and the Definition of Done. The team — not the PO or a manager — makes this selection.</p>",

      "<h3>3. How will the chosen work get done?</h3>",
      "<p>For each selected Product Backlog item, the Development Team plans the necessary work. This often involves decomposing items into smaller tasks (hours to a day). The team may or may not create a task board or plan — the key is having a shared understanding of how they'll achieve the Sprint Goal.</p>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Planning Poker</strong>Many teams use Planning Poker (a consensus-based estimation technique) during Sprint Planning to estimate the effort of Backlog items.</div></div>"
    ].join("\n"),

    "mod-4-3": [
      "<h2>Daily Scrum</h2>",
      "<p>The Daily Scrum is a <strong>15-minute event</strong> for the Development Team to inspect progress toward the Sprint Goal and adapt the upcoming planned work. It happens at the same time and place every working day of the Sprint.</p>",

      "<h2>What It Is NOT</h2>",
      "<ul>",
      "<li><strong>Not a status report to management</strong> — Stakeholders may observe but should not participate or use it for accountability.</li>",
      "<li><strong>Not a problem-solving session</strong> — Issues identified during the Daily Scrum are discussed separately (often after the Daily Scrum).</li>",
      "<li><strong>Not a round-robin update</strong> — The team should focus on progress toward the Sprint Goal, not individual status.</li>",
      "</ul>",

      "<h2>Common Formats</h2>",
      "<p>The classic 'three questions' format is:</p>",
      "<ol>",
      "<li>What did I do yesterday that helped the team meet the Sprint Goal?</li>",
      "<li>What will I do today to help the team meet the Sprint Goal?</li>",
      "<li>Do I see any impediment that prevents me or the team from meeting the Sprint Goal?</li>",
      "</ol>",
      "<p>Some teams instead walk the board (moving cards from left to right on the Kanban board), which can be more visual and engaging.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Keep It Sharp</strong>The Daily Scrum is not a stand-up meeting — it is a planning event. Focus on coordination and adjustment, not reporting.</div></div>"
    ].join("\n"),

    "mod-4-4": [
      "<h2>Sprint Review</h2>",
      "<p>The Sprint Review is held at the end of the Sprint to <strong>inspect the Increment</strong> and adapt the Product Backlog. It is timeboxed to a maximum of 4 hours for a one-month Sprint (less for shorter Sprints).</p>",

      "<h2>What Happens at a Sprint Review</h2>",
      "<ul>",
      "<li>The Product Owner explains what Product Backlog items have been Done and what has not been Done.</li>",
      "<li>The Development Team discusses what went well, what problems arose, and how those problems were solved.</li>",
      "<li>The Development Team demonstrates the work that is Done and answers questions about the Increment.</li>",
      "<li>Stakeholders provide feedback and discuss the overall market or product landscape.</li>",
      "<li>The entire group collaborates on what to do next, updating the Product Backlog accordingly.</li>",
      "</ul>",

      "<h2>Review ≠ Demo</h2>",
      "<p>Many teams make the mistake of treating the Sprint Review as a demo-only meeting. The review is a <strong>working session</strong> where the team and stakeholders inspect what was built and adjust priorities collaboratively. It should feel like a conversation, not a presentation.</p>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Encourage Honest Feedback</strong>Stakeholders should feel comfortable saying 'that is not what we needed.' The Sprint Review is a learning opportunity, not an approval gate.</div></div>"
    ].join("\n"),

    "mod-4-5": [
      "<h2>Sprint Retrospective</h2>",
      "<p>The Sprint Retrospective occurs after the Sprint Review and before the next Sprint Planning. It is timeboxed to a maximum of <strong>3 hours for a one-month Sprint</strong>. Its purpose is to inspect how the last Sprint went with regards to people, relationships, process, and tools, and create a plan for improvements.</p>",

      "<h2>Retrospective Structure</h2>",
      "<ol>",
      "<li><strong>Set the stage</strong> — Create a safe environment for open discussion. Establish confidentiality and a blameless culture.</li>",
      "<li><strong>Gather data</strong> — Collect facts about what happened during the Sprint (metrics, events, observations).</li>",
      "<li><strong>Generate insights</strong> — Analyze the data to identify root causes of successes and failures.</li>",
      "<li><strong>Decide what to do</strong> — Select the most impactful improvements and turn them into actionable experiments.</li>",
      "<li><strong>Close</strong> — Summarize the outcomes and celebrate successes.</li>",
      "</ol>",

      "<h2>Common Retrospective Formats</h2>",
      "<ul>",
      "<li><strong>Start / Stop / Continue</strong> — What should we start doing, stop doing, and continue doing?</li>",
      "<li><strong>Mad / Sad / Glad</strong> — What made us mad, sad, and glad during the Sprint?</li>",
      "<li><strong>4Ls</strong> — What did we Love, Learn, Lack, and Long for?</li>",
      "<li><strong>Sailboat</strong> — What is the wind (helping us) and what are the anchors (slowing us down)?</li>",
      "</ul>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Action Items</strong>The most common pitfall is having a great conversation but taking no action. Every Retrospective should produce at least one actionable improvement committed to by the team.</div></div>"
    ].join("\n"),

    "mod-4-6": [
      "<h2>Product Backlog</h2>",
      "<p>The Product Backlog is an <strong>ordered list of everything that might be needed</strong> in the product. It is the single source of requirements for any changes to be made to the product. The Product Owner is responsible for the Product Backlog, including its content, availability, and ordering.</p>",

      "<h2>Characteristics</h2>",
      "<ul>",
      "<li><strong>Emergent</strong> — The Backlog is never complete. It evolves as the product, market, and technology change.</li>",
      "<li><strong>Ordered</strong> — Items at the top (highest priority) are more urgent and better refined than items at the bottom.</li>",
      "<li><strong>Transparent</strong> — Visible to all stakeholders. Anyone can see what is planned and in what order.</li>",
      "<li><strong>Dynamically Refined</strong> — Items are regularly refined through Backlog Refinement sessions (typically 5-10% of the Sprint's capacity).</li>",
      "</ul>",

      "<h2>User Stories</h2>",
      "<p>Most Product Backlogs use <strong>User Stories</strong> as the format for Backlog items. A standard user story template is:</p>",
      "<blockquote>As a [user role], I want [goal] so that [reason].</blockquote>",
      "<p>Good user stories follow the <strong>INVEST</strong> mnemonic: Independent, Negotiable, Valuable, Estimable, Small, Testable.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Definition of Ready</strong>Many teams define a 'Definition of Ready' to ensure Backlog items are sufficiently refined before they enter a Sprint. This is a team-level agreement, not a Scrum rule.</div></div>"
    ].join("\n"),

    "mod-4-7": [
      "<h2>Sprint Backlog</h2>",
      "<p>The Sprint Backlog is a plan — <strong>visible in real time</strong> — created by the Development Team for the current Sprint. It includes the selected Product Backlog items (the 'what') plus a plan for delivering them (the 'how').</p>",

      "<h2>Properties</h2>",
      "<ul>",
      "<li>It belongs to the Development Team — only they can change it during the Sprint.</li>",
      "<li>It is highly visible — anyone can see what the team is working on and what remains.</li>",
      "<li>It is updated throughout the Sprint as the team discovers more about the work needed.</li>",
      "<li>The Sprint Goal is the 'why' — the cohesive objective that ties the selected items together.</li>",
      "</ul>",

      "<h2>Daily Updates</h2>",
      "<p>The Sprint Backlog is not a static document. During the Daily Scrum, the team inspects progress and may adjust the Sprint Backlog. If new work is discovered, it is added; if planned work turns out to be unnecessary, it is removed. The Sprint Backlog is always a reflection of the team's current best understanding of the work needed to meet the Sprint Goal.</p>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Visibility Tools</strong>Most teams use a physical or digital board (Jira, Trello, Azure Boards) to visualize the Sprint Backlog. Columns typically include To Do, In Progress, and Done — though teams may add more stages as needed.</div></div>"
    ].join("\n"),

    "mod-4-8": [
      "<h2>Increment & Definition of Done</h2>",
      "<p>The <strong>Increment</strong> is the sum of all Product Backlog items completed during a Sprint, combined with all previous Sprints. At the end of a Sprint, the new Increment must be Done, usable, and meet the Definition of Done.</p>",

      "<h2>Definition of Done (DoD)</h2>",
      "<p>The Definition of Done is a <strong>formal description of the state of the Increment</strong> when it meets the quality measures required for the product. If a Product Backlog item does not meet the DoD, it cannot be released or presented at the Sprint Review.</p>",

      "<h2>Sample DoD for a Software Team</h2>",
      "<ul>",
      "<li>Code is written and peer-reviewed</li>",
      "<li>Automated unit tests pass with 80%+ coverage</li>",
      "<li>Integration tests pass</li>",
      "<li>Feature has been tested in a staging environment</li>",
      "<li>Documentation (if applicable) is updated</li>",
      "<li>No known critical or high-severity defects</li>",
      "<li>Product Owner has accepted the work</li>",
      "</ul>",

      "<h2>Why DoD Matters</h2>",
      "<p>The DoD creates a shared understanding of what 'Done' means. Without it, teams waste time debating whether work is complete. It also builds trust with stakeholders who can rely on a consistent quality standard. If the organization has a DoD, all Scrum Teams must follow it as a minimum; individual teams may add stricter criteria.</p>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Undone Work</strong>If the DoD is not met, the work is not an Increment. It should remain in the Product Backlog for a future Sprint, or the team may negotiate a smaller scope for the Sprint.</div></div>"
    ].join("\n"),

    // ── MODULE 5 OVERVIEW ────────────────────────────────────────────────
    "mod-5-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 5</div>',
        '<h1>Agile Testing and Continuous Integration</h1>',
        '<p class="chapter-intro">Quality is not a phase at the end — it\'s built in throughout the Sprint. This module covers how Agile teams test continuously, from unit tests to exploratory testing, and how Continuous Integration pipelines catch regressions before they reach production.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The Agile Testing Quadrants framework and how to use it</li>',
          '<li>Test-Driven Development (TDD) — writing tests before code</li>',
          '<li>How CI/CD pipelines automate build, test, and deployment</li>',
          '<li>When to automate vs. when to test manually</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 4</strong>Now that you understand Scrum\'s rhythm (Module 4), Module 5 shows you how testing and quality practices integrate into that rhythm. Module 6 looks at taking Agile beyond a single team.</div></div>',
        '<p><strong>Time estimate:</strong> ~49 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 5: Agile Testing and Continuous Integration
    "mod-5-1": [
      "<h2>Agile Testing Quadrants</h2>",
      "<p>The Agile Testing Quadrants, created by Brian Marick, provide a <strong>mental model</strong> for thinking about testing in Agile projects. They help teams ensure they have a balanced testing strategy covering both business-facing and technology-facing tests, at both the product and system level.</p>",

      // Testing Quadrants SVG diagram
      SVG_TESTING_QUADRANTS,

      "<h2>The Four Quadrants</h2>",
      "<table style=\"width:100%;border-collapse:collapse;font-size:var(--text-sm);margin:var(--space-4) 0;\">",
      "<tr style=\"background:var(--color-bg);\"><th style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Quadrant</th><th style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Focus</th><th style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Examples</th></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);font-weight:bold;\">Q1</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Technology-facing — supporting the team</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Unit tests, component tests</td></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);font-weight:bold;\">Q2</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Business-facing — supporting the team</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Functional tests, story tests, prototypes</td></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);font-weight:bold;\">Q3</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Business-facing — critiquing the product</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Exploratory testing, usability testing, UAT</td></tr>",
      "<tr><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);font-weight:bold;\">Q4</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Technology-facing — critiquing the product</td><td style=\"padding:var(--space-2) var(--space-3);border:1px solid var(--color-border);\">Performance testing, security testing, stress testing</td></tr>",
      "</table>",

      "<p>The quadrants are not phases — they are a checklist. A healthy Agile testing strategy includes coverage across all four quadrants, with the appropriate emphasis depending on the context.</p>"
    ].join("\n"),

    "mod-5-2": [
      "<h2>Test-Driven Development (TDD)</h2>",
      "<p>Test-Driven Development is a <strong>coding practice</strong> where you write a failing test before writing the production code. The mantra is: <strong>Red — Green — Refactor</strong>.</p>",

      "<h2>The TDD Cycle</h2>",
      "<ol>",
      "<li><strong>Red</strong> — Write a test that fails. The test defines a new function or improvement, and it should fail because the feature doesn't exist yet.</li>",
      "<li><strong>Green</strong> — Write the minimum amount of production code to make the test pass. Don't worry about elegance yet — just pass the test.</li>",
      "<li><strong>Refactor</strong> — Clean up the code, removing duplication and improving design, while keeping all tests green.</li>",
      "<li>Repeat for the next requirement.</li>",
      "</ol>",

      // TDD Cycle diagram
      SVG_TDD_CYCLE,

      "<h2>Benefits of TDD</h2>",
      "<ul>",
      "<li><strong>Better Design</strong> — Writing tests first forces you to think about interfaces and contracts before implementation.</li>",
      "<li><strong>Living Documentation</strong> — Tests serve as executable documentation of what the system does.</li>",
      "<li><strong>Regression Safety Net</strong> — A comprehensive test suite means you can refactor with confidence.</li>",
      "<li><strong>Reduced Debug Time</strong> — Bugs are caught within minutes, not weeks.</li>",
      "</ul>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>TDD ≠ Testing</strong>TDD is a design technique that produces tests as a byproduct. The primary benefit is better code design, not just automated testing.</div></div>"
    ].join("\n"),

    "mod-5-3": [
      "<h2>Continuous Integration Pipeline</h2>",
      "<p>Continuous Integration (CI) is a development practice where developers <strong>merge code changes into a shared repository frequently</strong> — ideally multiple times per day. Each merge triggers an automated build and test sequence to detect problems early.</p>",

      "<h2>Key Practices</h2>",
      "<ul>",
      "<li><strong>Frequent Commits</strong> — Push code at least once per day, preferably after each small, focused change.</li>",
      "<li><strong>Automated Build</strong> — Every commit triggers an automated build on the CI server.</li>",
      "<li><strong>Automated Tests</strong> — The build runs unit tests, integration tests, and often static analysis.</li>",
      "<li><strong>Fast Feedback</strong> — The build should complete in under 10 minutes. Long builds discourage frequent commits.</li>",
      "<li><strong>Fix Broken Builds Immediately</strong> — A broken build is the team's top priority. No one commits new code until the build is green.</li>",
      "</ul>",

      "<h2>Typical CI Pipeline</h2>",
      "<ol>",
      "<li>Developer commits code to the shared repository</li>",
      "<li>CI server detects the change and pulls the latest code</li>",
      "<li>Server compiles the code and runs unit tests</li>",
      "<li>If tests pass, the code is deployed to a staging environment for integration tests</li>",
      "<li>If all stages pass, the team gets a green build notification</li>",
      "<li>If any stage fails, the team is notified immediately</li>",
      "</ol>",

      // CI/CD pipeline flow diagram
      SVG_CI_CD_PIPELINE,

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>CI is not CD</strong>Continuous Integration (merging and testing) is different from Continuous Delivery or Continuous Deployment (automatically releasing to production). CI is a prerequisite for both.</div></div>"
    ].join("\n"),

    "mod-5-4": [
      "<h2>Automated vs. Manual Testing</h2>",
      "<p>A balanced Agile testing strategy uses <strong>both automated and manual testing</strong>. The goal is not 100% automation — it is the most effective testing approach for your context.</p>",

      "<h2>When to Automate</h2>",
      "<ul>",
      "<li><strong>Regression tests</strong> — Tests that must run repeatedly (every build, every Sprint).</li>",
      "<li><strong>Unit and integration tests</strong> — Fast, deterministic checks that catch breaking changes.</li>",
      "<li><strong>Performance benchmarks</strong> — Tests that need precise, repeatable measurements.</li>",
      "<li><strong>Data validation</strong> — Checking large datasets or API contracts.</li>",
      "</ul>",

      "<h2>When Manual Testing is Essential</h2>",
      "<ul>",
      "<li><strong>Exploratory testing</strong> — Learning the system by using it creatively to find unexpected issues.</li>",
      "<li><strong>Usability testing</strong> — Evaluating whether the interface is intuitive and user-friendly.</li>",
      "<li><strong>Visual testing</strong> — Checking layout, color, and visual consistency that automated tools struggle with.</li>",
      "<li><strong>Edge cases</strong> — Novel scenarios that automated scripts may not cover.</li>",
      "</ul>",

      "<h2>The Test Automation Pyramid</h2>",
      "<p>Mike Cohn's Test Automation Pyramid recommends: <strong>many unit tests (base), some integration tests (middle), few UI/end-to-end tests (top)</strong>. This ensures fast feedback (unit tests run in milliseconds) while still covering critical user journeys.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Shift Left</strong>Testing earlier in the development process (shift left) reduces the cost of defects. Automate what you can, test manually what you must, and move testing activities earlier in each Sprint.</div></div>"
    ].join("\n"),

    // ── MODULE 6 OVERVIEW ────────────────────────────────────────────────
    "mod-6-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 6</div>',
        '<h1>Scaling Agile</h1>',
        '<p class="chapter-intro">Agile was designed for small, co-located teams. But what happens when you have 50, 500, or 5,000 people? This module explores the most popular scaling frameworks and helps you understand when scaling is necessary — and when it\'s not.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>Scrum of Scrums — the simplest way to coordinate multiple Scrum teams</li>',
          '<li>SAFe (Scaled Agile Framework) — the most widely adopted enterprise framework</li>',
          '<li>LeSS (Large-Scale Scrum) — a minimalist approach to scaling</li>',
          '<li>When to scale — and the warning signs that you\'re scaling prematurely</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 5</strong>With strong team-level practices established (Modules 1-5), Module 6 looks at the organisational level. Module 7 covers how to measure and monitor Agile teams at any scale.</div></div>',
        '<p><strong>Time estimate:</strong> ~45 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 6: Scaling Agile
    "mod-6-1": [
      "<h2>Scrum of Scrums</h2>",
      "<p>Scrum of Scrums (SoS) is a <strong>scaling technique</strong> for coordinating multiple Scrum teams working on the same product. It is a meta-meeting where representatives from each team meet to report progress, discuss coordination issues, and resolve cross-team dependencies.</p>",

      "<h2>How It Works</h2>",
      "<ul>",
      "<li>Each team sends an ambassador (typically a developer, not necessarily the SM) to the SoS meeting.</li>",
      "<li>Meetings are usually held 2-3 times per week.</li>",
      "<li>Focus is on cross-team concerns, not individual team status.</li>",
      "<li>The structure mirrors the Daily Scrum but at the inter-team level.</li>",
      "</ul>",

      "<h2>Common SoS Questions</h2>",
      "<ol>",
      "<li>What has our team done since the last SoS that affects other teams?</li>",
      "<li>What will our team do before the next SoS that might affect other teams?</li>",
      "<li>What dependencies or issues does our team have with other teams?</li>",
      "</ol>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Scrum of Scrums is Scrum</strong>The SoS is not a separate framework — it is a simple extension of Scrum for multiple teams. Each individual team still follows Scrum as defined in the Scrum Guide.</div></div>"
    ].join("\n"),

    "mod-6-2": [
      "<h2>SAFe (Scaled Agile Framework)</h2>",
      "<p>SAFe is a <strong>commercial scaling framework</strong> developed by Dean Leffingwell. It provides a detailed, structured approach to scaling Agile across large enterprises with hundreds or thousands of people.</p>",

      "<h2>Key Concepts</h2>",
      "<ul>",
      "<li><strong>Agile Release Train (ART)</strong> — A long-lived team of Agile teams (50-125 people) that plans, commits, and executes together.</li>",
      "<li><strong>Program Increment (PI)</strong> — A fixed timebox (typically 8-12 weeks) during which ARTs deliver value.</li>",
      "<li><strong>PI Planning</strong> — A large, multi-day event where all teams in an ART plan together, identify dependencies, and set goals.</li>",
      "<li><strong>Solution Train</strong> — For even larger systems, a meta-level ART that coordinates multiple ARTs.</li>",
      "</ul>",

      "<h2>Pros and Cons</h2>",
      "<p><strong>Pros:</strong> Provides clear structure for large organizations; aligns with portfolio management; has extensive training and certification programs.</p>",
      "<p><strong>Cons:</strong> Can be overly prescriptive; requires significant organizational investment; critics argue it adds too much process overhead.</p>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>SAFe is Controversial</strong>Some Agile purists argue SAFe is 'Waterfall with Agile labels' because of its top-down planning and fixed PI boundaries. Evaluate whether your organization truly needs this level of structure before adopting it.</div></div>"
    ].join("\n"),

    "mod-6-3": [
      "<h2>LeSS (Large-Scale Scrum)</h2>",
      "<p>LeSS (pronounced 'less') is a <strong>minimalist scaling framework</strong> built on top of standard Scrum. Created by Craig Larman and Bas Vodde, LeSS applies Scrum principles to multiple teams working on the same product, adding as little additional process as possible.</p>",

      "<h2>LeSS Principles</h2>",
      "<ul>",
      "<li><strong>More with Less</strong> — Start with standard Scrum and add only what is absolutely necessary for coordination.</li>",
      "<li><strong>Whole Product Focus</strong> — All teams work from a single Product Backlog with one Product Owner.</li>",
      "<li><strong>One Sprint, One Product</strong> — All teams synchronize on the same Sprint cadence.</li>",
      "<li><strong>Cross-Team Coordination</strong> — Teams coordinate directly rather than through a single project manager.</li>",
      "</ul>",

      "<h2>LeSS vs. SAFe</h2>",
      "<p>LeSS is fundamentally different from SAFe. Where SAFe adds layers of roles and events, LeSS removes them. LeSS keeps the three Scrum roles (PO, SM, Devs) but scales the events — for example, Sprint Planning involves all teams together and then splits into team-level breakout sessions.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Choose Wisely</strong>LeSS works well when all teams work on the same product. SAFe may be better when you need to coordinate multiple related products or include non-development functions (HR, finance, marketing) in the Agile transformation.</div></div>"
    ].join("\n"),

    "mod-6-4": [
      "<h2>When to Scale</h2>",
      "<p>Many organizations rush to scale Agile before understanding it. The first question should always be: <strong>do you actually need to scale?</strong></p>",

      "<h2>Signs You May Need to Scale</h2>",
      "<ul>",
      "<li>Your product requires more than 9 people to deliver (the maximum Scrum team size)</li>",
      "<li>You have multiple Scrum teams working on the same codebase</li>",
      "<li>Cross-team dependencies are causing frequent delays</li>",
      "<li>Communication overhead is consuming significant time</li>",
      "</ul>",

      "<h2>Signs You Should NOT Scale Yet</h2>",
      "<ul>",
      "<li>Your single team is still learning Scrum basics</li>",
      "<li>You have not yet achieved a stable Definition of Done</li>",
      "<li>Your Sprint Reviews and Retrospectives are not producing actionable outcomes</li>",
      "<li>Management is still using a command-and-control style</li>",
      "</ul>",

      "<h2>Scale Incrementally</h2>",
      "<p>When you do need to scale, do it incrementally. Start with Scrum of Scrums. If that's not enough, explore LeSS or Nexus before jumping to SAFe. The simplest solution that works is the right one.</p>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Conway's Law</strong>'Organizations design systems that mirror their communication structure.' If your scaled Agile approach requires complex coordination mechanisms, consider whether team structure changes might solve the problem more directly.</div></div>"
    ].join("\n"),

    // ── MODULE 7 OVERVIEW ────────────────────────────────────────────────
    "mod-7-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 7</div>',
        '<h1>Agile Metrics and Monitoring Progress</h1>',
        '<p class="chapter-intro">What gets measured gets managed. Agile teams use a specific set of metrics to track progress, forecast delivery, and identify process bottlenecks. This module covers the essential metrics every Agile practitioner should know.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>Velocity — how to measure and use team throughput</li>',
          '<li>Burndown and Burnup charts — tracking progress within a Sprint and across releases</li>',
          '<li>Cycle Time and Lead Time — measuring how fast work flows through the system</li>',
          '<li>Cumulative Flow Diagrams — visualising bottlenecks and work-in-progress</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 6</strong>After learning how Agile scales (Module 6), Module 7 gives you the tools to measure whether scaled teams are actually improving. Module 8 explores advanced Agile topics for senior practitioners.</div></div>',
        '<p><strong>Time estimate:</strong> ~42 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 7: Agile Metrics and Monitoring Progress
    "mod-7-1": [
      "<h2>Velocity</h2>",
      "<p>Velocity is a measure of how much work a team <strong>completes</strong> in a Sprint, typically expressed in story points. It is the most commonly tracked Agile metric — and one of the most commonly misused.</p>",

      "<h2>How to Measure Velocity</h2>",
      "<p>At the end of each Sprint, sum the story points of all completed (Done) Product Backlog items. Track this over 3-5 Sprints to find a stable average. Use this average for Sprint planning forecasts — not as a performance target.</p>",

      "<h2>Common Misuses</h2>",
      "<ul>",
      "<li><strong>Using velocity to compare teams</strong> — Story points are team-specific. Comparing velocities across teams is meaningless and destructive.</li>",
      "<li><strong>Setting velocity targets</strong> — 'You delivered 30 points last Sprint, so you must deliver at least 30 this Sprint.' This encourages inflation and gaming.</li>",
      "<li><strong>Tying velocity to performance reviews</strong> — This guarantees the metric will be gamed and trust will be broken.</li>",
      "</ul>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Velocity is a Forecast Tool</strong>Velocity exists to help the team plan, not to judge productivity. A team that delivers consistent velocity is predictable — and predictability is the goal.</div></div>"
    ].join("\n"),

    "mod-7-2": [
      "<h2>Burndown / Burnup Charts</h2>",
      "<p>Burndown and burnup charts are <strong>visual progress-tracking tools</strong> used during a Sprint. They show remaining work (burndown) or completed work (burnup) over time.</p>",

      "<h2>Burndown Chart</h2>",
      "<p>A burndown chart has <strong>time on the X-axis</strong> and <strong>remaining effort on the Y-axis</strong> (in story points or hours). The ideal trend line descends from top-left to bottom-right, reaching zero at Sprint end. The actual line shows the team's real progress. If the actual line is above the ideal line, the team is behind schedule.</p>",

      // Burndown chart SVG
      SVG_BURNDOWN,

      "<h2>Burnup Chart</h2>",
      "<p>A burnup chart has <strong>two lines</strong>: total work (which may increase if scope is added) and completed work. When the two lines meet, the Sprint Goal is achieved. Burnup charts are often preferred because they visually represent scope changes.</p>",

      "<h2>What to Look For</h2>",
      "<ul>",
      "<li><strong>A flat burndown</strong> — The team is not making progress. Investigate blockers.</li>",
      "<li><strong>A spike up mid-Sprint</strong> — New work was added. This should be rare in Scrum.</li>",
      "<li><strong>A sharp drop near the end</strong> — Work was completed in a batch rather than incrementally. This risks quality issues.</li>",
      "</ul>"
    ].join("\n"),

    "mod-7-3": [
      "<h2>Cycle Time & Lead Time</h2>",
      "<p>These Kanban-origin metrics measure the <strong>time it takes for work to flow through the system</strong>.</p>",

      "<h2>Definitions</h2>",
      "<ul>",
      "<li><strong>Lead Time</strong> — The total time from when a request is made (added to the backlog) until it is delivered (accepted as Done).</li>",
      "<li><strong>Cycle Time</strong> — The time from when work actually begins on an item until it is completed. This excludes time spent waiting in the backlog.</li>",
      "</ul>",

      "<h2>Why These Metrics Matter</h2>",
      "<p>Lead time measures the <strong>customer's experience</strong> (how long they wait for a feature), while cycle time measures the <strong>team's efficiency</strong> (how long it takes to do the work). Reducing both is usually a good goal, but focus on cycle time first — you can't control how long items sit in the backlog without process changes.</p>",

      "<h2>Little's Law</h2>",
      "<p>Little's Law states: <strong>Cycle Time = WIP / Throughput</strong>. To reduce cycle time, either reduce WIP (limit work in progress) or increase throughput. Since throughput is hard to increase, reducing WIP is usually the most effective lever.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Predictability</strong>Once you have stable lead time data, you can make reliable delivery promises to stakeholders: 'Features of this size typically take us 2-3 weeks from request to delivery.'</div></div>"
    ].join("\n"),

    "mod-7-4": [
      "<h2>Cumulative Flow Diagrams</h2>",
      "<p>A Cumulative Flow Diagram (CFD) is a <strong>visual chart</strong> showing the quantity of work in each workflow state (To Do, In Progress, Done) over time. It provides a high-level view of the health of the team's workflow.</p>",

      "<h2>Reading a CFD</h2>",
      "<ul>",
      "<li>The X-axis shows time; the Y-axis shows the number of work items.</li>",
      "<li>Colored bands represent each workflow state.</li>",
      "<li>The <strong>width of each band</strong> indicates the WIP in that state at any point in time.</li>",
      "<li>The <strong>slope of the top band</strong> shows overall throughput.</li>",
      "</ul>",

      "<h2>What to Look For</h2>",
      "<ul>",
      "<li><strong>Widening bands</strong> — WIP is increasing in a state, indicating a bottleneck. For example, if 'In Testing' keeps expanding, tests are the limiting factor.</li>",
      "<li><strong>Flat slopes</strong> — No work is being completed. The process may be blocked.</li>",
      "<li><strong>Steady, parallel bands</strong> — A healthy, predictable flow. Work moves smoothly through the system.</li>",
      "</ul>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>CFDs for Retrospectives</strong>Cumulative Flow Diagrams are excellent tools for Sprint Retrospectives. They provide objective data to ground discussions about process bottlenecks, flow efficiency, and improvement experiments.</div></div>"
    ].join("\n"),

    // ── MODULE 8 OVERVIEW ────────────────────────────────────────────────
    "mod-8-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 8</div>',
        '<h1>Advanced Topics in Agile</h1>',
        '<p class="chapter-intro">Agile doesn\'t exist in a vacuum. Real-world constraints like contracts, distributed teams, non-software contexts, and the DevOps movement all shape how Agile is practiced. This module prepares you for the complexities you\'ll face as a seasoned practitioner.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How Agile contracts and governance work in regulated environments</li>',
          '<li>Strategies for making distributed and remote Agile teams effective</li>',
          '<li>How Agile principles apply outside software (marketing, HR, operations)</li>',
          '<li>How DevOps practices complement and extend Agile delivery</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Modules 1-7</strong>Everything you\'ve learned so far prepares you for these real-world discussions. Module 9 closes the course with hands-on simulations and a final exam to cement your knowledge.</div></div>',
        '<p><strong>Time estimate:</strong> ~44 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // Module 8: Advanced Topics in Agile
    "mod-8-1": [
      "<h2>Agile Contracts and Governance</h2>",
      "<p>Traditional fixed-price, fixed-scope contracts are <strong>fundamentally at odds with Agile</strong> because they assume requirements can be fully defined upfront. Agile contracts are designed to align incentives with value delivery, not scope compliance.</p>",

      "<h2>Agile Contract Models</h2>",
      "<ul>",
      "<li><strong>Time & Materials</strong> — The client pays for actual time and materials. High trust, flexible scope, but risky for the client without oversight.</li>",
      "<li><strong>Fixed Price + Iterative</strong> — Fixed price for a fixed timebox (e.g., 2-week Sprint), with variable scope. The client selects the highest-value work each Sprint.</li>",
      "<li><strong>Money for Nothing, Change for Free</strong> — The client can cancel early (paying a termination fee) or add scope without penalty. Vendor earns higher margin for early delivery.</li>",
      "<li><strong>Outcome-Based</strong> — Payment tied to business outcomes (e.g., 10% increase in conversion rate) rather than output. Requires strong trust and measurement capability.</li>",
      "</ul>",

      "<h2>Governance in Agile</h2>",
      "<p>Agile governance shifts from <strong>process compliance</strong> to <strong>value assurance</strong>. Instead of checking whether the team followed a plan, governance asks: Are we building the right thing? Are we building it well? How do we know? Regular Sprint Reviews and transparent Backlogs become the primary governance mechanism.</p>"
    ].join("\n"),

    "mod-8-2": [
      "<h2>Distributed Teams in Agile</h2>",
      "<p>Agile was originally designed for <strong>co-located teams</strong>, but modern software development is increasingly distributed. The 2020s showed that Agile can work remotely — but it requires deliberate adaptation.</p>",

      "<h2>Challenges</h2>",
      "<ul>",
      "<li><strong>Communication lag</strong> — Text-based communication lacks the bandwidth of face-to-face conversation (Principle #6: 'The most efficient method is face-to-face conversation').</li>",
      "<li><strong>Time zone differences</strong> — Limited overlap hours compress collaboration windows.</li>",
      "<li><strong>Trust and visibility</strong> — Remote teams struggle with 'out of sight, out of mind' dynamics.</li>",
      "<li><strong>Informal communication</strong> — Water-cooler conversations and hallway decisions don't happen naturally.</li>",
      "</ul>",

      "<h2>Practices for Remote Teams</h2>",
      "<ul>",
      "<li><strong>Over-communicate</strong> — Write decisions down. Record standups. Keep a running decisions log.</li>",
      "<li><strong>Use video for ceremonies</strong> — Sprint Planning, Review, and Retrospective should all be video calls, not audio-only.</li>",
      "<li><strong>Create async feedback loops</strong> — Loom videos, written design docs, and shared boards.</li>",
      "<li><strong>Time zone overlap</strong> — Establish a core collaboration window (minimum 4 hours) where the whole team is available.</li>",
      "<li><strong>Virtual social time</strong> — Schedule non-work time for team bonding (coffee chats, games, show-and-tell).</li>",
      "</ul>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Remote ≠ Async</strong>Remote-first does not mean async-only. Synchronous communication (video calls, pair programming) is still essential for complex discussions and collaboration.</div></div>"
    ].join("\n"),

    "mod-8-3": [
      "<h2>Agile in Non-Software Contexts</h2>",
      "<p>While Agile originated in software development, its principles have been successfully applied to <strong>marketing, HR, education, healthcare, and even construction</strong>. The core ideas — iterative progress, customer focus, collaboration — are domain-agnostic.</p>",

      "<h2>Examples</h2>",
      "<ul>",
      "<li><strong>Marketing Teams</strong> — Using Sprints to plan and execute campaigns, with Daily Scrums to coordinate and Sprint Reviews to analyze campaign performance.</li>",
      "<li><strong>HR Departments</strong> — Applying Kanban to recruitment pipelines, visualizing candidate stages, and limiting WIP to reduce time-to-hire.</li>",
      "<li><strong>Educational Curriculum Design</strong> — Iteratively developing course content with frequent student feedback cycles acting as 'Sprint Reviews.'</li>",
      "<li><strong>Hardware Development</strong> — Tesla and SpaceX use iterative development for hardware, with rapid prototyping cycles that mirror Agile sprints.</li>",
      "</ul>",

      "<h2>Adapting Ceremonies</h2>",
      "<p>When applying Agile outside software, adapt the ceremonies to the domain. A marketing team's 'Sprint Review' might be a campaign performance analysis. An HR team's 'Daily Scrum' might be a quick standup focused on recruitment pipeline status. Preserve the intent (inspect and adapt) rather than the software-specific form.</p>"
    ].join("\n"),

    "mod-8-4": [
      "<h2>DevOps and Agile</h2>",
      "<p>DevOps is not a separate methodology — it is a <strong>natural extension of Agile</strong> principles into operations and infrastructure. Where Agile broke down the wall between business and development, DevOps breaks down the wall between development and operations.</p>",

      "<h2>The Three Ways of DevOps</h2>",
      "<ol>",
      "<li><strong>Flow</strong> — Optimize the flow of work from development to operations to the customer. This means small batch sizes, reducing handoffs, and automating the deployment pipeline.</li>",
      "<li><strong>Feedback</strong> — Create short feedback loops so that operations issues are detected and fixed immediately. Monitoring, alerting, and incident response are first-class concerns.</li>",
      "<li><strong>Continuous Learning</strong> — Foster a culture of experimentation and learning. Blameless postmortems, chaos engineering, and regular retrospectives drive improvement.</li>",
      "</ol>",

      "<h2>How DevOps Supports Agile</h2>",
      "<ul>",
      "<li><strong>Faster delivery</strong> — CI/CD pipelines enable multiple deployments per day, matching Agile's principle of frequent delivery.</li>",
      "<li><strong>Reduced risk</strong> — Automated testing and deployment make each release safer and less stressful.</li>",
      "<li><strong>Shared ownership</strong> — Developers are responsible for their code in production: 'you build it, you run it.'</li>",
      "<li><strong>Infrastructure as Code</strong> — Treating infrastructure like software (versioned, tested, automated) enables Agile principles in the operations domain.</li>",
      "</ul>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>DevOps is Culture, Too</strong>Like Agile, DevOps is primarily a cultural movement. The tools (Docker, Kubernetes, Jenkins) support the culture, not the other way around.</div></div>"
    ].join("\n"),

    // ── MODULE 9 OVERVIEW ────────────────────────────────────────────────
    "mod-9-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 9 — Final Assessment</div>',
        '<h1>Case Studies and Practical Application</h1>',
        '<p class="chapter-intro">This final module puts everything together. You\'ll work through hands-on simulations: an end-to-end Scrum project, a Sprint Retrospective exercise, and a Backlog Refinement workshop. Then you\'ll take the comprehensive final exam to earn your certificate.</p>',
        '<h2>What You\'ll Do</h2>',
        '<ul>',
          '<li>Simulate a full Sprint cycle from Planning to Retrospective</li>',
          '<li>Facilitate a Retrospective exercise using real team scenarios</li>',
          '<li>Run a Backlog Refinement workshop with user stories and acceptance criteria</li>',
          '<li>Pass the final exam to demonstrate your mastery of Agile and Scrum</li>',
        '</ul>',
        '<div class="callout warn"><strong class="callout-icon">🎯</strong><div class="callout-body"><strong>How to Prepare</strong>Review your notes from Modules 1-8, especially: Scrum events and artifacts (Module 4), Agile testing practices (Module 5), and metrics (Module 7). The final exam draws from all modules.</div></div>',
        '<p><strong>Pass mark:</strong> You need 80% on the 20-question final exam to earn your certificate.</p>',
      '</div>',
    ].join("\n"),

    // Module 9: Case Studies and Practical Application
    "mod-9-1": [
      "<h2>End-to-End Scrum Simulation</h2>",
      "<p>This exercise walks you through a <strong>complete Scrum Sprint cycle</strong> from the perspective of a developer on a Scrum team. You can run this simulation with your team or as a self-guided thought exercise.</p>",

      "<h2>Scenario</h2>",
      "<p>You are a developer on a 5-person team building an e-commerce checkout system. Your Product Owner has defined the Sprint Goal: 'Allow customers to complete a purchase using a saved credit card.' The Sprint length is 2 weeks.</p>",

      "<h2>Phase 1: Sprint Planning (2 hours)</h2>",
      "<p>Review the Product Backlog with the PO. The top items are: (1) Saved payment UI, (2) Tokenize card API integration, (3) 'Use saved card' checkout flow, (4) Payment confirmation screen. The team estimates and selects items. <strong>Your task:</strong> Write a Sprint Backlog with task breakdowns for the first two items.</p>",

      "<h2>Phase 2: Sprint Execution (10 days)</h2>",
      "<p>Each day starts with the Daily Scrum. You identify a blocker: the payment gateway's sandbox is down. <strong>Your task:</strong> Write how you would raise this impediment and describe what the Scrum Master should do next.</p>",

      "<h2>Phase 3: Sprint Review (1 hour)</h2>",
      "<p>You demonstrate the saved payment flow. A stakeholder asks if it can also support PayPal. <strong>Your task:</strong> Describe how the PO should handle this new request — should it go in the current Sprint?</p>",

      "<h2>Phase 4: Sprint Retrospective (45 min)</h2>",
      "<p>The team discusses what went well (good collaboration) and what didn't (unplanned support tasks disrupted focus). <strong>Your task:</strong> Propose two actionable improvement experiments for the next Sprint.</p>",

      "<div class=\"callout tip\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Try It With Your Team</strong>Run this simulation in a 2-hour workshop. Assign roles (PO, SM, Devs) and work through each phase. It is a great onboarding exercise for new team members.</div></div>"
    ].join("\n"),

    "mod-9-2": [
      "<h2>Sprint Retrospective Exercise</h2>",
      "<p>This is a structured retrospective format you can use with your team. Unlike the standard 'what went well / what went wrong,' this exercise uses the <strong>Start / Stop / Continue</strong> format with a focus on generating concrete action items.</p>",

      "<h2>Instructions</h2>",
      "<ol>",
      "<li><strong>Set the stage (5 min)</strong> — The facilitator explains the format and reminds everyone of the retrospective ground rules: blameless, constructive, focused on improvement.</li>",
      "<li><strong>Brainstorm (15 min)</strong> — Each team member writes sticky notes in three categories: Start doing, Stop doing, Continue doing. One idea per note.</li>",
      "<li><strong>Cluster and discuss (15 min)</strong> — The team groups similar ideas and discusses the most impactful ones. The facilitator guides the conversation to surface root causes.</li>",
      "<li><strong>Vote and commit (10 min)</strong> — Each team member votes for the top 1-2 improvements. The team commits to implementing the top-voted items in the next Sprint.</li>",
      "<li><strong>Define action items (5 min)</strong> — For each committed improvement, specify: What will we do? Who is the accountable person? When will we check progress?</li>",
      "</ol>",

      "<h2>Sample Action Items</h2>",
      "<ul>",
      "<li>'Add a 15-minute buffer to our Daily Scrum for cross-team coordination' (Owner: SM, Check: next Retro)</li>",
      "<li>'Stop assigning individual tasks — let team members self-select from the Sprint Backlog' (Owner: Team, Check: 1 week)</li>",
      "<li>'Continue pair programming on complex features, but limit to 2 hours per session' (Owner: Team, Check: next Retro)</li>",
      "</ul>",

      "<div class=\"callout good\"><strong class=\"callout-icon\">💡</strong><div class=\"callout-body\"><strong>Follow Through</strong>The Retrospective is only valuable if the team follows up on its action items. Start your next Retro by reviewing the status of last Sprint's commitments.</div></div>"
    ].join("\n"),

    "mod-9-3": [
      "<h2>Backlog Refinement Workshop</h2>",
      "<p>Backlog Refinement (also called Backlog Grooming) is the process of <strong>keeping the Product Backlog healthy</strong> — adding detail, estimates, and order to items. This workshop gives you a structured approach to running refinement sessions.</p>",

      "<h2>Why Refine?</h2>",
      "<p>A well-refined Backlog ensures that Sprint Planning is efficient and productive. Without refinement, Sprint Planning becomes a discovery session where the team tries to understand requirements for the first time — wasting valuable planning time.</p>",

      "<h2>Workshop Structure (60 min, weekly)</h2>",
      "<ol>",
      "<li><strong>Review new items (10 min)</strong> — The PO presents any new items added since the last session. Team asks clarifying questions.</li>",
      "<li><strong>Detail top items (30 min)</strong> — Work through the highest-priority items that are not yet refined. Add acceptance criteria, discuss edge cases, and identify dependencies.</li>",
      "<li><strong>Estimate (15 min)</strong> — Use Planning Poker or T-shirt sizing to estimate items. The PO observes but does not participate in estimation.</li>",
      "<li><strong>Re-order (5 min)</strong> — Based on new information, the PO adjusts the backlog order. The team confirms they can commit to the top items in the next Sprint Planning.</li>",
      "</ol>",

      "<h2>Tips for Effective Refinement</h2>",
      "<ul>",
      "<li>Limit refinement sessions to 60 minutes — longer sessions lose focus.</li>",
      "<li>Invite the whole Scrum Team (PO, SM, Devs). Stakeholders may join if needed.</li>",
      "<li>Use the Definition of Ready as a checklist for each item.</li>",
      "<li>Split large items (epics) into smaller, Sprint-sized pieces.</li>",
      "<li>Avoid over-refining items far down the backlog — details go stale.</li>",
      "</ul>",

      "<div class=\"callout warn\"><strong class=\"callout-icon\">⚠️</strong><div class=\"callout-body\"><strong>Refinement is Work</strong>The Scrum Guide recommends dedicating up to 10% of the Sprint's capacity to Backlog Refinement. It is not optional overhead — it is an investment in smoother Sprints.</div></div>"
    ].join("\n"),

    "final-exam": [
      "<h2>Final Exam</h2>",
      "<p>This comprehensive exam covers all modules of the Agile & Scrum for Developers course. It consists of <strong>20 questions</strong> drawn from across the entire curriculum, testing both your knowledge of concepts and your ability to apply them in practice.</p>",

      "<h2>Exam Rules</h2>",
      "<ul>",
      "<li>You must score <strong>80% or higher</strong> to pass and earn your certificate.</li>",
      "<li>You may retake the exam if you do not pass on your first attempt.</li>",
      "<li>Questions are drawn randomly from a pool covering all 9 modules.</li>",
      "<li>There is no time limit, but allow approximately 30 minutes.</li>",
      "</ul>",

      "<p><em>The questions for the final exam will be drawn from the module quizzes above. Start by completing all module quizzes, then return here for the comprehensive assessment.</em></p>"
    ].join("\n"),
  },

  // ── QA Onboarding Training ─────────────────────────────────────────────
  // Course content for QA Onboarding. Text-based lessons (1, 2, 5) have
  // full chapter HTML here. Interactive labs (lessons 3, 4) show placeholder
  // content pending extraction to standalone lab files.
  "qa-onboarding": {

    // ── MODULE 1 OVERVIEW ─────────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Testing 101</h1>',
        '<p class="chapter-intro">Welcome to the first module of QA Onboarding. This module covers the fundamental concepts you need to understand before writing your first bug report.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What software testing is and why it exists</li>',
          '<li>How Agile teams work and where QA fits in</li>',
          '<li>The different types of testing and when to use them</li>',
          '<li>How bugs move through their lifecycle from discovery to closure</li>',
          '<li>How to write clear, actionable test cases</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>How This Module Fits</strong>Everything you learn here builds the foundation for the rest of the course. Module 2 dives into Acceptance Criteria — the language you\'ll use to describe expected behaviour. Modules 3 and 4 introduce the tools (CRM and Azure DevOps). Module 5 ties it all together, and Module 6 is your Capstone Assessment.</div></div>',
        '<p><strong>Time estimate:</strong> ~26 minutes of reading + a 5-question quiz. Take your time — these concepts stick better when you understand the why behind each one.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 1: Testing 101 ──────────────────────────────────────────────
    "mod-1-1": [
      '<h1>What Is Software Testing, and Why Does It Exist?</h1>',
      '<p class="chapter-intro">Before we talk about how to test, it helps to understand why testing exists at all.</p>',
      '<p>Imagine you write a feature that calculates an invoice total. It works perfectly on your machine. You ship it. Three days later, a client\'s invoice comes out to $0.00. The developer checked it. The designer reviewed it. Nobody tested it under the specific conditions that exposed the bug. That\'s what testers are for.</p>',
      '<p><strong>Software testing</strong> is the systematic process of checking that software does what it is supposed to do — and does <em>not</em> do what it is not supposed to do. Both halves of that sentence matter equally.</p>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">Verification vs. Validation</h2>',
      '<p>These two words sound similar but mean different things in QA:</p>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-3);"><strong>Verification</strong> — Did we build it right? Does the software match its technical specification?</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Validation</strong> — Did we build the right thing? Does the software actually solve the user\'s real problem?</li>',
      '</ul>',
      '<p>A feature can pass verification and fail validation. Good QA catches both.</p>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">Why Can\'t Developers Test Their Own Code?</h2>',
      '<p>They can — and should. But developers make poor end-to-end testers of their own work due to <strong>Proximity bias</strong> (testing only the intended path) and <strong>Assumption blindness</strong> (using the software "correctly" because they know how it works).</p>',
      '<svg viewBox="0 0 700 270" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0; border-radius:8px; background:#f8fafc; display:block;">',
      '<text x="350" y="28" text-anchor="middle" font-family="inherit" font-size="14" font-weight="700" fill="#0f172a">The Cost of a Bug at Each Stage</text>',
      '<text x="350" y="46" text-anchor="middle" font-family="inherit" font-size="11" fill="#8892a4">The later a bug is caught, the more expensive it is to fix</text>',
      '<line x1="100" y1="40" x2="100" y2="222" stroke="#e2e8f0" stroke-width="1.5"/>',
      '<line x1="100" y1="222" x2="630" y2="222" stroke="#e2e8f0" stroke-width="2"/>',
      '<text x="88" y="224" text-anchor="end" font-family="inherit" font-size="10" fill="#8892a4">$</text>',
      '<text x="88" y="50" text-anchor="end" font-family="inherit" font-size="10" fill="#8892a4">$$$</text>',
      '<rect x="130" y="192" width="80" height="30" fill="#16a34a" rx="4"/>',
      '<text x="170" y="184" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#16a34a">1x</text>',
      '<text x="170" y="240" text-anchor="middle" font-family="inherit" font-size="11" fill="#0f172a" font-weight="600">Development</text>',
      '<rect x="250" y="142" width="80" height="80" fill="#d97706" rx="4"/>',
      '<text x="290" y="134" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#d97706">5x</text>',
      '<text x="290" y="240" text-anchor="middle" font-family="inherit" font-size="11" fill="#0f172a" font-weight="600">QA</text>',
      '<rect x="370" y="92" width="80" height="130" fill="#ea580c" rx="4"/>',
      '<text x="410" y="84" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#ea580c">15x</text>',
      '<text x="410" y="240" text-anchor="middle" font-family="inherit" font-size="11" fill="#0f172a" font-weight="600">UAT</text>',
      '<rect x="490" y="42" width="80" height="180" fill="#dc2626" rx="4"/>',
      '<text x="530" y="34" text-anchor="middle" font-family="inherit" font-size="13" font-weight="700" fill="#dc2626">100x</text>',
      '<text x="530" y="240" text-anchor="middle" font-family="inherit" font-size="11" fill="#0f172a" font-weight="600">Production</text>',
      '<text x="350" y="260" text-anchor="middle" font-family="inherit" font-size="10" fill="#8892a4">Based on IBM Systems Sciences Institute research — relative cost multipliers by phase</text>',
      '</svg>',
      '<div class="callout"><strong>Key takeaway:</strong> A tester\'s job is not to break software. It is to find out what reality is, and compare it honestly against what was promised.</div>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Agile and Where You Fit</h1>',
      '<p class="chapter-intro">Understanding the process around you makes you a better tester. Here\'s how Agile works and where your role sits inside it.</p>',
      '<div class="callout" style="margin-bottom:var(--space-5);"><strong>Your role: System Tester.</strong> You verify that the full application works end-to-end — that every feature behaves exactly as the Acceptance Criteria specify. This is called <em>System Testing</em>. UAT (User Acceptance Testing) comes after you and is performed by the client or business owners. Your job is to catch issues <em>before</em> they ever reach UAT.</div>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">What Is Agile?</h2>',
      '<p>Agile is a way of building software in short, focused cycles called <strong>sprints</strong> — usually one to two weeks long.</p>',
      // Agile Sprint Cycle SVG
      '<svg viewBox="0 0 700 185" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0; border-radius:8px; background:#f8fafc; display:block;">',
      '<defs>',
      '<marker id="l1ch2-fwd" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8892a4"/></marker>',
      '<marker id="l1ch2-back" markerWidth="8" markerHeight="8" refX="1" refY="3" orient="auto"><path d="M8,0 L8,6 L0,3 z" fill="#8892a4"/></marker>',
      '</defs>',
      '<text x="350" y="22" text-anchor="middle" font-family="inherit" font-size="13" font-weight="700" fill="#0f172a">The Agile Sprint Cycle</text>',
      '<text x="350" y="38" text-anchor="middle" font-family="inherit" font-size="10" fill="#8892a4">Each sprint is 1-2 weeks. QA testing runs throughout — not just at the end.</text>',
      '<line x1="141" y1="82" x2="158" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#l1ch2-fwd)"/>',
      '<line x1="281" y1="82" x2="298" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#l1ch2-fwd)"/>',
      '<line x1="421" y1="82" x2="438" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#l1ch2-fwd)"/>',
      '<line x1="561" y1="82" x2="578" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#l1ch2-fwd)"/>',
      '<path d="M 668,100 C 678,150 678,162 350,162 C 22,162 22,150 32,100" stroke="#8892a4" stroke-width="1.5" fill="none" stroke-dasharray="5,3" marker-end="url(#l1ch2-back)"/>',
      '<text x="350" y="178" text-anchor="middle" font-family="inherit" font-size="10" fill="#8892a4">↺  start next sprint</text>',
      '<rect x="20" y="60" width="120" height="44" rx="22" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>',
      '<text x="80" y="87" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#2563eb">Plan</text>',
      '<rect x="160" y="60" width="120" height="44" rx="22" fill="#faf5ff" stroke="#7c3aed" stroke-width="1.5"/>',
      '<text x="220" y="87" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#7c3aed">Develop</text>',
      '<rect x="300" y="54" width="120" height="56" rx="28" fill="#fffbeb" stroke="#d97706" stroke-width="2.5"/>',
      '<text x="360" y="80" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#d97706">Test</text>',
      '<text x="360" y="96" text-anchor="middle" font-family="inherit" font-size="9" fill="#d97706">← you are here</text>',
      '<rect x="440" y="60" width="120" height="44" rx="22" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>',
      '<text x="500" y="87" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#16a34a">Review</text>',
      '<rect x="580" y="60" width="100" height="44" rx="22" fill="#f0f9ff" stroke="#0891b2" stroke-width="1.5"/>',
      '<text x="630" y="87" text-anchor="middle" font-family="inherit" font-size="12" font-weight="700" fill="#0891b2">Release</text>',
      '</svg>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">Agile vs. Waterfall Testing</h2>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">Waterfall</div>All development finishes first. Then testing begins. The gap is long. Bugs found late are expensive to fix.</div>',
      '<div class="comparison-card good"><div class="comparison-label">Agile</div>Testing runs alongside development every sprint. Issues surface early when they\'re cheap to fix.</div>',
      '</div>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">What Is UAT?</h2>',
      '<p><strong>User Acceptance Testing (UAT)</strong> is the final check before a feature ships. It answers: does this do what the business agreed it would do?</p>',
      '<div class="callout"><strong>Key takeaway:</strong> In Agile, you are not a gatekeeper at the end of the line. You are a quality signal throughout the whole process.</div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Types of Testing</h1>',
      '<p class="chapter-intro">There are many kinds of testing. Knowing which type does what helps you understand where your work fits in the bigger picture.</p>',
      '<table style="width:100%; border-collapse:collapse; margin:var(--space-6) 0; font-size:var(--text-sm);">',
      '<thead style="background:var(--color-bg); border-bottom:2px solid var(--color-border);">',
      '<tr><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Type</th><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">What It Tests</th><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Analogy</th></tr>',
      '</thead>',
      '<tbody>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);"><strong>Unit</strong></td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">A single function in isolation</td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">Testing one light switch works</td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);"><strong>Integration</strong></td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">How components work together</td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">Testing the switch connects to the light</td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border); background:var(--color-primary-light);"><td style="padding:var(--space-3) var(--space-4);"><strong>System ← You are here</strong></td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">The whole application end-to-end</td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">Walking every room, checking every switch</td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);"><strong>UAT</strong></td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">Whether it meets the user\'s real needs</td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">Asking if this is the house they wanted</td></tr>',
      '<tr><td style="padding:var(--space-3) var(--space-4);"><strong>Regression</strong></td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">That new changes didn\'t break old things</td><td style="padding:var(--space-3) var(--space-4); color:var(--color-ink-soft);">Checking no other switches broke</td></tr>',
      '</tbody>',
      '</table>',
      // Test case document SVG
      '<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0; border-radius:8px; display:block;">',
      '<rect width="700" height="300" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>',
      '<rect width="700" height="42" rx="8" fill="#2563eb"/><rect y="32" width="700" height="10" fill="#2563eb"/>',
      '<text x="20" y="27" font-family="inherit" font-size="13" font-weight="700" fill="white">Test Case Document  —  TC-001</text>',
      '<rect x="604" y="11" width="76" height="22" rx="11" fill="#16a34a"/>',
      '<text x="642" y="27" text-anchor="middle" font-family="inherit" font-size="11" font-weight="700" fill="white">✓  PASS</text>',
      '<rect x="10" y="48" width="680" height="24" rx="0" fill="#eff6ff"/>',
      '<text x="20" y="64" font-family="inherit" font-size="10" fill="#3b82f6">AC Ref:</text><text x="60" y="64" font-family="inherit" font-size="10" fill="#1e40af" font-weight="700">AC-4.2</text>',
      '<text x="130" y="64" font-family="inherit" font-size="10" fill="#3b82f6">Priority:</text><text x="178" y="64" font-family="inherit" font-size="10" fill="#1e40af" font-weight="700">High</text>',
      '<text x="230" y="64" font-family="inherit" font-size="10" fill="#3b82f6">Tester:</text><text x="270" y="64" font-family="inherit" font-size="10" fill="#1e40af">E. Hannah</text>',
      '<text x="370" y="64" font-family="inherit" font-size="10" fill="#3b82f6">Date:</text><text x="398" y="64" font-family="inherit" font-size="10" fill="#1e40af">2026-05-10</text>',
      '<text x="490" y="64" font-family="inherit" font-size="10" fill="#3b82f6">Environment:</text><text x="558" y="64" font-family="inherit" font-size="10" fill="#1e40af">Chrome / Windows 11</text>',
      '<text x="20" y="92" font-family="inherit" font-size="10" font-weight="700" fill="#8892a4">TEST TITLE</text>',
      '<rect x="10" y="98" width="680" height="26" rx="4" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="20" y="116" font-family="inherit" font-size="12" fill="#0f172a" font-weight="600">Verify duplicate warning displays when Subject Name matches an open case</text>',
      '<text x="20" y="140" font-family="inherit" font-size="10" font-weight="700" fill="#8892a4">PRECONDITION</text>',
      '<rect x="10" y="146" width="680" height="22" rx="4" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="20" y="162" font-family="monospace" font-size="11" fill="#323130">Logged in as Senior Investigator. Case CASE-0091 (Smith, J) is already open in the system.</text>',
      '<text x="20" y="186" font-family="inherit" font-size="10" font-weight="700" fill="#8892a4">TEST STEPS</text>',
      '<rect x="10" y="192" width="680" height="52" rx="4" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="20" y="210" font-family="monospace" font-size="11" fill="#323130">1. Click New Case in the left nav to open a blank Case Investigation form</text>',
      '<text x="20" y="226" font-family="monospace" font-size="11" fill="#323130">2. In the Subject Name field, type "Smith, J" (matching the existing open case)</text>',
      '<text x="20" y="242" font-family="monospace" font-size="11" fill="#323130">3. Click Save or tab out of the Subject Name field</text>',
      '<text x="20" y="262" font-family="inherit" font-size="10" font-weight="700" fill="#16a34a">EXPECTED RESULT  (AC-4.2)</text>',
      '<rect x="10" y="268" width="680" height="22" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1"/>',
      '<text x="20" y="284" font-family="monospace" font-size="11" fill="#166534">Warning banner displays: "Possible duplicate — Case CASE-0091 already open." Dismiss button present.</text>',
      '</svg>',
    ].join("\n"),

    "mod-1-4": [
      '<h1>The Bug Lifecycle</h1>',
      '<p class="chapter-intro">A bug doesn\'t just get filed and disappear. It travels through a defined set of states.</p>',
      '<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0;">',
      '<rect x="10" y="60" width="110" height="44" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>',
      '<text x="65" y="86" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#2563eb">New</text>',
      '<line x1="120" y1="82" x2="170" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#arrow)"/>',
      '<rect x="170" y="60" width="110" height="44" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>',
      '<text x="225" y="86" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#d97706">Active</text>',
      '<line x1="280" y1="82" x2="330" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#arrow)"/>',
      '<rect x="330" y="60" width="110" height="44" rx="6" fill="#faf5ff" stroke="#7c3aed" stroke-width="1.5"/>',
      '<text x="385" y="86" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#7c3aed">Resolved</text>',
      '<line x1="440" y1="82" x2="490" y2="82" stroke="#8892a4" stroke-width="1.5" marker-end="url(#arrow)"/>',
      '<rect x="490" y="60" width="110" height="44" rx="6" fill="#f0faf4" stroke="#16a34a" stroke-width="1.5"/>',
      '<text x="545" y="86" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#16a34a">Closed</text>',
      '<line x1="385" y1="104" x2="385" y2="150" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3"/>',
      '<rect x="330" y="150" width="110" height="36" rx="6" fill="#fff5f5" stroke="#dc2626" stroke-width="1.5"/>',
      '<text x="385" y="172" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="600" fill="#dc2626">Re-opened</text>',
      '<line x1="330" y1="168" x2="225" y2="168" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow-red)"/>',
      '<line x1="225" y1="168" x2="225" y2="104" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3"/>',
      '<defs>',
      '<marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8892a4"/></marker>',
      '<marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/></marker>',
      '</defs>',
      '</svg>',
      '<div class="callout"><strong>Critical distinction:</strong> "Resolved" means the developer thinks it\'s done. "Closed" means <em>you</em> have confirmed it\'s done.</div>',
    ].join("\n"),

    "mod-1-5": [
      '<h1>What Makes a Good Test Case?</h1>',
      '<p class="chapter-intro">A test case is a documented set of conditions used to verify a specific behaviour.</p>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">The Three Required Parts</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-6);">',
      '<li style="margin-bottom:var(--space-4);"><strong>Preconditions</strong> — What state must the system be in? Who is logged in?</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>Steps</strong> — What exact actions do you perform? Numbered and specific.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>Expected result</strong> — What should happen? Reference the Acceptance Criteria.</li>',
      '</ul>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">Bad test case</div><p style="margin:0; font-size:var(--text-sm); color:var(--color-ink-soft);">"Check that the status field works."</p></div>',
      '<div class="comparison-card good"><div class="comparison-label">Good test case</div><p style="margin:0 0 var(--space-2); font-size:var(--text-sm); color:var(--color-ink-soft);"><strong>Precondition:</strong> Logged in as Junior Investigator.<br><strong>Steps:</strong> 1. Set Status to "Closed", 2. Click Save.<br><strong>Expected:</strong> Save blocked. Validation reads: "You do not have permission..."</p></div>',
      '</div>',
      '<div class="callout"><strong>Key takeaway:</strong> Write expected results so precisely that there is only one possible reading.</div>',
      '<p style="margin-top:var(--space-6);">You\'ve now covered the foundations. Move on to the quiz to test your understanding.</p>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ─────────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Acceptance Criteria</h1>',
        '<p class="chapter-intro">Acceptance Criteria (AC) are the bridge between what the business wants and what QA validates. This module teaches you to read, write, and reference AC in your daily work.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What Acceptance Criteria are and why every bug needs one</li>',
          '<li>The Given/When/Then format — the standard way to write AC</li>',
          '<li>How to interpret AC to find hidden edge cases</li>',
          '<li>What to do when AC is missing or incomplete</li>',
          '<li>How to reference the correct AC in your bug reports</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 1</strong>You learned that testing verifies the software does what it should. AC is <em>how</em> you define "what it should do." Module 1 gave you the why — Module 2 gives you the language.</div></div>',
        '<p><strong>Time estimate:</strong> ~25 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 2: Acceptance Criteria ────────────────────────────────────────
    "mod-2-1": [
      '<h1>What Are Acceptance Criteria?</h1>',
      '<p class="chapter-intro">This is the most important concept in this entire course. Everything else builds on it.</p>',
      '<p>Imagine building a fence for a client. They said: "I want a fence around the yard." You build it. They are unhappy — they wanted a gate on the south side, painted white, exactly 1.2 metres high. None of that was written down. Whose fault is it?</p>',
      '<p><strong>Acceptance Criteria (AC)</strong> exist so that everyone agrees on what "done" looks like before anyone picks up a hammer — or writes a line of code.</p>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">A Precise Definition</h2>',
      '<p>Acceptance Criteria are the agreed conditions a feature must meet to be considered complete. They are written before development begins. They define the contract between the product owner and the team.</p>',
      '<p>As a tester, AC are your primary source of truth:</p>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-3);">If it is in the AC → test it</li>',
      '<li style="margin-bottom:var(--space-3);">If behaviour is not in the AC → flag the gap, do not guess</li>',
      '<li style="margin-bottom:var(--space-3);">If the software deviates from AC → that is a bug</li>',
      '</ul>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">AC vs. Requirements</h2>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">Requirements — what to build</div>"The system shall allow users to create case records."</div>',
      '<div class="comparison-card good"><div class="comparison-label">AC — how to verify it\'s built correctly</div>"Given a logged-in Senior Investigator, when they complete all required fields and click Save, then a new record is created with a unique Case ID in format CASE-XXXXX."</div>',
      '</div>',
      '<div class="callout"><strong>Remember:</strong> Requirements say <em>what</em> to build. Acceptance Criteria say <em>how you will know</em> it was built correctly.</div>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>The Given / When / Then Format</h1>',
      '<p class="chapter-intro">Most Acceptance Criteria in Agile teams are written in a structured format that makes them directly testable. Here is how to read it.</p>',
      '<pre>Given  [a specific precondition or state]\nWhen   [an action is taken]\nThen   [the expected outcome]</pre>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">A Real Example</h2>',
      '<p>Here is an AC from the case management screen you will use in Lesson 3:</p>',
      '<pre>Given   the user is logged in as a Junior Investigator\n  And   a case record is open in edit mode\nWhen    the user sets the Status dropdown to "Closed"\n  And   clicks Save\nThen    the save is blocked\n  And   a validation message appears below the Status field\n  And   the message reads exactly:\n        "You do not have permission to resolve or close cases."</pre>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">Why Each Part Matters</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-4);"><strong>Given</strong> — sets up your exact starting conditions. Without it, two testers running the "same" test might get different results.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>When</strong> — one specific, precise action. Not "click around the form" — one thing, done once.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>Then</strong> — the exact outcome, with no interpretation required. Note how the example specifies the exact error message text.</li>',
      '</ul>',
      '<div class="callout"><strong>Watch out for:</strong> Multiple unrelated "Then" clauses in one AC. If you have five "And" clauses under Then that test different things, the AC should be split.</div>',
    ].join("\n"),

    "mod-2-3": [
      '<h1>Reading AC as a Tester</h1>',
      '<p class="chapter-intro">Your job when reading AC is to turn each statement into test cases. This is a learnable, mechanical process.</p>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">Three Questions for Every AC</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-6);">',
      '<li style="margin-bottom:var(--space-4);"><strong>What is the happy path?</strong> The action that should succeed.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>What is the unhappy path?</strong> The action that should be rejected.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>What are the edge cases?</strong> Boundary values, empty inputs, role changes.</li>',
      '</ul>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">Worked Example — One AC, Four Test Cases</h2>',
      '<p>AC states: <em>"Case Title is required. Maximum 120 characters. Cannot be blank on save."</em></p>',
      '<table style="width:100%; border-collapse:collapse; margin:var(--space-5) 0; font-size:var(--text-sm);">',
      '<thead style="background:var(--color-bg); border-bottom:2px solid var(--color-border);"><tr><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">#</th><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Test</th><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Input</th><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Expected Result</th></tr></thead>',
      '<tbody>',
      '<tr style="border-bottom:1px solid var(--color-border); background:var(--color-success-light);"><td style="padding:var(--space-3) var(--space-4);">1</td><td style="padding:var(--space-3) var(--space-4);">Happy path</td><td style="padding:var(--space-3) var(--space-4);">Valid title, 50 chars</td><td style="padding:var(--space-3) var(--space-4);">Saves successfully</td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border); background:var(--color-error-light);"><td style="padding:var(--space-3) var(--space-4);">2</td><td style="padding:var(--space-3) var(--space-4);">Unhappy path</td><td style="padding:var(--space-3) var(--space-4);">Blank</td><td style="padding:var(--space-3) var(--space-4);">Save blocked, error shown</td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);">3</td><td style="padding:var(--space-3) var(--space-4);">Boundary — at limit</td><td style="padding:var(--space-3) var(--space-4);">Exactly 120 chars</td><td style="padding:var(--space-3) var(--space-4);">Saves successfully</td></tr>',
      '<tr><td style="padding:var(--space-3) var(--space-4);">4</td><td style="padding:var(--space-3) var(--space-4);">Boundary — over limit</td><td style="padding:var(--space-3) var(--space-4);">121st character typed</td><td style="padding:var(--space-3) var(--space-4);">Character not accepted</td></tr>',
      '</tbody>',
      '</table>',
      '<div class="callout"><strong>Key insight:</strong> One line of AC generates many test cases. A good tester looks for everything that could go wrong, not just what should go right.</div>',
    ].join("\n"),

    "mod-2-4": [
      '<h1>When AC Is Missing or Ambiguous</h1>',
      '<p class="chapter-intro">The AC won\'t always cover every scenario you encounter. Here is what to do when that happens.</p>',
      '<h2 style="margin: var(--space-6) 0 var(--space-3);">The Four Steps</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-5);"><strong>1. Flag it immediately.</strong> Don\'t guess what the intended behaviour is. Don\'t assume.</li>',
      '<li style="margin-bottom:var(--space-5);"><strong>2. Ask a specific question.</strong> Not "this seems wrong" — but a precise, answerable question.</li>',
      '<li style="margin-bottom:var(--space-5);"><strong>3. Do not file a bug without an AC reference.</strong> You cannot call something a bug if there is no defined expectation to deviate from.</li>',
      '<li style="margin-bottom:var(--space-5);"><strong>4. Document your assumption if you must proceed.</strong> Note it clearly: <em>"Assumption: blank Priority defaults to Medium — not in AC."</em></li>',
      '</ul>',
      '<div class="callout"><strong>This protects you:</strong> A tester who files bugs based on personal preference rather than AC will quickly lose credibility. Always anchor your report to a specific AC reference.</div>',
      // AC document SVG
      '<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0; border-radius:8px; display:block;">',
      '<rect x="20" y="8" width="660" height="296" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>',
      '<rect x="20" y="8" width="660" height="38" rx="8" fill="#2563eb"/>',
      '<rect x="20" y="30" width="660" height="16" fill="#2563eb"/>',
      '<text x="38" y="32" font-family="monospace" font-size="11" fill="white" font-weight="700">ACCEPTANCE CRITERIA — Case Investigation Screen    v1.2   APPROVED</text>',
      '<rect x="38" y="56" width="624" height="110" rx="6" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="54" y="76" font-family="monospace" font-size="11" font-weight="700" fill="#2563eb">AC-4.2  |  Duplicate Detection</text>',
      '<text x="54" y="96" font-family="monospace" font-size="11" fill="#8892a4">GIVEN</text><text x="104" y="96" font-family="monospace" font-size="11" fill="#0f172a">a new Case Investigation is being created</text>',
      '<text x="54" y="114" font-family="monospace" font-size="11" fill="#8892a4">WHEN </text><text x="104" y="114" font-family="monospace" font-size="11" fill="#0f172a">the operator enters a Subject Name matching an open case</text>',
      '<text x="54" y="132" font-family="monospace" font-size="11" fill="#8892a4">THEN </text><text x="104" y="132" font-family="monospace" font-size="11" fill="#0f172a">a warning banner displays: "Possible duplicate — Case [ID] already open"</text>',
      '<text x="54" y="150" font-family="monospace" font-size="11" fill="#8892a4">AND  </text><text x="104" y="150" font-family="monospace" font-size="11" fill="#0f172a">the operator can dismiss the warning and continue submitting</text>',
      '<rect x="38" y="176" width="624" height="110" rx="6" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="54" y="196" font-family="monospace" font-size="11" font-weight="700" fill="#7c3aed">AC-2.1  |  Role-Based Field Visibility</text>',
      '<text x="54" y="216" font-family="monospace" font-size="11" fill="#8892a4">GIVEN</text><text x="104" y="216" font-family="monospace" font-size="11" fill="#0f172a">a user is logged in as Junior Investigator</text>',
      '<text x="54" y="234" font-family="monospace" font-size="11" fill="#8892a4">WHEN </text><text x="104" y="234" font-family="monospace" font-size="11" fill="#0f172a">the Case Investigation form is loaded</text>',
      '<text x="54" y="252" font-family="monospace" font-size="11" fill="#8892a4">THEN </text><text x="104" y="252" font-family="monospace" font-size="11" fill="#0f172a">the "Outcome" field is absent from the DOM — not disabled, absent</text>',
      '<text x="54" y="270" font-family="monospace" font-size="11" fill="#8892a4">AND  </text><text x="104" y="270" font-family="monospace" font-size="11" fill="#0f172a">the "Escalated" checkbox is visible but read-only for Junior role</text>',
      '<text x="350" y="298" text-anchor="middle" font-family="inherit" font-size="10" fill="#8892a4">Every bug you file must anchor to a specific AC number — this is your source of truth</text>',
      '</svg>',
    ].join("\n"),

    "mod-2-5": [
      '<h1>The AC for This Course</h1>',
      '<p class="chapter-intro">In the CRM lab, you will interact with a simulated CRM screen. Here are the Acceptance Criteria for that screen — read them now so you arrive prepared.</p>',
      '<div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:var(--space-6); margin:var(--space-6) 0;">',
      '<h2 style="font-size:var(--text-md); color:var(--color-primary); margin-bottom:var(--space-4);">Case Investigation Screen — AC</h2>',
      '<h3 style="font-size:var(--text-sm); text-transform:uppercase; letter-spacing:0.08em; color:var(--color-ink-muted); margin:var(--space-5) 0 var(--space-3);">AC-1: Visibility</h3>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); font-size:var(--text-sm);"><li style="margin-bottom:var(--space-2);">AC-1.1: All standard fields are visible to both roles.</li><li style="margin-bottom:var(--space-2);">AC-1.2: Outcome/Resolution is visible ONLY to Senior Investigators. Must be absent from DOM for Juniors.</li><li style="margin-bottom:var(--space-2);">AC-1.3: Assigned To is visible ONLY to Senior Investigators.</li></ul>',
      '<h3 style="font-size:var(--text-sm); text-transform:uppercase; letter-spacing:0.08em; color:var(--color-ink-muted); margin:var(--space-5) 0 var(--space-3);">AC-2: Validation</h3>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); font-size:var(--text-sm);"><li style="margin-bottom:var(--space-2);">AC-2.1: Case Title is required. Save is blocked if blank.</li><li style="margin-bottom:var(--space-2);">AC-2.2: Case Title max is 120 chars. 121st char not accepted.</li><li style="margin-bottom:var(--space-2);">AC-2.3: Date Opened is required. Future dates rejected.</li></ul>',
      '<h3 style="font-size:var(--text-sm); text-transform:uppercase; letter-spacing:0.08em; color:var(--color-ink-muted); margin:var(--space-5) 0 var(--space-3);">AC-3: Conditional Behaviour</h3>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); font-size:var(--text-sm);"><li style="margin-bottom:var(--space-2);">AC-3.1: Escalation Reason appears ONLY when Escalated is checked.</li><li style="margin-bottom:var(--space-2);">AC-3.2: Escalation Reason is required when Escalated is checked.</li></ul>',
      '<h3 style="font-size:var(--text-sm); text-transform:uppercase; letter-spacing:0.08em; color:var(--color-ink-muted); margin:var(--space-5) 0 var(--space-3);">AC-4: Roles</h3>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); font-size:var(--text-sm);"><li style="margin-bottom:var(--space-2);">AC-4.2: Junior cannot set Status to Resolved/Closed. Save blocked: "You do not have permission..."</li></ul>',
      '</div>',
      '<div class="callout"><strong>Before you move on:</strong> Pick any one AC above and write out the test cases it generates — happy path, unhappy path, edge cases.</div>',
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ─────────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3</div>',
        '<h1>Dynamics 365 CRM</h1>',
        '<p class="chapter-intro">Now that you understand Acceptance Criteria, it\'s time to meet the tool you\'ll use every day: <strong>Dynamics 365 Customer Service</strong>. This module teaches you how cases flow through the system and how different roles interact with them.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What Dynamics 365 is and how it relates to your QA work</li>',
          '<li>How cases are created, assigned, and escalated</li>',
          '<li>How role-based security affects what testers can see and do</li>',
          '<li>How to navigate the CRM interface in the interactive lab</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Why This Matters</strong>In Module 1, you learned why testing exists. In Module 2, you learned how to read AC. Now you\'ll see where those ACs come to life — inside a real CRM system. The interactive lab in this module gives you hands-on experience before the capstone.</div></div>',
        '<p><strong>Time estimate:</strong> ~41 minutes of reading + lab + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 3: Dynamics 365 CRM ───────────────────────────────────────────
    // Sub-module 1: What is Dynamics 365?
    "mod-3-1": [
      '<h1>What is Dynamics 365?</h1>',
      '<p class="chapter-intro">Dynamics 365 is Microsoft\'s cloud-based suite of business applications. In this course, we focus on <strong>Dynamics 365 Customer Service</strong> — a case management system used to track and resolve customer issues.</p>',
      '<p>As a QA tester, you\'ll validate how the system handles <strong>cases</strong> (customer service requests) across different user roles and permissions. Your job is to ensure the system behaves correctly for both Junior and Senior investigators.</p>',
      '<h2>Key Concepts</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-3);"><strong>Case:</strong> A customer service request or issue that needs investigation and resolution.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Work Item:</strong> In Dynamics, cases are the primary work item. Each case has a title, status, priority, and assigned owner.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Role-Based Access Control:</strong> Different users (Junior vs. Senior investigators) have different permissions. Some fields and actions are restricted by role.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Acceptance Criteria (AC):</strong> Business rules that define what the system should and should not allow. Your testing validates these rules.</li>',
      '</ul>',
      '<div class="callout"><strong>Why This Matters:</strong> Testing a role-based system like Dynamics requires you to test from different user perspectives. A feature might work for a Senior investigator but be blocked for a Junior — and that might be intentional (correct behavior) or a bug.</div>',
    ].join("\n"),

    // Sub-module 2: Understanding Cases
    "mod-3-2": [
      '<h1>Understanding Cases in Dynamics 365</h1>',
      '<p class="chapter-intro">In Dynamics 365 Customer Service, a <strong>Case</strong> is the central work item. It represents a customer problem or request that needs to be tracked and resolved.</p>',
      '<h2>Anatomy of a Case</h2>',
      '<p>Every case in Dynamics has several key fields:</p>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-3);"><strong>Case ID:</strong> A unique identifier auto-generated by the system (e.g., CASE-00142).</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Title:</strong> A brief description of the customer\'s issue. This is how support staff quickly understand the problem.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Status:</strong> The current state of the case (New, Active, Resolved, Closed). Cases move through these states as they\'re worked on.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Priority:</strong> How urgent the case is (High, Normal, Low). Affects which cases are worked on first.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Owner:</strong> The investigator assigned to resolve this case.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Date Opened:</strong> When the case was created. This is typically today\'s date or earlier.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Outcome/Resolution:</strong> Notes on how the case was resolved (only visible to Senior investigators).</li>',
      '</ul>',
      '<h2>Case Workflow</h2>',
      '<p>Cases follow a typical workflow:</p>',
      '<div style="margin:var(--space-5) 0; padding:var(--space-4); background:var(--color-surface-2); border-radius:var(--radius-md); border-left:4px solid var(--color-primary);">',
      '<strong>New</strong> → <strong>Active</strong> (being investigated) → <strong>Resolved</strong> (fix applied) → <strong>Closed</strong> (verified resolved)<br/>',
      '<em style="font-size:var(--text-sm); color:var(--color-ink-muted);">At each stage, different fields become available or locked based on role permissions.</em>',
      '</div>',
      '<div class="callout tip"><strong>Testing Tip:</strong> When testing a case system, check that: (1) Required fields must be filled before saving, (2) Some fields are read-only for certain roles, (3) You cannot change status or priority inappropriately, (4) Date fields reject future dates.</div>',
    ].join("\n"),

    // Sub-module 3: Role-Based Testing
    "mod-3-3": [
      '<h1>Role-Based Testing in Dynamics</h1>',
      '<p class="chapter-intro">One of the most important aspects of testing Dynamics 365 is validating that <strong>role-based access control works correctly</strong>. Different users have different permissions — and testing ensures those boundaries are enforced.</p>',
      '<h2>The Two Roles You\'ll Test</h2>',
      '<p style="margin-bottom:var(--space-5);"><strong>1. Junior Investigator</strong> — Has limited permissions. Can view cases and perform basic updates, but cannot:</p>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li>View the Outcome/Resolution field</li>',
      '<li>Close cases</li>',
      '<li>Escalate cases without a reason</li>',
      '<li>Change priority to Critical</li>',
      '</ul>',
      '<p style="margin-bottom:var(--space-5);"><strong>2. Senior Investigator</strong> — Has full permissions. Can:</p>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li>View all fields, including Outcome/Resolution</li>',
      '<li>Close cases</li>',
      '<li>Change any status or priority</li>',
      '<li>Add notes and escalation reasons</li>',
      '</ul>',
      '<h2>How to Test Role-Based Permissions</h2>',
      '<p>In the CRM simulator, you\'ll be able to switch between Junior and Senior roles using the taskbar at the bottom. When you switch roles:</p>',
      '<ol style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-3);">Some fields disappear from the form (fields you don\'t have permission to see).</li>',
      '<li style="margin-bottom:var(--space-3);">Some buttons become disabled (actions you can\'t perform).</li>',
      '<li style="margin-bottom:var(--space-3);">Some dropdown values are filtered (options you can\'t select).</li>',
      '<li style="margin-bottom:var(--space-3);">Error messages appear if you try to save invalid data (e.g., "You do not have permission to close this case").</li>',
      '</ol>',
      '<div class="callout warn"><strong>⚠️ Common Testing Mistake:</strong> Testing only as one role is incomplete. Always test the same scenario from both Junior <em>and</em> Senior perspectives. A bug that only shows up for one role is still a bug.</div>',
    ].join("\n"),

    // Sub-module 4: CRM Interactive Lab
    "mod-3-4": [
      '<div class="cv-lab-container" data-lab="crm">',
      '<p style="color:var(--color-ink-muted); font-size:var(--text-sm); margin-bottom:var(--space-3);">Use the Dynamics 365 simulator below to practice testing against Acceptance Criteria. Switch between Junior/Senior roles to verify role-based permissions.</p>',
      '<div class="cv-lab-frame-wrap" id="crm-lab-wrap">',
      '<div class="cv-lab-loading" id="crm-lab-loading">Loading CRM simulator…</div>',
      '</div>',
      '</div>',
    ].join("\n"),

    // ── MODULE 4 OVERVIEW ─────────────────────────────────────────────────────
    "mod-4-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 4</div>',
        '<h1>Azure DevOps</h1>',
        '<p class="chapter-intro">You\'ve learned to identify bugs in the CRM. Now you need to document them where the development team works: <strong>Azure DevOps</strong>. This module covers writing bug reports that developers can actually action.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What Azure DevOps is and how the team uses it</li>',
          '<li>The anatomy of a good bug report (title, repro steps, expected vs actual)</li>',
          '<li>How bugs move through their lifecycle in ADO</li>',
          '<li>How to file real bugs in the interactive lab</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Module 3 to Module 4</strong>In Module 3 you discovered issues in the CRM. In Module 4 you\'ll document them in Azure DevOps. These two tools go hand in hand — CRM is where you <em>find</em> bugs, Azure DevOps is where you <em>track</em> them. The Capstone Assessment in Module 6 tests both skills together.</div></div>',
        '<p><strong>Time estimate:</strong> ~38 minutes of reading + lab + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 4: Azure DevOps Reading + Interactive Lab ─────────────
    // Sub-module 1: What is Azure DevOps?
    "mod-4-1": [
      '<h1>What is Azure DevOps?</h1>',
      '<p class="chapter-intro">Azure DevOps (ADO) is Microsoft\'s cloud platform for planning and tracking software work. As a QA tester, this is where your findings become actionable tickets for developers.</p>',
      '<p>The team uses ADO to manage <strong>Work Items</strong>. While there are many types, your primary focus will be the <strong>Bug</strong> work item.</p>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-3);"><strong>Work Item:</strong> A single unit of work (Bug, Task, User Story).</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>The Board:</strong> A visual representation of work moving from "New" to "Closed".</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Iteration/Sprint:</strong> The time-boxed period in which specific work is assigned.</li>',
      '<li style="margin-bottom:var(--space-3);"><strong>Area Path:</strong> Defines which part of the application the bug belongs to.</li>',
      '</ul>',
      // SVG: Azure DevOps board wireframe — kanban columns showing bug lifecycle
      '<svg viewBox="0 0 700 295" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0; border-radius:8px; display:block;">',
      '<rect width="700" height="295" rx="8" fill="#f3f2f1"/>',
      '<rect width="700" height="40" rx="8" fill="#0078d4"/>',
      '<rect y="32" width="700" height="8" fill="#0078d4"/>',
      '<text x="16" y="25" font-family="inherit" font-size="12" fill="white" font-weight="600">Azure DevOps  |  QA Onboarding Team  /  Sprint 6  /  Board</text>',
      '<text x="626" y="25" font-family="inherit" font-size="11" fill="rgba(255,255,255,0.8)">⚙ Filter</text>',
      // Column 1: NEW
      '<rect x="8" y="48" width="162" height="238" rx="6" fill="#f8f8f8" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="8" y="48" width="162" height="30" rx="6" fill="#e1dfdd"/>',
      '<rect x="8" y="66" width="162" height="12" fill="#e1dfdd"/>',
      '<text x="89" y="69" text-anchor="middle" font-family="inherit" font-size="11" font-weight="700" fill="#323130">NEW  (2)</text>',
      '<rect x="16" y="86" width="146" height="64" rx="4" fill="white" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="16" y="86" width="4" height="64" rx="2" fill="#dc2626"/>',
      '<text x="28" y="103" font-family="inherit" font-size="10" fill="#8892a4">#1042 · Bug</text>',
      '<text x="28" y="118" font-family="inherit" font-size="11" fill="#323130" font-weight="600">Junior can set Status</text>',
      '<text x="28" y="131" font-family="inherit" font-size="11" fill="#323130" font-weight="600">to Closed</text>',
      '<text x="28" y="146" font-family="inherit" font-size="9" fill="#a80000">● High · AC-2.1</text>',
      '<rect x="16" y="158" width="146" height="60" rx="4" fill="white" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="16" y="158" width="4" height="60" rx="2" fill="#d97706"/>',
      '<text x="28" y="175" font-family="inherit" font-size="10" fill="#8892a4">#1041 · Bug</text>',
      '<text x="28" y="189" font-family="inherit" font-size="11" fill="#323130" font-weight="600">Duplicate warning not</text>',
      '<text x="28" y="202" font-family="inherit" font-size="11" fill="#323130" font-weight="600">displayed</text>',
      '<text x="28" y="214" font-family="inherit" font-size="9" fill="#835c00">● Medium · AC-4.2</text>',
      // Column 2: ACTIVE
      '<rect x="178" y="48" width="162" height="238" rx="6" fill="#f8f8f8" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="178" y="48" width="162" height="30" rx="6" fill="#dbeafe"/>',
      '<rect x="178" y="66" width="162" height="12" fill="#dbeafe"/>',
      '<text x="259" y="69" text-anchor="middle" font-family="inherit" font-size="11" font-weight="700" fill="#2563eb">ACTIVE  (1)</text>',
      '<rect x="186" y="86" width="146" height="72" rx="4" fill="white" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="186" y="86" width="4" height="72" rx="2" fill="#dc2626"/>',
      '<text x="198" y="103" font-family="inherit" font-size="10" fill="#8892a4">#1039 · Bug</text>',
      '<text x="198" y="118" font-family="inherit" font-size="11" fill="#323130" font-weight="600">Outcome field visible to</text>',
      '<text x="198" y="131" font-family="inherit" font-size="11" fill="#323130" font-weight="600">Junior role</text>',
      '<text x="198" y="146" font-family="inherit" font-size="9" fill="#a80000">● Critical · AC-2.1</text>',
      '<text x="198" y="155" font-family="inherit" font-size="9" fill="#8892a4">Assigned: Dev Team</text>',
      // Column 3: RESOLVED
      '<rect x="348" y="48" width="162" height="238" rx="6" fill="#f8f8f8" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="348" y="48" width="162" height="30" rx="6" fill="#dcfce7"/>',
      '<rect x="348" y="66" width="162" height="12" fill="#dcfce7"/>',
      '<text x="429" y="69" text-anchor="middle" font-family="inherit" font-size="11" font-weight="700" fill="#16a34a">RESOLVED  (2)</text>',
      '<rect x="356" y="86" width="146" height="62" rx="4" fill="white" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="356" y="86" width="4" height="62" rx="2" fill="#16a34a"/>',
      '<text x="368" y="103" font-family="inherit" font-size="10" fill="#8892a4">#1037 · Bug</text>',
      '<text x="368" y="118" font-family="inherit" font-size="11" fill="#323130" font-weight="600">Case ID not auto-gen\'d</text>',
      '<text x="368" y="131" font-family="inherit" font-size="11" fill="#323130" font-weight="600">on save</text>',
      '<text x="368" y="145" font-family="inherit" font-size="9" fill="#16a34a">✓ Fixed · AC-1.1</text>',
      '<rect x="356" y="156" width="146" height="62" rx="4" fill="white" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="356" y="156" width="4" height="62" rx="2" fill="#16a34a"/>',
      '<text x="368" y="173" font-family="inherit" font-size="10" fill="#8892a4">#1035 · Bug</text>',
      '<text x="368" y="188" font-family="inherit" font-size="11" fill="#323130" font-weight="600">Date picker accepts</text>',
      '<text x="368" y="201" font-family="inherit" font-size="11" fill="#323130" font-weight="600">future dates</text>',
      '<text x="368" y="215" font-family="inherit" font-size="9" fill="#16a34a">✓ Fixed · AC-3.2</text>',
      // Column 4: CLOSED
      '<rect x="518" y="48" width="174" height="238" rx="6" fill="#f8f8f8" stroke="#e1dfdd" stroke-width="1"/>',
      '<rect x="518" y="48" width="174" height="30" rx="6" fill="#f1f5f9"/>',
      '<rect x="518" y="66" width="174" height="12" fill="#f1f5f9"/>',
      '<text x="605" y="69" text-anchor="middle" font-family="inherit" font-size="11" font-weight="700" fill="#64748b">CLOSED  (3)</text>',
      '<rect x="526" y="86" width="158" height="58" rx="4" fill="white" stroke="#e1dfdd" stroke-width="1" opacity="0.7"/>',
      '<rect x="526" y="86" width="4" height="58" rx="2" fill="#94a3b8"/>',
      '<text x="538" y="103" font-family="inherit" font-size="10" fill="#94a3b8">#1031 · Bug</text>',
      '<text x="538" y="118" font-family="inherit" font-size="11" fill="#94a3b8" font-weight="600">Validation error on</text>',
      '<text x="538" y="131" font-family="inherit" font-size="11" fill="#94a3b8" font-weight="600">special characters</text>',
      '<text x="538" y="142" font-family="inherit" font-size="9" fill="#94a3b8">✓ Verified · AC-1.3</text>',
      '<text x="350" y="291" text-anchor="middle" font-family="inherit" font-size="10" fill="#8892a4">Azure DevOps Board — bugs move left-to-right: New → Active → Resolved → Closed</text>',
      '</svg>',
      '<div class="callout tip"><strong>Key Concept:</strong> Every bug you file moves through these states. Your job as a QA tester includes filing with the right details in "New", verifying fixes when bugs reach "Resolved", and closing when verified.</div>',
    ].join("\n"),

    // Sub-module 2: Anatomy of a Good Bug Report
    "mod-4-2": [
      '<h1>Anatomy of a Good Bug Report</h1>',
      '<p class="chapter-intro">A developer should be able to reproduce your bug without asking a single follow-up question. If they have to ask "how did you do this?", the report is incomplete.</p>',

      '<h2>The Title: The Most Important Line</h2>',
      '<p>A title should be an observable fact, not an opinion.</p>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">❌ Bad Title</div>"Status bug" or "Login doesn\'t work"</div>',
      '<div class="comparison-card good"><div class="comparison-label">✓ Good Title</div>"Junior Investigator can set Status to Closed without validation error"</div>',
      '</div>',

      '<h2>Core Fields Explained</h2>',
      '<table style="width:100%; border-collapse:collapse; margin:var(--space-5) 0; font-size:var(--text-sm);">',
      '<thead style="background:var(--color-bg); border-bottom:2px solid var(--color-border);">',
      '<tr><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Field</th><th style="text-align:left; padding:var(--space-3) var(--space-4); color:var(--color-ink-muted); font-size:var(--text-xs); text-transform:uppercase;">Requirement</th></tr>',
      '</thead>',
      '<tbody>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);"><strong>Steps to Reproduce</strong></td><td style="padding:var(--space-3) var(--space-4);">Numbered list starting from login. No gaps in logic.</td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);"><strong>Expected Result</strong></td><td style="padding:var(--space-3) var(--space-4);">What should happen? <strong>Must reference the AC number.</strong></td></tr>',
      '<tr style="border-bottom:1px solid var(--color-border);"><td style="padding:var(--space-3) var(--space-4);"><strong>Actual Result</strong></td><td style="padding:var(--space-3) var(--space-4);">What actually happened? Be objective and specific.</td></tr>',
      '<tr><td style="padding:var(--space-3) var(--space-4);"><strong>System Info</strong></td><td style="padding:var(--space-3) var(--space-4);">Browser, OS, and the active Role.</td></tr>',
      '</tbody>',
      '</table>',

      // SVG: ADO bug report work item example
      '<svg viewBox="0 0 700 338" xmlns="http://www.w3.org/2000/svg" style="width:100%; margin:var(--space-6) 0; border-radius:8px; display:block;">',
      '<rect width="700" height="338" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>',
      '<rect width="700" height="44" rx="8" fill="#a80000"/>',
      '<rect y="34" width="700" height="10" fill="#a80000"/>',
      '<rect x="12" y="10" width="22" height="22" rx="4" fill="rgba(255,255,255,0.2)"/>',
      '<text x="23" y="26" text-anchor="middle" font-family="inherit" font-size="13" fill="white">🐛</text>',
      '<text x="44" y="26" font-family="inherit" font-size="13" font-weight="700" fill="white">Bug  #1042</text>',
      '<rect x="580" y="12" width="54" height="20" rx="10" fill="rgba(255,255,255,0.25)"/>',
      '<text x="607" y="26" text-anchor="middle" font-family="inherit" font-size="10" fill="white" font-weight="700">Active</text>',
      '<rect x="10" y="50" width="680" height="26" rx="0" fill="#fef2f2"/>',
      '<text x="20" y="67" font-family="inherit" font-size="10" fill="#605e5c">Priority:</text>',
      '<text x="66" y="67" font-family="inherit" font-size="10" fill="#a80000" font-weight="700">2 – High</text>',
      '<text x="140" y="67" font-family="inherit" font-size="10" fill="#605e5c">Area:</text>',
      '<text x="168" y="67" font-family="inherit" font-size="10" fill="#323130">QA-Team / CRM Screen</text>',
      '<text x="370" y="67" font-family="inherit" font-size="10" fill="#605e5c">Sprint:</text>',
      '<text x="402" y="67" font-family="inherit" font-size="10" fill="#323130">Sprint 6</text>',
      '<text x="480" y="67" font-family="inherit" font-size="10" fill="#605e5c">Assigned To:</text>',
      '<text x="547" y="67" font-family="inherit" font-size="10" fill="#323130">Dev Team</text>',
      '<text x="20" y="96" font-family="inherit" font-size="10" font-weight="700" fill="#8892a4">TITLE</text>',
      '<rect x="10" y="102" width="680" height="26" rx="4" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="20" y="120" font-family="inherit" font-size="12" fill="#323130" font-weight="600">Junior Investigator can set Status to Closed — no validation error displayed</text>',
      '<text x="20" y="144" font-family="inherit" font-size="10" font-weight="700" fill="#8892a4">STEPS TO REPRODUCE</text>',
      '<rect x="10" y="150" width="680" height="64" rx="4" fill="white" stroke="#e2e8f0" stroke-width="1"/>',
      '<text x="20" y="168" font-family="monospace" font-size="11" fill="#323130">1. Log in as Junior Investigator (username: junior@test.com)</text>',
      '<text x="20" y="184" font-family="monospace" font-size="11" fill="#323130">2. Open any Active case from the Cases list</text>',
      '<text x="20" y="200" font-family="monospace" font-size="11" fill="#323130">3. Change the Status dropdown from "Active" to "Closed" and click Save</text>',
      '<text x="20" y="228" font-family="inherit" font-size="10" font-weight="700" fill="#16a34a">EXPECTED RESULT  (per AC-2.3)</text>',
      '<rect x="10" y="234" width="680" height="26" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1"/>',
      '<text x="20" y="252" font-family="monospace" font-size="11" fill="#166534">Status change to Closed should be blocked — validation error: "Junior role cannot close cases"</text>',
      '<text x="20" y="276" font-family="inherit" font-size="10" font-weight="700" fill="#dc2626">ACTUAL RESULT</text>',
      '<rect x="10" y="282" width="680" height="26" rx="4" fill="#fff5f5" stroke="#dc2626" stroke-width="1"/>',
      '<text x="20" y="300" font-family="monospace" font-size="11" fill="#991b1b">Status was saved as Closed with no error. Case now shows Closed in the list view.</text>',
      '<text x="20" y="322" font-family="inherit" font-size="10" fill="#8892a4">System: Chrome 124 / Windows 11 / Role: Junior Investigator  |  AC reference: AC-2.3</text>',
      '<text x="660" y="322" text-anchor="end" font-family="inherit" font-size="10" fill="#8892a4">Reproducible: Always</text>',
      '</svg>',
      '<div class="callout good"><strong>ADO tip:</strong> Use the \'Repro Steps\' field format. Azure DevOps supports rich text. Use bullet points for environmental preconditions, numbered steps for the reproduction sequence, and bold text for key values.</div>',
    ].join("\n"),

    // Sub-module 3: The Bug Lifecycle
    "mod-4-3": [
      '<h1>The Bug Lifecycle in Practice</h1>',
      '<p class="chapter-intro">Bugs move through states. Your role changes depending on the state of the bug.</p>',

      '<h2>State Transitions</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft); margin-bottom:var(--space-5);">',
      '<li style="margin-bottom:var(--space-4);"><strong>New → Active:</strong> The developer acknowledges the bug and begins investigating.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>Active → Resolved:</strong> The developer claims the fix is complete. <strong>This is where QA returns.</strong></li>',
      '<li style="margin-bottom:var(--space-4);"><strong>Resolved → Closed:</strong> QA verifies the fix. If it works, you close it.</li>',
      '<li style="margin-bottom:var(--space-4);"><strong>Resolved → Re-opened:</strong> QA verifies the fix and it still fails.</li>',
      '</ul>',

      '<div class="callout warn">',
      '<strong>Re-opening a bug is a critical moment.</strong> Do not just write "still broken". You must state:',
      '<br>1. The build number you tested.',
      '<br>2. The role used.',
      '<br>3. Which specific step in the repro list still fails.',
      '</div>',

      '<h2>Your Responsibilities as QA</h2>',
      '<ul style="padding-left:var(--space-5); color:var(--color-ink-soft);">',
      '<li style="margin-bottom:var(--space-3);">When the developer resolves a bug, it is your job to <strong>verify the fix</strong> in the correct environment using the <strong>exact same repro steps</strong> you provided.</li>',
      '<li style="margin-bottom:var(--space-3);">If the fix works, change the state to <strong>Closed</strong>.</li>',
      '<li style="margin-bottom:var(--space-3);">If the fix does not work, change the state to <strong>Active</strong> (re-open) and include a comment explaining what still fails.</li>',
      '<li style="margin-bottom:var(--space-3);">Never close a bug without verifying it yourself — trust but verify.</li>',
      '</ul>',

      '<div class="callout tip"><strong>Remember:</strong> A bug is not "done" until it is Closed. "Resolved" means the developer thinks it is fixed. "Closed" means you have confirmed it.</div>',
    ].join("\n"),

    // Sub-module 4: ADO Interactive Lab (iframe)
    "mod-4-4": [
      '<div class="cv-lab-container" data-lab="ado">',
      '<p style="color:var(--color-ink-muted); font-size:var(--text-sm); margin-bottom:var(--space-3);">Use the Azure DevOps simulator below to practice testing work item tracking.</p>',
      '<div class="cv-lab-frame-wrap" id="ado-lab-wrap">',
      '<div class="cv-lab-loading" id="ado-lab-loading">Loading Azure DevOps simulator…</div>',
      '</div>',
      '</div>',
    ].join("\n"),

    // ── MODULE 5 OVERVIEW ─────────────────────────────────────────────────────
    "mod-5-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 5</div>',
        '<h1>Test Planning & Bug Triage</h1>',
        '<p class="chapter-intro">You\'ve learned the tools. Now it\'s time to think strategically. This module covers how to plan your testing approach and how to prioritise bugs when you find more than you can report.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The difference between exploratory and planned testing — and when to use each</li>',
          '<li>How to write a structured test case with clear steps and expected results</li>',
          '<li>How to assign severity and priority during triage</li>',
          '<li>How to trace your test coverage back to acceptance criteria</li>',
          '<li>A final checklist to review before submitting your capstone</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Almost Ready for the Capstone</strong>Modules 1-4 gave you the foundation, the language, the tools, and the documentation skills. Module 5 is where you learn to plan your approach — exactly what you\'ll need for the Capstone Assessment that follows.</div></div>',
        '<p><strong>Time estimate:</strong> ~25 minutes of reading + a 3-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 5: Test Planning & Bug Triage ─────────────────────────────────
    "mod-5-1": [
      '<h1>Exploratory Testing vs Planned Testing</h1>',
      '<p class="chapter-intro">Depending on the goal, you\'ll approach a feature in one of two ways. Neither is "better" — they just solve different problems.</p>',
      '<p><strong>Exploratory testing</strong> is where you open the app, poke around, and look for things that feel wrong. There is no script, no checklist. You\'re using your instincts and domain knowledge. It\'s perfect for early stages, new features, or "does this even work?" checks.</p>',
      '<p><strong>Planned testing (test cases)</strong> is formal. You have a list of specific steps and expected outcomes. You follow them in order and record a pass/fail for each. This is essential for regression testing and providing proof that acceptance criteria are met.</p>',
      '<div class="comparison-grid">',
      '<div class="comparison-card" style="background:var(--color-bg); border:1px solid var(--color-border);"><div class="comparison-label">Exploratory</div><ul style="font-size:var(--text-xs); color:var(--color-ink-soft); margin:0; padding-left:15px;"><li>Prep time: Low</li><li>Coverage: Broad, intuitive</li><li>Repeatability: Variable</li><li>Use case: Discovery, new features</li><li>Risk: May miss edge cases</li></ul></div>',
      '<div class="comparison-card" style="background:var(--color-bg); border:1px solid var(--color-border);"><div class="comparison-label">Planned</div><ul style="font-size:var(--text-xs); color:var(--color-ink-soft); margin:0; padding-left:15px;"><li>Prep time: Higher</li><li>Coverage: Specific, documented</li><li>Repeatability: Consistent</li><li>Use case: Regression, sign-off</li><li>Risk: May miss unexpected behaviour</li></ul></div>',
      '</div>',
      '<div class="callout tip"><strong>Tip:</strong> In practice, good QA analysts do both. You explore first to understand the system, then you write test cases to prove it works for every scenario that matters.</div>',
    ].join("\n"),

    "mod-5-2": [
      '<h1>What\'s in a test case?</h1>',
      '<p class="chapter-intro">A professional test case removes guesswork. If a developer reads your test case, they should be able to reproduce the exact result without asking you for clarification.</p>',
      '<p>Every test case requires three core components: <strong>Preconditions</strong> (the state of the app), <strong>Steps</strong> (the actions), and the <strong>Expected Result</strong> (the goal).</p>',
      '<div style="margin: var(--space-6) 0; overflow-x: auto;">',
      '<table style="width:100%; border-collapse:collapse; font-size:var(--text-sm); border:1px solid var(--color-border);">',
      '<thead style="background:var(--color-bg);"><tr><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border); width:30%;">Field</th><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Value</th></tr></thead>',
      '<tbody>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Precondition</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">User is logged in with Junior Investigator role</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Step 1</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Open Dynamics CRM and navigate to Case CASE-00142</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Step 2</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Click the Status dropdown</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Step 3</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Attempt to select "Escalated" from the options</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Expected result</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">"Escalated" option is not available — the field is restricted to Active and Pending for Junior role</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Actual result</td><td style="padding:var(--space-3); border:1px solid var(--color-border); color:var(--color-ink-muted);"> (fill in during testing)</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border); font-weight:bold;">Pass / Fail</td><td style="padding:var(--space-3); border:1px solid var(--color-border); color:var(--color-ink-muted);"> (fill in during testing)</td></tr>',
      '</tbody>',
      '</table>',
      '</div>',
      '<div class="callout">Notice \'Actual result\' is blank when you write the test case. You fill it in during testing. If actual ≠ expected, you\'ve found a bug.</div>',
    ].join("\n"),

    "mod-5-3": [
      '<h1>Not all bugs are created equal</h1>',
      '<p class="chapter-intro">Bug triage is the process of deciding how urgent a fix is. Severity is based on functional impact, not how "annoying" the bug is.</p>',
      '<div style="margin-bottom: var(--space-6);">',
      '<table style="width:100%; border-collapse:collapse; font-size:var(--text-sm); border:1px solid var(--color-border);">',
      '<thead style="background:var(--color-bg);"><tr><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Severity</th><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Label</th><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Plain English</th></tr></thead>',
      '<tbody>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">1 — Critical</td><td style="padding:var(--space-3); border:1px solid var(--color-border); text-align:center;">🔴</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">System is down or data is lost. Stops everything. Fix NOW.</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">2 — High</td><td style="padding:var(--space-3); border:1px solid var(--color-border); text-align:center;">🟠</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Major feature broken, no workaround. Most users affected.</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">3 — Medium</td><td style="padding:var(--space-3); border:1px solid var(--color-border); text-align:center;">🟡</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Feature partially works, or a workaround exists.</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">4 — Low</td><td style="padding:var(--space-3); border:1px solid var(--color-border); text-align:center;">🟢</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Cosmetic issue, spelling error, minor annoyance.</td></tr>',
      '</tbody>',
      '</table>',
      '</div>',
      '<p><strong>Triage Exercise:</strong> Mentally assign a severity to these bugs before revealing the answer.</p>',
      '<details class="triage-exercise"><summary>Bug A: "The Date Opened field accepts future dates — a case can be \'opened\' on 1 January 2099."</summary><p><strong>Answer: Severity 3 — Medium.</strong> Data integrity issue, workaround is careful manual entry.</p></details>',
      '<details class="triage-exercise"><summary>Bug B: "Case notes are deleted when the page is refreshed — all entered text is lost."</summary><p><strong>Answer: Severity 2 — High.</strong> Major data loss, no workaround, affects every user.</p></details>',
      '<details class="triage-exercise"><summary>Bug C: "The Dynamics CRM logo appears slightly blurry on high-DPI screens."</summary><p><strong>Answer: Severity 4 — Low.</strong> Cosmetic, no functional impact.</p></details>',
    ].join("\n"),

    "mod-5-4": [
      '<h1>Why every bug needs an AC reference</h1>',
      '<p class="chapter-intro">Traceability is what separates an opinion from a defect. In a professional environment, we don\'t file bugs because we "don\'t like" something; we file them because they violate a requirement.</p>',
      '<p>An <strong>Acceptance Criterion (AC)</strong> defines what "correct" looks like. Without an AC reference, a bug report is just an opinion. With one, it\'s evidence.</p>',
      '<p>Developers prioritise bugs with clear AC references because they know exactly what \'fixed\' looks like, and QA leads accept them because they are traceable.</p>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">Bad</div><p style="margin:0; font-size:var(--text-sm);">"Status is broken"</p></div>',
      '<div class="comparison-card good"><div class="comparison-label">Good</div><p style="margin:0; font-size:var(--text-sm);">"Junior Investigator can set case Status to Escalated — AC-2.1 violation"</p></div>',
      '</div>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">Bad</div><p style="margin:0; font-size:var(--text-sm);">"Date field issue"</p></div>',
      '<div class="comparison-card good"><div class="comparison-label">Good</div><p style="margin:0; font-size:var(--text-sm);">"Date Opened accepts future dates — should be blocked per AC-3.2"</p></div>',
      '</div>',
      '<div class="callout tip"><strong>When in doubt:</strong> [what happened] + [what should have happened] + [which AC it violates]. That\'s a complete bug title.</div>',
    ].join("\n"),

    "mod-5-5": [
      '<h1>Triage checklist — before you file a bug</h1>',
      '<p class="chapter-intro">Before you hit "Save" in Azure DevOps, run through this mental model to ensure your report is a "one-touch" fix for the developer.</p>',
      '<div class="checklist-box">',
      '<ul>',
      '<li>Does the title describe the specific defect (not just the area)?</li>',
      '<li>Have I assigned a severity level using the 1-4 scale?</li>',
      '<li>Have I referenced the specific AC that is violated?</li>',
      '<li>Have I written numbered steps that any developer can follow to reproduce this?</li>',
      '<li>Is this actually a defect — or is it working as intended?</li>',
      '</ul>',
      '</div>',
      '<p>You have reached the end of this module. Proceed to the module quiz to test your understanding.</p>',
    ].join("\n"),

    // ── CAPSTONE OVERVIEW ─────────────────────────────────────────────────────
    "capstone-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 6 — Assessment</div>',
        '<h1>Capstone Assessment</h1>',
        '<p class="chapter-intro">This is the final challenge. You\'ll apply everything you\'ve learned across all five previous modules in a single hands-on assessment. You\'ll investigate a real-world scenario, identify bugs, and file professional bug reports.</p>',
        '<h2>What You\'ll Be Tested On</h2>',
        '<ul>',
          '<li>Navigating Dynamics 365 CRM to investigate a case</li>',
          '<li>Applying Acceptance Criteria to identify defects</li>',
          '<li>Filing complete bug reports in Azure DevOps</li>',
          '<li>Demonstrating proper severity and priority assignment</li>',
          '<li>Working efficiently under a realistic time constraint</li>',
        '</ul>',
        '<div class="callout warn"><strong class="callout-icon">🎯</strong><div class="callout-body"><strong>How to Prepare</strong>Review your notes from Modules 1-5, especially: AC formats (Module 2), CRM navigation (Module 3), bug report structure (Module 4), and severity guidelines (Module 5). You\'ll have 45 minutes to complete the scenario.</div></div>',
        '<p><strong>Pass mark:</strong> Your bug reports will be evaluated against the expected findings. A passing score requires you to identify the critical defects and file reports with complete, accurate information.</p>',
        '<div style="margin-top:var(--space-6);padding-top:var(--space-5);border-top:1px solid var(--color-border, #e5e7eb);text-align:center;">',
          '<button class="btn btn-primary" onclick="window.completeCourseFromCapstone()" style="font-size:15px;padding:12px 28px;font-weight:600;border-radius:9999px;background:#007AFF;color:white;border:none;cursor:pointer;font-family:inherit;transition:all 0.2s ease;box-shadow:0 4px 12px rgba(0,122,255,0.3);">Complete Course →</button>',
        '</div>',
      '</div>',
    ].join("\n"),

    // ── CAPSTONE ─────────────────────────────────────────────────────────────
    "capstone": [
      '<div class="cv-lab-container" data-lab="capstone">',
      '<div class="cv-lab-frame-wrap" id="capstone-lab-wrap">',
      '<div class="cv-lab-loading" id="capstone-lab-loading">Loading assessment environment…</div>',
      '</div>',
      '</div>',
    ].join("\n"),
  },

  // ── QA Onboarding — Advanced ─────────────────────────────────────────────────
  "qa-onboarding-advanced": {

    // ── MODULE 1 OVERVIEW ─────────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Deep D365 Testing</h1>',
        '<p class="chapter-intro">Module 1 builds on your Dynamics 365 CRM foundation from the beginner course. Here you\'ll go beyond basic navigation to understand real-world workflows, edge cases, test data strategies, and integration testing patterns that professional QA engineers use every day.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How D365 Business Process Flows, workflows, and plug-ins drive state changes</li>',
          '<li>Field-level and process-level edge cases that break happy-path assumptions</li>',
          '<li>Strategies for setting up test data that covers realistic scenarios</li>',
          '<li>How to test integrations where multiple entities interact across transactions</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on QA Onboarding</strong>This module assumes you\'re comfortable with CRM navigation, role-switching, and basic field validation from the beginner course. Here we go deeper — testing the mechanics behind the UI. Module 2 shifts focus to Azure DevOps mastery, where you\'ll apply similar depth to bug tracking and test management.</div></div>',
        '<p><strong>Time estimate:</strong> ~60 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 1: Deep D365 Testing ─────────────────────────────────────────
    "mod-1-1": [
      '<h1>Real-World D365 Workflows</h1>',
      '<p class="chapter-intro">Dynamics 365 is not just a form with fields. It is a state machine driven by business process flows, workflows, and plug-ins. Understanding these mechanics is what separates intermediate testers from advanced ones.</p>',
      '<h2>Business Process Flows (BPFs)</h2>',
      '<p>A BPF guides users through a sequence of stages. Each stage has steps (fields) that must be completed before advancing. As a tester, you must verify:</p>',
      '<ul>',
      '<li>Each stage enforces its required fields before allowing advancement</li>',
      '<li>Backwards navigation does not skip required stages</li>',
      '<li>Conditional branching (if Stage A outcome = X, go to Stage C instead of B)</li>',
      '<li>The BPF appears correctly for each role (some BPFs are role-specific)</li>',
      '</ul>',
      '<h2>Workflow and Plug-In Triggers</h2>',
      '<p>D365 workflows run in the background on create, update, or delete events. A workflow might auto-assign a case based on its category, or send an email when a case is escalated. Plug-ins are custom .NET code that runs synchronously during a transaction.</p>',
      '<p>The critical testing insight: <strong>a UI-only test is incomplete.</strong> A field may appear to save correctly, but the workflow or plug-in that fires on save could fail silently. You must check the downstream effects:</p>',
      '<ul>',
      '<li>Did the email actually send? Check the email timeline.</li>',
      '<li>Did the auto-assignment happen? Check the Owner field after save.</li>',
      '<li>Did the status update cascade to related records? Open the related entity.</li>',
      '</ul>',
      '<div class="callout warn"><strong>Real-world gotcha:</strong> A plug-in throws an exception for a specific data combination. The UI shows "Saved successfully" but the underlying record is in an inconsistent state. Always verify the result, not just the confirmation message.</div>',
      '<h2>Testing Multi-Entity Workflows</h2>',
      '<p>Many D365 processes span multiple entities. A Case creates an Account, which creates a Contact, which queues a task. Each step is a potential failure point. Map the full chain before you start testing.</p>',
      '<div class="callout tip"><strong>Advanced technique:</strong> Keep a workflow dependency diagram for the features you test. When a new build deploys, check the workflow/plug-in list for changes before you start clicking.</div>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Edge Cases in D365</h1>',
      '<p class="chapter-intro">Standard happy-path testing catches obvious bugs. Edge-case testing catches defensive-coding failures, permission misconfigurations, and data-corruption risks.</p>',
      '<h2>Field-Level Edge Cases</h2>',
      '<table style="width:100%; border-collapse:collapse; margin:var(--space-5) 0; font-size:var(--text-sm);">',
      '<thead style="background:var(--color-bg);"><tr><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Field Type</th><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Edge Cases to Test</th></tr></thead>',
      '<tbody>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">Text (single line)</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Maximum length, Unicode characters, leading/trailing spaces, HTML injection, SQL injection patterns</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">Text (multi-line)</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Line breaks, very long pasted content (10k+ chars), copy-paste from Word with formatting</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">Number/Currency</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Negative values, zero, decimal precision, very large numbers, commas in input</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">Date/Time</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Feb 29 on non-leap years, time zone transitions, dates before 1970, year 9999</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">Lookup</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Deactivated record as lookup target, circular references, self-referencing lookups</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);">Option Set</td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Default value (is there one?), null selection, deprecated option values still visible</td></tr>',
      '</tbody>',
      '</table>',
      '<h2>Permission Boundary Testing</h2>',
      '<p>D365 security is role-based, record-based, and field-level. As an advanced tester, you should test across permission boundaries:</p>',
      '<ul>',
      '<li>Can a Junior Investigator see or edit fields marked as Senior-only? (Check DOM, not just disabled state)</li>',
      '<li>What happens when a record owner\'s role is changed mid-workflow?</li>',
      '<li>Does sharing a record correctly grant read-only vs. read-write access?</li>',
      '<li>Can a user access a deactivated record through a related entity lookup?</li>',
      '</ul>',
      '<div class="callout good"><strong>Pro tip:</strong> Create test accounts for each role and test every scenario from each role\'s perspective. Do not test everything as a System Administrator and assume it works for end users.</div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Test Data Setup Strategies</h1>',
      '<p class="chapter-intro">A test is only as good as the data it runs against. Poor test data leads to false positives, false negatives, and wasted debugging time.</p>',
      '<h2>The Problem with Production Data</h2>',
      '<p>Copying production data into a test environment seems efficient, but it introduces risks: PII exposure, orphaned references, and data volumes that mask performance issues. Test environments need their own curated data sets.</p>',
      '<h2>Data Setup Patterns</h2>',
      '<h3>1. Baseline Data Set</h3>',
      '<p>A minimal set of records every test suite needs: reference entities (statuses, categories), security roles, users, and at least one of each primary entity (accounts, contacts, cases). Export this as a data-migration package and re-import before each test cycle.</p>',
      '<h3>2. Scenario-Specific Data</h3>',
      '<p>Each test scenario needs targeted data. A "duplicate detection" test needs an existing record with a matching name. A "workflow cascade" test needs parent-child relationships already in place. Document these preconditions in your test case.</p>',
      '<h3>3. Boundary Data</h3>',
      '<p>Create records at every boundary: minimum field lengths, maximum field lengths, special characters, records with all fields filled, records with only required fields. These become your go-to data for regression testing.</p>',
      '<div class="callout tip"><strong>Tooling:</strong> Learn Excel templates for D365 data import, and consider a data-builder pattern (test code that creates its own data) for automated suites. For manual testing, maintain a shared "Data Setup" test case document with step-by-step creation instructions.</div>',
    ].join("\n"),

    "mod-1-4": [
      '<h1>Integration Testing with D365</h1>',
      '<p class="chapter-intro">D365 rarely exists in isolation. It connects to Power Automate, SharePoint, Outlook, custom portals, and third-party APIs. Integration testing validates that these connections work end-to-end.</p>',
      '<h2>Common Integration Points</h2>',
      '<ul>',
      '<li><strong>Power Automate flows</strong> triggered by D365 events (create, update, delete)</li>',
      '<li><strong>Server-Side Synchronization</strong> between D365 and Exchange (email tracking, appointments)</li>',
      '<li><strong>SharePoint document management</strong> — document uploads, versioning, folder auto-creation</li>',
      '<li><strong>Custom web API endpoints</strong> exposing D365 data to external systems</li>',
      '<li><strong>Power BI reports</strong> consuming D365 data views</li>',
      '</ul>',
      '<h2>Testing Strategy for Integrations</h2>',
      '<p>Integration tests follow a different pattern than UI tests. The core question is: <strong>what breaks when the integration fails?</strong></p>',
      '<ul>',
      '<li>If Power Automate is down, does the D365 form still save? (It should.)</li>',
      '<li>If the SharePoint site is unreachable, does document upload fail gracefully?</li>',
      '<li>If an external API returns an unexpected payload, does the sync job log the error or crash silently?</li>',
      '</ul>',
      '<div class="callout warn"><strong>Key principle:</strong> A downstream integration failure should never corrupt upstream data. D365 must remain consistent even when connected services are unavailable.</div>',
      '<h2>Traceability Across Systems</h2>',
      '<p>When a bug spans multiple systems, assign unique test run IDs or correlation IDs so you can trace the request across boundaries. A case created in D365 should be findable in the Power Automate run history, the SharePoint document set, and the external API logs.</p>',
      '<div class="callout good"><strong>Checklist for each integration:</strong> 1) Happy path works, 2) Downstream failure does not break upstream, 3) Error is logged with enough detail to debug, 4) Retry mechanism exists for transient failures, 5) Data is consistent across all systems after recovery.</div>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ─────────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Azure DevOps Mastery</h1>',
        '<p class="chapter-intro">You\'ve used Azure DevOps to file bugs in the beginner course. Module 2 elevates your ADO skills from basic bug reporting to professional-grade test management — writing compelling bug reports, organising test plans and suites, running test cases, and linking everything back to Acceptance Criteria.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to write bug reports that developers can reproduce and fix on the first read</li>',
          '<li>How to structure Test Plans and Test Suites for organised coverage</li>',
          '<li>How to create, run, and track Test Cases linked to requirements</li>',
          '<li>How to link Acceptance Criteria to both tests and bugs for full traceability</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building on Module 1</strong>Module 1 gave you advanced D365 investigation skills. Module 2 gives you the professional documentation discipline to report what you find. In Module 3 (the Capstone), you\'ll combine both skills in a full end-to-end assessment.</div></div>',
        '<p><strong>Time estimate:</strong> ~60 minutes of reading + a 6-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 2: Azure DevOps Mastery ──────────────────────────────────────
    "mod-2-1": [
      '<h1>Writing Professional Bug Reports</h1>',
      '<p class="chapter-intro">A bug report that gets ignored is worse than no bug report at all. A professional report is a communication tool that enables a developer to reproduce, fix, and verify the defect in the shortest possible time.</p>',
      '<h2>The Anatomy of a Great Bug Report</h2>',
      '<table style="width:100%; border-collapse:collapse; margin:var(--space-5) 0; font-size:var(--text-sm);">',
      '<thead style="background:var(--color-bg);"><tr><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">Field</th><th style="text-align:left; padding:var(--space-3); border:1px solid var(--color-border);">What to Write</th></tr></thead>',
      '<tbody>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);"><strong>Title</strong></td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Short, specific, includes the behaviour + area. e.g. "Save blocked with misleading error when Case Title exceeds 120 chars"</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);"><strong>Steps to Reproduce</strong></td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Numbered, starting from a known state. Include exact data values used.</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);"><strong>Expected Result</strong></td><td style="padding:var(--space-3); border:1px solid var(--color-border);">What should happen. Reference the specific AC.</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);"><strong>Actual Result</strong></td><td style="padding:var(--space-3); border:1px solid var(--color-border);">What actually happened. Include error text verbatim.</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);"><strong>Environment</strong></td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Browser + version, OS, screen resolution, D365 version/org URL, data centre region</td></tr>',
      '<tr><td style="padding:var(--space-3); border:1px solid var(--color-border);"><strong>Attachments</strong></td><td style="padding:var(--space-3); border:1px solid var(--color-border);">Screenshot with annotations, HAR file for network issues, browser console logs for JS errors</td></tr>',
      '</tbody>',
      '</table>',
      '<h2>Title Writing Formula</h2>',
      '<p>A good bug title follows this pattern: <strong>[Action] fails/does [unexpected result] when [condition]</strong></p>',
      '<div class="comparison-grid">',
      '<div class="comparison-card bad"><div class="comparison-label">Weak</div>"Case form has an error"</div>',
      '<div class="comparison-card good"><div class="comparison-label">Strong</div>"Case Save fails with \'Object reference not set\' when Case Type is left empty on Senior role"</div>',
      '</div>',
      '<div class="callout good"><strong>Azure DevOps tip:</strong> Use the \'Repro Steps\' field format. Azure DevOps supports rich text. Use bullet points for environmental preconditions, numbered steps for the reproduction sequence, and bold text for key values.</div>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Test Plans and Suites in ADO</h1>',
      '<p class="chapter-intro">Azure DevOps Test Plans is the formal test management layer. It organises test cases into suites, tracks execution, and generates reports. Learning it elevates you from a \'bug finder\' to a \'quality manager.\'</p>',
      '<h2>Test Plan Hierarchy</h2>',
      '<pre>Test Plan (Sprint 24 Regression)\n  \u2514\u2500\u2500 Test Suite (Functional Tests)\n  \u2502     \u2514\u2500\u2500 Test Case TC-101: Verify login with valid credentials\n  \u2502     \u2514\u2500\u2500 Test Case TC-102: Verify login error on invalid password\n  \u2502     \u2514\u2500\u2500 Test Case TC-103: Verify password reset flow\n  \u2502\n  \u2514\u2500\u2500 Test Suite (Integration Tests)\n        \u2514\u2500\u2500 Test Case TC-201: Verify case syncs to SharePoint\n        \u2514\u2500\u2500 Test Case TC-202: Verify email notification on escalation</pre>',
      '<h2>Creating a Test Plan</h2>',
      '<ol>',
      '<li>Navigate to Azure DevOps > Test Plans > New Test Plan</li>',
      '<li>Name it by sprint/release: e.g. "Sprint 24 — Regression"</li>',
      '<li>Set the area path and iteration path to match the sprint</li>',
      '<li>Add test suites (requirement-based, query-based, or static)</li>',
      '<li>Assign testers to each test case</li>',
      '<li>Set configuration (Chrome/Windows, Safari/Mac, etc.)</li>',
      '</ol>',
      '<div class="callout tip"><strong>Best practice:</strong> Use \'Requirement-based suites\' to link test cases directly to user stories. This gives you instant traceability: \'All ACs for story #45678 are covered by these 5 tests.\'</div>',
    ].join("\n"),

    "mod-2-3": [
      '<h1>Creating and Running Test Cases in ADO</h1>',
      '<p class="chapter-intro">Azure DevOps test cases are more than just checklists. They support shared steps, parameters, attachments, and detailed outcome reporting.</p>',
      '<h2>Test Case Structure in ADO</h2>',
      '<p>Each test case in Azure DevOps contains:</p>',
      '<ul>',
      '<li><strong>Title</strong> — should match the behaviour being verified</li>',
      '<li><strong>Steps</strong> — numbered action + expected result pairs. Use the built-in step editor, not a flat text field.</li>',
      '<li><strong>Shared Steps</strong> — reusable step sequences (e.g. "Log in as Junior Investigator") that can be included across many test cases. Update once, and all referencing test cases reflect the change.</li>',
      '<li><strong>Parameters</strong> — data-driven testing. One test case with parameters can generate many test variations.</li>',
      '</ul>',
      '<h2>Running Tests and Recording Results</h2>',
      '<p>During test execution, Azure DevOps allows you to:</p>',
      '<ul>',
      '<li>Mark each step as Passed, Failed, or Blocked</li>',
      '<li>Create bugs directly from a failed test step (pre-populated with repro steps)</li>',
      '<li>Capture screenshots and link them to the test result</li>',
      '<li>Record the build/commit under test for traceability</li>',
      '</ul>',
      '<div class="callout warn"><strong>Common mistake:</strong> Marking a test case as \'Passed\' when only the happy path was checked. A test case with 5 steps where step 3 is \'Verify error message appears for invalid input\' must actually test the invalid input. Trust your test plan, do not skip steps.</div>',
    ].join("\n"),

    "mod-2-4": [
      '<h1>Linking ACs to Tests and Bugs</h1>',
      '<p class="chapter-intro">Traceability is the backbone of professional QA. Every test case and every bug should be linkable back to a requirement or acceptance criterion.</p>',
      '<h2>The Traceability Chain</h2>',
      '<pre>User Story #45678\n  \u2514\u2500\u2500 Task #45679: Implement duplicate detection\n  \u2514\u2500\u2500 Acceptance Criteria (in Story description)\n        \u2514\u2500\u2500 AC-1: Warning displays when Subject Name matches open case\n              \u2514\u2500\u2500 Test Case TC-101: Verify duplicate warning on matching name\n              \u2514\u2500\u2500 Test Case TC-102: Verify dismiss continues submission\n                    \u2514\u2500\u2500 Bug #45901: Warning dismiss button not visible on Safari</pre>',
      '<h2>How to Link in Azure DevOps</h2>',
      '<ul>',
      '<li><strong>Test Case to Requirement/User Story:</strong> Use the \'Test Cases\' tab on the story, or link via the \'Links\' section of the test case. Use the \'Tests\' link type.</li>',
      '<li><strong>Bug to Test Case:</strong> When creating a bug from a test step in the Test Runner, the link is automatic. The bug references the test case; the test case references the requirement.</li>',
      '<li><strong>Bug to AC:</strong> Reference the AC number in the bug title and description. e.g. "Violation of AC-2.1: Junior can escalate cases."</li>',
      '</ul>',
      '<div class="callout good"><strong>Why traceability matters:</strong> When a release manager asks \'Has story #45678 been tested?\' you can answer definitively, not with a guess. When a bug is reported, you can immediately identify which AC is violated and which test case should have caught it.</div>',
      '<h2>Audit Trail for Compliance</h2>',
      '<p>In regulated environments (healthcare, financial services), traceability is not optional. Auditors require proof that every requirement has a corresponding test and that every bug is linked to its source requirement. Azure DevOps makes this possible — but only if you do the linking discipline every day.</p>',
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ─────────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3 — Assessment</div>',
        '<h1>Full Capstone</h1>',
        '<p class="chapter-intro">This is the final challenge for QA Onboarding Advanced. You\'ll combine your deep D365 testing skills (Module 1) with your Azure DevOps mastery (Module 2) in a complete end-to-end assessment. Unlike the beginner capstone, this assessment requires you to work through a multi-step scenario across both platforms independently.</p>',
        '<h2>What You\'ll Be Tested On</h2>',
        '<ul>',
          '<li>Investigating a complex D365 case with business process flows and integrations</li>',
          '<li>Identifying edge-case defects that go beyond surface-level validation</li>',
          '<li>Writing professional bug reports with complete repro steps and AC references</li>',
          '<li>Demonstrating traceability from requirement to test to bug report</li>',
          '<li>Managing your time across a multi-tool workflow</li>',
        '</ul>',
        '<div class="callout warn"><strong class="callout-icon">🎯</strong><div class="callout-body"><strong>How to Prepare</strong>Review your notes from Modules 1 and 2. Make sure you\'re comfortable with D365 workflow testing (Module 1) and ADO test plans and traceability (Module 2). This assessment assumes both are fresh.</div></div>',
        '<p><strong>Pass mark:</strong> Your bug reports will be evaluated for completeness, accuracy, and professional presentation. A passing score requires identifying the critical defects with full traceability.</p>',
        '<div style="margin-top:var(--space-6);padding-top:var(--space-5);border-top:1px solid var(--color-border, #e5e7eb);text-align:center;">',
          '<button class="btn btn-primary" onclick="window.completeCourseFromCapstone()" style="font-size:15px;padding:12px 28px;font-weight:600;border-radius:9999px;background:#AF52DE;color:white;border:none;cursor:pointer;font-family:inherit;transition:all 0.2s ease;box-shadow:0 4px 12px rgba(175,82,222,0.3);">Complete Course →</button>',
        '</div>',
      '</div>',
    ].join("\n"),

    // ── MODULE 3: Full Capstone ─────────────────────────────────────────────
    "capstone-advanced": [
      '<div class="course-end-card-wrapper">',
      '<div class="course-end-card">',
      // Header: Gradient background
      '<div class="course-end-header">',
      '<span style="font-weight: 600; font-size: 13px; letter-spacing: 0.5px;">COURSE COMPLETE</span>',
      '</div>',
      // Body: Main content
      '<div class="course-end-body">',
      '<div style="font-size: 48px; margin-bottom: 16px;">🎓</div>',
      '<h2>Congratulations!</h2>',
      '<p>You have successfully completed the <strong>QA Advanced</strong> course. You now have the knowledge and skills to take on the Advanced Capstone Assessment.</p>',
      '<p style="margin-top: 20px; color: var(--color-ink-soft);">The capstone is a real-world testing scenario where you will apply everything you have learned. Are you ready for the challenge?</p>',
      '</div>',
      // Footer: Two buttons
      '<div class="course-end-footer-dual">',
      '<a href="portal.html" class="btn btn-secondary" style="text-decoration:none;">← Return to Home</a>',
      '<a href="portal.html" class="btn btn-primary" style="text-decoration:none;">Start Capstone 2 →</a>',
      '</div>',
      '</div>',
      '</div>',
    ].join("\n"),
  },

  // ── Introduction to Dynamics CRM ───────────────────────────────────────
  "dynamics-crm-basics": {

    // ── MODULE 1 OVERVIEW ─────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Navigating the Case Form</h1>',
        '<p class="chapter-intro">Welcome to Dynamics CRM basics. This module introduces the case form layout — the central screen you will use every day as a QA tester. Understanding the form structure is the first step to testing CRM effectively.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The anatomy of a Dynamics case form</li>',
          '<li>How tabs and sections organize fields</li>',
          '<li>How to use the Timeline and Notes features</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Why This Matters</strong>Every piece of data in Dynamics lives somewhere on a form. If you cannot navigate the form, you cannot verify the data. This module gives you the map. Module 2 teaches you to read what the map shows. Module 3 covers the Business Process Flow that guides the work.</div></div>',
        '<p><strong>Time estimate:</strong> ~25 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 1: Navigating the Case Form ────────────────────────────────
    "mod-1-1": [
      '<h1>The Dynamics Case Form Layout</h1>',
      '<p class="chapter-intro">A Dynamics 365 case form is not just a flat page of fields. It is a structured layout with a header, tabs, sections, and a timeline. Understanding this layout helps you find information quickly and identify missing or misconfigured fields.</p>',
      '<h2>The Header</h2>',
      '<p>The top of the case form shows the <strong>header bar</strong>, which displays key identifying fields: the Case Title, Case ID, Status, and Priority. These fields are always visible, even when you scroll between tabs. The header gives you instant context about the case you are viewing.</p>',
      '<h2>The Main Body</h2>',
      '<p>Below the header, the form is divided into <strong>tabs</strong>. Each tab groups related fields together. A typical case might have tabs labelled "Details," "Customer," "Notes," and "Related." You click a tab to reveal its contents. Inside each tab, fields are further grouped into <strong>sections</strong> with section headers.</p>',
      '<h2>The Command Bar</h2>',
      '<p>At the top of the form, a toolbar (the command bar) provides actions like Save, Save & Close, Assign, Resolve, and Cancel Case. The available actions depend on the user\'s role and the case status. Some actions open new dialogs; others change the form state.</p>',
      '<div class="callout tip"><strong>Tip:</strong> When testing a Dynamics form, check that every expected tab and section is visible for each role. A field that a Senior can see might be hidden from a Junior. Use role-switching to verify.</div>',
      '<h2>The Footer</h2>',
      '<p>The bottom of the form typically shows status-related information like Created On, Modified On, and the name of the person who last updated the case. Some forms also show a Business Process Flow bar at the top or side.</p>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Fields, Tabs and Sections</h1>',
      '<p class="chapter-intro">Now that you know the form layout, let us zoom in on how fields are organized within tabs and sections — and why this structure matters for testing.</p>',
      '<h2>Types of Fields</h2>',
      '<p>Dynamics supports many field types. As a tester, you will encounter these most often:</p>',
      '<ul>',
      '<li><strong>Text fields</strong> — Single line or multi-line. Test for max length, special characters, and XSS injection patterns.</li>',
      '<li><strong>Option Sets</strong> — Dropdown menus. Verify all options are present, in the right order, and that the default selection makes sense.</li>',
      '<li><strong>Lookups</strong> — Links to related records (Customer, Product). Test that the lookup finds the right records and handles deactivated entries.</li>',
      '<li><strong>Date/Time pickers</strong> — Check for time zone handling, past vs. future date restrictions, and boundary values like leap years.</li>',
      '<li><strong>Boolean (checkbox)</strong> — Simple true/false. Test both states and the transition between them.</li>',
      '</ul>',
      '<h2>Tab Behaviour</h2>',
      '<p>Some tabs appear conditionally. For example, a "Billing" tab might only show when the case type is "Invoice Issue." As a tester, you need to verify that tabs appear and disappear based on field values or business rules. A common bug is a tab that never shows up — or shows up when it should not.</p>',
      '<div class="callout warn"><strong>Watch out:</strong> Section visibility can also be conditional. A section titled "Escalation Details" might only appear when Status = "Escalated." Test both the visible and hidden states.</div>',
      '<h2>Field Requirements</h2>',
      '<p>Fields can be required, recommended, or optional. Business-required fields show a red asterisk. If a required field is empty, the form will not save. Test saving with empty required fields to verify the validation message appears correctly.</p>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>The Timeline and Notes</h1>',
      '<p class="chapter-intro">The Timeline is a running log of everything that has happened on a case. The Notes section is where users add free-form observations. Both are critical for understanding case history.</p>',
      '<h2>The Timeline Widget</h2>',
      '<p>The Timeline appears as a vertical feed on the right side of the case form (or as a separate tab). It records activities automatically: when the case was created, when it changed status, when notes were added, when emails were sent. Each entry has a timestamp and the name of the person who performed the action.</p>',
      '<p>For testing, the Timeline is your <strong>truth source</strong>. If the UI shows "Escalated" but the Timeline shows no escalation activity, you have found a bug. Always cross-reference the Timeline against what the form displays.</p>',
      '<h2>Adding Notes</h2>',
      '<p>Notes are free-text entries that support plain text and basic formatting. When testing the Notes field, check:</p>',
      '<ul>',
      '<li>Does the note save and appear immediately in the Timeline?</li>',
      '<li>Can you edit or delete a note after saving?</li>',
      '<li>Are notes visible to all roles, or restricted?</li>',
      '<li>What happens with very long text (character limits)?</li>',
      '</ul>',
      '<div class="callout good"><strong>Pro tip:</strong> When you file a bug report based on CRM investigation, paste the Timeline evidence link (or a screenshot with timestamps) into the bug report. This makes your bug impossible to dispute.</div>',
      '<h2>Activity Types</h2>',
      '<p>Beyond notes, the Timeline can show emails, phone calls, tasks, and appointments. Each activity type has its own form. Test that clicking each activity opens the correct form and that the activity fields are populated correctly.</p>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ─────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Reading Case Data</h1>',
        '<p class="chapter-intro">A case form is full of data. The skill is knowing what to look at and what it means. This module teaches you to read case status, interpret priority and severity, and understand the customer and product information tied to the case.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How case status values map to the case lifecycle</li>',
          '<li>The difference between priority and severity</li>',
          '<li>How customer and product records link to a case</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building On Module 1</strong>Module 1 showed you where to find things on the form. Module 2 teaches you how to interpret what you find. Module 3 completes the picture with the Business Process Flow that drives a case from creation to resolution.</div></div>',
        '<p><strong>Time estimate:</strong> ~20 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-2-1": [
      '<h1>Understanding Case Status</h1>',
      '<p class="chapter-intro">Every case in Dynamics has a Status field that tells you where it is in its lifecycle. Understanding the status model is essential for both testing and bug reporting.</p>',
      '<h2>Standard Status Values</h2>',
      '<p>Most Dynamics CRM implementations use these status values:</p>',
      '<ul>',
      '<li><strong>Open</strong> — The case has been created but no work has started. Default state for new cases.</li>',
      '<li><strong>In Progress</strong> — Someone is actively working on the case.</li>',
      '<li><strong>Pending Review</strong> — Work is done and waiting for approval or additional info.</li>',
      '<li><strong>Resolved</strong> — The issue has been fixed from the system side.</li>',
      '<li><strong>Closed</strong> — The customer has confirmed resolution, or the case is archived.</li>',
      '</ul>',
      '<h2>Status Transitions</h2>',
      '<p>Status transitions are often governed by the Business Process Flow. For example, you cannot go from Open directly to Closed without passing through In Progress. When testing, verify that invalid transitions are blocked and that valid transitions update the Timeline correctly.</p>',
      '<div class="callout warn"><strong>Common bug:</strong> A status changes in the header but the Timeline shows no transition record. This usually means the status was changed via a direct database update or a misconfigured workflow rather than through the proper UI flow.</div>',
      '<h2>Status vs. Status Reason</h2>',
      '<p>Each status can have sub-statuses called Status Reason. For example, "Resolved" might have reasons: "Fixed," "Workaround Provided," or "By Design." Always check both fields when reading case data.</p>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Priority and Severity</h1>',
      '<p class="chapter-intro">Priority and severity are often confused. They are related but serve different purposes. Understanding the difference helps you triage bugs and verify that cases are correctly categorized.</p>',
      '<h2>Severity</h2>',
      '<p>Severity describes the <strong>technical impact</strong> of an issue on the system. Standard levels are:</p>',
      '<ul>',
      '<li><strong>Critical (Severity A)</strong> — Complete system outage or data corruption. No workaround exists. Example: Login is broken for all users.</li>',
      '<li><strong>High (Severity B)</strong> — Major feature is broken but a workaround exists. Example: The invoice download fails, but users can copy the data manually.</li>',
      '<li><strong>Medium (Severity C)</strong> — Minor feature issue or cosmetic problem. Example: A button is misaligned but still functional.</li>',
      '<li><strong>Low (Severity D)</strong> — Enhancement or very minor visual issue. Example: A tooltip shows outdated information.</li>',
      '</ul>',
      '<h2>Priority</h2>',
      '<p>Priority describes the <strong>business urgency</strong> — how quickly the issue needs to be addressed. Priority can change over time. A Low-severity issue affecting a VIP client might have High priority.</p>',
      '<div class="callout good"><strong>Key rule:</strong> Severity is set by the tester (technical assessment). Priority is set by the project manager or product owner (business decision). Never confuse the two in a bug report.</div>',
      '<h2>Testing Priority/Severity Fields</h2>',
      '<p>When testing these fields, verify that the options list is complete, the default value is sensible, and changing the value updates any dependent workflows (e.g., setting Priority to High triggers an escalation notification).</p>',
    ].join("\n"),

    "mod-2-3": [
      '<h1>Customer and Product Information</h1>',
      '<p class="chapter-intro">A case is never an isolated record. It is always linked to a customer (account or contact) and often to a product. These relationships drive context and business logic.</p>',
      '<h2>The Customer Lookup</h2>',
      '<p>Every case has a <strong>Customer</strong> field — a lookup to an Account (company) or Contact (individual). This links the case to the person reporting the issue. When testing:</p>',
      '<ul>',
      '<li>Does the lookup find both active and inactive accounts? (It should only find active ones unless the user has special permissions.)</li>',
      '<li>Does the customer name appear correctly after saving?</li>',
      '<li>Can you open the customer record from the case by clicking the lookup?</li>',
      '</ul>',
      '<h2>The Product Lookup</h2>',
      '<p>If your organization tracks product issues, the case may have a <strong>Product</strong> field. This links the case to a specific product or product family. Testing tips:</p>',
      '<ul>',
      '<li>Verify that only products the customer is entitled to appear in the lookup.</li>',
      '<li>Check that the product name, version, and serial number (if applicable) display correctly.</li>',
      '<li>Confirm that changing the product updates related fields (e.g., support level, SLA).</li>',
      '</ul>',
      '<div class="callout tip"><strong>Testing strategy:</strong> Create test accounts and products with known properties. Then create cases linking to them and verify that all related information flows correctly. This is called "end-to-end entity testing."</div>',
      '<h2>Related Records</h2>',
      '<p>The "Related" tab on a case form shows linked records: activities, sub-cases, knowledge articles, and email threads. A bug may involve a missing related record or an incorrect relationship.</p>',
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ─────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3</div>',
        '<h1>The Business Process Flow</h1>',
        '<p class="chapter-intro">The Business Process Flow (BPF) is a guided sequence of stages that a case moves through. It enforces consistency and ensures no step is skipped. This module covers what a BPF is and how to work through its stages.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What a Business Process Flow is and why it exists</li>',
          '<li>How stages and steps work</li>',
          '<li>How to verify BPF behaviour during testing</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Final Module</strong>This is the last module in this course. After the quiz, you will have a solid foundation in Dynamics CRM navigation. The next step is the Azure DevOps course where you apply these skills to write better bug reports.</div></div>',
        '<p><strong>Time estimate:</strong> ~18 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-3-1": [
      '<h1>What is a BPF?</h1>',
      '<p class="chapter-intro">A Business Process Flow (BPF) in Dynamics 365 is a visual guide that leads users through a standard business process. It appears as a bar at the top of a form showing the current stage and the steps required to move forward.</p>',
      '<h2>BPF vs. Workflow</h2>',
      '<p>Many new testers confuse BPFs with workflows. Here is the difference:</p>',
      '<ul>',
      '<li><strong>BPF</strong> — A UI-level guide that requires user interaction. The user fills in fields and clicks "Next Stage." The BPF does not run in the background.</li>',
      '<li><strong>Workflow</strong> — A background process that runs automatically on triggers (create, update, etc.). No user interaction required.</li>',
      '</ul>',
      '<h2>BPF Components</h2>',
      '<p>Each BPF consists of:</p>',
      '<ul>',
      '<li><strong>Stages</strong> — Major phases (e.g., "New Case," "Investigation," "Resolution"). A case can only be in one stage at a time.</li>',
      '<li><strong>Steps</strong> — Fields within a stage that must be completed before moving to the next stage.</li>',
      '<li><strong>Conditional branching</strong> — The BPF can branch to different next stages based on field values.</li>',
      '</ul>',
      '<div class="callout warn"><strong>Critical test:</strong> If the BPF bar does not appear when it should, the process is broken. If it appears when it should not, the BPF configuration is wrong. Both are bugs.</div>',
      '<h2>Why BPFs Matter to Testers</h2>',
      '<p>BPFs enforce business rules. When you test a case, you must follow the BPF to see if it correctly guides the user, enforces required fields, and moves through stages in the right order. A misconfigured BPF can cause data loss or skipped steps.</p>',
    ].join("\n"),

    "mod-3-2": [
      '<h1>Working Through Stages</h1>',
      '<p class="chapter-intro">Once you understand what a BPF is, the next step is learning how to interact with it and verify its behaviour during testing.</p>',
      '<h2>Navigating Stages</h2>',
      '<p>The BPF bar shows all stages horizontally. The current stage is highlighted. Completed stages show a checkmark. Future stages are dimmed. You click "Next Stage" to advance, but only if all required steps in the current stage are completed.</p>',
      '<h2>Testing Stage Transitions</h2>',
      '<p>When testing BPFs, verify these scenarios:</p>',
      '<ul>',
      '<li>All required steps prevent advancing to the next stage. Try leaving each step empty.</li>',
      '<li>Optional steps do not block advancement — you can skip them.</li>',
      '<li>Clicking "Next Stage" saves the form and moves forward.</li>',
      '<li>Going back to a previous stage is allowed (or blocked, depending on configuration).</li>',
      '<li>Conditional branching works: changing a field value redirects to the correct next stage.</li>',
      '</ul>',
      '<h2>BPF and Roles</h2>',
      '<p>Some BPFs are role-specific. A Senior Investigator might see a different BPF than a Junior. Test with each role to confirm the correct BPF appears. A common bug is a user seeing the wrong BPF (or no BPF) due to a security role misconfiguration.</p>',
      '<div class="callout good"><strong>Pro tip:</strong> When filing a bug about a BPF issue, include screenshots of: (1) the current stage you are stuck on, (2) the warning message (if any), and (3) the expected stage from the process documentation. This gives developers everything they need to reproduce the issue.</div>',
      '<h2>Multiple BPFs</h2>',
      '<p>Dynamics supports multiple BPFs per entity. If multiple BPFs apply, the user sees a "Switch Process" option. Test that switching processes works without data loss.</p>',
    ].join("\n"),
  },

  // ── Azure DevOps — Bug Reports ────────────────────────────────────────
  "ado-bug-reports": {

    // ── MODULE 1 OVERVIEW ─────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Anatomy of a Bug Report</h1>',
        '<p class="chapter-intro">A bug report is your primary communication tool as a QA tester. A well-written bug report tells developers exactly what is broken and how to fix it. This module breaks down the Azure DevOps bug report form piece by piece.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The fields on a standard Azure DevOps bug report form</li>',
          '<li>How to write clear titles and descriptions</li>',
          '<li>The critical difference between expected and actual results</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Course Roadmap</strong>Module 1 covers the form itself. Module 2 focuses on writing repro steps that actually reproduce. Module 3 covers severity and priority — the two fields that determine how urgently your bug gets addressed.</div></div>',
        '<p><strong>Time estimate:</strong> ~22 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-1-1": [
      '<h1>The Bug Report Form</h1>',
      '<p class="chapter-intro">Azure DevOps uses a structured work item form for bug reports. Every field has a purpose. Knowing what each field is for helps you fill out reports correctly and test them effectively.</p>',
      '<h2>The Title Field</h2>',
      '<p>The title is the first thing developers see in a backlog. A good title follows this formula: <strong>"[Area] — [What happens] when [action]"</strong>. Example: "Login — 500 error when submitting valid credentials." Bad title: "It broke."</p>',
      '<h2>The Description Field</h2>',
      '<p>The description is your main space for detail. Use this structure:</p>',
      '<ol>',
      '<li><strong>Summary</strong> — One or two sentences explaining the issue.</li>',
      '<li><strong>Steps to Reproduce</strong> — Numbered list of exact steps.</li>',
      '<li><strong>Expected Results</strong> — What should happen.</li>',
      '<li><strong>Actual Results</strong> — What actually happens (including error messages).</li>',
      '<li><strong>Environment</strong> — Browser, OS, build version, test data used.</li>',
      '</ol>',
      '<h2>Additional Fields</h2>',
      '<p>Azure DevOps provides several extra fields:</p>',
      '<ul>',
      '<li><strong>Assigned To</strong> — Who should fix this? Leave blank if unsure; the team lead will assign it.</li>',
      '<li><strong>Area Path</strong> — The feature or component area. Helps filter the backlog.</li>',
      '<li><strong>Iteration Path</strong> — Which sprint this bug belongs to.</li>',
      '<li><strong>Tags</strong> — Labels for filtering (e.g., "regression," "accessibility").</li>',
      '<li><strong>Attachments</strong> — Screenshots, logs, or videos. Always attach evidence.</li>',
      '</ul>',
      '<div class="callout tip"><strong>Tip:</strong> Attachments are not optional. A screenshot of the error is worth 100 words in the description. If you can capture a video of the repro steps, even better.</div>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Title and Description</h1>',
      '<p class="chapter-intro">The title and description are the most-read parts of a bug report. If they are unclear, developers will waste time asking questions instead of fixing the bug. Let us look at what makes them effective.</p>',
      '<h2>Writing a Strong Title</h2>',
      '<p>A strong title lets a developer know at a glance whether the bug is in their area and how urgent it is. Use this template:</p>',
      '<blockquote><strong>[Module/Feature] — [Observed behaviour] when [specific condition]</strong></blockquote>',
      '<p>Examples:</p>',
      '<ul>',
      '<li>Good: "Case Form — Save button remains disabled after filling all required fields"</li>',
      '<li>Good: "Invoice — PDF generation fails for amounts over $10,000"</li>',
      '<li>Bad: "Button not working"</li>',
      '<li>Bad: "Bug in UI"</li>',
      '</ul>',
      '<h2>Description Best Practices</h2>',
      '<p>Your description should answer three questions: <strong>What?</strong> (what is happening), <strong>Where?</strong> (what screen or feature), and <strong>How?</strong> (how to reproduce it).</p>',
      '<p>Include exact values you entered, the exact error message (screenshot or copy-pasted), and the test data you used. Ambiguity is your enemy. Every piece of information you omit forces the developer to guess — and guesses cost time.</p>',
      '<div class="callout warn"><strong>Anti-pattern:</strong> "I clicked around and it crashed." This tells the developer nothing. Be specific: "I logged in as TestUser1, navigated to Case 12345, clicked the Resolve button, and the page returned a 500 error."</div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Expected vs Actual</h1>',
      '<p class="chapter-intro">The Expected Results and Actual Results fields are arguably the most important part of a bug report. They define the gap between what the software should do and what it actually does.</p>',
      '<h2>Expected Results</h2>',
      '<p>Expected results come from the <strong>Acceptance Criteria</strong> (ACs) of the user story. If the AC says "When the user clicks Save, the case status changes to In Progress," then the expected result is exactly that. Do not guess — refer to the story\'s ACs.</p>',
      '<h2>Actual Results</h2>',
      '<p>Actual results describe what the system <em>actually</em> did. Be precise. Instead of "It did not save," write "After clicking Save, the page refreshed but the case status remained Open. No error message was displayed."</p>',
      '<h2>Why Both Matter</h2>',
      '<p>Including both fields makes a bug report <strong>self-contained</strong>. A developer can read the Expected and Actual fields and immediately understand the gap. Without both, the developer has to guess what you expected to happen.</p>',
      '<div class="callout good"><strong>Pro tip:</strong> When the expected behaviour is not documented, state it explicitly: "Expected: The system should display a confirmation message and return to the case list. Actual: The page shows a generic error and the case list does not load." This forces a conversation about whether the behaviour is a bug or a missing requirement.</div>',
      '<h2>Edge Case: No Clear Expected Behaviour</h2>',
      '<p>Sometimes there is no documented AC. In that case, use your judgment based on similar features, industry standards, or common sense. Note in the bug report: "Expected behaviour inferred from [similar feature / user expectation]."</p>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ─────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Writing Great Repro Steps</h1>',
        '<p class="chapter-intro">Repro steps are the instructions that let anyone — developer, tester, manager — reproduce the bug you found. If your repro steps do not work, your bug report is useless. This module teaches you the "3 Exactlys" and the most common mistakes to avoid.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The "3 Exactlys" framework for repro steps</li>',
          '<li>Common mistakes that make repro steps unreliable</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building On Module 1</strong>Module 1 covered the form fields. Module 2 focuses specifically on the repro steps — the most commonly miswritten part of a bug report. Module 3 covers severity and priority so you can correctly classify your bugs.</div></div>',
        '<p><strong>Time estimate:</strong> ~16 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-2-1": [
      '<h1>The 3 Exactlys</h1>',
      '<p class="chapter-intro">Every repro step must be exact. The "3 Exactlys" framework helps you write steps that anyone can follow and get the same result every time.</p>',
      '<h2>1. Exact Data</h2>',
      '<p>What data did you use? Specify usernames, case IDs, product names, dates, and any values you entered. Do not say "log in with a test user." Say "log in as TestUser1 (admin@test.com / Password123)." The exact data matters because some bugs only appear with specific data combinations.</p>',
      '<h2>2. Exact Steps</h2>',
      '<p>Number every step. Each step should be a single action: "Click the Save button," not "Save and then navigate away." If there are 15 steps, list all 15. Skipping steps is the most common reason bugs cannot be reproduced.</p>',
      '<blockquote>Good: "1. Log in as TestUser1. 2. Navigate to Cases. 3. Open Case CR-0042. 4. Click the Resolve button in the command bar. 5. Select "Fixed" from the Status Reason dropdown. 6. Click OK."</blockquote>',
      '<h2>3. Exact Environment</h2>',
      '<p>What browser, OS, device, and build version were you using? A bug that appears in Chrome might not appear in Firefox. A bug on Windows might not appear on Mac. Always include:</p>',
      '<ul>',
      '<li>Browser name and version</li>',
      '<li>Operating system</li>',
      '<li>Build number or sprint number</li>',
      '<li>Screen resolution (for layout bugs)</li>',
      '</ul>',
      '<div class="callout warn"><strong>Common failure:</strong> "I cannot reproduce it." The developer says this because your steps were not exact. Follow the 3 Exactlys and this phrase disappears from your workflow.</div>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Common Repro Mistakes</h1>',
      '<p class="chapter-intro">Even experienced testers make mistakes in repro steps. Here are the most common ones to watch out for and fix before you submit.</p>',
      '<h2>Mistake 1: Assuming Preconditions</h2>',
      '<p>Do not assume the developer has the same test data as you. If a bug requires a case to be in "Pending Review" status with a specific escalation reason, say so in the preconditions before step 1. Write: "Prerequisite: Case CR-0042 is in Pending Review status with Escalation Reason = Policy Breach."</p>',
      '<h2>Mistake 2: Missing Error Details</h2>',
      '<p>"It crashed" is not a repro step. What exactly appeared on screen? A 500 error? A blank page? A popup message? Screenshot it. Copy the error text. Developers need the exact error message to search their codebase for the problem.</p>',
      '<h2>Mistake 3: One Giant Paragraph</h2>',
      '<p>Repro steps should be numbered, not written as a paragraph. A numbered list forces you to think about each step individually. It also lets the developer check off steps as they go.</p>',
      '<div class="callout good"><strong>Best practice:</strong> After writing your repro steps, have another tester follow them exactly. If they can reproduce the bug, your steps are good. If they get stuck or get a different result, revise your steps.</div>',
      '<h2>Mistake 4: Omitting the "Before" State</h2>',
      '<p>Describe what the screen looked like before you performed the action. This helps developers understand context. Example: "Before clicking Save, the form shows all fields populated and the BPF stage is set to Investigation."</p>',
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ─────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3</div>',
        '<h1>Severity and Priority</h1>',
        '<p class="chapter-intro">Severity and priority determine how quickly a bug gets fixed — and whether it gets fixed at all. This module explains the difference between the two and how to apply them correctly.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The standard severity levels and when to use each</li>',
          '<li>How priority differs from severity</li>',
          '<li>How to classify bugs correctly</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Final Module</strong>This is the last module in this course. After the quiz, you will understand how to use Azure DevOps to write clear, actionable bug reports that developers love to receive.</div></div>',
        '<p><strong>Time estimate:</strong> ~14 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-3-1": [
      '<h1>Severity Levels</h1>',
      '<p class="chapter-intro">Severity measures the technical impact of a bug on the system. It is assigned by the tester based on objective criteria — not by how annoyed the customer is.</p>',
      '<h2>The Four Levels</h2>',
      '<ul>',
      '<li><strong>Severity 1 — Critical</strong>. The application crashes, data is corrupted, or a core feature is completely unavailable to all users. No workaround exists. Example: "Clicking Submit on any case causes a 500 error. All testing is blocked."</li>',
      '<li><strong>Severity 2 — High</strong>. A major feature is broken but a workaround exists, or the bug affects many users but not all. Example: "The export-to-PDF button returns a blank file, but users can use Print to PDF as a workaround."</li>',
      '<li><strong>Severity 3 — Medium</strong>. A minor feature behaves incorrectly. The workflow is disrupted but the user can continue working. Example: "The sort order in the case list resets after refresh."</li>',
      '<li><strong>Severity 4 — Low</strong>. Cosmetic issues, typos, or very minor UI inconsistencies. Example: "The label on the Save button uses British spelling (\'Saviour\') instead of American spelling (\'Savior\')."</li>',
      '</ul>',
      '<h2>When in Doubt, Go Lower</h2>',
      '<p>If you are unsure between two severity levels, choose the lower one. Developers and project managers can always increase severity. It is worse to inflate severity and lose credibility than to set it conservatively and let the triage team decide.</p>',
      '<div class="callout tip"><strong>Tip:</strong> Severity should not change over time unless new information emerges. If you set a bug as Low severity and it turns out the feature is used by thousands of customers daily, it might need to be reclassified as High.</div>',
    ].join("\n"),

    "mod-3-2": [
      '<h1>Priority vs Severity</h1>',
      '<p class="chapter-intro">Severity and priority are related but serve different purposes. Understanding this distinction is a hallmark of a professional QA engineer.</p>',
      '<h2>The Difference</h2>',
      '<p>Severity answers: "How bad is this from a technical perspective?" Priority answers: "How urgently does this need to be fixed from a business perspective?"</p>',
      '<p>A bug can be high severity but low priority (a critical bug in a feature no one uses yet). A bug can be low severity but high priority (a cosmetic typo on the CEO\'s dashboard page).</p>',
      '<h2>Who Sets What</h2>',
      '<ul>',
      '<li><strong>Severity:</strong> Set by the tester. Based on technical impact. Objective.</li>',
      '<li><strong>Priority:</strong> Set by the project manager or product owner during triage. Based on business needs. Subjective.</li>',
      '</ul>',
      '<p>As a tester, you set severity. You may suggest priority, but the final call belongs to the person managing the backlog.</p>',
      '<div class="callout warn"><strong>Common mistake:</strong> Setting all bugs to High priority because you want them fixed fast. This makes priority meaningless. If everything is High, nothing is High. Be disciplined.</div>',
      '<h2>Priority Matrix</h2>',
      '<p>Bugs are typically prioritized by combining severity and business impact:</p>',
      '<ul>',
      '<li><strong>P0 — Blocker:</strong> Severity 1 + affects production or blocks all testing. Fix immediately.</li>',
      '<li><strong>P1 — High:</strong> Severity 1-2 + affects a key feature. Must fix this sprint.</li>',
      '<li><strong>P2 — Medium:</strong> Severity 2-3 + moderate impact. Fix this sprint or next.</li>',
      '<li><strong>P3 — Low:</strong> Severity 3-4 + minor impact. Fix when time permits.</li>',
      '</ul>',
    ].join("\n"),
  },

  // ── Acceptance Criteria Fundamentals ───────────────────────────────────
  "acceptance-criteria-basics": {

    // ── MODULE 1 OVERVIEW ─────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>What Are Acceptance Criteria?</h1>',
        '<p class="chapter-intro">Acceptance Criteria (ACs) are the conditions that a feature must meet to be considered complete. They are the contract between what the business wants and what developers build. This module covers what ACs are, why they matter, and how to tell good ACs from bad ones.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>The definition and purpose of acceptance criteria</li>',
          '<li>How to distinguish good ACs from bad ACs</li>',
          '<li>Where ACs live in Azure DevOps and how to find them</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Course Roadmap</strong>Module 1 defines ACs and why they matter. Module 2 teaches you the Given/When/Then format for writing clear ACs. Module 3 shows you how to trace bugs back to the ACs they violate — the foundation of evidence-based bug reporting.</div></div>',
        '<p><strong>Time estimate:</strong> ~24 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-1-1": [
      '<h1>Definition and Purpose</h1>',
      '<p class="chapter-intro">Acceptance Criteria define the boundary of a feature. They answer one question: "How do we know when this story is done?" Without ACs, there is no objective way to say whether a feature works correctly.</p>',
      '<h2>What Are ACs?</h2>',
      '<p>Acceptance Criteria are a set of conditions that a user story must satisfy to be accepted by the product owner. They are written before development starts and serve as the test oracle for QA. If the feature meets all ACs, it passes. If it fails any AC, it is a bug.</p>',
      '<h2>Why ACs Matter for QA</h2>',
      '<p>For testers, ACs serve three purposes:</p>',
      '<ol>',
      '<li><strong>Test basis</strong> — ACs tell you exactly what to test. Every AC should map to at least one test case.</li>',
      '<li><strong>Bug justification</strong> — A bug is simply an AC that is not being met. If the AC says X and the system does Y, you have a bug. No interpretation needed.</li>',
      '<li><strong>Release gate</strong> — A story cannot be marked Done until all ACs pass. This gives testers the authority to block releases.</li>',
      '</ol>',
      '<div class="callout good"><strong>Key insight:</strong> ACs turn testing from a subjective exercise ("Does this feel right?") into an objective one ("Does this meet condition #3?"). Always test against ACs, not against your intuition.</div>',
      '<h2>ACs vs. Requirements</h2>',
      '<p>Requirements are broad statements about what a system should do. ACs are specific, testable conditions. A requirement might be "Users should be able to reset their password." The ACs would specify: the reset email sends within 30 seconds, the link expires after 24 hours, the new password meets complexity rules, etc.</p>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Good vs Bad ACs</h1>',
      '<p class="chapter-intro">Not all acceptance criteria are created equal. Some are precise and testable. Others are vague and useless. Learning to tell the difference makes you a better tester — and helps you catch bugs that others miss.</p>',
      '<h2>Characteristics of Good ACs</h2>',
      '<ul>',
      '<li><strong>Testable</strong> — Can you write a pass/fail test for it? "The page loads quickly" is not testable. "The page loads in under 2 seconds on a 10 Mbps connection" is testable.</li>',
      '<li><strong>Specific</strong> — No ambiguity. "The user gets an error" is vague. "The user sees the message: Session expired. Please log in again." is specific.</li>',
      '<li><strong>Unambiguous</strong> — One interpretation only. "The button is easy to find" is subjective. "The Save button appears in the top-right corner of the form" is unambiguous.</li>',
      '<li><strong>Concise</strong> — One condition per AC. Not a paragraph. If an AC has "and" or "or," consider splitting it.</li>',
      '</ul>',
      '<h2>Examples: Good vs. Bad</h2>',
      '<blockquote><strong>Bad AC:</strong> "The system should handle errors gracefully."<br><strong>Good AC:</strong> "When the server returns a 500 error, the form displays the message: Something went wrong. Please try again. The form data is preserved."</blockquote>',
      '<blockquote><strong>Bad AC:</strong> "Search should be fast."<br><strong>Good AC:</strong> "Search returns results within 3 seconds for a database of up to 10,000 records."</blockquote>',
      '<div class="callout warn"><strong>Real-world impact:</strong> Vague ACs lead to disputes between testers, developers, and product owners. "I thought it was working fine." "No, the AC says it should do X." If the AC is ambiguous, everyone has a different interpretation. Good ACs prevent these arguments.</div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Where ACs Live</h1>',
      '<p class="chapter-intro">Acceptance Criteria are not abstract ideas — they live in specific places in your development tools. Knowing where to find them is as important as knowing how to read them.</p>',
      '<h2>Azure DevOps Work Items</h2>',
      '<p>In Azure DevOps, ACs are stored in the <strong>Acceptance Criteria</strong> field of a User Story or Product Backlog Item. When you open a work item, scroll to the Acceptance Criteria section. Each criterion is typically written as a checklist item or in the Description field under a "Acceptance Criteria" heading.</p>',
      '<h2>Definition of Done vs. ACs</h2>',
      '<p>Do not confuse ACs with the Definition of Done (DoD). The DoD applies to <em>every</em> story: code reviewed, unit tests passed, no critical bugs, etc. ACs are <em>specific to one story</em>.</p>',
      '<div class="callout tip"><strong>Pro tip:</strong> Before you start testing a story, read the ACs first. If the ACs are missing, ask for them. Never start testing without knowing what "done" looks like. Testing without ACs is guessing.</div>',
      '<h2>Linked Test Cases</h2>',
      '<p>In mature teams, each AC is linked to a test case in Azure DevOps Test Plans. The test case describes exactly how to verify the AC. When a test case passes, the AC is met. This creates a full traceability chain: story → ACs → test cases → test results.</p>',
      '<h2>ACs in Sprint Planning</h2>',
      '<p>ACs are defined during sprint planning or backlog refinement. As a tester, you should attend these sessions. If an AC sounds vague or impossible to test, speak up. It is much easier to fix an AC before development starts than after.</p>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ─────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>The Given/When/Then Format</h1>',
        '<p class="chapter-intro">The Given/When/Then format (also called BDD-style) is the industry standard for writing clear, structured acceptance criteria. This module teaches you the format and gives you practice writing your own ACs.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to write BDD-style acceptance criteria</li>',
          '<li>How to write your own ACs using the Given/When/Then template</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Building On Module 1</strong>Module 1 covered what ACs are and how to recognize good ones. Module 2 gives you a structured format for writing them. Module 3 shows you how to use ACs as the foundation for bug reports.</div></div>',
        '<p><strong>Time estimate:</strong> ~18 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-2-1": [
      '<h1>BDD-Style Criteria</h1>',
      '<p class="chapter-intro">Behaviour-Driven Development (BDD) introduced the Given/When/Then format for writing acceptance criteria. This format structures each AC into three parts: the context (Given), the action (When), and the expected outcome (Then).</p>',
      '<h2>The Structure</h2>',
      '<ul>',
      '<li><strong>Given</strong> — The initial context. What state is the system in? What data exists? Who is the user?</li>',
      '<li><strong>When</strong> — The action the user performs. This should be a single, specific action.</li>',
      '<li><strong>Then</strong> — The expected result. What should the system do? What should the user see?</li>',
      '</ul>',
      '<blockquote>Given the user is logged in as a Senior Investigator<br>When they open Case CR-0042<br>Then the Escalate button is visible in the command bar</blockquote>',
      '<h2>Adding Ands</h2>',
      '<p>You can extend each section with "And" clauses:</p>',
      '<blockquote>Given the user is logged in as a Senior Investigator<br>And the case status is "In Progress"<br>When they click the Resolve button<br>Then the Status Reason dropdown appears<br>And the options include "Fixed" and "Workaround Provided"</blockquote>',
      '<h2>Why This Works</h2>',
      '<p>The Given/When/Then format forces precision. Writing "Given the user is logged in" forces you to specify which user. Writing "When they click Resolve" forces you to be specific about the action. This precision eliminates the ambiguity that plagues poorly written ACs.</p>',
      '<div class="callout good"><strong>Testing advantage:</strong> Each Given/When/Then AC maps directly to a test case. Given = test preconditions. When = test steps. Then = expected result. Your test cases practically write themselves.</div>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Writing Your Own ACs</h1>',
      '<p class="chapter-intro">Now that you understand the Given/When/Then format, it is time to practice writing ACs yourself. Writing good ACs is a skill that improves with practice. Here is a step-by-step approach.</p>',
      '<h2>Step 1: Understand the Feature</h2>',
      '<p>Before writing ACs, make sure you understand what the feature is supposed to do. Read the user story. Ask questions. If you do not understand the feature, your ACs will be wrong.</p>',
      '<h2>Step 2: List the Scenarios</h2>',
      '<p>Think about all the ways the feature can be used. Start with the happy path. Then think about edge cases. Then think about error conditions. Each scenario becomes one (or more) ACs.</p>',
      '<h2>Step 3: Write Given/When/Then for Each</h2>',
      '<p>Example for a password reset feature:</p>',
      '<blockquote>Given a registered user with email "user@example.com"<br>When they request a password reset<br>Then they receive an email with a reset link within 30 seconds</blockquote>',
      '<blockquote>Given a registered user clicks a valid reset link<br>When they enter "NewPass123!" in both password fields<br>And click Submit<br>Then their password is updated<br>And they are redirected to the login page with a success message</blockquote>',
      '<div class="callout warn"><strong>Common pitfall:</strong> Writing ACs for only the happy path. Every feature has edge cases and error conditions. A complete set of ACs covers all three: happy path, edge cases, and error handling.</div>',
      '<h2>Step 4: Review with the Team</h2>',
      '<p>ACs should be reviewed by the product owner (do they match the business need?), the developer (are they implementable?), and another tester (are they testable?). Team review catches gaps before anyone writes code.</p>',
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ─────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3</div>',
        '<h1>Tracing Bugs to ACs</h1>',
        '<p class="chapter-intro">A bug report without an AC reference is just an opinion. A bug report that says "This violates AC #3 of Story 4521" is evidence. This module teaches you to trace bugs back to their source ACs and write bug reports that are impossible to dismiss.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>Why traceability between bugs and ACs matters</li>',
          '<li>How to reference ACs in bug reports</li>',
        '</ul>',
        '<div class="callout tip"><strong class="callout-icon">📖</strong><div class="callout-body"><strong>Final Module</strong>This is the last module in this course. After the quiz, you will understand how to use ACs as the backbone of your testing practice — from writing test cases to filing bug reports.</div></div>',
        '<p><strong>Time estimate:</strong> ~16 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-3-1": [
      '<h1>Why Traceability Matters</h1>',
      '<p class="chapter-intro">Traceability is the ability to link a bug report back to the acceptance criterion it violates. Without traceability, your bug report is a complaint. With traceability, your bug report is evidence.</p>',
      '<h2>The Traceability Chain</h2>',
      '<p>The full traceability chain looks like this:</p>',
      '<blockquote>Business Requirement → User Story → Acceptance Criteria → Test Case → Test Result → Bug Report</blockquote>',
      '<p>Each link connects to the next. When you file a bug report, you create the final link that points back to the AC. This tells everyone: "Here is what we agreed should happen (AC). Here is what actually happened (bug). These do not match."</p>',
      '<h2>Why Traceability Matters for Release Management</h2>',
      '<p>When a release manager asks "Is Story 4521 done?" the answer should not be "I think so." The answer should be "All ACs pass. No open bugs violate the ACs." Traceability gives you objective data to support release decisions.</p>',
      '<div class="callout good"><strong>Audit value:</strong> In regulated industries (healthcare, finance, insurance), auditors require traceability from requirements through testing. A bug linked to its AC provides a clear audit trail showing the issue was identified, tracked, and resolved.</div>',
      '<h2>Traceability Prevents Duplicates</h2>',
      '<p>When ACs are linked in bug reports, it is easy to see "there is already a bug for AC #4." Without this linkage, multiple testers may file separate bugs for the same issue, wasting everyone\'s time.</p>',
    ].join("\n"),

    "mod-3-2": [
      '<h1>Referencing ACs in Bug Reports</h1>',
      '<p class="chapter-intro">Knowing which AC a bug violates is one thing. Communicating that linkage clearly in your bug report is another. Here is how to do it effectively in Azure DevOps.</p>',
      '<h2>Linking to the Work Item</h2>',
      '<p>In Azure DevOps, you can link a bug report to a user story. Use the "Links" tab on the bug work item form and choose "Parent" or "Related" link type. This connects the bug to the story that contains the AC.</p>',
      '<h2>Quoting the AC in the Description</h2>',
      '<p>Copy the exact AC text into the bug report description. Then show how the actual behaviour differs. This makes the violation explicit.</p>',
      '<blockquote><strong>Affected AC (Story #4521, AC #3):</strong> "Given a logged-in Senior Investigator, when they open a case with status In Progress, then the Resolve button is enabled in the command bar."<br><br><strong>Observed:</strong> The Resolve button is greyed out for all In Progress cases, regardless of the user\'s role.</blockquote>',
      '<h2>Using Tags for Traceability</h2>',
      '<p>Add tags like "AC-violation" or "Story-4521" to make the bug report discoverable in searches. This helps the team see, at a glance, which stories have open bugs.</p>',
      '<div class="callout warn"><strong>Don\'t skip this:</strong> A bug without an AC reference is easy to dismiss. "That might be expected behaviour." "Maybe the AC changed." An AC reference eliminates these excuses. The AC is the contract. If the contract is violated, the bug is real.</div>',
      '<h2>Example Bug Report</h2>',
      '<p>When you file a bug report, structure it like this:</p>',
      '<ul>',
      '<li><strong>Title:</strong> [Story #] — [What fails]</li>',
      '<li><strong>Description:</strong> AC reference + expected vs. actual + repro steps</li>',
      '<li><strong>Link:</strong> Link to the parent user story</li>',
      '<li><strong>Tags:</strong> AC-violation, story-number, feature-area</li>',
      '</ul>',
    ].join("\n"),
  },

  // ── Microsoft Teams for QA ────────────────────────────────────────────
  "teams-for-qa": {

    // ── MODULE 1 OVERVIEW ────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Navigating Teams</h1>',
        '<p class="chapter-intro">Microsoft Teams is the hub for collaboration at most organizations. This module teaches you to navigate channels, threads, and find the QA briefings you need to do your job.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How Teams channels and threads are organized</li>',
          '<li>How to find and read a QA briefing document</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~12 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-1-1": [
      '<h1>Channels and Threads</h1>',
      '<p class="chapter-intro">Teams organizes conversations into teams, channels, and threads. Understanding this hierarchy is the first step to communicating effectively as a QA professional.</p>',
      '<h2>Teams and Channels</h2>',
      '<p>A <strong>team</strong> is a collection of people grouped around a project or discipline. Within each team, <strong>channels</strong> separate conversations by topic. A typical QA team might have channels like "General," "Bug Triage," "Test Results," and "Daily Stand-up."</p>',
      '<p>Each channel can be <strong>Standard</strong> (visible to everyone in the team) or <strong>Private</strong> (visible only to invited members). QA briefings are typically posted in standard channels so the whole team can see them.</p>',
      '<h2>Threads</h2>',
      '<p>Within a channel, <strong>threads</strong> keep replies to a message organized. Instead of everyone posting separate messages, replies to a specific post are grouped under it. This keeps the channel readable and makes it easy to follow a conversation from start to finish.</p>',
      '<div class="callout tip"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>QA Tip:</strong> When responding to a bug report in a channel, always reply in the thread. A new message in the channel can get lost; a threaded reply keeps the context intact.</div></div>',
      '<h2>Mentions and Notifications</h2>',
      '<p>Use <strong>@mentions</strong> to get someone\'s attention. @mention a specific person when you need their input. Use @channel or @team sparingly — it notifies everyone in the team and should be reserved for urgent or important announcements.</p>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Reading a QA Briefing</h1>',
      '<p class="chapter-intro">QA briefings are posted in Teams channels to communicate what needs testing, when it is due, and what the acceptance criteria are. Knowing how to read and extract key information from a briefing is a core QA skill.</p>',
      '<h2>What a QA Briefing Contains</h2>',
      '<p>A typical briefing includes the following sections:</p>',
      '<ul>',
      '<li><strong>Story or Feature Name</strong> — what is being tested and the work item ID</li>',
      '<li><strong>Acceptance Criteria</strong> — the conditions that must be met for the feature to pass</li>',
      '<li><strong>Test Environment</strong> — which environment, browser, and device to use</li>',
      '<li><strong>Deadline</strong> — when testing must be completed</li>',
      '<li><strong>Attachments</strong> — screenshots, mockups, or reference documents</li>',
      '</ul>',
      '<h2>How to Read a Briefing Efficiently</h2>',
      '<p>Start by scanning the ACs first. They tell you exactly what "done" looks like. Then read the environment details so you set up correctly. Finally, check the deadline and plan your testing time accordingly.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Common Mistake:</strong> Jumping straight into testing without reading the full briefing. You might miss critical context about what the feature is supposed to do, leading to incomplete or incorrect test results.</div></div>',
      '<h2>Asking Clarifying Questions</h2>',
      '<p>If something in the briefing is unclear, reply in the thread with your question. Good questions to ask include: "What is the expected behaviour for edge case X?" and "Are there any known issues in this environment?"</p>',
    ].join("\n"),

    "quiz-mod-1": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Quiz</div>',
        '<h1>Module 1 Quiz</h1>',
        '<p>Test your knowledge of navigating Microsoft Teams for QA work.</p>',
        '<p><strong>Time estimate:</strong> ~5 minutes.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Communicating in Stand-up</h1>',
        '<p class="chapter-intro">Daily stand-up is the most frequent meeting on an Agile team. This module helps you communicate your QA work clearly and ask questions that move the team forward.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to give a concise, effective stand-up update</li>',
          '<li>How to ask good questions during stand-up</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~12 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-2-1": [
      '<h1>Giving a Stand-up Update</h1>',
      '<p class="chapter-intro">The daily stand-up is a 15-minute meeting where each team member answers three questions: What did I do yesterday? What will I do today? What blockers do I have? Your QA update should follow this structure but focus on testing progress.</p>',
      '<h2>The QA Stand-up Formula</h2>',
      '<p>A good QA stand-up update covers:</p>',
      '<ul>',
      '<li><strong>What you tested yesterday</strong> — feature name, what passed, what failed</li>',
      '<li><strong>What you are testing today</strong> — priority and estimated completion</li>',
      '<li><strong>Blockers</strong> — environment issues, missing data, unmerged code, unclear ACs</li>',
      '</ul>',
      '<h2>Example Update</h2>',
      '<blockquote>"Yesterday I completed testing on the password reset flow. Found one bug where the success message does not display after reset. Created bug #4523. Today I am starting on the login page test suite. No blockers."</blockquote>',
      '<h2>Keep It Brief</h2>',
      '<p>Your update should be 30-60 seconds. If a discussion is needed, say "I want to discuss the password reset bug after stand-up" rather than derailing the meeting. The stand-up is for information sharing, not problem-solving.</p>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> Prepare your update before the meeting. Jot down notes on what you tested and what you found. This keeps your update concise and accurate.</div></div>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Asking Good Questions</h1>',
      '<p class="chapter-intro">Stand-up is also your opportunity to ask questions that clarify scope, unblock yourself, and keep testing on track. The right question at the right time can save hours of wasted effort.</p>',
      '<h2>Questions for Developers</h2>',
      '<p>When a developer says they completed a story, ask: "Did you run through the ACs? Any edge cases you noticed?" This helps you focus your testing on areas most likely to have issues.</p>',
      '<h2>Questions for the Product Owner</h2>',
      '<p>When ACs are ambiguous, use stand-up to ask for clarification: "For the login story, what should happen when the user enters an incorrect password three times?" Getting a clear answer prevents you from testing against the wrong expectations.</p>',
      '<h2>Questions About Blockers</h2>',
      '<p>If you are blocked, state the blocker clearly and ask who can help resolve it. Example: "I cannot test the export feature because the test environment is down. Is there an ETA for the fix, or can I use the staging environment instead?"</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Remember:</strong> Stand-up is not the only place to ask questions. If a question requires a longer discussion, schedule a follow-up conversation with the relevant people after stand-up.</div></div>',
    ].join("\n"),

    "quiz-mod-2": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Quiz</div>',
        '<h1>Module 2 Quiz</h1>',
        '<p>Test your knowledge of stand-up communication for QA.</p>',
        '<p><strong>Time estimate:</strong> ~5 minutes.</p>',
      '</div>',
    ].join("\n"),
  },

  // ── Agile & Scrum for QA ─────────────────────────────────────────────
  "agile-scrum-qa": {

    // ── MODULE 1 OVERVIEW ────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Sprint Ceremonies for QA</h1>',
        '<p class="chapter-intro">Scrum defines five events (ceremonies) that structure every sprint. This module covers each ceremony from the QA perspective — what your role is, how to prepare, and how to get the most value out of each one.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How Sprint Planning sets up QA for the sprint</li>',
          '<li>What to share during Daily Stand-up as a QA team member</li>',
          '<li>How to participate in Sprint Review and Retrospective</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~24 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-1-1": [
      '<h1>Sprint Planning</h1>',
      '<p class="chapter-intro">Sprint Planning is where the team decides what work will be done in the upcoming sprint. As a QA, your presence and input during planning are critical — this is where you influence testability before a single line of code is written.</p>',
      '<h2>QA\'s Role in Sprint Planning</h2>',
      '<p>During Sprint Planning, the team selects stories from the product backlog and defines a Sprint Goal. Your job as QA is to:</p>',
      '<ul>',
      '<li>Ask about acceptance criteria for each story being considered</li>',
      '<li>Flag stories where ACs are missing, ambiguous, or untestable</li>',
      '<li>Estimate testing effort so the team can plan capacity</li>',
      '<li>Identify dependencies (test data, environment access, credentials)</li>',
      '</ul>',
      '<h2>What to Listen For</h2>',
      '<p>Pay attention when developers discuss implementation details. If they mention a complex algorithm, a new library, or a third-party integration, make a note to test those areas thoroughly. Complexity breeds bugs.</p>',
      '<div class="callout tip"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>QA Tip:</strong> If a story has no ACs, ask the team to define them before committing to the sprint. Testing against undefined expectations leads to arguments about whether something is really a bug.</div></div>',
      '<blockquote>"The hardest bugs to fix are the ones you find during planning — before any code exists." — Experienced QA Lead</blockquote>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Daily Stand-up</h1>',
      '<p class="chapter-intro">The stand-up is where QA connects testing progress to sprint execution. This builds on <strong>Communicating in Stand-up</strong> in the Teams for QA course — review that module if you need a refresher on the basic stand-up format and update formula.</p>',
      '<h2>What QA Should Report</h2>',
      '<p>Your stand-up update should focus on sprint-relevant information: whether stories you tested are passing their ACs, whether you can start testing new stories, and anything affecting your ability to complete testing within the sprint timeframe.</p>',
      '<h2>What to Listen For</h2>',
      '<p>Pay attention when developers discuss technical details. If a developer mentions refactoring a module you tested yesterday, flag that the retest scope may have changed. If the PO mentions shifting priorities, ask how it affects the stories in your test queue.</p>',
      '<h2>Flagging Sprint Blockers</h2>',
      '<p>Use stand-up to raise blockers before they delay the sprint goal. For example: "Story #4523 is ready for testing but the deployment to the test environment failed. I cannot start until it is deployed." This lets the team reprioritize or unblock you immediately.</p>',
      '<h2>After Stand-up: Sprint Coordination</h2>',
      '<p>After the stand-up, check the sprint board for any stories that moved from "In Progress" to "Ready for QA." Coordinate with the developer to confirm the environment, any known issues, and the scope of testing needed before you begin.</p>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> Keep a running list of what you are testing and what you found. Use this list as your stand-up notes. If you are blocked on multiple stories, the scrum master needs to know so they can redistribute work.</div></div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Sprint Review and Retrospective</h1>',
      '<p class="chapter-intro">The Sprint Review demonstrates what was built to stakeholders. The Retrospective is the team\'s opportunity to inspect and adapt its process. Both are essential ceremonies where QA has a unique and valuable perspective.</p>',
      '<h2>Sprint Review: QA\'s Moment to Shine</h2>',
      '<p>During the Sprint Review, the team demonstrates completed work to stakeholders. As QA, you should be ready to speak to the quality of the release: what was tested, what passed, what bugs remain, and whether the acceptance criteria were fully met.</p>',
      '<p>Stakeholders often ask "Is it ready to go?" Your answer should be based on data: "All critical and high-priority bugs are fixed and verified. The remaining three medium-priority bugs are documented in the known issues list. We are confident in the release."</p>',
      '<h2>Sprint Retrospective: QA\'s Voice for Improvement</h2>',
      '<p>The Retrospective is where the team reflects on what went well, what could be improved, and what actions to take. QA should speak up about testing challenges: unclear ACs, late handoffs, environment instability, or insufficient test data.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Be Constructive:</strong> Frame your feedback in terms of the process, not people. Instead of "Developers never write good ACs," try "We could improve the quality of ACs by reviewing them as a team during planning."</div></div>',
      '<blockquote>"The retrospective is the most important meeting for improving quality — but only if QA shows up and speaks up."</blockquote>',
    ].join("\n"),

    "quiz-mod-1": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Quiz</div>',
        '<h1>Module 1 Quiz</h1>',
        '<p>Test your knowledge of sprint ceremonies from a QA perspective.</p>',
        '<p><strong>Time estimate:</strong> ~5 minutes.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>The QA Role in a Sprint</h1>',
        '<p class="chapter-intro">QA is not just "the people who test at the end." Your role spans the entire sprint — from triaging bugs to defining what "done" means. This module covers two critical QA responsibilities in every sprint.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How bug triage works and your role in prioritizing bugs</li>',
          '<li>What the Definition of Done means for QA</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~18 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-2-1": [
      '<h1>Bug Triage</h1>',
      '<p class="chapter-intro">Bug triage is the process of reviewing newly filed bugs and deciding what to do with them — fix now, fix this sprint, backlog, or close. Your role in triage goes beyond reporting bugs; you advocate for fixes based on data. This builds on <strong>Severity and Priority</strong> in the ADO Bug Reports course — review that course if you need a refresher on classifying bugs.</p>',
      '<h2>The Triage Meeting</h2>',
      '<p>During a triage meeting, the team reviews each new bug and makes a decision. As QA, you present the bug, explain its impact, and recommend a course of action. The team (PO, dev lead, scrum master) makes the final call based on capacity and business priorities.</p>',
      '<h2>How QA Advocates for Fixes</h2>',
      '<p>When you want a bug fixed this sprint, make the case in business terms. Instead of "This is a serious bug," say "This bug blocks the password reset flow, which is the top customer complaint this month. If we do not fix it now, we will have to explain it in the sprint review." Frame your ask in terms the PO cares about.</p>',
      '<h2>Handling "Move to Backlog" Decisions</h2>',
      '<p>Not every bug will be fixed immediately. Low-severity bugs and edge cases often get deferred. When a bug is moved to the backlog, add a note about the conditions under which it should be revisited: "Revisit this bug if the password module is refactored" or "This affects less than 1% of users — revisit if complaint volume increases."</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Watch Out For:</strong> Triage fatigue — when teams rush through bugs without proper assessment. If you see bugs being dismissed without discussion, speak up. Every bug deserves at least a 30-second evaluation before a decision is made.</div></div>',
      '<blockquote>"The triage meeting is where bugs get their fate decided. Show up prepared — know your bugs, know their impact, and know what you are asking for."</blockquote>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Definition of Done</h1>',
      '<p class="chapter-intro">The Definition of Done (DoD) is a shared understanding of what it means for work to be complete. It applies to every story in every sprint. As QA, you are the guardian of the DoD.</p>',
      '<h2>What a Typical DoD Includes</h2>',
      '<ul>',
      '<li>Code is written, reviewed, and merged</li>',
      '<li>All acceptance criteria pass</li>',
      '<li>Unit tests pass and code coverage meets the threshold</li>',
      '<li>QA has tested the feature and confirmed it works</li>',
      '<li>No critical or high-severity bugs remain open</li>',
      '<li>Documentation is updated (if applicable)</li>',
      '</ul>',
      '<h2>Why the DoD Matters for QA</h2>',
      '<p>The DoD is your strongest tool for pushing back when someone says a story is "done" before QA has tested it. If the DoD says "QA tested," then the story is not done until you say it is done. This is not about gatekeeping — it is about protecting quality.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Watch Out For:</strong> Teams that skip the DoD when under pressure. "We will test it after the release" is a dangerous pattern. Once it is in production, fixing it costs 10x more than fixing it during the sprint.</div></div>',
      '<blockquote>"Done without testing is not done. It is just deployed."</blockquote>',
    ].join("\n"),

    "quiz-mod-2": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Quiz</div>',
        '<h1>Module 2 Quiz</h1>',
        '<p>Test your knowledge of the QA role in a sprint.</p>',
        '<p><strong>Time estimate:</strong> ~5 minutes.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 3 OVERVIEW ────────────────────────────────────────────────
    "mod-3-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 3</div>',
        '<h1>Acceptance Criteria in Practice</h1>',
        '<p class="chapter-intro">This module builds on <strong>Acceptance Criteria Fundamentals</strong> — you should already understand what ACs are and how the Given/When/Then format works. Here we focus on how to collaborate on writing ACs as a team and how to verify them during the sprint review demo.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to contribute to writing ACs with developers and the PO</li>',
          '<li>How to demo features against their acceptance criteria</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~18 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-3-1": [
      '<h1>Writing ACs with the Team</h1>',
      '<p class="chapter-intro">This module builds on <strong>Acceptance Criteria Fundamentals</strong> — you should already understand what ACs are and how the Given/When/Then format works. Here we focus on the team dynamic: how QA collaborates with developers and the PO to write better ACs together.</p>',
      '<h2>The Three-Amigos Approach</h2>',
      '<p>The "Three Amigos" is a practice where the Product Owner, a Developer, and a QA meet to review and refine ACs before the sprint. Each brings a different perspective:</p>',
      '<ul>',
      '<li><strong>Product Owner:</strong> Defines the business need and desired outcome</li>',
      '<li><strong>Developer:</strong> Identifies technical constraints and implementation considerations</li>',
      '<li><strong>QA:</strong> Ensures ACs are testable, unambiguous, and cover edge cases</li>',
      '</ul>',
      '<h2>What QA Brings to AC Writing</h2>',
      '<p>Your job during AC refinement is to ask: "How would I test this?" If you cannot think of a clear test for an AC, the AC is probably not specific enough. Push for measurable, observable conditions. Ask about edge cases the PO may not have considered — empty states, error conditions, permission boundaries.</p>',
      '<h2>Questions to Ask During AC Refinement</h2>',
      '<ul>',
      '<li>"What should happen if the user enters invalid data?"</li>',
      '<li>"Does this behaviour change based on the user\'s role or permissions?"</li>',
      '<li>"What does success look like from the user\'s perspective?"</li>',
      '<li>"Is there an existing feature we can use as a reference for expected behaviour?"</li>',
      '</ul>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> Bring a checklist of edge cases to every AC refinement session. Over time, you will notice the PO tends to forget the same types of scenarios. Your pattern recognition is a valuable input to the AC writing process.</div></div>',
    ].join("\n"),

    "mod-3-2": [
      '<h1>Demo-ing Against ACs</h1>',
      '<p class="chapter-intro">This builds on <strong>Acceptance Criteria Fundamentals</strong> — review that course if you need a refresher on AC structure and formats. The Sprint Review demo is where you show stakeholders what was built. When the demo is structured around acceptance criteria, it becomes a powerful validation tool rather than a vague feature walkthrough.</p>',
      '<h2>Structure the Demo Around ACs</h2>',
      '<p>For each story, walk through each acceptance criterion one by one. Show the stakeholder: "Here is AC #1, here is what the system does, and here is how it satisfies the condition." This makes it obvious whether the story is truly complete.</p>',
      '<h2>Handling Failed ACs in the Demo</h2>',
      '<p>If an AC is not fully met, be transparent about it. Say: "AC #3 is partially complete — the success message displays, but the redirect does not happen. We have a bug logged and expect to fix it early next sprint." Stakeholders appreciate honesty over surprises.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Common Mistake:</strong> Demo-ing the happy path only. Stakeholders need to see edge cases too. "What happens when the user enters an invalid email?" is a valid demo question.</div></div>',
      '<blockquote>"A demo that walks through every AC leaves no doubt about whether the story is done."</blockquote>',
    ].join("\n"),

    "quiz-mod-3": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Quiz</div>',
        '<h1>Module 3 Quiz</h1>',
        '<p>Test your knowledge of acceptance criteria in practice.</p>',
        '<p><strong>Time estimate:</strong> ~5 minutes.</p>',
      '</div>',
    ].join("\n"),

    // ── MODULE 4 OVERVIEW ────────────────────────────────────────────────
    "mod-4-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 4</div>',
        '<h1>Agile Testing Mindset</h1>',
        '<p class="chapter-intro">Testing in an Agile environment is different from traditional testing. You do not wait for a complete build — you test early, test often, and provide continuous feedback. This module covers two essential Agile testing practices.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>What Shift Left Testing means and how to practice it</li>',
          '<li>How to give continuous feedback throughout the sprint</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~18 minutes of reading + a 5-question quiz.</p>',
      '</div>',
    ].join("\n"),

    "mod-4-1": [
      '<h1>Shift Left Testing</h1>',
      '<p class="chapter-intro">"Shift Left" means moving testing activities earlier in the development process. Instead of waiting until a feature is fully built to start testing, you begin testing as soon as there is something testable — even if it is incomplete.</p>',
      '<h2>Why Shift Left Matters</h2>',
      '<p>The cost of fixing a bug increases exponentially the later it is found. A bug caught during design costs pennies to fix. A bug caught in production costs thousands. Shift Left catches bugs when they are cheapest to fix.</p>',
      '<h2>How to Shift Left as QA</h2>',
      '<ul>',
      '<li>Review ACs during refinement before development starts</li>',
      '<li>Pair with developers during implementation to test as they code</li>',
      '<li>Test individual components as soon as they are built (component testing)</li>',
      '<li>Run exploratory tests on incomplete features to catch design issues early</li>',
      '</ul>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> Ask developers to deploy code to a shared environment as soon as a single AC is implemented. You can start testing that AC while they work on the next one.</div></div>',
    ].join("\n"),

    "mod-4-2": [
      '<h1>Continuous Feedback</h1>',
      '<p class="chapter-intro">In Agile, feedback is not a phase at the end — it is a continuous loop throughout the sprint. QA provides feedback to developers, developers provide context to QA, and the whole team adjusts based on what is learned.</p>',
      '<h2>Feedback Channels</h2>',
      '<p>Continuous feedback happens through multiple channels:</p>',
      '<ul>',
      '<li><strong>Stand-up:</strong> Daily verbal updates on testing progress and findings</li>',
      '<li><strong>Teams/Slack:</strong> Real-time bug reports and questions during the day</li>',
      '<li><strong>Pair testing:</strong> Sitting with a developer to test a feature together</li>',
      '<li><strong>Bug reports:</strong> Formal documentation of defects with repro steps</li>',
      '</ul>',
      '<h2>Giving Feedback Effectively</h2>',
      '<p>Good feedback is specific, actionable, and timely. Instead of "This feature is buggy," say "The login button does not respond when the user enters an email with a trailing space. The AC says the system should trim whitespace before validation."</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Balance Speed and Quality:</strong> Continuous feedback does not mean filing a bug for every tiny issue you see. Use judgment: file formal bugs for verified defects, and use informal channels for questions and observations.</div></div>',
    ].join("\n"),

    "quiz-mod-4": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Quiz</div>',
        '<h1>Module 4 Quiz</h1>',
        '<p>Test your knowledge of the Agile testing mindset.</p>',
        '<p><strong>Time estimate:</strong> ~5 minutes.</p>',
      '</div>',
    ].join("\n"),
  },

  // ── Scenario Deep Dive — Customer Portal ─────────────────────────────
  "scenario-deep-dive": {

    // ── MODULE 1 OVERVIEW ────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>The Portal Access Failure</h1>',
        '<p class="chapter-intro">In this guided walkthrough, you will investigate a real-world QA scenario: a customer portal access failure reported by multiple users. You will read the briefing, examine the case data, identify the defects, and file a complete bug report.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to read and interpret a QA incident briefing</li>',
          '<li>How to examine case data to identify root causes</li>',
          '<li>How to find and document defects systematically</li>',
          '<li>How to file a professional bug report</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~35 minutes.</p>',
      '</div>',
    ].join("\n"),

    "mod-1-1": [
      '<h1>The Briefing</h1>',
      '<p class="chapter-intro">At 9:15 AM, the service desk received reports that multiple customers cannot log in to the Customer Portal. Users report seeing an error message "Access Denied" immediately after entering their credentials, even though they reset their passwords successfully last week.</p>',
      '<h2>Incident Summary</h2>',
      '<ul>',
      '<li><strong>Incident:</strong> Customer Portal access failure — multiple users affected</li>',
      '<li><strong>Reported by:</strong> Service Desk (ticket INC-2026-0421)</li>',
      '<li><strong>Affected users:</strong> Customers with accounts created before March 1, 2026</li>',
      '<li><strong>Error message:</strong> "Access Denied" after credential entry</li>',
      '<li><strong>Environment:</strong> Production (portal.customer.example.com)</li>',
      '<li><strong>Browser:</strong> Chrome 124, Edge 123, Firefox 125 (all affected)</li>',
      '</ul>',
      '<h2>What the Developer Told You</h2>',
      '<p>The developer who worked on the authentication module says: "We deployed a security patch last night that updated the session token validation. The change was tested in staging with active accounts. The affected users may have stale sessions or expired tokens."</p>',
      '<div class="callout tip"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Your Task:</strong> Read the briefing carefully and prepare to investigate. Pay attention to what is said — and what is not said. The developer mentioned accounts created before March 1. Why would creation date matter for a login failure?</div></div>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Examining the Case</h1>',
      '<p class="chapter-intro">Now it is time to investigate. Start by looking at the affected accounts and comparing them with working accounts. Look for patterns in the data that point toward the root cause.</p>',
      '<h2>Step 1: Gather Data</h2>',
      '<p>Pull the list of affected users from the service desk ticket. There are 12 affected accounts. Compare them with 12 randomly selected working accounts. Look for differences in:</p>',
      '<ul>',
      '<li>Account creation date</li>',
      '<li>Last login date</li>',
      '<li>Account status (active, suspended, pending verification)</li>',
      '<li>Authentication method (password, SSO, MFA)</li>',
      '<li>Session token age</li>',
      '</ul>',
      '<h2>Step 2: Identify the Pattern</h2>',
      '<p>After comparing the data, you notice that all 12 affected accounts were created before March 1, 2026, and none of them have logged in since the security patch was deployed. The working accounts either were created after March 1 or have logged in at least once since the patch.</p>',
      '<h2>Step 3: Form a Hypothesis</h2>',
      '<p>Your hypothesis: The security patch changed the session token format. Accounts with tokens issued before the patch use the old format, which the new validation rejects. Users who logged in after the patch received new-format tokens and are unaffected.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Investigation Tip:</strong> Data patterns rarely lie. When 100% of affected accounts share a characteristic and 0% of unaffected accounts share it, you have found a strong signal. Always verify your hypothesis before filing a bug report.</div></div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Finding the Defects</h1>',
      '<p class="chapter-intro">Based on your investigation, you have identified two defects. The first is the token format incompatibility. The second is a broader process failure: the team did not test backward compatibility of the security patch.</p>',
      '<h2>Defect 1: Session Token Format Change</h2>',
      '<p>The security patch introduced a new token format but did not include a migration path for existing tokens. When the system validates a pre-patch token against the new format, it fails validation and returns "Access Denied" instead of issuing a new token.</p>',
      '<p><strong>Impact:</strong> All users with pre-patch tokens are locked out. This includes users who have not logged in since the patch was deployed — approximately 15% of the user base.</p>',
      '<h2>Defect 2: Missing Regression Test</h2>',
      '<p>The deployment checklist did not include a regression test for existing user sessions. The developer tested the patch with fresh accounts (post-patch tokens), which all worked. The existing user scenario was not covered by any acceptance criterion or test case.</p>',
      '<blockquote>"A feature is not tested until it is tested with real data. Fresh accounts will never expose issues that only affect existing users."</blockquote>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Key Insight:</strong> This is a classic Shift Left failure — testing happened too late and with the wrong data. A quick review of the deployment plan would have caught the missing migration step before it reached production.</div></div>',
    ].join("\n"),

    "mod-1-4": [
      '<h1>Filing Your Report</h1>',
      '<p class="chapter-intro">Now you will file a professional bug report. Use the standard Azure DevOps template. Include the AC reference, repro steps, severity, priority, and supporting evidence.</p>',
      '<h2>Bug Report Template</h2>',
      '<h3>Title</h3>',
      '<p><strong>[Portal] Pre-patch session tokens rejected after security patch — users locked out</strong></p>',
      '<h3>Description</h3>',
      '<p><strong>Affected AC:</strong> "Given a registered user with a valid session token, when the system validates the token, then the user is granted access to the portal."</p>',
      '<p><strong>Expected:</strong> Users with pre-patch session tokens should be granted access or issued a new token seamlessly.</p>',
      '<p><strong>Actual:</strong> Users with pre-patch tokens receive "Access Denied" and cannot log in.</p>',
      '<h3>Repro Steps</h3>',
      '<ol>',
      '<li>Log in to the Customer Portal with an account created before March 1, 2026</li>',
      '<li>Do not log out (let the session persist)</li>',
      '<li>Wait for the security patch deployment (or simulate by clearing local token cache)</li>',
      '<li>Refresh the page or navigate to any portal page</li>',
      '<li>Observe "Access Denied" error instead of the dashboard</li>',
      '</ol>',
      '<h3>Suggested Fix</h3>',
      '<p>The token validation should accept both old and new token formats during a transition period, or the deployment should include a token migration script that updates all existing tokens to the new format.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Remember:</strong> A good bug report tells the developer exactly what is wrong, how to reproduce it, and what the expected behaviour should be. Vague reports get low priority.</div></div>',
    ].join("\n"),
  },

  // ── End-to-End Bug Lifecycle ─────────────────────────────────────────
  "bug-lifecycle": {

    // ── MODULE 1 OVERVIEW ────────────────────────────────────────────────
    "mod-1-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 1</div>',
        '<h1>Investigation Phase</h1>',
        '<p class="chapter-intro">Every bug starts with an investigation. Before you file a report, you need to understand the context, gather evidence, and verify that what you found is actually a bug. This module walks through the investigation phase step by step.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to read a QA briefing and extract key information</li>',
          '<li>How to open and set up a case for investigation</li>',
          '<li>How to check acceptance criteria against observed behaviour</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~23 minutes.</p>',
      '</div>',
    ].join("\n"),

    "mod-1-1": [
      '<h1>Reading the Briefing</h1>',
      '<p class="chapter-intro">QA briefings arrive through various channels — Teams, email, Azure DevOps, or the service desk. Your first task is to read the briefing thoroughly and extract the information you need to begin your investigation.</p>',
      '<h2>Key Information to Extract</h2>',
      '<ul>',
      '<li><strong>Story or work item ID</strong> — links back to the original requirement</li>',
      '<li><strong>Feature description</strong> — what the feature is supposed to do</li>',
      '<li><strong>Acceptance criteria</strong> — the specific conditions for success</li>',
      '<li><strong>Environment details</strong> — where to test (dev, staging, production)</li>',
      '<li><strong>Reported issue</strong> — what the user or service desk is seeing</li>',
      '<li><strong>Affected users</strong> — single user, specific group, or all users</li>',
      '</ul>',
      '<h2>Read Between the Lines</h2>',
      '<p>The briefing may not tell you everything. Look for gaps: Are the ACs specific enough? Is the environment clearly defined? Are there known issues? If information is missing, ask before you start testing.</p>',
      '<div class="callout tip"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>QA Tip:</strong> Create a checklist from the briefing. Check off each piece of information as you find it. Any unchecked items are questions you need to ask before proceeding.</div></div>',
    ].join("\n"),

    "mod-1-2": [
      '<h1>Opening the Case</h1>',
      '<p class="chapter-intro">Once you have read the briefing, the next step is to open the case or work item in Azure DevOps. This is your central workspace for tracking the investigation, documenting findings, and filing the bug report.</p>',
      '<h2>Locate the Work Item</h2>',
      '<p>Find the user story or work item linked to the briefing. Open it in Azure DevOps and review the details: description, ACs, attachments, and comments. This gives you the full context.</p>',
      '<h2>Set Up Your Test Environment</h2>',
      '<p>Before you start testing, make sure you have:</p>',
      '<ul>',
      '<li>Access to the correct environment (dev, staging, or UAT)</li>',
      '<li>Test accounts with the right roles and permissions</li>',
      '<li>Any required test data (sample cases, customer records, etc.)</li>',
      '<li>Browser or device configuration matching the briefing</li>',
      '</ul>',
      '<h2>Document Your Starting Point</h2>',
      '<p>Take notes on what the system does before you start testing. Note the current state of the feature, any existing bugs, and the environment version. This gives you a baseline to compare against.</p>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> Screenshot the initial state. A screenshot of "before" is invaluable if something changes during testing and you need to prove what the original behaviour was.</div></div>',
    ].join("\n"),

    "mod-1-3": [
      '<h1>Checking ACs</h1>',
      '<p class="chapter-intro">Acceptance criteria are your testing roadmap. Each AC describes a specific behaviour that must be true for the feature to be complete. Your job is to verify each AC by testing it against the actual system behaviour.</p>',
      '<h2>Test Each AC Independently</h2>',
      '<p>For each acceptance criterion, create a mini-test:</p>',
      '<ol>',
      '<li><strong>Understand</strong> — What exactly is this AC saying? What is the precondition, action, and expected outcome?</li>',
      '<li><strong>Set up</strong> — Configure the system to match the Given condition</li>',
      '<li><strong>Execute</strong> — Perform the When action</li>',
      '<li><strong>Verify</strong> — Does the actual result match the Then condition?</li>',
      '<li><strong>Document</strong> — Pass or fail, with evidence</li>',
      '</ol>',
      '<h2>What to Do When an AC Fails</h2>',
      '<p>When a behaviour does not match the AC, you have found a potential defect. Before filing a bug, verify: Is the AC clear and unambiguous? Could you be interpreting it wrong? Test it again with a different approach. If it consistently fails, you have a valid bug.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Be Thorough:</strong> Always test the edge cases that the ACs do not explicitly mention. ACs cover the intended behaviour, but your testing should also check what happens at the boundaries — empty fields, maximum lengths, special characters, and concurrent access.</div></div>',
    ].join("\n"),

    // ── MODULE 2 OVERVIEW ────────────────────────────────────────────────
    "mod-2-overview": [
      '<div class="cv-module-overview">',
        '<div class="cv-overview-badge">Module 2</div>',
        '<h1>Reporting Phase</h1>',
        '<p class="chapter-intro">After the investigation comes the report. A well-written bug report is clear, actionable, and easy to triage. This module covers how to file bugs in Azure DevOps, communicate findings to the team, and navigate the review process.</p>',
        '<h2>What You\'ll Learn</h2>',
        '<ul>',
          '<li>How to file a complete bug report in Azure DevOps</li>',
          '<li>How to communicate findings to developers and stakeholders</li>',
          '<li>How to handle the review and submission process</li>',
        '</ul>',
        '<p><strong>Time estimate:</strong> ~21 minutes.</p>',
      '</div>',
    ].join("\n"),

    "mod-2-1": [
      '<h1>Filing in ADO</h1>',
      '<p class="chapter-intro">Azure DevOps (ADO) is the standard tool for bug tracking. Filing a bug correctly in ADO ensures it gets the right attention and contains all the information a developer needs to fix it.</p>',
      '<h2>The Bug Work Item Form</h2>',
      '<p>When you open a new bug in ADO, you will see these key fields:</p>',
      '<ul>',
      '<li><strong>Title:</strong> Short, descriptive, includes the feature area in brackets</li>',
      '<li><strong>Assigned To:</strong> Leave blank for triage, or assign if you know who owns it</li>',
      '<li><strong>Description:</strong> Full details including expected vs actual and AC reference</li>',
      '<li><strong>Repro Steps:</strong> Numbered steps from a known starting state</li>',
      '<li><strong>Severity:</strong> Impact on the system (1-Critical to 4-Low)</li>',
      '<li><strong>Priority:</strong> Business urgency (1-Urgent to 4-Unplanned)</li>',
      '<li><strong>Tags:</strong> Keywords for search and filtering</li>',
      '<li><strong>Attachments:</strong> Screenshots, logs, or screen recordings</li>',
      '</ul>',
      '<h2>How to Write Repro Steps</h2>',
      '<p>Numbered repro steps are the most important part of your bug report. Start from a known state (e.g., "Logged in as Junior Investigator"), then list each action step by step. Include exact data values (usernames, case IDs, dates) so the developer can follow along precisely.</p>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> Use the "Create bug from test" feature in ADO Test Plans. It pre-populates the repro steps with the exact test steps you executed, saving time and ensuring accuracy.</div></div>',
    ].join("\n"),

    "mod-2-2": [
      '<h1>Communicating Findings</h1>',
      '<p class="chapter-intro">Filing the bug in ADO is only half the job. You also need to communicate your findings to the team so they know the bug exists, understand its impact, and can prioritize it alongside other work.</p>',
      '<h2>Post in the Team Channel</h2>',
      '<p>After filing the bug, post a brief summary in the team\'s Teams or Slack channel. Include the bug ID, title, severity, and a one-line summary. Example: "Filed Bug #4523 — [Portal] Login fails for users with trailing spaces in email (Severity 2, Priority 2)."</p>',
      '<h2>Tag the Relevant People</h2>',
      '<p>@mention the developer who worked on the feature, the Scrum Master, and the Product Owner. This ensures the right people see it and can start triaging.</p>',
      '<h2>Provide Context, Not Just a Link</h2>',
      '<p>Do not just paste a link to the ADO bug and walk away. Summarize the key findings: which AC is violated, what the expected behaviour was, and what actually happens. This saves everyone time and helps the team triage faster.</p>',
      '<div class="callout warn"><strong class="callout-icon">⚠️</strong><div class="callout-body"><strong>Communication Matters:</strong> A bug found by QA but not communicated clearly might as well not exist. Filing and forgetting is a common failure mode for new QA team members.</div></div>',
    ].join("\n"),

    "mod-2-3": [
      '<h1>Review and Submit</h1>',
      '<p class="chapter-intro">The final step in the bug lifecycle is the review and submission process. Once the developer fixes the bug, you need to verify the fix, close the loop, and update the bug report status.</p>',
      '<h2>Verify the Fix</h2>',
      '<p>When a developer marks a bug as "Fixed" or "Resolved," it comes back to QA for verification. Follow these steps:</p>',
      '<ol>',
      '<li>Re-test the original repro steps exactly as written in the bug report</li>',
      '<li>Verify the expected behaviour now occurs</li>',
      '<li>Test related functionality to ensure the fix did not break anything else (regression)</li>',
      '<li>If the fix passes, change the status to "Closed"</li>',
      '<li>If the fix is incomplete, change the status to "Reopened" with a comment explaining why</li>',
      '</ol>',
      '<h2>Close the Communication Loop</h2>',
      '<p>After verifying the fix, post a follow-up in the team channel: "Bug #4523 verified on staging. Fix is working — closing." This lets everyone know the issue is resolved and the feature is back on track.</p>',
      '<div class="callout good"><strong class="callout-icon">💡</strong><div class="callout-body"><strong>Pro Tip:</strong> If the fix introduces new behaviour that was not in the original ACs, file a separate bug or suggest an AC update. Do not expand the scope of an existing bug — it makes audit trails confusing.</div></div>',
    ].join("\n"),
  },
};

// ── MODULE QUIZ MAP ────────────────────────────────────────────────────────────
// Maps course module IDs to legacy lesson quiz IDs for courses that have been
// migrated from the old lesson-X.html system to the new course-view.html
// multi-module system. This allows getQuizQuestions() to find the right quiz
// bank without duplicating quiz question data.
// Structure: MODULE_QUIZ_MAP[courseId][moduleId] = legacyLessonId
const MODULE_QUIZ_MAP = {
  "qa-onboarding": {
    "mod-1": "lesson-1",
    "mod-2": "lesson-2",
    "mod-3": "lesson-3",
    "mod-4": "lesson-4",
    "mod-5": "lesson-5",
  },
};


// ── SECTION 0C: COURSE QUIZZES ────────────────────────────────────────────────
// This object stores quiz questions for multi-course modules.
// Structure: COURSE_QUIZZES[courseId][moduleId] = Array of question objects
//
// Each question object follows the same schema as QUIZ_QUESTIONS above.
// Course quizzes are separated from the legacy quiz store so that adding
// new courses doesn't touch the existing QA Onboarding quiz data.
//
// When a moduleId here matches one in QUIZ_QUESTIONS (legacy), the
// course-specific version takes priority for new courses.

const COURSE_QUIZZES = {

  // ── Agile & Scrum for Developers ─────────────────────────────────────────
  "agile-scrum-dev": {

    // ── MODULE 1 QUIZ: Introduction to Agile and Scrum ─────────────────────
    "mod-1": [
      {
        questionId: "as-m1-q1",
        type: "multiple-choice",
        questionText: "Which of the following is NOT one of the four values of the Agile Manifesto?",
        options: [
          "Individuals and interactions over processes and tools",
          "Working software over comprehensive documentation",
          "Fixed scope over changing requirements",
          "Responding to change over following a plan",
        ],
        correctAnswer: "Fixed scope over changing requirements",
        explanation: "The Agile Manifesto values 'Responding to change over following a plan' — the opposite of fixed scope. The four values emphasize people, working software, customer collaboration, and adaptability.",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q2",
        type: "multiple-choice",
        questionText: "According to the Agile Manifesto, what is the primary measure of progress?",
        options: [
          "Number of story points completed",
          "Working software",
          "Percentage of requirements documented",
          "On-time delivery against the original plan",
        ],
        correctAnswer: "Working software",
        explanation: "Principle #7 states: 'Working software is the primary measure of progress.' This shifts focus from documentation and plans to tangible, functional deliverables.",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q3",
        type: "multiple-choice",
        questionText: "Scrum is grounded in which philosophical concept?",
        options: [
          "Rationalism",
          "Empiricism",
          "Determinism",
          "Structuralism",
        ],
        correctAnswer: "Empiricism",
        explanation: "Scrum is grounded in empiricism — the idea that knowledge comes from experience and decisions should be based on what is known. This is why Scrum emphasizes inspection and adaptation.",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q4",
        type: "multiple-choice",
        questionText: "Which of the following is NOT one of the three pillars of Scrum?",
        options: [
          "Transparency",
          "Inspection",
          "Documentation",
          "Adaptation",
        ],
        correctAnswer: "Documentation",
        explanation: "The three pillars of Scrum are Transparency, Inspection, and Adaptation. Documentation is not a pillar — Scrum values working software over comprehensive documentation.",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q5",
        type: "multiple-choice",
        questionText: "How does Agile handle changing requirements compared to Waterfall?",
        options: [
          "Agile rejects changes once development begins",
          "Agile welcomes changes even late in development",
          "Both handle changes the same way",
          "Waterfall is more flexible with changes than Agile",
        ],
        correctAnswer: "Agile welcomes changes even late in development",
        explanation: "Principle #2 states: 'Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.' Waterfall treats change as a risk; Agile treats it as an opportunity.",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q6",
        type: "true-false",
        questionText: "The Agile mindset requires teams to follow a prescribed set of practices and processes exactly as documented.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Agile is a mindset, not a prescriptive methodology. Teams are encouraged to adapt practices to their context. Blindly following ceremonies without embracing the underlying values is often called 'cargo-cult Agile.'",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q7",
        type: "multiple-choice",
        questionText: "Which of the following best describes why Spotify's Agile model is notable?",
        options: [
          "They strictly follow the Scrum Guide without any modifications",
          "They adapted Agile practices (Squads, Tribes, Chapters, Guilds) to fit their culture",
          "They use Waterfall for planning and Agile for execution",
          "They were the first company to adopt Agile",
        ],
        correctAnswer: "They adapted Agile practices (Squads, Tribes, Chapters, Guilds) to fit their culture",
        explanation: "Spotify created a unique model using Squads (mini-startups), Tribes (groups of squads), Chapters (skill groups), and Guilds (communities of interest). The key lesson is they adapted Scrum to fit their culture rather than forcing their culture to fit Scrum.",
        lessonContext: "",
      },
      {
        questionId: "as-m1-q8",
        type: "true-false",
        questionText: "A team that holds daily standups, sprint reviews, and retrospectives is guaranteed to be truly Agile.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Adopting ceremonies without embracing the underlying values (trust, empowerment, psychological safety) is 'cargo-cult Agile.' Real agility requires mindset change, not just mechanical adoption of practices.",
        lessonContext: "",
      },
    ],

    // ── MODULE 2 QUIZ: Agile Development Practices ─────────────────────────
    "mod-2": [
      {
        questionId: "as-m2-q1",
        type: "multiple-choice",
        questionText: "Which XP practice involves two developers sharing one workstation to write code?",
        options: [
          "Code review",
          "Pair programming",
          "Mob programming",
          "Peer review",
        ],
        correctAnswer: "Pair programming",
        explanation: "Pair programming is an XP practice where two developers work together at one workstation. One writes code (the driver) while the other reviews each line (the navigator), improving code quality and knowledge sharing.",
        lessonContext: "",
      },
      {
        questionId: "as-m2-q2",
        type: "multiple-choice",
        questionText: "What is the key difference between Scrum and Kanban regarding work scope?",
        options: [
          "Scrum uses fixed-length sprints; Kanban uses continuous flow",
          "Kanban uses fixed-length sprints; Scrum uses continuous flow",
          "Both use fixed-length sprints",
          "Both use continuous flow",
        ],
        correctAnswer: "Scrum uses fixed-length sprints; Kanban uses continuous flow",
        explanation: "Scrum timeboxes work into fixed-length Sprints (typically 1-4 weeks), while Kanban uses continuous flow with no prescribed iteration length. This is a fundamental difference between the two approaches.",
        lessonContext: "",
      },
      {
        questionId: "as-m2-q3",
        type: "multiple-choice",
        questionText: "In Kanban, what does WIP stand for and what is its purpose?",
        options: [
          "Work In Progress — limits how many items can be active at once to reduce multitasking",
          "Work Improvement Plan — a roadmap for process optimization",
          "Work Integration Point — when work moves between stages",
          "Weekly Iteration Plan — the team's schedule for the week",
        ],
        correctAnswer: "Work In Progress — limits how many items can be active at once to reduce multitasking",
        explanation: "WIP = Work In Progress. Limiting WIP is a core Kanban principle. By restricting how many items can be in progress at once, teams reduce context switching, identify bottlenecks, and improve flow.",
        lessonContext: "",
      },
      {
        questionId: "as-m2-q4",
        type: "true-false",
        questionText: "Lean software development, adapted from Toyota's manufacturing system, includes the principle of 'eliminating waste.'",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Yes — Lean's first principle is 'Eliminate waste,' which in software means unnecessary code, features, delays, handoffs, and defects. Other Lean principles include amplifying learning and deciding as late as possible.",
        lessonContext: "",
      },
      {
        questionId: "as-m2-q5",
        type: "multiple-choice",
        questionText: "What is a 'Scrumban' approach?",
        options: [
          "A strict application of Scrum without any Kanban elements",
          "A hybrid that uses Scrum roles and events with Kanban's visual board and WIP limits",
          "A certification level for Scrum Masters",
          "A tool for measuring team velocity",
        ],
        correctAnswer: "A hybrid that uses Scrum roles and events with Kanban's visual board and WIP limits",
        explanation: "Scrumban combines Scrum's roles (PO, SM, Developers) and events (Sprint Planning, Daily Scrum, Review, Retro) with Kanban's visual board and WIP limits. Many teams find this hybrid gives them both structure and flow flexibility.",
        lessonContext: "",
      },
      {
        questionId: "as-m2-q6",
        type: "multiple-choice",
        questionText: "Which of the following is NOT a prescribed element of the Scrum framework?",
        options: [
          "Daily Scrum",
          "Sprint Retrospective",
          "Sprint Backlog",
          "Burndown chart",
        ],
        correctAnswer: "Burndown chart",
        explanation: "While burndown charts are commonly used by Scrum teams, they are not a prescribed artifact in the Scrum Guide. The three prescribed artifacts are the Product Backlog, Sprint Backlog, and Increment.",
        lessonContext: "",
      },
    ],

    // ── MODULE 3 QUIZ: Scrum Roles and Responsibilities ────────────────────
    "mod-3": [
      {
        questionId: "as-m3-q1",
        type: "multiple-choice",
        questionText: "Who is responsible for maximizing the value of the product resulting from the Development Team's work?",
        options: ["Scrum Master", "Product Owner", "Development Team", "Project Manager"],
        correctAnswer: "Product Owner",
        explanation: "The Product Owner is the single person responsible for maximizing the value of the product. This includes managing the Product Backlog, defining the Product Goal, and making priority decisions.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q2",
        type: "multiple-choice",
        questionText: "Which role is described as a 'servant leader' for the Scrum Team?",
        options: ["Product Owner", "Scrum Master", "Development Team Lead", "Stakeholder"],
        correctAnswer: "Scrum Master",
        explanation: "The Scrum Master is a servant leader who promotes and supports Scrum. They coach the team, facilitate events, remove impediments, and protect the team from disruptions.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q3",
        type: "multiple-choice",
        questionText: "What is a common antipattern for the Product Owner role?",
        options: [
          "Making quick priority decisions",
          "Acting as a 'proxy' who merely relays orders from stakeholders",
          "Attending Sprint Reviews",
          "Collaborating with the Development Team on backlog refinement",
        ],
        correctAnswer: "Acting as a 'proxy' who merely relays orders from stakeholders",
        explanation: "An effective PO has the authority to make real prioritization decisions. A 'proxy' PO who merely relays orders from stakeholders cannot effectively maximize value.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q4",
        type: "true-false",
        questionText: "The Scrum Master assigns tasks to Development Team members to ensure work is completed efficiently.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Scrum Masters do not assign tasks — they facilitate the team's self-management. The Development Team is self-organizing and decides how to turn Backlog items into an Increment of value.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q5",
        type: "multiple-choice",
        questionText: "What is the optimal size range for a Scrum Development Team?",
        options: ["1-3 people", "3-9 people", "10-15 people", "As many as needed"],
        correctAnswer: "3-9 people",
        explanation: "The Scrum Guide recommends Development Teams of 3 to 9 people. Smaller teams may lack necessary skills; larger teams struggle with coordination and communication overhead.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q6",
        type: "true-false",
        questionText: "A Development Team should have sub-teams such as a separate QA team and a separate architecture team for better specialization.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Scrum explicitly states there are no sub-teams within the Development Team. The team is cross-functional, meaning it collectively has all skills needed to deliver an Increment.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q7",
        type: "multiple-choice",
        questionText: "When do stakeholders primarily engage with the Scrum Team to inspect the Increment and provide feedback?",
        options: ["Daily Scrum", "Sprint Planning", "Sprint Review", "Sprint Retrospective"],
        correctAnswer: "Sprint Review",
        explanation: "The Sprint Review is the primary formal touchpoint where stakeholders inspect the Increment and provide feedback that shapes the Product Backlog.",
        lessonContext: "",
      },
      {
        questionId: "as-m3-q8",
        type: "true-false",
        questionText: "Stakeholders can request scope changes during a Sprint, and the Development Team must accommodate them.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "No changes should be made that would endanger the Sprint Goal during a Sprint. Stakeholders should respect the team's focus and submit new requests for the next Sprint Planning.",
        lessonContext: "",
      },
    ],

    // ── MODULE 4 QUIZ: Scrum Events and Artifacts ──────────────────────────
    "mod-4": [
      {
        questionId: "as-m4-q1",
        type: "multiple-choice",
        questionText: "What is the maximum length of a Sprint in Scrum?",
        options: ["One week", "Two weeks", "One month", "Three months"],
        correctAnswer: "One month",
        explanation: "A Sprint is a timebox of one month or less. Most software teams use 1-2 week Sprints, but the Scrum Guide allows up to one month.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q2",
        type: "multiple-choice",
        questionText: "What are the three topics addressed during Sprint Planning?",
        options: [
          "What was done, what went wrong, what to improve",
          "Why (value), What (scope), How (plan)",
          "Who is working, when it will finish, where to deploy",
          "Budget, timeline, resources",
        ],
        correctAnswer: "Why (value), What (scope), How (plan)",
        explanation: "Sprint Planning addresses three topics: Why is this Sprint valuable (Sprint Goal)? What can be Done this Sprint (scope)? How will the chosen work get done (plan)?",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q3",
        type: "true-false",
        questionText: "The Daily Scrum is primarily a status report to management about individual team member progress.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "The Daily Scrum is a planning event for the Development Team to inspect progress toward the Sprint Goal. It is not a status report to management.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q4",
        type: "multiple-choice",
        questionText: "What is the maximum timebox for a Daily Scrum?",
        options: ["5 minutes", "15 minutes", "30 minutes", "1 hour"],
        correctAnswer: "15 minutes",
        explanation: "The Daily Scrum is timeboxed to 15 minutes. It happens at the same time and place every day of the Sprint.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q5",
        type: "true-false",
        questionText: "The Sprint Review should be treated as a demo-only meeting where the team presents finished work.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "The Sprint Review is a working session, not a demo. The team and stakeholders collaborate to inspect what was built and adjust priorities. It should feel like a conversation, not a presentation.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q6",
        type: "multiple-choice",
        questionText: "What is the most common pitfall of Sprint Retrospectives?",
        options: [
          "They take too long",
          "They produce no actionable improvements",
          "The Scrum Master talks too much",
          "Stakeholders attend and dominate the conversation",
        ],
        correctAnswer: "They produce no actionable improvements",
        explanation: "The most common pitfall is having a great conversation but taking no action. Every Retrospective should produce at least one actionable improvement committed to by the team.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q7",
        type: "multiple-choice",
        questionText: "Which Scrum artifact is an ordered list of everything that might be needed in the product?",
        options: ["Sprint Backlog", "Product Backlog", "Increment", "Release Plan"],
        correctAnswer: "Product Backlog",
        explanation: "The Product Backlog is an ordered list of everything that might be needed in the product. It is the single source of requirements and evolves as the product and market change.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q8",
        type: "multiple-choice",
        questionText: "What does the 'Definition of Done' represent in Scrum?",
        options: [
          "When a Sprint is finished",
          "A formal description of when an Increment meets quality measures",
          "The list of features to be built in the next release",
          "A sign-off from the Project Manager",
        ],
        correctAnswer: "A formal description of when an Increment meets quality measures",
        explanation: "The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product. If work doesn't meet the DoD, it cannot be released.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q9",
        type: "multiple-choice",
        questionText: "Who owns the Sprint Backlog and can change it during the Sprint?",
        options: ["Product Owner", "Scrum Master", "Development Team", "Stakeholders"],
        correctAnswer: "Development Team",
        explanation: "The Sprint Backlog belongs to the Development Team — only they can change it during the Sprint. It is updated throughout the Sprint as the team discovers more about the work needed.",
        lessonContext: "",
      },
      {
        questionId: "as-m4-q10",
        type: "true-false",
        questionText: "A Product Backlog item that has not met the Definition of Done can still be presented at the Sprint Review.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "If a Product Backlog item does not meet the DoD, it cannot be released or presented at the Sprint Review. The Definition of Done ensures consistent quality standards.",
        lessonContext: "",
      },
    ],

    // ── MODULE 5 QUIZ: Agile Testing and Continuous Integration ────────────
    "mod-5": [
      {
        questionId: "as-m5-q1",
        type: "multiple-choice",
        questionText: "According to the Agile Testing Quadrants, which type of testing supports the team and is technology-facing?",
        options: ["Exploratory testing", "Unit tests and component tests", "Usability testing", "Performance testing"],
        correctAnswer: "Unit tests and component tests",
        explanation: "Quadrant 1 is technology-facing and supports the team — this includes unit tests and component tests. These tests help developers build quality into the product from the start.",
        lessonContext: "",
      },
      {
        questionId: "as-m5-q2",
        type: "multiple-choice",
        questionText: "What is the correct order of steps in Test-Driven Development (TDD)?",
        options: [
          "Write code → Write tests → Refactor",
          "Write failing test → Write minimum code to pass → Refactor",
          "Design → Code → Test → Deploy",
          "Write all tests → Write all code → Verify",
        ],
        correctAnswer: "Write failing test → Write minimum code to pass → Refactor",
        explanation: "The TDD cycle is Red (write a failing test) → Green (write minimum code to pass) → Refactor (clean up code while keeping tests green).",
        lessonContext: "",
      },
      {
        questionId: "as-m5-q3",
        type: "true-false",
        questionText: "Continuous Integration requires developers to merge code changes into a shared repository multiple times per day.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "CI is a practice where developers merge code changes frequently — ideally multiple times per day. Each merge triggers an automated build and test sequence.",
        lessonContext: "",
      },
      {
        questionId: "as-m5-q4",
        type: "multiple-choice",
        questionText: "According to the Test Automation Pyramid, which type of tests should be most numerous?",
        options: ["UI/End-to-End tests", "Integration tests", "Unit tests", "Manual tests"],
        correctAnswer: "Unit tests",
        explanation: "The Test Automation Pyramid recommends many unit tests (base), some integration tests (middle), and few UI/end-to-end tests (top). Unit tests are fast and provide quick feedback.",
        lessonContext: "",
      },
      {
        questionId: "as-m5-q5",
        type: "true-false",
        questionText: "In Agile, all testing should be automated to achieve maximum efficiency.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Manual testing is essential for exploratory testing, usability testing, visual checks, and novel edge cases. A balanced strategy uses both automated and manual testing appropriately.",
        lessonContext: "",
      },
      {
        questionId: "as-m5-q6",
        type: "multiple-choice",
        questionText: "What does 'shift left' mean in Agile testing?",
        options: [
          "Deferring testing to the end of the project",
          "Moving testing activities earlier in the development process",
          "Shifting responsibility from QA to developers",
          "Using only automated testing tools",
        ],
        correctAnswer: "Moving testing activities earlier in the development process",
        explanation: "'Shift left' means testing earlier in the development process to reduce the cost of defects. This involves automated testing, early manual testing, and QA involvement from Sprint start.",
        lessonContext: "",
      },
    ],

    // ── MODULE 6 QUIZ: Scaling Agile ───────────────────────────────────────
    "mod-6": [
      {
        questionId: "as-m6-q1",
        type: "multiple-choice",
        questionText: "What is the primary purpose of a Scrum of Scrums meeting?",
        options: [
          "To report individual team member status to senior management",
          "To coordinate cross-team dependencies and resolve integration issues",
          "To replace individual team Daily Scrums",
          "To plan the entire product roadmap",
        ],
        correctAnswer: "To coordinate cross-team dependencies and resolve integration issues",
        explanation: "Scrum of Scrums coordinates multiple Scrum teams by having ambassadors from each team discuss cross-team concerns, dependencies, and coordination issues.",
        lessonContext: "",
      },
      {
        questionId: "as-m6-q2",
        type: "multiple-choice",
        questionText: "What is an Agile Release Train (ART) in SAFe?",
        options: [
          "A physical train used for team-building exercises",
          "A long-lived team of Agile teams (50-125 people) that plans and executes together",
          "A tool for automating deployments",
          "A certification program for Scrum Masters",
        ],
        correctAnswer: "A long-lived team of Agile teams (50-125 people) that plans and executes together",
        explanation: "An ART in SAFe is a group of 50-125 people composed of multiple Agile teams that work together on the same solution. ARTs plan together during PI Planning events.",
        lessonContext: "",
      },
      {
        questionId: "as-m6-q3",
        type: "multiple-choice",
        questionText: "How does LeSS (Large-Scale Scrum) differ from SAFe in its scaling approach?",
        options: [
          "LeSS adds more roles and events than SAFe",
          "LeSS removes as much process as possible, keeping close to standard Scrum",
          "LeSS is designed for non-software contexts only",
          "LeSS requires all teams to use Kanban instead of Scrum",
        ],
        correctAnswer: "LeSS removes as much process as possible, keeping close to standard Scrum",
        explanation: "LeSS is a minimalist scaling approach — it starts with standard Scrum and adds only what is absolutely necessary for coordination. SAFe adds more structure, roles, and events.",
        lessonContext: "",
      },
      {
        questionId: "as-m6-q4",
        type: "true-false",
        questionText: "An organization should adopt a scaling framework as soon as they start using Scrum, even with a single team.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Organizations should master Scrum with a single team first before scaling. Scaling before understanding Scrum basics leads to unnecessary complexity and 'cargo-cult' Agile practices.",
        lessonContext: "",
      },
      {
        questionId: "as-m6-q5",
        type: "multiple-choice",
        questionText: "What does Conway's Law suggest about scaled Agile implementations?",
        options: [
          "Larger teams always produce better software",
          "Organizations design systems that mirror their communication structure",
          "Scaling should always follow the Spotify model",
          "Agile doesn't work for organizations with more than 100 people",
        ],
        correctAnswer: "Organizations design systems that mirror their communication structure",
        explanation: "Conway's Law states that organizations design systems that mirror their communication structure. If a scaled Agile approach requires complex coordination, consider whether team structure changes might solve the problem more directly.",
        lessonContext: "",
      },
      {
        questionId: "as-m6-q6",
        type: "multiple-choice",
        questionText: "Which of the following is a sign that you should NOT scale Agile yet?",
        options: [
          "Your product requires more than 9 people per team",
          "Multiple teams work on the same codebase",
          "Your single team is still learning Scrum basics",
          "Cross-team dependencies are causing delays",
        ],
        correctAnswer: "Your single team is still learning Scrum basics",
        explanation: "Signs you should not scale yet include: the team is still learning Scrum basics, there's no stable Definition of Done, Sprint Reviews/Retros aren't productive, and management still uses command-and-control.",
        lessonContext: "",
      },
    ],

    // ── MODULE 7 QUIZ: Agile Metrics and Monitoring Progress ────────────────
    "mod-7": [
      {
        questionId: "as-m7-q1",
        type: "multiple-choice",
        questionText: "What is velocity in Scrum?",
        options: [
          "How fast individual developers write code",
          "The amount of work a team completes in a Sprint, measured in story points",
          "The number of bugs found per day",
          "The speed of the CI/CD pipeline",
        ],
        correctAnswer: "The amount of work a team completes in a Sprint, measured in story points",
        explanation: "Velocity is the sum of story points of all completed Product Backlog items in a Sprint. It is used for planning forecasts, not as a performance metric.",
        lessonContext: "",
      },
      {
        questionId: "as-m7-q2",
        type: "true-false",
        questionText: "It is appropriate to compare velocity across different teams to determine which team is more productive.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Story points are team-specific and cannot be compared across teams. Using velocity to compare teams is meaningless and creates destructive competition.",
        lessonContext: "",
      },
      {
        questionId: "as-m7-q3",
        type: "multiple-choice",
        questionText: "What does a burndown chart show?",
        options: [
          "Completed work over time, with two lines for total and completed scope",
          "Remaining work over time, with an ideal trend line descending to zero by Sprint end",
          "Work in each workflow state over time",
          "Team member availability and vacation days",
        ],
        correctAnswer: "Remaining work over time, with an ideal trend line descending to zero by Sprint end",
        explanation: "A burndown chart shows remaining effort (Y-axis) over time (X-axis). The ideal line descends from top-left to bottom-right. The actual line shows real progress.",
        lessonContext: "",
      },
      {
        questionId: "as-m7-q4",
        type: "multiple-choice",
        questionText: "What is the difference between lead time and cycle time?",
        options: [
          "Lead time is measured in hours; cycle time is measured in days",
          "Lead time starts when work is requested; cycle time starts when work begins",
          "Lead time is for Kanban; cycle time is for Scrum",
          "There is no difference — the terms are interchangeable",
        ],
        correctAnswer: "Lead time starts when work is requested; cycle time starts when work begins",
        explanation: "Lead time measures the total time from request to delivery (customer experience). Cycle time measures the time from when work actually begins to completion (team efficiency).",
        lessonContext: "",
      },
      {
        questionId: "as-m7-q5",
        type: "multiple-choice",
        questionText: "According to Little's Law, how can a team reduce cycle time?",
        options: [
          "Increase team size",
          "Reduce Work In Progress (WIP)",
          "Work longer hours",
          "Skip the Definition of Done",
        ],
        correctAnswer: "Reduce Work In Progress (WIP)",
        explanation: "Little's Law states: Cycle Time = WIP / Throughput. Reducing WIP is the most effective lever to reduce cycle time since throughput is hard to increase.",
        lessonContext: "",
      },
      {
        questionId: "as-m7-q6",
        type: "multiple-choice",
        questionText: "What does a widening band in a Cumulative Flow Diagram indicate?",
        options: [
          "The team is delivering faster than expected",
          "A bottleneck is forming in that workflow state",
          "The team needs more people",
          "The project is ahead of schedule",
        ],
        correctAnswer: "A bottleneck is forming in that workflow state",
        explanation: "Widening bands in a CFD indicate increasing WIP in a particular state. For example, if 'In Testing' keeps expanding, tests are likely a bottleneck.",
        lessonContext: "",
      },
    ],

    // ── MODULE 8 QUIZ: Advanced Topics in Agile ─────────────────────────────
    "mod-8": [
      {
        questionId: "as-m8-q1",
        type: "multiple-choice",
        questionText: "Why are traditional fixed-price, fixed-scope contracts problematic for Agile projects?",
        options: [
          "They cost too much money",
          "They assume requirements can be fully defined upfront, which contradicts Agile's embrace of change",
          "They require too much paperwork",
          "They don't include a termination clause",
        ],
        correctAnswer: "They assume requirements can be fully defined upfront, which contradicts Agile's embrace of change",
        explanation: "Fixed-price, fixed-scope contracts assume all requirements are known upfront. Agile embraces changing requirements and iterative discovery, which conflicts with this model.",
        lessonContext: "",
      },
      {
        questionId: "as-m8-q2",
        type: "multiple-choice",
        questionText: "Which Agile contract model allows the client to cancel early and add scope without penalty?",
        options: ["Time & Materials", "Fixed Price + Iterative", "Money for Nothing, Change for Free", "Outcome-Based"],
        correctAnswer: "Money for Nothing, Change for Free",
        explanation: "In this model, the client can cancel early (paying a termination fee) or add scope without penalty. The vendor is incentivized to deliver value early and accommodate changes flexibly.",
        lessonContext: "",
      },
      {
        questionId: "as-m8-q3",
        type: "true-false",
        questionText: "Agile was designed exclusively for co-located teams and cannot be adapted for remote or distributed work.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "While Agile was originally designed for co-located teams, it can work remotely with deliberate adaptations: over-communication, video ceremonies, async feedback loops, and virtual social time.",
        lessonContext: "",
      },
      {
        questionId: "as-m8-q4",
        type: "multiple-choice",
        questionText: "What is the primary challenge of distributed Agile teams mentioned in the course?",
        options: [
          "Higher infrastructure costs",
          "Communication lag due to lack of face-to-face conversation",
          "Difficulty finding qualified developers",
          "Inability to use Scrum at all",
        ],
        correctAnswer: "Communication lag due to lack of face-to-face conversation",
        explanation: "Principle #6 states face-to-face conversation is the most efficient method. Text-based communication has lower bandwidth, making it harder to convey nuance and build trust.",
        lessonContext: "",
      },
      {
        questionId: "as-m8-q5",
        type: "true-false",
        questionText: "DevOps is a separate methodology that replaces Agile principles in operations and infrastructure.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "DevOps is a natural extension of Agile principles into operations. It breaks down walls between development and operations, just as Agile broke down walls between business and development.",
        lessonContext: "",
      },
      {
        questionId: "as-m8-q6",
        type: "multiple-choice",
        questionText: "Which of the 'Three Ways of DevOps' focuses on optimizing the flow of work from development to operations to the customer?",
        options: ["Flow", "Feedback", "Continuous Learning", "Automation"],
        correctAnswer: "Flow",
        explanation: "The First Way (Flow) optimizes the flow of work from development to operations to the customer through small batch sizes, reduced handoffs, and automated deployment pipelines.",
        lessonContext: "",
      },
    ],

    // ── FINAL EXAM: Comprehensive Course Assessment ────────────────────────
    "final-exam": [
      {
        questionId: "as-fe-q1",
        type: "multiple-choice",
        questionText: "Which of the following best describes the Agile Manifesto's view on processes and tools?",
        options: [
          "Processes and tools are more important than people",
          "Individuals and interactions are valued over processes and tools",
          "Processes and tools should be eliminated entirely",
          "Only automated tools should be used",
        ],
        correctAnswer: "Individuals and interactions are valued over processes and tools",
        explanation: "The first value of the Agile Manifesto states: 'Individuals and interactions over processes and tools.' People and collaboration are prioritized over rigid processes.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q2",
        type: "multiple-choice",
        questionText: "What are the three pillars of Scrum?",
        options: [
          "Planning, Execution, Review",
          "Transparency, Inspection, Adaptation",
          "Roles, Events, Artifacts",
          "Product, Sprint, Team",
        ],
        correctAnswer: "Transparency, Inspection, Adaptation",
        explanation: "The three pillars of Scrum are Transparency (visibility), Inspection (frequent checks), and Adaptation (adjustments based on inspection). These support Scrum's empirical process control.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q3",
        type: "multiple-choice",
        questionText: "A team adopts all Scrum ceremonies — daily standups, sprint reviews, retrospectives — but management continues to assign tasks and dictate priorities. What is this called?",
        options: [
          "Effective Scrum",
          "Cargo-cult Agile",
          "Lean management",
          "Scaled Agile",
        ],
        correctAnswer: "Cargo-cult Agile",
        explanation: "Adopting ceremonies without embracing the underlying values of trust, empowerment, and self-management is known as 'cargo-cult Agile.' True agility requires a mindset shift, not just mechanical practice adoption.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q4",
        type: "multiple-choice",
        questionText: "In Scrum, who decides how many Product Backlog items to include in a Sprint?",
        options: ["Product Owner", "Scrum Master", "Development Team", "Project Manager"],
        correctAnswer: "Development Team",
        explanation: "The Development Team selects the items they believe they can complete in a Sprint. The team — not the PO or manager — makes this selection based on past performance and capacity.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q5",
        type: "multiple-choice",
        questionText: "What distinguishes Kanban from Scrum most fundamentally?",
        options: [
          "Kanban has more roles than Scrum",
          "Kanban uses continuous flow without fixed-length iterations; Scrum uses timeboxed Sprints",
          "Kanban is only for manufacturing, not software",
          "Kanban does not visualize workflow",
        ],
        correctAnswer: "Kanban uses continuous flow without fixed-length iterations; Scrum uses timeboxed Sprints",
        explanation: "The most fundamental difference is that Scrum timeboxes work into fixed-length Sprints, while Kanban uses continuous flow with WIP limits but no prescribed iteration boundaries.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q6",
        type: "multiple-choice",
        questionText: "What is the primary benefit of Test-Driven Development (TDD)?",
        options: [
          "Eliminating the need for manual testing",
          "Improving code design by forcing developers to think about interfaces before implementation",
          "Reducing the number of developers needed on a team",
          "Removing the need for a Definition of Done",
        ],
        correctAnswer: "Improving code design by forcing developers to think about interfaces before implementation",
        explanation: "TDD is primarily a design technique. Writing tests first forces developers to consider interfaces, contracts, and behavior before implementation, leading to cleaner, more modular code.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q7",
        type: "multiple-choice",
        questionText: "Which Scrum event is explicitly focused on 'how' the team can improve its process?",
        options: ["Sprint Planning", "Daily Scrum", "Sprint Review", "Sprint Retrospective"],
        correctAnswer: "Sprint Retrospective",
        explanation: "The Sprint Retrospective is the event where the team inspects how the last Sprint went regarding people, relationships, process, and tools, and creates a plan for improvements.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q8",
        type: "multiple-choice",
        questionText: "A Product Backlog item should be considered 'Done' when:",
        options: [
          "The developer says it's finished",
          "It meets the team's Definition of Done",
          "The Product Owner approves the design",
          "All tests pass",
        ],
        correctAnswer: "It meets the team's Definition of Done",
        explanation: "The Definition of Done is a formal description of quality measures. An item is Done only when it meets all DoD criteria, which may include code review, testing, documentation, and PO acceptance.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q9",
        type: "multiple-choice",
        questionText: "What is velocity best used for in Scrum?",
        options: [
          "Evaluating individual developer performance",
          "Comparing team productivity",
          "Forecasting how much work a team can complete in future Sprints",
          "Determining developer salaries",
        ],
        correctAnswer: "Forecasting how much work a team can complete in future Sprints",
        explanation: "Velocity is a forecasting tool, not a performance metric. A stable velocity helps the team predict future Sprint capacity during Sprint Planning.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q10",
        type: "multiple-choice",
        questionText: "Which scaling approach keeps the three Scrum roles (PO, SM, Devs) and adds minimal extra process?",
        options: ["SAFe", "LeSS", "Scrum of Scrums only", "Waterfall"],
        correctAnswer: "LeSS",
        explanation: "LeSS (Large-Scale Scrum) keeps the three Scrum roles and adds as little additional process as possible. It scales events rather than adding new roles or layers.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q11",
        type: "multiple-choice",
        questionText: "In the 'Money for Nothing, Change for Free' contract model, what incentive does the vendor have?",
        options: [
          "Deliver as slowly as possible to maximize billable hours",
          "Deliver value early so the client may cancel early, earning higher margin",
          "Avoid any changes to scope",
          "Focus on documentation rather than working software",
        ],
        correctAnswer: "Deliver value early so the client may cancel early, earning higher margin",
        explanation: "The vendor earns higher margin if the client cancels early (money for nothing), incentivizing rapid value delivery. The client can also add scope for free, encouraging collaboration over rigid contracts.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q12",
        type: "multiple-choice",
        questionText: "Which of the following is a correct statement about the Sprint Backlog?",
        options: [
          "It is owned by the Product Owner and cannot be changed during a Sprint",
          "It is owned by the Development Team and is updated in real time as work progresses",
          "It is a list of all features planned for the entire product lifecycle",
          "It is created by the Scrum Master and assigned to developers",
        ],
        correctAnswer: "It is owned by the Development Team and is updated in real time as work progresses",
        explanation: "The Sprint Backlog belongs to the Development Team and is updated throughout the Sprint. Only the Development Team can change it during the Sprint.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q13",
        type: "multiple-choice",
        questionText: "What does a Cumulative Flow Diagram (CFD) primarily help a team understand?",
        options: [
          "Individual developer productivity",
          "The health of the workflow and potential bottlenecks",
          "How much budget remains",
          "Whether the product meets customer needs",
        ],
        correctAnswer: "The health of the workflow and potential bottlenecks",
        explanation: "A CFD shows work in each workflow state over time. Widening bands indicate bottlenecks, flat slopes indicate stalled progress, and steady parallel bands indicate healthy flow.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q14",
        type: "multiple-choice",
        questionText: "In which quadrant of the Agile Testing Quadrants would exploratory testing be classified?",
        options: ["Q1 — Technology-facing, supporting the team", "Q2 — Business-facing, supporting the team", "Q3 — Business-facing, critiquing the product", "Q4 — Technology-facing, critiquing the product"],
        correctAnswer: "Q3 — Business-facing, critiquing the product",
        explanation: "Exploratory testing is in Q3 — it is business-facing (tests the product from a user perspective) and critiques the product (seeks to find issues through creative exploration).",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q15",
        type: "multiple-choice",
        questionText: "What is the main purpose of the Daily Scrum?",
        options: [
          "To report status to the Scrum Master",
          "To inspect progress toward the Sprint Goal and adapt the daily plan",
          "To assign tasks to team members",
          "To discuss stakeholder feedback",
        ],
        correctAnswer: "To inspect progress toward the Sprint Goal and adapt the daily plan",
        explanation: "The Daily Scrum is a planning event where the Development Team inspects progress toward the Sprint Goal and adapts the upcoming planned work. It is not a status report.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q16",
        type: "multiple-choice",
        questionText: "An organization has adopted Scrum but managers still assign tasks individually, daily standups are status reports, and the Definition of Done is ignored. What is the root cause?",
        options: [
          "The team needs better tools",
          "The organization adopted ceremonies without embracing the Agile mindset",
          "Scrum is the wrong framework for this team",
          "The Sprint length is too short",
        ],
        correctAnswer: "The organization adopted ceremonies without embracing the Agile mindset",
        explanation: "This is a classic 'cargo-cult Agile' scenario. Real agility requires trust, empowerment, self-management, and a commitment to quality — not just mechanical adoption of ceremonies.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q17",
        type: "multiple-choice",
        questionText: "What is the recommended maximum percentage of Sprint capacity to dedicate to Backlog Refinement?",
        options: ["5%", "10%", "20%", "30%"],
        correctAnswer: "10%",
        explanation: "The Scrum Guide recommends dedicating up to 10% of the Sprint's capacity to Backlog Refinement. This ensures the Backlog stays healthy without consuming too much development time.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q18",
        type: "multiple-choice",
        questionText: "In the Three Ways of DevOps, what does the 'Feedback' way emphasize?",
        options: [
          "Short feedback loops so issues are detected and fixed immediately",
          "Annual performance reviews",
          "Customer satisfaction surveys",
          "Monthly status reports",
        ],
        correctAnswer: "Short feedback loops so issues are detected and fixed immediately",
        explanation: "The Second Way (Feedback) emphasizes creating short feedback loops. Monitoring, alerting, and incident response ensure that operations issues are detected and addressed quickly.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q19",
        type: "multiple-choice",
        questionText: "A Product Owner wants to add a critical feature mid-Sprint. What should the team do?",
        options: [
          "Drop everything and work on the new feature",
          "Explain that the Sprint scope is fixed and the feature can be added in the next Sprint Planning",
          "Add it to the Sprint Backlog without discussion",
          "Ask the Scrum Master to decide",
        ],
        correctAnswer: "Explain that the Sprint scope is fixed and the feature can be added in the next Sprint Planning",
        explanation: "No changes should be made that would endanger the Sprint Goal. The team should protect their Sprint commitment and add the new feature to the Product Backlog for the next Sprint Planning.",
        lessonContext: "",
      },
      {
        questionId: "as-fe-q20",
        type: "multiple-choice",
        questionText: "Which of the following best summarizes the Agile mindset?",
        options: [
          "Follow a detailed plan strictly to ensure predictability",
          "Embrace collaboration, learning, adaptability, and continuous improvement over rigid processes",
          "Document everything thoroughly before starting any work",
          "Focus on tools and automation to eliminate human error",
        ],
        correctAnswer: "Embrace collaboration, learning, adaptability, and continuous improvement over rigid processes",
        explanation: "The Agile mindset values collaboration, customer focus, embracing uncertainty, continuous improvement, sustainable pace, and technical excellence. It prioritizes people and adaptability over rigid plans and processes.",
        lessonContext: "",
      },
    ],
  },

  // ── QA Onboarding — Advanced ─────────────────────────────────────────────────
  "qa-onboarding-advanced": {

    // ── MODULE 1: Deep D365 Testing ──────────────────────────────────────────
    "mod-1": [
      {
        questionId: "adv-m1-q1",
        type: "multiple-choice",
        questionText: "What is the most important thing to verify after a D365 workflow or plug-in fires on record save?",
        options: [
          "That the confirmation toast appeared",
          "The downstream effects on related records and processes",
          "That the page did not reload",
          "That the audit log timestamp matches the server clock",
        ],
        correctAnswer: "The downstream effects on related records and processes",
        explanation: "A UI-only test is incomplete. D365 may show 'Saved successfully' even when a workflow or plug-in threw an exception. Always verify the actual downstream result — did the email send, was the owner assigned, did the status cascade?",
        lessonContext: "Real-World D365 Workflows",
      },
      {
        questionId: "adv-m1-q2",
        type: "multiple-choice",
        questionText: "Which of the following is the correct approach to testing Business Process Flows (BPFs)?",
        options: [
          "Test only the happy path to confirm the BPF progresses through all stages",
          "Test stage advancement with missing required fields, backwards navigation, and conditional branching per role",
          "Verify the BPF is visible to System Administrators only",
          "Skip BPF testing since it's a configuration, not custom code",
        ],
        correctAnswer: "Test stage advancement with missing required fields, backwards navigation, and conditional branching per role",
        explanation: "BPFs enforce required fields per stage, prevent skipping stages, and may branch conditionally. Each role may see a different BPF. Testing only the happy path misses critical validation bugs.",
        lessonContext: "Real-World D365 Workflows",
      },
      {
        questionId: "adv-m1-q3",
        type: "true-false",
        questionText: "When testing a Date/Time field in D365, testing February 29 on a non-leap year is unnecessary because D365 validates dates automatically.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Edge cases like Feb 29 on a non-leap year, time zone transitions at midnight, and dates before 1970 can all produce unexpected behaviour. D365 does not automatically guard against every edge case — that is the tester's job.",
        lessonContext: "Edge Cases in D365",
      },
      {
        questionId: "adv-m1-q4",
        type: "multiple-choice",
        questionText: "What is the best practice when testing D365 security across roles?",
        options: [
          "Test everything as System Administrator — if it passes there, it works for all roles",
          "Create a separate test account for each role and test every scenario from that role's perspective",
          "Document the security model and assume it works correctly",
          "Only test security boundaries when a bug is reported",
        ],
        correctAnswer: "Create a separate test account for each role and test every scenario from that role's perspective",
        explanation: "Testing only as Administrator gives a false sense of security. Different roles may see different field permissions, record access levels, and BPFs. Create real test accounts for every role and test from their perspective.",
        lessonContext: "Edge Cases in D365",
      },
      {
        questionId: "adv-m1-q5",
        type: "multiple-choice",
        questionText: "Which of these describes the best strategy for test data management?",
        options: [
          "Use production data for the most realistic test environment",
          "Maintain a curated baseline data set plus scenario-specific and boundary data sets",
          "Create all test data from scratch before each test cycle",
          "Share a single set of test data across all test teams and environments",
        ],
        correctAnswer: "Maintain a curated baseline data set plus scenario-specific and boundary data sets",
        explanation: "Production data risks PII exposure and orphaned references. Fresh data each cycle is slow. A curated baseline covers shared needs, scenario-specific data targets individual tests, and boundary data covers edge cases.",
        lessonContext: "Test Data Setup Strategies",
      },
      {
        questionId: "adv-m1-q6",
        type: "multiple-choice",
        questionText: "What is the key principle for integration testing with D365?",
        options: [
          "All connected services must be fully operational during testing or tests cannot proceed",
          "A downstream integration failure should never corrupt upstream D365 data",
          "Integrations do not require testing since they use standard APIs",
          "Power Automate flows are tested by the flow creator, not the QA team",
        ],
        correctAnswer: "A downstream integration failure should never corrupt upstream D365 data",
        explanation: "D365 must remain consistent even when connected services (Power Automate, SharePoint, external APIs) are unavailable. The integration should fail gracefully, log the error with sufficient detail, and not corrupt the triggering record.",
        lessonContext: "Integration Testing with D365",
      },
    ],

    // ── MODULE 2: Azure DevOps Mastery ──────────────────────────────────────
    "mod-2": [
      {
        questionId: "adv-m2-q1",
        type: "multiple-choice",
        questionText: "Which bug title best follows the recommended formula for professional bug reports?",
        options: [
          "'Case form has an error when saving'",
          "'Error on form'",
          "'Case Save fails with 'Object reference not set' when Case Type is left empty on Senior role'",
          "'Bug in case creation'",
        ],
        correctAnswer: "'Case Save fails with 'Object reference not set' when Case Type is left empty on Senior role'",
        explanation: "A strong bug title follows the pattern: [Action] fails/does [unexpected result] when [condition]. It includes the specific failure, the triggering condition, and enough context for a developer to understand the scope.",
        lessonContext: "Writing Professional Bug Reports",
      },
      {
        questionId: "adv-m2-q2",
        type: "multiple-choice",
        questionText: "What is the correct purpose of the 'Repro Steps' field in an Azure DevOps bug report?",
        options: [
          "A brief summary of what the developer should look for",
          "Numbered steps starting from a known state, including exact data values, that allow anyone to reproduce the bug",
          "A video recording of the testing session",
          "A link to the test case that discovered the bug",
        ],
        correctAnswer: "Numbered steps starting from a known state, including exact data values, that allow anyone to reproduce the bug",
        explanation: "Repro steps must be self-contained and unambiguous. A developer should be able to follow them step-by-step and see the bug without needing additional context or asking follow-up questions.",
        lessonContext: "Writing Professional Bug Reports",
      },
      {
        questionId: "adv-m2-q3",
        type: "true-false",
        questionText: "In Azure DevOps Test Plans, using 'Requirement-based suites' links test cases directly to user stories for automatic traceability.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Requirement-based suites create a direct link between test cases and the user story they validate. This gives instant traceability — you can see exactly which acceptance criteria are covered by which tests.",
        lessonContext: "Test Plans and Suites in ADO",
      },
      {
        questionId: "adv-m2-q4",
        type: "multiple-choice",
        questionText: "What are 'shared steps' in Azure DevOps test cases used for?",
        options: [
          "Steps that are shared publicly across the organization",
          "Reusable step sequences (e.g. 'Log in as Junior Investigator') that update everywhere when changed once",
          "Steps that are automatically executed by the test runner",
          "Steps shared between the developer and tester during handoff",
        ],
        correctAnswer: "Reusable step sequences (e.g. 'Log in as Junior Investigator') that update everywhere when changed once",
        explanation: "Shared steps prevent duplication of common sequences. Update the shared steps once, and every test case that references them is automatically updated. This reduces maintenance overhead significantly.",
        lessonContext: "Creating and Running Test Cases in ADO",
      },
      {
        questionId: "adv-m2-q5",
        type: "multiple-choice",
        questionText: "What should you do during test execution in Azure DevOps when you encounter a bug?",
        options: [
          "Mark the entire test case as Failed and move on",
          "Mark the specific failed step, create a bug directly from it (pre-populated with repro steps), and continue testing remaining steps",
          "Stop all testing and report it to the lead immediately",
          "Skip the step and mark the test as Passed since the core functionality works",
        ],
        correctAnswer: "Mark the specific failed step, create a bug directly from it (pre-populated with repro steps), and continue testing remaining steps",
        explanation: "Azure DevOps allows per-step outcomes and can auto-create a bug pre-filled with the repro steps. Mark only the failed step, create the bug, then continue testing other steps. Do not mark a test as Passed if any step failed.",
        lessonContext: "Creating and Running Test Cases in ADO",
      },
      {
        questionId: "adv-m2-q6",
        type: "multiple-choice",
        questionText: "Why is traceability between bugs, test cases, and acceptance criteria important?",
        options: [
          "It satisfies the QA team's documentation requirements",
          "It allows a release manager to definitively confirm which stories are tested and which ACs are violated by open bugs — essential for audit trails in regulated environments",
          "It makes the Azure DevOps dashboard look more complete",
          "It is only needed for compliance audits, not day-to-day testing",
        ],
        correctAnswer: "It allows a release manager to definitively confirm which stories are tested and which ACs are violated by open bugs — essential for audit trails in regulated environments",
        explanation: "Traceability turns subjective release readiness ('I think it's tested') into objective evidence. In regulated environments (healthcare, financial services), auditors require proof that every requirement maps to a test and every bug links to its source AC.",
        lessonContext: "Linking ACs to Tests and Bugs",
      },
    ],
  },

  // ── Acceptance Criteria Fundamentals ─────────────────────────────────────
  "acceptance-criteria-basics": {

    // ── MODULE 1 QUIZ: What Are Acceptance Criteria? ───────────────────────
    "mod-1": [
      {
        questionId: "ac-m1-q1",
        type: "multiple-choice",
        questionText: "What is the primary purpose of acceptance criteria?",
        options: [
          "To describe the technical implementation details of a feature",
          "To define the conditions a feature must meet to be considered complete",
          "To list every possible test case for a feature",
          "To estimate the development effort required for a story",
        ],
        correctAnswer: "To define the conditions a feature must meet to be considered complete",
        explanation: "Acceptance criteria answer the question 'How do we know when this story is done?' They define the boundary of a feature and serve as the contract between the business need and the implementation.",
        lessonContext: "",
      },
      {
        questionId: "ac-m1-q2",
        type: "multiple-choice",
        questionText: "Which of the following is a characteristic of a good acceptance criterion?",
        options: [
          "The page loads quickly",
          "The system handles errors gracefully",
          "The button is easy to find",
          "The Save button appears in the top-right corner of the form",
        ],
        correctAnswer: "The Save button appears in the top-right corner of the form",
        explanation: "Good ACs are testable, specific, unambiguous, and concise. 'The Save button appears in the top-right corner of the form' is specific and testable. The other options are vague and subjective.",
        lessonContext: "",
      },
      {
        questionId: "ac-m1-q3",
        type: "multiple-choice",
        questionText: "How do acceptance criteria differ from the Definition of Done?",
        options: [
          "ACs apply to every story; DoD is specific to one story",
          "DoD applies to every story; ACs are specific to one story",
          "They are the same thing with different names",
          "ACs are written by developers; DoD is written by testers",
        ],
        correctAnswer: "DoD applies to every story; ACs are specific to one story",
        explanation: "The Definition of Done (DoD) applies to every story — code reviewed, tests passed, no critical bugs. ACs are specific to one story. Do not confuse the two; a story can meet the DoD but still fail its ACs.",
        lessonContext: "",
      },
      {
        questionId: "ac-m1-q4",
        type: "multiple-choice",
        questionText: "Where are acceptance criteria typically stored in Azure DevOps?",
        options: [
          "In the Description field of a Bug work item",
          "In the Acceptance Criteria field of a User Story or Product Backlog Item",
          "In the Test Plan section under Test Cases",
          "In the Comments tab of a Task work item",
        ],
        correctAnswer: "In the Acceptance Criteria field of a User Story or Product Backlog Item",
        explanation: "In Azure DevOps, ACs are stored in the Acceptance Criteria field of a User Story or Product Backlog Item. They may appear as a checklist or under a heading in the Description field.",
        lessonContext: "",
      },
      {
        questionId: "ac-m1-q5",
        type: "multiple-choice",
        questionText: "When should a tester raise concerns about vague or untestable acceptance criteria?",
        options: [
          "After development is complete, during regression testing",
          "During sprint planning or backlog refinement, before development starts",
          "Never — testers should work with whatever ACs they are given",
          "Only during the sprint retrospective",
        ],
        correctAnswer: "During sprint planning or backlog refinement, before development starts",
        explanation: "ACs are defined during sprint planning or backlog refinement. Testers should attend these sessions and speak up if an AC is vague or untestable. It is much easier to fix an AC before development starts than after.",
        lessonContext: "",
      },
    ],

    // ── MODULE 2 QUIZ: The Given/When/Then Format ─────────────────────────
    "mod-2": [
      {
        questionId: "ac-m2-q1",
        type: "multiple-choice",
        questionText: "In the Given/When/Then format, what does the 'Given' section describe?",
        options: [
          "The expected result of the test",
          "The action the user performs",
          "The initial context or state of the system",
          "The bug being reported",
        ],
        correctAnswer: "The initial context or state of the system",
        explanation: "The 'Given' section sets up the initial context — what state the system is in, what data exists, and who the user is. It answers: 'What is the starting point for this scenario?'",
        lessonContext: "",
      },
      {
        questionId: "ac-m2-q2",
        type: "multiple-choice",
        questionText: "What does the 'When' section represent in a Given/When/Then acceptance criterion?",
        options: [
          "The precondition that must be true before testing",
          "The single, specific action the user performs",
          "The expected system behaviour after an action",
          "The time limit for the test to complete",
        ],
        correctAnswer: "The single, specific action the user performs",
        explanation: "The 'When' section describes the action the user performs. It should be a single, specific action. This forces precision — instead of 'the user does something,' it specifies exactly what.",
        lessonContext: "",
      },
      {
        questionId: "ac-m2-q3",
        type: "multiple-choice",
        questionText: "How does the Given/When/Then format help testers with test case design?",
        options: [
          "It eliminates the need for test data",
          "Each section maps directly to test case elements: Given = preconditions, When = steps, Then = expected result",
          "It automatically generates test scripts from the story",
          "It replaces the need for test plans entirely",
        ],
        correctAnswer: "Each section maps directly to test case elements: Given = preconditions, When = steps, Then = expected result",
        explanation: "The Given/When/Then format aligns naturally with test case structure. Given maps to test preconditions, When maps to test steps, and Then maps to the expected result. Test cases practically write themselves from well-written ACs.",
        lessonContext: "",
      },
      {
        questionId: "ac-m2-q4",
        type: "multiple-choice",
        questionText: "What is the purpose of adding 'And' clauses in Given/When/Then statements?",
        options: [
          "To mark a criterion as optional",
          "To extend a section with multiple conditions without breaking the structure",
          "To indicate that the test is automated",
          "To separate the happy path from error scenarios",
        ],
        correctAnswer: "To extend a section with multiple conditions without breaking the structure",
        explanation: "'And' clauses allow you to add multiple conditions to any section (Given, When, or Then) while keeping the structure clean. For example: 'Given the user is logged in And the case status is In Progress.'",
        lessonContext: "",
      },
      {
        questionId: "ac-m2-q5",
        type: "multiple-choice",
        questionText: "What should a complete set of acceptance criteria for a feature cover?",
        options: [
          "Only the happy path scenario",
          "Only error conditions",
          "Happy path, edge cases, and error conditions",
          "Only the most common user workflow",
        ],
        correctAnswer: "Happy path, edge cases, and error conditions",
        explanation: "A complete set of ACs covers all three: the happy path (normal usage), edge cases (unusual inputs or states), and error conditions (what happens when things go wrong). Testing only the happy path misses most bugs.",
        lessonContext: "",
      },
    ],

    // ── MODULE 3 QUIZ: Tracing Bugs to ACs ─────────────────────────────────
    "mod-3": [
      {
        questionId: "ac-m3-q1",
        type: "multiple-choice",
        questionText: "Why is traceability between bugs and acceptance criteria important?",
        options: [
          "It makes the Azure DevOps dashboard look complete",
          "It turns a bug report from an opinion into evidence backed by an agreed-upon contract",
          "It is only needed for compliance audits, not day-to-day testing",
          "It allows developers to close bugs without review",
        ],
        correctAnswer: "It turns a bug report from an opinion into evidence backed by an agreed-upon contract",
        explanation: "A bug without an AC reference is easy to dismiss — 'maybe that's expected behaviour.' A bug that says 'this violates AC #3 of Story 4521' is evidence. The AC is the contract; if the behaviour violates it, the bug is real.",
        lessonContext: "",
      },
      {
        questionId: "ac-m3-q2",
        type: "multiple-choice",
        questionText: "What is the correct traceability chain from business need to bug report?",
        options: [
          "Bug Report → Test Case → User Story → Acceptance Criteria",
          "Business Requirement → User Story → Acceptance Criteria → Test Case → Test Result → Bug Report",
          "Acceptance Criteria → User Story → Test Case → Bug Report",
          "User Story → Bug Report → Test Case → Acceptance Criteria",
        ],
        correctAnswer: "Business Requirement → User Story → Acceptance Criteria → Test Case → Test Result → Bug Report",
        explanation: "Each link connects to the next in the chain. When you file a bug, you create the final link that points back to the AC, telling everyone: 'Here is what we agreed should happen (AC). Here is what actually happened (bug). These do not match.'",
        lessonContext: "",
      },
      {
        questionId: "ac-m3-q3",
        type: "multiple-choice",
        questionText: "How should you reference an acceptance criterion in a bug report description?",
        options: [
          "Mention the AC number briefly and link to the story",
          "Copy the exact AC text into the description and show how the actual behaviour differs",
          "Describe the bug in your own words without referencing the AC",
          "Add the AC number to the bug title only",
        ],
        correctAnswer: "Copy the exact AC text into the description and show how the actual behaviour differs",
        explanation: "Quoting the exact AC text makes the violation explicit. Show the AC text and then describe what actually happened. This leaves no room for interpretation — the AC says X, the system does Y, therefore it is a bug.",
        lessonContext: "",
      },
      {
        questionId: "ac-m3-q4",
        type: "multiple-choice",
        questionText: "How can traceability between ACs and bugs help prevent duplicate bug reports?",
        options: [
          "It reduces the total number of bugs filed",
          "When ACs are linked in bug reports, it is easy to see if a bug for a specific AC already exists",
          "It prevents testers from filing bugs at all",
          "It automatically merges duplicate bugs in Azure DevOps",
        ],
        correctAnswer: "When ACs are linked in bug reports, it is easy to see if a bug for a specific AC already exists",
        explanation: "Without traceability, multiple testers may file separate bugs for the same issue. When bugs are linked to specific ACs, it is obvious at a glance whether a bug for AC #4 already exists, saving everyone's time.",
        lessonContext: "",
      },
      {
        questionId: "ac-m3-q5",
        type: "multiple-choice",
        questionText: "What should a well-structured bug report title include, according to the course?",
        options: [
          "The name of the tester who found the bug",
          "The story number and what fails",
          "The severity level only",
          "The date the bug was discovered",
        ],
        correctAnswer: "The story number and what fails",
        explanation: "A well-structured bug report uses the format '[Story #] — [What fails]'. This makes it immediately clear which story is affected and what the issue is, without needing to open the bug report.",
        lessonContext: "",
      },
    ],
  },

  // ── Introduction to Dynamics CRM ───────────────────────────────────────────
  "dynamics-crm-basics": {

    // ── MODULE 1 QUIZ: Navigating the Case Form ─────────────────────────────
    "mod-1": [
      {
        questionId: "dcrm-m1-q1",
        type: "multiple-choice",
        questionText: "Which of the following best describes the role of tabs on a Dynamics 365 case form?",
        options: [
          "They allow administrators to hide fields from specific security roles",
          "They organize related fields into logical groups displayed across the top of the form",
          "They serve as clickable links to open related records",
          "They display system notifications and alerts for the current case",
        ],
        correctAnswer: "They organize related fields into logical groups displayed across the top of the form",
        explanation: "Tabs create a horizontal navigation structure at the top of the form. Each tab contains one or more sections, and clicking a tab reveals its associated fields. This keeps complex forms manageable.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m1-q2",
        type: "multiple-choice",
        questionText: "What information is displayed in the timeline section of a case form?",
        options: [
          "A chronological feed of activities, emails, appointments, and notes related to the case",
          "A graphical chart showing case resolution time trends",
          "A log of every database change made to the case record",
          "A calendar view of upcoming follow-up tasks",
        ],
        correctAnswer: "A chronological feed of activities, emails, appointments, and notes related to the case",
        explanation: "The timeline aggregates all case-related activities in reverse chronological order, giving the agent a complete history of interactions without navigating away from the form.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m1-q3",
        type: "multiple-choice",
        questionText: "What is the relationship between tabs and sections on a case form?",
        options: [
          "Tabs contain sections, and each section groups related fields together",
          "Sections contain tabs, and each tab represents a different record type",
          "Tabs and sections are two names for the same UI element",
          "Sections are visible only when a specific tab is active",
        ],
        correctAnswer: "Tabs contain sections, and each section groups related fields together",
        explanation: "The form hierarchy is form, tabs, sections, and fields. A tab can hold multiple sections, and each section visually clusters a subset of related fields.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m1-q4",
        type: "multiple-choice",
        questionText: "Where would an agent type informal observations or internal notes that are not part of the official case resolution?",
        options: [
          "The Description field on the Details tab",
          "The Notes section within the timeline or a dedicated notes area",
          "The Subject field in the case header",
          "The Business Process Flow stage notes",
        ],
        correctAnswer: "The Notes section within the timeline or a dedicated notes area",
        explanation: "The Notes area allows agents to record informal observations, internal reminders, or quick updates that appear in the timeline alongside other activities.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m1-q5",
        type: "multiple-choice",
        questionText: "Which part of the case form typically displays the case title and primary identifier for quick reference?",
        options: [
          "The header section at the top of the form",
          "The timeline panel on the right side",
          "The Business Process Flow bar",
          "The status bar at the bottom of the window",
        ],
        correctAnswer: "The header section at the top of the form",
        explanation: "The header is a persistent area at the top of the form that shows key identifying information such as the case title and case number, remaining visible as the agent scrolls through tabs.",
        lessonContext: "",
      },
    ],

    // ── MODULE 2 QUIZ: Reading Case Data ────────────────────────────────────
    "mod-2": [
      {
        questionId: "dcrm-m2-q1",
        type: "multiple-choice",
        questionText: "Which field tells an agent the current lifecycle stage of a case, such as 'In Progress' or 'On Hold'?",
        options: ["Priority", "Status", "Severity", "Case Type"],
        correctAnswer: "Status",
        explanation: "The Status field indicates the case position in its lifecycle, for example Active, In Progress, On Hold, Resolved, or Canceled. It helps agents quickly identify whether a case is still being worked or has been completed.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m2-q2",
        type: "multiple-choice",
        questionText: "What is the difference between Priority and Severity on a Dynamics 365 case?",
        options: [
          "Priority and Severity are the same field displayed in different locations",
          "Priority reflects business urgency, while Severity reflects technical impact",
          "Severity is set by the customer, and Priority is set by the agent",
          "Priority controls the case color, while Severity controls the SLA clock",
        ],
        correctAnswer: "Priority reflects business urgency, while Severity reflects technical impact",
        explanation: "Priority (High, Normal, Low) indicates how urgently the business needs a resolution. Severity (Critical, High, Medium, Low) describes the technical impact on the customer operations.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m2-q3",
        type: "multiple-choice",
        questionText: "Where on the case form would an agent find the customer account name and contact details?",
        options: [
          "The SLA details section on the System Status tab",
          "The Customer lookup field, typically on the Summary or General tab",
          "The Business Process Flow stage fields",
          "The Related tab under Cases",
        ],
        correctAnswer: "The Customer lookup field, typically on the Summary or General tab",
        explanation: "The Customer field is a lookup that links the case to an account or contact record. Clicking it opens the full customer details, including contact information and account history.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m2-q4",
        type: "multiple-choice",
        questionText: "If an agent needs to identify which specific product or service a case is about, which field should they check?",
        options: [
          "The Topic field on the Details tab",
          "The Product field on the case form",
          "The Category field in the case header",
          "The Subject field in the timeline",
        ],
        correctAnswer: "The Product field on the case form",
        explanation: "The Product field links the case to a specific product or service in the product catalog. This helps route the case to the right support team and track product-specific issues.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m2-q5",
        type: "multiple-choice",
        questionText: "What does the case title (Subject field) typically contain?",
        options: [
          "The customer name and account number",
          "A unique auto-generated case identifier",
          "A brief summary of the issue reported by the customer",
          "The name of the product the case is about",
        ],
        correctAnswer: "A brief summary of the issue reported by the customer",
        explanation: "The Subject or Title field captures a concise description of the issue. It serves as the primary way agents identify and differentiate cases in lists and searches.",
        lessonContext: "",
      },
    ],

    // ── MODULE 3 QUIZ: The Business Process Flow ────────────────────────────
    "mod-3": [
      {
        questionId: "dcrm-m3-q1",
        type: "multiple-choice",
        questionText: "What is the primary purpose of a Business Process Flow (BPF) in Dynamics 365?",
        options: [
          "To automate email responses to customers based on case fields",
          "To guide agents through a defined sequence of stages required to resolve a case",
          "To generate reports on case resolution times across the support team",
          "To replace the standard case form with a simplified step-by-step wizard",
        ],
        correctAnswer: "To guide agents through a defined sequence of stages required to resolve a case",
        explanation: "A BPF provides a step-by-step guide that ensures agents follow a consistent process. Each stage contains required fields or steps that must be completed before advancing.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m3-q2",
        type: "multiple-choice",
        questionText: "How does an agent advance from one stage to the next in a Business Process Flow?",
        options: [
          "By clicking a Next Stage button after completing all required fields in the current stage",
          "By waiting for an automated timer to expire",
          "By updating the case Status field to Resolved",
          "By saving the case record and refreshing the page",
        ],
        correctAnswer: "By clicking a Next Stage button after completing all required fields in the current stage",
        explanation: "The agent fills in the required fields for the active stage, then clicks the Next Stage button to proceed. The BPF validates that required data is entered before allowing advancement.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m3-q3",
        type: "multiple-choice",
        questionText: "What happens visually when you move to the next stage in a Business Process Flow?",
        options: [
          "The previous stage disappears entirely from the BPF bar",
          "The next stage becomes highlighted or active, and the completed stage is marked with a checkmark",
          "The entire form refreshes and resets all fields",
          "A confirmation dialog appears asking the agent to confirm the action",
        ],
        correctAnswer: "The next stage becomes highlighted or active, and the completed stage is marked with a checkmark",
        explanation: "The BPF bar visually tracks progress. Completed stages show a checkmark, the current stage is highlighted, and future stages remain dimmed.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m3-q4",
        type: "multiple-choice",
        questionText: "Can an agent move backward to a previous stage in a Business Process Flow?",
        options: [
          "No, once a stage is completed it is permanently locked",
          "Yes, typically by clicking the desired stage in the BPF bar to return to it",
          "Only if the system administrator enables the back-navigation setting",
          "Yes, but only on cases with Priority set to High or Critical",
        ],
        correctAnswer: "Yes, typically by clicking the desired stage in the BPF bar to return to it",
        explanation: "Agents can usually click a previous stage in the BPF bar to go back and review or update information. However, some organizations may restrict this behavior depending on their process requirements.",
        lessonContext: "",
      },
      {
        questionId: "dcrm-m3-q5",
        type: "multiple-choice",
        questionText: "What happens to the data entered in a BPF stage if the agent leaves a required field empty and tries to move forward?",
        options: [
          "The data is saved as a draft, and the agent can proceed without completing it",
          "The BPF blocks advancement and prompts the agent to fill in the required field",
          "The field is automatically filled with a default value",
          "The agent receives a warning but can still advance to the next stage",
        ],
        correctAnswer: "The BPF blocks advancement and prompts the agent to fill in the required field",
        explanation: "Required fields in a BPF stage enforce data completeness. The process flow will not allow the agent to proceed until all mandatory fields have been populated.",
        lessonContext: "",
      },
    ],
  },

  // ── Azure DevOps Bug Reports ───────────────────────────────────────────────
  "ado-bug-reports": {

    // ── MODULE 1 QUIZ: Anatomy of a Bug Report ──────────────────────────────
    "mod-1": [
      {
        questionId: "ado-m1-q1",
        type: "multiple-choice",
        questionText: "Which field in an Azure DevOps bug report is used to quickly identify the area of the product affected?",
        options: ["Area Path", "Iteration Path", "Tags", "Description"],
        correctAnswer: "Area Path",
        explanation: "Area Path categorizes bugs by product feature or team ownership, enabling routing and filtering.",
        lessonContext: "",
      },
      {
        questionId: "ado-m1-q2",
        type: "multiple-choice",
        questionText: "What is the recommended format for a bug report title?",
        options: [
          "Short, specific summary of the problem",
          "The full stack trace",
          "The developer's name",
          "A question about expected behavior",
        ],
        correctAnswer: "Short, specific summary of the problem",
        explanation: "A good title is concise yet descriptive, letting developers immediately understand the issue without reading the full report.",
        lessonContext: "",
      },
      {
        questionId: "ado-m1-q3",
        type: "multiple-choice",
        questionText: "In the Description field of a bug report, what is the minimum information that should always be included?",
        options: [
          "Steps to reproduce, expected result, and actual result",
          "Only the error message",
          "A screenshot with no context",
          "The name of the customer who reported it",
        ],
        correctAnswer: "Steps to reproduce, expected result, and actual result",
        explanation: "Every bug report must describe what you did, what you expected to happen, and what actually happened. This forms the core of a useful report.",
        lessonContext: "",
      },
      {
        questionId: "ado-m1-q4",
        type: "multiple-choice",
        questionText: "Why should screenshots or screen recordings be attached to a bug report?",
        options: [
          "To provide visual evidence of the bug's behavior",
          "To replace the written description entirely",
          "To increase the bug priority automatically",
          "To satisfy Azure DevOps attachment requirements",
        ],
        correctAnswer: "To provide visual evidence of the bug's behavior",
        explanation: "Visual attachments help developers confirm the issue at a glance and can reveal UI context that text alone misses.",
        lessonContext: "",
      },
      {
        questionId: "ado-m1-q5",
        type: "multiple-choice",
        questionText: "What is the purpose of the System Info field in an Azure DevOps bug report?",
        options: [
          "To capture environment details such as browser, OS, and build version",
          "To store the developer who will fix the bug",
          "To link the bug to a test case",
          "To record the customer's contact information",
        ],
        correctAnswer: "To capture environment details such as browser, OS, and build version",
        explanation: "System Info provides reproducible context by recording the exact environment where the bug occurred, which is critical for debugging.",
        lessonContext: "",
      },
    ],

    // ── MODULE 2 QUIZ: Writing Great Repro Steps ────────────────────────────
    "mod-2": [
      {
        questionId: "ado-m2-q1",
        type: "multiple-choice",
        questionText: "What are the \"3 Exactlys\" in great repro steps?",
        options: [
          "Exactly where, exactly when, exactly how",
          "Exactly who, exactly what, exactly why",
          "Exactly the steps, exactly the data, exactly the environment",
          "Exactly the error, exactly the time, exactly the user",
        ],
        correctAnswer: "Exactly the steps, exactly the data, exactly the environment",
        explanation: "Great repro steps specify the precise sequence of actions, the exact input data used, and the complete environment context.",
        lessonContext: "",
      },
      {
        questionId: "ado-m2-q2",
        type: "multiple-choice",
        questionText: "Which of the following is an example of a well-written repro step?",
        options: [
          "1. Log in as admin. 2. Navigate to Settings > Billing. 3. Enter \"100.00\" in the Refund Amount field. 4. Click Submit.",
          "1. Go to the billing page. 2. Try to refund something. 3. See the error.",
          "1. Do some stuff. 2. It breaks.",
          "1. Log in. 2. Click around. 3. Observe the problem.",
        ],
        correctAnswer: "1. Log in as admin. 2. Navigate to Settings > Billing. 3. Enter \"100.00\" in the Refund Amount field. 4. Click Submit.",
        explanation: "Good repro steps are numbered, specific about navigation, include exact data values, and leave no ambiguity about the actions taken.",
        lessonContext: "",
      },
      {
        questionId: "ado-m2-q3",
        type: "multiple-choice",
        questionText: "What is a common mistake when writing repro steps?",
        options: [
          "Including setup or preconditions",
          "Combining multiple actions into a single vague step",
          "Specifying exact input values",
          "Numbering each step sequentially",
        ],
        correctAnswer: "Combining multiple actions into a single vague step",
        explanation: "A common repro mistake is saying 'navigate to the settings page' without specifying clicks or menu paths, leaving the developer to guess.",
        lessonContext: "",
      },
      {
        questionId: "ado-m2-q4",
        type: "multiple-choice",
        questionText: "Why is it important to include preconditions in repro steps?",
        options: [
          "To ensure the developer starts in the correct application state before following the steps",
          "To make the bug report longer and more thorough",
          "To satisfy Azure DevOps field requirements",
          "To assign the bug to the right team automatically",
        ],
        correctAnswer: "To ensure the developer starts in the correct application state before following the steps",
        explanation: "Preconditions establish the starting state (e.g., logged in as a specific role, on a specific page) so repro steps work consistently.",
        lessonContext: "",
      },
      {
        questionId: "ado-m2-q5",
        type: "multiple-choice",
        questionText: "What should you do if a bug is intermittent and you cannot reproduce it reliably?",
        options: [
          "Document the approximate steps and note the inconsistency in the bug report",
          "Close the bug as unreproducible",
          "Only report bugs that are 100% reproducible",
          "Submit the bug without any repro steps",
        ],
        correctAnswer: "Document the approximate steps and note the inconsistency in the bug report",
        explanation: "Even intermittent bugs should be reported with the best available steps and a clear note that they are inconsistent, so developers can investigate patterns.",
        lessonContext: "",
      },
    ],

    // ── MODULE 3 QUIZ: Severity and Priority ────────────────────────────────
    "mod-3": [
      {
        questionId: "ado-m3-q1",
        type: "multiple-choice",
        questionText: "In Azure DevOps, which severity level indicates a bug that causes a complete system crash with no workaround?",
        options: ["1 - Critical", "2 - High", "3 - Medium", "4 - Low"],
        correctAnswer: "1 - Critical",
        explanation: "Severity 1 (Critical) means the issue causes data loss, security breach, or complete system failure with no acceptable workaround.",
        lessonContext: "",
      },
      {
        questionId: "ado-m3-q2",
        type: "multiple-choice",
        questionText: "What is the difference between priority and severity in bug triage?",
        options: [
          "Severity measures technical impact; priority measures business urgency for when to fix it",
          "Priority measures technical impact; severity measures business urgency",
          "They are interchangeable terms for the same concept",
          "Severity is set by developers; priority is set by testers",
        ],
        correctAnswer: "Severity measures technical impact; priority measures business urgency for when to fix it",
        explanation: "Severity describes how bad the bug is technically (crash vs. cosmetic). Priority describes how soon the business needs it fixed.",
        lessonContext: "",
      },
      {
        questionId: "ado-m3-q3",
        type: "multiple-choice",
        questionText: "A minor UI misalignment on a rarely-used settings page would most likely be assigned which severity?",
        options: ["4 - Low", "1 - Critical", "2 - High", "3 - Medium"],
        correctAnswer: "4 - Low",
        explanation: "Cosmetic issues on non-critical, rarely-visited pages are Low severity — they do not block work or affect core functionality.",
        lessonContext: "",
      },
      {
        questionId: "ado-m3-q4",
        type: "multiple-choice",
        questionText: "Which scenario describes a High severity (2) bug with Low priority (4)?",
        options: [
          "A data calculation error in a quarterly report that is not due for 3 months",
          "A broken login button on the production homepage",
          "A typo in a tooltip on a settings page",
          "A database crash affecting all users right now",
        ],
        correctAnswer: "A data calculation error in a quarterly report that is not due for 3 months",
        explanation: "High severity because the data is wrong, but Low priority because the fix is not urgent — the report is not needed until the end of the quarter.",
        lessonContext: "",
      },
      {
        questionId: "ado-m3-q5",
        type: "multiple-choice",
        questionText: "Who is typically responsible for setting the initial severity of a bug in Azure DevOps?",
        options: [
          "The reporter (tester or QA engineer)",
          "The product manager",
          "The developer fixing the bug",
          "The release manager",
        ],
        correctAnswer: "The reporter (tester or QA engineer)",
        explanation: "The person who discovers and reports the bug assigns initial severity based on their understanding of the technical impact.",
        lessonContext: "",
      },
    ],
  },

  // ── Microsoft Teams for QA ─────────────────────────────────────────────────
  "teams-for-qa": {

    // ── MODULE 1 QUIZ: Navigating Teams ─────────────────────────────────────
    "mod-1": [
      {
        questionId: "teams-m1-q1",
        type: "multiple-choice",
        questionText: "Where should a QA trainee look first to find today's assigned testing priorities?",
        options: [
          "A direct message from the project manager",
          "The #general channel for pinned announcements",
          "The QA channel thread, specifically the daily briefing post pinned by the QA lead",
          "The Files tab in Teams",
        ],
        correctAnswer: "The QA channel thread, specifically the daily briefing post pinned by the QA lead",
        explanation: "QA briefings are threaded in the QA channel and pinned by the lead. Checking this thread first ensures you see the latest priorities without relying on DMs or general chatter.",
        lessonContext: "",
      },
      {
        questionId: "teams-m1-q2",
        type: "multiple-choice",
        questionText: "A developer posts a lengthy message in the #dev-qa channel. You only want to respond to a specific point. What should you do?",
        options: [
          "Reply to the whole message and quote the relevant line",
          "Start a new conversation in the same channel",
          "Send the developer a direct message",
          "Use the 'Reply' button on the specific sentence to create a threaded reply",
        ],
        correctAnswer: "Use the 'Reply' button on the specific sentence to create a threaded reply",
        explanation: "Replying to a specific sentence creates an inline thread visually anchored to that point. This keeps the conversation contextual and avoids clutter.",
        lessonContext: "",
      },
      {
        questionId: "teams-m1-q3",
        type: "multiple-choice",
        questionText: "You need to find a decision made about test data three weeks ago in the #qa-engineering channel. What is the most efficient approach?",
        options: [
          "Scroll up until you find it manually",
          "Ask the whole channel to repeat the decision",
          "Use the search bar in Teams with keywords like 'test data decision' and filter by channel and date range",
          "Check your email for meeting notes",
        ],
        correctAnswer: "Use the search bar in Teams with keywords like 'test data decision' and filter by channel and date range",
        explanation: "Teams search is powerful — you can filter by channel, sender, and date. This is far faster than scrolling and avoids interrupting others.",
        lessonContext: "",
      },
      {
        questionId: "teams-m1-q4",
        type: "multiple-choice",
        questionText: "You notice a question in a channel that you know the answer to, but the conversation happened days ago. What should you do?",
        options: [
          "Ignore it — the moment has passed",
          "Reply in the thread anyway with your answer so the information is captured for future reference",
          "Send a private message to everyone who was involved",
          "Post a new message in the channel telling people to read the old thread",
        ],
        correctAnswer: "Reply in the thread anyway with your answer so the information is captured for future reference",
        explanation: "Even a delayed answer adds value. The thread becomes a searchable knowledge base for the next person with the same question, reducing repeat queries.",
        lessonContext: "",
      },
      {
        questionId: "teams-m1-q5",
        type: "multiple-choice",
        questionText: "You reply to a thread in the #qa-engineering channel. Who will see your reply by default?",
        options: [
          "Everyone in the organisation",
          "Only the person you are replying to",
          "Everyone who has accessed that specific thread",
          "Only members of the #qa-engineering channel",
        ],
        correctAnswer: "Everyone who has accessed that specific thread",
        explanation: "Thread replies notify everyone who has participated in or followed the thread. This keeps the main channel clean while ensuring interested parties see the discussion.",
        lessonContext: "",
      },
    ],

    // ── MODULE 2 QUIZ: Communicating in Stand-up ────────────────────────────
    "mod-2": [
      {
        questionId: "teams-m2-q1",
        type: "multiple-choice",
        questionText: "During stand-up, what is the most effective way to present a blocking issue?",
        options: [
          '"I am stuck. Can someone help?"',
          '"I am blocked on CASE-42 because the test environment is returning a 500 error on login. I need DevOps to restart the service. I have already filed a ticket — ticket #1042."',
          '"We have a problem with the environment again."',
          '"I will just skip that test for now."',
        ],
        correctAnswer: '"I am blocked on CASE-42 because the test environment is returning a 500 error on login. I need DevOps to restart the service. I have already filed a ticket — ticket #1042."',
        explanation: "Good stand-up updates state the blocker, the root cause, what action has been taken, and what specific help is needed. This lets the team decide next steps immediately.",
        lessonContext: "",
      },
      {
        questionId: "teams-m2-q2",
        type: "multiple-choice",
        questionText: "What is the primary purpose of a daily stand-up for a QA team member?",
        options: [
          "To report your status to management for tracking purposes",
          "To coordinate with the team, surface blockers early, and align on what to test today",
          "To highlight every test case you completed in detail",
          "To discuss how to fix bugs found yesterday",
        ],
        correctAnswer: "To coordinate with the team, surface blockers early, and align on what to test today",
        explanation: "Stand-up is a coordination ceremony, not a status report. QA uses it to flag risks early so the team can re-prioritise or unblock testing before it is too late.",
        lessonContext: "",
      },
      {
        questionId: "teams-m2-q3",
        type: "multiple-choice",
        questionText: "During stand-up, a developer says they have completed a feature. As a QA, what is a good follow-up question?",
        options: [
          '"Did you write unit tests?"',
          '"Are the acceptance criteria available in the ticket so I can begin test planning?"',
          '"Can you show me the code?"',
          '"Is it deployed to production?"',
        ],
        correctAnswer: '"Are the acceptance criteria available in the ticket so I can begin test planning?"',
        explanation: "A good QA question clarifies readiness for testing. Knowing ACs are defined and the ticket is ready helps QA plan their testing approach before the build lands.",
        lessonContext: "",
      },
      {
        questionId: "teams-m2-q4",
        type: "multiple-choice",
        questionText: "A developer gives a vague update: 'Still working on the case form.' What should you do?",
        options: [
          "Nod and move on — details come later",
          "Ask a clarifying question: 'Which part of the case form? The role-based fields or the escalation logic? I want to know what to prepare for testing.'",
          "Assume it is done and start testing",
          "Report the developer to the scrum master for being unclear",
        ],
        correctAnswer: "Ask a clarifying question: 'Which part of the case form? The role-based fields or the escalation logic? I want to know what to prepare for testing.'",
        explanation: "Vague updates help no one. A targeted question guides the developer toward specifics that help QA plan. This is a constructive, collaborative habit.",
        lessonContext: "",
      },
      {
        questionId: "teams-m2-q5",
        type: "multiple-choice",
        questionText: 'You say in stand-up: "Yesterday I tested the search feature and found a bug. Today I will retest after the fix lands." What essential piece is missing from this update?',
        options: [
          "The bug ID and its severity so the team can assess the risk",
          "The name of the developer who caused the bug",
          "How long the testing took",
          "A request to skip stand-up tomorrow",
        ],
        correctAnswer: "The bug ID and its severity so the team can assess the risk",
        explanation: "Including the bug ID and severity lets the team make informed decisions about whether to delay the release. Without this, the update is just noise.",
        lessonContext: "",
      },
    ],
  },

  // ── Agile & Scrum for QA ─────────────────────────────────────────────────
  "agile-scrum-qa": {

    // ── MODULE 1 QUIZ: Sprint Ceremonies for QA ─────────────────────────────
    "mod-1": [
      {
        questionId: "asqa-m1-q1",
        type: "multiple-choice",
        questionText: "During sprint planning, what is the QA team member's primary responsibility?",
        options: [
          "Estimating how long development will take",
          "Identifying testability risks, missing acceptance criteria, and clarifying how we will know it is done for each story",
          "Writing all test cases for the sprint right there in the meeting",
          "Taking meeting notes for the team",
        ],
        correctAnswer: "Identifying testability risks, missing acceptance criteria, and clarifying how we will know it is done for each story",
        explanation: "QA attends planning to ensure every story is testable. This means ACs are clear, environments are known, and dependencies are flagged before development starts.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m1-q2",
        type: "multiple-choice",
        questionText: "A story has no acceptance criteria during sprint planning. What should the QA do?",
        options: [
          "Accept it — the team can figure it out during development",
          "Flag the gap and ask the product owner to define pass/fail conditions before the team commits to the story",
          "Write the ACs yourself and present them at the end of planning",
          "Skip the story — QA should not touch undefined work",
        ],
        correctAnswer: "Flag the gap and ask the product owner to define pass/fail conditions before the team commits to the story",
        explanation: "Without ACs, there is no definition of done and no basis for testing. The PO owns the ACs. QA's role is to flag the gap, not fill it unilaterally.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m1-q3",
        type: "multiple-choice",
        questionText: "During the sprint review, a stakeholder asks 'Is this feature fully tested?' What is the best response?",
        options: [
          '"Yes, everything is tested and bug-free."',
          '"We have executed all test cases aligned with the acceptance criteria. There is one open low-severity bug that does not block the ACs. Here is a demo of the happy path."',
          '"I need to check with the team first."',
          '"Testing is still in progress so I cannot answer."',
        ],
        correctAnswer: '"We have executed all test cases aligned with the acceptance criteria. There is one open low-severity bug that does not block the ACs. Here is a demo of the happy path."',
        explanation: "The review is about transparency. QA should report what was tested, what is left, and what risks remain — not a binary 'done/not done'.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m1-q4",
        type: "multiple-choice",
        questionText: "What is the QA representative's role in the sprint retrospective?",
        options: [
          "To defend the quality of their testing from criticism",
          "To share what went well in testing, what slowed quality feedback, and one actionable improvement for the next sprint",
          "To assign blame for bugs found late",
          "To read a prepared report on test metrics",
        ],
        correctAnswer: "To share what went well in testing, what slowed quality feedback, and one actionable improvement for the next sprint",
        explanation: "Retro is about continuous improvement, not blame. QA should focus on process friction such as late test environment availability or unclear ACs.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m1-q5",
        type: "multiple-choice",
        questionText: "A developer says 'I finished the feature three days ago but QA only just picked it up.' How should QA respond in the retro?",
        options: [
          '"The developer should have told us earlier."',
          '"The ticket was marked done but had no ACs attached and no test notes. The handoff lacked the info needed to start testing. Let us agree on a handoff checklist."',
          '"Developers should not mark things done without telling QA first."',
          '"That is not my problem — I was busy."',
        ],
        correctAnswer: '"The ticket was marked done but had no ACs attached and no test notes. The handoff lacked the info needed to start testing. Let us agree on a handoff checklist."',
        explanation: "A constructive retro response focuses on the process gap — missing handoff information — not on blame. Proposing a solution (handoff checklist) turns friction into improvement.",
        lessonContext: "",
      },
    ],

    // ── MODULE 2 QUIZ: The QA Role in a Sprint ──────────────────────────────
    "mod-2": [
      {
        questionId: "asqa-m2-q1",
        type: "multiple-choice",
        questionText: "During bug triage, a bug is labelled 'Severity 2 — High.' What does this mean?",
        options: [
          "The bug is cosmetic and can wait",
          "A major feature is broken with no workaround — it should be fixed in the current sprint",
          "The bug only affects the test environment",
          "The bug is a duplicate of an existing issue",
        ],
        correctAnswer: "A major feature is broken with no workaround — it should be fixed in the current sprint",
        explanation: "Severity 2 means a core function is broken with no acceptable workaround. During triage, these bugs are prioritised for the current sprint because they block release.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m2-q2",
        type: "multiple-choice",
        questionText: "Who participates in a bug triage meeting, and what is the outcome?",
        options: [
          "QA only — they decide which bugs to fix",
          "Developers only — they estimate fix effort",
          "QA, the product owner, and a developer representative — they classify severity, priority, and decide which sprint each bug belongs to",
          "The entire company — everyone votes on bug importance",
        ],
        correctAnswer: "QA, the product owner, and a developer representative — they classify severity, priority, and decide which sprint each bug belongs to",
        explanation: "Triage needs QA (severity), PO (priority / business impact), and dev (effort estimate). Together they decide what gets fixed now vs. later.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m2-q3",
        type: "multiple-choice",
        questionText: "A bug exists in the backlog from three sprints ago. No one has prioritised it. What should happen during triage?",
        options: [
          "Delete it — old bugs are irrelevant",
          "Re-evaluate the severity and priority against the current release. If it still matters, assign it. If not, the PO may reject or deprioritise it.",
          "Automatically bump it to the top of the backlog",
          "Leave it — it will get addressed eventually",
        ],
        correctAnswer: "Re-evaluate the severity and priority against the current release. If it still matters, assign it. If not, the PO may reject or deprioritise it.",
        explanation: "Backlog decay is normal. Requirements change, features get rewritten. Triage is the opportunity to clean up old bugs that may no longer be relevant.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m2-q4",
        type: "multiple-choice",
        questionText: "What is the 'Definition of Done' (DoD), and who defines it?",
        options: [
          "A checklist the developer uses before marking a ticket complete — defined by the development team",
          "The team's shared agreement on what 'finished' means: coded, tested, ACs pass, no critical bugs, documentation updated. Defined by the whole team including QA.",
          "A list of test cases that must pass — defined by QA alone",
          "The date the story will be delivered — defined by the project manager",
        ],
        correctAnswer: "The team's shared agreement on what 'finished' means: coded, tested, ACs pass, no critical bugs, documentation updated. Defined by the whole team including QA.",
        explanation: "DoD is a team contract. QA must be part of defining it because QA is responsible for verifying that done means done. Without QA input, DoD may skip testing requirements.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m2-q5",
        type: "multiple-choice",
        questionText: "A developer says 'The feature is done. I tested it locally.' Should QA accept this as complete?",
        options: [
          "Yes — local testing is sufficient for unit-level changes",
          "No — the DoD requires verification against the acceptance criteria in the test environment by QA. Local testing by the developer is a necessary step but not sufficient for done.",
          "Yes, but only if the developer provides screenshots",
          "No — QA must rewrite and retest everything from scratch",
        ],
        correctAnswer: "No — the DoD requires verification against the acceptance criteria in the test environment by QA. Local testing by the developer is a necessary step but not sufficient for done.",
        explanation: "The DoD is a team agreement. Local dev testing is one step, but independent QA verification against ACs in a shared environment is what confirms the story is truly done.",
        lessonContext: "",
      },
    ],

    // ── MODULE 3 QUIZ: Acceptance Criteria in Practice ──────────────────────
    "mod-3": [
      {
        questionId: "asqa-m3-q1",
        type: "multiple-choice",
        questionText: "During a refinement session, the team is discussing a story about a password reset feature. The AC currently says: 'User can reset their password.' What is the problem with this AC?",
        options: [
          "It is too long",
          "It is not testable — it does not specify the trigger, the flow, or the success condition with a pass/fail outcome",
          "It should be written in Gherkin format only",
          "It should include the developer's implementation approach",
        ],
        correctAnswer: "It is not testable — it does not specify the trigger, the flow, or the success condition with a pass/fail outcome",
        explanation: "A good AC must be verifiable with a pass/fail result. 'User can reset password' leaves too many questions unanswered — via email? SMS? What does success look like?",
        lessonContext: "",
      },
      {
        questionId: "asqa-m3-q2",
        type: "multiple-choice",
        questionText: "The team writes this AC: 'Given a user is on the login page, When they click \"Forgot Password\", Then an email is sent to their registered address within 30 seconds.' What makes this AC strong?",
        options: [
          "It uses Given/When/Then format with a specific, measurable outcome",
          "It mentions email which is a common feature",
          "It is short and easy to read",
          "It tells the developer how to implement the feature",
        ],
        correctAnswer: "It uses Given/When/Then format with a specific, measurable outcome",
        explanation: "This AC is strong because it defines a clear precondition (login page), action (click Forgot Password), and a measurable outcome (email sent within 30s).",
        lessonContext: "",
      },
      {
        questionId: "asqa-m3-q3",
        type: "multiple-choice",
        questionText: "You are demo-ing a story against its ACs. The feature works on the happy path but fails on an edge case the ACs did not mention. What do you say in the demo?",
        options: [
          '"The feature is broken — I found an edge case that fails."',
          '"All defined ACs pass. I also identified an edge case not covered by the current ACs. I recommend updating the ACs to include it."',
          '"I will not demo until the edge case is fixed."',
          '"The ACs are wrong — I am rejecting this story."',
        ],
        correctAnswer: '"All defined ACs pass. I also identified an edge case not covered by the current ACs. I recommend updating the ACs to include it."',
        explanation: "Demo is against ACs, not against every possible scenario. QA should celebrate what passes while constructively flagging gaps.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m3-q4",
        type: "multiple-choice",
        questionText: "A developer asks you to help write ACs for a user story during refinement. What is your role?",
        options: [
          "Write the ACs yourself and hand them to the PO",
          "Ask probing questions about edge cases, error states, and user roles to help the PO write specific, testable ACs — QA does not own the ACs but helps shape them",
          "Tell the developer to figure it out — ACs are not QA's job",
          "Write ACs based on what you think the feature should do",
        ],
        correctAnswer: "Ask probing questions about edge cases, error states, and user roles to help the PO write specific, testable ACs — QA does not own the ACs but helps shape them",
        explanation: "QA's testing mindset is invaluable during AC writing. QA should ask 'What if...?' questions (empty state, permission denied, network timeout) that the PO may not have considered.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m3-q5",
        type: "multiple-choice",
        questionText: "After demo, the PO says 'The feature works but the button colour is slightly off from the mockup.' The ACs only cover functional behaviour. What should QA do?",
        options: [
          "File a bug for the colour mismatch",
          "Acknowledge the observation and suggest adding a visual QA step to the ACs or DoD if pixel-perfect UI matters — but since it is not in the ACs, it is not a bug against this story",
          "Immediately fix the colour in the demo environment",
          "Tell the PO that colour is not important",
        ],
        correctAnswer: "Acknowledge the observation and suggest adding a visual QA step to the ACs or DoD if pixel-perfect UI matters — but since it is not in the ACs, it is not a bug against this story",
        explanation: "Without a visual AC, a colour mismatch is a preference, not a defect. QA should note it and drive a conversation about adding visual checks.",
        lessonContext: "",
      },
    ],

    // ── MODULE 4 QUIZ: Agile Testing Mindset ────────────────────────────────
    "mod-4": [
      {
        questionId: "asqa-m4-q1",
        type: "multiple-choice",
        questionText: "What does 'shift left' mean in agile testing?",
        options: [
          "Pushing all testing to the end of the sprint so developers have more time to code",
          "Moving testing activities earlier in the development lifecycle — involving QA in refinement, design, and development before code reaches the test environment",
          "Reducing the number of test cases to fit the timeline",
          "Automating all tests immediately",
        ],
        correctAnswer: "Moving testing activities earlier in the development lifecycle — involving QA in refinement, design, and development before code reaches the test environment",
        explanation: "Shift left means catching defects when they are cheapest to fix — during design and development, not after.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q2",
        type: "multiple-choice",
        questionText: "A developer asks you to review their code changes before they merge. As a QA practicing shift left, what should you focus on?",
        options: [
          "Checking for syntax errors in the code",
          "Looking at the logic from a testing perspective and suggesting test scenarios",
          "Approving the merge so testing can begin earlier",
          "Rewriting the code to be more testable",
        ],
        correctAnswer: "Looking at the logic from a testing perspective and suggesting test scenarios",
        explanation: "QA code review is about testability and risk, not code style. Spotting an unhandled null case in the PR means a bug never reaches the test environment.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q3",
        type: "multiple-choice",
        questionText: "You find a critical bug on day one of a two-week sprint. What is the best approach?",
        options: [
          "Keep it to yourself until the feature is fully built — testing is not done yet",
          "Surface it immediately to the developer and the team. Early bugs are cheapest to fix.",
          "Wait until the sprint review to reveal it",
          "Log it in the backlog and move on — someone will get to it eventually",
        ],
        correctAnswer: "Surface it immediately to the developer and the team. Early bugs are cheapest to fix.",
        explanation: "Shift left also means shifting communication left. The earlier you share a finding, the less rework is needed.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q4",
        type: "multiple-choice",
        questionText: "What is 'continuous feedback' in the QA context?",
        options: [
          "Sending a long email at the end of the sprint with all your findings",
          "Providing small, frequent, actionable feedback to developers throughout the sprint — as soon as you see something worth sharing",
          "Only giving feedback when asked",
          "Filing a bug report for every single observation no matter how small",
        ],
        correctAnswer: "Providing small, frequent, actionable feedback to developers throughout the sprint — as soon as you see something worth sharing",
        explanation: "Continuous feedback means QA does not wait for the 'testing phase.' If you see a minor issue on day two, tell the developer immediately.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q5",
        type: "multiple-choice",
        questionText: "A developer says 'Just log a bug and I will fix it later.' The bug is a minor label typo. What should you do?",
        options: [
          "Log the bug — follow the process",
          "Tell them now informally so it is fixed immediately, then decide whether a formal bug ticket is needed",
          "Ignore it — a typo is not worth anyone's time",
          "Wait until the sprint review and mention it publicly",
        ],
        correctAnswer: "Tell them now informally so it is fixed immediately, then decide whether a formal bug ticket is needed",
        explanation: "Continuous feedback is about speed. An informal heads-up gets the typo fixed in seconds. A formal bug ticket might take longer than the fix itself.",
        lessonContext: "",
      },
    ],
  },
};

// ── SECTION 1: DEFAULT CONTENT ────────────────────────────────────────────────

const DEFAULT_CONTENT = {
  fieldLabels: {
    caseTitle: "Case Title",
    status: "Status",
    priority: "Priority",
    dateOpened: "Date Opened",
    investigationNotes: "Investigation Notes",
    escalated: "Escalated",
    escalationReason: "Escalation Reason",
    outcome: "Outcome / Resolution",
    assignedTo: "Assigned To",
  },
  dropdownOptions: {
    status: ["Open", "In Progress", "Pending Review", "Resolved", "Closed"],
    priority: ["Critical", "High", "Medium", "Low"],
    escalationReason: ["Policy Breach", "Senior Review Required", "Client Complaint", "Regulatory"],
  },
  validationMessages: {
    caseTitleRequired: "Case title is required.",
    caseTitleMaxLength: "Case title cannot exceed 120 characters.",
    dateOpenedRequired: "Date opened is required.",
    dateOpenedFuture: "Date opened cannot be a future date.",
    escalationReasonRequired: "Escalation reason is required when a case is marked as escalated.",
    outcomeRequired: "Outcome is required before a case can be marked as Resolved or Closed.",
    juniorCannotClose: "You do not have permission to resolve or close cases.",
    assignedToNotFound: "No investigators found.",
  },
  toastMessages: {
    caseSaved: "Case saved successfully.",
    autoSaved: "Saved",
  },
  sidebarLabels: {
    caseId: "Case ID",
    assignedTo: "Assigned To",
    role: "Role",
    dateOpened: "Date Opened",
    lastUpdated: "Last Updated",
    status: "Status",
    timeline: "Timeline",
  },
  roleNames: {
    senior: "Senior Investigator",
    junior: "Junior Investigator",
  },
  topbarLogo: {
    // Custom SVG mark displayed next to the brand name in the portal topbar.
    // Set to null to hide it entirely, or override with a company logo SVG.
    // The default is the Canada maple leaf (removed in May 2026 client review).
    svg: null,
    title: "",
    ariaLabel: "",
  },
  certificate: {
    issuingOrgName: "QA Pilot Academy",
    issuerName: "Agile Testing Team",
    congratsEmail: `Subject: Congratulations on Completing the QA Onboarding Training

Dear [STUDENT NAME],

We are pleased to confirm that you have successfully completed all required
lessons and assessments in the [COURSE NAME].

Your certificate of completion is attached to this email.

This achievement reflects your commitment to quality and your readiness to
contribute to the team's testing practice. We look forward to working with you.

Congratulations and welcome to the team.

[Issuing Manager Name]
[ISSUER NAME]`,
  },
  courseMetadata: {
    courseName: "QA Onboarding Training",
    lessons: [
      { id: "lesson-1", title: "Testing 101",            type: "true-false" },
      { id: "lesson-2", title: "Acceptance Criteria",    type: "multiple-choice" },
      { id: "lesson-3", title: "Dynamics 365 CRM",       type: "multiple-choice" },
      { id: "lesson-4", title: "Azure DevOps",           type: "scenario" },
      { id: "lesson-5", title: "Test Planning & Triage", type: "multiple-choice" },
      { id: "capstone", title: "Capstone Assessment",    type: "capstone" },
    ],
  },
};

// ── SECTION 2: CONTENT LOADER ─────────────────────────────────────────────────

function loadContent() {
  const saved = localStorage.getItem('qa_content');
  if (!saved) return DEFAULT_CONTENT;
  try {
    const parsed = JSON.parse(saved);
    return deepMerge(DEFAULT_CONTENT, parsed);
  } catch (error) {
    return DEFAULT_CONTENT;
  }
}

function saveContent(contentObject) {
  try {
    localStorage.setItem('qa_content', JSON.stringify(contentObject));
    return true;
  } catch (error) { return false; }
}

function resetContent() {
  localStorage.removeItem('qa_content');
}

// ── SECTION 3: UTILITIES ──────────────────────────────────────────────────────

function deepMerge(target, source) {
  const result = Object.assign({}, target);
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key]) && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}
