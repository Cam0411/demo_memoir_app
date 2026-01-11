
import React from 'react';

const Confetti: React.FC = () => {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 2}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    const colors = ['bg-[#7d54f8]', 'bg-[#a78bfa]', 'bg-[#ff3071]', 'bg-[#fef5fa]'];
    const colorClass = colors[i % colors.length];

    return (
      <div
        key={i}
        className={`absolute top-0 w-2 h-4 ${colorClass}`}
        style={style}
        aria-hidden="true"
      ></div>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      <div className="relative w-full h-full animate-fade-out animation-delay-3000">
        {confettiPieces}
      </div>
    </div>
  );
};

export default Confetti;