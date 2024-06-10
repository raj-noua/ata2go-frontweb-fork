import React, { useContext, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/userApi";
import logo from "../../assets/images/img/logo.png";
import ReCAPTCHA from "react-google-recaptcha";

import { toast } from "react-toastify";
import { UserContext } from "../../App";
import { Form } from "react-bootstrap";
const RegisterForm = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [signup] = useSignupMutation();
  const [error, setError] = useState("");
  const [verifCaptcha, setVerifCaptcha] = useState(false);
  const [phone, setPhone] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [error1, setError1] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    address: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (
      event.target.name === "password" &&
      !passwordRegex.test(event.target.value)
    ) {
      setError1(true);
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    } else {
      setError1(false);
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    const phoneNumberRegex = /[^+\d\s()\-]/g; // Match any character that is not a digit, plus sign, space, open/close bracket, or hyphen
  
    const sanitizedValue = inputValue.replace(phoneNumberRegex, '');
  
    console.log(sanitizedValue);
    if (sanitizedValue.length > 0) {
      setPhone(sanitizedValue);
      console.log(sanitizedValue);
    } else {
      setPhone("");
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifCaptcha(true);
    setError("");
  }
  const handleSubmitData = () => {
    if (
      formData.email &&
      formData.firstName &&
      formData.password &&
      formData.lastName
    ) {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: "user",
        password: formData.password,
        phoneNo: formData.phoneNo,
        address: formData.address,
        subscribe: subscribe,
      };
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (data) {
        if (passwordRegex.test(formData.password)) {
          signup(data).then((res) => {
            if (res?.data?.status) {
              setError("");
              navigate(`/verify-email/${formData?.email}`);
            } else {
              setError(res?.data?.message);
              setError1(false);
            }
          });
        } else {
          setError1(true);
          setError("");
        }
      }
    } else {
      setError("Please fill out the required information!");
      setError1(false);
    }
  };
  return (
    <>
      <div className=" mt-5">
        <div className="input-box">
          <img src={logo} className="logo-style" alt="logo" />

          <h3 className="text-center">Create Account </h3>

          <form>
            <div className="input-field">
              <input
                type="text"
                className="input"
                id="firstName"
                name="firstName"
                required
                autocomplete="off"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <label for="firstName">
                First Name <span style={{ color: "red" }}>*</span>
              </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="lastName"
                name="lastName"
                required
                autocomplete="off"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <label for="lastName">
                Last Name<span style={{ color: "red" }}>*</span>
              </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="email"
                name="email"
                required
                autocomplete="off"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label for="email">
                Email<span style={{ color: "red" }}>*</span>
              </label>
            </div>

            <div className="input-field">
              <input
                type={show ? "text" : "password"}
                className="input"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <label for="password">
                Password<span style={{ color: "red" }}>*</span>
              </label>

              <div className="password-toggle">
                {formData.password.length > 1 && (
                  <span className="password-show-icon">
                    {show ? (
                      <BsEyeSlash onClick={() => setShow(!show)} />
                    ) : (
                      <BsEye onClick={() => setShow(!show)} />
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="phoneNo"
                name="phoneNo"
                required
                autocomplete="off"
                value={phone}
                onChange={handlePhoneNumberChange}
              />
              <label for="phoneNo">Phone Number</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="address"
                name="address"
                required
                autocomplete="off"
                value={formData.address}
                onChange={handleInputChange}
              />
              <label for="address">Address</label>
            </div>
            <div
              key={`inline-checkbox`}
              className="mb-3 d-flex justify-content-start align-items-start"
            >
              <Form.Check
                inline
                name="group1"
                type={"checkbox"}
                id={`inline-checkbox-1`}
                className="shadow-none"
                style={{ fontSize: "17px" }}
                checked={subscribe ? true : false}
                onChange={(e) => setSubscribe(e.target.checked)}
              />
              <p style={{ fontSize: "13px" }}>
                Subscribe to <b>ATA2GO</b> important events and promotional
                email, you can unsubscribe anytime!
              </p>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
          {error1 && (
            <div className="d-flex justify-content-center flex-column align-items-center">
              <p className="error-message mb-0">
                <b>Password must be:</b>
              </p>
              <ul className="pass-err-list">
                <li className="pass-error">- At least 8 characters</li>
                <li className="pass-error">- One uppercase</li>
                <li className="pass-error">- One Lowercase</li>
                <li className="pass-error">- One special character</li>
              </ul>
            </div>
          )}
          <div className="mx-auto d-flex justify-content-center mb-3">
            <ReCAPTCHA
              className="recaptcha-field"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
            />
          </div>
          {verifCaptcha ? (
            <div className="input-field">
              <input
                type="submit"
                onClick={handleSubmitData}
                className="submit"
                value="Create Account"
              />
            </div>
          ) : (
            <div className="input-field">
              <button
                // type="submit"
                onClick={() => setError("Please fill the captcha!")}
                className="submit"
                // value=""
                // disabled
              >
                Create Account
              </button>
            </div>
          )}
          <div className="signin">
            <span>
              Already have an account <Link to="/sign-in">Sign in here</Link>
            </span>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default RegisterForm;
