import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_EDIT_RESET,
} from '../../constants/product';
import React, { useEffect, useState } from 'react';
import { editProduct, getProductDetails } from '../../actions/product';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import Message from '../message';

const ProductEditScreen = ({ history, location, match }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const authLoginInfo = useSelector((state) => state.authLoginInfo);
  let { error, loggedInUserInfo } = authLoginInfo;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    product,
    loading: loadingGetProduct,
    error: getProductError,
  } = productDetails;

  const productEdit = useSelector((state) => state.productEdit);
  const {
    loading: editLoading,
    success: successUpdate,
    error: editError,
  } = productEdit;

  useEffect(() => {
    if (!loggedInUserInfo) {
      // redirect to login if the user is not loggedin
      history.push('/auth/login');
    }
    if (successUpdate) {
      // prevents unintended behaviour
      // when a product is edidted and returns
      // to the product list screen, clicking
      // on the product again won't go to
      // the edit screen
      dispatch({ type: PRODUCT_EDIT_RESET });
      history.push('/admin/products');
    } else {
      if (product.name || product._id === match.params.id) {
        setName(product.name);
        setCategory(product.category);
        setDescription(product.description);
        setBrand(product.brand);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setImage(product.image);
      }
    }
  }, [history, loggedInUserInfo, successUpdate, product, dispatch, match]);

  useEffect(() => {
    // on load/mount
    // dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch(getProductDetails(match.params.id));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch update profile
    dispatch(
      editProduct(match.params.id, {
        name,
        description,
        category,
        countInStock,
        price,
        brand,
        image,
      }),
    );
  };

  return (
    <>
      {message && <Message variant='danger'>{message}</Message>}
      {successUpdate && <Message>Update successful;</Message>}
      {error ? <Message variant='danger'>{error}</Message> : ''}
      {getProductError && <Message variant='danger'>{getProductError}</Message>}
      {editError && <Message variant='danger'>{editError}</Message>}

      {editLoading || loadingGetProduct ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3}>
            <h2>Edit Product</h2>
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
              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='Description'>
                <Form.Label>description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Number in stock</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter number in stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='Price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={9}></Col>
        </Row>
      )}
    </>
  );
};

export default ProductEditScreen;
