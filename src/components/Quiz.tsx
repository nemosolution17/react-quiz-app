// Quiz.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './QuizQuestions';
import '../SuperQuiz.css';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  // get the data from api
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          'https://scs-interview-api.herokuapp.com/questions'
        );
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, []);

  // increase score if isCorrect is true. Increase question index
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  // move to next question
  const onNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="Quiz">
      {showResult ? (
        <div>
          <h2>Super Quiz Completed!</h2>
          <p>You answered {score} out of {questions.length} questions correctly.</p>
        </div>
      ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
        <Question
          questionData={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          onNextQuestion={onNextQuestion}
        />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
