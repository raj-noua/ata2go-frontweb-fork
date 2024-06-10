import { Button, Col, Container, Form, Image, Row }     from "react-bootstrap";
import { useNavigate, useParams }                       from "react-router-dom";
import { useEffect, useState }                          from "react";
import { ShowHidePassField }                            from "../SignIn/signInStyle";
import { staggerVariants, tileVariants, titleVariants } from "../../../utils/FmVariants";
import { Images, SVGImages }                            from "../../../config/images";
import { useUpdatePassUserMutation }                    from "../../../services/userApi";
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
}                                                       from "./forgotPasswordStyle";

const NewPassword = () => {
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
                                <PageTitle>Enter New Password</PageTitle>
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
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [error, setError] = useState("");
    const [updatePassUser] = useUpdatePassUserMutation();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleUpdatePassword = event => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (passwordRegex.test(password)) {
            if (password === conPassword) {
                updatePassUser({ id: id, data: { password: password, task: "forget" } }).then(res => {
                    if (res?.data?.status) {
                        setError(res?.data?.message);
                        setPassword("");
                        navigate("/signin");
                    } else {
                        setError(res?.data?.message);
                    }
                });
            } else {
                setError("Passwords didn't match!");
            }
        } else {
            setError("Password must contain 8 characters and one uppercase and one lowercase  character and one number!");
        }
    };

    return (
        <ResetPasswordForm onSubmit={handleUpdatePassword}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <FormLabelText variants={tileVariants}>Password*</FormLabelText>
                        <ShowHidePassField variants={tileVariants}>
                            <FormControlField
                                type={showPass ? "text" : "password"}
                                placeholder="********"
                                required
                                aria-describedby="basic-addon2"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <SVGImages.EyeOnIcon /> : <SVGImages.EyeOffIcon />}
                            </Button>
                        </ShowHidePassField>
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <FormLabelText variants={tileVariants}>Re-enter Password*</FormLabelText>
                        <ShowHidePassField variants={tileVariants}>
                            <FormControlField
                                type={showConfPass ? "text" : "password"}
                                placeholder="********"
                                required
                                aria-describedby="basic-addon2"
                                value={conPassword}
                                onChange={e => setConPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowConfPass(!showConfPass)}>
                                {showConfPass ? <SVGImages.EyeOnIcon /> : <SVGImages.EyeOffIcon />}
                            </Button>
                        </ShowHidePassField>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {error && <p className="error-message">{error}</p>}

                <Col md={12}>
                    <FormButton variants={tileVariants} variant="secondary" type="submit">
                        <span>Update</span>
                    </FormButton>
                </Col>
            </Row>
        </ResetPasswordForm>
    );
};

export default NewPassword;
