import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import './ProductCard.scss'

const useStyles = makeStyles({
  root: {
    minHeight:400,
    maxWidth: 345,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
});

export default function ProductCard({data}) {
  const classes = useStyles();
  const imageurl = process.env.REACT_APP_IMAGE_URL;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className = 'product-image'
          component="img"
          alt={data.name}
          height="350"
          width ="350"
          image={data.image ?`${imageurl}/${data.image}` :'https://www.drjainsherbals.com/wp-content/uploads/2015/12/no-product-image.jpg'}
          title={data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
          <Grid container justify ={"space-between"}>
          <Grid item>
            <Typography variant="body2" color="textPrimary" component="p">
              Rs:{data.price}
            </Typography>
          </Grid>
          <Grid item>
          <Typography className ={'product-stock'} variant="body2" color="textSecondary" component="p">
              {data.status}
            </Typography>
          </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add To Cart
        </Button>
        <Button size="small" color="primary">
            Like
        </Button>
      </CardActions>
    </Card>
  );
}