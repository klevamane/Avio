import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
	faShoppingCart,
	faStar,
	faStarHalf,
	faStarHalfAlt,
	faTrash,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

import CartScreen from './components/screens/cart.screen';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './components/screens/HomeScreen';
import OrderListScreen from './components/screens/orderList.screens';
import PaymentScreen from './components/screens/payment.screen';
import PlaceOrderScreen from './components/screens/placeOrder.screen';
import ProductEditScreen from './components/screens/productEdit.screen';
import ProductScreen from './components/screens/ProductScreen';
import ProductsListScreen from './components/screens/productsList.screen';
import ProfileScreen from './components/screens/profile.screen';
import ShippingScreen from './components/screens/shipping.screen';
import SignupScreen from './components/screens/signup.screen';
import UserGetEditScreen from './components/screens/userGetEdit.screen';
import UsersScreen from './components/screens/users.screen';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import loginScreen from './components/screens/login.screen';
import logo from './logo.svg';
import OrderScreen from './components/screens/order.screen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path={'/'} component={HomeScreen} exact />
					<Route path={'/auth/login'} component={loginScreen} exact />
					<Route path={'/auth/signup'} component={SignupScreen} exact />
					<Route path={'/product/:id'} component={ProductScreen} exact />
					<Route path={'/user/profile'} component={ProfileScreen} exact />
					<Route path={'/order/:id'} component={OrderScreen} exact />

					{/* Admin Routes */}
					<Route path={'/admin/users'} component={UsersScreen} />
					<Route path={'/admin/user/:id'} component={UserGetEditScreen} />
					<Route
						path={'/admin/products'}
						component={ProductsListScreen}
						exact
					/>
					{/* Pagination */}
					<Route
						path={'/admin/products/:pageNumber'}
						component={ProductsListScreen}
						exact
					/>
					<Route path={'/admin/orders'} component={OrderListScreen} exact />
					<Route
						path={'/admin/products/edit/:id'}
						component={ProductEditScreen}
					/>
					<Route path={'/search/:keyword'} component={HomeScreen} exact />
					<Route path={'/page/:pageNumber'} component={HomeScreen} exact />

					{/* if we have a search result with pagination then */}
					{/* Pagination */}
					<Route
						path={'/search/:keyword/page/:pageNumber'}
						component={HomeScreen}
						exact
					/>

					{/* make the id optional */}
					<Route path={'/cart/:id?'} component={CartScreen} exact />
					<Route path={'/shipping'} component={ShippingScreen} exact />
					<Route path={'/payment'} component={PaymentScreen} exact />
					<Route path={'/placeorder'} component={PlaceOrderScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

library.add(
	fab,
	far,
	faUser,
	faShoppingCart,
	faStarHalf,
	faStar,
	faStarHalfAlt,
	faTrash
);
export default App;
