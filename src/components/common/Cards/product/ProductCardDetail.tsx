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
import  Icon from '@material-ui/core/Icon';
import './ProductCardDetail.scss';
import { useLocation } from 'react-router-dom';
import { NumberWithCommas } from 'components/utils/numbers/numbers';

const useStyles = makeStyles({
  root: {
    // minHeight: 400,
    // maxWidth: 345,
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
  },
});

export default function ProductCardDetail(props) {
  const classes = useStyles();
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const location = useLocation();
  const [data,setData]:any = React.useState({});
  
  React.useEffect(() => {
    const {state} = location
    const cloned = JSON.parse(JSON.stringify(state));
    setData(cloned);
  },[])
  
  return (
    data &&
    <Box className={classes.root +' '+ 'card-details-wrapper'}>
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
          // height="350"
          // width="350"
          image={
            data.image
              ? `${imageurl}/${data.image}`
              : 'https://www.drjainsherbals.com/wp-content/uploads/2015/12/no-product-image.jpg'
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
              <Button className="buy">
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
          {/* <Grid container justify ={"space-between"}> */}
          {/* <Grid item>
          <Typography className ={'product-stock'} variant="body2" color="textSecondary" component="p">
              {data.status}
            </Typography>
          </Grid>
          </Grid> */}
          {/* <CardActions className = 'details-card-actions-wrapper'>
            <Button className="buy">
              <Icon>add_shopping_cart</Icon>
              Add to Cart
            </Button>
          </CardActions> */}
        </CardContent>
      {/* </CardActionArea> */}
    </Box>
    );
}
