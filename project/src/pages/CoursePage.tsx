import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, BookOpen, Users, Award, Star, CheckCircle, 
  Play, ArrowLeft, ShoppingCart, BookmarkPlus, Share2
} from 'lucide-react';
import ProgressCircle from '../components/ProgressCircle';
import { getCourseBySlug } from '../data/courseData';
import { getUser, enrollInCourse, updateCourseProgress } from '../utils/localStorage';

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = getCourseBySlug(courseId || '');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  useEffect(() => {
    // Update page title
    document.title = course ? `${course.title} | LearnHub` : 'Course Not Found | LearnHub';
    
    // Check if user is enrolled
    const user = getUser();
    if (user && course) {
      const enrolledCourse = user.enrolledCourses.find(c => c.courseId === course.id);
      if (enrolledCourse) {
        setIsEnrolled(true);
        setProgress(enrolledCourse.progress);
        setCompletedLessons(enrolledCourse.completedLessons);
      }
    }
  }, [course]);
  
  if (!course) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
  
  const handleEnroll = () => {
    const user = getUser();
    if (!user) {
      if (confirm('You need to be logged in to enroll in a course. Create a demo account?')) {
        localStorage.setItem('learningPlatform_user', JSON.stringify({
          name: 'Demo User',
          email: 'demo@example.com',
          enrolledCourses: []
        }));
        enrollInCourse(course.id);
        setIsEnrolled(true);
        setProgress(0);
        window.location.reload();
      }
      return;
    }
    
    enrollInCourse(course.id);
    setIsEnrolled(true);
    setProgress(0);
  };
  
  const handleLessonComplete = (lessonId: string) => {
    if (isEnrolled) {
      updateCourseProgress(course.id, lessonId);
      
      // Update local state
      if (!completedLessons.includes(lessonId)) {
        setCompletedLessons(prev => [...prev, lessonId]);
        setProgress(prev => Math.min(prev + 5, 100)); // Simple increment for demo
      }
    }
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-primary to-secondary-dark text-white py-12">
        <div className="container-custom">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-white/90 text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center text-sm text-white/80 mb-6 gap-x-6 gap-y-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{course.rating} ({course.studentsEnrolled} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{course.level}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <p className="font-medium">Instructor: {course.instructor.name}</p>
                  <p className="text-sm text-white/80">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-3xl font-bold">${course.price}</p>
                    {isEnrolled && (
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Enrolled
                      </div>
                    )}
                  </div>
                  
                  {isEnrolled ? (
                    <div className="space-y-4">
                      <div className="flex justify-center mb-2">
                        <ProgressCircle percentage={progress} />
                      </div>
                      <button 
                        className="btn btn-primary w-full"
                        onClick={() => {
                          const firstChapter = course.chapters[0];
                          const firstLesson = firstChapter.lessons[0];
                          // In a real app, this would navigate to the course player
                          alert(`This would take you to the lesson: ${firstLesson.title}`);
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary w-full mb-4"
                      onClick={handleEnroll}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Enroll Now
                    </button>
                  )}
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="btn btn-outline flex-1">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      Wishlist
                    </button>
                    <button className="btn btn-outline flex-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {course.longDescription}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold mb-1">Category</p>
                  <p className="text-gray-600 dark:text-gray-400">{course.category}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold mb-1">Last Updated</p>
                  <p className="text-gray-600 dark:text-gray-400">June 2025</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold mb-1">Language</p>
                  <p className="text-gray-600 dark:text-gray-400">English</p>
                </div>
              </div>
            </div>
            
            {/* Course Curriculum */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              
              <div className="space-y-4">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4">
                      <h3 className="font-semibold">
                        {chapterIndex + 1}. {chapter.title}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {chapter.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        
                        return (
                          <div 
                            key={lesson.id} 
                            className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="mr-3">
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                                ) : (
                                  <Play className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className={`font-medium ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                                  {lesson.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                            {isEnrolled && (
                              <button 
                                className={`text-xs px-3 py-1.5 rounded-full ${
                                  isCompleted 
                                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary dark:bg-gray-700 dark:text-gray-300'
                                }`}
                                onClick={() => handleLessonComplete(lesson.id)}
                              >
                                {isCompleted ? 'Completed' : 'Mark Complete'}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            {/* What You'll Learn */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Build professional-grade applications from scratch</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Master core concepts and best practices</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Work with industry-standard tools and libraries</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Apply your skills to real-world projects</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Prepare for technical interviews and jobs</span>
                </li>
              </ul>
            </div>
            
            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Share This Course</h3>
              <div className="flex space-x-3">
                <button className="btn btn-outline p-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="btn btn-outline p-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.015 10.015 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="btn btn-outline p-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button className="btn btn-outline p-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;