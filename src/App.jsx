import { useSelector, useDispatch } from 'react-redux';

import { changeCategory } from './store/products';

import Header from './Components/Header';
import Categories from './Components/Categories';
import Products from './Components/Products';
import Footer from './Components/Footer';
import './App.scss';
import Button from '@mui/material/Button';


function App(){

  const displayedProducts = useSelector((state) => state.productsReducer.displayedProducts);
  const currentCategory = useSelector((state) => state.categoriesReducer.currentCategory)
  const dispatch = useDispatch();

  const stringifiedDisplayedProducts = JSON.stringify(displayedProducts)

  return(
    <>
    <Header />
    <h1>Displayed Products: {stringifiedDisplayedProducts}</h1>
    <Button onClick={() => (dispatch(changeCategory('electronics')))}>Electronics</Button>
    <Button onClick={() => (dispatch(changeCategory('food')))}>Food</Button>
    <Categories />
    <h1>Current Category: {currentCategory}</h1>
    <Products />
    <Footer />
    </>
  );
}

export default App;