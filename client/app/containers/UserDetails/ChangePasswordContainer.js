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
            error: {
                oldPassword: '',
                newPassword: ''
            }
        };

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmNewPassword = this.handleChangeConfirmNewPassword.bind(this);
    }

    handleChangePassword() {
        let self = this;
       
       self.state.error = {};

        if(!self.state.oldPassword) {
            self.state.error.oldPassword = "Please enter your Old Password";
        }
        if(!self.state.newPassword) {
            self.state.error.newPassword = "Please enter new password";
        }
        if(self.state.newPassword !== self.state.confirmNewPassword) {
            self.state.error.newPassword = "New Password and Confirm New Password must match";
        }

        self.setState(self.state);
        if(self.state.error.oldPassword || self.state.error.newPassword) {
            return;
        }
        
        UserService.changePassword(self.state.oldPassword, self.state.newPassword)
            .then(function(res) {
                if(res.status) {
                    browserHistory.push('/dashboard');
                }
                else {
                    self.state.error.oldPassword = res.reason;
                    self.setState(self.state);
                }
            }, function(err){
                self.state.error.oldPassword = err.reason;
                self.setState(self.state);               
            });
    }

    handleChangeOldPassword(e) {
        let newValue = e.target.value;
        this.setState(Object.assign({}, this.state, {oldPassword: newValue}));
    }
    handleChangeNewPassword(e) {
        let newValue = e.target.value;
        this.setState(Object.assign({}, this.state, {newPassword: newValue}));
        
    }
    handleChangeConfirmNewPassword(e) {
        let newValue = e.target.value;
        this.setState(Object.assign({}, this.state, {confirmNewPassword: newValue}));        
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