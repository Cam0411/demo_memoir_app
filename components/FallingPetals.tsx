
import React from 'react';

const FallingPetals: React.FC = () => {
  const petals = Array.from({ length: 25 }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      animationDuration: `${8 + Math.random() * 7}s`,
      animationDelay: `${Math.random() * 15}s`,
    };
    const colors = ['bg-[#fef5fa]', 'bg-[#a78bfa]', 'bg-[#ff3071]'];
    const colorClass = colors[i % colors.length];
    const size = Math.random() * 5 + 8; // size between 8px and 13px
    
    return (
      <div
        key={i}
        className={`fixed top-[-20px] ${colorClass} rounded-full opacity-70 animate-petal-fall`}
        style={{...style, width: `${size}px`, height: `${size}px`}}
        aria-hidden="true"
      ></div>
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals}
    </div>
  );
};

export default FallingPetals;