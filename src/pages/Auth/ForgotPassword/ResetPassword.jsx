import { Col, Container, Form, Image, Row } from "react-bootstrap";
import {
    FormButton,
    FormControlField,
    FormLabelText,
    InnerContent,
    PageTitle,
    ResetPasswordPage,
    ResetPasswordForm,
    TitleContainer,
    CancelButton
} from "./forgotPasswordStyle";
import { staggerVariants, tileVariants, titleVariants } from "../../../utils/FmVariants";

import { useNavigate, useParams } from "react-router-dom";
import { Images, SVGImages } from "../../../config/images";
import { useEffect, useState } from "react";
import { useReSendPassVerifyMutation, useVerifyCodeMutation } from "../../../services/userApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <ResetPasswordPage id="resetPassword">
            <InnerContent variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
                <Container>
                    <Row>
                        <Col md={12} className="text-center mb-3">
                            <Image src={Images.ata2goLogo} width={130} />
                        </Col>
                        <Col md={12}>
                            <TitleContainer>
                                <PageTitle>Password Reset</PageTitle>
                                <p>A verification code was sent to your email</p>
                            </TitleContainer>
                        </Col>
                    </Row>
                    <ResetPasswordFormBox />
                    <CancelButton to={"/forget-password"} variants={titleVariants}>
                        <SVGImages.ReturnIcon />
                        <span>Cancel</span>
                    </CancelButton>
                </Container>
            </InnerContent>
        </ResetPasswordPage>
    );
};

const ResetPasswordFormBox = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { email } = useParams();
    const [verifyCode] = useVerifyCodeMutation();
    const [ReSendPassVerify] = useReSendPassVerifyMutation();
    const [resetBtn, setResetBtn] = useState(false);
    const handleVerifyCode = e => {
        e.preventDefault();
        if (code) {
            verifyCode({ email: email, code: code }).then(res => {
                if (res?.data?.status) {
                    navigate(`/update-pass/${res.data.result}`);
                    setError("");
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
        } else {
            setError("Please Enter verification code!");
        }
    };
    const handleResendPass = () => {
        ReSendPassVerify({ email: email }).then(res => {
            if (res?.data?.status) {
                setResetBtn(false);
                setError("");
                toast.success(res?.data?.message);
            } else {
                setError(res?.data?.message);
            }
        });
    };
    return (
        <ResetPasswordForm onSubmit={handleVerifyCode}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>Verification code*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            type="text"
                            placeholder="Enter the verification code!"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {error && <p className="error-message">{error}</p>}

                {resetBtn ? (
                    <>
                        <Col md={12}>
                            <FormButton variants={tileVariants} variant="secondary" onClick={handleResendPass}>
                                <span>Resend Code</span>
                            </FormButton>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col md={12}>
                            <FormButton variants={tileVariants} variant="secondary" type="submit">
                                <span>Verify</span>
                            </FormButton>
                        </Col>
                    </>
                )}
            </Row>
        </ResetPasswordForm>
    );
};

export default ResetPassword;
