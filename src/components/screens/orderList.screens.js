import { Button, Col, Row, Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../loader';
import Message from '../message';
import { getAllOrders } from '../../actions/order.actions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const authLoginInfo = useSelector((state) => state.authLoginInfo);
  const { loggedInUserInfo } = authLoginInfo;

  const orderList = useSelector((state) => state.orderGetAllOrder);
  const { orders, error, loading: getAllordersLoading } = orderList;

  useEffect(() => {
    if (!loggedInUserInfo && !loggedInUserInfo.user.isAdmin) {
      history.push('/login');
    }
    dispatch(getAllOrders());
  }, [dispatch, history, loggedInUserInfo]);

  return (
    <>
      <Row className='my-3'>
        <Col>
          <h2>Orders List</h2>
        </Col>
      </Row>

      {getAllordersLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <td>#</td>
              <td>User</td>
              <td>Shipping Address</td>
              <td>Shipping Price</td>
              <td>Total</td>
              <td>Payment Method</td>
              <td>Order Date</td>
              <td>Delivery Date</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/admin/products/edit/${order._id}`}>
                    {order.user._id}
                  </Link>
                </td>
                <td>{order.shippingAddress.city}</td>
                <td>${order.shippingPrice}</td>
                <td>${order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.deliveredAt && order.deliveredAt.substring(0, 10)}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
