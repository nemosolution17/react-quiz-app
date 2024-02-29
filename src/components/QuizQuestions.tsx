// Quiz Question.tsx
import React, { useState, useEffect } from 'react';
import '../SuperQuiz.css';

interface QuestionProps {
  questionData: {
    imageUrl: string;
    question: string;
    options: string[];
    answer: number;
    time: number;
  };
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({
  questionData,
  onAnswer,
  onNextQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(questionData.time);
  const [correctOption, setCorrectOption] = useState<number | null>(null);

  useEffect(() => {
    setSelectedOption(null);
    setTimer(questionData.time);
    setCorrectOption(null);
  }, [questionData]);

  useEffect(() => {
    if (timer > 0) {
      // decreasing the timer
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      
  
      return () => clearInterval(interval);
    } else {
      // timer as reached 0
      if (selectedOption === null) {
        // No option was selected before the timer ended. Answer 
        // Answer is set as false and there is 4 seconds to show the correct answer before moving to next question
        setCorrectOption(questionData.answer);
        handleAnswerAndDelay(false)

        // handleAnswer(questionData.qid, seletionoption)
        
        // An option was selected before the timer ended

      } else {
        //An option was selected before the timer ended
        // Answer is checked, set as false or true and there is 4 seconds to show the correct answer before moving to next question
        const isCorrect = selectedOption === questionData.answer;
        setCorrectOption(questionData.answer);
        handleAnswerAndDelay(isCorrect)
      }
    }
  }, [timer]);

  // handle answer checking
  const handleAnswer = (isCorrect: boolean) => {
    if (selectedOption !== null) {
      onAnswer(isCorrect);
    }
  };

  // called the handle answer, move to next question (delayed for 4 seconds)
  const handleAnswerAndDelay = (isSeletedOptionCorrect: boolean) => {
    const delay = setTimeout(() => {
      handleAnswer(isSeletedOptionCorrect);
      onNextQuestion();
      clearTimeout(delay);
    }, 4000); 

  }

  // used to change color for options
  // yellow for selected option, red to mark the answer as wrong, and green to mark the right answer
  const optionClass = (index: number) => {
    if (correctOption !== null) {
      if (correctOption === index) {
        return 'Correct';
      } else if (index === selectedOption ) {
        return 'Incorrect';
      }
    }
    return selectedOption === index ? 'Selected' : '';
  };
  
  return (
    <div className="Question">
      <div className="ImageContainer">
        <img src={questionData.imageUrl} alt="Question" className="Image" />
      </div>
      <h2>{questionData.question}</h2>
      <div className="Options">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className={`Option ${optionClass(index)}`}
            onClick={() => setSelectedOption(index)}
            disabled={timer <= 0}
          >
            {option}
          </button>
        ))}
      </div>
      <p>Time Remaining: {timer} seconds</p>
    </div>
  );
};

export default Question;
