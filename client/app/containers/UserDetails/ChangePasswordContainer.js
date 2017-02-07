import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import ChangePasswordComponent from '../../components/UserDetails/ChangePasswordComponent';
import UserService from '../../services/UserService';

export default class ChangePasswordContainer extends Component {

    constructor() {
        super();
        
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            error: ''
        };

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmNewPassword = this.handleChangeConfirmNewPassword.bind(this);
    }

    handleChangePassword() {
        let self = this;
        let message = '';

        if(!self.state.oldPassword) {
            message = "Please enter your Old Password";
        }
        if(!self.state.newPassword) {
            message = "Please enter new password";
        }
        if(self.state.newPassword !== self.state.confirmNewPassword) {
            message = "New Password and Confirm New Password must match";
        }

        self.setState(Object.assign({}, self.state, {error: message}));

        if(message) {
            return;
        }
        
        UserService.changePassword(self.state.oldPassword, self.state.newPassword)
            .then(function(res) {
                if(res.status) {
                    browserHistory.push('/dashboard');
                }
                else {
                    self.setState(Object.assign({}, self.state, {error: res.reason}));
                }
            }, function(err){
                self.setState(Object.assign({}, self.state, {error: err.reason}));
            });
    }

    handleChangeOldPassword(e) {
        let newValue = e.target.value;
        this.setState(Object.assign({}, this.state, {oldPassword: newValue}));
        console.log(this.state);
    }
    handleChangeNewPassword(e) {
        let newValue = e.target.value;
        this.setState(Object.assign({}, this.state, {newPassword: newValue}));
        console.log(this.state);
        
    }
    handleChangeConfirmNewPassword(e) {
        let newValue = e.target.value;
        this.setState(Object.assign({}, this.state, {confirmNewPassword: newValue}));
        console.log(this.state);
        
    }

    render() {
        return (
            <ChangePasswordComponent
                oldPassword={this.state.oldPassword}
                onOldPasswordChange={this.handleChangeOldPassword}

                newPassword={this.state.newPassword}
                onNewPasswordChange={this.handleChangeNewPassword}

                confirmNewPassword={this.state.confirmNewPassword}
                onConfirmNewPasswordChange={this.handleChangeConfirmNewPassword}

                error={this.state.error}

                onChangePassword={this.handleChangePassword}
            ></ChangePasswordComponent>
        );
    }
}