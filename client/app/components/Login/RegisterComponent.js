import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SocialPersonAdd from 'material-ui/svg-icons/social/person-add'

import { Grid, Row, Col } from 'react-flexbox-grid';

const RegisterComponent = props => {

    return (
        <Grid fluid className="margin-top-50">
            <Row>
                <Col xsOffset={1} xs={10} smOffset={2} sm={8} mdOffset={3} md={6}>
                    <Card style={{padding: '35px'}}>
                        <Row center="xs">
                            <Col xs={10}>
                                <h2 className="margin-top-20 align-center-horizontally">
                                    Register
                                </h2>

                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="Email"
                                            floatingLabelText="Email"
                                            value={props.email}
                                            errorText={props.error.email}
                                            onChange={props.onEmailChange}
                                        />
                                    </Col>
                                </Row>

                                 <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="Username"
                                            floatingLabelText="Username"
                                            value={props.username}
                                            errorText={props.error.username}
                                            onChange={props.onUsernameChange}
                                        />
                                    </Col>
                                </Row>


                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="Password"
                                            floatingLabelText="Password"
                                            type="password"
                                            value={props.password}
                                            errorText={props.error.password}
                                            onChange={props.onPasswordChange}
                                        />
                                    </Col>
                                </Row>

                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="Confirm Password"
                                            floatingLabelText="Confirm Password"
                                            type="password"
                                             value={props.confirmPassword}
                                            onChange={props.onConfirmPasswordChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-20">
                            <Col xsOffset={1} xs={10}>
                                <Row center="xs">
                                    <Col xs={12}>
                                        <RaisedButton label="Register" onClick={props.onRegister} fullWidth={true} primary={true} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Grid>
    );
};
RegisterComponent.propTypes = {
    email: React.PropTypes.string.isRequired,
    onEmailChange: React.PropTypes.func.isRequired,

    username: React.PropTypes.string.isRequired,
    onUsernameChange: React.PropTypes.func.isRequired,

    password: React.PropTypes.string.isRequired,
    onPasswordChange: React.PropTypes.func.isRequired,

    confirmPassword: React.PropTypes.string.isRequired,
    onConfirmPasswordChange: React.PropTypes.func.isRequired,

    error: React.PropTypes.shape({
        email: React.PropTypes.string,
        username: React.PropTypes.string,
        password: React.PropTypes.string
    }),

    onRegister: React.PropTypes.func.isRequired
}

export default RegisterComponent;