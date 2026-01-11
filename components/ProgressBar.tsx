
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-[#fef5fa]/20 rounded-full h-3.5">
      <div
        className="bg-gradient-to-r from-[#7d54f8] to-[#c4b5fd] h-3.5 rounded-full transition-all duration-500 ease-out progress-bar-glow"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;