import React, {PropTypes} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { Grid, Row, Col } from 'react-flexbox-grid';


const ChangePasswordComponent = props => {

    return (
        <Grid fluid className="margin-top-50">
            <Row>
                <Col xsOffset={1} xs={10} smOffset={2} sm={8} mdOffset={3} md={6}>
                    <Card style={{padding: '35px'}}>
                        <Row center="xs">
                            <Col xs={10}>
                                <h2 className="margin-top-20 align-center-horizontally">Change Password</h2>

                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="Old Password"
                                            floatingLabelText="Old Password"
                                            type="password"
                                            value={props.oldPassword}
                                            errorText={props.error.oldPassword}
                                            onChange={props.onOldPasswordChange}
                                        />
                                    </Col>
                                </Row>

                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="New Password"
                                            floatingLabelText="New Password"
                                            type="password"
                                            value={props.newPassword}
                                            errorText={props.error.newPassword}
                                            onChange={props.onNewPasswordChange}
                                        />
                                    </Col>
                                </Row>

                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="COnfirm New Password"
                                            floatingLabelText="Confirm New Password"
                                            type="password"
                                            value={props.confirmNewPassword}
                                            onChange={props.onConfirmNewPasswordChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-20">
                            <Col xsOffset={1} xs={10}>
                                <Row center="xs">
                                    <Col xs={12}>
                                        <RaisedButton onClick={props.onChangePassword} label="Change Password" fullWidth={true} primary={true} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Grid>
        // <Grid className="margin-top-75">
        //     <Row>
        //         <Col smOffset={3} sm={6}>
        //             <Panel>
        //                 <div className="align-center">
        //                     <h2>Change Password</h2>
        //                 </div>

        //                 <div className="margin-top-20">

        //                     <FieldGroup
        //                         id="password"
        //                         type="password"
        //                         label="Old Password"
        //                         placeholder="Your Old Password"
        //                         value={props.oldPassword}
        //                         onChange={props.onOldPasswordChange}/>

        //                     <FieldGroup
        //                         id="new-password"
        //                         type="password"
        //                         label="New Password"
        //                         placeholder="Your New Password"
        //                         value={props.newPassword}
        //                         onChange={props.onNewPasswordChange}/>

        //                     <FieldGroup
        //                         id="confirm-new-password"
        //                         type="password"
        //                         label="Confirm New Password"
        //                         placeholder="Confirm Your New Password"
        //                         value={props.confirmNewPassword}
        //                         onChange={props.onConfirmNewPasswordChange}/>

        //                     {errorElement}

        //                     <Row className="margin-top-20">
        //                         <Col sm={12}>
        //                             <Button block bsSize="large" bsStyle="primary" onClick={props.onChangePassword}>Change Password</Button>
        //                         </Col>
        //                     </Row>
        //                 </div>                        
        //             </Panel>
        //         </Col>
        //         <Col sm={3}></Col>
        //     </Row>
        // </Grid>
    );
};
ChangePasswordComponent.propTypes = {
    oldPassword: React.PropTypes.string.isRequired,
    onOldPasswordChange: React.PropTypes.func.isRequired,

    newPassword: React.PropTypes.string.isRequired,
    onNewPasswordChange: React.PropTypes.func.isRequired,

    confirmNewPassword: React.PropTypes.string.isRequired,
    onConfirmNewPasswordChange: React.PropTypes.func.isRequired,

    error: React.PropTypes.shape({
        oldPassword: React.PropTypes.string,
        newPassword: React.PropTypes.string
    }),

    onChangePassword: React.PropTypes.func.isRequired
}

export default ChangePasswordComponent;