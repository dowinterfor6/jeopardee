import React, { useState } from 'react';

const QuestionCard = ({ question, answer, score, startTimer}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  let content;

  if (isFlipped) {
    content = (
      <div className="card-question detail">
        Q: {question}
      </div>
    )
  } else {
    content = (
      <div className="card-score detail">
        {score}
      </div>
    )
  }

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      startTimer(3);
    }
  }

  return (
    <div
      className={`question-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      {content}
    </div>
  )
}

export default QuestionCard;
