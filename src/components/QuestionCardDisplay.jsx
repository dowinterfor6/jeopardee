import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const QuestionCardDisplay = ({ content, displayQuestion, isFlipped }) => {
  const cardDisplayRef = useRef();
  
  useEffect(() => {
    if (isFlipped) {
      const contentComponent = document.querySelector(".question-board-container");
      const { top } = contentComponent.getBoundingClientRect();
      const { height, width, margin } = getComputedStyle(contentComponent);
      // TODO: idk why it's off by one grid
      // TODO: easing formula seems to not be working
      gsap.to(cardDisplayRef.current, {
        top: `${top + 75}px`,
        left: margin,
        height,
        width,
        duration: 1
      })
    }
  }, [isFlipped]);

  // When card is about to be flipped back over
  useEffect(() => {
    if (!displayQuestion.open && isFlipped) {
      // TODO: Display correct/incorrect answer, close after delay
      // hardcoded
      gsap.to(cardDisplayRef.current, {
        opacity: 0,
        duration: 1
      }).then(() => cardDisplayRef.current.style.display = "none");
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
      {content}
    </div>
  )
}

export default QuestionCardDisplay;
