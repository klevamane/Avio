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
import ProductScreen from './components/screens/ProductScreen';
import ProfileScreen from './components/screens/profile.screen';
import ShippingScreen from './components/screens/shipping.screen';
import SignupScreen from './components/screens/signup.screen';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import loginScreen from './components/screens/login.screen';
import logo from './logo.svg';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path={'/'} component={HomeScreen} exact />
          <Route path={'/auth/login'} component={loginScreen} exact />
          <Route path={'/auth/signup'} component={SignupScreen} exact />
          <Route path={'/product/:id'} component={ProductScreen} />
          <Route path={'/user/profile'} component={ProfileScreen} />
          {/* make the id optional */}
          <Route path={'/cart/:id?'} component={CartScreen} exact />
          <Route path={'/shipping'} component={ShippingScreen} exact />
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
