import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, ProgressBar, Row, Col } from 'react-bootstrap';
import FileUpload from 'react-fileupload';

class ChangeProfilePictureComponent extends Component {

    constructor(props) {
        super(props);
    } 

    render() {
        var ProgressBarElement, PreviewImageElement;

        ProgressBarElement = this.props.uploadProgress ? <ProgressBar bsStyle="success" now={this.props.uploadProgress} /> : '';
        PreviewImageElement = this.props.profilePicture ? <img style={{height: 'auto', width: '100%'}} className="img-rounded" src={this.props.profilePicture}></img> : '';

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large" aria-labelledby="change-profile-picture-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="change-profile-picture-modal-title">Change Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col sm={12}>
                                {PreviewImageElement}
                            </Col>
                        </Row>
                    </div>
                    <FormGroup className="upload-group margin-top-20">
                        <FileUpload options={this.props.uploaderConfig}>
                            <Button bsSize="large" bsStyle="primary" style={{marginRight: '20px'}} block ref="chooseBtn">Choose</Button>
                            <div>&nbsp;&nbsp;&nbsp;</div>
                            <Button bsSize="large" bsStyle="primary" block ref="uploadBtn">Upload</Button>
                        </FileUpload>
                    </FormGroup>
                    {ProgressBarElement}
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