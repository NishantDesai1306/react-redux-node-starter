import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FileUpload from 'react-fileupload';

import { Grid, Row, Col } from 'react-flexbox-grid';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import ProfilePictureComponent from '../../containers/UserDetails/ProfilePictureComponent';

const ChangeDetailsComponent = props => {

    return (
         <Grid fluid className="margin-top-50">
            <Row>
                <Col xsOffset={1} xs={10} smOffset={2} sm={8} mdOffset={3} md={6}>
                    <Card style={{padding: '35px'}}>
                        <Row center="xs">
                            <Col xs={10}>
                                <h2 className="margin-top-20 align-center-horizontally">User Details</h2>

                                <Row center="xs">
                                    <ProfilePictureComponent profilePictureUrl={props.profilePictureUrl} username={props.username}></ProfilePictureComponent>
                                </Row>

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
                            </Col>
                        </Row>

                        <Row className="margin-top-20">
                            <Col xsOffset={1} xs={10}>
                                <Row center="xs">
                                    <Col xs={6}>
                                        <RaisedButton onClick={props.onChangeDetails} label="Save Changes" fullWidth={true} primary={true} />
                                    </Col>
                                    <Col xs={6}>
                                        <Link to="/change-password">
                                            <RaisedButton label="Change Password" fullWidth={true} primary={true} />                                        
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
ChangeDetailsComponent.propTypes = {
    email: React.PropTypes.string.isRequired,
    onEmailChange: React.PropTypes.func.isRequired,

    username: React.PropTypes.string.isRequired,
    onUsernameChange: React.PropTypes.func.isRequired,
    
    profilePictureUrl: React.PropTypes.string.isRequired,

    error: React.PropTypes.shape({
        email: React.PropTypes.string,
        username: React.PropTypes.string,
    }),

    onChangeDetails: React.PropTypes.func.isRequired
}

export default ChangeDetailsComponent;