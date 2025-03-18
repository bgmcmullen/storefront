import { createSlice } from '@reduxjs/toolkit';

const electronics = {
  title: "ELECTRONICS",
  description: 'Top Notch Electronic Products'
};

const food = {
  title: "FOOD",
  description: 'Wholesome Nutritious Foods'
};

const foodCatagories = {electronics, food};


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: foodCatagories,
    currentCategory: electronics
  },
  reducers: {
    changeCategoryHeading: (state, action) => {
      state.currentCategory = state.categories[action.payload]
    }

  }
});

export const { changeCategoryHeading } = categoriesSlice.actions;

export default categoriesSlice.reducer;
