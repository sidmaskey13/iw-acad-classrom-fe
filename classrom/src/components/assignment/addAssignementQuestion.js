import React, {Component} from 'react';
import {connect} from "react-redux";
import {addAssignementQuestion} from "../../redux/assignment/action";
import {Button, Container, Form, Header, Modal} from "semantic-ui-react";
import {toast} from "react-toastify";
import DateTimePicker from 'react-datetime-picker';

class AddAssignementQuestion extends Component {
    state={
        title:'',
        deadline:'',
        modalOpen:false,
        file:null,

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
        const {title,deadline,file}=this.state;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('deadline_date', deadline);
        if(file!==null){formData.append('file',file,file.name)};
        this.props.addAssignementQuestion(formData)
        this.setState({title:'',
            deadline:'',
            modalOpen:false,
            file:"",})

    };
    fileSelectHandler = event =>{
        this.setState({
            file:event.target.files[0]
        })
    };
    render() {
        const {title,deadline,modalOpen}=this.state
        return (
            <Container className="mt-1">
                <Modal
                    size="mini"
                    centered={true}
                    onClose={() => this.handleModalChange()}
                    onOpen={() => this.handleModalChange()}
                    open={modalOpen}
                    trigger={<Button>Add Assignment</Button>}
                >
                    <Modal.Header>Add Assignment</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Input fluid
                                            label='Title'
                                            name="title"
                                            placeholder="title"
                                            value={title}
                                            onChange={this.handleChange}/>
                                <Form.Field>
                                    <label>File</label>
                                    <input type="file" name="myfile" onChange={this.fileSelectHandler}/>
                                </Form.Field>

                                <Form.Input fluid
                                            label='Deadline'
                                            name="deadline"
                                            placeholder="deadline"
                                            value={deadline}
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

export default connect(null,{addAssignementQuestion})(AddAssignementQuestion);