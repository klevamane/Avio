import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../Form.container';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import Message from '../message';
import { USER_LOGIN_REQUEST } from '../../constants/auth.constants';
import { authLoginReducer } from '../../reducers/auth.reducers';
import { login } from '../../actions/auth.actions';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authLoginInfo = useSelector((state) => state.authLoginInfo);

  console.log('CH CHA ', authLoginInfo);
  const { error, loading, loginUserInfo } = authLoginInfo;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {error ? <Message variant='danger'>{error}</Message> : ''}

      {loading ? (
        <Spinner />
      ) : (
        <FormContainer>
          <h2>SignIn</h2>
          <Form onSubmit={submitHandler}>
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
            <Button type='submit' variant='primary'>
              SignIn
            </Button>
            <Row className='py-3'>
              <Col>
                New customer?{' '}
                <Link
                  to={redirect ? `/signup?redirect=${redirect}` : '/signup'}
                >
                  create a new account
                </Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default LoginScreen;
