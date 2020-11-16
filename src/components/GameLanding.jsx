import React from 'react';
import { Link, useParams } from 'react-router-dom';

const GameLanding = ({ setRound }) => {
  // TODO: Check valid name before navigating
  // const { roomId } = useParams();

  return (
    <section className="game-landing-container">
      <label>
        Enter a name!
        <input type="text"/>
      </label>
      {/* <Link className="game-button" to={`/room/${roomId}/round/1`}> */}
      <button
        className="game-button"
        onClick={() => setRound(1)}
      >
        Start the game!
      </button>
      {/* </Link> */}
    </section>
  )
}

export default GameLanding;
