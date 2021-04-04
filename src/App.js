import logo from "./logo.svg";
import { Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome home boi</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

library.add(fab, faUser, faShoppingCart);
export default App;
