import React, { useEffect, useReducer } from 'react';
import GameLanding from './GameLanding';
import GameRound from './GameRound';
import { getGameQuestions } from '../utils';

const Game = () => {
  const RESET_TIMER = "RESETTIMER";
  const START_TIMER = "STARTTIMER";
  const SET_ANSWERABLE = "SETANSWERABLE";
  const ADD_SCORE = "ADDSCORE";
  const SET_ROUND = "SETROUND";
  const SET_DISPLAY_QUESTION = "SETDISPLAYQUESTION";
  const SET_USERNAME = "SETUSERNAME";
  const SET_GAME_QUESTIONS = "SETGAMEQUESTIONS";

  const reducer = (state, action) => {
    Object.freeze(state);

    let nextState = Object.assign({}, state);

    switch(action.type) {
      case RESET_TIMER:
        nextState.timer = {
          time: 0,
          currTime: 0,
          startTimer: false
        }
        return nextState;
      case START_TIMER:
        nextState.timer = action.payload;
        nextState.timer.currTime = nextState.timer.time;
        return nextState;
      case SET_ANSWERABLE:
        nextState.gameState.answerable.locked = action.payload.locked;
        nextState.gameState.answerable.score = action.payload.score;
        if (action.payload.answer.length > 0) {
          nextState.gameState.answerable.answer = action.payload.answer;
        }
        return nextState;
      case ADD_SCORE:
        nextState.score = nextState.score + action.payload;
        return nextState;
      case SET_ROUND:
        nextState.gameState.round = action.payload;
        // TODO: Fix answer persisting
        nextState.displayQuestion = {
          open: false,
          correct: false,
          userAnswer: '',
        }
        return nextState;
      case SET_DISPLAY_QUESTION:
        nextState.gameState.displayQuestion = action.payload;
        return nextState;
      case SET_USERNAME:
        nextState.username = action.payload;
        return nextState;
      case SET_GAME_QUESTIONS:
        nextState.gameQuestions = action.payload;
        return nextState;
      default:
        return nextState;
    }
  }

  const initialState = {
    username: '',
    score: 0,
    timer: {
      time: 0,
      currTime: 0,
      startTimer: false,
    },
    gameState: {
      answerable: {
        locked: true,
        answer: '',
        score: 0,
      },
      round: 0,
      displayQuestion: {
        open: false,
        correct: false,
        userAnswer: '',
      }
    },
    gameQuestions: []
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setRound = (round) => dispatch({
    type: SET_ROUND,
    payload: round,
  });

  const setDisplayQuestion = (open, correct, userAnswer) => dispatch({
    type: SET_DISPLAY_QUESTION,
    payload: {
      open,
      correct, 
      userAnswer
    },
  });

  const setUsername = (username) => dispatch({
    type: SET_USERNAME,
    payload: username,
  });

  const setGameQuestions = (gameQuestions) => dispatch({
    type: SET_GAME_QUESTIONS,
    payload: gameQuestions
  })

  useEffect(() => {
    setGameQuestions(getGameQuestions());
  }, []);

  return (
    <section className="game-container">
      {state.gameState.round === 0 ?
        <GameLanding
          setRound={setRound}
          setUsername={setUsername}
        />
        :
        <GameRound
          state={state}
          dispatch={dispatch}
          RESET_TIMER={RESET_TIMER}
          START_TIMER={START_TIMER}
          SET_ANSWERABLE={SET_ANSWERABLE}
          ADD_SCORE={ADD_SCORE}
          setRound={setRound}
          setDisplayQuestion={setDisplayQuestion}
        />
      }
    </section>
  )
}

export default Game;