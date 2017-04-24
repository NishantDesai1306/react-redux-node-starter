import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const DashboardComponent = (props) => {
    return (
        <Grid>
            <Row>
                <Col sm={12}>
                    <Row center="xs">
                        <Col xs={12}>
                            <h2>Welcome <strong>{props.username}</strong> to React Node Starter</h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    );
};

DashboardComponent.propTypes = {
    username: React.PropTypes.string
};

export default DashboardComponent;