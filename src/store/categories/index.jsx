const electronics = {
  title: "ELECTRONICS",
  description: 'Top Notch Electronic Products'
};

const food = {
  title: "FOOD",
  description: 'Wholesome Nutritious Foods'
};

const foodCatagories = {electronics, food};

let initialState = {
  categories: foodCatagories,
  currentCategory: electronics
}



const categoriesReducer = (state = initialState, action) => {

  let {type, payload } = action;

  switch(type) {
    case 'CHANGE_CATEGORY':
      return { ...state, currentCategory: state.categories[payload]}
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