let initialState = {
  categories: ['electronics', 'food'],
  currentCategory: 'electronics'
}



const categoriesReducer = (state = initialState, action) => {

  let {type, payload } = action;

  switch(type) {
    case 'CHANGE_CATEGORY':
      return { ...state, currentCategory: payload}
    default:
      return state;
  }
}

export default categoriesReducer;

export function changeCategory(category) {
  return {
    type: 'CHANGE_CATEGORY',
    payload: category
  }
}