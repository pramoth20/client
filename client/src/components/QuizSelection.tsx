import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Quiz from './Quiz';
import IntroForm from './IntroForm';

interface QuizSelectionProps {
    onQuizComplete: (quizId: string, results: any) => void;
}

const QuizSelection: React.FC<QuizSelectionProps> = ({ onQuizComplete }) => {
    const [activeTab, setActiveTab] = useState<'quiz1' | 'quiz2'>('quiz1');
    const [introCompleted, setIntroCompleted] = useState(false);
    const [videoCompleted, setVideoCompleted] = useState(false);
    const [quiz1Completed, setQuiz1Completed] = useState(false);
    const [introData, setIntroData] = useState<any>(null);

    const handleIntroComplete = (data: any) => {
        setIntroData(data);
        setIntroCompleted(true);
    };

    const handleVideoComplete = () => {
        setVideoCompleted(true);
    };

    const handleQuiz1Complete = (results: any) => {
        setQuiz1Completed(true);
        onQuizComplete('quiz1', { ...results, introData });
    };

    return (
        <div className="quiz-selection">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'quiz1' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quiz1')}
                >
                    Development of the Anterior Cruciate Ligament
                </button>
                <button
                    className={`tab ${activeTab === 'quiz2' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quiz2')}
                    disabled={!quiz1Completed}
                >
                    Quiz 2
                </button>
            </div>

            <div className="content">
                {activeTab === 'quiz1' && (
                    <div className="quiz-module">
                        {!introCompleted ? (
                            <IntroForm onComplete={handleIntroComplete} />
                        ) : !videoCompleted ? (
                            <VideoPlayer onComplete={handleVideoComplete} />
                        ) : (
                            <Quiz
                                quizId="quiz1"
                                onComplete={handleQuiz1Complete}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'quiz2' && quiz1Completed && (
                    <div className="quiz-module">
                        <p>Quiz 2 content will be available after completing Quiz 1</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizSelection; 