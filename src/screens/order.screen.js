import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/order.constant';
import React, { useEffect, useState } from 'react';
import { deliverOrder, getOrderById, payOrder } from '../actions/order.actions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Loader from '../components/loader';
import Message from '../components/message';
import Meta from '../components/meta';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { empty } from '../utils';

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const authLoginInfo = useSelector((state) => state.authLoginInfo);
  let user;

  const { loggedInUserInfo } = authLoginInfo;
  if (!empty(authLoginInfo)) {
    user = loggedInUserInfo.user;
  } else {
    user = {};
  }
  const orderPay = useSelector((state) => state.orderPay);
  // get success as successPay and loading as well
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDelivery, loading: deliveryLoading } = orderDeliver;

  if (!loading && order) {
    // Calculate the prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (empty(authLoginInfo) || empty(user)) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId || successDelivery) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderById(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    order,
    successPay,
    successDelivery,
    user,
    orderId,
    authLoginInfo,
    history,
    dispatch,
  ]);

  const successPaymentHandler = (paymentResult) => {
    // The paymentResult is an object that comes from
    // paypal upon successful transaction
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const submitDeliveryHandler = (e) => {
    e.preventDefault();
    dispatch(deliverOrder(orderId));
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDeliveryHandler = () => {
    handleShow();
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='Order details' />
      <h2>
        ORDER <span className='text-muted'>{order._id}</span>
      </h2>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='text-uppercase'>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered</Message>
              ) : (
                <Message variant='danger'>Delivery is pending</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='text-uppercase'>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Payment completed</Message>
              ) : (
                <Message variant='danger'>
                  Payment is pending {order.isPaid}
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='text-uppercase'>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>No item(s) to display</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}></Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='text-uppercase'>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}{' '}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {/* {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )} */}
              {deliveryLoading && <Loader />}
              {!empty(user) && user.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    onClick={confirmDeliveryHandler}
                  >
                    Mark as delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delivery!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this order as delivered?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='light' onClick={submitDeliveryHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderScreen;
