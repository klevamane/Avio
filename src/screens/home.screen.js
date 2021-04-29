import { Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/loader.component';
import Message from '../components/message.component';
import Product from '../components/product.component';
import { listProducts as listProductsAction } from '../actions/product';
import Paginate from '../components/paginate.component';
import ProductCarousel from '../components/product.carousel.component';
import Meta from '../components/meta.component';

const HomeScreen = ({ match }) => {
	const dispatch = useDispatch();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	// The productList, is the same key we used in the store at combineReducers
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page: currentPage, pages } = productList;

	useEffect(() => {
		dispatch(listProductsAction(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta
				description='The best value products online'
				keyword='tv smartphones electronics'
			/>
			<ProductCarousel />
			<h3>Latest products</h3>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
			<Row className='justify-content-center'>
				<Paginate
					page={currentPage}
					pages={pages}
					keyword={keyword ? keyword : ''}
				/>
				{/* <Pagination>
					<Pagination.First />
					<Pagination.Prev />
					<Pagination.Ellipsis />
					{[...Array(pages)].map((page, index) => {
						let pagi = (
							<Pagination.Item
								value={index + 1}
								active={true ? index + 1 === currentPage : false}
								onClick={(e) => setpageNum(1)}
							>
								{index + 1}
							</Pagination.Item>
						);

						return pagi;
					})}
					<Pagination.Ellipsis />
					<Pagination.Next />
					<Pagination.Last />
				</Pagination> */}
			</Row>
		</>
	);
};

export default HomeScreen;
