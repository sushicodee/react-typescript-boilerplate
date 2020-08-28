import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginComponent from 'components/auth/Login/LoginComponent';
import Header from 'components/header/Header';
import SignupComponent from 'components/auth/Login/SignupComponent';
const Routes = () => {
  return (
      <>
      <Header/>  
      <Switch>
        <Route exact path="/">
          <h1>
            Home page Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Explicabo aut, ducimus ipsum nesciunt commodi corrupti, fugiat
            eveniet facilis distinctio reiciendis dolorum eius odit vero nam
            consequuntur accusantium maiores nostrum repudiandae!
          </h1>
        </Route>
        <Route path ='/login' component = {LoginComponent}/>
        <Route path ='/signup' component = {SignupComponent}/>
        <Route path="/about">
          <h1> About</h1>
        </Route>
        <Redirect to="/" />
      </Switch>
      </>
  );
};

export default Routes;
