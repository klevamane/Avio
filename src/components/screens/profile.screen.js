import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { getUserDetails, updateUserProfile } from '../../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Loader from '../loader';
import Message from '../message';
import { listSingleUserOrders } from '../../actions/order.actions';

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

  const orderSingleUserOrders = useSelector(
    (state) => state.orderSingleUserOrders,
  );
  const {
    loading: singleUserOrdersLoading,
    orders: singleUserOrders,
    singleUserOrdersErrors,
  } = orderSingleUserOrders;

  useEffect(() => {
    if (!loggedInUserInfo) {
      // redirect to login if the user is not loggedin
      history.push('/auth/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listSingleUserOrders());
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
            {singleUserOrdersLoading ? (
              <Loader />
            ) : singleUserOrdersErrors ? (
              <Message variant='danger'>{singleUserOrdersLoading}</Message>
            ) : (
              <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {singleUserOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.total}</td>
                      <td>
                        {order.isPaid ? (
                          order.createdAt.substring(0, 10)
                        ) : (
                          <Button>Close</Button>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <span>No</span>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileScreen;
