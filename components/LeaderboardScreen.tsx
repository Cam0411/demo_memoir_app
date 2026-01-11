import React from 'react';
import SheepMascot from './SheepMascot';

// Fix: The 'constants.tsx' file is obsolete. Replaced the import with local mock data.
const TOP_USERS = [
  { name: 'Phương', role: 'Scribe of Reflections' },
  { name: 'Bảo', role: 'Chronicler of Dreams' },
  { name: 'Minh', role: 'Guardian of Moments' },
];

const OTHER_USERS = [{}, {}, {}, {}, {}];


// Lantern SVG Component
const Lantern: React.FC = () => (
  <svg width="40" height="60" viewBox="0 0 50 75" className="fill-current text-[#ff3071]">
    <path d="M25,0 L25,10" stroke="#c4b5fd" strokeWidth="2"/>
    <ellipse cx="25" cy="35" rx="20" ry="25" fill="#ff3071"/>
    <ellipse cx="25" cy="35" rx="20" ry="25" fill="url(#lanternGradient)" />
    <rect x="10" y="58" width="30" height="5" fill="#a78bfa" rx="2"/>
    <path d="M15,63 L15,75 M25,63 L25,70 M35,63 L35,75" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <radialGradient id="lanternGradient" cx="0.5" cy="0.5" r="0.7">
        <stop offset="0%" stopColor="rgba(254, 245, 250,0.4)" />
        <stop offset="100%" stopColor="rgba(254, 245, 250,0)" />
      </radialGradient>
    </defs>
  </svg>
);

const LeaderboardScreen: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-[#7d54f8] font-quicksand overflow-x-hidden animate-fade-in">
            <div className="max-w-md mx-auto bg-transparent relative">
                {/* Header Section */}
                <header className="relative h-[350px] z-10">
                    <div className="absolute top-0 left-0 right-0 h-[300px] bg-[#fef5fa]/80 cloud-shape border-b-4 border-[#c4b5fd]">
                        <div className="flex justify-center pt-5">
                            <div className="relative inline-block">
                                <div className="absolute -left-10 -top-2 w-10 h-16 bg-[#7d54f8] rounded-l-md border-2 border-r-0 border-[#c4b5fd]"></div>
                                <div className="absolute -right-10 -top-2 w-10 h-16 bg-[#7d54f8] rounded-r-md border-2 border-l-0 border-[#c4b5fd]"></div>
                                <div className="relative scroll-banner px-10 py-2 border-4 border-[#c4b5fd]">
                                    <h1 className="font-berkshire text-4xl md:text-5xl text-white">MemoirME</h1>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-16 left-4"><Lantern/></div>
                        <div className="absolute top-16 right-4"><Lantern/></div>
                    </div>
                    <div className="absolute top-[100px] w-full flex justify-center">
                        <div className="w-48 h-48 md:w-56 md:h-56">
                            <SheepMascot animationState="subtle-float" />
                        </div>
                    </div>
                </header>

                {/* Main Content Section */}
                <main className="relative z-0 -mt-[60px] bg-gradient-to-b from-[#7d54f8] via-[#5b2ab8] to-[#4c1d95] p-4 pt-16 rounded-t-2xl">
                    <h2 className="text-center text-white font-berkshire text-3xl md:text-4xl mb-6 text-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
                        Keepers of Memoir-ies
                    </h2>

                    {/* Top Users */}
                    <div className="flex justify-around items-end mb-8 px-2">
                        <div className="text-center w-1/3">
                            <div className="w-20 h-20 bg-[#a78bfa] rounded-full mx-auto mb-2 border-4 border-white/30 shadow-lg"></div>
                            <p className="font-bold text-white text-sm">{TOP_USERS[0].name}</p>
                            <p className="text-xs text-white/80">{TOP_USERS[0].role}</p>
                        </div>
                        <div className="text-center w-1/3">
                            <div className="w-28 h-28 bg-[#a78bfa] rounded-full mx-auto mb-2 border-4 border-white/50 shadow-xl"></div>
                            <p className="font-bold text-white text-base">{TOP_USERS[1].name}</p>
                            <p className="text-sm text-white/90">{TOP_USERS[1].role}</p>
                        </div>
                        <div className="text-center w-1/3">
                            <div className="w-20 h-20 bg-[#a78bfa] rounded-full mx-auto mb-2 border-4 border-white/30 shadow-lg"></div>
                            <p className="font-bold text-white text-sm">{TOP_USERS[2].name}</p>
                            <p className="text-xs text-white/80">{TOP_USERS[2].role}</p>
                        </div>
                    </div>

                    {/* Other Users List */}
                    <div className="space-y-3 pb-8">
                        {OTHER_USERS.map((user, index) => (
                            <div key={index} className="flex items-center bg-black/10 p-2 rounded-full backdrop-blur-sm shadow-md">
                                <div className="w-10 h-10 bg-[#a78bfa] rounded-full border-2 border-white/20 flex-shrink-0"></div>
                                <div className="flex-1 h-7 bg-[#c4b5fd]/30 rounded-full ml-4"></div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LeaderboardScreen;