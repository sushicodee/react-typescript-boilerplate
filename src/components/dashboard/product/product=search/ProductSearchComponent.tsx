import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from 'components/common/Cards/product/ProductCard';
import './ProductSearchComponent.scss';
import { searchProducts } from 'actions/products/productActions';
import PaginationComponent from 'components/common/Pagination/PaginationComponent';
import Skeleton from '@material-ui/lab/Skeleton';
import SkeletonBuilder from 'components/common/SkeletonBuilder/SkeletonBuilder';

const ProductSearchComponent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector((state) => state.product);
  const { searchResults, searchCount, filterCondition, isLoading } = product;
  const [currentPage, setPage] = useState(1);
  const [perPage, setPerPage]: any = useState(8);
  const [noOfSkeletons, setSkeletons]: any = useState([]);
  useEffect(() => {
    let total = perPage;
    while (total !== 0) {
      setSkeletons((pre) => [total - 1, ...pre]);
      total--;
    }
  }, [perPage]);

  useEffect(() => {
    const loadData = () => {
      const conditionData = { ...filterCondition, ...params };
      Object.keys(conditionData).forEach((key) =>
        conditionData[key] === undefined ? delete conditionData[key] : {},
      );
      dispatch(searchProducts(conditionData, { currentPage, perPage }));
    };
    loadData();
  }, [params, currentPage, perPage]);
  return (
    <div>
      <Grid container spacing={4} className="product-container">
        {isLoading &&
          Array(10).fill(null).map((val,index) => (
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
                <ProductCard data = {val}/>
              </Skeleton>
            </Grid>
          ))}
        {searchResults.length > 0
          ? searchResults.map((productData: any) => (
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
            ))
          : null}
      </Grid>
      <Grid container spacing={4} className="pagination-container container">
        <PaginationComponent
          currentPage={currentPage}
          count={Math.ceil(searchCount / perPage)}
          setPage={setPage}
        />
      </Grid>
    </div>
  );
};

export default ProductSearchComponent;
