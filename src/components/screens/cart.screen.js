import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import React, { useEffect } from 'react';
import { addTocCart, removeFromCart } from '../../actions/cart.actions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Message from '../message';

const CartScreen = ({ history, location, match }) => {
  const productId = match.params.id;
  //   split using the delimeter "=" therefor the url having
  //   ?qty=1 becomes an array ['qty', 1], so we take the Number
  //   at the 1 index
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addTocCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    //   if the user isn't logged In, the user will
    //   be redirected to login, but if the user
    //   is logged in, the user will be redirected to
    //   shipping
    history.push('/login?redirect=shipping');
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to={'/'}>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant={'flush'}>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    {/* since product is used as the id here */}
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addTocCart(item.product, Number(e.target.value)),
                        )
                      }
                    >
                      {/* restrict the maximum number of items to be selected to 20 even 
                        if the total number of quatity available for a particular product is 
                        more than 20 
                        
                        Also use the array as a reference to set the select options
                        */}
                      {[
                        ...Array(
                          item.countInStock > 20 ? 20 : item.countInStock,
                        ).keys(),
                      ].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type={'button'}
                      variant={'light'}
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.qty,
                  0,
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (accumulator, item) => accumulator + item.qty * item.price,
                  0,
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
