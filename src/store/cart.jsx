import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// referenced chatgpt
function roundToNearestHundredth(num) {
  return Math.round(num * 100) / 100;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    totalCost: 0,
    totalItems: 0,
    productCounts: {}
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      let isNew = true;

      state.products.map((product) => {
        if (product.name === action.payload.name) {
          isNew = false;
        }
      });

      if (isNew) {
        state.productCounts[action.payload.name] = 1;
        state.products = [...state.products, action.payload];
        state.totalCost = roundToNearestHundredth(state.totalCost + action.payload.price);
        state.totalItems = state.totalItems + 1;
      }
      if (!isNew) {
        state.productCounts[action.payload.name]++;
          state.totalCost= roundToNearestHundredth(state.totalCost + action.payload.price);
          state.totalItems++;
      }
      updateDatabase(JSON.stringify(state));
    },
    DELETE_FROM_CART: (state, action) => {
      let contains = false;
      // check if item is in cart
      state.products.map((product) => {
        if (product.name === action.payload.name) {
          contains = true
        }
      });
      if (!contains) {
        return state;
      }
      if (state.productCounts[action.payload.name] <= 0) {
        state.products = state.products.filter((product) => (product.name !== action.payload.name));
      }
      state.productCounts[action.payload.name]--
      state.totalCost = roundToNearestHundredth(state.totalCost - action.payload.price),
      state.totalItems--
      updateDatabase(JSON.stringify(state));
    },
    FETCH_CART: (state, action) => {
      state.productCounts = action.payload.productCounts
      state.products = action.payload.products;
      state.totalCost = action.payload.totalCost;
      state.totalItems = action.payload.totalItems;
      
    }
  }
});

export default cartSlice.reducer;

const updateDatabase = async (newState) => {

  const URL = import.meta.env.VITE_URL

  // check if the cart object is in database 
  const res = await axios.get(`${URL}/api/v1/cart/`);

  const dataArrayLength = res.data.length

  try {
    if (dataArrayLength > 0) {
      const latestID = res.data[dataArrayLength - 1].id
      await axios.put(`${URL}/api/v1/cart/${latestID}`, JSON.parse(newState));
    } else {
      await axios.post(`${URL}/api/v1/cart/`, JSON.parse(newState));
    }
  } catch (error) {
    console.error(error);
  }

}

export const addToCart = (product) => async (dispatch) => {


  dispatch(ADD_TO_CART(product));
}

export const { ADD_TO_CART, DELETE_FROM_CART, FETCH_CART } = cartSlice.actions;

export const deleteFromCart = (product) => async (dispatch) => {

  dispatch(DELETE_FROM_CART(product));
}

export const fetchCart = () => async (dispatch) => {


  const URL = import.meta.env.VITE_URL

  try {
    const cartResponse = await axios.get(`${URL}/api/v1/cart/`);
    const cart = cartResponse.data[cartResponse.data.length - 1];

    console.log(cart);

    dispatch(FETCH_CART(cart));


  } catch (error) {
    console.error(error)
  }
}
