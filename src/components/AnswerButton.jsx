import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const AnswerButton = ({
  state,
  setIsAnswerable,
  addScore,
  resetTimer,
  setDisplayQuestion
}) => {
  const [answer, setAnswer] = useState("");

  // TODO: Alt method, press button, then type answer

  // To handle both button press or enter
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!state.answerable.locked) {
      if (answer === state.answerable.answer) {
        // Add score
        addScore(state.answerable.score)
        setDisplayQuestion(false, true, answer);
        console.log("YAY: ", state.answerable.score);
      } else {
        // Minus score
        addScore(-1 * state.answerable.score)
        setDisplayQuestion(false, false, answer);
        console.log("wrong");
      }
      setAnswer("");
      setIsAnswerable(true, "", 0);
      resetTimer();
    };
  };

  return (
    <div className="answer-button-container">
      <form onSubmit={handleAnswerSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Answer..."
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          />
          <button type="submit" className="answer-button">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default AnswerButton;
