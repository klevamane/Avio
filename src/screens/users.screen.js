import { Button, Modal, Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import {
	deleteUser,
	usersList as usersListAction,
} from '../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/loader.component';
import Message from '../components/message.component';
import { useState } from 'react';

const UsersScreen = ({ history }) => {
	const dispatch = useDispatch();
	const usersLists = useSelector((state) => state.usersList);
	const { loading, error, users } = usersLists;

	const authLoginInfo = useSelector((state) => state.authLoginInfo);
	const { loggedInUserInfo } = authLoginInfo;

	const userDelete = useSelector((state) => state.userDelete);
	const { success, loading: deleteUserLoading } = userDelete;

	useEffect(() => {
		if (loggedInUserInfo && loggedInUserInfo.user.isAdmin) {
			dispatch(usersListAction());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, loggedInUserInfo, success, deleteUserLoading]);

	const [show, setShow] = useState(false);
	const [userToBeDeletedId, setUserToBeDeletedId] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const deleteHandler = (userId) => {
		dispatch(deleteUser(userId));
		handleClose();
	};

	const confirmDeleteHandler = (userId) => {
		handleShow();
		setUserToBeDeletedId(userId);
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
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											Edit
										</Button>
									</LinkContainer>
									<Button
										varian='danger'
										className='btn-sm'
										onClick={() => confirmDeleteHandler(user._id)}
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
				<Modal.Body>Are you sure you want to delete this user?</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='danger'
						onClick={() => deleteHandler(userToBeDeletedId)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default UsersScreen;
