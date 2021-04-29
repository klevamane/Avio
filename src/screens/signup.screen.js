import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/form.container.component';
import { Link } from 'react-router-dom';
import Message from '../components/message.component';
import { signup } from '../actions/auth.actions';
import Meta from '../components/meta.component';

const SignupScreen = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const authSignupInfo = useSelector((state) => state.authSignupInfo);
	let { error, loading, loggedInUserInfo } = authSignupInfo;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();

	useEffect(() => {
		// if there is currently a logged in user, redirect to index page
		// this will prevent an already logged in user from accessing this screen/page
		if (loggedInUserInfo && Object.entries(loggedInUserInfo).length > 0) {
			history.push(redirect);
		}
	}, [history, loggedInUserInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Password and Confirm password must be the same');
		} else {
			// Dispatch signup
			dispatch(signup(email, password, name));
		}
	};

	return (
		<>
			<Meta
				title='Login'
				description='The best value products online'
				keyword='tv smartphones electronics'
			/>
			{message ? <Message variant='danger'>{message}</Message> : ''}
			{error ? <Message variant='danger'>{error}</Message> : ''}

			{loading ? (
				<Spinner />
			) : (
				<FormContainer>
					<h2>SignUp</h2>
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
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='confirm-password'>
							<Form.Label>Confirm password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Re-enter the password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Sign up
						</Button>
						<Row className='py-3'>
							<Col>
								Existing customer?{' '}
								<Link to={redirect ? `login?redirect=${redirect}` : 'login'}>
									Sign in
								</Link>
							</Col>
						</Row>
					</Form>
				</FormContainer>
			)}
		</>
	);
};

export default SignupScreen;
