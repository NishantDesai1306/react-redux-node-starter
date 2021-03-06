import React, {Component} from 'react';
import RegisterComponent from '../../components/Login/RegisterComponent';
import AuthService from '../../services/AuthService';
import { browserHistory } from 'react-router';

class RegisterContainer extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: {
                email: '',
                username: '',
                password: ''
            }
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    handleRegister() {
        let self = this;
        
        self.state.error = {};
        self.setState(self.state);       

        if(!self.state.email) {
            self.state.error.email = 'Email can`t be empty';
            self.setState(self.state);
        }
        if(!self.state.username) {
            self.state.error.username = 'Username can`t be empty';
            self.setState(self.state);
        }
        if(!self.state.password) {
            self.state.error.password = 'Password can`t be empty';
            self.setState(self.state);
        }
        if(self.state.password !== self.state.confirmPassword) {
            self.state.error.password = 'Password and Confirm Password must match';
            self.setState(self.state);
        }

        if(self.state.error.email || self.state.error.username || self.state.error.password) {
            return;
        }

        AuthService.register({
            email: self.state.email,
            username: self.state.username,
            password: self.state.password
        }).then(function(res) {
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

    handleEmailChange(e) {
        let newEmailValue = e.target.value;
        this.setState(Object.assign({}, this.state, {email: newEmailValue}));
    }
    handleUsernameChange(e) {
        let newUsernameValue = e.target.value;
        this.setState(Object.assign({}, this.state, {username: newUsernameValue}));
    }
    handlePasswordChange(e) {
        let newPasswordValue = e.target.value;
        this.setState(Object.assign({}, this.state, {password: newPasswordValue}));
    }
    handleConfirmPasswordChange(e) {
        let newConfirmPasswordValue = e.target.value;
        this.setState(Object.assign({}, this.state, {confirmPassword: newConfirmPasswordValue}));
    }


    render() {
        return (
            <RegisterComponent
                email={this.state.email}
                onEmailChange={this.handleEmailChange}

                username={this.state.username}
                onUsernameChange={this.handleUsernameChange}

                password={this.state.password}
                onPasswordChange={this.handlePasswordChange}

                confirmPassword={this.state.confirmPassword}
                onConfirmPasswordChange={this.handleConfirmPasswordChange}

                error={this.state.error}

                onRegister={this.handleRegister}
            ></RegisterComponent>
        );
    }
}

export default RegisterContainer;