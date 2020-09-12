import React, {Component, Fragment} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {staffRegister} from "../../redux/auth/action";
import { ToastContainer, toast } from 'react-toastify';

class StaffRegister extends Component {
    state={
        username:"",
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        password2:"",
        myfile:"",
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit=(e)=>{
        e.preventDefault();
        const {username,email,password,password2,last_name,first_name}=this.state;
        if(password!==password2){
            toast.error('Passwords dont match')
        }
        else{
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('profile_pic',this.state.myfile,this.state.myfile.name);
            this.props.staffRegister(formData)
        }
    };
    fileSelectHandler = event =>{
        this.setState({
            myfile:event.target.files[0]
        })
    };

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        const {username,email,password,password2,first_name,last_name}=this.state
        return (
            <div>
                <ToastContainer/>
                <Form onSubmit={this.onSubmit} enctype="multipart/form-data">
                    <Form.Field>
                        <label>Username</label>
                        <input type="text" name="username" value={username} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>First Name</label>
                        <input type="text" name="first_name" value={first_name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input type="text" name="last_name" value={last_name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <input type="password" name="password2" value={password2} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Profile Pic</label>
                        <input type="file" name="myfile" onChange={this.fileSelectHandler}/>
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{staffRegister})(StaffRegister);