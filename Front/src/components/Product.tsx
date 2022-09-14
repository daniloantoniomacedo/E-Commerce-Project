import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import lizard from '../static/Lizard.jpg';

export interface IProduct {
  id: number
  name: string,
  price: string
}

export default function Product(props: IProduct) {

  return (
    <Card sx={{ maxWidth: 150, minWidth: 50, height: 215 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image={lizard}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            R$ {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
