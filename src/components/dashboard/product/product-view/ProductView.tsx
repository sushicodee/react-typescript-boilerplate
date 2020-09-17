import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Loader from 'components/common/loader/Loader';
import { useHistory } from 'react-router-dom';
import ButtonComponent from 'components/common/Button/ButtonComponent';
import './ProductView.scss';
import { connect } from 'react-redux';
import {
  fetchProducts,
  handlePageNumber,
} from './../../../../actions/products/productActions';
import { Button } from '@material-ui/core';

function ProductViewComponent(props) {
  const history = useHistory();
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const [columns, setColumns]: any = useState([
    {
      title: 'Edit All',
      render: (rowData) => (
        <ButtonComponent
          handlesubmit={() => history.push(`/add-product/${rowData._id}`)}
          color={'secondary'}
          classname={'btn-edit btn-edit-round'}
          options={{ isSubmitting: false, icon: 'description' }}
          type="button"
          value="Detailed Edit"
        />
      ),
    },
    {
      title: 'Photo',
      field: 'image',
      editable: 'never',
      render: (rowData) => (
        <img
          style={{ height: 50, borderRadius: '5%' }}
          src={`${imageurl}/${rowData.image}`}
          alt={rowData.image}
        />
      ),
    },
    { title: 'Name', field: 'name' },
    { title: 'Category', field: 'category' },
    { title: 'Category', field: 'subCategory' },
    { title: 'Price', field: 'price', type: 'numeric' },
    { title: 'Manufactured Date', field: 'manuDate', type: 'date' },
    { title: 'Expiry Date', field: 'expiryDate', type: 'date' },
    { field: 'brand', title: 'Brand', props: {} },
    { field: 'description', title: 'Description', props: {} },
    { field: 'quantity', title: 'Quantity', type: 'numeric', props: {} },
  ]);

  const handleNext = () => {
    const { currentPage, handlePageChange } = props;
    let lastPage = 10;
    //todo get total data/perPage
    if (currentPage !== lastPage) {
      handlePageChange(currentPage + 1);
      props.fetchProducts(currentPage);
    }
  };

  const handlePrevious = () => {
    const { currentPage, handlePageChange } = props;
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
      props.fetchProducts(currentPage);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (perPage = 5, currentPage = 1) => {
    // props.setLoading(true);
    props.fetchProducts(perPage, currentPage);
    // setisloading(true);
    // axiosApi.get('/product',{},true)
    // // axiosApi.get('/product',{params:{currentPage:pageNumber,perPage:pageSize}},true)
    // .then(data => {
    //   setData(data);
    //   setisloading(false);
    // })
    // .catch(err => {
    //   snack.handleError(err)
    //   setisloading(false);

    // })
  };

  return props.isLoading ? (
    <Loader />
  ) : (
    <Grid container className = 'material-table-wrapper'>
      {/* <Grid item xs ={12}>
            <Typography> My Products</Typography>
            </Grid> */}
      <MaterialTable
        title="My Products"
        columns={columns}
        // data={query =>
        //   new Promise((resolve, reject) => {
        //     setisloading(true);
        //     axiosApi.get(url,{params:{currentPage:pageNumber,perPage:pageSize}},true)
        //     .then((res:any) => {
        //       setData(data)
        //       resolve({
        //         data:[],
        //         page:1,
        //         totalCount:100,
        //        })
        //       setisloading(false);
        //     })
        //     .catch(err => {
        //       reject();
        //     })
        //   })
        // }
        data={props.data}
        options={{
          exportButton: true,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              // axiosApi.post(`${url}`,newData,{},true)
              // .then((response:any) => {
              //   const dataUpdate = [response,...data];
              //   setData([...dataUpdate])
              //   snack.showSuccess(`${newData.name} added successfully`);
              //   resolve();
              // }).catch(err => {
              //   snack.handleError(err)
              //   reject();
              // })
            }),
          onRowUpdate: (newData: any, oldData: any) =>
            new Promise((resolve, reject) => {
              // axiosApi.put(`${url}/${newData._id}`,newData,{},true)
              // .then((response:any) => {
              //   const dataUpdate = [...data];
              //   const index = oldData.tableData.id;
              //   dataUpdate[index] = newData;
              //   setData([...dataUpdate])
              //   snack.showSuccess(`${newData.name} edited successfully`);
              //   resolve();
              // }).catch(err => {
              //   console.log(err)
              //   snack.handleError(err.data)
              //   reject();
              // })
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              // axiosApi.remove(`${url}/${oldData._id}`,true)
              // .then((response:any) => {
              //   const dataDelete = [...data];
              //   const index = oldData.tableData.id;
              //   dataDelete.splice(index, 1);
              //   setData([...dataDelete]);
              //   snack.showSuccess(`${oldData.name} removed successfully`);
              //   resolve();
              // })
              // .catch(err => {
              //   snack.handleError(err.data)
              //   reject();
              // })
            }),
        }}
      />
      <Button onClick={handlePrevious}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.product.isLoading,
  data: state.product.products,
  perPage: state.product.perPage,
  currentPage: state.product.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (perPage, currentPage) =>
    dispatch(fetchProducts(perPage, currentPage)),
  handlePageChange: (pageNumber) => dispatch(handlePageNumber(pageNumber)),
});

export const ProductView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductViewComponent);
