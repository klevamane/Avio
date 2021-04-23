import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/product';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../loader';
import Message from '../message';
import { useState } from 'react';

const ProductsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const authLoginInfo = useSelector((state) => state.authLoginInfo);
  const { loggedInUserInfo } = authLoginInfo;

  const productList = useSelector((state) => state.productList);
  const { products, error, loading: productsLoading } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: deleteLoading,
    error: deleteError,
  } = productDelete;

  useEffect(() => {
    if (loggedInUserInfo && loggedInUserInfo.user.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, loggedInUserInfo]);

  const [show, setShow] = useState(false);
  const [productToBeDeleted, setUserToBeDeletedId] = useState(null);

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    error: createError,
    loading: loadingCreate,
    product: newProduct,
  } = productCreate;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = (productId) => {
    dispatch(deleteProduct(productId));
    handleClose();
  };

  const createHandler = () => {
    dispatch(createProduct());
    if (successCreate) {
      history.push(`/admin/product/edit/${newProduct._id}`);
    }
  };

  const confirmDeleteHandler = (productId) => {
    handleShow();
    setUserToBeDeletedId(productId);
  };

  return (
    <>
      {createError && <Message variant='danger'>{createError}</Message>}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      <Row className='my-3'>
        <Col>
          <h2>Products List</h2>
        </Col>
        <Col className='text-right'>
          <Button className='' onClick={createHandler}>
            +Create Product
          </Button>
        </Col>
      </Row>

      {productsLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Brand</td>
              <td>Category</td>
              <td>Price</td>
              <td>Number in stock</td>
              <td>Updated at </td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.updatedAt.substring(0, 10)}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    varian='danger'
                    className='btn-sm'
                    onClick={() => confirmDeleteHandler(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='danger'
            onClick={() => deleteHandler(productToBeDeleted)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsListScreen;