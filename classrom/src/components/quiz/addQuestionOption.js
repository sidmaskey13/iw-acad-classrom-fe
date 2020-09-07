import React, {Component} from 'react';
import {connect} from "react-redux";
import {addPost} from "../../redux/post/action";
import {Button, Container, Divider, Form, Header, Modal} from "semantic-ui-react";

class AddQuestionOptionsForm extends Component {
    state={
        title:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        modalOpen:false
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    onSubmit=(e)=>{
        e.preventDefault();
        const {title,option1,option2,option3,option4}=this.state
        const newPost={title,option1,option2,option3,option4}
        // this.props.addPost(newPost)
        this.setState({title:'', option1:'', option2:'', option3:'', option4:'',})
    };
    render() {
        const {title,option1,option2,option3,option4}=this.state
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
                    <Form.Input fluid
                                label='Option 1'
                                name="option1"
                                placeholder="option 1"
                                value={option1}
                                onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 2'
                                name="option2"
                                placeholder="Option 2"
                                value={option2}
                                onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 3'
                                name="option3"
                                placeholder="Option 3"
                                value={option3}
                                onChange={this.handleChange}/>
                    <Form.Input fluid
                                label='Option 4'
                                name="option4"
                                placeholder="Option 4"
                                value={option4}
                                onChange={this.handleChange}/>
                    <button type="submit" className="btn btn-primary">Save</button>
                </Form>
            </Container>
        );
    }
}

export default connect(null,{addPost})(AddQuestionOptionsForm);