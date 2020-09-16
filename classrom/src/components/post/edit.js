import React, {Component} from 'react';
import {connect} from "react-redux";
import {editPost} from "../../redux/post/action";
import {Button, Container, Form, Header, Modal} from "semantic-ui-react";

class EditPostForm extends Component {
    state={
        title:this.props.location.title,
        body:this.props.location.body,
        id : this.props.match && this.props.match.params && this.props.match.params.id,
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {title,body,id}=this.state
        const newPost={title,body}
        this.props.editPost(id,newPost)
        this.setState({title:'', body:''})
        this.props.history.goBack()
    };
    render() {
        const {title,body}=this.state
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Input fluid
                            label='Title'
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={this.handleChange}/>
                <Form.TextArea
                    label='Body'
                    name="body"
                    value={body}
                    onChange={this.handleChange}/>
                <button type="submit" className="btn btn-primary">Save</button>
            </Form>
        );
    }
}

export default connect(null,{editPost})(EditPostForm);