import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { subscribeToNewsletter } from '../utils/localStorage';

const NewsletterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        subscribeToNewsletter(name, email);
        setMessage('Thank you for subscribing to our newsletter!');
        setMessageType('success');
        setName('');
        setEmail('');
      } catch (error) {
        setMessage('An error occurred. Please try again.');
        setMessageType('error');
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Mail className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-xl font-semibold">Subscribe to Our Newsletter</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Stay updated with our latest courses, educational tips, and special offers.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input text-sm"
            placeholder="Your name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input text-sm"
            placeholder="your.email@example.com"
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-3 text-sm ${messageType === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;