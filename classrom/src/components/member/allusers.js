import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllUsers,deleteUser} from "../../redux/member/action";
import {Table, Label, Button, Modal, Container} from "semantic-ui-react";
import {Redirect} from "react-router-dom";

class AllUsers extends Component {
    state={
        modalOpen:false,
        userId:""
    };
    componentDidMount() {
        this.props.getAllUsers()
    }
    handleDeleteUser=(id)=>{
        const {userId}=this.state;
        this.props.deleteUser(userId)
        this.setState({modalOpen:false,})
    };
    handleModalChange=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    };
    render() {
        const {all_user}=this.props;
        const {user}=this.props.auth;
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
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {all_user?all_user.allUser?all_user.allUser.map(i=>(<Table.Row>
                            <Table.Cell>{i.username}</Table.Cell>
                            <Table.Cell>{i.is_superuser?"Superuser|":"Student"}{i.is_staff?"Staff":""}</Table.Cell>
                            <Table.Cell>{user?user.is_superuser?<Modal
                                size="mini"
                                centered={true}
                                onClose={() => this.handleModalChange()}
                                onOpen={() => {this.handleModalChange();this.setState({userId:i.id})}}
                                open={this.state.modalOpen}
                                trigger={<Button>Delete user</Button>}
                            >
                                <Modal.Header>Delete User?</Modal.Header>
                                <Modal.Actions>
                                    <Button color='black' onClick={() => this.handleModalChange(false)}>
                                        Nope
                                    </Button>
                                    <Button
                                        content="Really Delete"
                                        labelPosition='right'
                                        icon='checkmark'
                                        onClick={()=>this.handleDeleteUser(i.id)}
                                        positive
                                    />
                                </Modal.Actions>
                            </Modal>:"":""}</Table.Cell>
                        </Table.Row>)):"":""}

                    </Table.Body>


                </Table>

            </div>
        );
    }
}
const mapStateToProps=state=>({
    all_user: state.all_user,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});
export default connect(mapStateToProps,{getAllUsers,deleteUser})(AllUsers);