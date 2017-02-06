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

exports.changeDetails = function(newDetails) {
    return sendRequest({method: 'post', resource: '/change-details', data: newDetails}).then(function (res) {
        let resData = res.data;
        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));    
        }
        return {status: resData.status};
    });
};

exports.changeProfilePicture = function(newProfilePictureId) {
    return sendRequest({method: 'post', resource: '/change-profile-picture', data: {
        profilePicture: newProfilePictureId
    }}).then(function (res) {
        let resData = res.data;
        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));    
        }
        return {status: resData.status};
    });
};

exports.getUser = function () {
    return sendRequest({method: 'get', resource: '/details'}).then(function (res) {
        let resData = res.data;
        if (resData.status) {
            Store.dispatch(userActions.userLoggedIn(resData.data));
        }
        return {status: resData.status};
    });
};