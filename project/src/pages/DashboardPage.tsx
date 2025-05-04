import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Bookmark, Settings, CheckSquare, RefreshCw, 
  BookOpen, Clock, Award, ChevronRight, BarChart
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import ProgressCircle from '../components/ProgressCircle';
import { getCourseById, courses } from '../data/courseData';
import { getUser, resetCourseProgress } from '../utils/localStorage';
import { EnrolledCourse } from '../utils/localStorage';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name: string; email: string; enrolledCourses: EnrolledCourse[]} | null>(null);
  const [activeTab, setActiveTab] = useState('my-courses');
  
  useEffect(() => {
    // Update page title
    document.title = 'My Dashboard | LearnHub';
    
    // Get user data
    const userData = getUser();
    
    if (!userData) {
      // Create demo user if user is not logged in
      if (confirm('You need to be logged in to view the dashboard. Create a demo account?')) {
        localStorage.setItem('learningPlatform_user', JSON.stringify({
          name: 'Demo User',
          email: 'demo@example.com',
          enrolledCourses: []
        }));
        window.location.reload();
      } else {
        navigate('/');
      }
      return;
    }
    
    setUser(userData);
  }, [navigate]);
  
  const handleResetProgress = (courseId: string) => {
    if (confirm('Are you sure you want to reset your progress for this course?')) {
      resetCourseProgress(courseId);
      
      // Update user state
      if (user) {
        const updatedCourses = user.enrolledCourses.map(course => {
          if (course.courseId === courseId) {
            return { ...course, progress: 0, completedLessons: [] };
          }
          return course;
        });
        
        setUser({ ...user, enrolledCourses: updatedCourses });
      }
    }
  };
  
  if (!user) {
    return (
      <div className="container-custom py-12 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  const enrolledCourses = user.enrolledCourses.map(enrolledCourse => {
    const courseData = getCourseById(enrolledCourse.courseId);
    return {
      ...enrolledCourse,
      courseData
    };
  }).filter(course => course.courseData); // Filter out any courses that might not exist
  
  const getOverallProgress = () => {
    if (enrolledCourses.length === 0) return 0;
    
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / enrolledCourses.length);
  };
  
  const totalLessonsCompleted = enrolledCourses.reduce(
    (sum, course) => sum + course.completedLessons.length, 0
  );
  
  const recommendedCourses = courses
    .filter(course => !user.enrolledCourses.some(ec => ec.courseId === course.id))
    .slice(0, 3);
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container-custom">
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mr-4">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className={`btn ${activeTab === 'my-courses' ? 'btn-primary' : 'btn-outline'}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                My Courses
              </Link>
              <button 
                className={`btn ${activeTab === 'wishlist' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Wishlist
              </button>
              <button 
                className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Enrolled Courses</p>
              <p className="text-2xl font-bold">{enrolledCourses.length}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center mr-4">
              <CheckSquare className="h-7 w-7 text-indigo-500" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Lessons Completed</p>
              <p className="text-2xl font-bold">{totalLessonsCompleted}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-14 h-14 rounded-full bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center mr-4">
              <Clock className="h-7 w-7 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Hours Spent</p>
              <p className="text-2xl font-bold">{totalLessonsCompleted * 0.25}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mr-4">
              <Award className="h-7 w-7 text-emerald-500" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Certificates</p>
              <p className="text-2xl font-bold">{enrolledCourses.filter(c => c.progress === 100).length}</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        {activeTab === 'my-courses' && (
          <>
            {/* Learning Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Your Learning Progress</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <ProgressCircle 
                    percentage={getOverallProgress()} 
                    size={120}
                    strokeWidth={10}
                    textClass="text-2xl font-bold"
                  />
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Overall Progress</p>
                </div>
                
                <div className="lg:col-span-3">
                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div 
                          key={course.courseId} 
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <div className="flex items-center mb-3 sm:mb-0">
                              <img 
                                src={course.courseData?.thumbnail} 
                                alt={course.courseData?.title} 
                                className="w-12 h-12 object-cover rounded-md mr-3"
                              />
                              <div>
                                <h3 className="font-semibold">{course.courseData?.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {course.completedLessons.length} of {course.courseData?.lessons} lessons completed
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 w-full sm:w-auto">
                              <ProgressCircle 
                                percentage={course.progress} 
                                size={50}
                                strokeWidth={6}
                                textClass="text-xs font-semibold"
                              />
                              
                              <button
                                className="btn btn-outline text-xs py-1 px-2"
                                onClick={() => handleResetProgress(course.courseId)}
                                title="Reset Progress"
                              >
                                <RefreshCw className="h-3 w-3" />
                              </button>
                              
                              <Link 
                                to={`/course/${course.courseData?.slug}`}
                                className="btn btn-primary text-xs py-1 px-3 ml-auto sm:ml-0"
                              >
                                Continue
                              </Link>
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You haven't enrolled in any courses yet.
                      </p>
                      <Link to="/" className="btn btn-primary">
                        Browse Courses
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Learning Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Learning Statistics</h2>
              
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Statistics will be displayed once you have more learning activity.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Recommended Courses */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recommended for You</h2>
                <Link 
                  to="/" 
                  className="text-primary hover:text-primary-dark font-medium flex items-center"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'wishlist' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save courses you're interested in by clicking the bookmark icon.
            </p>
            <Link to="/" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input"
                      value={user.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Receive email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="course-updates"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                      defaultChecked
                    />
                    <label htmlFor="course-updates" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Notify me about course updates
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="newsletter"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary rounded"
                      defaultChecked
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Subscribe to newsletter
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  className="btn btn-primary"
                  onClick={() => alert('Settings would be saved in a real application')}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;