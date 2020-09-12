import React, {Component, Fragment} from 'react';
import {getQuizList,addQuiz,deleteQuiz} from "../../redux/quiz/action";
import {connect} from "react-redux";
import {Button, Card, Container, Divider, Dropdown, Form, FormGroup, Modal} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";

class QuizList extends Component {
    state={
        title:"",
        deadline_date:"",
        modalOpen:false
    };
    componentDidMount() {
        this.props.getQuizList()
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {title,deadline_date}=this.state;
        const newQuiz={title,deadline_date}
        this.props.addQuiz(newQuiz)
        this.setState({title:'', deadline_date:'', modalOpen:false})
    };
    deleteQuizHandle=(id)=>{
        this.props.deleteQuiz(id)
    };
    handleModalChange=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    };

    render() {
        const {user}=this.props.auth;
        const {title,deadline_date,modalOpen}=this.state;
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <div className="mt-1">
                {user?user.is_staff?
                <Modal
                    size="mini"
                    centered={true}
                    onClose={() => this.handleModalChange()}
                    onOpen={() => {this.handleModalChange()}}
                    open={modalOpen}
                    trigger={<Button>Add Quiz</Button>}
                >
                    <Modal.Header>Add Quiz</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Input fluid
                                            label='Title'
                                            name="title"
                                            placeholder="title"
                                            value={title}
                                            onChange={this.handleChange}/>
                                <Form.Input fluid
                                            label='DeadLine Date'
                                            name="deadline_date"
                                            placeholder="deadline_date"
                                            value={deadline_date}
                                            onChange={this.handleChange}/>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                    :"":""}
                <h1>Quiz</h1>
                {
                    this.props.quiz.map(q=>(
                        <Card key={q.id} fluid>
                            <Card.Content header={q.title}/>
                            <Card.Content description={q.deadline_date}/>
                            {user?user.is_staff?<Button onClick={id=>this.deleteQuizHandle(q.id)} size="tiny"  color='red'>Delete</Button>:"":""}
                            <Link
                                className='btn btn-secondary'
                                to={{
                                    pathname: `/quiz/questions/${q.id}`,
                                    data: q.id
                                }}>
                                Take
                            </Link>
                            <Link
                                className='btn btn-primary'
                                to={{
                                    pathname: `/quiz/score_student/${q.id}`,
                                    data: q.id
                                }}>
                                My Quiz Score
                            </Link>
                            <Link
                                className='btn btn-primary'
                                to={{
                                    pathname: `/quiz/score_all_student/${q.id}`,
                                    data: q.id
                                }}>
                                All Quiz Score
                            </Link>

                        </Card>
                    ))

                }
            </div>
        );
    }
}


const mapStateToProps=state=>({
    quiz:state.quiz.quiz,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{getQuizList,addQuiz,deleteQuiz})(QuizList);
