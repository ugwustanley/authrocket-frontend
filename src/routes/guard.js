import React from "react";
import { Redirect, Route } from "react-router-dom";


export default function Guard({ route , path} ) {

  //const {path , children , component} = route
  const shouldRedirect = () => {
    
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
       return   <Redirect to="login" />;
    }
    return route.children || null;
  }
  console.log(route, "from guard")
  return <Route exact path={path + route.path} component={route.component} children={shouldRedirect()} />
}
