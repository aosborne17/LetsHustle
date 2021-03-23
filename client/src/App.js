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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HustlesPage from "./pages/HustlesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import RunningTasksPage from "./pages/RunningTasksPage";
import SettingsPage from "./pages/SettingsPage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      {false && <Redirect to="/signin" />}
      <Switch>
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
        <div className="app">
          <Sidebar />
          <div className="app__body">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/hustles" component={HustlesPage} />
            <Route exact path="/analytics" component={AnalyticsPage} />
            <Route exact path="/runningtasks" component={RunningTasksPage} />
            <Route exact path="/settings" component={SettingsPage} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
