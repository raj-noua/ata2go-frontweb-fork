import React from "react";

import LoginForm from "./LoginForm";
import "./LoginForm.css";
import { Container } from "react-bootstrap";
const Login = () => {
    return (
        <div className="users-login-page">
            <Container>
                <div className="d-flex justify-content-center">
                    <div className="col-md-6 col-12">
                        <div className="login-wrapper ">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;
