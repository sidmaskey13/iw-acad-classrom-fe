import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {
    Card,
    Dropdown,
    Divider,
} from "semantic-ui-react";

import {getOwnPosts,deletePost,clearPost} from "../../redux/post/action";
import {Link, Redirect} from "react-router-dom";

class OwnPostList extends Component {
    state={
        deleteBtn:true,
    }
    componentDidMount() {
        this.props.getOwnPosts()
    }
    onHandleDelete=(id)=>{
        this.setState({deleteBtn:false})
        this.props.deletePost(id)
    };
    componentWillUnmount() {
        this.props.clearPost()
    }

    render(){
        const {user}=this.props.auth;
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <Fragment>
                <div className="mt-1"></div>
              {this.props.posts.length!==0?this.props.posts.map(post=>(
                        <Card key={post.id} fluid>
                            <Card.Content header={post.title}/>
                            <Card.Content description={post.body}/>
                            <Card.Content extra>
                                <strong>By: {post.userName}</strong><br/>
                                {(post.user==user.id && this.state.deleteBtn)?
                                <Dropdown>
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='Delete' onClick={()=>this.onHandleDelete(post.id)} />
                                        <Dropdown.Item>
                                            <Link
                                                to={{
                                                    className:"btn",
                                                    pathname: `/post/edit/${post.id}`,
                                                    title: post.title,
                                                    body: post.body,
                                                }}>
                                                Edit
                                            </Link>
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>:""}
                            </Card.Content>
                        </Card>
                    )):""
                }
            </Fragment>
        );
    }
}

const mapStateToProps=state=>({
    posts:state.posts.posts,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{getOwnPosts,deletePost,clearPost})(OwnPostList);
