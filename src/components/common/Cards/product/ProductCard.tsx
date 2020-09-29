import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
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
        history.push({
            pathname:'/details',state:data
        })
    }
  return (
      <Box className='card-wrapper' onClick = {handleDetailPage}>
      <Box className="card-background">
        <CardMedia
          className="product-image"
          component="img"
          alt={data.name}
          // height="350"
          // width="350"
          image={
            data.image
              ? `${imageurl}/${data.image}`
              : 'https://www.drjainsherbals.com/wp-content/uploads/2015/12/no-product-image.jpg'
          }
          title={data.name}
        />
        <span className="brand">{data.brand && data.brand}</span>
      </Box>
      <CardContent className="card-info">
        <span className="card-info-new"> new</span>
        <Box className="card-info-name">
          <Typography  variant="h5" component="h2">
            {data.name}
          </Typography>
        </Box>
        <Box className = 'price-wrapper'>
        <Box className="card-info-price">
            <Typography component="span">
              Rs {NumberWithCommas(data.price)}
            </Typography>
        </Box>
        </Box>
        {/* <Grid container justify ={"space-between"}> */}
        {/* <Grid item>
          <Typography className ={'product-stock'} variant="body2" color="textSecondary" component="p">
              {data.status}
            </Typography>
          </Grid>
          </Grid> */}
        <CardActions className ='card-actions-wrapper'>
          <Button className="love">
            <Icon>favorite_border</Icon>
          </Button>
          <Button className="buy">
            <Icon>add_shopping_cart</Icon>
            Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </Box>
  );
}
