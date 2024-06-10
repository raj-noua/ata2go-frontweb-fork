import { UserContext } from "../../../App";
import { useGetUserByIdQuery } from "../../../services/userApi";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const AdminProfile = () => {
    const { user } = useContext(UserContext);
    const { data } = useGetUserByIdQuery(user?._id);
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [onUpdate, setOnUpdate] = useState(false);
    useEffect(() => {
        setPhoneNo(data?.result?.phoneNo);
        setAddress(data?.result?.address);
        setEmail(data?.result?.email);
    }, [data]);

    return (
        <div className="profile-page">
            <Container>
                <div className="profile-section">
                    <h4 className="mb-3">Profile Information</h4>
                    <Row>
                        <Col className="video-input-box-modal" xs={12} md={6} lg={6}>
                            <div className="input-wrapper">
                                <label htmlFor="title">User ID</label>
                                <input type="text" id="userId" placeholder="User ID" value={data?.result?._id} disabled={true} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="title">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    value={data?.result?.firstName}
                                    disabled={true}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="title">Last Name</label>
                                <input type="text" id="lastName" placeholder="Last Name" value={data?.result?.lastName} disabled={true} />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="title">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={onUpdate ? false : true}
                                />
                            </div>
                        </Col>

                        <Col className="video-input-box-modal" xs={12} md={6} lg={6}>
                            <div className="input-wrapper">
                                <label htmlFor="title">Youre Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Youra Phone"
                                    value={phoneNo}
                                    onChange={e => setPhoneNo(e.target.value)}
                                    disabled={onUpdate ? false : true}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="title">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    disabled={onUpdate ? false : true}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="title">Password</label>
                                <input
                                    type="text"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    disabled={onUpdate ? false : true}
                                />
                            </div>
                            {onUpdate ? (
                                <div className="update-btn  d-flex justify-content-between align-items-center">
                                    <Button onClick={() => setOnUpdate(false)} className="btn btn-danger d-block btn-cancel">
                                        Cancel
                                    </Button>
                                    <Button className="btn btn-primary d-block btn-cancel">Save</Button>
                                </div>
                            ) : (
                                <div className="update-btn">
                                    <Button onClick={() => setOnUpdate(true)} className="btn btn-primary d-block w-100">
                                        Update
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default AdminProfile;
