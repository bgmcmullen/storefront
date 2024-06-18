import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Typography from '@mui/material/Typography';
import { addToCart, deleteFromCart } from '../../store/cart.jsx';

function Cart() {

  const cartReducer = useSelector((state) => state.cartReducer);

  const productsInCart = cartReducer.products;

  const productCounts = cartReducer.productCounts;

  const totalItems = cartReducer.totalItems;

  const dispatch = useDispatch();

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
                        {product.title}
                      </h3>
                      <Typography variant="body2" color="text.secondary">
                        price: $ {product.price * productCounts[product.title]}
                      </Typography>
                      <button onClick={() => (dispatch(deleteFromCart(product)))}>-</button>
                      <p style={{ display: 'inline', margin: 0, padding: 0 }}> Quantity: {productCounts[product.title]} </p>
                      <button onClick={() => (dispatch(addToCart(product)))}>+</button>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <h3>Total: $ {cartReducer.totalCost}</h3>
            </Menu>
          </>
        )}
      </PopupState>
      <hr />
    </>


  );
}

export default Cart;