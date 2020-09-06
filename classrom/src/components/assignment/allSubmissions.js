import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Card, Button, Dropdown, Form, FormGroup, Divider, Container, Modal} from "semantic-ui-react";

import {getAllSubmissionByQuestion} from "../../redux/assignment/action";
import {Link, Redirect} from "react-router-dom";

class AllSubmissions extends Component {
    state={
        id:this.props.location.data
    };
    componentDidMount() {
        console.log(this.state.id)
        this.props.getAllSubmissionByQuestion(this.state.id)
    }


    render(){
        // if(this.props.isAuthenticated){
        //     return <Redirect to="/"/>
        // }
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
export default connect(mapStateToProps,{getAllSubmissionByQuestion})(AllSubmissions);
