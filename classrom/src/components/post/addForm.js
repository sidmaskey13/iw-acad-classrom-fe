import React, {Component} from 'react';
import {connect} from "react-redux";
import {addPost} from "../../redux/post/action";
import {Button, Container, Form, Header, Modal} from "semantic-ui-react";

class AddPostForm extends Component {
    state={
        title:'',
        body:'',
        modalOpen:false
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    handleModalChange=()=>{
      this.setState({
          modalOpen:!this.state.modalOpen
      })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {title,body}=this.state
        const newPost={title,body}
        this.props.addPost(newPost)
        this.setState({title:'', body:'', modalOpen:false})
    };
    render() {
        const {title,body,modalOpen}=this.state
        return (
            <Container className="mt-1">
                <Modal
                    size="mini"
                    centered={true}
                    onClose={() => this.handleModalChange()}
                    onOpen={() => this.handleModalChange()}
                    open={modalOpen}
                    trigger={<Button>Add Post</Button>}
                >
                    <Modal.Header>Add Post</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
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
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Container>
        );
    }
}

export default connect(null,{addPost})(AddPostForm);