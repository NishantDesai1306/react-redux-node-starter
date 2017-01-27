import React, {Component} from 'react';
import AppComponent from '../components/AppComponent';
import {connect} from 'react-redux';
import AuthService from '../services/AuthService';
import {browserHistory} from 'react-router';
import * as CookieService from '../services/CookieService';
import * as UserService from '../services/UserService';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if(CookieService.loadCookie()) {
            UserService.getUser()
            .then(function(res) {
                if(res.status) {
                    browserHistory.push('/dashboard');    
                }
            });
        }
    }

    handleLogout() {
        AuthService.logout().then(function(res) {
            if(res.status) {
                browserHistory.push('/');
            }
        });
    }

    goToDashboard() {
        browserHistory.push('/dashboard');
    }

    goToLogin() {
        browserHistory.push('/login');
    }

    render() {
        return (
            <AppComponent 
                children={this.props.children}
                onLogout={this.handleLogout}
                goToLogin={this.goToLogin}
                goToDashboard={this.goToDashboard}
                username={this.props.user.username}
            ></AppComponent>
        );
    }
}


const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps, null)(AppContainer);