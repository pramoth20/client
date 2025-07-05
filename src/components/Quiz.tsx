import React, { useState } from 'react';

interface QuizProps {
    quizId: string;
    onComplete: (results: any) => void;
}

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

const Quiz: React.FC<QuizProps> = ({ quizId, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);

    // Sample questions for Quiz 1
    const questions: Question[] = [
        {
            id: 1,
            text: "What is the primary purpose of a medical module?",
            options: [
                "To provide entertainment",
                "To educate healthcare professionals",
                "To replace doctors",
                "To diagnose patients"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            text: "Which of the following is NOT a key component of a medical module?",
            options: [
                "Video lectures",
                "Interactive quizzes",
                "Social media integration",
                "Case studies"
            ],
            correctAnswer: 2
        },
        // Add more questions here
    ];

    const handleAnswer = (answerIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            const results = {
                quizId,
                answers,
                score: calculateScore(),
                totalQuestions: questions.length
            };
            onComplete(results);
        }
    };

    const calculateScore = () => {
        return answers.reduce((score, answer, index) => {
            return score + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);
    };

    if (showResults) {
        return (
            <div className="quiz-results">
                <h2>Quiz Results</h2>
                <p>Your score: {calculateScore()} out of {questions.length}</p>
                <button onClick={() => setShowResults(false)}>Review Answers</button>
            </div>
        );
    }

    return (
        <div className="quiz">
            <div className="question">
                <h3>Question {currentQuestion + 1} of {questions.length}</h3>
                <p>{questions[currentQuestion].text}</p>
                <div className="options">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
                            onClick={() => handleAnswer(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div className="navigation">
                <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === undefined}
                >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Quiz; 