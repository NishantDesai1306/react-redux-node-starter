import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const DashboardComponent = (props) => {
    return (
        <Grid>
            <Row>
                <Col sm={12}>
                    <h2>Welcome <strong>{props.username}</strong> to React Node Starter</h2>
                </Col>
            </Row>
        </Grid>
    );
};

DashboardComponent.propTypes = {
    username: React.PropTypes.string.isRequired
};

export default DashboardComponent;