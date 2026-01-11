import React from 'react';

interface SheepMascotProps {
    animationState?: 'subtle-float' | 'thinking-bob' | 'celebrate-hop';
}

const SheepMascot: React.FC<SheepMascotProps> = ({ animationState = 'subtle-float' }) => {
  const animationClass = 
    animationState === 'thinking-bob' ? 'mascot-thinking' :
    animationState === 'celebrate-hop' ? 'mascot-celebrate' :
    'mascot-float';

  return (
    <div className={animationClass}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fluffy" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Legs */}
        <rect x="80" y="150" width="10" height="20" fill="#D7CCC8" rx="5" />
        <rect x="110" y="150" width="10" height="20" fill="#D7CCC8" rx="5" />

        {/* Body Wool */}
        <g filter="url(#fluffy)">
          <circle cx="100" cy="120" r="45" fill="#FFFAF0" />
          <circle cx="70" cy="110" r="25" fill="#FFFAF0" />
          <circle cx="130" cy="110" r="25" fill="#FFFAF0" />
          <circle cx="100" cy="90" r="25" fill="#FFFAF0" />
        </g>
        
        {/* Head */}
        <g>
          {/* Head Wool */}
          <circle cx="100" cy="65" r="28" fill="#FFFAF0" />
          <circle cx="80" cy="50" r="15" fill="#FFFAF0" />
          <circle cx="120" cy="50" r="15" fill="#FFFAF0" />
        </g>

        {/* Face */}
        <circle cx="100" cy="80" r="25" fill="#FFF8DC" />
        
        {/* Eyes */}
        <circle cx="90" cy="78" r="4" fill="black" />
        <circle cx="110" cy="78" r="4" fill="black" />
        <circle cx="92" cy="76" r="1.5" fill="white" />
        <circle cx="112" cy="76" r="1.5" fill="white" />
        
        {/* Blush */}
        <circle cx="82" cy="88" r="5" fill="#FF6B6B" opacity="0.5" />
        <circle cx="118" cy="88" r="5" fill="#FF6B6B" opacity="0.5" />

        {/* Mouth */}
        <path d="M 95 90 Q 100 95 105 90" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Ears */}
        <ellipse cx="65" cy="75" rx="5" ry="10" fill="#FFF8DC" transform="rotate(-30 65 75)" stroke="#E0E0E0" strokeWidth="1"/>
        <ellipse cx="135" cy="75" rx="5" ry="10" fill="#FFF8DC" transform="rotate(30 135 75)" stroke="#E0E0E0" strokeWidth="1"/>

        {/* Scarf */}
        <path d="M 80 100 Q 100 110 120 100" fill="none" stroke="#E53935" strokeWidth="8" strokeLinecap="round"/>
        <path d="M 120 100 L 135 115" fill="none" stroke="#E53935" strokeWidth="8" strokeLinecap="round"/>

      </svg>
    </div>
  );
};

export default SheepMascot;