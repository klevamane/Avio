import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  faShoppingCart,
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import CartScreen from './screens/cart.screen';
import { Container } from 'react-bootstrap';
import Footer from './components/footer.component';
import Header from './components/header';
import HomeScreen from './screens/home.screen';
import OrderListScreen from './screens/orderList.screens';
import OrderScreen from './screens/order.screen';
import PaymentScreen from './screens/payment.screen';
import PlaceOrderScreen from './screens/placeOrder.screen';
import ProductEditScreen from './screens/productEdit.screen';
import ProductScreen from './screens/product.screen';
import ProductsListScreen from './screens/productsList.screen';
import ProfileScreen from './screens/profile.screen';
import ShippingScreen from './screens/shipping.screen';
import SignupScreen from './screens/signup.screen';
import UserGetEditScreen from './screens/userGetEdit.screen';
import UsersScreen from './screens/users.screen';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import loginScreen from './screens/login.screen';

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
  faTrash,
);
export default App;
