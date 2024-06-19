import axios from 'axios'

let tv = {
  name: 'TV',
  description: 'Antique CRT Televison',
  image: '/pexels-anete-lusina-5721908.jpg',
  category: 'electronics',
  price: 79.99,
  inStock: 5
}

let laptop = {
  name: 'Laptop',
  description: 'State of the art laptop computer',
  image: '/ales-nesetril-Im7lZjxeLhg-unsplash.jpg',
  category: 'electronics',
  price: 1999.99,
  inStock: 6
}

let chickpeas = {
  name: 'Chickpeas',
  description: 'Can of chickpeas',
  image: '/pexels-moldyfox-106972.jpg',
  category: 'food',
  price: .99,
  inStock: 867
}

let pizza = {
  name: 'Pizza',
  description: 'Gourmet Italian style thin crust pizza',
  image: '/pexels-alena-shekhovtcova-6940997.jpg',
  category: 'food',
  price: 17.99,
  inStock: 13
}

let initialState = {
  products: [],
  displayedProducts: []
}

const filterProducts = (state, category) => {
  const filteredProducts = state.products.filter((product) => product.category === category);
  return filteredProducts;
}

const productsReducer = (state = initialState, action) => {

  let { type, payload } = action;
  let filteredProducts = null;

  switch (type) {
    case 'CHANGE_CATEGORY':
      filteredProducts = filterProducts(state, payload);
      return { ...state, displayedProducts: filteredProducts }
    case 'FETCH_PRODUCTS':
      return { ...state, products: payload };
    default:
      return state;
  }

}

export default productsReducer;

export function changeCategory(category) {
  return {
    type: 'CHANGE_CATEGORY',
    payload: category
  }
}

export const fetchData = () => async (dispatch) => {

  try {
    const productsResponse = await axios.get('http://localhost:3005/api/v1/products/');
    const products = productsResponse.data;
    const fetchProductsObject = {
      type: 'FETCH_PRODUCTS',
      payload: products
    }
  
    dispatch(fetchProductsObject);
  } catch (error) {
    console.error(error);
  }


try{
  const cartResponse = await axios.get('http://localhost:3005/api/v1/cart/');
  const cart = cartResponse.data[cartResponse.data.length - 1];

  const fetchCartObject = {
    type: 'FETCH_CART',
    payload: cart
  }

  dispatch(fetchCartObject);
} catch(error) {
  console.error(error)
}
  const changeCategoryObject = {
    type: 'CHANGE_CATEGORY',
    payload: 'electronics'
  }
  dispatch(changeCategoryObject);
}
