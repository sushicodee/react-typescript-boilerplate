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
import './ProductCard.scss';

const useStyles = makeStyles({
  root: {
    // minHeight: 400,
    // maxWidth: 345,
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    width:'860px',
  },
});

export default function ProductCard({ data }) {
  const classes = useStyles();
  const imageurl = process.env.REACT_APP_IMAGE_URL;

  return (
    <Box className={classes.root}>
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
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <span className="new"> new</span>
          </Box>
          <Box className="card-description">
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
            <Box className="colors">
              <span className="color" color="blue"></span>
              <span className="color" color="red"></span>
              <span className="color" color="green"></span>
              <span className="color" color="orange"></span>
              <span className="color" color="black"></span>
            </Box>
          </Box>
          <Box className="size-container">
            <Typography variant="h6">size</Typography>
            <Box className="sizes">
              <span className="size">7</span>
              <span className="size">8</span>
              <span className="size">9</span>
              <span className="size">10</span>
              <span className="size">11</span>
            </Box>
          </Box>
          <Box className="card-price">
            <Box className="price">
              <Typography className="currency" variant="h6">
                Rs
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                {data.price}
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
          <CardActions>
            <Button className="buy">
              <Icon>add_shopping_cart</Icon>
              Add to Cart
            </Button>
          </CardActions>
        </CardContent>
      {/* </CardActionArea> */}
    </Box>
  );
}
