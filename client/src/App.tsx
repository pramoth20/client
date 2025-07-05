import React from 'react';
import QuizSelection from './components/QuizSelection';
import './App.css';

function App() {
  const handleQuizComplete = async (quizId: string, results: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/quiz-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId,
          ...results,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save quiz results');
      }

      const data = await response.json();
      console.log('Quiz results saved:', data);
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Medical Module Quiz System</h1>
      </header>
      <main>
        <QuizSelection onQuizComplete={handleQuizComplete} />
      </main>
    </div>
  );
}

export default App;
