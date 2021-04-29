import { Button, Col, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../components/checkoutSteps.component';
import { FormContainer } from '../components/form.container.component';
import { savePaymentMethod } from '../actions/cart.actions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const dispatch = useDispatch();

	//   fill these fields with the shipping address from the local storage
	//   initially, if the data exists in the localStorage
	const [paymentMethod, setPaymentMethod] = useState('Paypal');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />

			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select payment method</Form.Label>
					<Col className='my-5'>
						<Form.Check
							className='my-1'
							type='radio'
							label='Paypal or Credit Card'
							id='paypal'
							name='paymentMethod'
							value='Paypal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>

						<Form.Check
							className='my-5'
							type='radio'
							label='Stripe'
							id='stripe'
							name='paymentMethod'
							value='Stripe'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
