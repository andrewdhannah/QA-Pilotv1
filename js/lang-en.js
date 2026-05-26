/**
 * =============================================================================
 * lang-en.js — English (EN) UI Strings
 * =============================================================================
 * QA Pilot — Bilingual English Dictionary
 *
 * PURPOSE:
 * Defines the LANG_EN object containing all user-facing English strings.
 * Used by the __() translation function in i18n.js to render UI text.
 *
 * KEYS:
 * - Keys are organised by page/feature prefix for clarity.
 * - Use {0}, {1} placeholders for dynamic values.
 * - Keep all UI text here — no hardcoded English strings in HTML or JS.
 *
 * NOTE:
 * This file must be loaded AFTER i18n.js in every page's script tag sequence.
 * =============================================================================
 */

var LANG_EN = {

  // ── GLOBAL / SHARED ─────────────────────────────────────────────────────────

  // Language toggle
  'lang_en': 'EN',
  'lang_fr': 'FR',

  // Page titles
  'page_title_index.html':          'QA Pilot Academy \u2014 Sign In',
  'page_title_portal.html':         'QA Pilot Academy \u2014 Training Portal',
  'page_title_course-view.html':    'QA Pilot \u2014 Course Viewer',

  // App branding
  'app_name':             'QA Pilot Academy',
  'app_name_short':       'QA Pilot',
  'app_brand_training':   'QA Pilot Academy',


  // ── LOGIN PAGE (index.html) ─────────────────────────────────────────────────

  'login_subtitle':             'Sign in to continue your training.',
  'login_email_label':          'Email address',
  'login_email_placeholder':    'your.name@example.com',
  'login_password_label':       'Password',
  'login_password_placeholder': 'Enter your password',
  'login_sign_in':              'Sign in',
  'login_signing_in':           'Signing in\u2026',
  'login_admin_link':           'Administrator sign in',
  'login_password_reset_note':  'Password resets are managed by your training coordinator.',
  'login_caps_warning':         'Caps Lock is on.',
  'login_demo_btn':             '\u{1F6E0}\uFE0F Demo Login',
  'login_demo_email':           'demo@qapilot.com',

  // Login page product description
  'login_info_heading':         'What is QA Pilot Academy?',
  'login_info_desc':            'A fully offline, hands-on training platform for Quality Assurance professionals. Learn testing methodology, bug reporting, CRM tools, Azure DevOps, and test planning through realistic simulations and guided exercises.',

  // Privacy notice
  'login_privacy':              'Your training data is stored locally on this device and is not transmitted anywhere.',

  // Login errors
  'login_error_empty':          'Please enter your email address and password.',
  'login_error_email_not_found':'Email address not found. Please check and try again.',
  'login_error_deactivated':    'This account has been deactivated. Please contact your administrator.',
  'login_error_wrong_password': 'Incorrect password. Please try again.',
  'login_error_db':             'Unable to connect to the database. Please try refreshing the page.',
  'login_error_generic':        'An error occurred. Please refresh the page and try again.',




  // ── PORTAL PAGE (portal.html) ───────────────────────────────────────────────

  'portal_welcome':             'Welcome, {0}!',
  'portal_welcome_sub':         'Pick up where you left off or explore a new course.',
  'portal_welcome_sub_first':   'Ready to start your QA training journey? Browse a course below and enroll to get started.',
  'portal_my_learning':         'My Learning',
  'portal_my_learning_empty':   'You are not enrolled in any courses yet. Browse the catalog below and click a course to get started!',
  'portal_available_courses':   'Available Courses',
  'portal_sign_out':            'Sign Out',
  'portal_loading':             'Loading your courses\u2026',
  'portal_no_courses':          'No additional courses available at this time.',
  'portal_error':               'Something went wrong loading the portal. Please refresh the page.',
  'portal_admin_dashboard':     'Go to Admin Dashboard \u2192',

  // Course card labels
  'portal_modules':             '{0} modules',
  'portal_lessons':             '{0} lessons',
  'portal_estimated_min':       '~{0} min',
  'portal_progress':            'Progress',
  'portal_completed':           '\u2713 Completed',
  'portal_continue_hint':       'Continue',
  'portal_view_certificate':    'View Certificate \u2192',
  'portal_start_course':        'Start Course \u2192',
  'portal_enroll_free':         'Enroll \u2014 Free',
  'portal_enrolling':           'Enrolling\u2026',
  'portal_enrolled_success':    'Successfully enrolled!',
  'portal_enrolled_fail':       'Failed to enroll. Please try again.',
  'portal_course_not_found':    'Course not found.',

  // Portal category fallback
  'portal_category_general':    'General',

  // Portal category headings (shown above grouped course sections)
  'portal_cat_QA_title':        'QA Fundamentals',
  'portal_cat_QA_desc':         'Courses focused on quality assurance testing skills and best practices.',
  'portal_cat_Development_title': 'Development & Collaboration',
  'portal_cat_Development_desc':  'Courses covering development methodologies and team collaboration practices.',


  // ── COURSE VIEWER (course-view.html) ────────────────────────────────────────

  'cv_back':                    '\u2190 Back',
  'cv_percent_done':            '{0}% done',
  'cv_loading':                 'Loading\u2026',

  // Welcome screen
  'cv_welcome_title':           'Select a lesson to begin',
  'cv_welcome_desc':            'Choose a module from the sidebar and click a lesson to start learning. Your progress is saved automatically.',

  // Sidebar
  'cv_module':                  'Module {0}',
  'cv_no_modules':              'No modules found.',
  'cv_read':                    'Read',
  'cv_quiz':                    'Quiz',
  'cv_practice':                'Practice',
  'cv_exam':                    'Exam',

  // Navigation
  'cv_previous':                '\u2190 Previous',
  'cv_mark_complete':           'Mark Complete \u2192',
  'cv_completed':               '\u2713 Completed',
  '__prev__':                   '\u2190 Previous',
  '__next__':                   'Next \u2192',
  'cv_saving':                  'Saving\u2026',

  // Errors
  'cv_error_not_found':         'Course not found. It may have been removed or the link may be incorrect.',
  'cv_error_load':              'Unable to load course data. Please refresh.',
  'cv_error_save':              'Error saving progress.',
  'cv_error_module_locked':     'Complete the previous module first.',

  // Quiz
  'cv_quiz_intro':              '{0} questions \u2014 you\'ll see the correct answer after each one.',
  'cv_quiz_question_of':        'Question {0} of {1}',
  'cv_quiz_correct':            '\u2705 Correct!',
  'cv_quiz_incorrect':          '\u274C Incorrect.',
  'cv_quiz_correct_answer':     'The correct answer is:',
  'cv_quiz_next':               'Next question \u2192',
  'cv_quiz_see_results':        '\U0001F4CA See results \u2192',
  'cv_quiz_complete':           '\U0001F4CA Quiz Complete!',
  'cv_quiz_score':              'You got {0} out of {1} ({2}%)',
  'cv_quiz_reset_confirm':      'Reset this quiz? All your current answers will be cleared.',
  'cv_quiz_reset_btn':          '\\U0001F504 Reset Quiz',
  'cv_quiz_retake':             '\\U0001F504 Retake Test',
  'cv_quiz_continue':           'Continue \u2192',
  'cv_quiz_not_available':      'Quiz questions not yet available',
  'cv_quiz_not_available_desc': 'The questions for this module are being prepared.',

  // Placeholder content
  'cv_placeholder_title':       'Lesson content coming soon',
  'cv_placeholder_desc':        'This lesson is being prepared. Check back later for the full content.',

  // Exercise / capstone labels
  'cv_launch_lab':              'Launch {0} \u2192',
  'cv_launch_capstone':         'Open Capstone \u2192',
  'cv_lab_complete_hint':       'Once you complete the lab, return here to proceed to the module quiz.',

  // Course complete
  'cv_course_complete':         'Course complete! \U0001F389',
};

// Auto-register: add LANG_EN to the global scope for i18n.js reference
