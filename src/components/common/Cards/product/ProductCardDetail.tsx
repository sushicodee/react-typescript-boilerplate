import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Icon from '@material-ui/core/Icon';
import './ProductCardDetail.scss';
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux';
import { NumberWithCommas } from 'components/utils/numbers/numbers';
import { fetchDetails } from 'actions/products/productActions';
import Loader from 'components/common/loader/Loader';
import { addToCart } from 'actions/cart/cartActions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
  },
});

export default function ProductCardDetail(props) {
  const classes = useStyles();
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const params = useParams();
  const dispatch = useDispatch();
  const {id}:any = params;
  // const [data,setData]:any = React.useState({});
  const data = useSelector(state => state.product.productDetails)
  React.useEffect(() => {
    fetchDetails(id);
  },[id])

  return (
    data ?
    <Box className={`${classes.root} card-detail-wrapper container`}>
      {/* <CardActionArea> */}
        <Box className="card-background">
          <Box className="gradient" color="blue"></Box>
          <Box className="gradient" color="green"></Box>
          <Box className="gradient" color="orange"></Box>
          <Box className="gradient" color="black"></Box>
          <Box className="gradient" color="red"></Box>
        <CardMedia
          className="product-image"
          component="img"
          alt={data.name}
          height="350"
          width="350"
          image={
            data.image
              ? `${imageurl}/${data.image}`
              : 'https://commercial.bunn.com/img/image-not-available.png'
          }
          title={data.name}
        />
        <span className ='brand'>
          {data.brand && data.brand}
        </span>
        <Button className = 'love'>
        <Icon>
            favorite_border
        </Icon>
        </Button>
        </Box>
        <CardContent className="card-info">
          <Box className="card-name">
            <Typography gutterBottom variant="h4">
              {data.name}
            </Typography>
            <span className="new"> new</span>
          </Box>
          <Box className="card-description">
            <Typography className = 'title-label' variant = 'h5'>
              Product info
            </Typography>
            <Typography
              className="title"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {data.description}
            </Typography>
          </Box>
          <Box className="color-container">
          <Typography className = 'title-label' variant = 'h5'>
              Colors
            </Typography>
            <Box className="colors">
              {/* <span className="color" color="blue"></span> */}
              <span className="color active" color="black"></span>
              <span className="color" color="red"></span>
              <span className="color" color="rose-gold"></span>
            </Box>
          </Box>
          <Box className="size-container">
            <Typography className = 'title-label' variant="h6">size</Typography>
            <Box className="sizes">
              <span className="size active">pro</span>
              <span className="size">max</span>
            </Box>
          </Box>
          <Box className="card-price">
            <Box className="price">
            <Button className="buy" onClick = {() => dispatch(addToCart(data._id))}>
            <Icon>add_shopping_cart</Icon>
            Add to Cart
          </Button>
              <Typography className="currency title-label" variant="h6">
                Rs
              </Typography>
              <Typography variant="h6" color="textPrimary" >
                {NumberWithCommas(parseInt(data.price))}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      {/* </CardActionArea> */}
    </Box>
:<Loader/>);
}
