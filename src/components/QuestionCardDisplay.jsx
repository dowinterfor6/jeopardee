import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const QuestionCardDisplay = ({
  content,
  displayQuestion,
  isFlipped,
  startTimer,
  username,
  questionAnswer,
  dailyDouble
}) => {
  const cardDisplayRef = useRef();
  const questionCardContentRef = useRef();
  const dailyDoubleRef = useRef();
  const [answer, setAnswer] = useState();
  
  useEffect(() => {
    if (isFlipped) {
      const contentComponent = document.querySelector(".content-wrapper");
      const { top, left } = contentComponent.getBoundingClientRect();
      const { height, width } = getComputedStyle(contentComponent);

      // const detailComponent = document.querySelector(".question-card-content .card-question.detail");
      const detailComponent = questionCardContentRef.current.childNodes[0];
      // TODO: idk why it's off by one grid
      // TODO: easing formula seems to not be working
      // probably due to css transitions or something
      gsap.to(cardDisplayRef.current, {
        top: `${top + 75}px`,
        left: left,
        height,
        width,
        duration: 1,
        padding: 20,
      }).then(() => {
        startTimer(10);
      })

      gsap.to(detailComponent, {
        ['font-size']: 56,
        duration: 1
      }).delay(1);

      if (dailyDouble) {
        gsap.to(dailyDoubleRef.current, {
          ['font-size']: 36,
          duration: 1
        }).delay(1);
      }
    }
  }, [isFlipped]);

  // When card is about to be flipped back over
  useEffect(() => {
    if (!displayQuestion.open && isFlipped) {
      // TODO: Handle continued guessing for MP
      setAnswer(displayQuestion.userAnswer);
  
      gsap.to(cardDisplayRef.current, {
        opacity: 0,
        duration: 1,
        display: "none"
      }).delay(3).then(
        () => {
          cardDisplayRef.current.style.display = "none";
        }
      );
    };
  }, [displayQuestion.open, isFlipped]);

  // TODO: User has to guess for correct answer to show up
  const correctAnswerDisplay = () => {
    const correctIncorrect = displayQuestion.correct ? "Correct" : "Incorrect";
    return `${correctIncorrect}, the answer was ${questionAnswer}!`
  }

  let dailyDoubleComponent;
  if (dailyDouble) {
    dailyDoubleComponent = (
      <div className="daily-double" ref={dailyDoubleRef}>
        Daily Double!
      </div>
    )
  }

  return (
    <div
      className={`
        question-card-display
        question-card
        ${isFlipped ? 'flipped' : ''}
      `}
      ref={cardDisplayRef}
    >
      {dailyDoubleComponent}
      <div className="question-card-content" ref={questionCardContentRef}>
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
          {correctAnswerDisplay()}
        </div>
      </div>
    </div>
  )
}

export default QuestionCardDisplay;
