import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from 'components/common/Cards/product/ProductCard';
import './ProductSearchComponent.scss';
import { searchProducts } from 'actions/products/productActions';
import PaginationComponent from 'components/common/Pagination/PaginationComponent';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductSearchComponent = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { searchResults, searchCount, filterCondition, isLoading } = product;
  const [currentPage, setPage] = useState(1);
  const perPage = 100;

  useEffect(() => {
    const loadData = () => {
      const conditionData = { ...filterCondition };
      Object.keys(conditionData).forEach((key) =>
        conditionData[key] === undefined ? delete conditionData[key] : {},
      );
      dispatch(searchProducts(conditionData, { currentPage, perPage }));
    };
    loadData();
  }, [currentPage, perPage, filterCondition.count]);
  return (
    <>
      {!isLoading && searchResults.length === 0 && (
          <Grid container className =' no-products-found container' xs = {12}>No Products Found</Grid>
        )}
      <Grid container spacing={4} className="product-container">
        {isLoading &&
          Array(10)
            .fill('')
            .map((val, index) => (
              <Grid
                item
                className="grid-item-product"
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Skeleton>
                  <ProductCard data={val} />
                </Skeleton>
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
