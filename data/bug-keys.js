// =============================================================================
// FILE: data/bug-keys.js
// PURPOSE: Centralized constants for all bug toggle keys and admin lab bug IDs.
//          Add new bugs here only. Reference BUG_KEYS everywhere else.
//          Included in QASimulator.html via build.js.
//          Included in course/admin pages via <script src="data/bug-keys.js">.
// =============================================================================

window.BUG_KEYS = {

  // ── Semantic bug keys (used in Dynamics app, scenario defs, scoring) ────
  // These are the internal IDs that the Dynamics CRM app uses to detect
  // violations and report them as BUG_FOUND/BUG_LOGGED events.

  // Junior can set Status to Closed (role violation — no trailing "d")
  // Used in: apps/dynamics.html (runtime checks, bug reporting)
  STATUS_JUNIOR_CLOSE: 'status-junior-close',

  // Junior can set Status to Closed (with trailing "d")
  // Used in: scenarios/capstone-scenario.js, scenarios/scenario-case-003.js
  STATUS_JUNIOR_CLOSED: 'status-junior-closed',

  // Date Opened field accepts future dates (no validation error)
  // Used in: apps/dynamics.html, all scenario files
  FUTURE_DATE_ALLOWED: 'future-date-allowed',

  // Escalation Reason is blank when Status is Escalated
  // Used in: apps/dynamics.html, scenarios/case-002.js
  ESCALATION_REASON_BLANK: 'escalation-reason-blank',

  // Case priority does not match the expected value
  // Used in: scenarios/capstone-scenario.js, scenarios/scenario-case-003.js
  PRIORITY_MISMATCH: 'priority-mismatch',

  // Case owner field is not assigned
  // Used in: scenarios/capstone-scenario.js, scenarios/scenario-case-003.js
  OWNER_UNASSIGNED: 'owner-unassigned',

  // ── Semantic keys for per-student bugs (Dynamics app runtime checks) ────
  // These are checked by the Dynamics CRM app to determine whether a bug
  // condition is active for the current student's session.

  // Junior can see the Outcome/Resolution field (BUG-01)
  OUTCOME_RESOLUTION_VISIBLE: 'outcome-resolution-visible-junior',

  // Junior can edit the Outcome/Resolution field (BUG-02)
  OUTCOME_RESOLUTION_EDITABLE: 'outcome-resolution-editable-junior',

  // Case Title allows blank save (BUG-05)
  CASE_TITLE_BLANK_ALLOWED: 'case-title-blank-allowed',

  // Status can be set to Resolved without Outcome populated (BUG-06)
  RESOLVED_WITHOUT_OUTCOME: 'resolved-without-outcome',

  // Last Updated timestamp does not refresh after save (BUG-07)
  LAST_UPDATED_STALE: 'last-updated-stale',

  // ── Admin Bug Lab IDs (used in admin/bugs.html, admin/dashboard.html) ────
  // These are the UI-facing IDs in the Admin Bug Lab panel.  They are stored
  // in IndexedDB under the 'activeBugs' key and displayed as toggle cards.
  // NOTE: These are NOT the same as the semantic keys above.  They are a
  // separate display-oriented system.

  BUG_01: 'BUG-01',  // Junior sees Outcome/Resolution
  BUG_02: 'BUG-02',  // Junior edits Outcome/Resolution
  BUG_03: 'BUG-03',  // Future dates allowed
  BUG_04: 'BUG-04',  // Escalation Reason hidden when Escalated
  BUG_05: 'BUG-05',  // Blank Case Title allowed
  BUG_06: 'BUG-06',  // Resolved without Outcome
  BUG_07: 'BUG-07',  // Last Updated timestamp stale
  BUG_08: 'BUG-08',  // Junior can set Status to Closed

  // ── Capstone 2 bug IDs (used in capstone-2 scenario + Teams conditions) ──
  // These identify the three bugs in the Capstone 2 assessment (Sprint G).

  C2_LOGIN_FORMAT:     'BUG-C2-01',  // Login email accepts invalid format
  C2_PASSWORD_EXPIRY:  'BUG-C2-02',  // Password reset link expires too fast
  C2_NAME_TRUNCATION:  'BUG-C2-03',  // Customer name truncates at 30 chars
};

// ── BUG_MAP: Admin Lab IDs → semantic bug keys ──────────────────────────
// This mapping drives per-student bug assignment. When an admin toggles a
// bug ON for a student, the admin Lab ID is translated to one or more
// semantic keys that the Dynamics CRM app checks at runtime.
// Add new semantic keys here when wiring up new admin bugs.
window.BUG_MAP = {
  'BUG-01': ['outcome-resolution-visible-junior'],
  'BUG-02': ['outcome-resolution-editable-junior'],
  'BUG-03': ['future-date-allowed'],
  'BUG-04': ['escalation-reason-blank'],
  'BUG-05': ['case-title-blank-allowed'],
  'BUG-06': ['resolved-without-outcome'],
  'BUG-07': ['last-updated-stale'],
  'BUG-08': ['status-junior-close'],
};

// ── Helper: validate a key against the known set ───────────────────────────
// Useful for runtime checks in the admin UI and scoring engine.
window.BUG_KEYS.isValid = function (key) {
  var values = Object.keys(window.BUG_KEYS).filter(function (k) {
    return k !== 'isValid' && typeof window.BUG_KEYS[k] === 'string';
  }).map(function (k) {
    return window.BUG_KEYS[k];
  });
  return values.indexOf(key) !== -1;
};
