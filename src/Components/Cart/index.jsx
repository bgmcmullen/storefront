import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Typography from '@mui/material/Typography';
import { addToCart, deleteFromCart } from '../../store/cart.jsx';
import { Link } from "react-router-dom";

function Cart() {

  const cartReducer = useSelector((state) => state.cartReducer);

  const productsInCart = cartReducer.products;

  const productCounts = cartReducer.productCounts;

  const totalItems = cartReducer.totalItems;

  const dispatch = useDispatch();

  // referenced chatgpt
  function roundToNearestHundredth(num) {
    return Math.round(num * 100) / 100;
  }

  const handleAddToCart = product => {
    if (product.inStock - productCounts[product.name] <= 0) {
      alert(`Sorry ${product.name} out of stock.`);
    } else {
      dispatch(addToCart(product));
    }
  }

  console.log(productsInCart);

  return (
    <>
      <PopupState variant="popover" style={{ width: '50px' }}>
        {(popupState) => (
          <>
            <Button variant="contained" {...bindTrigger(popupState)} style={{ float: 'right', marginRight: '25px' }}>
              View Cart:  {totalItems} items
            </Button>
            <Menu {...bindMenu(popupState)}>
              {productsInCart.map((product, index) => {
                return (
                  <div key={index}>
                    <div key={index} style={{ width: '150px', padding: '5px' }}>
                      <h3 style={{ margin: 0 }}>
                        {product.name}
                      </h3>
                      <Typography variant="body2" color="text.secondary">
                        price: $ {roundToNearestHundredth(product.price * productCounts[product.name])}
                      </Typography>
                      <button onClick={() => (dispatch(deleteFromCart(product)))}>-</button>
                      <p style={{ display: 'inline', margin: 0, padding: 0 }}> Quantity: {productCounts[product.name]} </p>
                      <button onClick={() => handleAddToCart(product)}>+</button>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <h3 style={{ paddingLeft: '10px', paddingRight: '10px', }}>Total: $ {cartReducer.totalCost}</h3>
              <Link to="cart">
                <Button variant="contained" style={{ margin: '5px' }}>Continue To Checkout</Button>
              </Link>
            </Menu>
          </>
        )}
      </PopupState>

      <hr />
    </>


  );
}

export default Cart;