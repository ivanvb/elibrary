import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {withRouter} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from '../context/User.context';

const AppNavbar = (props) => {
    const {pathname} = props.location;
    const [user, setUser] = useContext(UserContext);
    
    return (
        <Navbar
        collapseOnSelect className="mb-3" expand="sm" bg="light" variant="light">
            
            <LinkContainer exact={true} to="/" activeClassName="active">
                <Nav.Item as={AppNavbar.Brand}>
                    eLibrary
                </Nav.Item>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                {!user.isAuthenticated && pathname !== '/signup' &&
                <LinkContainer to="/signup" activeClassName="active">
                    <Nav.Item as={Nav.Link}>Sign Up</Nav.Item>
                </LinkContainer>}
                {!user.isAuthenticated && pathname !== '/login' && 
                <LinkContainer to="/login" activeClassName="active">
                    <Nav.Item as={Nav.Link}>Log In</Nav.Item>
                </LinkContainer>}
                

                {user.isAuthenticated && user.admin &&
                <LinkContainer to="/createBook" activeClassName="active">
                    <Nav.Item as={Nav.Link}>Create Book</Nav.Item>
                </LinkContainer>}


                {user.isAuthenticated && 
                <LinkContainer to="/myprofile" activeClassName="active">
                    <Nav.Item as={Nav.Link}>{user.name}</Nav.Item>
                </LinkContainer>}
                {user.isAuthenticated && <Nav.Item as={Nav.Link} onClick={async ()=>{
                    await fetch('/user/signout/', {method: 'POST'});
                    setUser((user)=> {
                        user = {isAuthenticated: false};
                        return user;
                    });
                }}>Log Out</Nav.Item>}
            </Navbar.Collapse> 
        </Navbar>
    );
};

export default withRouter(AppNavbar);