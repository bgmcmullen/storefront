import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import { composeWithDevTools } from '@redux-devtools/extension';

import categoriesReducer from './categories';

import productsReducer from './products.jsx';

import cartReducer from './cart.jsx';

let reducers = combineReducers({ productsReducer, categoriesReducer, cartReducer });

let store = createStore(reducers, composeWithDevTools(), applyMiddleware(thunk));

export default store;