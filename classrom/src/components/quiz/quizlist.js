import React, {Component, Fragment} from 'react';
import {getQuizList,addQuiz} from "../../redux/quiz/action";
import {connect} from "react-redux";
import {Button, Card, Container, Divider, Dropdown, Form, FormGroup, Modal} from "semantic-ui-react";
import {Link} from "react-router-dom";
import AddQuestionOptionsForm from "./addQuestionOption";

class Quizlist extends Component {
    state={
        title:"",
        deadline_date:""
    };
    componentDidMount() {
        this.props.getQuizList()
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {title,deadline_date}=this.state;
        const newQuiz={title,deadline_date}
        this.props.addQuiz(newQuiz)
        this.setState({title:'', deadline_date:''})
    };

    render() {
        const {user}=this.props.auth;
        const {title,deadline_date}=this.state;

        return (
            <div>
                {user?user.is_staff?
                <Form onSubmit={this.onSubmit}>
                    <Form.Input fluid
                                label='Title'
                                name="title"
                                placeholder="title"
                                value={title}
                                onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='DeadLine Date'
                                name="deadline_date"
                                placeholder="deadline_date"
                                value={deadline_date}
                                onChange={this.handleChange}/>
                    <button type="submit" className="btn btn-primary">Save</button>
                </Form>:"":""}
                <h1>Quiz</h1>
                {
                    this.props.quiz.map(q=>(
                        <Card key={q.id} fluid>
                            <Card.Content header={q.title}/>
                            <Card.Content description={q.deadline_date}/>
                            <Link
                                className='btn btn-secondary'
                                to={{
                                    pathname: "/quiz/questions",
                                    data: q.id
                                }}>
                                Take
                            </Link>

                        </Card>
                    ))

                }
            </div>
        );
    }
}


const mapStateToProps=state=>({
    quiz:state.quiz.quiz,
    auth: state.auth
});
export default connect(mapStateToProps,{getQuizList,addQuiz})(Quizlist);
