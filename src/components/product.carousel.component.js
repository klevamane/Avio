import React from 'react';
import { useState, useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopRatedProducts } from '../actions/product';
import Loader from './loader';
import Message from './message';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);

	const { loading, error, products: topRatedProducts } = productTopRated;

	useEffect(() => {
		dispatch(getTopRatedProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' fade>
			{topRatedProducts.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image
							src={product.image}
							alt={product.name}
							fluid
							className='d-block w-50 m-auto'
						/>
					</Link>
					<Carousel.Caption className='carousel-caption'>
						<h2>
							{product.name} ({product.price})
						</h2>
					</Carousel.Caption>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
