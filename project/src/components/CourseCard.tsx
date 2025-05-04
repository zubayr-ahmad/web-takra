import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Course } from '../data/courseData';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className = '' }) => {
  return (
    <article 
      className={`card group hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-48 object-cover object-center rounded-t-lg"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-gray-900 bg-opacity-80 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            {course.rating}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            <Link to={`/course/${course.slug}`}>
              {course.title}
            </Link>
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </span>
          <span className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.lessons} lessons
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {course.instructor.name}
            </span>
          </div>
          <div className="font-bold text-lg">
            ${course.price}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {course.studentsEnrolled.toLocaleString()} students
          </span>
          <Link 
            to={`/course/${course.slug}`}
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;