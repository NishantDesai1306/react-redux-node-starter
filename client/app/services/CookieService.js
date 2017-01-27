import cookie from 'react-cookie';

const COOKIE_NAME = 'react-node-starter';

exports.saveCookie = function (token) {
    cookie.save(COOKIE_NAME, token, {path: '/'});
};

exports.removeCookie = function () {
    cookie.remove(COOKIE_NAME);
};

exports.loadCookie = function () {
    return cookie.load(COOKIE_NAME);
};