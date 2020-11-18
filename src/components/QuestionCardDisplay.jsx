import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const QuestionCardDisplay = ({
  content,
  displayQuestion,
  isFlipped,
  startTimer,
  username
}) => {
  const cardDisplayRef = useRef();
  const [answer, setAnswer] = useState();
  
  useEffect(() => {
    if (isFlipped) {
      const contentComponent = document.querySelector(".content-wrapper");
      const { top, left } = contentComponent.getBoundingClientRect();
      const { height, width } = getComputedStyle(contentComponent);
      // TODO: idk why it's off by one grid
      // TODO: easing formula seems to not be working
      // probably due to css transitions or something
      gsap.to(cardDisplayRef.current, {
        top: `${top + 75}px`,
        left: left,
        height,
        width,
        duration: 1
      }).then(() => {
        startTimer(5);
      })
    }
  }, [isFlipped]);

  // When card is about to be flipped back over
  useEffect(() => {
    if (!displayQuestion.open && isFlipped) {
      // Do not display correct answer if wrong
      // TODO: Handle continued guessing for MP
      setAnswer(displayQuestion.userAnswer);
  
      gsap.to(cardDisplayRef.current, {
        opacity: 0,
        duration: 1
      }).delay(3).then(
        () => cardDisplayRef.current.style.display = "none"
      );
    };
  }, [displayQuestion.open, isFlipped])

  return (
    <div
      className={`
        question-card-display
        question-card
        ${isFlipped ? 'flipped' : ''}
      `}
      ref={cardDisplayRef}
    >
      <div className="question-card-content">
        {content}
      </div>
      <div
        className={`
        question-card-answer
        ${
          !displayQuestion.open && isFlipped && answer ?
          'show'
          :
          ''
        }
        `}
      >
        <span className="answer">
          { answer }
        </span>
        <div className="user">
          - { username }
        </div>
        <div className={`
          correct-or-incorrect
          ${displayQuestion.correct ? 'correct' : 'wrong'}
          `}>
          { displayQuestion.correct ? 'Correct!' : 'Incorrect!' }
        </div>
      </div>
    </div>
  )
}

export default QuestionCardDisplay;
