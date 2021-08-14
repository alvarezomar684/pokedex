import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import './App.css';
import { Pokedex } from "./Pokedex";

function App() {
  

  return (
    <Router>
      <div className="container-fluid">
        <div className="row" >
          <Switch>
            <Route path="/pokedex" >
              <Pokedex/>
            </Route>
            <Route path="/" >
              <Redirect to="/pokedex" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
