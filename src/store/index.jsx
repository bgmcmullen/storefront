import { createStore, combineReducers } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';

import categoriesReducer from './categories';

import productsReducer from './products.jsx';

import cartReducer from './cart.jsx';

let reducers = combineReducers({ productsReducer, categoriesReducer, cartReducer });

let store = createStore(reducers, composeWithDevTools());

export default store;