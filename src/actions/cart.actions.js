import { CART_ADD_ITEM } from '../constants/cart.constants';
import axios from 'axios';

export const addTocCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // save the cart to local storage
  // use JSON.stringify because we can only
  // save string in localstorge. User JSON.parse to
  // reverse the operation to json
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
