let tv = {
  title: 'TV',
  description: 'Antique CRT Televison',
  image: '/pexels-anete-lusina-5721908.jpg',
  category: 'electronics',
  price: 80
}

let laptop = {
  title: 'Laptop',
  description: 'State of the art laptop computer',
  image: '/ales-nesetril-Im7lZjxeLhg-unsplash.jpg',
  category: 'electronics',
  price: 2000
}

let chickpeas = {
  title: 'Chickpeas',
  description: 'Can of chickpeas',
  image: '/pexels-moldyfox-106972.jpg',
  category: 'food',
  price: 1
}

let pizza = {
  title: 'Pizza',
  description: 'Gourmet Italian style thin crust pizza',
  image: '/pexels-alena-shekhovtcova-6940997.jpg',
  category: 'food',
  price: 18
}

let initialState = {
  products: [tv, laptop, chickpeas, pizza],
  displayedProducts: [tv, laptop]
}

const filterProducts = (state, category) => {
  const filteredProducts = state.products.filter((product) => product.category === category);
  return filteredProducts;
}

const productsReducer = (state = initialState, action) => {

  let {type, payload } = action;
  let filteredProducts = null;

  switch(type) {
    case 'CHANGE_CATEGORY':
      filteredProducts = filterProducts(state, payload);
      return { ...state, displayedProducts: filteredProducts}
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