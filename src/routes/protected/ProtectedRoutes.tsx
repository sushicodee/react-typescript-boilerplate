import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from 'components/header/Header';
import {connect} from 'react-redux';

const ProtectedRoutes = ({ component: Component, ...props }) => {
  const {isLoggedin} = props.auth;
  return (
    <Route
      {...props}
      render={(props) => {
        return <>{isLoggedin ? (
            <>
            <Header isLoggedin = {isLoggedin}/>
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

const mapStateToProps = (state) =>({
  auth:state.auth
})

export default connect(mapStateToProps)(ProtectedRoutes);
//todo  pass location of past page 