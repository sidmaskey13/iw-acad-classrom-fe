import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Card, Button, Dropdown, Form, FormGroup, Divider, Container, Modal} from "semantic-ui-react";

import {getStudentOwnAllSubmissions} from "../../redux/assignment/action";
import {Redirect} from "react-router-dom";

class StudentSubmissions extends Component {

    componentDidMount() {
        this.props.getStudentOwnAllSubmissions()
    }

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        const {submission}=this.props;
        return (
            <Fragment>
                <div className="mt-2">
                    {
                        submission?submission.map(assign=>(
                            <Card key={assign.id}>
                                <Card.Content>
                                    <strong>From: {assign.userName}</strong><br/>
                                    <i>Created at: {assign.created_at}</i><br/>
                                    Link: <a href={assign.link} download>Link</a><br/>
                                    File: <a href={assign.file} download>File</a>
                                </Card.Content>
                            </Card>
                        )):"No submissions"
                    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps=state=>({
    submission:state.assignment.submission,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{getStudentOwnAllSubmissions})(StudentSubmissions);
