import Header from './Components/Header';
import Categories from './Components/Categories';
import Products from './Components/Products';
import Footer from './Components/Footer';
import './App.scss';
import { useEffect } from 'react';
import { fetchData } from './store/products.jsx';
import { useDispatch } from 'react-redux';

function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return(
    <>
    <Header />
    <Categories />
    <Products />
    <Footer />
    </>
  );
}

export default App;