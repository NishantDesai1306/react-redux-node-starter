import React from 'react';
import {Link} from 'react-router'; 
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';

const AppComponent = (props) => {

    let userMenu = '';
    if(props.username) {
        userMenu =  <Nav pullRight>
            <NavItem onClick={props.goToDashboard}>Dashboard</NavItem>
            <NavDropdown id="user-menu" noCaret title={<div><Glyphicon glyph="user"/> &nbsp; {props.username}</div>}>
                <MenuItem onClick={props.onLogout}>Logout</MenuItem>
            </NavDropdown>
        </Nav>;
    }
    else {
        userMenu = <Nav pullRight>
            <NavItem onClick={props.goToLogin}>Login</NavItem>
        </Nav>;
    }

    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link className="navbar-brand" to="/">React-Redux Node Starter</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                {userMenu}
            </Navbar>

            {props.children}
        </div>
    );
};

AppComponent.propTypes = {
    username: React.PropTypes.string,
    onLogout: React.PropTypes.func.isRequired,
    goToDashboard: React.PropTypes.func.isRequired,
    goToLogin: React.PropTypes.func.isRequired
};

export default AppComponent;