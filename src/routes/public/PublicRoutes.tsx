import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/header/Header';
import { getItem } from 'components/utils/localStorage/LocalStorage';

function PublicRoutes({ component: Component, ...props }) {
  const isLoggedin = getItem('token') ? true : false;
  return (
    <Route
      {...props}
      render={(props) => (
        <>
          <Header isLoggedin={isLoggedin} />
          <div style ={{marginTop:'128px'}}></div>
          <Component {...props} />
        </>
      )}
    ></Route>
  );
}

export default PublicRoutes;
