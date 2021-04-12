import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  faShoppingCart,
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import CartScreen from './components/screens/cart.screen';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import logo from './logo.svg';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path={'/'} component={HomeScreen} exact />
          <Route path={'/product/:id'} component={ProductScreen} />
          {/* make the id optional */}
          <Route path={'/cart/:id?'} component={CartScreen} />
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
);
export default App;
