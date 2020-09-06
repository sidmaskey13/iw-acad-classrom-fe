import React, {Component,Fragment} from 'react';
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import {Card} from "semantic-ui-react";

class Notification extends Component {

    componentDidUpdate(prevProps) {
        const {notification} = this.props;
        if (notification !== prevProps.error) {
            if (notification.type === 'error') {toast.error(notification.notification)}
            if (notification.type === 'success') {toast.success(notification.notification)}
        }
    }
    render(){
        return (
            <Fragment>
                {this.props.notification.isLoading?<Card color='red' header="Loading..." fluid/>:""}
                <ToastContainer autoClose={2000}/>
            </Fragment>
        );
    }
}
const mapStateToProps=state=>({
    notification:state.notification
})

export default connect(mapStateToProps,null)(Notification);