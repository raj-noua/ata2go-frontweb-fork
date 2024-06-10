import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./LoginForm.css";
import logo from "../../assets/images/img/logo.png";
import { useSendCodeMutation } from "../../services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EmailTaker = () => {
  const [email, setEmail] = useState("");
  const [sendCode] = useSendCodeMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSendCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      sendCode({ email: email }).then((res) => {
        if (res?.data?.status) {
          navigate(`/verify-code/${email}`);
          setError("");
        } else {
          setError(res?.data?.message);
        }
      });
    } else {
      setError("Please Enter a valid email!");
    }
  };
  return (
    <div className="users-login-page">
      <div className="video-input-box-modal email-taker-box">
        <div className="input-wrapper w-100">
          {/* <label htmlFor="title">Email</label> */}
          <img src={logo} height={"150px"} width={"10px"} alt="logo" />

          <h5 className="mb-3 text-center">Reset Password</h5>

          <input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="buttons-div-password">
          <Button
            onClick={()=> navigate('/sign-in')}
            className="btn btn-danger d-block btn-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendCode}
            className="btn btn-primary d-block btn-cancel"
          >
            Send Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailTaker;
