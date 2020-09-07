import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from 'components/header/Header';
import { getItem } from 'components/utils/localStorage/LocalStorage';

const ProtectedRoutes = ({ component: Component, ...props }) => {
  const isLoggedIn = getItem('token') ? true:false
  return (
    <Route
      {...props}
      render={(props) => {
        return <>{isLoggedIn ? (
            <>
            <Header isLoggedin = {isLoggedIn}/>
            <div className = 'core-app-wrapper'>
              <Component {...props}/>
            </div>
            </>
            )
            : (<Redirect to="/" />)}
            </>;
      }}
    ></Route>
  );
};

export default ProtectedRoutes;
//todo  pass location of past page 