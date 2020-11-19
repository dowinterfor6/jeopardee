import React, { useEffect, useState } from 'react';

const FinalRound = ({
  score,
  setDisplayQuestion,
  setIsAnswerable,
  startTimer,
  state,
  setRound
}) => {
  const category = state.gameQuestions.finalRound.category;
  const { question, answer } = state.gameQuestions.finalRound.hard[0];

  const [wager, setWager] = useState(0);
  const [questionActive, setQuestionActive] = useState(false);
  const [userAnswerComponent, setUserAnswerComponent] = useState();

  const maxWager = score > 0 ? parseInt(score) : 2000;

  const handleSubmitWager = (e) => {
    e.preventDefault();

    setQuestionActive(true);

    // TODO: Delay?
    setDisplayQuestion(true, false, '');
    setIsAnswerable(false, answer, parseInt(wager));
    startTimer(7);
  }

  useEffect(() => {
    // TODO: does not display incorrect answer
    if (
      (!state.gameState.displayQuestion.open && state.gameState.displayQuestion.userAnswer) ||
      (!state.gameState.displayQuestion.open && state.timer.time === 0)
    ) {
      setUserAnswerComponent(
        <div
          className={`
            question-card-answer
            show
          `}
        >
          <span className="answer">
            { state.gameState.displayQuestion.userAnswer }
          </span>
          <div className="user">
            - { state.username }
          </div>
          <div className={`
            correct-or-incorrect
            ${state.gameState.displayQuestion.correct ? 'correct' : 'wrong'}
            `}>
            { state.gameState.displayQuestion.correct ? 'Correct!' : 'Incorrect!' }
          </div>
        </div>
      )
      // TODO: Also when fail to answer
      setTimeout(() => {
        setRound(4);
      }, 3000);
    }
  }, [state])

  let content;

  if (questionActive) {
    content = 
      <div className="content-container">
        <div className="question-container">
          <div>For ${wager}: </div>
          {question}
        </div>
        {userAnswerComponent}
      </div>
  } else {
    content = 
      <form onSubmit={handleSubmitWager}>
        <input
          type="number"
          value={wager}
          min="0"
          max={maxWager}
          onChange={({currentTarget}) => setWager(currentTarget.value)}
        />
        <input
          type="range"
          value={wager}
          min="0"
          max={maxWager}
          onChange={({currentTarget}) => setWager(currentTarget.value)}
        />
        <button className="button">
          Set Wager
        </button>
      </form>
  }

  return (
    <div className="final-round-container">
      <div className="final-round-wrapper">
        <div className={`first-part ${questionActive ? '' : 'show'}`}>
          <h4>Final Round!</h4>
          <p>Wager up to ${maxWager} {score >= 0 ? '(in debt)' : ''} for this final question about: </p>
        </div>
        <h4>{ category }</h4>
        { content }
      </div>
    </div>
  )
}

export default FinalRound;
