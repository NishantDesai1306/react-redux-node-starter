import React, {Component} from 'react';
import DashbordComponent from '../components/DashboardComponent';
import AuthSerivce from '../services/AuthService';
import {connect} from 'react-redux';

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DashbordComponent username={this.props.user.username}></DashbordComponent>
        );
    }
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps, null)(DashboardContainer);