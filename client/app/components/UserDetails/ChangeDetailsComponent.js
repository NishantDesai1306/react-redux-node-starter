import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col, Panel, Alert, Button, FormGroup, ControlLabel, Glyphicon} from 'react-bootstrap';
import FieldGroup from '../FieldGroup';
import ChangeProfilePictureComponent from './ChangeProfilePictureComponent';

const ChangeDetailsComponent = props => {

    let errorElement;
    if (props.error) {
        errorElement = <Alert className="align-center" bsStyle="danger">
                            <span>{props.error}</span>
                       </Alert>
    } else {
        errorElement = '';
    }

    return (
        <div>
            <Grid className="margin-top-75">
                <Row>
                    <Col smOffset={3} sm={6}>
                        <Panel>
                            <div className="align-center">
                                <h2><Glyphicon glyph="user"/>User Details</h2>
                            </div>

                            <div className="margin-top-20">

                                <FieldGroup
                                    id="username"
                                    type="username"
                                    label="Username"
                                    placeholder="Username"
                                    value={props.username}
                                    onChange={props.onUsernameChange}/>

                                <FieldGroup
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Email Address"
                                    value={props.email}
                                    onChange={props.onEmailChange}/>

                                <div>
                                    <FormGroup>
                                        <ControlLabel>Profile Pciture</ControlLabel>
                                        <div className="padding-bottom-10">
                                            <img src={props.profilePictureUrl} alt={props.username} height="100" width="100"/>
                                        </div>
                                        <Button bsStyle="primary" onClick={props.showProfilePictureModal}>Change Profile Picture</Button>
                                    </FormGroup>
                                </div>

                                {errorElement}

                                <Row className="margin-top-20">
                                    <Col sm={6}>
                                        <Button block bsSize="large" bsStyle="primary" onClick={props.onChangeDetails}>Change Details</Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Link to="/change-password"><Button block bsStyle="danger" bsSize="large">Change Password</Button></Link>
                                    </Col>
                                </Row>

                            </div>                        

                        </Panel>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Grid>

            <ChangeProfilePictureComponent 
                profilePicture={props.profilePicture}
                uploaderConfig={props.uploaderConfig}
                uploadProgress={props.uploadProgress}
                show={props.profilePictureModalHandle}
                onHide={props.hideProfilePictureModal}>
            </ChangeProfilePictureComponent>
        </div>
    );
};
ChangeDetailsComponent.propTypes = {
    email: React.PropTypes.string.isRequired,
    onEmailChange: React.PropTypes.func.isRequired,

    username: React.PropTypes.string.isRequired,
    onUsernameChange: React.PropTypes.func.isRequired,

    profilePictureModalHandle: React.PropTypes.bool.isRequired,
    showProfilePictureModal: React.PropTypes.func.isRequired,
    hideProfilePictureModal: React.PropTypes.func.isRequired,

    uploaderConfig: React.PropTypes.any.isRequired,
    uploadProgress: React.PropTypes.number.isRequired,
    profilePicture: React.PropTypes.string.isRequired,

    profilePictureUrl: React.PropTypes.string.isRequired,

    error: React.PropTypes.string.isRequired,

    onChangeDetails: React.PropTypes.func.isRequired
}

export default ChangeDetailsComponent;