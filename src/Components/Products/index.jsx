import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';


function Products() {

  const displayedProducts = useSelector((state) => state.productsReducer.displayedProducts);

  return (
    <>
      <Box sx={{minHeight: 393 }}>
        <Masonry columns={2} spacing={2}>
          {displayedProducts.map((product, index) => {
            return (
              <Card key={`card ${index}`}>
                <CardHeader
                  title={product.title}
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
                    {product.price}
                  </Typography>
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