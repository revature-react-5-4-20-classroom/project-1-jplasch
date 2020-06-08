import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { User } from './models/User';
import { Jumbotron } from 'reactstrap';
import { BrowserRouter as Router,
        Switch,
        Route,
        Redirect
} from 'react-router-dom';
import { TopNav } from './components/top-nav';
import { LoginForm } from './components/login';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedInUser: null,
    };
  }

  updateLoggedInUser = (u: User) => {
    this.setState({
      loggedInUser: u,
    });
  };

  logoutUser = () => {
    this.setState({
      loggedInUser: null,
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <TopNav
            logoutUser={this.logoutUser}
            loggedInUser={this.state.loggedInUser}
            />
            <Jumbotron>
              <h1 className="display-4"><span role="img" aria-label="ERS App banner with PLACEHOLDER">Expense Reimbursement System</span></h1>
            </Jumbotron>
            <Switch>
              {/* Redirects peeps hitting root url toe ither homr or login */}
              <Route exact path="/">
                {this.state.loggedInUser ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              {/* Route to login form */ }
              <Route path="/login" render={(props:any) => {
                return (
                  <LoginForm {...props} updateUser={this.updateLoggedInUser} />
                );
              }} />
              {/* Placeholder for home page */}
              <Route path="/home">
                <h2>
                  Welcome{""}
                  {this.state.loggedInUser ? ` home, ${this.state.loggedInUser.username}!` : ", please login"}
                </h2>
              </Route>
              <Route exact path="/reimbursements">
                <h2>
                  Reimbursements
                </h2>
              </Route>
              {/* Toute to private users page, only accessible by Admin */}
            </Switch>
        </Router>
      </div>
    )
  }
};
