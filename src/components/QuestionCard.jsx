import React, { useEffect, useRef, useState } from 'react';
import QuestionCardDisplay from './QuestionCardDisplay';

const QuestionCard = ({
  question,
  answer,
  score,
  startTimer,
  setIsAnswerable,
  state,
  setDisplayQuestion,
  username,
  dailyDouble
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardRef = useRef();

  const actualScore = dailyDouble ? score * 2 : score;

  let content;

  if (isFlipped) {
    content = (
      <div className="card-question detail">
        {question}
      </div>
    )
  } else {
    content = (
      <div className="card-score detail">
        ${score}
      </div>
    )
  }

  const handleCardClick = (e) => {
    e.stopPropagation();

    if (!isFlipped && state.answerable.locked) {
      setIsFlipped(true);
      setDisplayQuestion(true, false, '');
      setIsAnswerable(false, answer, actualScore);
      document.getElementById("userTextInput").focus();
    }
  }

  return (
    <>
      <div
        className={`question-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
        ref={cardRef}
      >
        {content}
      </div>
      <QuestionCardDisplay
        content={content}
        displayQuestion={state.displayQuestion}
        questionAnswer={state.answerable.answer}
        isFlipped={isFlipped}
        startTimer={startTimer}
        username={username}
        dailyDouble={dailyDouble}
      />
    </>
  )
}

export default QuestionCard;
