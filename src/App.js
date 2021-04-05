import logo from "./logo.svg";
import { Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  faUser,
  faShoppingCart,
  faStar,
  faStarHalf,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

library.add(
  fab,
  far,
  faUser,
  faShoppingCart,
  faStarHalf,
  faStar,
  faStarHalfAlt
);
export default App;
