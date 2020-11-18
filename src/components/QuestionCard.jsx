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
  username
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardRef = useRef();

  let content;

  if (isFlipped) {
    // TODO: Handle question too long
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

  const handleCardClick = () => {
    if (!isFlipped && state.answerable.locked) {
      setIsFlipped(true);
      setDisplayQuestion(true, false, '');
      setIsAnswerable(false, answer, score);
      // startTimer(5);
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
        isFlipped={isFlipped}
        startTimer={startTimer}
        username={username}
      />
    </>
  )
}

export default QuestionCard;
