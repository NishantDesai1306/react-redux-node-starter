var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('./passport-config');
var controller = require('./auth.controller');
var AuthToken = require('./token/authToken.model');

passportConfig.setupPassport(passport);

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } 
    else if (req.appType === 'mobile') {
        var token = req.headers['x-auth-token'];
        if (!token) {
            return res.status(401).send({ message: 'No token provided.' });
        }

        AuthToken.consumeToken(token)
        .then(function (user) {
            req.user = user;
            next();
        })
        .catch(function (err) {
            return next(err);
        });
    }
    else {
        next(new Error('Unauthorized'));
    }
};
exports.isAuthenticated = isAuthenticated;


router.post('/login', passport.authenticate('local'), controller.checkRememberMe, controller.successLogin);
router.post('/register', passport.authenticate('local-signup'), controller.successRegister);
router.post('/logout', isAuthenticated, controller.logout);


exports.router = router;