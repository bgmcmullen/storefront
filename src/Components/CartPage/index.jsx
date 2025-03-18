import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useSelector } from 'react-redux';


function CartPage() {

  const cartReducer = useSelector((state) => state.cartReducer);

  const productCounts = cartReducer.productCounts;

  const productsInCart = cartReducer.products;

  // referenced chatgpt
  function roundToNearestHundredth(num) {
    return Math.round(num * 100) / 100;
  }

  return (
    <>
      <Link to='/'>
        <Button variant='contained' style={{ marginTop: '70px' }}>Back</Button>
      </Link>

      <Card variant="outlined" style={{ margin: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
            Cart
          </Typography>
          <>
            {/* {productsInCart.map((product, index) => {
              return (<>
                <div key={index}>
                  <Typography sx={{ mb: 1.5 }} style={{ margin: 0, display: 'inline-block', width: '80%' }}>
                    {product.name} x {productCounts[product.name]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ display: 'inline-block' }}>
                    price: $ {roundToNearestHundredth(product.price * productCounts[product.name])}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <hr />
                </div >
              </>
              );
            }
            )} */}
            <Typography sx={{ mb: 1.5 }} style={{ margin: 0, display: 'inline-block', width: '80%' }}>
            <h3 style={{ paddingLeft: '10px', paddingRight: '10px', }}>Total: $ {cartReducer.totalCost}</h3>
            </Typography>
          </>
          <br />
        </CardContent>
        <div className="form-container">
          <h2>Billing Information</h2>
          <form>
            <div className="form-group">
              <label htmlFor="full-name">Full Name</label>
              <input type="text" id="full-name" name="full-name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <input type="text" id="zip" name="zip" />
              </div>
            </div>
            <h2>Credit Card Information</h2>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input type="number" id="card-number" name="card-number" />
            </div>
            <div className="form-group">
              <label htmlFor="card-name">Name on Card</label>
              <input type="text" id="card-name" name="card-name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="number" id="cvv" name="cvv" />
              </div>
            </div>
          </form>
        </div>
        <CardActions>
          <Button size="small">Place Order</Button>
        </CardActions>

      </Card >
    </>
  );

}
export default CartPage;