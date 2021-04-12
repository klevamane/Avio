import { Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import Message from '../message';
import Product from '../../components/Product';
import { listProducts as listProductsAction } from '../../actions/product';

const HomeScreen = () => {
  const dispatch = useDispatch();

  // The productList, is the same key we used in the store at combineReducers
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);

  return (
    <>
      <h3>Latest products</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
