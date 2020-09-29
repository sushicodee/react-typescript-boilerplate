import { Grid } from '@material-ui/core';
import {searchProducts } from 'actions/products/productActions';
import Loader from 'components/common/loader/Loader';
import React ,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ProductFilterComponent from '../product/product-filter/ProductFilterComponent';
import ProductSearchComponent from '../product/product=search/ProductSearchComponent';

function HomeComponent(props) {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setsortOrder] = useState('');
    const [category,setCategory] = useState('');
    const product = useSelector(state => state.product)
    const { products, isLoading, currentPage, perPage ,isError} = product
    
    useEffect(() => {
        //fetch products
        // dispatch(searchProducts(category))
    },[])

    return (
      
                <Grid container className = 'all-products'>
                    <ProductFilterComponent/>
                    <ProductSearchComponent/>
                </Grid>
          
    )
}

export default HomeComponent
