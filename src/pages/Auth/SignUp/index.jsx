import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
    FormButton,
    FormControlField,
    FormLabelText,
    InnerContent,
    PageTitle,
    ShowHidePassField,
    SignInForm,
    SignInPage,
    SignUpText,
    TitleContainer,
    FormCheckField
} from "./signUpStyle";
import { Puff } from "react-loader-spinner";

import { useEffect, useState } from "react";
import { staggerVariants, tileVariants } from "../../../utils/FmVariants";
import { SVGImages } from "../../../config/images";
import { Link, useNavigate } from "react-router-dom";
import useElementHeight from "../../../hooks/useElementHeight";
import { useSignupMutation } from "../../../services/userApi";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaKey } from "../../../utils/constants";

const SignUp = () => {
    const elementHeight = useElementHeight(30);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SignInPage id="signup" style={{ paddingTop: `${elementHeight}px` }}>
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
                    <SignUPFormBox />
                    <Row>
                        <Col md={12}>
                            <SignUpText variants={tileVariants}>
                                <span>{`Already have an account?`}</span>
                                <Link to={"/signin"}>Sign In Now</Link>
                            </SignUpText>
                        </Col>
                    </Row>
                </Container>
            </InnerContent>
        </SignInPage>
    );
};

const SignUPFormBox = () => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const [signup] = useSignupMutation();
    const [error, setError] = useState("");
    const [verifCaptcha, setverifCaptcha] = useState(false);
    const [phone, setPhone] = useState("");
    const [subscribe, setSubscribe] = useState(false);
    const [error1, setError1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        address: "",
        email: "",
        password: ""
    });

    const handleInputChange = event => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (event.target.name === "password" && !passwordRegex.test(event.target.value)) {
            setError1(true);
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        } else {
            setError1(false);
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    };

    const handlePhoneNumberChange = event => {
        const inputValue = event.target.value;
        // eslint-disable-next-line no-useless-escape
        const phoneNumberRegex = /[^+\d\s()\-]/g; // Match any character that is not a digit, plus sign, space, open/close bracket, or hyphen

        const sanitizedValue = inputValue.replace(phoneNumberRegex, "");

        console.log(sanitizedValue);
        if (sanitizedValue.length > 0) {
            setPhone(sanitizedValue);
            console.log(sanitizedValue);
        } else {
            setPhone("");
        }
    };

    const onChange = () => {
        setverifCaptcha(true);
        setError("");
    };
    const handleSubmitData = () => {
        if (formData.email && formData.firstName && formData.password && formData.lastName) {
            const data = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: "user",
                password: formData.password,
                phoneNo: formData.phoneNo,
                address: formData.address,
                subscribe: subscribe
            };
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (data) {
                if (passwordRegex.test(formData.password)) {
                    setLoading(true);
                    signup(data).then(res => {
                        setLoading(false);
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
        <SignInForm variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <Row>
                <Col sm={12} md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>First Name*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            required
                            autocomplete="off"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>Last Name*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            required
                            autocomplete="off"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>Email*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required
                            autocomplete="off"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <FormLabelText variants={tileVariants}>Password*</FormLabelText>
                        <ShowHidePassField variants={tileVariants}>
                            <FormControlField
                                type={showPass ? "text" : "password"}
                                placeholder="********"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <SVGImages.EyeOnIcon /> : <SVGImages.EyeOffIcon />}
                            </Button>
                        </ShowHidePassField>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>Mobile Number*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            type="text"
                            placeholder="Enter mobile no"
                            name="phoneNo"
                            required
                            autocomplete="off"
                            value={phone}
                            onChange={handlePhoneNumberChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <FormCheckField variants={tileVariants} className="mb-3">
                        <FormLabelText variants={tileVariants}>&nbsp;</FormLabelText>
                        <Form.Check // prettier-ignore
                            variants={tileVariants}
                            type="checkbox"
                            id={`default-checkbox`}
                            label={`Subscribe to ATA2GO important events and promotional email, you can unsubscribe anytime!`}
                            checked={subscribe ? true : false}
                            onChange={e => setSubscribe(e.target.checked)}
                        />
                    </FormCheckField>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="d-flex flex-column align-items-center">
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
                        <ReCAPTCHA className="recaptcha-field" sitekey={captchaKey} onChange={onChange} />
                    </div>

                    {verifCaptcha ? (
                        <>
                            {loading && (
                                <FormButton variants={tileVariants} variant="primary">
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
                                </FormButton>
                            )}

                            {!loading && (
                                <FormButton variants={tileVariants} variant="primary" className="mt-3 " onClick={handleSubmitData}>
                                    <span>Sign in</span>
                                </FormButton>
                            )}
                        </>
                    ) : (
                        <FormButton
                            variants={tileVariants}
                            variant="primary"
                            className="mt-3"
                            onClick={() => setError("Please fill the captcha!")}
                        >
                            <span>Sign Up</span>
                        </FormButton>
                    )}
                </Col>
            </Row>
        </SignInForm>
    );
};

export default SignUp;
