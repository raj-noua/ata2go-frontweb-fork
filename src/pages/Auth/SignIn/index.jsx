import { useContext, useEffect, useState }  from "react";
import { Link, useNavigate }                from "react-router-dom";
import ReCAPTCHA                            from "react-google-recaptcha";
import { toast }                            from "react-toastify";
import { Puff }                             from "react-loader-spinner";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { staggerVariants, tileVariants }    from "../../../utils/FmVariants";
import { SVGImages }                        from "../../../config/images";
import useElementHeight                     from "./../../../hooks/useElementHeight";
import { useReSendEmailVerifyMutation, 
    useSigninMutation, 
    useVerifyTwoFaMethodMutation } from "../../../services/userApi";
import { UserContext }                      from "../../../App";
import { captchaKey }                       from "../../../utils/constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CaptchaContainer,
    ForgotPassLink,
    FormControlField,
    FormLabelText,
    InnerContent,
    PageTitle,
    ShowHidePassField,
    SignInForm,
    SignInPage,
    SignUpText,
    TitleContainer,
} from "./signInStyle";
import                                                    "./signIn.scss";


const SignIn = () => {
    const elementHeight = useElementHeight(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SignInPage id="signin" style={{ paddingTop: `${elementHeight}px` }}>
            <InnerContent variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <TitleContainer>
                                <PageTitle>Welcome to ATA2GO</PageTitle>
                                <p>Please enter your credentials to login.</p>
                            </TitleContainer>
                        </Col>
                    </Row>
                    <SignInFormBox />
                    <Row>
                        <Col md={12}>
                            <SignUpText variants={tileVariants}>
                                <span>{`No account?`}</span>
                                <Link to={"/signup"}>Sign Up Now</Link>
                            </SignUpText>
                        </Col>
                    </Row>
                </Container>
            </InnerContent>
        </SignInPage>
    );
};

const SignInFormBox = () => {
    const [showPass, setShowPass]               = useState(false);
    const [twoFaEmailModal, setTwoFaEmailModal] = useState(false);
    const [loading, setLoading]                 = useState(false);
    const [emailVerify, setEmailVerify]         = useState(false);
    const [verifCaptcha, setverifCaptcha]       = useState(false);
    const [twoFaOptions, setTwoFaOptions]       = useState([]);

    const [error, setError]                     = useState("");
    const [twoFaEmail, setTwoFaEmail]           = useState("");
    const [code, setCode]                       = useState("");
    const [timer, setTimer]                     = useState(60);
    const [signin]                              = useSigninMutation();
    const [verifyTwoFaMethod]                   = useVerifyTwoFaMethodMutation();
    const { setUser }                           = useContext(UserContext);
    const navigate = useNavigate();    
    const [ReSendEmailVerify] = useReSendEmailVerifyMutation();
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });
    const [twoFaMethod, setTwoFaMethod] = useState("Email Two Factor");
    const STG_EmailVerificationCodeExpiry = 61; // seconds
    const STG_CaptchaEnabled = false;

    useEffect(() => {
        if (!STG_CaptchaEnabled) {
            setError("reCaptcha : DISABLED");
        }
    }, [STG_CaptchaEnabled]);

    useEffect(() => {
        let interval;
        if (twoFaEmailModal) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(interval);
                        setTwoFaEmailModal(false); // Automatically close the modal when timer reaches 0
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [twoFaEmailModal]);

    const handleCaptchaChange = value => {
        if (value === null) {
            setverifCaptcha(false);
        } else {
            setverifCaptcha(true);
            // Create a synthetic event object with preventDefault method
            const syntheticEvent = {
                preventDefault: () => {}
            };

            handleTwoFaMethodQuery(syntheticEvent);


        };
        console.log("Captcha value:", value);
        setError("");
    };

    useEffect(() => {
        console.log("verifCaptcha:", verifCaptcha);
    }, [verifCaptcha]);


    const handleEmailInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        console.log(formData);
    };

    const handlePasswordInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        console.log(formData);
    };

    const handleTwoFaMethodQuery = async (event) => {
        event.preventDefault();
        if (!formData.email) {
            return;
        } 
        const data = {
            email: formData.email
        };
        console.log("Verifying Two Fa Method for:", formData.email);
        setLoading(true);




        try {
            const res = await verifyTwoFaMethod(data);
            setLoading(false);
            console.log("VerifyingTwoFaMethod Data:", res);
            if (!res?.data?.status) {
                return;
            }
    
            const options = [];
            if (res.data.twoFaAuthEnabled) {
                options.push({ value: "Authenticator", label: "Authenticator Code" });
            }
            if (res.data.twoFaEmailEnabled) {
                options.push({ value: "Email Two Factor", label: "Email Code" });
            }
            setTwoFaOptions(options);
        } catch (error) {
            setLoading(false);
            console.error("Error verifying two-factor method:", error);
        }




    };

    const handleLoginForm = e => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Please fill out the required information!");
            return;
        } 
        if (STG_CaptchaEnabled && !verifCaptcha) {
            setError("Please complete the captcha!");
            return;
        }

        const data = {
            email: formData.email,
            password: formData.password,
            lastLogin: new Date().toISOString(),
            location: "",
            twoFaMethod: twoFaMethod,
        };
        setLoading(true);
        signin(data).then(res => {
            setLoading(false);
            if (!res?.data?.status) {
                setError(res?.data?.message);
                return;
            }
            
            if (!res?.data?.userData?.emailVerified) {
                setError("Please verify your account", res);
                setEmailVerify(true);
                return;
            };

            setError("");
            setEmailVerify(false);

            if (res?.data?.userData?.twoFa) { //heretwoFA
                setTwoFaEmailModal(true);
                setTwoFaEmail(res?.data?.userData?.twoFaEmail);
                setTimer(STG_EmailVerificationCodeExpiry);
            } else {
                const targetPage = (res.data.userData.role === "user") ? "/" : "/dashboard";
                navigate(targetPage);
                setUser(res.data.userData);
                localStorage.setItem("token", res.data.token);
            }

        });
    };

    const handleVerifyEmail = () => {
        if (!formData?.email) {
            setError("Please Enter Your Email!");
            return;
        }
        ReSendEmailVerify({ email: formData?.email }).then(res => {
            if (res?.data?.status) {
                navigate(`/verify-email/${formData?.email}`);
                setError("");
            } else {
                setError(res?.data?.message);
            }
        });
    };

    const handleValidateCode = () => {
        if (!code) {
            toast.error("Please Insert the code!");
            return;
        };
        const data = {
            email: formData.email,
            password: formData.password,
            lastLogin: new Date().toISOString(),
            location: "",
            twoFaCode: code,
        };
        signin(data).then(res => {
            if (res?.data?.status) {
                setError("");
                navigate(res.data.userData.role === "user" ? "/" : "/dashboard");
                setUser(res.data.userData);
                localStorage.setItem("token", res.data.token);
                return;
            };
            if (res?.data?.message === "Verification Code Expired.") {
                setCode("");
                setTwoFaEmailModal(false);
                toast.error("The code is expired! Please try again.");
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    return (
        <SignInForm onSubmit={handleLoginForm}>
            <Row>           
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>Email*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            type="email"
                            placeholder="Enter Email Address"
                            required
                            value={formData?.email}
                            onChange={handleEmailInputChange}
                            name="email"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {formData.email && (
                <Row>
                    <Col md={12}>
                        <Form.Group  className="mb-3" controlId="exampleForm.ControlInput3">
                            <FormLabelText className="mb-3" >Password*</FormLabelText>
                            <ShowHidePassField >
                                <FormControlField
                                    className="mb-3"
                                    type={showPass ? "text" : "password"}
                                    placeholder=""
                                    required
                                    aria-describedby="basic-addon2"
                                    value={formData?.password}
                                    onChange={handlePasswordInputChange}
                                    name="password"
                                />
                                <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <SVGImages.EyeOnIcon /> : <SVGImages.EyeOffIcon />}
                                </Button>
                            </ShowHidePassField>
                            
                        </Form.Group>
                    </Col>
                </Row>
            )}


            {formData.email && (
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3 pt-3 text-end" controlId="exampleForm.ControlInput4">
                            <ForgotPassLink to={"/forget-password"}>
                                Forgot password ?
                            </ForgotPassLink>
                        </Form.Group>
                    </Col>
                </Row>
            )}

            

            {error && <p className="error-message">{error}</p>}
            {formData.password && formData.email && STG_CaptchaEnabled && (
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3 pt-3 text-end" controlId="exampleForm.ControlInput5">
                            <CaptchaContainer className="mx-auto mb-3">
                                <ReCAPTCHA
                                    className="recaptcha-field"
                                    sitekey={captchaKey}
                                    onChange={STG_CaptchaEnabled ? handleCaptchaChange : undefined}
                                />
                            </CaptchaContainer>
                        </Form.Group>
                    </Col>
                </Row>
            )}


            
            {formData.password && formData.email && (!STG_CaptchaEnabled || (STG_CaptchaEnabled && verifCaptcha)) && twoFaOptions.length > 0 && (

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="twoFaMethod">
                                <FormLabelText>Select Two Factor Authentication Method</FormLabelText>
                                <Form.Control
                                    as="select"
                                    value={twoFaMethod}
                                    onChange={(e) => setTwoFaMethod(e.target.value)}
                                >
                                    {twoFaOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

            )}
            
            <Row>
                <Col md={12}>
                    {verifCaptcha ? (
                        <>
                            {emailVerify ? (
                                <button className="signInBtn" onClick={handleVerifyEmail}>
                                    <span>Verify Account</span>
                                </button>
                            ) : (
                                <>
                                    {loading ? (
                                        <button className="signInBtn" disabled>
                                            <span className="d-block mx-auto">
                                                <Puff
                                                    height="30"
                                                    width="30"
                                                    radius={2}
                                                    color="#5FBA46"
                                                    ariaLabel="puff-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                />
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="signInBtn" onClick={handleLoginForm} disabled={STG_CaptchaEnabled && !verifCaptcha}>
                                            <span>Sign in</span>
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <button
                            className="signInBtn"
                            onClick={() => {
                                if (STG_CaptchaEnabled) {
                                    setError("Please fill the captcha!");
                                }
                            }}
                            disabled={STG_CaptchaEnabled && !verifCaptcha}
                        >
                            <span>Sign in</span>
                        </button>
                    )}
                </Col>
            </Row>
            {/* <Row>
                <Col md={12}>
                    <FormButton variants={tileVariants} variant="primary" type="submit">
                        <span>Sign in</span>
                    </FormButton>
                </Col>
            </Row> */}


            <Modal show={twoFaEmailModal} onHide={() => setTwoFaEmailModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Email Two Factor Authentication</Modal.Header>
                <Modal.Body>
                    <div className="input-wrapper-modal">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <small>
                                    Enter the Verification Code sent to email:{" "}
                                    <strong>
                                        {twoFaEmail?.slice(0, 1)}********{twoFaEmail?.slice(twoFaEmail?.length - 13, twoFaEmail.length)}
                                    </strong>
                                </small>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Six digit Code"
                                className="shadow-none"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="timer">
                        <small>Time remaining: {timer} seconds</small>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button variant="secondary" className="d-block me-3 w-50" onClick={() => setTwoFaEmailModal(false)}>
                            Close
                        </Button>

                        <Button onClick={handleValidateCode} className="d-block btn btn-success ms-3 w-50">
                            Verify
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </SignInForm>
    );
};

export default SignIn;
