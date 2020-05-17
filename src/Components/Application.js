import React, { useContext } from 'react';
import { Router } from "@reach/router";

import SignInWith from "./Auth/SignInWith";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import PasswordReset from "./Auth/PasswordReset";
import Weight from './Weight/Weight';
import Dashboard from "./Dashboard/Dashboard";

import { UserContext } from "../providers/UserProvider";


const paths = user => {
  if (user) {
    return (
      <Router>
        <Dashboard path="/" />
        <Weight path="weight" />
      </Router>
    );
  } else {
    return (
      <Router>
        <SignInWith path="/" />
        <SignIn path="signin" />
        <SignUp path="signup" />
        <PasswordReset path="passwordreset" />
      </Router>
    );
  }
};


function Application() {
  const user = useContext(UserContext);
  
  return (
    <div>
      {paths(user)}
    </div>
  );
}


export default Application;
