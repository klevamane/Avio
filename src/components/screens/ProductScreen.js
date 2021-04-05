import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../Rating";
import products from "../../products";

const ProductScreen = ({ match }) => {
  {
    console.log("matching - - ", match.params.id);
  }
  const product = products.find((product) => product._id == match.params.id);
  {
    console.log("after matching - - > ", product);
  }
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
                  <stron>${product.price}</stron>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <span
                    style={{
                      color: product.countInStock == 0 ? "red" : "",
                    }}
                  >
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
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
