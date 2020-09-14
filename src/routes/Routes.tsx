import React from 'react';
import { Switch } from 'react-router-dom';
import LoginComponent from 'components/auth/Login/LoginComponent';
import SignupComponent from 'components/auth/Login/SignupComponent';
import NotFound from 'components/NotFound/NotFound';
import Dashboard from 'components/dashboard/Dashboard';
import ProtectedRoutes from './protected/ProtectedRoutes';
import PublicRoutes from './public/PublicRoutes';
import HomeComponent from 'components/dashboard/home/HomeComponent';
import ProductForm from 'components/dashboard/product/product-form/ProductForm';
import ProfileForm from 'components/dashboard/profile/profile-form/ProfileForm';
import ProductView from 'components/dashboard/product/product-view/ProductView';
import ProductSearchComponent from 'components/dashboard/product/product=search/ProductSearchComponent';
import MessageComponent from 'components/dashboard/messages/MessageComponent';

const Routes = () => {
  return (
    <>
      {/* <Header isLoggedin={isLoggedin}></Header> */}
      <Switch>
        <PublicRoutes exact path="/" component = {HomeComponent}/>
        <PublicRoutes path="/login" component={LoginComponent} />
        <PublicRoutes path="/signup" component={SignupComponent} />
        <ProtectedRoutes path ='/dashboard' component = {Dashboard}/>
        <ProtectedRoutes path ='/add-product/:id' component = {ProductForm}/>
        <ProtectedRoutes path ='/add-product' component = {ProductForm}/>
        <ProtectedRoutes path ='/my-products' component = {ProductView}/>
        <ProtectedRoutes path ='/messages' component = {MessageComponent}/>
        <ProtectedRoutes path ='/profile' component = {ProfileForm}/>
        <PublicRoutes path = '/products/search/:category?/:subCategory?' component = {ProductSearchComponent}/>
        <PublicRoutes component={NotFound} />
      </Switch>
      
    </>
  );
};

export default Routes;
