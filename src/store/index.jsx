import { combineReducers } from 'redux';

import { configureStore } from  '@reduxjs/toolkit';

import categoriesReducer from './categories';

import productsReducer from './products.jsx';

import cartReducer from './cart.jsx';

let reducers = combineReducers({ productsReducer, categoriesReducer, cartReducer });

const store = configureStore({
  reducer: reducers
});

export default store;