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

import { useNavigate } from "react-router-dom";
import { Images, SVGImages } from "../../../config/images";
import { useEffect, useState } from "react";
import { useSendCodeMutation } from "../../../services/userApi";

const ForgotPassword = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ResetPasswordPage id="forgotPassword">
            <InnerContent variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
                <Container>
                    <Row>
                        <Col md={12} className="text-center mb-3">
                            <Image src={Images.ata2goLogo} width={130} />
                        </Col>
                        <Col md={12}>
                            <TitleContainer>
                                <PageTitle>Password Reset</PageTitle>
                                <p>Please enter your email address to get a reset code.</p>
                            </TitleContainer>
                        </Col>
                    </Row>
                    <ResetPasswordFormBox />
                    <CancelButton to={"/signin"} variants={titleVariants}>
                        <SVGImages.ReturnIcon />
                        <span>Cancel</span>
                    </CancelButton>
                </Container>
            </InnerContent>
        </ResetPasswordPage>
    );
};

const ResetPasswordFormBox = () => {
    const [email, setEmail] = useState("");
    const [sendCode] = useSendCodeMutation();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSendCode = e => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            sendCode({ email: email }).then(res => {
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
        <ResetPasswordForm onSubmit={handleSendCode}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <FormLabelText variants={tileVariants}>Email*</FormLabelText>
                        <FormControlField
                            variants={tileVariants}
                            defaultValue="Johnsmithdummy@gmail.com"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {error && <p className="error-message">{error}</p>}
                <Col md={12} className="text-end">
                    <FormButton variants={tileVariants} variant="primary" type="submit">
                        <span>Send me a code</span>
                    </FormButton>
                </Col>
            </Row>
        </ResetPasswordForm>
    );
};

export default ForgotPassword;
