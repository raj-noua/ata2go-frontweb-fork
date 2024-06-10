import React from "react";
import RegisterForm from "./RegisterForm";
const Register = () => {
  return (
    <div>
      <div className="user-create-page">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="col-md-6 col-12">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
