import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardMedia, Grid, Typography } from '@material-ui/core';
import { addToCart,deleteCartItem } from 'actions/cart/cartActions';
import './Cart.scss';

function Cart() {
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const history = useHistory();
  const params = useParams();
  const { id, qty } = params;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    function addToCartInit(){
      if (id) {
        dispatch(addToCart(id, qty));
      }
    };
    addToCartInit();
  }, [id,qty]);

  const handleCheckout = () => {
    history.push('/signin?redirect=shipping');
  };
  return (
      <>
      <Typography variant="h5">My Cart</Typography>
      <Grid container direction="column" className="cart">
      <Grid container className="cart-list ">
        {cartItems &&
          cartItems.map((item) => {
            return (
              <Grid item xs={12} className = 'cart-list-item container'>
                <CardMedia
                  className="cart-list-item-image"
                  component="img"
                  alt={item && item.description}
                  height="100"
                  width="100"
                  image={
                    item && item.image
                      ? `${imageurl}/${item && item.image}`
                      : 'https://commercial.bunn.com/img/image-not-available.png'
                  }
                  title={item && item.name}
                />
                <div className = 'cart-list-item-info'>
                <Typography>
                  Item:{item.name}
                </Typography>
                  <Typography>
                  Price: Rs{item.price}
                  </Typography>
                </div>
                <div className = 'cart-list-item-actions'>
                <Button
                  color="secondary"
                  className="btn-delete "
                  onClick={() => dispatch(deleteCartItem(item.id))}
                >
                  Remove
                </Button>
                </div>
              </Grid>
            );
          })}
      </Grid>
      {cartItems.length === 0 ? (
        <Grid item className="cart-empty container">
          <Typography variant="h6">Cart is Empty</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push('/')}
          >
            Shop Now
          </Button>
        </Grid>
      ) : (
        <div className="cart-checkout">
        <Grid item className='details' >
          <Typography>Items in Cart : {cartItems.length}</Typography>
          <Typography variant="h6">
            {' '}
            Total : {cartItems.reduce((acc, item) => item.price + acc, 0)}
          </Typography>
         
        </Grid>
        <div className = 'cta'>
          <Button className="btn btn-pay" variant="contained" color="primary" onClick = {handleCheckout}>
            Proceed To Checkout
          </Button>
          </div>
        </div>
      )}
    </Grid>
    </>
  );
}

export default Cart;
