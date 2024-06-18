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
    if (product.title === payload.title) {
      isNew = false;
    }
  });

  let productCounts = { ...state.productCounts };

  if (isNew) {
    productCounts[payload.title] = 1
    newState = {
      products: [...state.products, payload],
      totalCost: state.totalCost + payload.price,
      totalItems: ++state.totalItems,
      productCounts: productCounts
    };
  }
  if (!isNew) {
    productCounts[payload.title]++
    newState = {
      ...state,
      totalCost: state.totalCost + payload.price,
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
    if (product.title === payload.title) {
      contains = true
    }
  });

  if (!contains) {
    return state;
  }

  let productCounts = { ...state.productCounts };

  productCounts[payload.title]--

  let products = null;

  if(productCounts[payload.title] <= 0){
    products = state.products.filter((product) => (product.title !== payload.title));
  } else {
    products = [...state.products];
  }


  newState = {
    products: products,
    totalCost: state.totalCost - payload.price,
    totalItems: --state.totalItems,
    productCounts: productCounts
  };

  return newState;
}

const cartReducer = (state = initialState, action) => {

  let { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      return handleAddToCart(state, payload);
    case 'Delete_FROM_CART':
      return handleDeleteFromCart(state, payload);
    default:
      return state;
  }
}

export default cartReducer;

export function addToCart(product) {
  return {
    type: 'ADD_TO_CART',
    payload: product
  }
}

export function deleteFromCart(product) {
  return {
    type: 'Delete_FROM_CART',
    payload: product
  }
}