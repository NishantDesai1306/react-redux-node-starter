import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ChangeDetailsComponent from '../../components/UserDetails/ChangeDetailsComponent';
import UserService from '../../services/UserService';

class ChangeDetailsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user.username,
            email: this.props.user.email,
            error: {
                email: '',
                username: ''
            },
        };

        var self = this;
        this.handleChangeDetails = this.handleChangeDetails.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleChangeDetails() {
        let self = this;

        self.state.error = {};
        self.setState(self.state);

        if (!self.state.email) {
            self.state.error.email = "Email can't be empty";
        }
        if (!self.state.username) {
            self.state.error.username = "Username can't be empty";
        }

        if(self.state.error.email || self.state.error.username) {
            return self.setState(self.state);
        }

        UserService.changeDetails({
            email: self.state.email,
            username: self.state.username
        }).then(function(res) {
            if (res.status) {
                browserHistory.push('/dashboard');
            } else {
                self.state.error.email = res.reason;
                self.setState(self.state);
            }
        }, function(err) {
            self.state.error.email = err.reason || err.toString();
            self.setState(self.state);
        });
    }

    handleEmailChange(e) {
        let newEmailValue = e.target.value;
        this.setState(Object.assign({}, this.state, { email: newEmailValue }));
    }
    handleUsernameChange(e) {
        let newUsernameValue = e.target.value;
        this.setState(Object.assign({}, this.state, { username: newUsernameValue }));
    }

    render() {
        return ( <ChangeDetailsComponent email = { this.state.email }
            onEmailChange = { this.handleEmailChange }

            username = { this.state.username }
            onUsernameChange = { this.handleUsernameChange }

            profilePictureUrl = { this.props.user.profilePictureUrl }

            profilePicture = { this.state.profilePictureBase64String }

            error = { this.state.error }

            onChangeDetails = { this.handleChangeDetails } >
            </ChangeDetailsComponent>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, null)(ChangeDetailsContainer);