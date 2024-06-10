import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
    useReSendEmailVerifyMutation,
    //useSendCodeMutation,
    useSigninMutation,
} from "../../services/userApi";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
import logo from "../../assets/images/img/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Form, Modal } from "react-bootstrap";

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const [twoFaModal, setTwoFaModal] = useState(false);
    const [signin] = useSigninMutation();
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [verifCaptcha, setVerifCaptcha] = useState(false);
    //const [sendCode] = useSendCodeMutation();
    const [code, setCode] = useState("");
    const [ReSendEmailVerify] = useReSendEmailVerifyMutation();
    //const [reverify, setReVerify] = useState(false)
    const [twoFaEmail, setTwoFaEmail] = useState("");
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    // const [loading, setLoading] = useState(true);

    // const getLocation = () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         setLatitude(position.coords.latitude);
    //         setLongitude(position.coords.longitude);
    //         setLoading(false);
    //       },
    //       (error) => {
    //         console.error("Error getting user location:", error);
    //         setLoading(false);
    //       }
    //     );
    //   } else {
    //     console.error("Geolocation is not supported by this browser.");
    //     setLoading(false);
    //   }
    // };

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerifCaptcha(true);
        setError("");
    }

    const handleLoginForm = () => {
        if (formData.email && formData.password) {
            const data = {
                email: formData.email,
                password: formData.password,
                lastLogin: new Date().toISOString(),
                location: "",
            };
            signin(data).then(res => {
                if (res?.data?.status) {
                    if (res?.data?.result?.emailVerified) {
                        if (res.data.result.role === "user") {
                            setError("");

                            setEmailVerify(false);
                            if (res?.data?.result?.twoFaEmailEnabled) {
                                setTwoFaModal(true);
                                setTwoFaEmail(res?.data?.result?.twoFaEmail);
                            } else {
                                navigate("/");
                                setUser(res.data.result);
                                localStorage.setItem("token", res.data.token);
                            }
                        } else {
                            setError("");
                            setEmailVerify(false);
                            if (res?.data?.result?.twoFaEmailEnabled) {
                                setTwoFaModal(true);
                                setTwoFaEmail(res?.data?.result?.twoFaEmail);
                            } else {
                                navigate("/dashboard");
                                setUser(res.data.result);
                                localStorage.setItem("token", res.data.token);
                            }
                        }
                    } else {
                        setError("Please verify your Nice account");
                        setEmailVerify(true);
                    }
                } else {
                    setError(res?.data?.message);
                }
            });
        } else {
            setError("Please fill out the required information!");
        }
    };

    const handleVerify = () => {
        if (formData?.email) {
            ReSendEmailVerify({ email: formData?.email }).then(res => {
                if (res?.data?.status) {
                    navigate(`/verify-email/${formData?.email}`);
                    setError("");
                } else {
                    setError(res?.data?.message);
                }
            });
        } else {
            setError("Please Enter Your Email!");
        }
    };

    const handleCheck = () => {
        if (code) {
            const data = {
                email: formData.email,
                password: formData.password,
                lastLogin: new Date().toISOString(),
                location: "",
                twoFaCode: code,
            };
            signin(data).then(res => {
                if (res?.data?.status) {
                    if (res.data.result.role === "user") {
                        setError("");
                        navigate("/");
                        setUser(res.data.result);
                        localStorage.setItem("token", res.data.token);
                    } else {
                        setError("");
                        navigate("/dashboard");
                        setUser(res.data.result);
                        localStorage.setItem("token", res.data.token);
                    }
                } else {
                    if (res?.data?.message === "Expired!") {
                        setCode("");
                        setTwoFaModal(false);
                        toast.error("The code is expired! Please try again.");
                    } else {
                        toast.error(res?.data?.message);
                    }
                }
            });
        } else {
            toast.error("Please Insert the code!");
        }
    };

    return (
        <div className=" mt-2">
            <div className="input-box">
                <img src={logo} className="logo-style" alt="logo" />
                <h2>Sign In </h2>

                <form onSubmit={handleLoginForm}>
                    <div className="input-field">
                        <input
                            type="text"
                            className="input"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <label for="email">
                            Email <span style={{ color: "red" }}>*</span>
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
                            Password <span style={{ color: "red" }}>*</span>
                        </label>

                        <div className="password-toggle">
                            {formData.password.length > 0 && (
                                <span className="password-show-icon">
                                    {show ? <BsEyeSlash onClick={() => setShow(!show)} /> : <BsEye onClick={() => setShow(!show)} />}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="forgot text-end mb-4">
                        <Link to={"/get-email"}>Forgot password ?</Link>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="mx-auto d-flex justify-content-center mb-3">
                    <ReCAPTCHA className="recaptcha-field" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChange} />
                </div>
                {verifCaptcha ? (
                    <>
                        {emailVerify ? (
                            <div className="input-field">
                                <button onClick={handleVerify} className="btn btn-success">
                                    Verify Account
                                </button>
                            </div>
                        ) : (
                            <div className="input-field">
                                <input type="submit" onClick={handleLoginForm} className="submit" value="Sign In" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="input-field">
                        <button
                            // type="submit"
                            onClick={() => setError("Please fill the captcha!")}
                            className="submit"
                            // value=""
                            // disabled
                        >
                            Sign In
                        </button>
                    </div>
                )}
                <div className="signin">
                    <span>
                        New to ATA2GO? <Link to="/sign-up">Create an account</Link>
                    </span>
                </div>
            </div>

            <Modal show={twoFaModal} onHide={() => setTwoFaModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Two Factor Authentication</Modal.Header>
                <Modal.Body>
                    <div className="input-wrapper-modal">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <small>
                                    Check this{" "}
                                    <strong>
                                        {twoFaEmail?.slice(0, 1)}********{twoFaEmail?.slice(twoFaEmail?.length - 13, twoFaEmail.length)}
                                    </strong>{" "}
                                    inbox for Verification Code
                                </small>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Verification Code"
                                className="shadow-none"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button variant="secondary" className="d-block me-3 w-50" onClick={() => setTwoFaModal(false)}>
                            Close
                        </Button>

                        <Button onClick={handleCheck} variant="success" className="d-block ms-3 w-50">
                            Verify
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginForm;
