

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const filterProducts = (state, category) => {

  const filteredProducts = state.productsReducer.products.filter((product) => product.category === category
);
  return filteredProducts;
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    displayedProducts: []
  },
  reducers: {
    replaceCategory: (state, action) => {
      state.displayedProducts = action.payload
    },
    fetchProducts: (state, action) => {
      state.products = action.payload
    }
  }
});

export const { replaceCategory, fetchProducts } = productsSlice.actions;

export const changeCategory = (category, getState) => async (dispatch) => {
  const state = getState();

  const filteredProducts = filterProducts(state, category);

  dispatch( replaceCategory(filteredProducts));
}

export const fetchData = () => async (dispatch, getState) => {

  const URL = import.meta.env.VITE_URL

  try {
    const productsResponse = await axios.get(`${URL}/api/v1/products/`);
    const products = productsResponse.data;

    dispatch( fetchProducts(products));
  } catch (error) {
    console.error(error);
  }

  const state = getState();

  const filteredProducts = filterProducts(state, 'electronics');

  dispatch( replaceCategory(filteredProducts));
}

export default productsSlice.reducer;
