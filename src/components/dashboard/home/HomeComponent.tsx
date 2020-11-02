import { Grid } from '@material-ui/core';
import React from 'react'
import ProductFilterComponent from '../product/product-filter/ProductFilterComponent';
import ProductSearchComponent from '../product/product=search/ProductSearchComponent';

function HomeComponent(props) {
    return (
                <Grid container className = 'all-products'>
                    <ProductFilterComponent/>
                    <ProductSearchComponent/>
                </Grid>
    )
}

export default HomeComponent
