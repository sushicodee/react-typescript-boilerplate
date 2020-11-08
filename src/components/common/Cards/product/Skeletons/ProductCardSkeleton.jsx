import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';

function ProductCardSkeleton() {
    return (
        <Card className = 'product-card-container container skeleton'>
        <Box className='card-wrapper'>
        <Box className="card-background">
        <Skeleton variant="rect" width={'100%'} height={370} />
         <Skeleton variant = 'text' className="brand" height = {"1em"} width = {'70%'} style = {{marginLeft:'10px'}}/>
        </Box>
        <Box className="card-info">
          <Box className="card-info-name">
            <Skeleton  variant="text" height = {"1em"} width = {'70%'} style = {{marginLeft:'10px'}} />
          </Box>
          <Box className = 'price-wrapper'>
              <Skeleton variant="text" height = {"1em"} width = {'30%'} style = {{marginRight:'10px'}}/>
          </Box>
          </Box>
        </Box>
          <CardActions className ='card-actions-wrapper'>
          <Skeleton variant="text" height = {"2em"} width = {'30%'} style = {{marginLeft:'10px'}}/>
          <Skeleton variant="text" height = {"2em"} width = {'30%'} style = {{marginRight:'10px'}}/>
          </CardActions>
      </Card>
    )
}

export default ProductCardSkeleton
