import { Col, Container, Row, Form }                        from "react-bootstrap";
import { motion }                                           from "framer-motion";
import {
    ContactContentBox,
    ContactForm,
    ContactInfoBox,
    ContactWrapper,
    CopyRightText,
    FormButton,
    FormControlField,
    FormControlTextArea,
    FormLabelText,
    GoogleMapContainer,
    SectionTitleText
}                                                           from "./contactSectionStyle";

import { Link }                                             from "react-router-dom";
import { useState }                                         from "react";
import axios                                                from "axios";
import { toast }                                            from "react-toastify";
import ReCAPTCHA                                            from "react-google-recaptcha";
import { SVGImages }                                        from "../../../config/images";
import SocialMedia                                          from "../../../components/SocialMedia";
import { staggerVariants, tileVariants, tile_Left2right }   from "../../../utils/FmVariants";
import { useSendSupportMutation }                           from "../../../services/userApi";
import { captchaKey }                                       from "../../../utils/constants";

const ContactSection = ({ sectionId }) => {
    return (
        <ContactWrapper id={sectionId}>
            <Container fluid className="px-0 mx-auto">
                <Row className="px-0 mx-auto">
                    <Col sm="12" md="5" className="px-0 mx-auto">
                        <GoogleMapContainer
                            variants={staggerVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178787.81912808729!2d-73.71187334999999!3d45.5591827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC%2C%20Canada!5e0!3m2!1sen!2sin!4v1691474134897!5m2!1sen!2sin"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                variants={tile_Left2right}
                            ></motion.iframe>
                        </GoogleMapContainer>
                    </Col>
                    <Col sm="12" md="7" className="px-0 mx-auto">
                        <ContactContentBox
                            variants={staggerVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <SectionTitleText variants={tileVariants}>{`let's get connected`}</SectionTitleText>
                            <ContactInfoBox
                                variants={staggerVariants}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <motion.div className="contactItem" variants={tileVariants}>
                                    <SVGImages.LocationIcon />
                                    <span>Montreal, Quebec</span>
                                </motion.div>
                                <motion.div className="contactItem" variants={tileVariants}>
                                    <SVGImages.CallIcon />
                                    <Link to={"tel:514-867-5523"}>514-867-5523</Link>
                                </motion.div>
                                <motion.div className="contactItem" variants={tileVariants}>
                                    <SVGImages.MailIcon />
                                    <Link to={"mailto:support@ata2go.com"}>support@ata2go.com</Link>
                                </motion.div>
                            </ContactInfoBox>
                            <SocialMedia />
                            <ContactFormBox />
                            <CopyRightText variants={tileVariants}>
                                <motion.span>© Copyright ATA2GO. All Rights Reserved</motion.span>
                            </CopyRightText>
                        </ContactContentBox>
                    </Col>
                </Row>
            </Container>
        </ContactWrapper>
    );
};

const ContactFormBox = () => {
    const [verifCaptcha, setVerifCaptcha] = useState(true);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [letterCount, setLetterCount] = useState([]);

    const [sendSupport] = useSendSupportMutation();
    function onChange(value) {
        console.log("Captcha value:", value);
        setVerifCaptcha(true);
    }
    const handleName = e => {
        const inputValue = e.target.value;
        const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
        setName(sanitizedInputValue);
    };
    const handleEmail = e => {
        const inputValue = e.target.value;
        const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
        setEmail(sanitizedInputValue);
    };
    const handleSub = e => {
        const inputValue = e.target.value;
        const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
        setSubject(sanitizedInputValue);
    };
    const handleText = e => {
        const inputValue = e.target.value;
        const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
        if (message.split(" ").length > 120) {
            const regex = /[\w\d\s]/g;
            const result = message.replace(regex, "");
            console.log(result);
        } else {
            setMessage(sanitizedInputValue);
            setLetterCount(sanitizedInputValue.split(" "));
        }
    };
    const handleSendMessage = async e => {
        e.preventDefault();

        const data = { name, email, subject, text: message };
        const options = {
            method: "GET",
            url: "https://community-purgomalum.p.rapidapi.com/json",
            params: {
                text: message
            },
            headers: {
                "X-RapidAPI-Key": "3183ae9d2bmshd63837079167294p121a90jsn3387d784707e",
                "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com"
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            if (response?.data?.result?.includes("*")) {
                setError("Please remove inappropriate words!");
            } else {
                sendSupport(data).then(res => {
                    if (res?.data?.status) {
                        toast.success(res?.data?.message);
                        setEmail("");
                        setName("");
                        setSubject("");
                        setMessage("");
                        setError("");
                    } else {
                        setError(res?.data?.message);
                    }
                });
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <ContactForm
            onSubmit={handleSendMessage}
            variants={staggerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
        >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <FormLabelText variants={tileVariants}>Name*</FormLabelText>
                <FormControlField
                    variants={tileVariants}
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleName}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <FormLabelText variants={tileVariants}>Email*</FormLabelText>
                <FormControlField
                    variants={tileVariants}
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmail}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <FormLabelText variants={tileVariants}>Subject</FormLabelText>
                <FormControlField
                    variants={tileVariants}
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={handleSub}
                    required
                />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.ControlTextarea1">
                <FormLabelText variants={tileVariants}>Message*</FormLabelText>
                <motion.div variants={tileVariants}>
                    <FormControlTextArea
                        className="form-control"
                        as="textarea"
                        rows={3}
                        placeholder="Enter Text"
                        value={message}
                        onChange={handleText}
                        required
                    />
                </motion.div>
                <p className="text-end">
                    {letterCount[0] === "" && letterCount.length ? 0 : letterCount.length}
                    /120
                </p>
            </Form.Group>
            {error && <p className="error-message mb-0">{error}</p>}

            <div className="recaptcha-container mb-3">
                <ReCAPTCHA className="recaptcha-field" sitekey={captchaKey} onChange={onChange} />
            </div>
            <FormButton type="submit" variants={tileVariants} variant="primary" disabled={!verifCaptcha}>
                <span>Send Message</span>
            </FormButton>
        </ContactForm>
    );
};

export default ContactSection;
