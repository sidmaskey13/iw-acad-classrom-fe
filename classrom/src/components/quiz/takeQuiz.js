import React, {Component} from 'react';
import {getQuestion,clearQuestionOptionList,deleteQuestionOptions,sendScoreDate} from "../../redux/quiz/action";
import {connect} from "react-redux";
import {Button, Card, Checkbox, Form} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";


class TakeQuiz extends Component {
    state={
         quiz_id : this.props.match && this.props.match.params && this.props.match.params.id,
        score:0,
        answers:[],
    };

    componentDidMount() {
        console.log(this.state.id)
        this.props.getQuestion(this.state.quiz_id)
    }

    componentWillUnmount() {
        this.props.clearQuestionOptionList()
    }

    sendData=(total)=>{
        const score= this.state.answers.length
        const scoreData=`${score}/${total}`

        alert(scoreData)

        const {quiz_id}=this.state;
        const quiz=quiz_id
        const scoreDataSend={quiz,score,total}
        this.props.sendScoreDate(scoreDataSend)
        this.props.history.push("/quiz");
    };
    deleteQuestion=(id)=>{
        this.props.deleteQuestionOptions(id)
    };


    handleInputChange = (question_id,e) => {
        if(e.target.value==='true'){
            this.state.answers.push(question_id)
        }
        else if(e.target.value==='false') {
            const index = this.state.answers.indexOf(question_id)
            console.log("name",index)
            if (index > -1) {
                this.state.answers.splice(index, 1)
            }
        }
    };



    render() {
        const {question}=this.props;
        const {user}=this.props.auth;
        const {quiz_id,score,totalQuestions}=this.state;
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <div className="mt-1">
                {user?user.is_staff?<Link
                    className='btn btn-secondary'
                    to={{
                        pathname: `/quiz/questions_add/${quiz_id}`,
                        data: quiz_id
                    }}>
                    Add
                </Link>:"":""}
                <h1>Questions</h1>
                {question?
                    <div>
                        Total Questions:{question.length}
                        {question.map((ques,index)=>
                            <Card key={ques.id} fluid>
                                <Card.Content header={ques.title}/>
                                <Card.Content extra>
                                    {ques.options?ques.options.map(op=>
                                        <p><input type="radio" id="male" name={ques.id} value={op.correct?true:false} onChange={event => this.handleInputChange(ques.id, event)}/> {op.option}</p>
                                    ):""}
                                    {user?user.is_staff?<Button onClick={id=>this.deleteQuestion(ques.id)} size="tiny"  color='red'>Delete</Button>:"":""}
                                </Card.Content>
                            </Card>
                        )}
                        <Button onClick={()=>this.sendData(question.length)}>Send</Button>
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
export default connect(mapStateToProps,{getQuestion,clearQuestionOptionList,deleteQuestionOptions,sendScoreDate})(TakeQuiz);
