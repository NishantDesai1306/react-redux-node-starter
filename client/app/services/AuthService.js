import * as userActions from '../actions/user';
import Store from '../store';
import Axios from 'axios';
import * as CookieService from './CookieService';

const AUTH_URL = '/auth';
const sendRequest = function (requestData) {
    let requestConfig = {
        method: requestData.method,
        url: AUTH_URL + (requestData.resource || ''),
        data: requestData.data
    };

    if (requestData.headers) {
        requestData.headers = requestData.headers;
    }

    return Axios(requestConfig);
};

exports.isUserLoggedIn = function() {
    return !!Store.getState().user && Store.getState().user.username;
};

exports.login = function (userCredentials, saveToCookie) {
    if(saveToCookie) {
        userCredentials.rememberMe = saveToCookie;
    }
    return sendRequest({method: 'post', resource: '/login', data: userCredentials}).then(function (res) {
        let resData = res.data;
        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));
        }

        if(saveToCookie) {
            CookieService.saveCookie('remember user');
        }

        return {status: res.data.status, reason: res.data.reason};
    });
};

exports.logout = function() {
    return sendRequest({method: 'post', resource: '/logout'}).then(function (res) {
        if (res.data.status) {
            Store.dispatch(userActions.userLoggedOut());
        }

        if(CookieService.loadCookie()) {
            CookieService.removeCookie();
        }

        return {status: res.data.status, reason: res.data.reason};
    });
};

exports.register = function (userDetails) {
    return sendRequest({method: 'post', resource: '/register', data: userDetails}).then(function (res) {
        let resData = res.data;
        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));
        }

        return {status: res.data.status, reason: res.data.reason};
    });
};