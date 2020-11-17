import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  // TODO: Use websockets and roomid
  
  return (
    <section className="landing-container">
      <h1 className="landing-header">Jeopardee</h1>
      <div className="under-header">
        RIP Alex Trebek
      </div>
      <Link className="landing-button" to="/room/69420">
        Start a game
      </Link>
      {/* <Link className="landing-button" to="/">
        Join a game
      </Link> */}
    </section>
  )
}

export default Landing;
