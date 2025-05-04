// Types
export interface User {
  name: string;
  email: string;
  enrolledCourses: EnrolledCourse[];
}

export interface EnrolledCourse {
  courseId: string;
  enrolledDate: string;
  progress: number; // 0-100
  completedLessons: string[]; // array of lesson IDs
}

export interface NewsletterSubscription {
  name: string;
  email: string;
  subscribedDate: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  sentDate: string;
}

// Storage Keys
const USER_KEY = 'learningPlatform_user';
const NEWSLETTER_KEY = 'learningPlatform_newsletter';
const CONTACT_MESSAGES_KEY = 'learningPlatform_contactMessages';
const THEME_KEY = 'learningPlatform_theme';

// User Functions
export const getUser = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const createUser = (name: string, email: string): User => {
  const newUser: User = {
    name,
    email,
    enrolledCourses: [],
  };
  saveUser(newUser);
  return newUser;
};

export const enrollInCourse = (courseId: string): void => {
  const user = getUser();
  if (!user) return;

  // Check if already enrolled
  if (user.enrolledCourses.some(course => course.courseId === courseId)) {
    return;
  }

  const newEnrollment: EnrolledCourse = {
    courseId,
    enrolledDate: new Date().toISOString(),
    progress: 0,
    completedLessons: [],
  };

  user.enrolledCourses.push(newEnrollment);
  saveUser(user);
};

export const updateCourseProgress = (courseId: string, lessonId: string): void => {
  const user = getUser();
  if (!user) return;

  const courseIndex = user.enrolledCourses.findIndex(course => course.courseId === courseId);
  if (courseIndex === -1) return;

  // Add lesson to completed lessons if not already completed
  if (!user.enrolledCourses[courseIndex].completedLessons.includes(lessonId)) {
    user.enrolledCourses[courseIndex].completedLessons.push(lessonId);
  }

  // Calculate and update progress (would need course data to calculate accurately)
  // For now, using a simple mock progress update
  const currentProgress = user.enrolledCourses[courseIndex].progress;
  user.enrolledCourses[courseIndex].progress = Math.min(currentProgress + 5, 100);

  saveUser(user);
};

export const resetCourseProgress = (courseId: string): void => {
  const user = getUser();
  if (!user) return;

  const courseIndex = user.enrolledCourses.findIndex(course => course.courseId === courseId);
  if (courseIndex === -1) return;

  user.enrolledCourses[courseIndex].progress = 0;
  user.enrolledCourses[courseIndex].completedLessons = [];

  saveUser(user);
};

// Newsletter Functions
export const getNewsletterSubscriptions = (): NewsletterSubscription[] => {
  const data = localStorage.getItem(NEWSLETTER_KEY);
  return data ? JSON.parse(data) : [];
};

export const subscribeToNewsletter = (name: string, email: string): void => {
  const subscriptions = getNewsletterSubscriptions();
  
  // Check if already subscribed
  if (subscriptions.some(sub => sub.email === email)) {
    return;
  }

  const newSubscription: NewsletterSubscription = {
    name,
    email,
    subscribedDate: new Date().toISOString(),
  };

  subscriptions.push(newSubscription);
  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(subscriptions));
};

// Contact Message Functions
export const getContactMessages = (): ContactMessage[] => {
  const data = localStorage.getItem(CONTACT_MESSAGES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveContactMessage = (name: string, email: string, message: string): void => {
  const messages = getContactMessages();

  const newMessage: ContactMessage = {
    name,
    email,
    message,
    sentDate: new Date().toISOString(),
  };

  messages.push(newMessage);
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(messages));
};

// Theme Functions
export const getThemePreference = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(THEME_KEY);
  return theme === 'dark' ? 'dark' : 'light';
};

export const saveThemePreference = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(THEME_KEY, theme);
};