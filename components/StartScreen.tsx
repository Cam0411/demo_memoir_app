import React, { useState } from 'react';
import FallingPetals from './FallingPetals';
import ApricotBlossomTree from './ApricotBlossomTree';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleStartClick = () => {
    setIsExiting(true);
    setTimeout(onStart, 500); // Tương ứng với thời gian của hiệu ứng fade-out
  };

  return (
    <div className={`relative w-full min-h-screen bg-gradient-to-b from-[#7d54f8] to-[#ff3071] flex flex-col items-center p-4 overflow-hidden dynamic-bg ${isExiting ? 'fade-out' : 'fade-in'}`}>
      <ApricotBlossomTree progress={1} />
      <FallingPetals />
      
      <main className="flex flex-col items-center justify-around text-center flex-grow w-full z-10 py-12 sm:py-24">
        <div className="w-full text-center">
          <h1 className="font-berkshire text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-[#fef5fa] to-[#c4b5fd] bg-clip-text text-transparent" style={{ textShadow: '3px 3px 10px rgba(196, 181, 253, 0.3)' }}>
            MemoirME
          </h1>
          <p className="text-[#fef5fa]/80 text-lg mt-2"> Hiểu bản thân 100% — liệu bạn có tự tin? Thử ngay bài test để giải mã con người thật của bạn</p>
        </div>

        <button
          onClick={handleStartClick}
          className="relative overflow-hidden w-64 px-8 py-4 bg-gradient-to-r from-[#7d54f8] to-[#a78bfa] text-white font-bold rounded-full text-xl hover:scale-105 transition-transform shadow-lg animate-pulse-glow"
        >
          Bắt đầu
        </button>
      </main>
    </div>
  );
};

export default StartScreen;