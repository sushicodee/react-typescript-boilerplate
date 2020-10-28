import { Grid } from '@material-ui/core';
import {searchProducts } from 'actions/products/productActions';
import Loader from 'components/common/loader/Loader';
import wrappeedMap from 'components/common/Map/Map';
import React ,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
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
