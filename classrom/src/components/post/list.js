import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Card, Button, Dropdown, Form, FormGroup, Divider, Container, Modal, Pagination} from "semantic-ui-react";

import {getPosts,deletePost,clearPost} from "../../redux/post/action";
import {addComment} from "../../redux/comment/action";
import AddPostForm from './addForm'
import {Link, Redirect} from "react-router-dom";

class PostList extends Component {
    state={
        deleteBtn:true,
        comment:"",
        commentBtn:true,
        postNumber:"",
        modalOpen:false

    };
    componentDidMount() {
        this.props.getPosts()
    }
    handleModalChange=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    };
    componentDidUpdate(prevProps) {
        const {posts} = this.props;
        if (posts !== prevProps.posts) {
        this.setState({deleteBtn:true})
        }
    }
    onHandleDelete=(id)=>{
        this.setState({deleteBtn:false})
        this.props.deletePost(id)
    };

    onCommentFormSubmit=(e)=>{
        e.preventDefault();
        const {comment,postNumber}=this.state;
        const newComment={
            body:comment,
            post:postNumber
        };
        console.log(newComment)
        this.props.addComment(newComment)
        this.setState({comment:"",postNumber:"", modalOpen:false})
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    componentWillUnmount() {
        this.props.clearPost()
    }


    render(){
        const {user}=this.props.auth;
        const {comment,deleteBtn,postNumber,commentBtn,modalOpen}=this.state;
        // if(this.props.isAuthenticated){
        //     return <Redirect to="/"/>
        // }
        return (
            <Fragment>

                <AddPostForm/>
                <Link
                    className='btn btn-primary'
                    to={{
                        pathname: `/post/own_post`,
                    }}>
                    My Posts
                </Link>
                    {
                        this.props.posts.map(post=>(
                            <Card key={post.id} fluid>
                                <Card.Content header={post.title}/>
                                <Card.Content description={post.body}/>
                                <Card.Content extra>
                                    <strong>By: {post.userName}</strong><br/>
                                    <Button  color='red' circular icon='heart' size="mini"/>
                                    <Dropdown>
                                        <Dropdown.Menu>
                                            {(post.user==user.id && deleteBtn)?<Dropdown.Item text='Delete' onClick={()=>this.onHandleDelete(post.id)} />:""}
                                        </Dropdown.Menu>
                                    </Dropdown><Divider/>
                                    <Card.Group className="mb-1">
                                        {post.comments?
                                            post.comments.map(comment=>(
                                                <Card>
                                                    <Card.Content>
                                                        <Card.Header>{comment.userName}</Card.Header>
                                                        <Card.Description>
                                                            {comment.body}
                                                        </Card.Description>
                                                    </Card.Content>
                                                </Card>
                                            )):""}
                                    </Card.Group>
                                    <Container className="mt-1">
                                        <Modal
                                            size="mini"
                                            centered={true}
                                            onClose={() => this.handleModalChange()}
                                            onOpen={() => {this.handleModalChange();this.setState({postNumber:post.id})}}
                                            open={modalOpen}
                                            trigger={<Button>Add Comment</Button>}
                                        >
                                            <Modal.Header>Add Comment</Modal.Header>
                                            <Modal.Content>
                                                <Modal.Description>
                                                    <Form onSubmit={this.onCommentFormSubmit} size="mini" key="mini">
                                                        <FormGroup inline>
                                                            <Form.Input width={8}
                                                                        name="comment"
                                                                        placeholder="Add Comment"
                                                                        value={comment}
                                                                        onChange={this.handleChange}/>
                                                            {commentBtn?
                                                                <Button
                                                                type="submit"
                                                                icon='angle right'
                                                                size="mini"
                                                                 />:""}
                                                        </FormGroup>
                                                    </Form>
                                                </Modal.Description>
                                            </Modal.Content>
                                        </Modal>
                                    </Container>

                                </Card.Content>
                            </Card>
                        ))

                    }
                {/*<Pagination defaultActivePage={1} totalPages={2} />*/}
            </Fragment>
        );
    }
}

const mapStateToProps=state=>({
    posts:state.posts.posts,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps,{getPosts,deletePost,addComment,clearPost})(PostList);
