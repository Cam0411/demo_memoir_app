import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { QUIZ_QUESTIONS } from '../quizConstants.tsx';
import ProgressBar from './ProgressBar';
import Confetti from './Confetti';
import FallingPetals from './FallingPetals';
import ApricotBlossomTree from './ApricotBlossomTree';

const AppStoreButton: React.FC = () => (
    <a href="https://apps.apple.com/vn/app/memoirme/id1640973202?l=vi" rel="noopener noreferrer" className="inline-block bg-gradient-to-br from-[#7d54f8] to-[#ff3071] text-[#fef5fa] rounded-lg px-6 py-3 hover:opacity-90 transition-all text-center w-52 animate-cta-pulse shadow-lg border-2 border-[#fef5fa]/50">
        <div className="text-xs font-semibold">Tải về trên</div>
        <div className="text-xl font-bold">App Store</div>
    </a>
);

const GooglePlayButton: React.FC = () => (
     <a href="https://play.google.com/store/apps/details?id=com.nartus.interactiveDiary&hl=en" rel="noopener noreferrer" className="inline-block bg-gradient-to-br from-[#7d54f8] to-[#ff3071] text-[#fef5fa] rounded-lg px-6 py-3 hover:opacity-90 transition-all text-center w-52 animate-cta-pulse shadow-lg border-2 border-[#fef5fa]/50" style={{ animationDelay: '0.2s' }}>
        <div className="text-xs font-semibold">TẢI XUỐNG TỪ</div>
        <div className="text-xl font-bold">Google Play</div>
    </a>
);

const sendDataToGoogleSheet = async (email: string, answers: { [key: string]: string }) => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby78LSgPvghxyCFofFWFtkewaw9Vx2tN-WvDA-BszsyumMobEgk90dvMPiVeP4c9lWN_g/exec';
  const payload = { timestamp: new Date().toISOString(), email, ...answers };

  if (SCRIPT_URL.includes('YOUR_DEPLOYMENT_ID') || !SCRIPT_URL.startsWith('')) {
      console.warn("Chưa có URL Google Apps Script. Đang chạy ở chế độ mô phỏng.");
      return new Promise(resolve => setTimeout(() => resolve({ result: 'success' }), 1000));
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST', mode: 'cors', cache: 'no-cache',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Không thể gửi dữ liệu đến Google Sheet:', error);
    throw error;
  }
};


const QuizFlow: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [view, setView] = useState<'quiz' | 'email' | 'redirect'>('quiz');
  const [animationClass, setAnimationClass] = useState('slide-in');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const questionContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (view === 'quiz' && questionContainerRef.current) {
        const qContainer = questionContainerRef.current;
        const qHeading = qContainer.querySelector('h2');
        const qButtons = qContainer.querySelectorAll('button');

        gsap.set([qHeading, ...qButtons], { autoAlpha: 0, y: 20 });
        
        const tl = gsap.timeline();
        if (qHeading) {
            tl.to(qHeading, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        }
        if (qButtons.length > 0) {
            tl.to(qButtons, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '-=0.3');
        }
    }
  }, [currentQuestionIndex, view]);

  const handleAnswer = (answer: string) => {
    setAnimationClass('slide-out');
    
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [QUIZ_QUESTIONS[currentQuestionIndex].id]: answer }));
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnimationClass('slide-in');
      } else {
        setView('email');
        setAnimationClass('slide-in');
      }
    }, 300);
  };
  
  const handleBack = () => {
    setAnimationClass('slide-out-reverse');
    
    setTimeout(() => {
      if (view === 'email') {
        setView('quiz');
      } else if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      }
      setAnimationClass('slide-in-reverse');
    }, 300);
  };

  const validateEmail = (emailToValidate: string): string => {
    if (!emailToValidate.trim()) return 'Vui lòng nhập email của bạn.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToValidate)) return 'Địa chỉ email không hợp lệ.';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (isEmailTouched) setEmailError(validateEmail(newEmail));
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
    setEmailError(validateEmail(email));
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailTouched(true);
    if (isSubmitting) return;

    const validationError = validateEmail(email);
    if (validationError) {
        setEmailError(validationError);
        return;
    }
    
    setIsSubmitting(true);
    
    sendDataToGoogleSheet(email, answers).catch(error => {
        console.error("Gửi dữ liệu đến Google Sheet thất bại:", error);
    });

    setAnimationClass('slide-out');
    setTimeout(() => {
        setView('redirect');
        setAnimationClass('fade-in');
    }, 300);
  };

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    const rect = element.getBoundingClientRect();
    circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;
    circle.classList.add("ripple");
    element.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };
  
  const progress = view === 'quiz' ? (currentQuestionIndex / (QUIZ_QUESTIONS.length - 1)) : 1;

  const renderContent = () => {
    if (view === 'redirect') {
      return (
        <div ref={mainContentRef} className={`relative text-center text-[#fef5fa] w-full max-w-md ${animationClass}`}>
            <Confetti />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Tuyệt vời! Cây đã nở hoa 🌸</h1>
            <p className="text-[#fef5fa]/80 mb-8 max-w-sm mx-auto">Bắt đầu hành trình ghi lại ký ức và khám phá bản thân với MemoirME ngay hôm nay!</p>
            <div className="space-y-4 flex flex-col items-center">
              <AppStoreButton />
              <GooglePlayButton />
            </div>
        </div>
      );
    }
    
    if (view === 'email') {
      const inputBorder = emailError ? 'border-red-400 focus:border-red-500 focus:ring-red-400/50' : 'border-[#fef5fa]/30 focus:border-[#a78bfa] focus:ring-[#a78bfa]/50';
      return (
         <div ref={mainContentRef} className={`text-center w-full max-w-md ${animationClass}`}>
            <h1 className="text-3xl sm:text-4xl font-berkshire bg-gradient-to-r from-[#fef5fa] to-[#c4b5fd] bg-clip-text text-transparent mb-2">Chỉ còn một bước nữa!</h1>
            <p className="text-[#fef5fa]/80 mb-6 max-w-xs mx-auto">Nhập email để lưu lại thành quả. Sau đó, tải ứng dụng để tiếp tục hành trình!</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <div>
                    <input
                        type="email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur}
                        placeholder="email@cuaban.com"
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-[#fef5fa]/20 text-white placeholder-[#fef5fa]/60 focus:ring transition-all ${inputBorder}`}
                        aria-invalid={!!emailError} aria-describedby="email-error" required
                    />
                    {emailError && <p id="email-error" className="text-red-300 text-sm text-left px-1 mt-1">{emailError}</p>}
                </div>
                <p className="text-xs text-[#fef5fa]/60 flex items-center text-center justify-center gap-1.5 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v4H5a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1v-6a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm-2 8V6a2 2 0 114 0v4H8z" clipRule="evenodd" />
                    </svg>
                    <span>Chúng tôi tôn trọng quyền riêng tư của bạn. Email sẽ chỉ được dùng để gửi cập nhật về MemoirME.</span>
                </p>
                <button type="submit" disabled={isSubmitting} className="relative overflow-hidden w-full px-8 py-4 bg-gradient-to-r from-[#7d54f8] to-[#a78bfa] text-white font-bold rounded-full text-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed shadow-lg animate-pulse-glow">
                    {isSubmitting ? 'Đang gửi...' : 'Hoàn tất & Nhận Lì Xì 🧧'}
                </button>
            </form>
         </div>
      );
    }

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    return (
      <div ref={mainContentRef} className={`w-full max-w-md ${animationClass}`}>
        <div className="w-full text-center my-4 sm:my-8">
            <h1 className="font-berkshire text-5xl bg-gradient-to-r from-[#fef5fa] to-[#c4b5fd] bg-clip-text text-transparent" style={{textShadow: '2px 2px 8px rgba(196, 181, 253, 0.3)'}}>MemoirME</h1>
        </div>
        <div ref={questionContainerRef} className="w-full min-h-[200px] sm:min-h-[250px] flex flex-col justify-center items-center">
             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#fef5fa] mb-8 text-center invisible">{currentQuestion.question}</h2>
             <div className="flex flex-col gap-4 w-full">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={(e) => { createRipple(e); handleAnswer(option); }}
                        className="relative overflow-hidden text-left p-4 w-full bg-[#fef5fa]/10 rounded-lg border-2 border-[#fef5fa]/30 text-[#fef5fa] text-lg hover:bg-[#fef5fa]/20 hover:border-[#fef5fa]/50 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition-transform duration-200 shadow-md hover:scale-105 invisible"
                    >
                        {option}
                    </button>
                ))}
             </div>
        </div>
      </div>
    );
  };
  
  const progressBarValue = view === 'quiz' ? (currentQuestionIndex / QUIZ_QUESTIONS.length) * 100 : 100;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#7d54f8] to-[#ff3071] flex flex-col items-center justify-center p-4 overflow-hidden dynamic-bg">
        <ApricotBlossomTree progress={progress} />
        <FallingPetals />
         {((view === 'quiz' && currentQuestionIndex > 0) || view === 'email') && (
            <button 
                onClick={handleBack} 
                className="absolute top-5 left-5 z-30 text-[#fef5fa]/70 hover:text-[#fef5fa] transition-colors p-2 rounded-full bg-black/10 backdrop-blur-sm"
                aria-label="Quay lại"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
         )}
        <div className="w-full max-w-md absolute top-5 px-4 z-20">
             <ProgressBar progress={progressBarValue} />
             {view === 'quiz' && (
                <p className="text-center text-[#fef5fa]/80 text-sm mt-2">
                    Câu hỏi {currentQuestionIndex + 1} trên {QUIZ_QUESTIONS.length}
                </p>
             )}
        </div>
        <main className="flex flex-col items-center justify-center flex-grow w-full z-10">
            {renderContent()}
        </main>
    </div>
  )
};

export default QuizFlow;