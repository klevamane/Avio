import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Product from '../../components/Product';
import { listProducts } from '../../actions/product';

const HomeScreen = () => {
  const dispatch = useDispatch();

  // The productList, is the same key we used in the store at combineReducers
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h3>Latest products</h3>
      <Row>
        {loading ? (
          <h2>Loading.....</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
