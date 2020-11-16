import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './components/Game';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/room/:roomId" >
            <Game />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
