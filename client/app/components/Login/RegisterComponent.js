import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col, Panel, Button, Alert} from 'react-bootstrap';
import FieldGroup from '../FieldGroup';

const RegisterComponent = props => {

    let errorElement = '';
    if (props.error) {
        errorElement = <Alert className="align-center" bsStyle="danger">
            <span>{props.error}</span>
        </Alert>;
    }

    return (
        <Grid className="margin-top-50">
            <Row>
                <Col sm={4} smOffset={4}>
                    <Panel>
                        <div className="center-align">
                            <h2>Register</h2>
                        </div>

                        <div className="margin-top-20">
                            <FieldGroup
                                id="email"
                                type="email"
                                label="Email Address"
                                placeholder="Email"
                                value={props.email}
                                onChange={props.onEmailChange}/>

                            <FieldGroup
                                id="username"
                                type="text"
                                label="Username"
                                placeholder="Username"
                                value={props.username}
                                onChange={props.onUsernameChange}/>

                            <FieldGroup
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                value={props.password}
                                onChange={props.onPasswordChange}/>

                            <FieldGroup
                                id="confirm-password"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                value={props.confirmPassword}
                                onChange={props.onConfirmPasswordChange}/>
                                
                            {errorElement}

                            <Row className="margin-top-20">
                                <Col sm={12}>
                                    <Button bsStyle="primary" bsSize="large" block onClick={props.onRegister}>Register</Button>
                                </Col>
                            </Row>
                        </div>

                    </Panel>
                </Col>
                <Col sm={4}></Col>
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

    error: React.PropTypes.string.isRequired,

    onRegister: React.PropTypes.func.isRequired
}

export default RegisterComponent;