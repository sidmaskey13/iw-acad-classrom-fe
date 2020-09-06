import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Button} from "semantic-ui-react";
import {logOut} from "../../redux/auth/action";

class Header extends Component{
    render() {
        const mystyle = {
            height: "20px",
            width: "20px",
            padding: "1px",
            borderRadius: "50%"
        };
        const {isAuthenticated,user}=this.props.auth;
        const guestLink=(

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav my-2 ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        );
        const authLink=(
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <Link to="/assignment">
                        <li className="nav-item">
                            <a className="nav-link" href="">Assignment</a>
                        </li>
                    </Link>
                    <Link to="/quiz">
                        <li className="nav-item">
                            <a className="nav-link" href="">Quiz</a>
                        </li>
                    </Link>
                    <Link to="/all_user">
                        <li className="nav-item">
                            <a className="nav-link" href="">Members</a>
                        </li>
                    </Link>
                    {user?user.is_superuser?<Link to="/staff_register">
                        <li className="nav-item">
                            <a className="nav-link" href="">Create Staff</a>
                        </li>
                    </Link>:"":""}


                </ul>
                <ul className="navbar-nav my-2 ml-auto">
                <span className="navbar-text mr-3">
                    <strong>{user?`Welcome ${user.username}`:""}</strong>
                    <p>{user?user.is_staff?'Staff':"Student":""}</p>
                </span>
                    <Button onClick={this.props.logOut}>Logout</Button>
                </ul>
            </div>

        );

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Classrom</a>

                    {isAuthenticated?authLink:guestLink}
                </nav>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    auth: state.auth
});
export default connect(mapStateToProps,{logOut})(Header);