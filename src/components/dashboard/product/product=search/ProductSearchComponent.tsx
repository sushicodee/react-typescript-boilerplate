import React,{useState,useEffect} from 'react'
import { axiosApi } from 'api/axios/axiosApi';
import { useParams } from 'react-router-dom';
import Snackbar from 'components/utils/notification/Snackbar';
import { Grid } from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';
import ProductCard from 'components/common/Cards/product/ProductCard';
import './ProductSearchComponent.scss'
import { searchProducts } from 'actions/products/productActions';
const ProductSearchComponent = () => {
    const imageurl = process.env.REACT_APP_IMAGE_URL;
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const{searchResults,products} = product;
    const params = useParams();
    const [condition,setcondition] = useState({})
    useEffect(() => {
        const loadData = (condition = {}) => {
            const conditionData={...params,...condition}
            Object.keys(conditionData).forEach(key => conditionData[key] === undefined ? delete conditionData[key] : {});
            dispatch(searchProducts(conditionData))
        }
        loadData();
    }, [condition,params])

    return (
        <div>
            <Grid container spacing = {4} className = 'product-container'>
                {searchResults.length ? searchResults.map((productData:any) => 
                <Grid item className = 'grid-item-product' key ={product._id} xs ={12} sm={6} md={6} lg ={5} xl={3}>
                    <ProductCard data = {productData}/>
                </Grid>
                )
                : 
                <div className = 'no-products-found'>
                    no products found
                </div>

                }
            </Grid>
        </div>
    )
}

export default ProductSearchComponent
