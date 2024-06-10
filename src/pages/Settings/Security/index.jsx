import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FormButton, FormControlField, FormLabelText, FormSelectField, SecurityFormContainer, ShowHidePassField } from "./securityStyle";
import { TabContentContainer, TabSubTitle, TableContainer, TextContent } from "../../Tabs/tabContentStyle";
import TableComponent from "../../../components/UI/TableComponent";
import { staggerVariants, titleVariants } from "../../../utils/FmVariants";
import { SVGImages } from "../../../config/images";
import { baseUrl }                                   from "../../../services/api";
import {
    useGetLastLoginQuery,
    useSendTwoFactorMutation,
    useUpdateUserMutation,
    useVerifyTwoFaCodeMutation,
} from "../../../services/userApi";
import moment from "moment";
import axios from "axios";

const SetSecurity = ({ user, refetch, setRefetch }) => {
    const { data: dataLogins } = useGetLastLoginQuery(user?._id);

    return (
        <TabContentContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <SecurityForm user={user} />
            <TabSubTitle className="mb-2">Two Factor Authentication (2FA)</TabSubTitle>
            <TextContent className="full">
                <motion.p variants={titleVariants} className="text-start">
                    Two Factor Authentication (2FA) provides an additional layer of security beyond passwords and is strongly recommended.
                    Your account is protected by requiring both your password and an Authentication code.
                </motion.p>
            </TextContent>
            <Auth2FAForm user={user} refetch={refetch} setRefetch={setRefetch} />
            <TableContainer>
                <TabSubTitle>Last 10 Sign In Connections</TabSubTitle>
                <TableComponent variants={titleVariants} isDataTable={+false}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>IP Address</th>
                            <th>Device</th>
                            <th>Model</th>
                            <th>Browser</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataLogins?.data?.map(l => (
                            <tr key={l?._id}>
                                <td>{moment(l.lastLoginTime).format("YYYY-MM-DD")}</td>
                                <td>{moment(l.lastLoginTime).format("HH:mm:ss")}</td>
                                <td>{l?.ip}</td>
                                <td>{l?.device}</td>
                                <td>{l?.model}</td>
                                <td>{l?.browser?.name}</td>
                                <td>{l?.location ? l?.location : "Not Available"}</td>
                            </tr>
                        ))}
                    </tbody>
                </TableComponent>
            </TableContainer>
        </TabContentContainer>
    );
};

const SecurityForm = ({ user }) => {
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [password, setPassword] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [updateUser] = useUpdateUserMutation();
    const [error, setError] = useState(false);
    const handleChangePassword = () => {
        const data = {
            password,
            oldPass,
        };
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (data?.password && data?.oldPass) {
            if (passwordRegex.test(data.password)) {
                updateUser({ id: user?._id, data: data }).then(res => {
                    if (res?.data?.status) {
                        toast.success(res?.data?.message);
                        setPassword("");
                        setError(false);
                        setOldPass("");
                    } else {
                        toast.error(res?.data?.message);
                        setError(false);
                    }
                });
            } else {
                setError(true);
            }
        } else {
            toast.error("Please fill up all fields!");
        }
    };
    return (
        <SecurityFormContainer variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
            <Row>
                <Col md={6} lg={6} xl={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <FormLabelText variants={titleVariants}>Current Password*</FormLabelText>
                        <ShowHidePassField variants={titleVariants}>
                            <FormControlField
                                type={showPass ? "text" : "password"}
                                placeholder="***"
                                required
                                aria-describedby="basic-addon2"
                                value={oldPass}
                                onChange={e => setOldPass(e.target.value)}
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowPass(!showPass)}>
                                {" "}
                                {showPass ? <SVGImages.EyeOnIcon /> : <SVGImages.EyeOffIcon />}{" "}
                            </Button>
                        </ShowHidePassField>
                    </Form.Group>
                </Col>

                <Col md={6} lg={6} xl={4}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <FormLabelText variants={titleVariants}>New Password*</FormLabelText>
                        <ShowHidePassField variants={titleVariants}>
                            <FormControlField
                                type={showConfPass ? "text" : "password"}
                                placeholder="***"
                                required
                                aria-describedby="basic-addon2"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={() => setShowConfPass(!showConfPass)}>
                                {" "}
                                {showConfPass ? <SVGImages.EyeOnIcon /> : <SVGImages.EyeOffIcon />}{" "}
                            </Button>
                        </ShowHidePassField>
                    </Form.Group>
                </Col>

                <Col md={6} lg={6} xl={4} className="text-start">
                    <Form.Group className="mb-3">
                        <FormLabelText variants={titleVariants} className="d-block">
                            {" "}
                            &nbsp;{" "}
                        </FormLabelText>
                        <FormButton onClick={handleChangePassword} variants={titleVariants} variant="primary">
                            {" "}
                            <span>Update Password</span>{" "}
                        </FormButton>
                    </Form.Group>
                </Col>
                {error && (
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <p className="error-message mb-0">
                            {" "}
                            <b>Password must be:</b>{" "}
                        </p>
                        <ul className="pass-err-list">
                            <li className="pass-error">- At least 8 characters</li>
                            <li className="pass-error">- One uppercase</li>
                            <li className="pass-error">- One Lowercase</li>
                            <li className="pass-error">- One special character</li>
                        </ul>
                    </div>
                )}
            </Row>
        </SecurityFormContainer>
    );
};

const Auth2FAForm = ({ user, email, refetch, setRefetch }) => {
    const [code, setCode] = useState("");
    const [twoFaEmail, setTwoFaEmail] = useState(user.email);
    const [twoFaCode, setTwoFaCode] = useState(false);
    const [sendTwoFactor] = useSendTwoFactorMutation();
    const [verifyTwoFaCode] = useVerifyTwoFaCodeMutation();
    const [reverify, setReVerify] = useState(false);
    const [updateUser] = useUpdateUserMutation();
    const [show, setShow] = useState(false);

    const handleSendTwoFaCode = async () => {
        if (!twoFaEmail) {
            toast.error("Please fill up Two Factor Email!");
            return;
        }
        try {
            const res = await sendTwoFactor({ userId: user?._id, email: twoFaEmail, userEmail: user?.email });
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setTwoFaCode(true);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            toast.error("An error occurred while sending the Two-Factor code.");
        }
    };

    const handleVerifyTwoFaCode = async () => {
        if (!code) {
            toast.error("Please Enter verification code!");
            return;
        }
        try {
            const res = await verifyTwoFaCode({ email: user?.email, code });
            setRefetch(refetch + 1);
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setShow(false);
                setReVerify(false);
                setCode("");
            } else {
                toast.error(res?.data?.message);
                if (res?.data?.message === "Verification code has Expired!") {
                    setCode("");
                    setReVerify(true);
                }
            }
        } catch (error) {
            toast.error("An error occurred while verifying the code.");
        }
    };

    const handleTurnOff = async () => {
        try {
            const res = await updateUser({ id: user?._id, data: { twoFaEmail: "", twoFaEmailEnabled: false } });
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setRefetch(refetch + 1);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            toast.error("Failed to update user settings. Please try again.");
        }
    };

    const [qrCode, setQrCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTurnOn2FA = async () => {
        setLoading(true);
        if (!twoFaEmail) {
            toast.error("Email not loaded. Please try again.");
            setLoading(false);
            return;
        }

        try {
            toast.error("Querying: " + baseUrl+ "/twoFa/generate-2fa-qr");
            const response = await axios.get(baseUrl + "/twoFa/generate-2fa-qr", {
                headers: {
                    "X-User-Email": twoFaEmail,
                },
            });
            setQrCode(response.data.qrCode);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch QR Code:", error);
            setLoading(false);
            toast.error(baseUrl, " - Failed to fetch QR Code. Please try again.", error);
        }
    };

    return (
        <>
            <SecurityFormContainer
                variants={staggerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}>
                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <FormLabelText variants={titleVariants}>2FA Email Configuration</FormLabelText>
                        {user?.twoFaEmailEnabled ? (
                            <FormSelectField aria-label="Please select" variants={titleVariants} disabled>
                                {" "}
                                <option value="2">2FA Email - Enabled</option>{" "}
                            </FormSelectField>
                        ) : (
                            <FormSelectField aria-label="Please select" variants={titleVariants} disabled>
                                {" "}
                                <option value="1">2FA Email - Disabled</option>{" "}
                            </FormSelectField>
                        )}
                    </Col>
                    {user?.twoFaEmailEnabled ? (
                        <>
                            <Col md={6} lg={6} xl={4}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <FormLabelText variants={titleVariants}>2FA Email</FormLabelText>
                                    <FormControlField
                                        variants={titleVariants}
                                        type="email"
                                        placeholder="Enter email"
                                        value={user?.twoFaEmail}
                                        disabled
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} lg={6} xl={4} className="text-start">
                                <Form.Group className="mb-3">
                                    <FormLabelText variants={titleVariants} className="d-block">
                                        {" "}
                                        &nbsp;{" "}
                                    </FormLabelText>
                                    <FormButton onClick={handleTurnOff} variants={titleVariants} variant="primary">
                                        {" "}
                                        <span> Turn Off</span>{" "}
                                    </FormButton>
                                </Form.Group>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={6} lg={6} xl={4} className="text-start"></Col>
                            <Col md={6} lg={6} xl={4} className="text-start">
                                <Form.Group className="mb-3">
                                    <FormLabelText variants={titleVariants} className="d-block">
                                        {" "}
                                        &nbsp;{" "}
                                    </FormLabelText>
                                    <FormButton onClick={() => setShow(true)} variants={titleVariants} variant="primary">
                                        {" "}
                                        <span> Turn On</span>{" "}
                                    </FormButton>
                                </Form.Group>
                            </Col>
                        </>
                    )}
                </Row>
                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-3">
                            <FormLabelText variants={titleVariants}>Authenticator App (Google, Microsoft, Authy, etc..) </FormLabelText>
                            <FormSelectField aria-label="Please select" variants={titleVariants}>
                                <option value="1">Authenticator - Disabled</option>
                                <option value="2">Authenticator - Enabled</option>
                            </FormSelectField>
                        </Form.Group>
                    </Col>

                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>QR Code</FormLabelText>
                            {qrCode && (
                                <div>
                                    <img src={qrCode} alt="2FA QR Code" />
                                    <p>Scan this QR code with your authenticator app.</p>
                                </div>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={6} lg={6} xl={4} className="text-start">
                        <Form.Group className="mb-3">
                            <FormLabelText variants={titleVariants} className="d-block">
                                {" "}
                                &nbsp;{" "}
                            </FormLabelText>
                            <FormButton onClick={handleTurnOn2FA} disabled={loading} variants={titleVariants} variant="primary">
                                {" "}
                                <span>Turn On Authenticator</span>{" "}
                            </FormButton>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <FormLabelText variants={titleVariants}>SMS Configuration</FormLabelText>
                        <FormSelectField aria-label="Please select" variants={titleVariants}>
                            <option value="1">SMS - Not Available</option>
                            <option value="2">SMS - Available</option>
                        </FormSelectField>
                    </Col>
                    <Col md={6} lg={6} xl={4}></Col>
                    <Col md={6} lg={6} xl={4} className="text-start"></Col>
                </Row>
            </SecurityFormContainer>
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>TURN ON EMAIL 2FA</Modal.Header>
                <Modal.Body>
                    <div className="input-wrapper-modal">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email Address to set 2FA:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className="shadow-none"
                                value={twoFaEmail}
                                onChange={e => setTwoFaEmail(e.target.value)}
                            />
                        </Form.Group>

                        {twoFaCode && (
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Verification Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Verification Code"
                                    className="shadow-none"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </Form.Group>
                        )}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button variant="secondary" className="d-block me-3 w-50" onClick={() => setShow(false)}>
                            {" "}
                            Close{" "}
                        </Button>
                        {!twoFaCode && !reverify ? (
                            <Button onClick={handleSendTwoFaCode} variant="primary" className="d-block ms-3 w-50">
                                {" "}
                                Send Code{" "}
                            </Button>
                        ) : (
                            <Button onClick={handleVerifyTwoFaCode} className="d-block btn btn-success ms-3 w-50">
                                {" "}
                                Verify{" "}
                            </Button>
                        )}

                        {reverify && (
                            <Button onClick={handleSendTwoFaCode} className="d-block btn btn-success ms-3 w-50">
                                {" "}
                                Resend Code{" "}
                            </Button>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SetSecurity;
