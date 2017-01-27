exports.userLoggedIn = function (userDetails) {
    return {
        type: 'USER_LOGGED_IN',
        payload: {
            email: userDetails.email,
            username: userDetails.username
        }
    };
};

exports.userLoggedOut = function () {
    return {type: 'USER_LOGGED_OUT'};
};