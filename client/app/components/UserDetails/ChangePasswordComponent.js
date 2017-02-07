import React, {PropTypes} from 'react';
import {Grid, Row, Col, Panel, Alert, Button} from 'react-bootstrap';
import FieldGroup from '../FieldGroup';

const ChangePasswordComponent = props => {

    let errorElement;
    if (props.error) {
        errorElement = <Alert className="align-center" bsStyle="danger">
                            <span>{props.error}</span>
                       </Alert>
    } else {
        errorElement = '';
    }

    return (
        <Grid className="margin-top-75">
            <Row>
                <Col smOffset={3} sm={6}>
                    <Panel>
                        <div className="align-center">
                            <h2>Change Password</h2>
                        </div>

                        <div className="margin-top-20">

                            <FieldGroup
                                id="password"
                                type="password"
                                label="Old Password"
                                placeholder="Your Old Password"
                                value={props.oldPassword}
                                onChange={props.onOldPasswordChange}/>

                            <FieldGroup
                                id="new-password"
                                type="password"
                                label="New Password"
                                placeholder="Your New Password"
                                value={props.newPassword}
                                onChange={props.onNewPasswordChange}/>

                            <FieldGroup
                                id="confirm-new-password"
                                type="password"
                                label="Confirm New Password"
                                placeholder="Confirm Your New Password"
                                value={props.confirmNewPassword}
                                onChange={props.onConfirmNewPasswordChange}/>

                            {errorElement}

                            <Row className="margin-top-20">
                                <Col sm={12}>
                                    <Button block bsSize="large" bsStyle="primary" onClick={props.onChangePassword}>Change Password</Button>
                                </Col>
                            </Row>
                        </div>                        
                    </Panel>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </Grid>
    );
};
ChangePasswordComponent.propTypes = {
    oldPassword: React.PropTypes.string.isRequired,
    onOldPasswordChange: React.PropTypes.func.isRequired,

    newPassword: React.PropTypes.string.isRequired,
    onNewPasswordChange: React.PropTypes.func.isRequired,

    confirmNewPassword: React.PropTypes.string.isRequired,
    onConfirmNewPasswordChange: React.PropTypes.func.isRequired,

    error: React.PropTypes.string.isRequired,

    onChangePassword: React.PropTypes.func.isRequired
}

export default ChangePasswordComponent;