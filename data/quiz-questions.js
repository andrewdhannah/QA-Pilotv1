/**
 * =============================================================================
 * quiz-questions.js — All Quiz Questions, Answers & Explanations
 * =============================================================================
 * QA Onboarding Training Platform
 *
 * PURPOSE:
 * Central repository for all lesson assessments. Organized by lesson ID.
 * Each question contains the correct answer and a detailed explanation to
 * provide immediate educational feedback.
 *
 * HOW TO USE:
 * Use getQuestionsForLesson(lessonId) to retrieve the bank for a specific page.
 * 
 * READS FROM:   N/A (Static Data)
 * WRITES TO:    N/A (Static Data)
 * =============================================================================
 */

// ── SECTION 1: DATA SCHEMA ────────────────────────────────────────────────────

/*
QUESTION SCHEMA:
{
  questionId:     string  — Unique identifier (e.g., "l2-q1").
  type:           string  — 'true-false' | 'multiple-choice' | 'scenario'
  questionText:   string  — The question as displayed to the student.
  options:        Array   — Set of possible answers.
  correctAnswer:  string  — Must exactly match one string in the options array.
  explanation:    string  — The "Why". Shown after the student answers.
  lessonContext:  string  — Optional scenario text shown above the question.
}
*/

// ── SECTION 2: QUESTIONS BY LESSON ───────────────────────────────────────────

const QUIZ_QUESTIONS = {

  // ---------------------------------------------------------------------------
  // LESSON 1 — Testing 101
  // ---------------------------------------------------------------------------
  'lesson-1': [
    {
      questionId:   'l1-q1',
      type:         'true-false',
      questionText: 'A test case must always include expected results.',
      options:      ['True', 'False'],
      correctAnswer: 'True',
      explanation:  'Expected results define what "correct" looks like. Without them, a tester cannot objectively verify a pass or fail.',
      lessonContext: '',
    },
    {
      questionId:   'l1-q2',
      type:         'true-false',
      questionText: 'A bug report is complete once you describe what went wrong.',
      options:      ['True', 'False'],
      correctAnswer: 'False',
      explanation:  'A complete report requires repro steps, expected results (AC reference), actual results, and environment details.',
      lessonContext: '',
    },
    {
      questionId:   'l1-q3',
      type:         'true-false',
      questionText: 'Testing only happens at the end of a project, after development is complete.',
      options:      ['True', 'False'],
      correctAnswer: 'False',
      explanation:  'In Agile, testing is continuous. QA is involved from the start of the sprint to identify risks early.',
      lessonContext: '',
    },
    {
      questionId:   'l1-q4',
      type:         'true-false',
      questionText: 'A tester\'s goal is to find as many bugs as possible.',
      options:      ['True', 'False'],
      correctAnswer: 'False',
      explanation:  'The goal is to provide an honest signal of quality and verify the product meets the agreed acceptance criteria.',
      lessonContext: '',
    },
    {
      questionId:   'l1-q5',
      type:         'true-false',
      questionText: 'Given / When / Then format is used in acceptance criteria to describe testable system behaviour.',
      options:      ['True', 'False'],
      correctAnswer: 'True',
      explanation:  'This format ensures the precondition, action, and outcome are explicitly defined, making it directly testable.',
      lessonContext: '',
    },
  ],

  // ---------------------------------------------------------------------------
  // LESSON 2 — Acceptance Criteria (NEW)
  // ---------------------------------------------------------------------------
  'lesson-2': [
    {
      questionId:   'l2-q1',
      type:         'multiple-choice',
      questionText: 'In Given/When/Then format, what does the "Given" clause represent?',
      options: [
        'The action the user takes',
        'The expected outcome after the action',
        'The precondition — the state the system must be in before the test begins',
        'The bug that was found during testing',
      ],
      correctAnswer: 'The precondition — the state the system must be in before the test begins',
      explanation: '"Given" establishes your starting conditions. Without a defined starting state, two testers running the same steps might get different results.',
      lessonContext: '',
    },
    {
      questionId:   'l2-q2',
      type:         'multiple-choice',
      questionText: 'You are testing a feature and find behaviour that is not covered by any Acceptance Criterion. What should you do?',
      options: [
        'File a bug — if it looks wrong, it probably is',
        'Ignore it — if it is not in the AC, it is not your concern',
        'Flag the gap to the product owner with a specific question, and do not file a bug without an AC reference',
        'Ask a developer what the intended behaviour should be, then test against that',
      ],
      correctAnswer: 'Flag the gap to the product owner with a specific question, and do not file a bug without an AC reference',
      explanation: 'A bug is a deviation from a defined expectation. If there is no AC, there is no defined expectation. You must first get the gap documented.',
      lessonContext: '',
    },
    {
      questionId:   'l2-q3',
      type:         'multiple-choice',
      questionText: 'An AC states: "The Case Title field is required. Maximum 120 characters." What is the minimum number of test cases this single AC generates?',
      options: [
        'One — test that a valid title saves successfully',
        'Two — test valid input and empty input',
        'Three or more — happy path, empty field rejection, and boundary values',
        'It depends on the developer\'s implementation',
      ],
      correctAnswer: 'Three or more — happy path, empty field rejection, and boundary values',
      explanation: 'One AC covers multiple scenarios: the happy path (valid), the unhappy path (empty), and boundary tests (exactly 120 and 121 characters).',
      lessonContext: '',
    },
    {
      questionId:   'l2-q4',
      type:         'multiple-choice',
      questionText: 'What is the difference between a Requirement and an Acceptance Criterion?',
      options: [
        'They are the same thing — different teams use different names',
        'A requirement defines what to build. An AC defines how you will verify it was built correctly.',
        'Requirements are written by developers. AC are written by testers.',
        'Requirements cover functional behaviour. AC cover non-functional behaviour like performance.',
      ],
      correctAnswer: 'A requirement defines what to build. An AC defines how you will verify it was built correctly.',
      explanation: 'Requirements are the "what". AC are the "how we know it is done". If an AC is not testable with a pass/fail result, it is poorly written.',
      lessonContext: '',
    },
    {
      questionId:   'l2-q5',
      type:         'multiple-choice',
      questionText: 'A developer marks your bug as "Resolved." What is your immediate next action?',
      options: [
        'Close the bug — if the developer says it is fixed, trust them',
        'Re-open the bug — Resolved always means something went wrong',
        'Verify the fix yourself using the original repro steps before closing the bug',
        'Ask the developer to demonstrate the fix in a meeting',
      ],
      correctAnswer: 'Verify the fix yourself using the original repro steps before closing the bug',
      explanation: '"Resolved" is a claim by the developer. It is not a fact until QA verifies it in the environment using the original reproduction steps.',
      lessonContext: '',
    },
  ],

  // ---------------------------------------------------------------------------
  // LESSON 3 — Dynamics CRM Mock (Renamed from Lesson 2)
  // ---------------------------------------------------------------------------
  'lesson-3': [
    {
      questionId:   'l3-q1',
      type:         'multiple-choice',
      questionText: 'A Junior Investigator opens a case and attempts to set Status to "Closed". According to the acceptance criteria, what should happen?',
      options: [
        'The status changes to Closed and the record saves.',
        'The save is blocked and a validation message appears on the Status field.',
        'The Closed option is hidden from the Status dropdown for Junior Investigators.',
        'A confirmation dialog appears asking the Junior to confirm.',
      ],
      correctAnswer: 'The save is blocked and a validation message appears on the Status field.',
      explanation: 'AC-4.6 states that Junior Investigators cannot save as Resolved or Closed. The option is visible, but the save action must be blocked with an inline error.',
      lessonContext: '',
    },
    {
      questionId:   'l3-q2',
      type:         'multiple-choice',
      questionText: 'You are testing the Outcome / Resolution field. You log in as a Junior Investigator, inspect the page source, and find the field in the HTML — but it has a CSS class of "hidden". Should you log a bug?',
      options: [
        'No — the field is hidden with CSS, so it is not visible to the user.',
        'No — only Senior Investigators need to test this field.',
        'Yes — the acceptance criteria requires the field to be absent from the DOM entirely, not just hidden with CSS.',
        'Yes — the hidden class might not work in all browsers.',
      ],
      correctAnswer: 'Yes — the acceptance criteria requires the field to be absent from the DOM entirely, not just hidden with CSS.',
      explanation: 'AC-4.1 specifies that the field must be absent from the DOM. A "hidden" CSS class still leaves the data in the HTML, which is a security/requirement failure.',
      lessonContext: '',
    },
    {
      questionId:   'l3-q3',
      type:         'multiple-choice',
      questionText: 'The Case Title field has a maximum of 120 characters. You type exactly 120 characters. What should happen when you type the 121st character?',
      options: [
        'A validation error appears below the field.',
        'The field border turns red.',
        'The character is not accepted — input simply stops at 120.',
        'A modal appears warning the user they have reached the limit.',
      ],
      correctAnswer: 'The character is not accepted — input simply stops at 120.',
      explanation: 'AC-3.2 specifies that the field must not accept characters beyond 120. The input simply stops, rather than allowing the text and showing an error later.',
      lessonContext: '',
    },
    {
      questionId:   'l3-q4',
      type:         'multiple-choice',
      questionText: 'You check the Escalated checkbox. The Escalation Reason dropdown does NOT appear. You confirm this happens every time you test it. What type of bug is this?',
      options: [
        'A cosmetic bug. Report the screenshot only.',
        'A functional bug. Report: role active, exact repro steps, expected result (AC-3.4), and actual result.',
        'A performance bug. Report: how long it took to appear.',
        'An environment bug. Report: which browser you are using only.',
      ],
      correctAnswer: 'A functional bug. Report: role active, exact repro steps, expected result (AC-3.4), and actual result.',
      explanation: 'This is a failure of the conditional logic defined in AC-3.4. Because it blocks a required user action, it is a functional defect.',
      lessonContext: '',
    },
    {
      questionId:   'l3-q5',
      type:         'multiple-choice',
      questionText: 'You save a case and the Last Updated timestamp in the sidebar does not change. What criterion covers this, and is this a bug?',
      options: [
        'This is covered by AC-5.2. Yes, this is a bug — Last Updated must reflect the current timestamp after every save.',
        'This is not covered by the acceptance criteria. No bug should be raised.',
        'This is covered by AC-5.2. No, it is expected behaviour.',
        'This is a cosmetic issue. Log it as low priority only.',
      ],
      correctAnswer: 'This is covered by AC-5.2. Yes, this is a bug — Last Updated must reflect the current timestamp after every save.',
      explanation: 'AC-5.2 explicitly requires the timestamp to update on every successful save. A failure to do so is a functional bug.',
      lessonContext: '',
    },
  ],

  // ---------------------------------------------------------------------------
  // LESSON 4 — Azure DevOps (NEW)
  // ---------------------------------------------------------------------------
  'lesson-4': [
    {
      questionId:   'l4-q1',
      type:         'scenario',
      questionText: 'You have found a defect. A developer asks for the "repro steps." What should you provide?',
      options: [
        'A description of what the feature is supposed to do',
        'A numbered list of exact actions, starting from login, that reproduce the issue every time',
        'A screenshot of the error message',
        'Your assessment of why the bug probably occurred',
      ],
      correctAnswer: 'A numbered list of exact actions, starting from login, that reproduce the issue every time',
      explanation: 'Repro steps must be an exact manual. If a developer can follow your list and see the bug on their first attempt without asking a question, the report is successful.',
      lessonContext: 'You are working in Azure DevOps and need to file a complete bug report.',
    },
    {
      questionId:   'l4-q2',
      type:         'scenario',
      questionText: 'A developer marks your bug as "Resolved." What is your immediate next action?',
      options: [
        'Close the bug — the developer has confirmed it is fixed',
        'Re-open the bug — Resolved usually means something went wrong',
        'Verify the fix yourself in the correct environment using the original repro steps',
        'Ask the developer to show you the fix in a code review',
      ],
      correctAnswer: 'Verify the fix yourself in the correct environment using the original repro steps',
      explanation: '"Resolved" is the developer\'s assertion. QA must verify the fix independently in the environment using the original steps before closing.',
      lessonContext: '',
    },
    {
      questionId:   'l4-q3',
      type:         'scenario',
      questionText: 'A Junior Investigator can set Status to "Closed" without any validation error, which contradicts AC-4.2. What severity level should you assign this bug?',
      options: [
        'Low — it is a minor permission issue that can be worked around',
        'Medium — it affects functionality but data is not at risk',
        'High — a core feature is broken and there is a permission/security implication',
        'Critical — the system is unusable',
      ],
      correctAnswer: 'High — a core feature is broken and there is a permission/security implication',
      explanation: 'Role-based permissions are a core security feature. Allowing an unauthorized user to close a case is a high-severity failure of the business rules.',
      lessonContext: '',
    },
    {
      questionId:   'l4-q4',
      type:         'scenario',
      questionText: 'You write a bug report with the title "Login doesn\'t work." A developer asks for clarification. What is wrong with this title?',
      options: [
        'It is too short — bug titles must be at least 10 words',
        'It does not specify the action, the object, or the unexpected outcome — a developer cannot begin investigating without asking follow-up questions',
        'It should reference the AC number instead',
        'Bug titles should not mention the feature name',
      ],
      correctAnswer: 'It does not specify the action, the object, or the unexpected outcome — a developer cannot begin investigating without asking follow-up questions',
      explanation: 'A good title follows: [Action] + [Object] + [Unexpected Outcome]. Example: "Login page does not redirect to dashboard after valid credentials entered."',
      lessonContext: '',
    },
    {
      questionId:   'l4-q5',
      type:         'scenario',
      questionText: 'You are re-opening a bug. What must your re-open comment include?',
      options: [
        'Only the statement "still broken"',
        'Your opinion on why the developer\'s fix was insufficient',
        'What you tested, in which build, the exact steps you followed, and what specifically still fails or newly fails',
        'A request for a meeting to discuss the issue',
      ],
      correctAnswer: 'What you tested, in which build, the exact steps you followed, and what specifically still fails or newly fails',
      explanation: 'A re-open comment must be evidence-based. You must state the build number, the role used, and the exact step where the failure recurred to avoid "it works on my machine" disputes.',
      lessonContext: '',
    },
  ],

  // ---------------------------------------------------------------------------
  // LESSON 5 — Test Planning & Bug Triage
  // ---------------------------------------------------------------------------
  'lesson-5': [
    {
      questionId: 'l5q1',
      type: 'multiple-choice',
      questionText: 'A new feature has just been built and no one has tested it yet. What type of testing should you start with?',
      options: ['Planned testing with detailed test cases', 'Exploratory testing', 'Automated regression testing', 'User acceptance testing'],
      correctAnswer: 'Exploratory testing',
      explanation: 'Exploratory testing is used for discovery and early verification of new features.',
      lessonContext: '',
    },
    {
      questionId: 'l5q2',
      type: 'multiple-choice',
      questionText: 'A bug is filed: "The Submit button does not respond when clicked — no error message, no action taken. Reproduces 100% of the time." What severity is this?',
      options: ['4 — Low', '3 — Medium', '2 — High', '1 — Critical'],
      correctAnswer: '2 — High',
      explanation: 'A major feature is completely broken with no workaround, making it Severity 2.',
      lessonContext: '',
    },
    {
      questionId: 'l5q3',
      type: 'multiple-choice',
      questionText: 'Which bug title is most useful to a developer?',
      options: ['"Status is wrong"', '"The dropdown is broken again"', '"Dynamics form doesn\'t save"', '"Junior Investigator can set Status to Closed — AC-2.1 violation"'],
      correctAnswer: '"Junior Investigator can set Status to Closed — AC-2.1 violation"',
      explanation: 'A good title describes the specific defect, the role, and the AC violation.',
      lessonContext: '',
    },
  ],

  // ---------------------------------------------------------------------------
  // CAPSTONE — Full Scenario Assessment
  // ---------------------------------------------------------------------------
  'capstone': [
    {
      questionId:   'cap-q1',
      type:         'scenario',
      questionText: 'You are a Junior Investigator. You open CASE-00042. You fill in the Case Title, set Status to "Resolved", and click Save. What do you expect to happen, and what would you write in your bug report if it saves successfully?',
      options: [
        'It should save. No bug — Resolved is a valid status.',
        'It should be blocked with a validation message. If it saves, report: the save completed without error when it should have been blocked, referencing AC-4.6 as the expected behaviour.',
        'It should redirect to the case list. If it saves, report: wrong navigation behaviour.',
        'It should show a modal. If it saves, report: modal did not appear.',
      ],
      correctAnswer: 'It should be blocked with a validation message. If it saves, report: the save completed without error when it should have been blocked, referencing AC-4.6 as the expected behaviour.',
      explanation: 'AC-4.6 explicitly blocks Juniors from saving Resolved/Closed cases. If a save succeeds, the role-based restriction is broken.',
      lessonContext: 'Capstone Assessment: Full System Simulation.',
    },
  ],

  // ---------------------------------------------------------------------------
  // COURSE: teams-for-qa — Module 1: Navigating Teams
  // ---------------------------------------------------------------------------
  "teams-for-qa": {
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
      {
        questionId: "teams-m1-q3",
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
        questionId: "teams-m1-q4",
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
        questionId: "teams-m1-q5",
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
    ],
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

  // ---------------------------------------------------------------------------
  // COURSE: agile-scrum-qa — Module 1: Sprint Ceremonies for QA
  // ---------------------------------------------------------------------------
  "agile-scrum-qa": {
    "mod-1": [
      {
        questionId: "asqa-m1-q1",
        type: "multiple-choice",
        questionText: "During sprint planning, what is the QA team member's primary responsibility?",
        options: [
          "Estimating how long development will take",
          "Identifying testability risks, missing acceptance criteria, and clarifying 'how we will know it is done' for each story",
          "Writing all test cases for the sprint right there in the meeting",
          "Taking meeting notes for the team",
        ],
        correctAnswer: "Identifying testability risks, missing acceptance criteria, and clarifying 'how we will know it is done' for each story",
        explanation: "QA attends planning to ensure every story is testable. This means ACs are clear, environments are known, and dependencies (data, permissions, integrations) are flagged before development starts.",
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
        explanation: "Retro is about continuous improvement, not blame. QA should focus on process friction — like late test environment availability or unclear ACs — so the team can fix the root cause.",
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
        explanation: "Triage needs QA (severity), PO (priority / business impact), and dev (effort estimate). Together they decide what gets fixed now vs. later vs. never.",
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
        explanation: "A good AC must be verifiable with a pass/fail result. 'User can reset password' leaves too many questions unanswered — via email? SMS? What does success look like? QA should push for specificity.",
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
        explanation: "This AC is strong because it defines a clear precondition (login page), action (click Forgot Password), and a measurable outcome (email sent within 30s). It is unambiguous and testable.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m3-q3",
        type: "multiple-choice",
        questionText: "You are demo-ing a story against its ACs. The feature works on the happy path but fails on an edge case the ACs did not mention. What do you say in the demo?",
        options: [
          '"The feature is broken — I found an edge case that fails."',
          '"All defined ACs pass. I also identified an edge case not covered by the current ACs. I recommend updating the ACs to include it. Here is what happens when you try [edge case].\'"',
          '"I will not demo until the edge case is fixed."',
          '"The ACs are wrong — I am rejecting this story."',
        ],
        correctAnswer: '"All defined ACs pass. I also identified an edge case not covered by the current ACs. I recommend updating the ACs to include it. Here is what happens when you try [edge case].\'"',
        explanation: "Demo is against ACs, not against every possible scenario. QA should celebrate what passes while constructively flagging gaps as improvements for future refinement.",
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
        explanation: "Without a visual AC, a colour mismatch is a preference, not a defect. QA should note it and drive a conversation about adding visual checks to the DoD if the team wants that standard.",
        lessonContext: "",
      },
    ],
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
        explanation: "Shift left means catching defects when they are cheapest to fix — during design and development, not after. QA shifts left by reviewing ACs early, pairing with developers, and writing tests before the build lands.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q2",
        type: "multiple-choice",
        questionText: "A developer asks you to review their code changes before they merge. As a QA practicing shift left, what should you focus on?",
        options: [
          "Checking for syntax errors in the code",
          "Looking at the logic from a testing perspective: 'What is the input? What happens on error? Is this edge case handled?' and suggesting test scenarios",
          "Approving the merge so testing can begin earlier",
          "Rewriting the code to be more testable",
        ],
        correctAnswer: "Looking at the logic from a testing perspective: 'What is the input? What happens on error? Is this edge case handled?' and suggesting test scenarios",
        explanation: "QA code review is about testability and risk, not code style. Spotting an unhandled null case in the PR means a bug never reaches the test environment — that is shift left in action.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q3",
        type: "multiple-choice",
        questionText: "You find a critical bug on day one of a two-week sprint. What is the best approach?",
        options: [
          "Keep it to yourself until the feature is fully built — testing is not done yet",
          "Surface it immediately to the developer and the team. Early bugs are cheapest to fix. Let the team decide whether to fix now or schedule it.",
          "Wait until the sprint review to reveal it",
          "Log it in the backlog and move on — someone will get to it eventually",
        ],
        correctAnswer: "Surface it immediately to the developer and the team. Early bugs are cheapest to fix. Let the team decide whether to fix now or schedule it.",
        explanation: "Shift left also means shifting communication left. The earlier you share a finding, the less rework is needed. The team can make an informed decision about whether the bug blocks the story or not.",
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
          "Filing a bug report for every single observation, no matter how small",
        ],
        correctAnswer: "Providing small, frequent, actionable feedback to developers throughout the sprint — as soon as you see something worth sharing",
        explanation: "Continuous feedback means QA does not wait for the 'testing phase.' If you see a minor issue in a build on day two, tell the developer immediately so they can fix it while the code is fresh.",
        lessonContext: "",
      },
      {
        questionId: "asqa-m4-q5",
        type: "multiple-choice",
        questionText: "A developer says 'Just log a bug and I will fix it later.' The bug is a minor label typo that you could tell them about in 10 seconds. What should you do?",
        options: [
          "Log the bug — follow the process",
          "Tell them now informally (Slack / in-person) so it is fixed immediately, then decide with the team whether a formal bug ticket is needed for tracking",
          "Ignore it — a typo is not worth anyone's time",
          "Wait until the sprint review and mention it publicly",
        ],
        correctAnswer: "Tell them now informally (Slack / in-person) so it is fixed immediately, then decide with the team whether a formal bug ticket is needed for tracking",
        explanation: "Continuous feedback is about speed. An informal heads-up gets the typo fixed in seconds. A formal bug ticket might take longer to process than the fix itself. Use judgement — not everything needs a ticket.",
        lessonContext: "",
      },
    ],
  },

};

  // ── SECTION 3: UTILITY FUNCTIONS ──────────────────────────────────────────────

/**
 * getQuestionsForLesson(lessonId)
 * Returns the array of questions for a given lesson.
 * 
 * @param {string} lessonId - The lesson ID. e.g. "lesson-1"
 * @returns {Array} Array of question objects for that lesson.
 */
function getQuestionsForLesson(lessonId) {
  return QUIZ_QUESTIONS[lessonId] || [];
}

/**
 * getQuestionById(lessonId, questionId)
 * Finds a specific question within a lesson by its ID.
 * 
 * @param {string} lessonId   - The lesson the question belongs to.
 * @param {string} questionId - The question's unique ID.
 * @returns {Object|null} The question object, or null.
 */
function getQuestionById(lessonId, questionId) {
  const questions = getQuestionsForLesson(lessonId);
  return questions.find(q => q.questionId === questionId) || null;
}