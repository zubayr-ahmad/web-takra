EduPlatform - Online Learning Platform
Overview
EduPlatform is a fully functional online learning platform built from scratch using raw HTML, CSS, and JavaScript. It features a homepage with a custom hero section, featured courses, and a newsletter subscription form; a course page with dynamic details and a progress tracker; a user dashboard for enrolled courses; and a contact page with an EmailJS-powered form. The site is responsive, includes a theme-switcher, uses the Roboto Google Font, and features custom animations (button hover effects).
Features

Homepage: Custom hero section, 4 featured courses from a JSON file, newsletter form storing data in localStorage.
Course Page: Dynamic course details (title, description, price, instructor), enrollment button, horizontal progress bar for enrolled courses.
Dashboard: Displays enrolled courses with progress, persisted in localStorage.
Contact Page: Form (name, email, message) using EmailJS for email delivery.
Theme-Switcher: Light and dark modes, persisted in localStorage.
Responsive Design: Optimized for desktop and mobile.
Custom Animations: Button hover effects with scale and color transitions.
Form Validation: Email validation for newsletter and contact forms.
Data Handling: Courses stored in courses.json, user data (subscriptions, enrollments, progress) in localStorage.

Tools Used

HTML/CSS/JavaScript: Core technologies for frontend development.
EmailJS: For contact form email delivery.
Google Fonts: Roboto font for typography.
LocalStorage: For persisting user data.
CodeSandbox: For hosting and testing the project.

Setup Instructions

Clone the repository or download the project files.
Open index.html in a browser to view the homepage.
For the contact form, set up an EmailJS account and replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID in js/contact.js.
Ensure an internet connection for loading Google Fonts and EmailJS.

Data Handling

Courses: Stored in data/courses.json as a static array with id, title, description, instructor, and price.
Newsletter Subscriptions: Stored in localStorage under subscribers as an array of {name, email} objects.
Enrolled Courses: Stored in localStorage under enrolledCourses as an object mapping course IDs to course data and progress.
Theme Preference: Stored in localStorage under theme as light or dark.

Design Originality

The design is custom-built without pre-made templates or frameworks like Bootstrap or Tailwind.
Styling uses a unique color scheme (blue for headers, coral for buttons) with light/dark themes.
The progress bar and button animations are crafted for an engaging user experience.
The layout prioritizes simplicity and intuitiveness, with clear navigation and responsive adjustments.

Notes

The project avoids databases, relying on localStorage for simplicity.
The contact form requires an EmailJS setup for full functionality.
The site is hosted on CodeSandbox for easy access: [Insert CodeSandbox URL here].


Built by Grok 3 for xAI, May 2025
