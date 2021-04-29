import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Loader from '../components/loader.component';
import Rating from '../components/rating.component';
import { createProductReview, getProductDetails } from '../actions/product';
import Message from '../components/message.component';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/product';

const ProductScreen = ({ history, match }) => {
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: createReviewLoading,
		error: createReviewError,
		success: productCreateReviewSuccess,
	} = productReviewCreate;

	const authLoginInfo = useSelector((state) => state.authLoginInfo);
	const { loggedInUserInfo } = authLoginInfo;

	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(0);

	useEffect(() => {
		if (productCreateReviewSuccess) {
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
		}
		dispatch(getProductDetails(match.params.id));
	}, [dispatch, match, productCreateReviewSuccess]);

	const addToCartHandler = () => {
		// redirect
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, { rating, comment }));
	};
	return (
		<div>
			{productCreateReviewSuccess && <Message>Review submitted</Message>}
			{createReviewError && (
				<Message variant='danger'>{createReviewError}</Message>
			)}
			<Link className='btn btn-light my-3' to='/'>
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				{ error }
			) : (
				<>
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
								<ListGroup.Item>
									Description: ${product.description}
								</ListGroup.Item>
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

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{/* restrict the maximum number of items to be selected to 20 even 
                        if the total number of quatity available for a particular product is 
                        more than 20 
                        
                        Also use the array as a reference to set the select options
                        */}
													{[
														...Array(
															product.countInStock > 20
																? 20
																: product.countInStock
														).keys(),
													].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										className='btn-block'
										onClick={addToCartHandler}
										type='button'
										disabled={product.countInStock === 0}
									>
										Add to cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a customer review </h2>
									{loggedInUserInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													required
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'></Form.Group>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as='textarea'
												rows='3'
												value={comment}
												required
												onChange={(e) => setComment(e.target.value)}
											></Form.Control>
											{createReviewLoading && <Loader />}
											<Button type='submit' className='my-3 btn-block'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/auth/login'>sign In</Link>to write a
											review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</div>
	);
};

export default ProductScreen;
