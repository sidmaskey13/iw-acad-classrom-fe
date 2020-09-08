import React, {Component} from 'react';
import {connect} from "react-redux";
import {addQuestionOption} from "../../redux/quiz/action";
import {Button, Checkbox, Container, Divider, Form, Header, Modal} from "semantic-ui-react";

class AddQuestionOptionsForm extends Component {
    state={
        title:'',
        option1:'',
        option1_correct:false,
        option2_correct:false,
        option3_correct:false,
        option4_correct:false,
        option2:'',
        option3:'',
        option4:'',
        sendBtn:true,
        quiz : this.props.quiz_id
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    onSubmit=(e)=>{
        e.preventDefault();
        const {quiz,title,option1,option2,option3,option4,option1_correct,option2_correct,option3_correct,option4_correct,sendBtn}=this.state
        this.setState({sendBtn:false})
        // const newQuestion={quiz,title,option1,option2,option3,option4,option1_correct,option2_correct,option3_correct,option4_correct}
        const newQuestion={}
        console.log(newQuestion)
        // this.props.addQuestionOption(newQuestion)
        this.setState({title:'',
            option1:'',
            option1_correct:false,
            option2_correct:false,
            option3_correct:false,
            option4_correct:false,
            option2:'',
            option3:'',
            option4:'',
            sendBtn:true})
    };
    render() {
        const {title,option1,option2,option3,option4,option1_correct,option2_correct,option3_correct,option4_correct,sendBtn}=this.state
        return (
            <Container className="mt-1">
                <Form onSubmit={this.onSubmit}>
                    <Form.Input fluid
                                label='Question'
                                name="title"
                                placeholder="title"
                                value={title}
                                onChange={this.handleChange}/>

                    <Divider/>
                    <Divider/>
                    Correct:<Checkbox value={option1_correct} name="option1_correct" onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 1'
                                name="option1"
                                placeholder="option 1"
                                value={option1}
                                onChange={this.handleChange}/>
                    <Divider/>

                    Correct:<Checkbox value={option2_correct} name="option2_correct" onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 2'
                                name="option2"
                                placeholder="Option 2"
                                value={option2}
                                onChange={this.handleChange}/>
                    <Divider/>

                    Correct:<Checkbox value={option3_correct} name="option3_correct" onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 3'
                                name="option3"
                                placeholder="Option 3"
                                value={option3}
                                onChange={this.handleChange}/>
                    <Divider/>

                    Correct:<Checkbox value={option4_correct} name="option4_correct" onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 4'
                                name="option4"
                                placeholder="Option 4"
                                value={option4}
                                onChange={this.handleChange}/>
                    {sendBtn?<button type="submit" className="btn btn-primary">Save</button>:""}
                </Form>
            </Container>
        );
    }
}

export default connect(null,{addQuestionOption})(AddQuestionOptionsForm);