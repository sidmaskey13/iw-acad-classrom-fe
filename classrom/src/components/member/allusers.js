import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllUsers} from "../../redux/member/action";
import {Table,Label} from "semantic-ui-react";
import {Redirect} from "react-router-dom";

class AllUsers extends Component {
    componentDidMount() {
        this.props.getAllUsers()
    }
    render() {
        const {all_user}=this.props;
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1>All Users</h1>
                <ul></ul>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {all_user?all_user.allUser?all_user.allUser.map(i=>(<Table.Row>
                            <Table.Cell>{i.username}</Table.Cell>
                            <Table.Cell>{i.is_superuser?"Superuser|":"Student"}{i.is_staff?"Staff":""}</Table.Cell>
                        </Table.Row>)):"":""}

                    </Table.Body>


                </Table>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    all_user: state.all_user,
    isAuthenticated: state.auth.isAuthenticated

});
export default connect(mapStateToProps,{getAllUsers})(AllUsers);