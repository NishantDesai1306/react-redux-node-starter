import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col, Panel, Alert, Button, Checkbox, FormGroup} from 'react-bootstrap';
import FieldGroup from '../FieldGroup';

const LoginComponent = props => {

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
                <Col smOffset={4} sm={4}>
                    <Panel>
                        <div className="center-align">
                            <h2>Login</h2>
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
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                value={props.password}
                                onChange={props.onPasswordChange}/>

                            <Checkbox value={props.isRemeberMeChecked} onClick={props.onRememberMeChange}>
                                <strong>Remember Me</strong>
                            </Checkbox>

                            {errorElement}

                            <Row className="margin-top-20">
                                <Col sm={6}>
                                    <Button block bsSize="large" bsStyle="primary" onClick={props.onLogin}>Login</Button>
                                </Col>
                                <Col sm={6}>
                                    <Link to="/register"><Button block bsSize="large">Register</Button></Link>
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
LoginComponent.propTypes = {
    email: React.PropTypes.string.isRequired,
    onEmailChange: React.PropTypes.func.isRequired,

    password: React.PropTypes.string.isRequired,
    onPasswordChange: React.PropTypes.func.isRequired,

    isRemeberMeChecked: React.PropTypes.bool.isRequired,
    onRememberMeChange: React.PropTypes.func.isRequired,

    error: React.PropTypes.string.isRequired,

    onLogin: React.PropTypes.func.isRequired
}

export default LoginComponent;