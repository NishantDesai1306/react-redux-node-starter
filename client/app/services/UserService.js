import * as userActions from '../actions/user';
import Store from '../store';
import Axios from 'axios';
import * as CookieService from './CookieService';

const USER_API_URL = '/api/user';
const sendRequest = function (requestData) {
    let requestConfig = {
        method: requestData.method,
        url: USER_API_URL + (requestData.resource || ''),
        data: requestData.data
    };

    if (requestData.headers) {
        requestData.headers = requestData.headers;
    }

    return Axios(requestConfig);
};

exports.getUser = function () {
    return sendRequest({method: 'get', resource: '/details'}).then(function (res) {
        let resData = res.data;
        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn({email: resData.data.email, username: resData.data.username}));    
        }
        return {status: resData.status};
    });
};