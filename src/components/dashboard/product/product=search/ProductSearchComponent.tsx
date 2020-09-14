import React,{useState,useEffect} from 'react'
import { axiosApi } from 'api/axios/axiosApi';
import { useParams } from 'react-router-dom';
import Snackbar from 'components/utils/notification/Snackbar';
import { Grid } from '@material-ui/core';
import ProductCard from 'components/common/Cards/product/ProductCard';
import './ProductSearchComponent.scss'
function ProductSearchComponent() {
    const params = useParams();
    const [data, setdata] = useState([]);
    const imageurl = process.env.REACT_APP_IMAGE_URL;
    useEffect(() => {
        loadData();
    }, [params])

    const loadData = () => {
        // const {category,subcategory} = params;
        const conditionData={...params}
        Object.keys(conditionData).forEach(key => conditionData[key] === undefined ? delete conditionData[key] : {});
        axiosApi.post('/product/search',conditionData,{},false)
        .then((response:any) => {
            if(!response.length){
                return Snackbar.showWarning('no products to display')
            }
            setdata(response);
        })
        .catch(err => {
            
        })
    }

    return (
        <div>
            <Grid container spacing = {3} className = 'product-container'>
                {data && data.map((product:any) => 
                <Grid item key ={product._id}  xs ={12} sm ={6} md={4} lg ={3} xl={2}>
                    <ProductCard data = {product}/>
                </Grid>
                )
                }
            </Grid>
        </div>
    )
}

export default ProductSearchComponent
