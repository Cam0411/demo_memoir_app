
import React, { useState } from 'react';
import QuizFlow from './components/QuizFlow';
import StartScreen from './components/StartScreen';

const App: React.FC = () => {
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    const handleStartQuiz = () => {
        setIsQuizStarted(true);
    };

    if (!isQuizStarted) {
        return <StartScreen onStart={handleStartQuiz} />;
    }
    
    return <QuizFlow />;
};

export default App;