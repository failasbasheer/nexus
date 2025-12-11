import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6E56CF" />
          <stop offset="1" stopColor="#00C2FF" />
        </linearGradient>
      </defs>
      <path 
        d="M20 2L35.5885 11V29L20 38L4.41154 29V11L20 2Z" 
        fill="url(#logoGradient)" 
        fillOpacity="0.2"
        stroke="url(#logoGradient)" 
        strokeWidth="2"
      />
      <path 
        d="M20 12L28 16.5V23.5L20 28L12 23.5V16.5L20 12Z" 
        fill="url(#logoGradient)"
      />
      <path 
        d="M20 2V12M35.5885 11L28 16.5M35.5885 29L28 23.5M20 38L20 28M4.41154 29L12 23.5M4.41154 11L12 16.5" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
    </svg>
  );
};

export default Logo;