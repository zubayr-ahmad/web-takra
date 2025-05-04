import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { saveContactMessage } from '../utils/localStorage';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  
  useEffect(() => {
    // Update page title
    document.title = 'Contact Us | LearnHub';
  }, []);
  
  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        saveContactMessage(name, email, message);
        setIsSubmitted(true);
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      } catch (error) {
        alert('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions or feedback? We'd love to hear from you. Fill out the form below, and our team will get back to you shortly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`input resize-none ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-3 flex items-center">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">support@learnhub.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 flex items-center">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 flex items-center">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Education St<br />
                      Learning City, LC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6">Office Hours</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our support team typically responds within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">How do I reset my password?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can reset your password by clicking on the "Forgot Password" link on the login page. 
                We'll send you an email with instructions to create a new password.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Can I get a refund after purchasing a course?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with the 
                course, you can request a refund within 30 days of purchase.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">How long do I have access to a course?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once you purchase a course, you have lifetime access to it. You can revisit the material 
                anytime and also receive all future updates to the course.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Do you offer any discounts for students?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer special discounts for students and educators. Please contact our support team 
                with proof of your academic status to receive your discount code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;