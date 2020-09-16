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
import Assignmentlist from "./components/assignment/assignmentList";
import OwnPostList from "./components/post/allOwnPost";
import EditPostForm from "./components/post/edit";
import Quizlist from "./components/quiz/quizList";
import AllSubmissions from './components/assignment/allSubmissionsByQuestion'
import StudentSubmissions from './components/assignment/studentOwnSubmissons'
import AllUsers from "./components/member/allusers";
import QuizQuestions from "./components/quiz/takeQuiz";
import ScoreDataSingleStudent from "./components/quiz/scoreDataSingleStudent";
import ScoreDataAllQuiz from "./components/quiz/scoreDataAllQuiz";
import AddQuestionOptionDynamic from "./components/quiz/addQuestionOptionDynamic";

// export const mainUrl="http://127.0.0.1:8000/"
export const mainUrl="https://classromproject.herokuapp.com/"


class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser())
    document.title = "Classrom"
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
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                  <PrivateRoute exact path="/staff_register" component={StaffRegister}/>
                  <PrivateRoute exact path="/" component={Main}/>
                  <PrivateRoute exact path="/post/own_post" component={OwnPostList}/>
                  <PrivateRoute exact path="/post/edit/:id" component={EditPostForm}/>
                  <PrivateRoute exact path="/assignment" component={Assignmentlist}/>
                  <PrivateRoute exact path="/assignment/submissions" component={AllSubmissions}/>
                  <PrivateRoute exact path="/assignment/own_submissions" component={StudentSubmissions}/>
                  <PrivateRoute exact path="/quiz" component={Quizlist}/>
                  <PrivateRoute exact path="/quiz/score_student/:id" component={ScoreDataSingleStudent}/>
                  <PrivateRoute exact path="/quiz/score_all_student/:id" component={ScoreDataAllQuiz}/>
                  <PrivateRoute exact path="/quiz/questions/:id" component={QuizQuestions}/>
                  <PrivateRoute exact path="/quiz/questions_add/:id" component={AddQuestionOptionDynamic}/>
                  <PrivateRoute exact path="/all_user" component={AllUsers}/>
                </Switch>
              </Container>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
