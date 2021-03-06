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
                {this.props.notification.isLoading?"":<div>
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
                                                    placeholder="Date Format: yyyy-mm-dd hh:mm"
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
                            <Card key={q.id} className="pb-1" fluid>
                                <Card.Content header={q.title}/>
                                <Card.Content description={q.deadline_date}/>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-1"><Link
                                            className='btn btn-secondary'
                                            to={{
                                                pathname: `/quiz/questions/${q.id}`,
                                                data: q.id
                                            }}>
                                            Take
                                        </Link></div>
                                        <div className="col-md-6"><Link
                                            className='btn btn-primary'
                                            to={{
                                                pathname: `/quiz/score_student/${q.id}`,
                                                data: q.id
                                            }}>
                                            My Quiz Score
                                        </Link>
                                        </div>
                                        {user ? user.is_staff ?
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Link
                                                        className='btn btn-primary'
                                                        to={{
                                                            pathname: `/quiz/score_all_student/${q.id}`,
                                                            data: q.id
                                                        }}>
                                                        All Quiz Score
                                                    </Link>
                                                </div>
                                                <div className="col-md-4">
                                                    <Button onClick={id => this.deleteQuizHandle(q.id)} size="tiny"
                                                            color='red'>Delete</Button>
                                                </div>
                                            </div> : "" : ""}
                                    </div>
                                </div>
                            </Card>
                        ))

                    }
                </div>}
            </div>
        );
    }
}


const mapStateToProps=state=>({
    quiz:state.quiz.quiz,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    notification:state.notification
});
export default connect(mapStateToProps,{getQuizList,addQuiz,deleteQuiz})(QuizList);
