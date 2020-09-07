import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Copyright from './../../copyright/Copyright';
import { validateForm } from './validation/LoginValidation';
import './LoginComponent.scss'
import {IErrorState,IOptionsState} from './../interfaces/Interfaces'
import { setItem, removeItem, getItem } from 'components/utils/localStorage/LocalStorage';
import { axiosApi } from 'api/axios/axiosApi';
import snack from './../../utils/notification/Snackbar';
// import axios from 'axios'
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
  logging: {
    margin: '8px 0 4px',
    backgroundColor: 'green',
  },
});
interface IProps {
  classes: any;
  history:any;
  location:any;
  snack:{
    message:string;
    varient:string;
    timeout:number;
    open:boolean;
  }
  match:any;
}

interface IDataState {
  username: String;
  password: String;
}
interface IState {
  errors: IErrorState;
  data: IDataState;
  options: IOptionsState;
  touched:ITouchState
}

interface ITouchState {
  username:boolean;
  password:boolean;
}
export class LoginComponent extends Component<IProps, IState> {

  state: IState = {
    data: {
      username: '',
      password: '',
    },
    errors: {
      errorMessage:{},
      isError: false,
    },
    options: {
      rememberMe: false,
      isSubmitting: false,
    },
    touched:{
      username:false,
      password:false,
    }
  };

  componentDidMount() {
    const username = getItem('username') || '';
    const rememberMe = getItem('rememberMe') === 'true'?true:false;
    if(rememberMe && username){
        this.setState(prevState => ({
          ...prevState,
          data:{...prevState.data,
          username},
          options:{
            ...prevState.options,
            rememberMe,
          }
      }))
    }
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    //remember me
    const { name, value,checked }: any = e.target;
    if(name === 'rememberMe'){
      this.setState(prevState => ({
        ...prevState,
        options:{
          ...prevState.options,
          [name]:checked
        },
      }),() => {
        if(this.state.options.rememberMe){
          setItem('rememberMe',this.state.options.rememberMe);
          if(this.state.data.username){
            setItem('username',this.state.data.username);
          }
          return;
        }
        removeItem('username');
        removeItem('rememberMe');
      })
      return;
    }
    
    this.setState(
      (prevState) => ({
        ...prevState,
        data: { ...prevState.data, [name]: value },
      }),
      () => {
        let errors = validateForm(name,this.state,{form:'login'});
        this.setState(prevState => ({
          ...prevState,
          errors:{
            ...prevState.errors,
            errorMessage:{...errors.errorMessage,'loginError':''},
            isError:errors.isError
          },
          touched: { ...prevState.touched,
            [name]: true }
        }))
      },
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {history} = this.props;
    this.setState(
      (prevState) => ({
        ...prevState,
        options:{
          ...prevState.options,
          isSubmitting: true
        }   
      }),
      () => {
        axiosApi.post('/auth/login',this.state.data,{},true)
        .then((data:any) => {
          console.log(data);
            snack.showSuccess(`${data.user.username} logged in Successfully`)
            setItem('token',data.token) 
            setItem('user',JSON.stringify(data.user))
            setTimeout(() => {
              history.push(`/dashboard`)
            },1000)
            
      })
      .catch(err => {
          snack.handleError(err.data.message);
          this.setState({...this.state,
            errors:{
              ...this.state.errors,
              errorMessage:{
                ...this.state.errors.errorMessage,
                'loginError':err.data.message}}})
      })
      .finally(() => {
        this.setState({
          ...this.state,
          options:{...this.state.options,isSubmitting:false}})     
      })  
      },
    );
  };

  render() {
    const { classes } = this.props;
    const {
      options: { isSubmitting, rememberMe },
      errors: { isError,errorMessage},
      touched
    } = this.state;
    const submitButtonClass = isSubmitting
      ? classes.submitting
      : classes.submit;
    const errorClass = isError?'-error':null
    const isInvalid = isError || Object.values(touched).filter(data => data === false).length !== 0;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <TextField
              className = {`form-field form-field${errorMessage.username !== ''?'-error':null}`}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e: any) => this.handleChange(e)}
              error = {errorMessage.username}
            />
            <Grid className = 'error-span'>{errorMessage.username && errorMessage.username}</Grid>
            <TextField
              className = {`form-field form-field${errorClass}`}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e: any) => this.handleChange(e)}
              error = {errorMessage.password}
            />
            <Grid className = 'error-span'>{errorMessage.password} {errorMessage.loginError}</Grid>
            <FormControlLabel
              control={
                <Checkbox 
                name="rememberMe"
                onChange = {(e:any) => this.handleChange(e)}
                value="remember"
                color="primary"
                checked = {rememberMe}
                  />}
              label="Remember me"
            />
            {isSubmitting ?
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={submitButtonClass}
              disabled={isSubmitting}>
              Logging in...
            </Button>
            :<Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submitButtonClass}
              disabled={isInvalid}
            >
               Sign In
            </Button>
            }
            <Grid container>
              <Grid item xs>
                <Link to="/forgot">
                <Typography variant ="body2" id='forgot-link'>
                  Forgot password?
                </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                <Typography variant ="body2" id='forgot-link'>
                  {"Don't have an account? Sign Up"}
                </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(LoginComponent);
