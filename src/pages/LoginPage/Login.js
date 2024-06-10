import React from "react";

import LoginForm from "./LoginForm";
import "./LoginForm.css";
const Login = () => {
  return (
    <div className="users-login-page">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="col-md-6 col-12">
            <div className="login-wrapper ">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
