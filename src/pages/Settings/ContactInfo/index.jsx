import { Button, Col, Form, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormControlField, FormLabelText, LoginContactForm } from "./ContactInfoStyle";
import { TabContentContainer } from "../../Tabs/tabContentStyle";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../services/userApi";
import { UserContext } from "../../../App";
import { staggerVariants, titleVariants } from "../../../utils/FmVariants";

const SetContactInfo = ({ user }) => {
    console.log("here", user);
    const { refetch, setRefetch } = useContext(UserContext);
    const { data } = useGetUserByIdQuery(user?._id);
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    // const [password, setPassword]                = useState("");
    const [streetAddressOne, setStreetAddressOne] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState("");
    const [country, setCountry] = useState("");
    const [onUpdate, setOnUpdate] = useState(false);
    const [streetAddress, setStreetAddress] = useState("");
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        setPhoneNo(data?.result?.phoneNo);
        setAddress(data?.result?.address);
        setEmail(data?.result?.email);
        setCompanyName(data?.result?.companyName);
        setStreetAddress(data?.result?.streetAddress);
        setStreetAddressOne(data?.result?.streetAddressOne);
        setCity(data?.result?.city);
        setState(data?.result?.state);
        setPostCode(data?.result?.postCode);
        setCountry(data?.result?.country);
    }, [data]);

    const handleUpdate = () => {
        const data = {
            phoneNo,
            email,
            companyName,
            address,
            streetAddress,
            streetAddressOne,
            postCode,
            city,
            country,
            state,
        };
        if (data) {
            console.log("data update", data);
            updateUser({ id: user?._id, data: data }).then(res => {
                if (res?.data?.status) {
                    toast.success(res?.data?.message);
                    setOnUpdate(false);
                    setRefetch(refetch + 1);
                } else {
                    toast.error(res?.data?.message);
                }
            });
        }
    };

    return (
        <TabContentContainer>
            <LoginContactForm variants={staggerVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }}>
                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <FormLabelText variants={titleVariants}>User ID</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={data?.result?._id?.slice(data?.result?._id?.length - 7, data?.result?._id?.length)}
                                type="text"
                                placeholder="User ID"
                                disabled={true}
                                required
                            />{" "}
                        </Form.Group>{" "}
                    </Col>

                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>First Name</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={data?.result?.firstName}
                                type="text"
                                placeholder="First name"
                                disabled={true}
                                required
                            />{" "}
                        </Form.Group>{" "}
                    </Col>

                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput3">
                            <FormLabelText variants={titleVariants}>Last Name</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={data?.result?.lastName}
                                type="text"
                                placeholder="Last name"
                                disabled={true}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <FormLabelText variants={titleVariants}>Phone No</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={phoneNo}
                                type="tel"
                                placeholder="Phone #"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => {
                                    setPhoneNo(e.target.value);
                                    console.log(e);
                                }}
                                pattern="/^-?\d+\.?\d[0-9]$/"
                            />{" "}
                        </Form.Group>{" "}
                    </Col>

                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>Email</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={email}
                                type="email"
                                placeholder="Enter email"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => setEmail(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>Company Name</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={companyName}
                                type="text"
                                placeholder="Enter Company Name"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => setCompanyName(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                </Row>

                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <FormLabelText variants={titleVariants}>Address</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={address}
                                type="text"
                                placeholder="Address"
                                disabled={onUpdate ? false : true}
                                onChange={e => setAddress(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>Street Address</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={streetAddress}
                                type="text"
                                placeholder="Street Name"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => setStreetAddress(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>Address Info</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={streetAddressOne}
                                type="text"
                                placeholder="Details"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => setStreetAddressOne(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                </Row>

                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput3">
                            <FormLabelText variants={titleVariants}>City</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={city}
                                type="text"
                                placeholder="Enter city"
                                disabled={onUpdate ? false : true}
                                onChange={e => setCity(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                    <Col md={6} lg={6} xl={3}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <FormLabelText variants={titleVariants}>Province/State</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={state}
                                type="text"
                                placeholder="Enter state"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => setState(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>

                    <Col md={6} lg={6} xl={2}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
                            <FormLabelText variants={titleVariants}>Postal/Zip Code</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={postCode}
                                type="text"
                                placeholder="Postal/Zip"
                                disabled={onUpdate ? false : true}
                                required
                                onChange={e => setPostCode(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>

                    <Col md={6} lg={6} xl={3}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput3">
                            <FormLabelText variants={titleVariants}>Country</FormLabelText>
                            <FormControlField
                                variants={titleVariants}
                                value={country}
                                type="text"
                                placeholder="Enter country"
                                disabled={onUpdate ? false : true}
                                onChange={e => setCountry(e.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} xl={4} className="text-end">
                        <FormLabelText variants={titleVariants}>&nbsp;</FormLabelText>
                        <div className="d-flex justify-content-center align-items-center">
                            {onUpdate ? (
                                <>
                                    <Button onClick={() => setOnUpdate(false)} className="btn btn-danger btn-md py-2 w-50 me-2">
                                        {" "}
                                        <span>Cancel</span>{" "}
                                    </Button>
                                    <Button onClick={handleUpdate} className="btn btn-info ms-2 w-50 py-2">
                                        {" "}
                                        <span>Save</span>{" "}
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setOnUpdate(true)} className="btn btn-info w-100 py-2">
                                    {" "}
                                    <span>Update Contact</span>{" "}
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </LoginContactForm>
        </TabContentContainer>
    );
};

export default SetContactInfo;
