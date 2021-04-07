import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import Product from '../../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const {
        data: { products },
      } = await axios.get('http://localhost:5000/api/products');

      setproducts(products);
    };
    getProducts();
  }, []);
  return (
    <>
      <h3>Latest products</h3>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
