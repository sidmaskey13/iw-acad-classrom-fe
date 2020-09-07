import React, {Component} from 'react';
import {getQuestion} from "../../redux/quiz/action";
import {connect} from "react-redux";
import {Button, Card, Checkbox, Form} from "semantic-ui-react";
import {Link} from "react-router-dom";
import AddQuestionOptionsForm from "./addQuestionOption";
import AddAssignementQuestion from "../assignment/addAssignementQuestion";

class QuizQuestions extends Component {
    state={
        id:this.props.location.data
    };
    componentDidMount() {
        console.log(this.state.id)
        this.props.getQuestion(this.state.id)
    }
    sendData=()=>{

    };
    render() {
        const {question}=this.props;
        const {user}=this.props.auth;

        return (
            <div>
                {user?user.is_staff?<AddQuestionOptionsForm/>:"":""}
                <h1>Questions</h1>
                {question?
                    <div>
                        {question.map(q=>
                            <Card key={question.id} fluid>
                                <Card.Content header={q.title}/>
                                <Card.Content extra>
                                    {q.options.map(o=>
                                        <p><Checkbox /> {o.option}</p>
                                    )}
                                </Card.Content>
                            </Card>
                        )}
                        <Button onClick={this.sendData}>Send</Button>

                    </div>
                    :""}
            </div>
        );
    }
}

const mapStateToProps=state=>({
    question:state.quiz.question,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps,{getQuestion})(QuizQuestions);
