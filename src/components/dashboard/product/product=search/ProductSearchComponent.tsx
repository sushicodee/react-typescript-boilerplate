import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import ProductCard from 'components/common/Cards/product/ProductCard';
import './ProductSearchComponent.scss';
import { searchProducts } from 'actions/products/productActions';
import PaginationComponent from 'components/common/Pagination/PaginationComponent';
import Skeleton from '@material-ui/lab/Skeleton';
import ProductFilterComponent from '../product-filter/ProductFilterComponent';
import ProductCardSkeleton from 'components/common/Cards/product/Skeletons/ProductCardSkeleton';

const ProductSearchComponent = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { searchResults, searchCount, filterCondition, isLoading } = product;
  const [currentPage, setPage] = useState(1);
  const params= useParams();
  const perPage = 100;

  useEffect(() => {
    const loadData = () => {
      const conditionData = { ...filterCondition };
      dispatch(searchProducts(conditionData, { currentPage, perPage ,...params}));
    };
    loadData();
  }, [currentPage, perPage,params,filterCondition.count]);
  return (
    <>
        <ProductFilterComponent />
        {!isLoading && searchResults.length === 0 && (
        <>
          <Grid item xs={3}></Grid>
          <Grid item className=" no-products-found container" xs={12}>
            No Products Found
          </Grid>
          <Grid item xs={3}></Grid>
        </>
        )}
        <Grid container  spacing={3} className="product-container">
          {isLoading &&
            Array(perPage)
              .fill('')
              .map((val, index) => (
                <Grid
                  item
                  className="grid-item-product"
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                >
                 <ProductCardSkeleton/>
                </Grid>
              ))}
          {searchResults.length > 0 &&
            searchResults.map((productData: any) => (
              <Grid
                item
                className="grid-item-product"
                key={productData._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <ProductCard data={productData} />
              </Grid>
            ))}
        </Grid>
      {searchResults && searchResults.length > 0 && (
        <Grid container spacing={4} className="pagination-container container">
          <PaginationComponent
            currentPage={currentPage}
            count={Math.ceil(searchCount / perPage)}
            setPage={setPage}
          />
        </Grid>
      )}
    </>
  );
};

export default ProductSearchComponent;
