import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, Input, Grid } from '@material-ui/core';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import CheckboxComponent from '../Checkbox/CheckboxComponent';
import DatePicker from '../DatePicker/DatePicker';
import snack from './../../utils/notification/Snackbar';
import { axiosApi } from './../../../api/axios/axiosApi';
import SelectComponent from '../Select/SelectComponent';
import { useHistory, useParams } from 'react-router-dom';
import utils from 'components/utils/utils';
import { getItem } from 'components/utils/localStorage/LocalStorage';
import { MTableEditField } from 'material-table';

const useStyles = () =>
  makeStyles({
    paper: {
      marginTop: '128px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: '4px',
      backgroundColor: 'white',
    },
    form: {
      width: '100vw',
      marginTop: '4px',
    },
    submit: {
      margin: '8px 0 4px',
    },
  });

const FormBuilder = ({ url, className, formName, form, buttonTitle }) => {
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [data, setdata] = useState({});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isTouched, setistouched] = useState(false);
  const [options, setOptions] = useState({
    isSubmitting: false,
    isError: false,
    isValid: false,
  });
  const title = params.id ? `Edit ${formName}` : 'Add' + ' ' + formName;

  useEffect(() => {
    const defaultTouch = defaultDerived('touched');
    const error = defaultDerived('error');
    const data = defaultDerived('data');

    setdata(data);
    setTouched(defaultTouch);
    setErrors(error);
    if (params.id) {
      axiosApi
        .post(`${url}/search/`, { _id: params.id })
        .then((response) => {
          if (response.length) {
            setdata({ ...data, ...response[0] });
            return;
          }
          setdata(data);
        })
        .catch((err) => {
          snack.handleError('unable to fetch data');
          setdata(data);
        });
    }
  }, [params.id]);

  const defaultDerived = (state) => {
    const newState = {};
    if (state === 'touched') {
      form.forEach((item) => {
        if (item.props?.required) {
          newState[item.key] = false;
        }
      });
    }
    if (state === 'data') {
      form.forEach((item) => {
        if (item.type === 'boolean') {
          newState[item.key] = false;
        } else if (item.type === 'number') {
          newState[item.key] = 0;
        } else {
          newState[item.key] = '';
        }
      });
      if (params.id) {
        newState['newimage'] = '';
      }
    }
    if (state === 'error') {
      form.forEach((item) => {
        newState[item.key] = '';
      });
    }
    return newState;
  };

  const handleChange = (e) => {
    let { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      value = checked;
    }
    if (type === 'file') {
      value = files;
    }

    setdata((predata) => ({ ...predata, [name]: value }));
    console.log('handleChange',data)
    // let errors = validateProductForm(name,this.state);
    // setErrors(preError => ({...preError,errors}))
    form.forEach((item) => {
      if (item.props?.required && item.key === name) {
        setTouched((preTouch) => ({ ...preTouch, [name]: true }));
      }
    });
    setistouched(Object.values(touched).filter((data) => !data).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    // setOptions((pre) => ({ ...pre, isSubmitting: true }));
    if (data._id) {
      update();
      return;
    } 
    else {
      add();
    }
  };

  const update = () => {
    const files = data.newimage;
    delete data.newimage;
    setOptions((prev) => ({ ...prev, isSubmitting: true }));
    axiosApi
      .uploadFile(
        'PUT',
        `${process.env.REACT_APP_BASE_URL}${url}/${data._id}?token=${getItem(
          'token',
        )}`,
        data,
        files,
      )
      .then((data) => {
        snack.showSuccess('Product edited successfully');
        setOptions((prev) => ({ ...prev, isSubmitting: false }));
        history.push('/my-products');
      })
      .catch((err) => {
        snack.handleError(err);
        setOptions((prev) => ({ ...prev, isSubmitting: false }));
      });
  };

  const add = () => {
    setOptions((prev) => ({ ...prev, isSubmitting: true }));
    const files = data.image;
    delete data.image;
    if (files && files[0]) {
      axiosApi
        .uploadFile(
          'POST',
          `${process.env.REACT_APP_BASE_URL}${url}?token=${getItem('token')}`,
          data,
          files,
        )
        .then((data) => {
          snack.showSuccess('Product added successfully');
          setOptions((prev) => ({ ...prev, isSubmitting: false }));
          history.push('/my-products');
        })
        .catch((err) => {
          console.log(err);
          snack.handleError(err);
          setOptions((prev) => ({ ...prev, isSubmitting: false }));
        });
    } else {
      axiosApi
        .post('/product', data, {}, true)
        .then((data) => {
          snack.showSuccess('Product added successfully');
          setOptions((prev) => ({ ...prev, isSubmitting: false }));
          history.push('/my-products');
        })
        .catch((err) => {
          console.log(err);
          snack.handleError(err.data);
          setOptions((prev) => ({ ...prev, isSubmitting: false }));
        });
    }
  };

  const handleDateChange = (date, name) => {
    const value = utils.formatSetDate(date);
    setdata((predata) => ({ ...predata, [name]: value }));
  };

  const formclass = className || 'dynamic-form';
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        {formName && (
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        )}
        <form
          className={classes.form + ' ' + formclass}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <Grid container spacing={2}>
            {form.map((field, index) =>
              field.type === undefined || field.type === 'number' ? (
                <InputComponent
                  key={field.key + '-' + index}
                  name={field.key}
                  label={field.label}
                  type={field.type}
                  error={errors[field.key]}
                  props={field.props}
                  data={data}
                  handlechange={handleChange}
                />
              ) : field.type === 'file' ? (
                <FileUploadButton
                  key={index}
                  name={data._id ? 'newimage' : field.key}
                  label={data._id ? 'Update Photo' : field.label}
                  value={data._id ? data['newimage'] : data[field.key]}
                  error={data._id ? errors['newimage'] : errors[field.key]}
                  props={field.props}
                  handlechange={handleChange}
                />
              ) : field.type === 'date' ? (
                <DatePicker
                  key={field.key + '-' + index}
                  name={field.key}
                  label={field.label}
                  value={data[field.key]}
                  error={errors[field.key]}
                  handlechange={handleDateChange}
                />
              ) : field.type === 'boolean' ? (
                <CheckboxComponent
                  key={field.key + '-' + index}
                  name={field.key}
                  label={field.label}
                  value={data[field.key] || false}
                  data={data}
                  handlechange={handleChange}
                />
              ) : field.type === 'select' ? (
                <SelectComponent
                  key={field.key + '-' + index}
                  name={field.key}
                  label={field.label}
                  value={data[field.key]}
                  props={field.props}
                  data={data}
                  handlechange={handleChange}
                />
              ) : null,
            )}
            <ButtonComponent
              classname={` btn btn-${className}`}
              value={title}
              options={options}
            />
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default FormBuilder;
