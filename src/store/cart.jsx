import axios from 'axios';

let initialState = {
  products: [],
  totalCost: 0,
  totalItems: 0,
  productCounts: {}
}

const handleAddToCart = (state, payload) => {

  let newState = null
  let isNew = true;

  state.products.map((product) => {
    if (product.name === payload.name) {
      isNew = false;
    }
  });

  let productCounts = { ...state.productCounts };

  if (isNew) {
    productCounts[payload.name] = 1
    newState = {
      products: [...state.products, payload],
      totalCost: roundToNearestHundredth(state.totalCost + payload.price),
      totalItems: ++state.totalItems,
      productCounts: productCounts
    };
  }
  if (!isNew) {
    productCounts[payload.name]++
    newState = {
      ...state,
      totalCost: roundToNearestHundredth(state.totalCost + payload.price),
      totalItems: ++state.totalItems,
      productCounts: productCounts
    };
  }

  return newState;
}

const handleDeleteFromCart = (state, payload) => {

  let newState = null;

  let contains = false;

  // check if item is in cart
  state.products.map((product) => {
    if (product.name === payload.name) {
      contains = true
    }
  });

  if (!contains) {
    return state;
  }

  let productCounts = { ...state.productCounts };

  productCounts[payload.name]--

  let products = null;

  if(productCounts[payload.name] <= 0){
    products = state.products.filter((product) => (product.name !== payload.name));
  } else {
    products = [...state.products];
  }


  newState = {
    products: products,
    totalCost: roundToNearestHundredth(state.totalCost - payload.price),
    totalItems: --state.totalItems,
    productCounts: productCounts
  };

  return newState;
}

// referenced chatgpt
function roundToNearestHundredth(num) {
  return Math.round(num * 100) / 100;
}

const cartReducer = (state = initialState, action) => {

  let { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      return payload;
    case 'DELETE_FROM_CART':
      return payload;
    case 'FETCH_CART':
      return payload; 
    default:
      return state;
  }
}

export default cartReducer;

const updateDatabase = async (newState) => {

  // check if the cart object is in database 
  const res = await axios.get('http://localhost:3005/api/v1/cart/');

  const dataArrayLength = res.data.length

  try{
    if(dataArrayLength > 0) {
      const latestID = res.data[dataArrayLength - 1].id
      await axios.put(`http://localhost:3005/api/v1/cart/${latestID}`, newState);
    } else {
      await axios.post(`http://localhost:3005/api/v1/cart/`, newState);
    }
  } catch (error) {
    console.error(error);
  }



}

export const addToCart = (product) => async (dispatch, getState) => {

  const state = getState().cartReducer;

  const newState = handleAddToCart(state, product)

  updateDatabase(newState);

  const actionObject =  {
    type: 'ADD_TO_CART',
    payload: newState
  }
  dispatch(actionObject);
}

export const  deleteFromCart = (product) => async (dispatch, getState) =>  {

  const state = getState().cartReducer;

  const newState = handleDeleteFromCart(state, product);

  updateDatabase(newState);

  const actionObject = {
    type: 'DELETE_FROM_CART',
    payload: newState
  }
  dispatch(actionObject);
}