import { Button, Col, Row, Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../loader';
import Message from '../message';
import { usersList as usersListAction } from '../../actions/user.actions';

const UsersScreen = () => {
  const dispatch = useDispatch();
  const usersLists = useSelector((state) => state.usersList);
  const { loading, error, users } = usersLists;
  useEffect(() => {
    dispatch(usersListAction());
  }, [dispatch]);

  const deleteHandler = (userId) => {
    console.log('Delete handler called');
  };
  return (
    <>
      <h2>Users List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <td>#</td>
              <td>ID</td>
              <td>Name</td>
              <td>Email </td>
              <td>ADMIN?</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    varian='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersScreen;
