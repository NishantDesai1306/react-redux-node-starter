import React from 'react';
import {Link} from 'react-router'; 

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo800, indigo600, indigo50} from 'material-ui/styles/colors';

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo800,
    primary2Color: indigo600,
    textColor: indigo600
  }
});

const AppComponent = (props) => {

    let userMenu = '';
    if(props.username) {
        userMenu = <div className="align-center-vertically">
            <IconButton onTouchTap={props.goToDashboard} tooltip="Dashboard">
                <ActionDashboard color={indigo50} />
            </IconButton>
            <IconMenu
                onItemTouchTap={props.onUserMenuItemSelected}
                iconButtonElement={
                    <FlatButton
                        style={{color: indigo50}}
                        icon={<ActionAccountCircle color={indigo50} />}
                        label={props.username}
                    />
                }
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                <MenuItem key='user-details' style={{color: indigo600}} primaryText="User Details" leftIcon={<SocialPerson color={indigo600}/>} />
                <MenuItem key='logout' style={{color: indigo600}} primaryText="Logout" leftIcon={<ActionExitToApp color={indigo600}/>} />
            </IconMenu>
        </div>
    }
    else {
        userMenu = <FlatButton onTouchTap={props.goToLogin} style={{color: indigo50}} label="Login" />;
    }

    let titleElement = <span>
        <Link to="/" style={styles.appTitle}>React-Redux Node Starter</Link>
    </span>;

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    title={titleElement}
                    iconElementLeft={<div></div>}
                    iconElementRight={userMenu}
                />
                
                {props.children}
            </div>
        </MuiThemeProvider>

    );
};

const styles = {
    appTitle: {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer'
    }
}

AppComponent.propTypes = {
    username: React.PropTypes.string,
    profilePictureUrl: React.PropTypes.string,
    onUserMenuItemSelected: React.PropTypes.func.isRequired,
    goToDashboard: React.PropTypes.func.isRequired,
    goToLogin: React.PropTypes.func.isRequired
};

export default AppComponent;