var User = require('./user.model');
var authController = require('../../auth/auth.controller');

exports.getDetails = function(req, res) {
    res.json({
        status: true,
        data: {
            username: req.user.username,
            email: req.user.email
        }
    });
};