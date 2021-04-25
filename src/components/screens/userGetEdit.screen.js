import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {
  getAnyUser,
  updateAnyUser as updateAnyUserAction,
} from '../../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import Message from '../message';
import { USER_UPDATE_ANY_DETAILS_RESET } from '../../constants/user.constants';

const UserGetEditScreen = ({ history, location, match }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, SetIsAdmin] = useState(false);
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

  const updateAnyUser = useSelector((state) => state.updateAnyUser);
  const {
    success: successUpdate,
    loading: updateAnyUserLoading,
  } = updateAnyUser;

  useEffect(() => {
    if (!loggedInUserInfo) {
      // redirect to login if the user is not loggedin
      history.push('/auth/login');
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ANY_DETAILS_RESET });
      history.push('/admin/users');
    } else {
      if (user.name || user._id === match.params.id) {
        setName(user.name);
        setEmail(user.email);
        SetIsAdmin(user.isAdmin);
      }
    }
  }, [history, loggedInUserInfo, user, successUpdate, dispatch, match]);

  useEffect(() => {
    dispatch(getAnyUser(match.params.id));
  }, [dispatch, match]);
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch update profile
    dispatch(updateAnyUserAction(match.params.id, { name, email, isAdmin }));
  };

  return (
    <>
      {updateAnyUserLoading && <Loader />}
      {message ? <Message variant='danger'>{message}</Message> : ''}
      {successUpdate && <Message>Update successful</Message>}
      {error ? <Message variant='danger'>{error}</Message> : ''}
      {getAnyUserError ? (
        <Message variant='danger'>{getAnyUserError}</Message>
      ) : (
        ''
      )}

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
                  onChange={(e) => SetIsAdmin(e.target.value)}
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
