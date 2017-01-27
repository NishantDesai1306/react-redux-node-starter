import React, {Component} from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import AuthService from '../../services/AuthService';
import { browserHistory } from 'react-router';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'nishant',
            password: 'nishant',
            error: this.props.location.query.message || '',
            isRememberMeChecked: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
    }

    handleLogin() {
        let self = this;
        let message = '';

        if(!self.state.email) {
            message = "Please enter username or email";
        }
        if(!self.state.password) {
            message = "Password can't be empty";
        }
        self.setState(Object.assign({}, self.state, {error: message}));

        if(message) {
            return;
        }
        
        AuthService.login({
            email: self.state.email,
            password: self.state.password
        }, self.state.isRememberMeChecked).then(function(res) {
            if(res.status) {
                browserHistory.push('/dashboard');
            }
            else {
                self.setState(Object.assign({}, self.state, {error: res.reason}));
            }
        }, function(err){
            self.setState(Object.assign({}, self.state, {error: err.reason || 'Invalid Username or Password'}));
        });
    }

    handleEmailChange(e) {
        let newEmailValue = e.target.value;
        this.setState(Object.assign({}, this.state, {email: newEmailValue}));
    }
    handlePasswordChange(e) {
        let newPasswordValue = e.target.value;
        this.setState(Object.assign({}, this.state, {password: newPasswordValue}));
    }
    handleRememberMeChange(e) {
        let isRememberMeChecked = e.target.checked;
        this.setState(Object.assign({}, this.state, {isRememberMeChecked: isRememberMeChecked}));
    }

    render() {
        return (
            <LoginComponent
                email={this.state.email}
                onEmailChange={this.handleEmailChange}

                password={this.state.password}
                onPasswordChange={this.handlePasswordChange}

                isRemeberMeChecked={this.state.isRememberMeChecked}
                onRememberMeChange={this.handleRememberMeChange}

                error={this.state.error}

                onLogin={this.handleLogin}
            ></LoginComponent>
        );
    }
}

export default LoginContainer;