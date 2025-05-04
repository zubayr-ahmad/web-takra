import React from 'react';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  textClass?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  size = 100,
  strokeWidth = 8,
  circleColor = 'rgb(229, 231, 235)',
  progressColor = 'rgb(79, 70, 229)',
  textClass = 'text-lg font-semibold'
}) => {
  // Calculate values
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          className="transition-all duration-300 ease-in-out"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={circleColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          className="transition-all duration-1000 ease-out"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Text in the middle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={textClass}>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;