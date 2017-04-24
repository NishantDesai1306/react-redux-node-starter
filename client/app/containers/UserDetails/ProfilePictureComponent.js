import React, { Component } from 'react';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import { Grid, Row, Col } from 'react-flexbox-grid';

import FileUpload from 'react-fileupload';
import UserService from '../../services/UserService';

export default class ProilePictureComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadProgress: 0,
            snackbar: {
                notify: false,
                notificationMessage: ''
            }
        };

        var beforeUploadFn = (files, mill) => {
            if (files[0].size > 5 * 1024 * 1024) {
                this.setState(Object.assign({}, this.state, { 
                    snackbar: {
                        notify: true,
                        notificationMessage: 'Image size more than 5MB'
                    }
                }));
                
                return false;
            }

            files[0].mill = mill;
            return true;
        };
        var uploadingFn = (progress) => {
            var completedPercentage = Math.round((progress.loaded / progress.total) * 100);
            this.setState(Object.assign({}, this.state, { uploadProgress: completedPercentage }));
        };
        var uploadSuccessFn = (successResponse) => {
            if (successResponse.status) {
                UserService.changeProfilePicture(successResponse.data).then(() => {
                    this.setState(Object.assign({}, this.state, { 
                        snackbar: {
                            notify: true,
                            notificationMessage: 'Profile Picture changed successfully'
                        }
                    }));
                });
            } else {
                this.setState(Object.assign({}, this.state, { 
                    snackbar: {
                        notify: true,
                        notificationMessage: 'Error occurred'
                    }
                }));
                console.error(successResponse.reason);
            }
            this.setState(Object.assign({}, this.state, {uploadProgress: 0}));
        };
        var uploadErrorFn = (err) => {
            this.setState(Object.assign({}, this.state, { 
                snackbar: {
                    notify: true,
                    notificationMessage: 'Error occurred'
                }
            }));
            console.error(err.toString());
        };

        this.state.uploaderOptions = {
            baseUrl: '/api/upload',
            dataType: 'json',
            multiple: false,
            chooseAndUpload: true,
            accept: 'image/*',
            beforeUpload: beforeUploadFn,
            uploading: uploadingFn,
            uploadSuccess: uploadSuccessFn,
            uploadError: uploadErrorFn
        };

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestClose() {
        this.setState(Object.assign({}, this.state, { snackbar: {notify: false} }));
    }

    render() {

        let progressBar = '';
        if(this.state.uploadProgress) {
             progressBar = <LinearProgress mode="determinate" value={this.state.uploadProgress} />;
        }

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <FileUpload options={this.state.uploaderOptions}>
                            <div className="avatar-100-image-overlay-wrapper" ref="chooseAndUpload">
                                <div className="avatar-100 avatar-100-image-overlay white-text-color" style={{color: 'white'}}>
                                    <span>
                                        <strong>Change</strong>
                                    </span>
                                    <EditorModeEdit color="white"></EditorModeEdit>
                                </div>
                                <img className="avatar-100" src={this.props.profilePictureUrl} alt={this.props.username} width={100} height={100} style={{borderRadius: '50px'}}/>
                            </div>
                        </FileUpload>
                    </Col>
    
                    <Col xs={12}>
                        <div>
                            {progressBar}
                        </div>
                    </Col>

                </Row>
                <Snackbar
                    open={this.state.snackbar.notify}
                    message={this.state.snackbar.notificationMessage || ''}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}