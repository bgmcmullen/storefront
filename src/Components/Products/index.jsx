import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import { addToCart } from '../../store/cart.jsx';

function Products() {

  const productCounts = useSelector((state) => state.cartReducer.productCounts);

  const displayedProducts = useSelector((state) => state.productsReducer.displayedProducts);
  const dispatch = useDispatch();

  const handleAddToCart = product => {
    if(product.inStock - productCounts[product.name] <= 0){
      alert(`Sorry ${product.name} out of stock.`);
    } else {
      dispatch(addToCart(product));
    }
  }
  


  return (
    <>
      <Box sx={{minHeight: 393 }}>
        <Masonry columns={2} spacing={2}>
          {displayedProducts.map((product, index) => {
            return (
              <Card key={`card ${index}`}>
                <CardHeader
                  title={product.name}
                />
                <CardMedia
                  component="img"

                  image={product.image}
                  alt={`${product.name} image`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $ {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Stock: {product.inStock - productCounts[product.name]}
                  </Typography>
                  <Button style={{fontSize:'20px'}} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </CardContent>
              </Card>
            );
          })}
        </Masonry>
      </Box>
    </>
  );
}

export default Products;