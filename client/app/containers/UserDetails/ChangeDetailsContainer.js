import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import ChangeDetailsComponent from '../../components/UserDetails/ChangeDetailsComponent';
import UserService from '../../services/UserService';

class ChangeDetailsContainer extends Component {

    constructor(props) {
        super(props);

        var self = this;
        this.state = {
            username: this.props.user.username,
            email: this.props.user.email,
            profilePictureUrl: this.props.user.profilePictureUrl,
            profilePictureModalHandle: false,
            error: '',
            uploadProgress: 0
        };

        this.handleChangeDetails = this.handleChangeDetails.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.showProfilePictureModal = this.showProfilePictureModal.bind(this);
        this.hideProfilePictureModal = this.hideProfilePictureModal.bind(this);

        var beforeUploadFn = (files, mill) => {
            if(files[0].size > 5*1024*1024) {
                this.setState(Object.assign({}, this.state, {error: 'File size cannot be more than 5MB'}));
                this.hideProfilePictureModal();
                return false;
            }

            files[0].mill = mill;
            return true;
        };
        var uploadingFn = (progress) => {
            var completedPercentage = Math.round((progress.loaded / progress.total)*100);
            this.setState(Object.assign({}, this.state, {uploadProgress: completedPercentage}));
        };
        var uploadSuccessFn = (successResponse) => {
            if(successResponse.status) {
                UserService.changeProfilePicture(successResponse.data).then(function() {
                    self.hideProfilePictureModal();
                });
            }
            else {
                console.error(successResponse.reason);
            }
        };
        var uploadErrorFn = (err) => {
            this.setState(Object.assign({}, this.state, {error: err.toString()}));   
            this.hideProfilePictureModal();                     
        };


        this.uploaderOptions={
            baseUrl:'/api/upload',
            dataType: 'json',
            multiple: false,
            accept: 'image/*',
            beforeUpload: beforeUploadFn,
            uploading: uploadingFn,
            uploadSuccess: uploadSuccessFn,
            uploadError: uploadErrorFn
        };
    }

    handleChangeDetails() {
        let self = this;
        let message = '';

        if(!self.state.email) {
            message = "Please enter username or email";
        }
        if(!self.state.username) {
            message = "Username can't be empty";
        }
        self.setState(Object.assign({}, self.state, {error: message}));

        if(message) {
            return;
        }
        
        UserService.changeDetails({
            email: self.state.email,
            username: self.state.username
        }).then(function(res) {
            if(res.status) {
                browserHistory.push('/dashboard');
            }
            else {
                self.setState(Object.assign({}, self.state, {error: res.reason}));
            }
        }, function(err){
            self.setState(Object.assign({}, self.state, {error: err.reason}));
        });
    }

    handleEmailChange(e) {
        let newEmailValue = e.target.value;
        this.setState(Object.assign({}, this.state, {email: newEmailValue}));
    }
    handleUsernameChange(e) {
        let newUsernameValue = e.target.value;
        this.setState(Object.assign({}, this.state, {username: newUsernameValue}));
    }

    showProfilePictureModal() {
        this.setState(Object.assign({}, this.state, {profilePictureModalHandle: true}));
    }
    hideProfilePictureModal() {
        this.setState(Object.assign({}, this.state, {profilePictureModalHandle: false}));
    }
    
    render() {
        return (
            <ChangeDetailsComponent
                email={this.state.email}
                onEmailChange={this.handleEmailChange}

                username={this.state.username}
                onUsernameChange={this.handleUsernameChange}

                profilePictureUrl={this.state.profilePictureUrl}

                profilePictureModalHandle={this.state.profilePictureModalHandle}
                showProfilePictureModal={this.showProfilePictureModal}
                hideProfilePictureModal={this.hideProfilePictureModal}

                uploaderConfig={this.uploaderOptions}
                uploadProgress={this.state.uploadProgress}

                error={this.state.error}

                onChangeDetails={this.handleChangeDetails}
            ></ChangeDetailsComponent>
        );
    }
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps, null)(ChangeDetailsContainer);