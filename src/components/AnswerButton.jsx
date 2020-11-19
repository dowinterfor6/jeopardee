import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const AnswerButton = ({
  state,
  setIsAnswerable,
  addScore,
  resetTimer,
  setDisplayQuestion,
}) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!state.answerable.locked) {
      // TODO: Temp solution
      const isAnswerEquivalent = 
        answer.toLowerCase().split(' ').join('') === state.answerable.answer.toLowerCase().split(' ').join('');

      if (isAnswerEquivalent) {
        // Add score
        addScore(state.answerable.score)
        setDisplayQuestion(false, true, answer);
      } else {
        // Minus score
        addScore(-1 * state.answerable.score)
        setDisplayQuestion(false, false, answer);
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
            id="userTextInput"
            type="text"
            placeholder="Answer..."
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
            required
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
