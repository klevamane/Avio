import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import { logout } from '../actions/auth.actions';

const Header = () => {
  const dispatch = useDispatch();
  const authLoginInfo = useSelector((state) => state.authLoginInfo);

  const { loggedInUserInfo } = authLoginInfo;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AVIO</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  Cart <FontAwesomeIcon icon='shopping-cart' />
                </Nav.Link>
              </LinkContainer>
              {loggedInUserInfo && loggedInUserInfo.user ? (
                <NavDropdown
                  title={loggedInUserInfo.user.name}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item>
                    <Link to={'/profile'}>Profile</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/auth/login'>
                  <Nav.Link>
                    SignIn <FontAwesomeIcon icon='user' />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
