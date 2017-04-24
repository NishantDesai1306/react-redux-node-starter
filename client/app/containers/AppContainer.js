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
    
    handleUserMenuItemSelected(e ,o) {
        switch(o.key) {
            case 'user-details': {
                return browserHistory.push('/change-details');
            }
            case 'logout': {
                return AuthService.logout().then(function(res) {
                    if(res.status) {
                        browserHistory.push('/');
                    }
                });                
            }
        }
    }

    goToDashboard() {
        return browserHistory.push('/dashboard');        
    }

    goToLogin() {
        browserHistory.push('/login');
    }

    render() {
        return (
            <AppComponent 
                children={this.props.children}
                goToLogin={this.goToLogin}
                goToDashboard={this.goToDashboard}
                username={this.props.user.username}
                onUserMenuItemSelected={this.handleUserMenuItemSelected}
                profilePictureUrl={this.props.user.profilePictureUrl}
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