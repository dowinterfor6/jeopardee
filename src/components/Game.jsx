import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameLanding from './GameLanding';
import GameRound from './GameRound';

const Game = () => {
  const RESET_TIMER = "RESETTIMER";
  const START_TIMER = "STARTTIMER";

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
      default:
        return nextState;
    }
  }

  const initialState = {
    timer: {
      time: 0,
      currTime: 0,
      startTimer: false,
    },
    gameState: {

    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="game-container">
      <Router>
        <Switch>
          <Route path="/room/:roomId/results">
            Results
          </Route>
          <Route path="/room/:roomId/round/:round">
            <GameRound
              state={state}
              dispatch={dispatch}
              RESET_TIMER={RESET_TIMER}
              START_TIMER={START_TIMER}
            />
          </Route>
          <Route path="/room/:roomId">
            <GameLanding/>
          </Route>
        </Switch>
      </Router>
    </section>
  )
}

export default Game;