import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from '../context/User.context';

const AppNavbar = () => {
    const [user, setUser] = useContext(UserContext);
    
    return (
        <Navbar
        collapseOnSelect expand="sm" bg="light" variant="light">
            
            <LinkContainer exact={true} to="/" activeClassName="active">
                <Nav.Item as={AppNavbar.Brand}>
                    eLibrary
                </Nav.Item>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                {!user.isAuthenticated &&
                <LinkContainer to="/signup" activeClassName="active">
                    <Nav.Item as={Nav.Link}>Sign Up</Nav.Item>
                </LinkContainer>}
                {!user.isAuthenticated &&
                <LinkContainer to="/login" activeClassName="active">
                    <Nav.Item as={Nav.Link}>Log In</Nav.Item>
                </LinkContainer>}

                {user.isAuthenticated && <Nav.Item as={Nav.Link}>{user.name}</Nav.Item>}
                {user.isAuthenticated && <Nav.Item as={Nav.Link} onClick={async ()=>{
                    let res = await fetch('/user/signout/', {method: 'POST'});
                    setUser((user)=> {
                        user = {isAuthenticated: false};
                        return user;
                    });
                }}>Log Out</Nav.Item>}
            </Navbar.Collapse> 
        </Navbar>
    );
};

export default AppNavbar;