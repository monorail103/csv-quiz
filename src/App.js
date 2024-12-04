// src/App.js
import React, { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (results) => {
          setQuestions(results.data);
          setCurrentQuestionIndex(1);
        },
      });
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex][1];
    setIsCorrect(answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase());
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
      setIsCorrect(null);
      setShowAnswer(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <h1>クイズアプリ</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {currentQuestion && (
        <div>
          <h2>問題: {currentQuestion[0]}</h2>
          <input type="text" value={answer} onChange={handleAnswerChange} placeholder="答えを入力してください" />
          <button onClick={checkAnswer}>答えを確認</button>
          {showAnswer && (
            <div>
              <h3>{isCorrect ? '正解です！🎉' : '不正解です。😢 正解は: ' + currentQuestion[1]}</h3>
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={nextQuestion}>次の問題へ</button>
              ) : (
                <h3>クイズが終わりました！🎉</h3>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;