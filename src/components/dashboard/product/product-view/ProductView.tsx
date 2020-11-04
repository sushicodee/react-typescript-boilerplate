import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Loader from 'components/common/loader/Loader';
import { useHistory } from 'react-router-dom';
import ButtonComponent from 'components/common/Button/ButtonComponent';
import './ProductView.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import snack from './../../../utils/notification/Snackbar';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  handlePageNumber,
  updateProduct,
} from './../../../../actions/products/productActions';
import { axiosApi } from 'api/axios/axiosApi';

function ProductViewComponent(props) {
  const { currentPage, perPage, handlePageChange } = props;
  // const {products:{data}} = product
  const [data, setData]: any = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const url = '/product';
  const product = useSelector((state) => state.product);
  const imageurl = process.env.REACT_APP_IMAGE_URL;
  const [view, setView] = useState('');
  const [columns, setColumns]: any = useState([]);
  const desktopCols = [
    {
      title: 'Edit All',
      render: (rowData) => (
        <ButtonComponent
          handlesubmit={() => history.push(`/add-product/${rowData._id}`)}
          color={'secondary'}
          classname={'btn-edit btn-edit-round'}
          options={{
            size: 'medium',
            isSubmitting: false,
            icon: 'description',
            variantType: 'contained',
          }}
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
    { title: 'Sub Category', field: 'subCategory' },
    { title: 'Price', field: 'price', type: 'numeric' },
    { field: 'brand', title: 'Brand', props: {} },
    { field: 'description', title: 'Description', props: {} },
    { field: 'quantity', title: 'Quantity', type: 'numeric', props: {} },
  ];

  const mobilecols = [
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
    { title: 'Price', field: 'price', type: 'numeric' },
  ];

  React.useEffect(() => {
    const resizeEvent = () => {
     
      if (window.innerWidth <= 678) {
        if (view === 'mobile') {
          return;
        }
        setColumns(mobilecols);
        setView('mobile');
      } else {
        if (view === 'desktop') {
          return;
        }
        setColumns(desktopCols);
        setView('desltop');
      }
    };
    function resize() {
      if(window.innerWidth <= 678 && view === ''){
        setView('mobile')
        setColumns(mobilecols)
      }else{
        setView('desktop');
        setColumns(desktopCols);
      }
      window.addEventListener('resize', resizeEvent);
    }
    resize();
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  // const handleNext = () => {
  //   let lastPage = 10;
  //   //todo get total data/perPage
  //   if (currentPage !== lastPage) {
  //     handlePageChange(currentPage + 1);
  //     dispatch(fetchProducts(currentPage));
  //   }
  // };

  // const handlePrevious = () => {
  //   const { currentPage, handlePageChange } = props;
  //   if (currentPage !== 1) {
  //     handlePageChange(currentPage - 1);
  //     dispatch(fetchProducts(currentPage));
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = (perPage = 5, currentPage = 1) => {
  //   dispatch(fetchProducts(perPage, currentPage));
  // };

  return props.isLoading ? (
    <Loader />
  ) : (
    <Grid container className="material-table-wrapper wrapper">
      <MaterialTable
        title="My Products"
        columns={columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = '/product?';
            axiosApi
              .get(
                url,
                {
                  params: {
                    currentPage: query.page + 1,
                    perPage: query.pageSize,
                  },
                },
                true,
              )
              .then((res: any) => {
                resolve({
                  data: res.data,
                  page: query.page,
                  totalCount: res.count,
                });
              })
              .catch((err) => {
                reject();
              });
          })
        }
        // data={props.data}
        options={{
          exportButton: true,
          search: false,
        }}
        editable={{
          isEditHidden: () => view === 'mobile',
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              // dispatch(addProduct(newData,true))
              // resolve();
              axiosApi
                .post(`${url}`, newData, {}, true)
                .then((response: any) => {
                  setData([...data, response.data]);
                  snack.showSuccess(`${newData.name} added successfully`);
                  resolve();
                })
                .catch((err) => {
                  snack.handleError(err);
                  reject();
                });
            }),
          onRowUpdate: (newData: any, oldData: any) =>
            new Promise((resolve, reject) => {
              // dispatch(updateProduct(newData,true))
              // resolve();
              axiosApi
                .put(`${url}/${newData._id}`, newData, {}, true)
                .then((data: any) => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  snack.showSuccess(`${newData.name} updated successfully`);
                  resolve();
                })
                .catch((err) => {
                  reject();
                });
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              // dispatch(deleteProduct(oldData._id,true))
              // resolve();
              axiosApi
                .remove(`${url}/${oldData._id}`, true)
                .then((response: any) => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  snack.showSuccess(`${oldData.name} removed successfully`);
                  resolve();
                })
                .catch((err) => {
                  snack.handleError(err.data);
                  reject();
                });
            }),
        }}
      />
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.product.isLoading,
  data: state.product.products.data,
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
