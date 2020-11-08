import React from 'react';
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
import { useHistory } from 'react-router-dom';
import './ProductCard.scss';
import {useDispatch} from 'react-redux';
import { addToCart } from 'actions/cart/cartActions';
import { likeProduct, unlikeProduct } from 'actions/products/productActions';
import {useSelector} from 'react-redux';

export default function ProductCard({ data }) {
  // const classes = useStyles();
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const auth = useSelector(state => state.auth)
  const {user:{_id},isLoggedin} = auth;
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoved = data.loves && data.loves.includes(_id);

  const handleDetailPage = () => 
    {
        history.push(`details/${data._id}`)
    }
  
  const handleLove = () => {
    isLoved ? dispatch(unlikeProduct(_id,data,isLoggedin)) : dispatch(likeProduct(_id,data,isLoggedin))
  } 

  return (
    data &&
    <Card className = 'product-card-container container'>
      <CardActionArea>
      <Box className='card-wrapper' onClick = {handleDetailPage}>
      <Box className="card-background">
        <CardMedia
          className="product-image"
          component="img"
          alt={ data.name}
          // height="370"
          width="370"
          image={
             data.image
              ? `${imageurl}/${ data.image}`
              : 'https://commercial.bunn.com/img/image-not-available.png'
          }
          title={ data.name}
        />
        <span className="brand">{ data.brand}</span>
      </Box>
      <CardContent className="card-info">
        {/* <span className="card-info-new"> new</span> */}
        <Box className="card-info-name">
          <Typography  variant="h5" component="h2">
            { data.name}
          </Typography>
        </Box>
        <Box className = 'price-wrapper'>
        {/* <Box className="card-info-price"> */}
            <Typography component="span" className="card-info-price">
              Rs {NumberWithCommas(data ? data.price:0)}
            </Typography>
        {/* </Box> */}
        </Box>
        </CardContent>
      </Box>
      </CardActionArea>
        <CardActions className ='card-actions-wrapper'>
          <Button className={`${isLoved? 'love-ed' : 'love'}`} onClick={handleLove}>
            {!isLoved && <Icon>favorite_border</Icon>}
            {isLoved && <Icon>favorite</Icon>}
          </Button>
          <Button className="buy" onClick = {() => dispatch(addToCart(data._id))}>
            <Icon>add_shopping_cart</Icon>
            Add to Cart
          </Button>
        </CardActions>
    </Card>
  );
}
