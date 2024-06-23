
import './App.scss';
import { useEffect } from 'react';
import { fetchData } from './store/products.jsx';
import { fetchCart } from './store/cart.jsx';
import { useDispatch } from 'react-redux';
import Storefront from './Components/Storefront';
import Header from './Components/Header';
import CartPage from './Components/CartPage/index.jsx';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCart());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>

      </BrowserRouter>


    </>
  );
}

export default App;