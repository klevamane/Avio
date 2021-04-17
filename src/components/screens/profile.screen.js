import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { getUserDetails, updateUserProfile } from '../../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Message from '../message';

const ProfileScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const authLoginInfo = useSelector((state) => state.authLoginInfo);
  let { error, loading, loggedInUserInfo } = authLoginInfo;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!loggedInUserInfo) {
      // redirect to login if the user is not loggedin
      history.push('/auth/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, loggedInUserInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password and Confirm password must be the same');
    } else {
      // Dispatch update profile
      dispatch(
        updateUserProfile({
          name,
          email,
          password,
        }),
      );
    }
  };

  return (
    <>
      {success && <Message>Profile update</Message>}
      {message ? <Message variant='danger'>{message}</Message> : ''}
      {error ? <Message variant='danger'>{error}</Message> : ''}

      {loading ? (
        <Spinner />
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

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirm-password'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Re-enter the password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Update profile
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>Orders</h2>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileScreen;
