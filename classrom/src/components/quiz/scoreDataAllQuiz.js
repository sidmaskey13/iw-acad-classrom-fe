import React, {Component} from 'react';
import {getScoreQuizAllStudent,clearScore} from "../../redux/quiz/action";
import {connect} from "react-redux";
import {Button, Card, Checkbox, Form, Table} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";


class ScoreDataAllQuiz extends Component {
    state={
        quiz_id : this.props.match && this.props.match.params && this.props.match.params.id,
    };

    componentDidMount() {
        this.props.getScoreQuizAllStudent(this.state.quiz_id)
    }
    componentWillUnmount() {
        this.props.clearScore()
    }

    render() {
        const {score}=this.props;
        const {user}=this.props.auth;
        const {quiz_id}=this.state;
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <div className="mt-1">
                <h4>All Scores</h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                            <Table.HeaderCell>Created At</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {score?score.map(s=><Table.Row>
                            <Table.Cell>{s.userName}</Table.Cell>
                            <Table.Cell>{s.score}/{s.total}</Table.Cell>
                            <Table.Cell>{s.created_at}</Table.Cell>
                        </Table.Row>):""}
                    </Table.Body>
                </Table>

            </div>
        );
    }
}

const mapStateToProps=state=>({
    score:state.quiz.score,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{getScoreQuizAllStudent,clearScore})(ScoreDataAllQuiz);
