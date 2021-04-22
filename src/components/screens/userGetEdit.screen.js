import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import Message from '../message';
import { getAnyUser } from '../../actions/user.actions';

const UserGetEditScreen = ({ history, location, match }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, SetisAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const authLoginInfo = useSelector((state) => state.authLoginInfo);
  let { error, loggedInUserInfo } = authLoginInfo;

  const userGetAnyUser = useSelector((state) => state.userGetAnyUser);
  const {
    error: getAnyUserError,
    loading: getUserLoading,
    user,
  } = userGetAnyUser;

  useEffect(() => {
    if (!loggedInUserInfo) {
      // redirect to login if the user is not loggedin
      history.push('/auth/login');
    } else {
      if (!user.name || user._id !== match.params.id) {
        dispatch(getAnyUser(match.params.id));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, loggedInUserInfo, getUserLoading, dispatch, user, match]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch update profile
    console.log('Submitted');
  };

  return (
    <>
      {message ? <Message variant='danger'>{message}</Message> : ''}
      {error ? <Message variant='danger'>{error}</Message> : ''}

      {getUserLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='is-admin'>
                <Form.Check
                  type='checkbox'
                  label='Admin'
                  value={isAdmin}
                  onChange={(e) => SetisAdmin(e.target.value)}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>
                Update User
              </Button>
            </Form>
          </Col>
          <Col md={9}></Col>
        </Row>
      )}
    </>
  );
};

export default UserGetEditScreen;
