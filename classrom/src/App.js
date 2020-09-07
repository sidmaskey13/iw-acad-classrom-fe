import React, {Component, Fragment} from 'react';
import {Provider} from 'react-redux'
import {HashRouter as Router, Route,Switch, Redirect} from "react-router-dom";
import store from './store'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from './components/layout/header'
import Main from './components/layout/main';
import Notification from './components/layout/notification'


import Register from './components/auth/register'
import StaffRegister from './components/auth/staffRegister'
import Login from './components/auth/login';
import PrivateRoute from './components/route/private'
import {loadUser} from "./redux/auth/action";
import {Container} from "semantic-ui-react";
import Assignmentlist from "./components/assignment/assignmentlist";
import Quizlist from "./components/quiz/quizlist";
import AllSubmissions from './components/assignment/allSubmissions'
import AllUsers from "./components/member/allusers";
import QuizQuestions from "./components/quiz/quizQuestions";

// export const mainUrl="http://127.0.0.1:8000/"
export const mainUrl="https://classromproject.herokuapp.com/"


class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
        <Provider store={store}>
          <Router>
            <div>
              <Header/>
              <Notification/>
              <Container textAlign='justified'>
                <Switch>
                  <PrivateRoute exact path="/" component={Main}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/staff_register" component={StaffRegister}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/assignment" component={Assignmentlist}/>
                  <Route exact path="/assignment/submissions" component={AllSubmissions}/>
                  <Route exact path="/quiz" component={Quizlist}/>
                  <Route exact path="/quiz/questions" component={QuizQuestions}/>
                  <Route exact path="/all_user" component={AllUsers}/>
                </Switch>
              </Container>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
