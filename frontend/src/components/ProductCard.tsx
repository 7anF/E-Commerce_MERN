import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IProduct } from '../types/Product';
import { useCart } from '../context/Cart/Cart';

export default function ProductCard({ _id, title, image, price }: IProduct) {
  const { addItemToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {price} JOD
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' onClick={() => addItemToCart(_id)}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};