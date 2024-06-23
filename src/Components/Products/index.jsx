import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import { addToCart } from '../../store/cart.jsx';
import Modal from '@mui/material/Modal';



function Products() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: "90%",
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };
  


  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const handleOpen = (index) => {
    setSelectedProduct(displayedProducts[index]);
    setOpen(true);

  }
  const handleClose = () => setOpen(false);

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
      {displayedProducts.length === 0 ? <h1>Waiting for Server</h1> : null }
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
                    In Stock: {productCounts[product.name] ? (product.inStock - productCounts[product.name]) : product.inStock}
                  </Typography>
                  <Button style={{fontSize:'20px'}} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </CardContent>
                <Button onClick={() => handleOpen(index)}>More Info</Button>

              </Card>
            );
          })}
        </Masonry>
      </Box>
      <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CardHeader
                  title={selectedProduct.name}
                />
                <CardMedia
                  component="img"
                  style={{maxWidth: '500px', margin: 'auto'}}
                  image={selectedProduct.image}
                  alt={`${selectedProduct.name} image`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {selectedProduct.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $ {selectedProduct.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedProduct.info}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Stock: {productCounts[selectedProduct.name] ? (selectedProduct.inStock - productCounts[selectedProduct.name]) : selectedProduct.inStock}
                  </Typography>
                  <Button style={{fontSize:'20px'}} onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</Button>
                </CardContent>
          <Button onClick={handleClose}>Back</Button>
        </Box>
      </Modal>
    </div>
    </>
  );
}

export default Products;