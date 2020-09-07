import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Card, Button, Dropdown, Form, FormGroup, Divider, Container, Modal} from "semantic-ui-react";

import {getAllAssignmentQuestion,submitAssignment} from "../../redux/assignment/action";
import AddAssignementQuestion from "./addAssignementQuestion";
import {Link, Redirect} from "react-router-dom";

class AssignmentList extends Component {
    state={
        modalOpen:false,
        file:null,
        link:"",
        assignmentId:""
    };
    componentDidMount() {
        this.props.getAllAssignmentQuestion()
    }

    handleModalChange=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {link,assignmentId,file}=this.state;
        const formData = new FormData();
        formData.append('link', link);
        formData.append('assignment', assignmentId);
        if (typeof (file) == "object" && file != null) {
            formData.append('file',file,file.name);
        }
        this.props.submitAssignment(formData)
        this.setState({
            modalOpen:false,
            file:"",
            link:"",
            assignmentId:""})

    };
    fileSelectHandler = event =>{
        this.setState({
            file:event.target.files[0]
        })
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    render(){
        const {user}=this.props.auth;
        const {link,modalOpen,assignmentId}=this.state;
        // if(this.props.isAuthenticated){
        //     return <Redirect to="/"/>
        // }
        return (
            <Fragment>
                {user?user.is_staff?<AddAssignementQuestion/>:"":""}
                <div className="mt-2">
                    {
                        this.props.assignment?this.props.assignment.map(assign=>(
                            <Card key={assign.id}>
                                <Card.Content header={assign.title}/>
                                <Card.Content extra>
                                    <strong>By: {assign.deadline_date}</strong><br/>
                                    {assign.file?<p><a href={assign.file} download>Download File</a></p>:""}
                                    {user?user.is_staff?                                    <Link
                                        className='btn btn-secondary'
                                        to={{
                                            pathname: "/assignment/submissions",
                                            data:assign.id
                                        }}>
                                        Submissions (Count:{assign.submission_count})
                                    </Link>:<Modal
                                        size="mini"
                                        centered={true}
                                        onClose={() => this.handleModalChange()}
                                        onOpen={() => {this.handleModalChange();this.setState({assignmentId:assign.id})}}
                                        open={modalOpen}
                                        trigger={<Button>Submit Assignment</Button>}
                                    >
                                        <Modal.Header>Submit Assignment</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <Form onSubmit={this.onSubmit}>
                                                    <Form.Input fluid
                                                                label='Link'
                                                                name="link"
                                                                placeholder="link"
                                                                value={link}
                                                                onChange={this.handleChange}/>
                                                    <Form.Field>
                                                        <label>File</label>
                                                        <input type="file" name="myfile" onChange={this.fileSelectHandler}/>
                                                    </Form.Field>


                                                    <button type="submit" className="btn btn-primary">Save</button>
                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>:""}

                                </Card.Content>
                            </Card>
                        ))
                    :<h2>No data</h2>    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps=state=>({
    assignment:state.assignment.question,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps,{getAllAssignmentQuestion,submitAssignment})(AssignmentList);
