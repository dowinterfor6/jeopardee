import React, { useEffect, useState } from 'react';
import tempData from '../temp-backend';
import { shuffle } from 'lodash';
import QuestionCard from './QuestionCard';
import TimeRemaining from './TimeRemaining';
import AnswerButton from './AnswerButton';
import FinalRound from './FinalRound';
import Results from './Results';

const GameRound = ({
  state,
  dispatch,
  RESET_TIMER,
  START_TIMER,
  SET_ANSWERABLE,
  ADD_SCORE,
  setRound,
  setDisplayQuestion
}) => {
  const [questionBoardComponent, setQuestionBoardComponent] = useState();

  // TODO: Track used questions to not repeat for round 2
  // or just integrate it part of api

  // TODO: Round 4 = results, and offer option to reset to round 0
  const resetTimer = () => dispatch({
    type: RESET_TIMER
  });

  const startTimer = (time) => dispatch({
    type: START_TIMER,
    payload: {
      time,
      currTime: 0,
      startTimer: true,
    }
  });

  const setIsAnswerable = (locked, answer, score) => dispatch({
    type: SET_ANSWERABLE,
    payload: {
      locked,
      answer,
      score
    }
  });

  const addScore = (score) => dispatch({
    type: ADD_SCORE,
    payload: score
  })

  const round = parseInt(state.gameState.round);
  const baseScore = 200 * round;

  useEffect(() => {
    if (round === 1 || round === 2) {
      const questions = tempData.questions.slice(0, 6);
  
      const parseQuestions = (questions, number, scoreMultiplier) => (
        shuffle(questions).slice(0, number).map(({ question, answer }, idx) => (
          <li className="card" key={`${round}-card-${idx}`}>
            <QuestionCard
              question={question}
              answer={answer}
              score={scoreMultiplier * baseScore + baseScore * idx}
              startTimer={startTimer}
              setIsAnswerable={setIsAnswerable}
              state={state.gameState}
              setDisplayQuestion={setDisplayQuestion}
              username={state.username}
            />
          </li>
        ))
      );
  
      const categoryContainer = questions.map(({ category, easy, medium, hard}, idx) => (
        <ul className="category-container" key={`category-${idx}`}>
          <li className="category-header">{category}</li>
          {parseQuestions(easy, 2, 1)}
          {parseQuestions(medium, 2, 3)}
          {parseQuestions(hard, 1, 5)}
        </ul>
      ));
  
      setQuestionBoardComponent(
        <section className="question-board-container">
          <div className="content-wrapper">
            {categoryContainer}
          </div>
        </section>
      )
    } else if (round === 3) {
      // FinalRound
      setQuestionBoardComponent(
        <section className="question-board-final">
          <FinalRound
            score={state.score}
            startTimer={startTimer}
            setIsAnswerable={setIsAnswerable}
            setDisplayQuestion={setDisplayQuestion}
            state={state}
            username={state.username}
            setRound={setRound}
          />
        </section>
      )
    } else {
      // Handle edge cases as well as results
      setQuestionBoardComponent(
        <section className="question-board-results">
          <Results username={state.username} score={state.score}/>
        </section>
      )
    }
    // TODO: Grab all questions in Game component, this is causing
    // refresh every display question update
  }, [round, state.gameState.displayQuestion, state.username])

  return (
    <section className="game-round-container">
      <div className="top-bar">
        <div className="top">
          <div className="round-header">
            {/* TODO: Adjust this to be better lmao */}
            {state.gameState.displayQuestion.open ? 
              "Get ready to answer..."
              :
              "Select a category"
            }
          </div>
          <div className="round-info">
            <div className="score">
              <h3>
                Score: ${state.score}
              </h3>
            </div>
            <div className="round-display">
              <h3>
                Round {round}
              </h3>
            </div>
          </div>
        </div>
        <button
          className="dev"
          onClick={() => setRound(state.gameState.round + 1)}
        >
          Next Round (Dev)
        </button>
      </div>

      <div className="content">
        {questionBoardComponent}
      </div>

      <div className="bottom-bar">
        <TimeRemaining
          resetTimer={resetTimer}
          timer={state.timer}
          maxTime={5}
          setIsAnswerable={setIsAnswerable}
          setDisplayQuestion={setDisplayQuestion}
          gameState={state.gameState}
        />
        <AnswerButton
          state={state.gameState}
          setIsAnswerable={setIsAnswerable}
          addScore={addScore}
          resetTimer={resetTimer}
          setDisplayQuestion={setDisplayQuestion}
        />
      </div>
    </section>
  )
}

export default GameRound;
