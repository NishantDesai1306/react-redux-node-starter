import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CheckBox from 'material-ui/CheckBox';
import RaisedButton from 'material-ui/RaisedButton';

import { Grid, Row, Col } from 'react-flexbox-grid';

const LoginComponent = props => {

    return (
        <Grid fluid className="margin-top-50">
            <Row>
                <Col xsOffset={1} xs={10} smOffset={2} sm={8} mdOffset={3} md={6}>
                    <Card style={{padding: '35px'}}>
                        <Row center="xs">
                            <Col xs={10}>
                                <h2 className="margin-top-20 align-center-horizontally">Login</h2>

                                <Row center="xs">
                                    <Col xs={12}>
                                        <TextField
                                            style={{width: '100%'}}
                                            hintText="Username or Email"
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
                                            hintText="Password Field"
                                            floatingLabelText="Password"
                                            type="password"
                                             value={props.password}
                                             errorText={props.error.password}
                                            onChange={props.onPasswordChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-20">
                            <Col xsOffset={1} xs={10}>
                                <Row>
                                    <Col xs={12}>
                                        <CheckBox
                                            label={"Remember Me"}
                                            checked={props.isRemeberMeChecked} 
                                            onClick={props.onRememberMeChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="margin-top-20">
                            <Col xsOffset={1} xs={10}>
                                <Row center="xs">
                                    <Col xs={6}>
                                        <RaisedButton onClick={props.onLogin} label="Login" fullWidth={true} primary={true} />
                                    </Col>
                                    <Col xs={6}>
                                        <Link to="/register">
                                            <RaisedButton label="Register" fullWidth={true} primary={true} />                                        
                                        </Link>
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
LoginComponent.propTypes = {
    email: React.PropTypes.string.isRequired,
    onEmailChange: React.PropTypes.func.isRequired,

    password: React.PropTypes.string.isRequired,
    onPasswordChange: React.PropTypes.func.isRequired,

    isRemeberMeChecked: React.PropTypes.bool.isRequired,
    onRememberMeChange: React.PropTypes.func.isRequired,

    error: React.PropTypes.shape({
        email: React.PropTypes.string,
        password: React.PropTypes.string,
    }),

    onLogin: React.PropTypes.func.isRequired
}

export default LoginComponent;