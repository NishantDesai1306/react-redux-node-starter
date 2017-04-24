import React, {Component} from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { browserHistory } from 'react-router';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isRememberMeChecked: false,
            error: {
                email: '',
                password: ''
            }
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
    }

    componentWillMount() {
        UserService.getUser().then(function(response) {
            if(response.status) {
                browserHistory.push('/dashboard');                
            }
        });
    }

    handleLogin() {
        let self = this;

        self.state.error = {};
        self.setState(self.state);

        if(!self.state.email) {
            self.state.error.email = "Please enter username or email";
            self.setState(self.state);
        }
        if(!self.state.password) {
            self.state.error.password = "Password can't be empty";
            self.setState(self.state);
        }

        if(self.state.error.email || self.state.error.password) {
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
                self.state.error.email = res.reason;
                self.setState(self.state);
            }
        }, function(err){
            self.state.error.email = err.reason || 'Invalid Username or Password';
            self.setState(self.state);
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