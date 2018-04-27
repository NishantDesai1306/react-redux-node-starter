var Q = require('q');
var bcrypt = require('bcrypt-nodejs');

var salt = require('../config').salt;
var User = require('../api/user/user.model');
var RememberMeToken = require('./token/rememberMeToken.model');
var AuthToken = require('./token/authToken.model');

exports.checkRememberMe = function(req, res, next) {
    if(req.body.rememberMe) {
        RememberMeToken.issueToken(req.user._id).then(function(tokenObj) {
            res.cookie('remember_me', tokenObj.token, { path: '/', httpOnly: true, maxAge: 604800000});
            next();
        }, function(err) {
            next(err);
        });
    }
    else {
        next();
    }
};

exports.successLogin = function(req, res) {
    var defer = Q.defer();

    var payload = {
        username: req.user.username,
        email: req.user.email,
        profilePictureUrl: req.user.profilePicture.path
    };

    if (req.appType === 'mobile') {
        AuthToken.issueToken(req.user._id)
        .then(function (authTokenObj) {
            return defer.resolve(authTokenObj.token);
        })
        .catch(function(err) {
            return defer.reject(err);
        });
    }
    else {
        defer.resolve();
    }

    defer.promise
    .then(function(token) {
        if (token) {
            payload.token = token;
        }

        res.json({ 
            status: true,
            data: payload
        });
    })
    .catch(function (err) {
        return res.json({
            status: false,
            reason: err.message
        });
    });
};

exports.successRegister = function(req, res) {
    var defer = Q.defer();
    var payload = {
        username: req.user.username,
        email: req.user.email,
        profilePictureUrl: req.user.profilePicture.path
    };

    if (req.appType === 'mobile') {
        AuthToken.issueToken(req.user._id.toString())
        .then(function (authTokenObj) {
            return defer.resolve(authTokenObj.token);
        })
        .catch(function (err) {
            return defer.reject(err);
        });
    }
    else {
        defer.resolve();
    }

    defer.promise
    .then(function(token) {
        if (token) {
            payload.token = token;
        }

        return res.json({ 
            status: true,
            data: payload
        });
    })
    .catch(function (err) {
        return res.json({
            status: false,
            reason: err.message
        });
    });
};

exports.logout = function(req, res) {
    RememberMeToken.clearUserTokens(req.user._id.toString());

    req.logout();
    res.clearCookie('remember_me');
    res.json({
        status: true
    });
};
