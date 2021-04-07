import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Rating from '../Rating';
import axios from 'axios';
import products from '../../products';

const ProductScreen = ({ match }) => {
  // const product = products.find((product) => product._id == match.params.id);
  const [product, setproduct] = useState({});
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${match.params.id}`,
      );
      setproduct(data);
    };
    getProduct();
  }, []);

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={6}>
          {/* use fluid to keep the image within it's contianer */}
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          {/* use flush to remove border */}
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={` from ${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <span
                    style={{
                      color: product.countInStock == 0 ? 'red' : '',
                    }}
                  >
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                className='btn-block'
                type='button'
                disabled={product.countInStock == 0}
              >
                Add to cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
