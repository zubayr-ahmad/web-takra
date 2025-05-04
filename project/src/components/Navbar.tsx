import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, BookOpen, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getUser } from '../utils/localStorage';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(!!user);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          onClick={closeMenu}
        >
          <BookOpen className="h-8 w-8" />
          <span className="text-xl font-bold font-heading">LearnHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary font-semibold' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="btn btn-primary rounded-full"
            >
              <User className="h-4 w-4 mr-2" />
              My Dashboard
            </Link>
          ) : (
            <button 
              className="btn btn-primary rounded-full"
              onClick={() => {
                // Would handle login in a real app
                if (confirm('Demo version: This would open a login modal. Create a demo account?')) {
                  // Create a demo user and refresh
                  localStorage.setItem('learningPlatform_user', JSON.stringify({
                    name: 'Demo User',
                    email: 'demo@example.com',
                    enrolledCourses: []
                  }));
                  window.location.reload();
                }
              }}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background absolute top-full left-0 w-full border-t border-gray-200 dark:border-gray-800 shadow-lg animate-fade-in">
          <div className="container-custom py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path 
                      ? 'text-primary font-semibold' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="btn btn-primary w-full justify-center"
                  onClick={closeMenu}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Dashboard
                </Link>
              ) : (
                <button 
                  className="btn btn-primary w-full justify-center"
                  onClick={() => {
                    closeMenu();
                    // Would handle login in a real app
                    if (confirm('Demo version: This would open a login modal. Create a demo account?')) {
                      // Create a demo user and refresh
                      localStorage.setItem('learningPlatform_user', JSON.stringify({
                        name: 'Demo User',
                        email: 'demo@example.com',
                        enrolledCourses: []
                      }));
                      window.location.reload();
                    }
                  }}
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;