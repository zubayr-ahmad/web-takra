import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Laptop, BookOpen, Award, Users } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import NewsletterForm from '../components/NewsletterForm';
import { getFeaturedCourses } from '../data/courseData';

const HomePage: React.FC = () => {
  const featuredCourses = getFeaturedCourses();
  
  useEffect(() => {
    // Update page title
    document.title = 'LearnHub - Expand Your Knowledge';
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary-dark text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Learn Without <span className="text-accent-light">Limits</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Expand your skills with expert-led courses across tech, design, business, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="btn bg-white text-primary hover:bg-gray-100 hover:text-primary-dark px-6 py-3 text-base"
                >
                  Start Learning
                </Link>
                <a
                  href="#featured-courses"
                  className="btn btn-outline text-white border-white hover:bg-white/10 px-6 py-3 text-base"
                >
                  Explore Courses
                </a>
              </div>
              
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex -space-x-2">
                  {/* Placeholder student avatars */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/90 border-2 border-primary flex items-center justify-center text-xs text-primary font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">10K+</span> students already learning
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Students learning online" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold">Master New Skills</h3>
                  <p className="text-white/90 text-sm">Join thousands of learners today</p>
                </div>
              </div>
              <div className="absolute top-1/4 -right-8 bg-accent text-white p-4 rounded-lg shadow-lg transform rotate-12 z-20 animate-pulse-light">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15K+</div>
              <p className="text-gray-600 dark:text-gray-400">Students</p>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-gray-600 dark:text-gray-400">Courses</p>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-400">Instructors</p>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8</div>
              <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LearnHub?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We provide the tools and resources you need to enhance your skills and advance your career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Paced Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn at your own pace with on-demand courses. Access your materials anytime, anywhere.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Laptop className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from industry professionals with real-world experience in their fields.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Curriculum</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore a wide range of subjects from web development to design and business.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-400/10 dark:bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn certificates upon course completion to showcase your newly acquired skills.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join a community of learners to share insights, ask questions, and collaborate.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Engage with quizzes, projects, and interactive coding exercises for hands-on experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="featured-courses" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                Discover our most popular courses chosen by thousands of students
              </p>
            </div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium mt-4 md:mt-0"
            >
              View all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Read testimonials from students who have transformed their careers with our courses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "The React course was incredibly comprehensive. I went from knowing basic HTML to building complex applications in just a few weeks. The instructor was clear and supportive throughout."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">JD</div>
                <div>
                  <p className="font-medium">James Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Web Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "The Data Science course helped me transition from marketing to a data analyst role. The practical projects gave me real-world experience that I could showcase in interviews."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">AS</div>
                <div>
                  <p className="font-medium">Alicia Smith</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data Analyst</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "I've taken several UX design courses, and this was by far the most comprehensive. The instructor's feedback on my projects was invaluable for improving my design skills."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">RJ</div>
                <div>
                  <p className="font-medium">Robert Johnson</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Our Latest Courses
              </h2>
              <p className="text-white/90 max-w-2xl mb-8">
                Subscribe to our newsletter to receive updates on new courses, educational content, and special offers tailored to your interests.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Weekly Updates</p>
                    <p className="text-sm opacity-90">Fresh content every week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-white">
                    <p className="font-medium">Personalized Recommendations</p>
                    <p className="text-sm opacity-90">Based on your interests</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Star: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default HomePage;