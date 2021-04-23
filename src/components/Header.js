import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                  <LinkContainer to={'/user/profile'}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {/* <NavDropdown.Item>
                    <Link to={'/user/profile'}>Profile</Link>
                  </NavDropdown.Item> */}

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
              {loggedInUserInfo &&
                loggedInUserInfo.user &&
                loggedInUserInfo.user.isAdmin && (
                  <NavDropdown title='Admin' id='admin-menu'>
                    <LinkContainer to={'/admin/users'}>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />
                    <LinkContainer to={'/admin/products'}>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />
                    <LinkContainer to={'/admin/orders'}>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
