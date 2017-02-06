import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, ProgressBar } from 'react-bootstrap';
import FileUpload from 'react-fileupload';

class ChangeProfilePictureComponent extends Component {

    constructor(props) {
        super(props);
    } 

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} bsSize="small" aria-labelledby="change-profile-picture-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="change-profile-picture-modal-title">Change Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>Profile Pciture</ControlLabel>
                        <FileUpload options={this.props.uploaderConfig}>
                            <Button bsStyle="primary" ref="chooseBtn">Choose</Button>
                            <Button bsStyle="primary" ref="uploadBtn">Upload</Button>
                        </FileUpload>
                    </FormGroup>
                    <ProgressBar bsStyle="success" now={this.props.uploadProgress} />
                </Modal.Body>
            </Modal>
        );
    }
}

ChangeProfilePictureComponent.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    uploaderConfig: React.PropTypes.any.isRequired,
    uploadProgress: React.PropTypes.number.isRequired
};

export default ChangeProfilePictureComponent;