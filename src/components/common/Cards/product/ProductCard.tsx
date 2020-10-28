import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { NumberWithCommas } from 'components/utils/numbers/numbers';
import { Redirect, useHistory } from 'react-router-dom';
import './ProductCard.scss';


export default function ProductCard({ data }) {
  // const classes = useStyles();
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const history = useHistory();
  const handleDetailPage = () => 
    {
        history.push(`details/${data._id}`)
    }
  return (
    <Card className = 'product-card-container container'>
      <CardActionArea>
      <Box className='card-wrapper' onClick = {handleDetailPage}>
      <Box className="card-background">
        <CardMedia
          className="product-image"
          component="img"
          alt={data && data.name}
          height="350"
          width="350"
          image={
            data && data.image
              ? `${imageurl}/${data && data.image}`
              : 'https://commercial.bunn.com/img/image-not-available.png'
          }
          title={data && data.name}
        />
        <span className="brand">{data && data.brand}</span>
      </Box>
      <CardContent className="card-info">
        {/* <span className="card-info-new"> new</span> */}
        <Box className="card-info-name">
          <Typography  variant="h5" component="h2">
            {data && data.name}
          </Typography>
        </Box>
        <Box className = 'price-wrapper'>
        <Box className="card-info-price">
            <Typography component="span">
              Rs {NumberWithCommas(data ? data.price:0)}
            </Typography>
        </Box>
        </Box>
        </CardContent>
      </Box>
      </CardActionArea>
        <CardActions className ='card-actions-wrapper'>
          <Button className="love">
            <Icon>favorite_border</Icon>
          </Button>
          <Button className="buy" onClick = {() => console.log('added',data.id)}>
            <Icon>add_shopping_cart</Icon>
            Add to Cart
          </Button>
        </CardActions>
    </Card>
  );
}
