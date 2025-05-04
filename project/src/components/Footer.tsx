import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LearnHub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Empowering your journey through knowledge. Learn at your own pace with our comprehensive courses.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-primary transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Course Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Data Science</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Mobile Development</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Design</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Business</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">123 Education St, Learning City, LC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">support@learnhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mt-10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;