export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  thumbnail: string;
  duration: string;
  lessons: number;
  rating: number;
  studentsEnrolled: number;
  featured: boolean;
  chapters: {
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      videoUrl?: string;
      content?: string;
    }[];
  }[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Modern Web Development with React',
    slug: 'modern-web-development-react',
    description: 'Learn to build modern, responsive web applications with React',
    longDescription: 'This comprehensive course will take you from the basics of React to advanced concepts like Hooks, Context API, and Redux. You will learn how to build real-world applications with best practices and modern tools. By the end of this course, you will be able to build complex, production-ready applications.',
    price: 79.99,
    instructor: {
      name: 'Sarah Johnson',
      bio: 'Senior Frontend Developer with 8+ years of experience in React and modern JavaScript',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    level: 'Intermediate',
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'Frontend'],
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '24h 30m',
    lessons: 42,
    rating: 4.8,
    studentsEnrolled: 3245,
    featured: true,
    chapters: [
      {
        title: 'Getting Started with React',
        lessons: [
          { id: '1-1', title: 'Introduction to React', duration: '10:15' },
          { id: '1-2', title: 'Setting Up Your Development Environment', duration: '15:30' },
          { id: '1-3', title: 'Your First React Component', duration: '22:45' }
        ]
      },
      {
        title: 'React Fundamentals',
        lessons: [
          { id: '2-1', title: 'Props and State', duration: '18:20' },
          { id: '2-2', title: 'Working with Lists and Keys', duration: '14:10' },
          { id: '2-3', title: 'Handling Events', duration: '16:55' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Data Science Fundamentals with Python',
    slug: 'data-science-fundamentals-python',
    description: 'Master the essential skills for data analysis and visualization',
    longDescription: 'This course covers all the fundamental concepts of data science using Python. You will learn data manipulation with Pandas, visualization with Matplotlib and Seaborn, and machine learning with Scikit-Learn. Perfect for beginners looking to start a career in data science.',
    price: 89.99,
    instructor: {
      name: 'Michael Chen',
      bio: 'Data Scientist with experience at tech giants, PhD in Computer Science',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    level: 'Beginner',
    category: 'Data Science',
    tags: ['Python', 'Data Analysis', 'Machine Learning'],
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '32h 15m',
    lessons: 56,
    rating: 4.7,
    studentsEnrolled: 5678,
    featured: true,
    chapters: [
      {
        title: 'Python Basics for Data Science',
        lessons: [
          { id: '1-1', title: 'Python Fundamentals Review', duration: '18:30' },
          { id: '1-2', title: 'Working with NumPy', duration: '25:15' },
          { id: '1-3', title: 'Introduction to Pandas', duration: '30:45' }
        ]
      },
      {
        title: 'Data Visualization',
        lessons: [
          { id: '2-1', title: 'Matplotlib Essentials', duration: '22:10' },
          { id: '2-2', title: 'Creating Beautiful Visualizations with Seaborn', duration: '28:40' },
          { id: '2-3', title: 'Interactive Visualizations', duration: '24:15' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'UX Design Principles and Practice',
    slug: 'ux-design-principles-practice',
    description: 'Learn to create intuitive, user-friendly digital experiences',
    longDescription: 'This hands-on course teaches you the foundations of user experience design. You will learn research methods, wireframing, prototyping, and usability testing. By completing real-world projects, you will build a portfolio that showcases your UX design skills to potential employers.',
    price: 69.99,
    instructor: {
      name: 'Emily Rodriguez',
      bio: 'UX Designer with 10+ years experience working with Fortune 500 companies',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    level: 'Beginner',
    category: 'Design',
    tags: ['UX', 'UI', 'Design Thinking'],
    thumbnail: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '18h 45m',
    lessons: 32,
    rating: 4.9,
    studentsEnrolled: 2890,
    featured: true,
    chapters: [
      {
        title: 'Introduction to UX Design',
        lessons: [
          { id: '1-1', title: 'What is UX Design?', duration: '12:20' },
          { id: '1-2', title: 'The Design Thinking Process', duration: '18:45' },
          { id: '1-3', title: 'User Research Fundamentals', duration: '24:10' }
        ]
      },
      {
        title: 'Wireframing and Prototyping',
        lessons: [
          { id: '2-1', title: 'Creating Effective Wireframes', duration: '20:35' },
          { id: '2-2', title: 'Prototyping Tools and Techniques', duration: '26:50' },
          { id: '2-3', title: 'User Testing Your Prototypes', duration: '22:15' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Full Stack JavaScript Development',
    slug: 'full-stack-javascript-development',
    description: 'Build complete web applications from front to back end',
    longDescription: 'This comprehensive course covers both frontend and backend development using JavaScript. You will learn to build RESTful APIs with Node.js and Express, create dynamic user interfaces with React, and work with MongoDB for data storage. Perfect for developers looking to master the full JavaScript stack.',
    price: 99.99,
    instructor: {
      name: 'David Wilson',
      bio: 'Full Stack Developer and Tech Lead with experience at multiple startups',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    level: 'Advanced',
    category: 'Web Development',
    tags: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
    thumbnail: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '36h 20m',
    lessons: 64,
    rating: 4.8,
    studentsEnrolled: 4120,
    featured: false,
    chapters: [
      {
        title: 'Backend Development with Node.js',
        lessons: [
          { id: '1-1', title: 'Introduction to Node.js', duration: '15:40' },
          { id: '1-2', title: 'Building RESTful APIs with Express', duration: '28:15' },
          { id: '1-3', title: 'Working with MongoDB', duration: '32:10' }
        ]
      },
      {
        title: 'Frontend Development with React',
        lessons: [
          { id: '2-1', title: 'React Fundamentals', duration: '22:30' },
          { id: '2-2', title: 'State Management with Redux', duration: '26:45' },
          { id: '2-3', title: 'Connecting Frontend and Backend', duration: '30:20' }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter',
    slug: 'mobile-app-development-flutter',
    description: 'Create beautiful native apps for iOS and Android from a single codebase',
    longDescription: 'Learn to build cross-platform mobile applications using Flutter and Dart. This course covers everything from basic UI components to complex state management and API integration. By the end, you will be able to publish your own apps to both the App Store and Google Play Store.',
    price: 84.99,
    instructor: {
      name: 'Priya Sharma',
      bio: 'Mobile Developer with 6+ years experience in native and cross-platform development',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    level: 'Intermediate',
    category: 'Mobile Development',
    tags: ['Flutter', 'Dart', 'Mobile', 'iOS', 'Android'],
    thumbnail: 'https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '28h 45m',
    lessons: 50,
    rating: 4.7,
    studentsEnrolled: 3560,
    featured: false,
    chapters: [
      {
        title: 'Getting Started with Flutter',
        lessons: [
          { id: '1-1', title: 'Introduction to Flutter and Dart', duration: '16:25' },
          { id: '1-2', title: 'Setting Up Your Development Environment', duration: '14:30' },
          { id: '1-3', title: 'Understanding Widget Basics', duration: '22:15' }
        ]
      },
      {
        title: 'Building User Interfaces',
        lessons: [
          { id: '2-1', title: 'Layout Widgets in Flutter', duration: '25:40' },
          { id: '2-2', title: 'Working with Material Design', duration: '18:35' },
          { id: '2-3', title: 'Custom Animations and Transitions', duration: '26:10' }
        ]
      }
    ]
  }
];

export const getFeaturedCourses = () => {
  return courses.filter(course => course.featured);
};

export const getCourseBySlug = (slug: string) => {
  return courses.find(course => course.slug === slug);
};

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string) => {
  return courses.filter(course => course.category === category);
};