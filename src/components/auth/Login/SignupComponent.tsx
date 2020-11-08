import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Copyright from './../../copyright/Copyright';
import { validateForm } from './validation/LoginValidation';
import { IErrorState, IOptionsState } from './../interfaces/Interfaces';
import {Link} from 'react-router-dom';
import { axiosApi } from 'api/axios/axiosApi';
import snack from './../../utils/notification/Snackbar';

interface IProps {
  classes: any;
  history:any;
}

interface IDataState {
  firstName: String;
  lastName: String;
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
}

interface ITouchState {
  firstName: boolean;
  lastName: boolean;
  username: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface IState {
  errors: IErrorState;
  data: IDataState;
  options: IOptionsState;
  touched:ITouchState;
}

const useStyles: any = () => ({
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
    width: '100%',
    marginTop: '4px',
  },
  submit: {
    margin: '8px 0 4px',
  },
});
class SignupComponent extends Component<IProps, IState> {
  state: IState = {
    data: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      confirmPassword: '',
    },
    errors: {
      errorMessage: {},
      isError: false,
    },
    options: {
      rememberMe: false,
      isSubmitting: false,
    },
    touched:{
      username:false,
      password:false,
      firstName:false,
      lastName:false,
      email:false,
      confirmPassword:false,
    }
  };

  componentDidMount(){
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target;
    this.setState(
      (prevState) => ({
        ...prevState,
        data: { ...prevState.data, [name]: value },
      }),
      () => {
        let errors = validateForm(name,this.state);
        this.setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            errorMessage: errors.errorMessage,
            isError: errors.isError,
          },
          touched: { ...prevState.touched,
            [name]: true }
        }));
      },
    );
  };

  handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {email,password,username,firstName,lastName} = this.state.data
    const {history} = this.props;
    const data = {
      name:firstName +' '+lastName,
      username,
      email,
      password,
    }

    this.setState(
      (prevState) => ({
        ...prevState,
        options:{
          ...prevState.options,
          isSubmitting: true
        }   
      }),
      () => {
        axiosApi.post('/auth/register',data,{},true)
        .then((data:any) => {
            snack.showSuccess(data.username + 'Registered Successfully') 
            setTimeout(() => {
              history.push(`/login`)
            },1000)  
        })
      .catch(err => {
          snack.handleError(err);
          this.setState({...this.state,
            errors:{
              ...this.state.errors,
              errorMessage:{
                ...this.state.errors.errorMessage,
                loginError:err.message}}})
      })
      .finally(() => {
        this.setState({
          ...this.state,
          options:{...this.state.options,isSubmitting:false}})   
         
      }) 
      },
    );
  }

  render() {
    const { classes } = this.props;
    const {
      options: { isSubmitting},
      errors: { isError, errorMessage },
      touched,
    } = this.state;
    const submitButtonClass = isSubmitting
      ? classes.submitting
      : classes.submit;
    const isInvalid = isError || Object.values(touched).filter(data => data === false).length !== 0;
    return (
      <Container component="main" maxWidth="xs" className='container'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit = {(e:any ) => this.handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  onChange={(e: any) => this.handleChange(e)}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                <Grid item className="error-span">
                  {errorMessage.firstName}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  onChange={(e: any) => this.handleChange(e)}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
                <Grid item  className="error-span">
                  {errorMessage.lastName}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={(e: any) => this.handleChange(e)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Grid item className="error-span">
                  {errorMessage.email}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={(e: any) => this.handleChange(e)}
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
                <Grid item className="error-span">
                  {errorMessage.username}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={(e: any) => this.handleChange(e)}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid item className="error-span">
                  {errorMessage.password}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange={(e: any) => this.handleChange(e)}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                />
                <Grid item className="error-span">
                  {errorMessage.confirmPassword}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {isSubmitting ?
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={submitButtonClass}
              disabled={isSubmitting}>
              Signing up...
            </Button>
            :<Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submitButtonClass}
              disabled={isInvalid}
            >
               Sign Up
            </Button>
            }
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
export default withStyles(useStyles)(SignupComponent);
