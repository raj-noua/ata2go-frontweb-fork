import React, { useState } from "react";
import {
    // ResetPassword,
    // FormButton,
    // FormControlField,
    // FormLabelText,
    InnerContent,
    PageTitle,
    ResetPasswordPage,
    // ResetPasswordForm,
    TitleContainer,
    // CancelButtonPage,
    CancelButton,
    FormControlField,
    FormLabelText,
    ResetPasswordForm
} from "../ForgotPassword/forgotPasswordStyle";
import { Images, SVGImages }                                    from "../../../config/images";
import { staggerVariants, tileVariants, titleVariants }         from "../../../utils/FmVariants";
import { Col, Container, Form, Image, Row }                     from "react-bootstrap";
import { useNavigate, useParams }                               from "react-router-dom";
import { useReSendEmailVerifyMutation, useVerifyEmailMutation } from "../../../services/userApi";

const VerifyEmail = () => {
    const [code, setCode]           = useState("");
    const [error, setError]         = useState("");
    const [resetBtn, setResetBtn]   = useState(false);
    const [show, setShow]           = useState(false);
    const { email }                 = useParams();
    const navigate                  = useNavigate();
    const [verifyEmail]             = useVerifyEmailMutation();
    const [ReSendEmailVerify]       = useReSendEmailVerifyMutation();
    

    const handleVerifyCode = () => {
        if (!code) {
            setError("Please Enter verification code!");
        } else {
            console.log("code", code);
            verifyEmail({ email: email, code: code }).then(res => {
                console.log('Verified email', res);
                if (res?.data?.status) {
                    setShow(true);
                    setError("");
                    setResetBtn(false);
                } else {
                    if (res?.data?.message === "Expired!") {
                        setResetBtn(true);
                        setError("Verification code has been Expired!");
                        setCode("");
                    } else {
                        setError(res?.data?.message);
                    }
                }
            });
        }
    };

    const handleResetCode = () => {
        ReSendEmailVerify({ email: email }).then(res => {
            if (res?.data?.status) {
                setShow(false);
                setResetBtn(false);
            } else {
                setError(res?.data?.message);
            }
        });
    };


    console.log(error, navigate, handleResetCode, show);
    return (
        <ResetPasswordPage id="forgotPassword">
            <InnerContent variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
                <Container>


                    {show ? (
                        <>
                            <Row>
                                <Col md={12} className="text-center mb-3">
                                    <Image src={Images.ata2goLogo} width={130} />
                                </Col>
                                <Col md={12}>
                                    <TitleContainer>
                                        <PageTitle>Your Account was verified!</PageTitle>
                                        <button className="signInBtn" onClick={() => navigate("/signin")}>
                                            <span>Go to Sign In</span>
                                        </button>
                                    </TitleContainer>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row>
                                <Col md={12} className="text-center mb-3">
                                    <Image src={Images.ata2goLogo} width={130} />
                                </Col>
                                <Col md={12}>
                                    <TitleContainer>
                                        <PageTitle>Verify Account</PageTitle>
                                        <p>A verification code was sent to:</p>
                                        <p>{email}</p>
                                    </TitleContainer>
                                </Col>
                            </Row>
                            {/* form */}
                            <ResetPasswordForm>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <FormLabelText variants={tileVariants}>Verification Code*</FormLabelText>
                                            <FormControlField
                                                variants={tileVariants}
                                                type="text"
                                                id="code"
                                                placeholder="Enter The verification code"
                                                value={code}
                                                onChange={e => setCode(e.target.value)}
                                                disabled={resetBtn ? true : false}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    {error && <p className="error-message">{error}</p>}

                                    {resetBtn ? (
                                        <Col md={12} className="text-end">
                                            <button type="button" className="signInBtn" onClick={handleResetCode}>
                                                <span>Resend Code</span>
                                            </button>
                                        </Col>
                                    ) : (
                                        <Col md={12} className="text-end">
                                            <button type="button" className="signInBtn" onClick={handleVerifyCode}>
                                                <span>Verify</span>
                                            </button>
                                        </Col>
                                    )}

                                </Row>
                            </ResetPasswordForm>
                            <CancelButton to={"/signin"} variants={titleVariants}>
                                <SVGImages.ReturnIcon />
                                <span>Cancel</span>
                            </CancelButton>
                        </>
                    )}
                </Container>
            </InnerContent>
        </ResetPasswordPage>
    );
};

export default VerifyEmail;
