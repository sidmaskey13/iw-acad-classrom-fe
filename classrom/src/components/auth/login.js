import React, {Component} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../redux/auth/action";

class Login extends Component {
    state={
        username:"",
        email:"",
        password:"",
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.login(this.state.username,this.state.password)
    };

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        const {username,password}=this.state
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Email</label>
                        <input type="text" name="username" value={username} onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                    </Form.Field>
                    <p><Link to='/register'>Register</Link></p>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);