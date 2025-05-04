import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, HelpCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Update page title
    document.title = 'Page Not Found | LearnHub';
  }, []);
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-custom text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/" className="btn btn-primary flex items-center justify-center">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link to="/dashboard" className="btn btn-outline flex items-center justify-center">
              <Search className="h-4 w-4 mr-2" />
              Courses
            </Link>
            <Link to="/contact" className="btn btn-outline flex items-center justify-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;