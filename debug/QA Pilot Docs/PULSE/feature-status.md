# PULSE — Feature Status
*Health monitor for verified feature states*

---

## Session May 27 — Debug Sprint: Course Quiz Questions + Capstone Fix + UI Cleanup

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Capstone scenario script path | ✅ FIXED | 2026-05-27 | `capstone-2.html` script src changed from `desktop/scenarios/capstone-scenario-2.js` to `scenarios/capstone-scenario-2.js`. File exists at root level, not in desktop/. |
| Course quizzes: dynamics-crm-basics | ✅ ADDED | 2026-05-27 | 15 questions (5 per module) added to COURSE_QUIZZES. Covers case form, case data, and BPF topics. |
| Course quizzes: ado-bug-reports | ✅ ADDED | 2026-05-27 | 15 questions (5 per module) added to COURSE_QUIZZES. Covers bug anatomy, repro steps, severity/priority. |
| Course quizzes: acceptance-criteria-basics | ✅ ADDED | 2026-05-27 | 15 questions (5 per module) added to COURSE_QUIZZES. Covers AC basics, Given/When/Then, traceability. |
| Course quizzes: teams-for-qa | ✅ ADDED | 2026-05-27 | 10 questions (5 per module) added to COURSE_QUIZZES. Covers Teams navigation and stand-up communication. |
| Course quizzes: agile-scrum-qa | ✅ ADDED | 2026-05-27 | 20 questions (5 per module across 4 modules) added to COURSE_QUIZZES. Covers ceremonies, QA role, AC practice, testing mindset. |
| Redundant "Already completed" text removed | ✅ REMOVED | 2026-05-27 | Removed from QA Onboarding capstone overview and QA Advanced capstone overview (content.js). "Complete Course →" button remains as sole action. |
| Build regenerated | ✅ BUILT | 2026-05-27 | `node build.js` passed. capstone-2.html getOSContent synced. |
| Syntax verification | ✅ PASSED | 2026-05-27 | All modified JS files pass `node --check`: content.js, quiz-questions.js, course-view.html, db.js, app.js, clippy-guide.js, os-core.js |

---

## Session May 26 — Setup File Removed from Main Login + Toggle to Simple Login

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Setup file upload section removed from `index.html` | ✅ REMOVED | 2026-05-26 | Entire `#setup-file-section` (upload area, class email lookup) removed. Flow lives in `simple-login.html`. |
| "Have a setup file?" footer link replaced | ✅ CHANGED | 2026-05-26 | Now links to `simple-login.html` as "Team login (class file)" |
| Team Login toggle below demo button | ✅ ADDED | 2026-05-26 | "📁 Using a class file? Use Team Login →" link styled as dashed card |
| Dead JS code cleaned up | ✅ REMOVED | 2026-05-26 | ~279 lines removed: `maybeShowSetupFileSection`, `toggleSetupFileSection`, `handleSetupFileLoad`, `submitClassEmailLookup`, `processSetupFile`, `showSetupStatus`, `_pendingClassData` |
| Build regenerated | ✅ BUILT | 2026-05-26 | `node build.js` passed |

## Sprint 1 — Auth & Security (Session May 26)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `firstLogin` auto-prompt in portal.html | ✅ ADDED | 2026-05-26 | `checkFirstLogin()` shows password panel when `student.firstLogin === true`. Flag cleared after successful password change in `changePassword()`. |
| First-login welcome message | ✅ ADDED | 2026-05-26 | Custom hint text: "Welcome! Please set a new password to continue. Your current password was set by your instructor." |

## Sprint 0 — v2.0 Class File E2E Enrollment Flow (Session May 26)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| v2.0 Class File generation | ✅ VERIFIED | 2026-05-26 | Cohort-filtered class file generates valid JSON with correct format |
| v2.0 Class File upload (index.html) | ✅ VERIFIED | 2026-05-26 | `handleSetupFileLoad()` detects v2.0, shows email lookup panel |
| Email lookup + auto-login | ✅ VERIFIED | 2026-05-26 | `submitClassEmailLookup()` finds student by email, `processSetupFile()` detects existing student, auto-logs in — no duplicate created |
| Portal enrollment + module completion | ✅ VERIFIED | 2026-05-26 | Enrolled in `acceptance-criteria-basics`, completed Module 1 Overview, progress saved to IndexedDB |
| Admin dashboard shows progress | ✅ VERIFIED | 2026-05-26 | CASE-00001 shows 1% progress (1 of 14 sub-modules complete) |
| Student data export (portal) | ✅ VERIFIED | 2026-05-26 | "Download Student Data" triggers Blob download |
| Existing student detection on class file upload | ✅ VERIFIED | 2026-05-26 | `findStudentByEmail()` prevents duplicate accounts |

## Session May 26 — case-001 Polyfill + Student Walkthrough + Release Prep

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| case-001 `crmState` (CASE-00042, Maria Santos, Westfield Retail) | ✅ ADDED | 2026-05-26 | Full CRM state with 2 embedded bugs: `priority-too-low`, `resolved-without-resolution` |
| case-001 `acceptanceCriteria` + `acRefs` | ✅ ADDED | 2026-05-26 | AC-1.1 (priority), AC-2.1 (resolution required) with refs in expectedBugs |
| case-001 `qoutlookEmails` (2 emails) | ✅ ADDED | 2026-05-26 | Elyse Handley (subject: CASE-00042 escalation) + D365 system notification |
| case-001 `teamsThread` (3 messages) | ✅ ADDED | 2026-05-26 | Elyse initiating, Sam responding, Elyse follow-up |
| case-001 `trainingMeta` + `trainingSteps` (6 steps) | ✅ ADDED | 2026-05-26 | Guided walkthrough: Overview → CRM → QOutlook → Teams → AC Panel → File Bug |
| Student Getting Started walkthrough — 3-step wizard | ✅ ADDED | 2026-05-26 | Welcome → How Courses Work → Completing Training; auto-shows on first portal visit |
| `maybeShowStudentWizard()` wired into init chain | ✅ ADDED | 2026-05-26 | Called after `checkFirstLogin()` in portal.html init chain |
| "Getting Started" option in user dropdown | ✅ ADDED | 2026-05-26 | Re-openable anytime from user menu via `openStudentWizard()` |
| Walkthrough tracked by `studentWalkthroughDone` setting | ✅ ADDED | 2026-05-26 | Separate flag from `firstLogin` — password prompt and walkthrough are independent |

## New Courses + Product Enhancements (Session May 25)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Course: Introduction to Dynamics CRM | ✅ ADDED | 2026-05-25 | `dynamics-crm-basics` — 3 modules, 14 sub-modules (portal-ready) |
| Course: Azure DevOps Bug Reports | ✅ ADDED | 2026-05-25 | `ado-bug-reports` — 3 modules, 13 sub-modules (portal-ready) |
| Course: Acceptance Criteria Fundamentals | ✅ ADDED | 2026-05-25 | `acceptance-criteria-basics` — 3 modules, 13 sub-modules (portal-ready) |
| QOutlook email search | ✅ ADDED | 2026-05-25 | Search input filters by sender/subject/body; Escape clears |
| Toast notifications for BUG_FOUND | ✅ ENHANCED | 2026-05-25 | OS shows system-style toast on bug detection |
| Toast notifications for BUG_LOGGED | ✅ ENHANCED | 2026-05-25 | OS shows system-style toast on bug submission |

---

## Sprint B — All Features Implemented (Session May 25)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| F1: Critical priority option in Dynamics | ✅ ADDED | 2026-05-25 | "1 - Critical" added as first option in d365-priority select |
| F2: Owner field in Dynamics | ✅ ADDED | 2026-05-25 | d365-owner input added to form, validated on save |
| BUG-T1: Scenario activation on training start | ✅ FIXED | 2026-05-25 | OS.setActiveScenarioId() called from beginScenario() |
| BUG-T2: Fresh workspace on scenario start | ✅ FIXED | 2026-05-25 | beginScenario() closes dynamics/ado/teams/ac/browser before starting |
| BUG-T3: resolveRelativeDate helper | ✅ FIXED | 2026-05-25 | Handles +Nd and -Nd relative date strings in Dynamics |
| BUG-T4: QOutlook scenario emails | ✅ ADDED | 2026-05-25 | qoutlookEmails added to case-002 and case-003; buildScenarioEmails() reads both scenarios and Capstone 2 stages |
| F3: ADO filed bugs sidebar | ✅ ENHANCED | 2026-05-25 | Collapsible panel with sessionStorage persistence; toggle state restored across sessions |
| F4: Teams acknowledge button | ✅ ADDED | 2026-05-25 | Acknowledge button support on kickoff messages in createMessageElement() |
| F6: AC Panel violation highlight | ✅ ADDED | 2026-05-25 | BUG_FOUND with acRef triggers AC_VIOLATED broadcast; matching criteria highlighted in yellow |
| F7: Teams scripted QA Lead replies | ✅ ADDED | 2026-05-25 | 6 keyword→response rules; Sarah Chen replies with 1.2s delay; student message shown in channel |
| F8: QOutlook scenario emails | ✅ ADDED | 2026-05-25 | Same as BUG-T4 — full implementation |
| F9: BPF interactive | ✅ VERIFIED | 2026-05-25 | Already implemented in Dynamics; stage indicators + navigation |
| F10: ADO student name | ✅ ADDED | 2026-05-25 | Student name from APP_BOOT populates ADO Assigned To |
| F11: Clip reacts to BUG_FOUND | ✅ ADDED | 2026-05-25 | Per-bugId encouragement messages; OS posts BUG_FOUND to parent; Clip listens |
| F12: Dynamics save confirmation | ✅ ADDED | 2026-05-25 | Save button shows green "✓ Saved" feedback for 2s; timeline auto-adds entry |
| F13: Training scenario brief overlay | ✅ ADDED | 2026-05-25 | Overlay with scenario title/body shown before steps; "Start" button begins workflow |
| F14: Training "Open →" chips | ✅ ADDED | 2026-05-25 | App name regex detection in step body; chips call OS.openApp() |
| F15: Clip Start Over button | ✅ ADDED | 2026-05-25 | ↺ button in bubble footer; double-click confirmation within 5s; calls resetOS() |
| F16: AC Panel search | ✅ ADDED | 2026-05-25 | Live search input filters criteria list; Escape clears |
| F17: QOutlook unread badge | ✅ ADDED | 2026-05-25 | Red badge on taskbar icon; updates live via postMessage from QOutlook |

---

## Session May 25 (Session 5) — Clip Timing Fix + Stale Window Clear

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `src/os-core.js` — OS_UNLOCKED postMessage | ✅ IN SOURCE | 2026-05-25 | `unlock()` posts `{ type: "OS_UNLOCKED" }` to window.parent when lock screen is dismissed |
| `desktop/dist.html` — rebuild | ⚠️ PENDING | 2026-05-25 | **Must run `node build.js`** — os-core change not live until rebuild |
| capstone-lab.html — OS_UNLOCKED listener | ✅ WIRED | 2026-05-25 | Split iframe load (spinner only) + OS_UNLOCKED message triggers runIntro; introFired guard prevents double-fire |
| capstone-lab.html — stale window clear | ✅ ADDED | 2026-05-25 | `localStorage.removeItem('qaSimulatorDesktop')` before iframe.src set |
| capstone-2.html — OS_UNLOCKED listener | ✅ WIRED | 2026-05-25 | Same split pattern; introFired guard in place; uses `__capstoneStudentInfo.name` |
| capstone-2.html — stale window clear | ✅ ADDED | 2026-05-25 | `localStorage.removeItem('qaSimulatorDesktop')` before container.appendChild(iframe) |

---

## Session May 25 (Session 4) — Clip Guided Intro + Structured Step Tips

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `ClippyGuide.runIntro(opts)` | ✅ ADDED | 2026-05-25 | Multi-step guided intro: overlay, Clip at centre, named positions per step, "Let's go!" finish, auto-starts tips after settling home |
| `ClippyGuide.moveTo(position)` | ✅ ADDED | 2026-05-25 | Animates Clip to 7 named positions: home, center, top-left/right, taskbar-left/mid/right |
| `ClippyGuide.goHome()` | ✅ ADDED | 2026-05-25 | Shortcut for moveTo('home') |
| `ClippyGuide.getBugCount()` | ✅ ADDED | 2026-05-25 | Returns count of BUG_LOGGED postMessage events received this session |
| `ClippyGuide.resetBugCount()` | ✅ ADDED | 2026-05-25 | Resets counter (for capstone retry flows) |
| Intro overlay backdrop | ✅ ADDED | 2026-05-25 | rgba(15,23,42,0.72) fixed overlay, z-index 99998, fade-in/out animation, blocks OS interaction during intro |
| `expectedBugs` init option | ✅ ADDED | 2026-05-25 | Set to N in init(); triggers pre-submit warning if bugCount < N |
| Pre-submit warning + override | ✅ ADDED | 2026-05-25 | Shows custom warning message; re-enables "⚠️ Submit Anyway" after 3s for student override |
| Auto bug counting (BUG_LOGGED) | ✅ ADDED | 2026-05-25 | `_listenForOSEvents` now auto-increments bugCount on every BUG_LOGGED event |
| Intro prev/close button hide | ✅ ADDED | 2026-05-25 | Prev and Close buttons hidden during intro, restored on complete |
| capstone-lab.html — structured tips | ✅ REWRITTEN | 2026-05-25 | 6 numbered step tips (Teams → Dynamics → AC Panel → Roles → ADO → Submit) replacing generic hints |
| capstone-lab.html — intro wired | ✅ WIRED | 2026-05-25 | `runIntro({ steps: [...6 steps...], onComplete: enableSubmit })` in iframe load handler |
| capstone-lab.html — expectedBugs: 4 | ✅ SET | 2026-05-25 | Clip warns before submit if fewer than 4 bugs filed |
| capstone-lab.html — BUG_LOGGED reaction | ✅ ADDED | 2026-05-25 | Shows running count "2 of 4 bugs filed" style messages |
| capstone-2.html — structured tips | ✅ REWRITTEN | 2026-05-25 | 6 numbered step tips mapped to 6-stage flow (QOutlook → Teams → ADO review → Test → File bugs → Standup/Review) |
| capstone-2.html — intro wired | ✅ WIRED | 2026-05-25 | `runIntro({ steps: [...6 steps...], onComplete: enableSubmit })` using `__capstoneStudentInfo.name` |
| capstone-2.html — expectedBugs: 3 | ✅ SET | 2026-05-25 | Clip warns before submit if fewer than 3 bugs filed |
| capstone-2.html — BUG_LOGGED reaction | ✅ ADDED | 2026-05-25 | Shows running count "2 of 3 bugs documented" style messages |

---

## Session May 25 (Session 3) — ClippyGuide: The Paperclip Assistant

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `js/clippy-guide.js` | ✅ BUILT | 2026-05-25 | ~450 lines. SVG paperclip avatar, speech bubble, typewriter, tip navigation, submit button, CSS auto-injection, OS event reactions, pointing animation |
| Clip timing (loading screen) | ✅ FIXED | 2026-05-25 | `autoStart: false` — Clip waits for OS iframe `load` event, then `start()` + `enableSubmit()` |
| Submit button visibility | ✅ FIXED | 2026-05-25 | `enableSubmit()` only sets flag (not display). Button shown only by `_showSubmitPrompt()` at end of tips |
| Submit button footer position | ✅ FIXED | 2026-05-25 | `appendChild` — order: counter → nav buttons → submit button (last). Button is `width:100%` on its own row |
| Avatar click toggle | ✅ FIXED | 2026-05-25 | When bubble hidden → show it. When visible → advance to next tip |
| Clip sizing | ✅ ENLARGED | 2026-05-25 | Desktop: avatar 100px, bubble 400px. Mobile (<640px): avatar 80px, bubble 320px |
| Idle animation | ✅ ENHANCED | 2026-05-25 | Gentle sway rotation (±0.6deg) across 5 keyframes, 3.5s cycle |
| Pointing arm | ✅ ADDED | 2026-05-25 | SVG arm + arrow extends from paperclip toward bubble on each tip/submit-prompt. 1.2s pop animation |
| Eye blink animation | ✅ PRESENT | 2026-05-25 | Pupils scale to 15% height every 4.2s |
| `resetOS()` method | ✅ ADDED | 2026-05-25 | Clears localStorage + deletes `qa_onboarding_db` IndexedDB, then reloads |
| `OS_NOTIFICATION` forwarding in os-core.js | ✅ ADDED | 2026-05-25 | `addNotification()` posts `{ type: "OS_NOTIFICATION", text }` to `window.parent` |
| `ClippyGuide.say()` method | ✅ ADDED | 2026-05-25 | One-off announcement messages for OS event reactions |
| `ClippyGuide.start()` method | ✅ ADDED | 2026-05-25 | Delayed activation — shows guide + first tip (used instead of autoStart) |
| capstone-lab.html ClippyGuide integration | ✅ WIRED | 2026-05-25 | Init with 7 tips, OS event reactions, onSubmit triggers OS `#qa-submit-btn` |
| capstone-2.html ClippyGuide integration | ✅ WIRED | 2026-05-25 | Init with capstone-2 tips, OS event reactions, same submit pattern |
| desktop/dist.html OS_NOTIFICATION forwarding | ✅ REBUILT | 2026-05-25 | `node build.js` regenerated from updated src/os-core.js |

---

## Session May 22 (Session 2) — Login Fix + V1 Release Plan

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| db.js login crash | ✅ FIXED | 2026-05-22 | Orphaned duplicate block (lines 390–398) outside `saveChapterRead()` caused syntax error — db.js never loaded, all logins broken. Removed duplicate. |
| Student login (index.html) | ✅ WORKING | 2026-05-22 | Restored after db.js fix |
| Admin login (admin/index.html) | ✅ WORKING | 2026-05-22 | Restored after db.js fix. Default password: `QAAdmin2026` |
| V1 Release Build Plan | ✅ CREATED | 2026-05-22 | `QA Pilot Release v1_0 Build Plan.md` in Open Work root. 14-step bash script for local AI. Excludes build tools, git, dev docs, legacy data. |

---

## Session May 22 — QA Debugger (ADO-Style Bug Reporter) — Full Build

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| qa-db.js syntax error (extra `)` line 169) | ✅ FIXED | 2026-05-22 | `tx.onabort` callback had extra `)` — crashed entire DB layer at runtime |
| qa-workitem-api.js validateWorkItem schema | ✅ FIXED | 2026-05-22 | Called non-existent `'WorkItemSchema'`; replaced with inline validation |
| qa-import-json.js importPayload .then() on sync | ✅ FIXED | 2026-05-22 | `validatePayload()` is synchronous — restructured to call sync first, then build promise chain |
| qa-import-json.js _importSessions wrong methods | ✅ FIXED | 2026-05-22 | `updateSession()`/`createSession()` don't exist — replaced with `registerSession()` (upsert) |
| debug/debug.css | ✅ BUILT | 2026-05-22 | ~420 lines. ADO-inspired, all `qd-` prefixed. Type icons, state badges, priority badges, panel, kanban, modals, toast |
| debug/debug.js | ✅ BUILT | 2026-05-22 | ~290 lines. `window.QD` namespace, initDB, refresh, renderWorkItemsList, openDetail, showView, wireNavigation, showToast |
| debug/debug-panel.js | ✅ BUILT | 2026-05-22 | ~380 lines. `QD_PANEL.open/close/refresh`. 4 tabs: Details, Discussion, Links, Acceptance Criteria. saveDetails, applyStateChange |
| debug/debug-filters.js | ✅ BUILT | 2026-05-22 | ~270 lines. Live search + checkbox filters (State/Type) + text filters (Area/Assigned). Filter count badge, in-memory rerender |
| debug/debug-board.js | ✅ BUILT | 2026-05-22 | ~160 lines. `QD_BOARD.render(items)`. 4 kanban columns with count badges, clickable cards |
| debug/debug-import-export.js | ✅ BUILT | 2026-05-22 | ~490 lines. `QD_IE` modal methods + `QD_QUERIES_UI`. New item, import JSON, export JSON/MD, queries view |
| QA-Pilot-Session.html launcher | ✅ BUILT | 2026-05-22 | Opens QA Pilot + Debugger in separate tabs via dual `window.open()` in one click handler. Popup-block detection + fallback buttons |

---

## Session May 22 — Per-Student Bug Lab (Redesign)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Bug Lab tab removed from admin nav | ✅ REMOVED | 2026-05-22 | Global bug lab tab replaced with per-student Bug Config button |
| Per-student Bug Config modal | ✅ ADDED | 2026-05-22 | "Bug Config" button in student detail actions (both multi-course and legacy views). Modal shows 8 bugs from BUG_DEFINITIONS with toggle checkboxes. |
| Bug config saved to student record | ✅ ADDED | 2026-05-22 | `student.bugs` array saved to IndexedDB student record via `saveStudent()` |
| BUG_MAP: admin IDs → semantic keys | ✅ ADDED | 2026-05-22 | `window.BUG_MAP` in `data/bug-keys.js` maps BUG-01–BUG-08 to semantic keys (e.g. `'status-junior-close'`) |
| getBugToggles(caseId) per-student | ✅ FIXED | 2026-05-22 | `js/db.js` `getBugToggles()` accepts optional caseId, reads student.bugs, translates via BUG_MAP to semantic key array |
| Semantic key merge logic fixed | ✅ FIXED | 2026-05-22 | Previously `Object.keys(array)` returned index strings (`"0"`, `"1"`) instead of bug IDs. Now returns semantic key strings directly. |
| os-core.js passes caseId to getBugToggles | ✅ FIXED | 2026-05-22 | Calls `getBugToggles(session.caseId)` for per-student bug loading |
| capstone-2.html passes caseId | ✅ FIXED | 2026-05-22 | Same fix — passes `session.caseId` to `getBugToggles()` |
| BUG-01 (Outcome visible) Dynamics check | ✅ ADDED | 2026-05-22 | `outcome-resolution-visible-junior` key; `applyRole()` shows resolution fields for junior when active |
| BUG-02 (Outcome editable) Dynamics check | ✅ ADDED | 2026-05-22 | `outcome-resolution-editable-junior` key; `applyRole()` makes fields editable for junior when active |
| BUG-05 (Blank title) Dynamics check | ✅ ADDED | 2026-05-22 | `case-title-blank-allowed` key; `validate()` skips title required check when active |
| BUG-06 (Resolved no outcome) Dynamics check | ✅ ADDED | 2026-05-22 | `resolved-without-outcome` key; `validate()` allows empty resolution on Resolved when active |
| BUG-03, BUG-04, BUG-08 existing keys | ✅ MAPPED | 2026-05-22 | Already used by Dynamics: `future-date-allowed`, `escalation-reason-blank`, `status-junior-close` |
| BUG-07 (Timestamp stale) mapped | ✅ MAPPED | 2026-05-22 | `last-updated-stale` key defined; no timestamp display element in current Dynamics UI |
| Build system | ✅ PASSES | 2026-05-22 | `node build.js` regenerates QASimulator.html, os.bundle.js, desktop/dist.html, capstone-2.html. `node --check` passes on all JS files. |

## Session May 20 (Batch 3) — Sprint Kick: Dashboard Refresh, Skippable Capstone, Overviews, Certs

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Dashboard data refresh | ✅ ADDED | 2026-05-20 | "Refresh" button in controls bar + auto-refresh on Students tab switch. `refreshStudentData()` re-fetches all IndexedDB data and re-renders table. |
| Capstone 1 intro skippable | ✅ ADDED | 2026-05-20 | "Skip Intro →" button at top of landing page. `?autoLaunch=true` URL param bypasses landing entirely. course-view iframe uses `autoLaunch=true`. |
| QA Advanced module overviews | ✅ ADDED | 2026-05-20 | `mod-1-overview`, `mod-2-overview`, `mod-3-overview` added to qa-onboarding-advanced. Full COURSE_CONTENT entries for each. |
| Agile & Scrum module overviews | ✅ ADDED | 2026-05-20 | `mod-1-overview` through `mod-9-overview` added to agile-scrum-dev. Full COURSE_CONTENT entries for all 9 modules. |
| QA Advanced certificate on completion | ✅ FIXED | 2026-05-20 | `markCurrentComplete()` now awards `awardCourseCertificate()` + navigates to `certificate.html?course=...&confetti=true` when last sub-module of last module is marked complete. |
| Certificate param name in capstone-2 | ✅ FIXED | 2026-05-20 | Changed `?courseId=capstone-2` → `?course=capstone-2` in bypass and scoring result links. |
| Export student data caseId | ✅ FIXED | 2026-05-20 | `getProgress()` → `getProgress(currentSession.caseId)` in `exportStudentData()`. |
| Download button relabel | ✅ FIXED | 2026-05-20 | "Download Here" → "Download Student Data" in topbar and dropdown menu. |

## Session May 20 (Batch 2) — Training Resume, Module Overviews, Portal Fix, Capstone 2 Bypass

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Portal 0% progress for legacy courses | ✅ FIXED | 2026-05-20 | `calculateCourseProgress()` legacy path now checks BOTH `progress.courses[courseId].subModulesComplete` (new-style) AND `progress.lessonsComplete` (old-style). Students using course-view for QA Onboarding get correct progress. |
| Training module resume at last position | ✅ FIXED | 2026-05-20 | `openSubModule()` now saves `currentSubModule` to course progress in IndexedDB. `autoSelectSubModule()` reads it on session start to resume. Excludes quiz/final-exam types. |
| Module Overview screens at module start | ✅ ADDED | 2026-05-20 | Added overview sub-modules (order: 0, `subModuleId: 'mod-N-overview'`) to all 6 modules of qa-onboarding in content.js. Dynamic content in COURSE_CONTENT explains each module's purpose, learning objectives, and how it fits into the course. Includes `.cv-module-overview` CSS in course-view.html. |
| Capstone Assessment landing page density | ✅ IMPROVED | 2026-05-20 | Reduced padding (40→24px), title size (32→26px), card padding (24→16px), path step padding (14→8px), launch button padding (16→12px), margins throughout. Maintains same visual hierarchy with less scrolling. |
| Capstone 2 info screen matching Capstone 1 style | ✅ UPDATED | 2026-05-20 | Replaced minimalist briefing card with richer layout: badge header, mission card with icon, numbered task steps (blue check circles), compact metrics row (target/pass mark/time), gradient launch button with 🚀 icon |
| Capstone 2 Mark Complete bypass button | ✅ ADDED | 2026-05-20 | "Mark Assessment Complete (bypass)" button on intro screen + results overlay (non-passing state). Calls `markCapstone2Complete()` which saves bypass record to IndexedDB, calls `awardCourseCertificate()`, shows audit results overlay, notifies parent via MARK_MODULE_COMPLETE. |
| Capstone 2 bypass in results overlay | ✅ ADDED | 2026-05-20 | Non-passing results overlay now includes a "Mark Assessment Complete (bypass)" button for failed capstones. |
| Admin alert for bypass events | ✅ ADDED | 2026-05-20 | Bypass events stored as `progress.courses[courseId].bypassed = true` + `bypassDate` timestamp. Admin dashboard student detail view shows amber "⚠️ Assessment Bypassed" badge with date in both per-course and legacy detail views. MARK_MODULE_COMPLETE message now includes `bypassed: true/false` flag. |

---

## Final Pre-Deployment (Session May 20) — Walk-Through & Debug ✅

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Course layout (portal.html) | ✅ FIXED | 2026-05-20 | 2-column grid: QA1/QA2 left, Capstone2/Agile right |
| Download button (portal.html) | ✅ ADDED | 2026-05-20 | ⭐ "Download Here" in topbar; `exportStudentData()` function |
| CSV export (portal + dashboard) | ✅ FIXED | 2026-05-20 | Fixed DOM append/remove pattern; bulk export + filtered export working |
| Reset All Students (dashboard) | ✅ ADDED | 2026-05-20 | Button with triple-confirmation; clears all IndexedDB stores |
| Settings tab layout (dashboard) | ✅ REORGANIZED | 2026-05-20 | 2-column grid; compact cards; reduced scrolling |
| Demo account creation | ✅ FIXED | 2026-05-20 | Email-based detection (demo@qapilot.com); `isDemoAccount()` working |
| Demo course filtering | ✅ FIXED | 2026-05-20 | 'first-only' and 'grey-out' modes; filtering after grouping/sorting |
| Demo account reset on logout | ✅ FIXED | 2026-05-20 | Full reset (clear enrollment + progress) or progress-only reset working |
| `resetDemoAccountIfNeeded()` | ✅ VERIFIED | 2026-05-20 | `progress.caseId` set explicitly; `saveProgress(progress)` with 1 param |
| Logout button (portal topbar) | ✅ ADDED | 2026-05-20 | 🚪 "Sign Out" red button in topbar; also in user dropdown |
| `handleLogout()` async function | ✅ IMPLEMENTED | 2026-05-20 | Calls `isDemoAccount()` + `resetDemoAccountIfNeeded()` before `endSession()` |
| Logout delay for debug capture | ✅ ADDED | 2026-05-20 | 5000ms timeout before redirect; allows user console log capture |
| Demo banner (z-index fix) | ✅ FIXED | 2026-05-20 | z-index: 100 (not 9999); 44px topbar margin; no longer covers content |
| Delete Old Demo Account (dashboard) | ✅ ADDED | 2026-05-20 | Button in Settings with email filter (demo@qapilot.com) |
| Dashboard null reference fix | ✅ FIXED | 2026-05-20 | `actionBtn` null checks in all tab cases (lines 1757, 1765, 1771, etc.) |
| Directory cleanup | ✅ COMPLETED | 2026-05-20 | 12+ deprecated files archived to `/Archive` folder |

---

## Capstone 2 Bug Fixes (Session May 19)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| case-002 / capstone2 gate | ✅ FIXED | 2026-05-19 | Broadened `loadCapstoneSession()` + `runSubmit()` to accept "case-002" |
| QA Advanced → Capstone → login | ✅ FIXED | 2026-05-19 | URL param session bootstrap; removed hard lesson-5 gate |
| Teams message selection | ✅ FIXED | 2026-05-19 | Added `getStage()` + `advanceStage()` to OS API; auto-fire CAPSTONE_2_LOADED |
| Dynamics username pre-fill | ✅ FIXED | 2026-05-19 | Synchronous student data from window.parent; pre-fill username field |
| Dynamics login validation | ✅ FIXED | 2026-05-19 | Student name now arrives in APP_BOOT before login check |
| Auto-refresh / state loss | ✅ FIXED | 2026-05-19 | Double-fire guards; session persistence; delayed session cleanup |
| Standalone Capstone 2 enrollment | ✅ WORKS | 2026-05-19 | Portal catalog → enroll → capstone-2.html?courseId=capstone-2 |
| Capstone 2 via QA Advanced | ✅ FIXED | 2026-05-19 | caseId param from course-view → capstone-2.html → session bootstrap |
| `persistCapstoneBugs()` | ✅ ADDED | 2026-05-19 | Saves bugsLogged/bugsFound to localStorage before CAPSTONE_COMPLETE |
| `submitInProgress` guard | ✅ ADDED | 2026-05-19 | Prevents double-fire of `runSubmit()` |
| `__c2ScoringInProgress` guard | ✅ ADDED | 2026-05-19 | Prevents duplicate `scoreCapstone2()` calls |

## Capstone 2 Scoring (Sprint G)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `scoreCapstone2()` | ✅ IMPLEMENTED | 2026-05-18 | Scores filed bugs against SCENARIO_C2 rubric |
| `_saveCapstoneResult()` | ✅ IMPLEMENTED | 2026-05-18 | Saves to IndexedDB via db.js |
| `renderResultsOverlay()` | ✅ IMPLEMENTED | 2026-05-18 | Shows results modal with breakdown |
| `retryCapstone2()` | ✅ IMPLEMENTED | 2026-05-18 | Calls `resetCapstone2()` via OS iframe |
| `getFiledBugs()` | ✅ IMPLEMENTED | 2026-05-18 | Maps bugsLogged → scoring format with storyId |
| `getScenario()` | ✅ IMPLEMENTED | 2026-05-18 | Multi-path SCENARIO_C2 access |
| `resetCapstone2()` | ✅ IMPLEMENTED | 2026-05-18 | Clears state, persists stage, posts C2_RESET |
| `capstone2Stage` / `capstone2InProg` | ✅ IMPLEMENTED | 2026-05-18 | State fields in os-core.js |
| `runSubmit()` C2 mode | ✅ IMPLEMENTED | 2026-05-18 | Posts CAPSTONE_COMPLETE instead of OS modal |
| ADO Expected/Actual fields | ✅ IMPLEMENTED | 2026-05-18 | `#ado-expected`, `#ado-actual` with draft sync |
| `BUG_LOGGED` repro/expected/actual | ✅ IMPLEMENTED | 2026-05-18 | Full data sent in postMessage |
| `CAPSTONE_COMPLETE` handler | ✅ IMPLEMENTED | 2026-05-18 | `handleOSMessage()` → `scoreCapstone2()` |
| `[C2]` logging | ✅ IMPLEMENTED | 2026-05-18 | All scoring + integration points log with [C2] |
| `build.js` → `capstone-2.html` sync | ✅ IMPLEMENTED | 2026-05-18 | Auto-updates getOSContent() on build |
| Syntax check (`node --check`) | ✅ PASSES | 2026-05-18 | Extracted script block from capstone-2.html |
| End-to-end browser test | ✅ IN PROGRESS | 2026-05-19 | Dynamics login + crmState + ADO clean form verified; Submit flow pending |
| Dynamics student pre-fill via Browser tab | ✅ FIXED | 2026-05-19 | Browser app `bootInnerApp()` now forwards `student` to tab sub-apps |
| Dynamics crmState from Browser tab | ✅ FIXED | 2026-05-19 | Uses `state.caseData.crmState` instead of `window.parent.window.SCENARIOS` |
| Dynamics dateOpened field | ✅ FIXED | 2026-05-19 | Removed `createdDate: "+90d"` overwrite; `dateOpened: "2026-07-15"` renders correctly |
| ADO clean form for Capstone 2 | ✅ FIXED | 2026-05-19 | Skips bug-001 preload when scenarioId starts with "case-"; clears stale draft |
| Dynamics status "Escalated" option | ⚠️ OPEN | 2026-05-19 | `<select>` only has "Active"/"Resolved"; crmState "Escalated" silently fails to render |
| ADO Save → BUG_LOGGED → OS chain | ✅ VERIFIED | 2026-05-18 | Message propagates: ADO → browser iframe → OS shell |

## Training App (ITEM-3)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Scenario selector grid | ✅ IMPLEMENTED | 2026-05-18 | Cards show title, difficulty badge, description, estimated time |
| case-001 scenario steps | ✅ IMPLEMENTED | 2026-05-18 | 6-step guided walkthrough for Invoice Processing Failure |
| bug-001 scenario steps | ✅ IMPLEMENTED | 2026-05-18 | 1-step Bug Report Practice |
| case-002 scenario steps | ✅ IMPLEMENTED | 2026-05-18 | 7-step walkthrough for Customer Portal Access Failure (from OS SCENARIORS) |
| Dynamic scenario discovery | ✅ IMPLEMENTED | 2026-05-18 | `renderSelector()` queries OS via `loadScenario()` for additional scenarios |
| Step navigation | ✅ IMPLEMENTED | 2026-05-18 | Next/Prev buttons, arrow key shortcuts, progress bar |
| Step position persistence | ✅ IMPLEMENTED | 2026-05-18 | `sessionStorage` per-scenario step restore |
| Completion tracking | ✅ IMPLEMENTED | 2026-05-18 | `localStorage` qa-training-complete-* with badge display |
| Completion screen | ✅ IMPLEMENTED | 2026-05-18 | Check icon, message, back-to-selector and close buttons |
| Theme support (dark/light) | ✅ IMPLEMENTED | 2026-05-18 | CSS variables + body.theme-dark class |
| APP_BOOT integration | ✅ IMPLEMENTED | 2026-05-18 | Sets role, theme; auto-starts if scenarioId provided |
| Keyboard shortcuts | ✅ IMPLEMENTED | 2026-05-18 | ArrowLeft/ArrowRight in step view |
| Boot timing (B-032) | ✅ FIXED | 2026-05-19 | Added `getActiveScenarioId()` to OS API; proactive 200ms fallback in training app queries OS directly if APP_BOOT is delayed/missed |
| B-032 verified inside capstone-2.html | ✅ VERIFIED | 2026-05-19 | Training app auto-starts case-002 via B-032 fallback when inside desktop iframe |

## Admin Signin Page Redesign (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Split-screen layout | ✅ IMPLEMENTED | 2026-05-20 | Mirrors student login: form on left (55%), hero on right (45%) |
| Light form section | ✅ IMPLEMENTED | 2026-05-20 | White background, left-aligned form with dark blue text (#1e3a8a) |
| Dark hero section | ✅ IMPLEMENTED | 2026-05-20 | Dark gradient (#1f2937 → #374151 → #4b5563) with white text and subtle overlays |
| Inverted color scheme | ✅ IMPLEMENTED | 2026-05-20 | Purple gradient button (#7c3aed → #6d28d9) to match dark hero; focus color changed to purple |
| Responsive design | ✅ IMPLEMENTED | 2026-05-20 | Form full-width on mobile (<1024px), hero hidden; side-by-side on desktop |
| Styling consistency | ✅ IMPLEMENTED | 2026-05-20 | Matches student login professional aesthetic with form styling, focus states, error handling |
| SVG icon styling | ✅ UPDATED | 2026-05-20 | Logo color changed to purple (#7c3aed); hero logo uses transparent border with white opacity |

## QA Advanced Course End Screen (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| End-of-course congratulations card | ✅ IMPLEMENTED | 2026-05-20 | Styled card with gradient header, centered emoji, congratulation message |
| Course completion flow | ✅ IMPLEMENTED | 2026-05-20 | Displays after final module in QA Advanced course |
| Two-button footer | ✅ IMPLEMENTED | 2026-05-20 | "Return to Home" and "Start Capstone 2" both route to portal.html for enrollment/course selection |
| Responsive design | ✅ IMPLEMENTED | 2026-05-20 | Stacked buttons on mobile (<480px), side-by-side on desktop |
| Styling consistency | ✅ IMPLEMENTED | 2026-05-20 | Matches Capstone 2 intro card design: blue gradient header, 2px border, professional spacing |

## Capstone Landing Page — Mark Complete Bypass (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Mark Complete button on landing page | ✅ ADDED | 2026-05-20 | "Mark Assessment Complete" card with amber styling; posts MARK_MODULE_COMPLETE to parent |
| Confirmation dialog | ✅ ADDED | 2026-05-20 | `confirm()` dialog before bypass; button disabled + styled after click |
| Completion overlay reuse | ✅ ADDED | 2026-05-20 | Reuses existing `cl-complete-overlay` (same as OS CAPSTONE_COMPLETE path) |

## Certificate — Student Info & Navigation (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Student CASE ID and email | ✅ ADDED | 2026-05-20 | Shows below course name: "ID: CASE-XXXXX | student@email.com" |
| Back to Modules button | ✅ ADDED | 2026-05-20 | Appears when courseId URL param present; links to course-view.html?course=... |
| Sidebar "Back to Modules" text | ✅ UPDATED | 2026-05-20 | Multi-course cert sidebar now says "Back to Modules" instead of "View Dashboard" |

## Certificate — Score & Next Steps Fixes (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| QA Onboarding "Course Not Completed" error | ✅ FIXED | 2026-05-20 | Root cause: `awardCourseCertificate()` wrote only course-level `certificateAwarded`, but cert page checked top-level. Now dual-writes to both levels in db.js. |
| Assessment score for bypassed capstone | ✅ FIXED | 2026-05-20 | Shows "80% (Audit)" instead of "0%" when capstone was bypassed (audit mode) |
| Dashboard scoring config reflected on cert | ✅ FIXED | 2026-05-20 | Certificate now loads saved course settings from IndexedDB (via `getCourse`) and merges passMode/passingScore into COURSE_DEFINITIONS before rendering |
| What's Next — QA Onboarding | ✅ UPDATED | 2026-05-20 | Points to QA Onboarding Advanced as next step |
| What's Next — QA Advanced | ✅ UPDATED | 2026-05-20 | Points to Capstone 2 as next step |
| What's Next — Capstone 2 | ✅ UPDATED | 2026-05-20 | Suggests revisiting modules, all courses complete |
| What's Next — fallback (any course) | ✅ UPDATED | 2026-05-20 | Shows course-specific recommendations or generic "Back to Modules" |

## Capstone 1 (Legacy)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `scoreSubmission()` in os-core.js | ✅ WORKING | 2026-05-17 | Legacy scoring (Sprint C/F) |
| Certificate flow | ✅ WORKING | 2026-05-17 | `awardCourseCertificate()` dual-writes |

## Sprint B — QOutlook Locked Emails

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `buildScenarioEmails()` | ✅ IMPLEMENTED | 2026-05-17 | Multi-path OS access |
| Locked email CSS | ✅ IMPLEMENTED | 2026-05-17 | `.ol-message-locked` class |
| `showEmail()` locked mode | ✅ IMPLEMENTED | 2026-05-17 | Read-only, no interaction |
| Gated click handler | ✅ IMPLEMENTED | 2026-05-17 | Locked → showEmail, else selectMessage |
| `mergeScenarioEmails()` | ✅ IMPLEMENTED | 2026-05-17 | Merge by ID |
| `C2_STAGE_CHANGED` listener | ✅ IMPLEMENTED | 2026-05-17 | Re-merges, re-renders, shows toast |

## Admin Dashboard (Multi-Course)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Student list with course filter | ✅ IMPLEMENTED | 2026-05-19 | Course filter dropdown populated from COURSE_DEFINITIONS |
| Per-course enrollment stats | ✅ IMPLEMENTED | 2026-05-19 | Shows total, active, completed per course |
| Per-course progress (calcProgress) | ✅ IMPLEMENTED | 2026-05-19 | Counts sub-modules completed vs total |
| Per-course detail view | ✅ IMPLEMENTED | 2026-05-19 | Shows sub-module status, quiz results, enrollment info |
| Per-course certificate status | ✅ IMPLEMENTED | 2026-05-19 | Legacy + per-course `certificateEarned` |
| Course filter → student enrollment filter | ✅ IMPLEMENTED | 2026-05-19 | Filters students by enrollment records |
| Enrollment tracking (enrollStudent) | ✅ IMPLEMENTED | 2026-05-19 | `enrollments` store with caseId/courseId |
| Course seeding (seedCourses) | ✅ IMPLEMENTED | 2026-05-19 | Overwrites course structure from COURSE_DEFINITIONS |
| Multi-course progress reset | ✅ IMPLEMENTED | 2026-05-19 | `resetStudentProgress()` clears `progress.courses` |
| Analytics stat cards | ✅ IMPLEMENTED | 2026-05-19 | Total students, enrolled this month, completions this month, avg completion rate, active last 7 days |
| Student text search | ✅ IMPLEMENTED | 2026-05-19 | Filters table by name or email client-side |
| Status filter dropdown | ✅ IMPLEMENTED | 2026-05-19 | All / Active / Inactive |
| Bulk activation/deactivation | ✅ IMPLEMENTED | 2026-05-19 | Checkbox column, select-all header, bulk action bar |
| Export CSV | ✅ IMPLEMENTED | 2026-05-19 | Selected students exported with name, email, status, courses, completion %, last active |
| Admin onboarding banner | ✅ IMPLEMENTED | 2026-05-19 | Collapsible guide with section descriptions, dismissed via localStorage |
| Capstone 2 course registration | ✅ IMPLEMENTED | 2026-05-19 | Added `capstone-2` course to COURSE_DEFINITIONS in data/content.js |
| capstone-2 multi-course progress hookup | ✅ IMPLEMENTED | 2026-05-19 | capstone-2.html now posts `MARK_MODULE_COMPLETE` to opener/parent on completion; progress saved via `saveCourseQuizResults` |

## Admin Pages (Branding)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Page `<title>` tags | ✅ FIXED | 2026-05-19 | All 5 admin pages now use "QA Pilot Academy — ..." format |
| Topbar brand text | ✅ FIXED | 2026-05-19 | Consistent "QA Pilot Academy — Admin" across dashboard, bugs, editor, assign |
| Bug Lab replaced with per-student config | ✅ REPLACED | 2026-05-22 | Global Bug Lab tab removed; per-student Bug Config modal added to student dropdown actions |
| Editor content functionality | ✅ WORKS | 2026-05-19 | Certificate settings, role names, email template — all save/reset functional |
| assign.html topbar consistency | ✅ FIXED | 2026-05-19 | Changed to same class-based markup as other admin pages |

## Capstone 2 Browser Tab Fixes (Session May 19)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Browser app forwards `student` to tab apps | ✅ FIXED | 2026-05-19 | `bootInnerApp()` now includes `student: _appBootData.student` in APP_BOOT forwarded to Dynamics/ADO tabs |
| Dynamics crmState from Browser tab | ✅ FIXED | 2026-05-19 | Uses `state.caseData.crmState` instead of `window.parent.window.SCENARIORS` which doesn't exist in sub-iframe |
| Dynamics `dateOpened` field renders | ✅ FIXED | 2026-05-19 | Removed `createdDate: "+90d"` overwrite that invalidated the date input |
| Dynamics `status` Escalated option | ✅ FIXED | 2026-05-19 | `<select>` already has "Escalated" option at dynamics.html:929; `populateCaseForm()` sets `statusEl.value = crmState.status` correctly; verified in case-002.js crmState |
| ADO clean form for case scenarios | ✅ FIXED | 2026-05-19 | Skips bug-001 preload when `scenarioId` starts with "case-"; clears stale draft from `loadAppState` |

## Admin Dashboard Restructure (May 19)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Controls-bar below collapsible overview | ✅ FIXED | 2026-05-19 | Course filter + Add Student moved below the collapsible overview section |
| Collapsible Student & Course Overview | ✅ ADDED | 2026-05-19 | Slide-down CSS max-height animation on overview toggle |
| Import/Export card on Students tab | ✅ ADDED | 2026-05-19 | Blue card with Import (blue) + Export CSV (green) buttons |
| Wider main-content | ✅ FIXED | 2026-05-19 | max-width: 1100px → 1280px |

## OS Desktop Features

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Task View thumbnails with brand colours | ✅ IMPLEMENTED | 2026-05-18 | Brand-colour preview blocks per app |
| Role enforcement (applyRole) | ✅ VERIFIED | 2026-05-18 | Dynamics: resolution lock cards; ADO: severity; null guards |
| Role change broadcast | ✅ IMPLEMENTED | 2026-05-18 | EventBus ROLE_CHANGE posts to all apps |
| Capstone 2 orchestration API | ✅ IMPLEMENTED | 2026-05-18 | getFiledBugs, getScenario, resetCapstone2 |
| ADO Expected/Actual fields | ✅ IMPLEMENTED | 2026-05-18 | New bug form fields for C2 scoring |
| Word stub app | ✅ IMPLEMENTED | 2026-05-18 | Ribbon UI + document canvas preview |
| Excel stub app | ✅ IMPLEMENTED | 2026-05-18 | Ribbon UI + spreadsheet grid preview |
| Reports app | ✅ IMPLEMENTED | 2026-05-18 | Capstone analytics from IndexedDB |
| Training app | ✅ IMPLEMENTED | 2026-05-18 | Scenario selector + step-through guide |

## Course Viewer — Quiz & Navigation Fixes (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Pre-quiz intro screen per module | ✅ FIXED | 2026-05-20 | Changed `quizState.introShown` from single boolean to per-module map (`introShown[moduleId]`). Every module now shows its own intro screen before the quiz. |
| Post-quiz navigation (completed state) | ✅ FIXED | 2026-05-20 | `openSubModule()` now shows nav buttons (Prev/Next) for completed quizzes by checking `courseProgress.quizResults[moduleId]`. Users can navigate away from completed quiz screens. |
| Quiz retake re-hides nav | ✅ FIXED | 2026-05-20 | `retakeQuiz()`/`resetQuiz()` calls `openSubModule()` which hides nav for in-progress quizzes (no quiz results yet), re-shows nav when quiz is completed. |

## Capstone 1 — Window-in-Window & Confetti (Session May 20)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Capstone iframe no longer opens new tab | ✅ FIXED | 2026-05-20 | Removed `target="_blank"` from completion overlay link. Button now posts `CAPSTONE_FINISHED` message to parent course-view.html. |
| Course-view handles CAPSTONE_FINISHED | ✅ ADDED | 2026-05-20 | New message handler in course-view.html navigates to `certificate.html?course=...&confetti=true` |
| Confetti animation on certificate | ✅ ADDED | 2026-05-20 | 80-piece CSS confetti animation + celebration banner for 6 seconds when `?confetti=true` URL param present |
| Bypass also uses same flow | ✅ UPDATED | 2026-05-20 | "Mark Assessment Complete" bypass also triggers the `CAPSTONE_FINISHED` → confetti flow |
| courseId passed to capstone-lab.html | ✅ ADDED | 2026-05-20 | Capstone-lab iframe URL now includes `&courseId=` from COURSE_ID |

## Build System

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| `build.sh` path | ✅ FIXED | 2026-05-19 | Runs from root (not `desktop/`) |
| `build.command` | ✅ ADDED | 2026-05-19 | macOS click-to-run wrapper |
| Desktop output sync | ✅ FIXED | 2026-05-19 | Build now writes to `desktop/os.bundle.js` + `desktop/dist.html` |

## Client / Stakeholder Presentation (May 2026)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Product naming consistency | ✅ FIXED | 2026-05-19 | portal.html, course.html, certificate.html all use "QA Pilot Academy" |
| Portal page title | ✅ FIXED | 2026-05-19 | Changed to "QA Pilot Academy — Training Portal" |
| Login page design | ✅ ENHANCED | 2026-05-19 | Professional redesign with gradient background, enhanced logo, improved typography, card-based product description, and refined form elements |
| Demo login button | ✅ ADDED | 2026-05-19 | Pre-seeded demo@qapilot.com / demo1234 account created on first init |
| Demo student seeding | ✅ ADDED | 2026-05-19 | `seedDemoStudent()` in index.html, runs in initDB chain |
| Privacy notice | ✅ ADDED | 2026-05-19 | "Your data is stored locally" line in login page footer |
| Canada flag → configurable logo | ✅ FIXED | 2026-05-19 | Replaced hardcoded maple leaf with `topbarLogo` config in content.js |
| Certificate double-border | ✅ ADDED | 2026-05-19 | `outline: 3px double` on `.cert-document` for printed-credential look |
| Certificate signature line | ✅ ADDED | 2026-05-19 | "Authorised by" line with horizontal rule, org name from config |
| Certificate org name config | ✅ ADDED | 2026-05-19 | `issuingOrgName` in content.js certificate config, used dynamically |
| Certificate credential ID | ✅ IMPROVED | 2026-05-19 | `generateCredentialId()` creates QPA-{year}-{8-char hash} format |
| About page | ✅ ADDED | 2026-05-19 | about.html with course descriptions, differentiators, CTA, linked from login page |
| START-HERE.html | ✅ ADDED | 2026-05-19 | Root-level HTML quick-start guide for distribution |
| launch.command (macOS) | ✅ ADDED | 2026-05-19 | One-click launch script for macOS |
| launch.bat (Windows) | ✅ ADDED | 2026-05-19 | One-click launch script for Windows |

## Capstone 1 Fixes (Session May 19 — Session 7)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Dynamics username pre-fill | ✅ FIXED | 2026-05-19 | `__capstoneStudentInfo` set synchronously from URL params in capstone-lab.html |
| Course sidebar during capstone | ✅ ENHANCED | 2026-05-19 | Replaced with handwritten-notes cheat sheet panel via `enableCheatsheet()` |
| Handwriting-font cheat sheet | ✅ ADDED | 2026-05-19 | Cursive fonts, warm paper colors, capstone-specific hints |
| "← Modules" restore button | ✅ ADDED | 2026-05-19 | Restores course module sidebar; auto-removed on navigation away |
| db.js path in desktop/dist.html | ✅ FIXED | 2026-05-19 | Changed from `js/db.js` to `../js/db.js` for correct resolution from desktop/ |

## Course Academy Features

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| AC Reference format mismatch | MEDIUM | FIXED | SCENARIO_C2 used "AC-C2-001-3" but ADO regex `/^AC-\d+(\.\d+)?$/i` rejected it — regex broadened to `/^AC-(\d+\.\d+|[A-Z]+\d+-\d+-\d+)$/i` in src/os-core.js + apps/ado.html |
| case-002 session doesn't trigger capstone2 state | LOW | OPEN | Session `scenarioId: "case-002"` bypasses `state.activeScenarioId === "capstone-2"` gate |
| Training app boot timing (B-032) | LOW | FIXED | Added `getActiveScenarioId()` OS API + proactive 200ms fallback in training app; APP_BOOT `scenarioId` already handled |
| Capstone 2 multi-course progress | LOW | FIXED | capstone-2.html now posts `MARK_MODULE_COMPLETE` to opener/parent on completion; progress saved via `saveCourseQuizResults` |
| CLAUDE.md wrong doc paths | LOW | FIXED | Updated to point to correct existing paths |
| BUG-4: CSS border shorthand + var() | NOTE | OPEN | Known quirk in built-in OS browser. 1 instance in ado.html:67 |
| Pre block colour contrast in course-view | NOTE | FIXED | Removed inline light styles from 4 `<pre>` blocks in data/content.js; added dark bg + border in course-view.html `.cv-lesson-body pre` |
| build.sh broken path | NOTE | FIXED | Was `cd desktop && node build.js` (wrong dir); now runs from root. Also outputs to `desktop/os.bundle.js` + `desktop/dist.html` |
| Course-view scroll position | NOTE | FIXED | `openSubModule()` now scrolls `.cv-content` to top on navigation |

## Professional Academy Visual Design (May 2026)

| Component | Status | Last Verified | Notes |
|-----------|--------|---------------|-------|
| Topbar gradient + shadow | ✅ IMPLEMENTED | 2026-05-19 | All pages: linear-gradient(90deg, #fff 0%, #f9fafb 100%) + 0 2px 8px shadow |
| Border styling (2px) | ✅ IMPLEMENTED | 2026-05-19 | All cards/containers: 2px solid #e5e7eb, border-radius 8px |
| Color palette (blue+purple) | ✅ IMPLEMENTED | 2026-05-19 | Primary: #2563eb, #3b82f6; Accent: #7c3aed; Light: #dbeafe |
| Button gradients | ✅ IMPLEMENTED | 2026-05-19 | Primary: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); hover: translateY(-2px) |
| course-view.html styling | ✅ IMPLEMENTED | 2026-05-19 | Sidebar (2px border, #f9fafb bg), quiz options (blue hover), lesson headers (2px border) |
| certificate.html styling | ✅ IMPLEMENTED | 2026-05-19 | Main.css updates: cert-document (2px border, blue outline), cert-score-card (#f0f9ff bg, #3b82f6 border) |
| capstone-2.html styling | ✅ IMPLEMENTED | 2026-05-19 | Gradient intro header, white case badge, blue metrics panel |
| Admin pages styling | ✅ IMPLEMENTED | 2026-05-19 | dashboard, bugs, editor, assign: all topbars + nav updated with new colors/borders |
