import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <Router>
      {false && <Redirect to="/signin" />}
      <Switch>
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <div className="app">
          {/* <Header /> */}
          <div className="app__body">
            <Route exact path="/" component={HomePage} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
