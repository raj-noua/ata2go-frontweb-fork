/* Long */
import "./ManageUser.css";
import React, { useContext, useState }   from "react";
import { BiSolidPencil }                            from "react-icons/bi";
import { MdDelete }                                 from "react-icons/md";
import { toast }                                    from "react-toastify";
import { Button, Col, Form, Modal, Row }            from "react-bootstrap";
import BootstrapTable                               from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory                            from "react-bootstrap-table2-paginator";
import { useNavigate }                              from "react-router-dom";
import ReCAPTCHA                                    from "react-google-recaptcha";
import { IoCloseSharp }                             from "react-icons/io5";
import moment                                       from "moment";
/* import ModalBody                                    from "../../../../components/Modal/Modal"; */
import { UserContext }                              from "../../../../App";
import { staggerVariants, tileVariants }            from "../../../../utils/FmVariants";
import { captchaKey }                               from "../../../../utils/constants";
import { SVGImages }                                from "../../../../config/images";
// import { useGetLastLoginQuery }                     from "../../../../services/userApi";
import {
    /* useDeleteUserMutation,
    useDeleteUsersMutation, */
    useGetAllUsersQuery,
    useSignupMutation,
    useTwoFaByAdminMutation,
    /* useUpdateUserMutation,
    useUpdateUsersMutation, */
    useUpdateUserInfoMutation,
    useUsersDeleteMutation,
} from "../../../../services/userApi";

import {
    FormButton,
    FormCheckField,
    FormControlField,
    FormLabelText,
    ShowHidePassField,
    SignInForm,
} from "../../../Auth/SignUp/signUpStyle";


const ManageUser = ({ show, handleClose }) => {
    const STG_Min_Password_Length = 8;
    const STG_DateTime_Format = "YYYY-MM-DD, HH:MM:SS";

    const { data } = useGetAllUsersQuery();
    const { user, refetch, setRefetch }             = useContext(UserContext);

    /* ***** Mutations ***** */
    /* const [deleteUser]      = useDeleteUserMutation();
    const [deleteUsers]     = useDeleteUsersMutation();
    const [updateUser]      = useUpdateUserMutation();
    const [updateUsers]     = useUpdateUsersMutation(); */
    const [updateUserInfo]  = useUpdateUserInfoMutation();
    
    const [usersDelete]     = useUsersDeleteMutation();
    const [twoFaByAdmin]    = useTwoFaByAdminMutation();
    const [signup]          = useSignupMutation();
    
    /* ***** Modal Forms ***** */
    const [phoneVerifyModal, setphoneVerifyModal]       = useState(false);
    const [emailVerifyModal, setemailVerifyModal]       = useState(false);
    const [twoFaEmailModal, setTwoFaEmailModal]         = useState(false);
    const [authenticatorModal, setAuthenticatorModal]   = useState(false);
    const [resetPassModal, setResetPassModal]           = useState(false);
    const [roleModal, setRoleModal]                     = useState(false);
    const [deleteModal, setDeleteModal]                 = useState(false);
    const [createModal, setCreateModal]                 = useState(false);

    const [error, setError]                             = useState("");
    const [phone, setPhone]                             = useState("");
    const [selected, setSelected]                       = useState({});
    const [twoFaEmailUsers, setTwoFaEmailUsers]         = useState([]);
    const [selectedUsers, setSelectedUsers]             = useState([]);
    const [showPass, setShowPass]                       = useState(false);
    const [verifCaptcha, setVerifCaptcha]               = useState(false);
    const [subscribe, setSubscribe]                     = useState(false);
    const [error1, setError1]                           = useState(false);
    const [showAdvanced, setShowAdvanced]               = useState(false);
    const [showFlags, setShowFlags]                     = useState(false);
    const [showContact, setShowContact]                 = useState(false);

    
    /* ***** Selection for Buttons ***** */
    const [selectedPhoneVerify, setselectedPhoneVerify]                 = useState(null);
    const [selectedEmailVerify, setselectedEmailVerify]                 = useState(null);
    const [selectedTwoFaEmailStatus, setselectedTwoFaEmailStatus]       = useState("SelectStatus");
    const [selectedAuthenticatorStatus, setSelectedAuthenticatorStatus] = useState(null);
    const [selectedPassword, setSelectedPassword]                       = useState("");
    const [selectedUserRole, setselectedUserRole]                       = useState("SelectRole");

    const [formData, setFormData]       = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        address: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const booleanFormatter = cell => (
        <span>
            <td>{cell ? "Yes" : "No"}</td>
        </span>
    );
    
    const momentFormatter = (cell, format) => (
        <span>{moment(cell).format(format)}</span>
    );
    
    const sliceIdFormatter = (cell) => (
        <span>{cell?.toString().slice(cell.length - 7)}</span>
    );
    
    
    
    const columns = [
        {
            dataField: "_id",
            text: "Mod",
            sort: true,
            formatter: () => (
                <Button>
                    {" "}
                    <BiSolidPencil />
                </Button>
            ),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    navigate(`/dashboard/update-profile/${row?._id}`);
                },
            },
        },
        {
            dataField: "firstName",
            text: "First",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "lastName",
            text: "Last",
            sort: true,
            filter: textFilter(),
        },
        showContact && {
            dataField: "phoneNo",
            text: "Phone:",
            sort: true,
            filter: textFilter(),
        },
        showContact && {
            dataField: "address",
            text: "Address",
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            filter: textFilter(),
            formatter: cell => {
                return <span>{cell}</span>;
            }
        },
        showFlags && {
            dataField: "phoneVerified",
            text: "P_Vrf",
            sort: true,
            formatter: booleanFormatter,
        },
        showFlags && {
            dataField: "emailVerified",
            text: "E_Vrf",
            sort: true,
            formatter: booleanFormatter,
        },
        showFlags && {
            dataField: "twoFaEmailEnabled",
            text: "E2F",
            sort: true,
            formatter: booleanFormatter,
        },
        showFlags && {
            dataField: "twoFaAuthEnabled",
            text: "A2F",
            sort: true,
            formatter: booleanFormatter
        },
        showFlags && {
            dataField: "forcePassReset",
            text: "PwdRst",
            sort: true,
            formatter: booleanFormatter,
        },
        {
            dataField: "role",
            text: "Role",
            sort: true,
            filter: textFilter(),
        },
        showAdvanced &&  {
            dataField: "lastLoginTime",
            text: "LastLogin",  // New column
            sort: true,
            formatter: (cell) => momentFormatter(cell, STG_DateTime_Format)
        },
        showAdvanced && {
            dataField: "_id",
            text: "ID",
            sort: true,
            formatter: sliceIdFormatter,
        },
        {
            dataField: "updatedAt",
            text: "Updated",
            sort: true,
            formatter: (cell) => momentFormatter(cell, STG_DateTime_Format),
            headerStyle: {
                fontSize: '0.8rem' // or any other size you prefer
              },
              style: {
                fontSize: '0.8rem' // or any other size you prefer
              }
        },
        showAdvanced && {
            dataField: "createdAt",
            text: "Created",
            sort: true,
            formatter: (cell) => momentFormatter(cell, STG_DateTime_Format),
            headerStyle: {
                fontSize: '0.8rem' // or any other size you prefer
              },
              style: {
                fontSize: '0.8rem' // or any other size you prefer
              }
        }
    ].filter(Boolean);


    const paginationOptions = {
        page: 1,
        sizePerPage: 25,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log("page", page);
            console.log("size per page", sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log("page", page);
            console.log("size per page", sizePerPage);
        },
    };

    const defaultSorted = [{
        dataField: 'updatedAt', // The column to be sorted by default
        order: 'desc' // The sorting order
    }];
    


    const handleInputChange = event => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (event.target.name === "password" && !passwordRegex.test(event.target.value)) {
            setError1(true);
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        } else {
            setError1(false);
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
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
        setVerifCaptcha(true);
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
                emailVerified: true,
                subscribe: subscribe,
            };
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (data) {
                if (passwordRegex.test(formData.password)) {
                    signup(data).then(res => {
                        if (res?.data?.status) {
                            setError("");
                            setCreateModal(false);
                            toast.success("User created Successfully");
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
    const handleUpdateRole = role => {
        updateUserInfo({ ids: selectedUsers, data: { role: role } }).then(res => {
            if (res?.data?.status) {
                setRoleModal(false);
                setRefetch(refetch + 1);
                toast.success(res?.data?.message);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const handleVerifyEmail = () => {
        updateUserInfo({ ids: selectedUsers, data: { emailVerified: selectedEmailVerify } }).then(res => {
            if (res?.data?.status) {
                // setRoleModal(false);
                setRefetch(refetch + 1);
                toast.success("Users have been Updated!");
                setemailVerifyModal(false);
                setselectedEmailVerify(true);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const handleAuthenticator = () => {
        updateUserInfo({ ids: selectedUsers, data: { twoFaAuthEnabled: selectedAuthenticatorStatus } }).then(res => {
            if (res?.data?.status) {
                setAuthenticatorModal(false);
                setRefetch(refetch + 1);
                toast.success("User(s) Authenticator Updated!");
                setAuthenticatorModal(false);
                setSelectedAuthenticatorStatus(true);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };


    const handleVerifyPhone = () => {
        updateUserInfo({ ids: selectedUsers, data: { phoneVerified: selectedPhoneVerify } }).then(res => {
            console.log("Status:", selectedPhoneVerify);
            if (res?.data?.status) {
                setRoleModal(false);
                setRefetch(refetch + 1);
                toast.success("Users have been Updated!");
                setphoneVerifyModal(false);
                setselectedPhoneVerify(true);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const handleDeleteUser = () => {
        usersDelete(selectedUsers).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setDeleteModal(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const handleRowSelect = (row, isSelect, rowIndex, e) => {
        // Determine the two-factor authentication email
        const twoFaEmailData = row.twoFaEmail ? row.twoFaEmail : row.email;

        // Add or remove user from the selected list
        const updateSelectedUsers = include => {
            setSelectedUsers(prev => (include ? [...prev, row._id] : prev.filter(id => id !== row._id)));
        };
    
        // Add or remove user from the twoFaEmailUsers list
        const updateTwoFaEmailUsers = (include) => {
            setTwoFaEmailUsers(prev => 
                include ? [...prev, { id: row._id, data: { twoFaEmail: twoFaEmailData } }] 
                        : prev.filter(user => user.id !== row._id)
            );
        };

        // Check if the user is already selected
        const userIsSelected = selectedUsers.includes(row._id);

        if (isSelect) {
            if (!userIsSelected) {
                updateSelectedUsers(true);
                updateTwoFaEmailUsers(true);
            }
        } else {
            updateSelectedUsers(false);
            updateTwoFaEmailUsers(false);
        }
    };

    const handleTwoFaEmail = () => {
        twoFaByAdmin({ data: twoFaEmailUsers, task: selectedTwoFaEmailStatus }).then(res => {
            if (res?.data?.status) {
                setRoleModal(false);
                setRefetch(refetch + 1);
                toast.success("User(s) 2FA Email Updated!");
                setTwoFaEmailModal(false);
                setselectedTwoFaEmailStatus("on");
            } else {
                toast.error(res?.data?.message);
            }
        });
    };



    const handleReset = () => {
        updateUserInfo({ ids: selectedUsers, data: { password: selectedPassword, forcePassReset: true }, task: "resetPass" }).then(res => {
            if (res?.data?.status) {
                setRoleModal(false);
                setRefetch(refetch + 1);
                toast.success(res?.data?.message);
                setResetPassModal(false);
                setSelectedPassword("");
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    const selectRow = {
        mode: "checkbox",
        clickToSelect: true,
        onSelect: handleRowSelect,
    };

    // Array of actions for reusability and scalability
    const actions = [
        { label: 'Phone',       modalSetter: setphoneVerifyModal },
        { label: 'Email',       modalSetter: setemailVerifyModal },
        { label: 'E2Fa',         modalSetter: setTwoFaEmailModal },
        { label: 'A2Fa',     modalSetter: setAuthenticatorModal },
        { label: 'Password',    modalSetter: setResetPassModal },
        { label: 'Role',        modalSetter: setRoleModal }
        // { label: 'Advanced',        modalSetter: setAdvancedModal }
    ];

    const isAuthorized = ["admin", "power"].includes(user?.role);
    const noUsersSelected = selectedUsers.length === 0;



    const handlePhoneSelectChange = (e) => {
        const value = e.target.value;
        setselectedPhoneVerify(value === 'SelectStatus' ? null : value === 'true');
    };
    const handleEmailSelectChange = (e) => {
        const value = e.target.value;
        setselectedEmailVerify(value === 'SelectStatus' ? null : value === 'true');
    };
    const handleAuthenticatorSelectChange = (e) => {
        const value = e.target.value;
        setSelectedAuthenticatorStatus(value === 'SelectStatus' ? null : value === 'true');
    };

    // const { data: dataLogins } = useGetLastLoginQuery(user?._id);

    return (
        <div>
            {/* table start  */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-2 mb-3">
                <h4>Manage Users</h4>

                <Button onClick={() => setCreateModal(true)} className="btn btn-primary">
                    Create User
                </Button>

                <Button onClick={() => setShowContact(!showContact)}>
                    {showContact ? 'Hide Contact' : 'Show Contact'}
                </Button>
                
                <Button onClick={() => setShowAdvanced(!showAdvanced)}>
                    {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
                </Button>

                <Button onClick={() => setShowFlags(!showFlags)}>
                    {showFlags ? 'Hide Flags' : 'Show Flags'}
                </Button>


                <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center justify-content-md-center justify-content-sm-start flex-wrap gx-4">
                        {(
                            <>
                                {actions.map((action, index) => (
                                    <span
                                        key={index}
                                        onClick={() => {
                                            if (isAuthorized && !noUsersSelected) {
                                                action.modalSetter(true);
                                                setSelected(data);
                                            } else {
                                                toast.error("Please select at least one User!");
                                            }
                                        }}
                                        className={`action-icon ${isAuthorized && !noUsersSelected ? '' : 'disabled'}`}>
                                        <span className="ms-2">{action.label}</span>
                                    </span>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="d-flex align-items-center  justify-content-center gx-4">
                        {
                            <span
                                onClick={() => {
                                    if (isAuthorized && !noUsersSelected) {
                                        setDeleteModal(true);
                                        setSelected(data);
                                    } else {
                                        toast.error("Please select at least one User!");
                                    }
                                }}
                                className={`action-icon delete ${isAuthorized && !noUsersSelected ? "" : "disabled"}`}>
                                <MdDelete />
                            </span>
                        }
                    </div>
                </div>
            </div>



            {/* table */}
            {data?.data?.length > 0 && (
                <div className="table-responsive">
                    <BootstrapTable
                        bootstrap4
                        keyField="_id"
                        data={data?.data}
                        columns={columns}
                        defaultSorted={defaultSorted}
                        striped
                        hover
                        condensed
                        responsive
                        scrollable
                        pagination={paginationFactory(paginationOptions)}
                        selectRow={selectRow}
                        noDataIndication="No data found!"
                        filter={filterFactory()}
                        filterPosition="top"
                    />
                </div>
            )}



            {/* <ModalBody show={show} handleClose={handleClose} /> */}
            {/* update role */}
            <Modal show={roleModal} onHide={() => setRoleModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <Form.Select
                            className="shadow-none"
                            aria-label="Select user role"
                            value={selectedUserRole}
                            onChange={e => setselectedUserRole(e.target.value)}
                        >
                            <option value="SelectRole">Select a Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="billing">Billing</option>
                            <option value="affiliate">Affiliate</option>
                            <option value="support">Support</option>
                            <option value="audit">Audit</option>
                            <option value="power">Power</option>
                        </Form.Select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="danger-btn" variant="danger" onClick={() => setRoleModal(false)}>
                        Close
                    </Button>
                    <Button className="success-button" disabled={selectedUserRole === 'SelectRole'} onClick={() => handleUpdateRole(selectedUserRole)} variant="success">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>        {/* update role */}



            {/* delete modal */}
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <h5>Do you really want to delete these users?</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="danger-btn" variant="danger" onClick={() => setDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button className="success-button" onClick={() => handleDeleteUser(selected?._id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>        {/* delete modal */}



            {/* Phone Verify Modal */}
            <Modal show={phoneVerifyModal} onHide={() => setphoneVerifyModal(false)} backdrop="static" keyboard={false} dialogClassName="custom-modal-width">
                <Modal.Header closeButton>
                    <Modal.Title>Update Verify Phone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <h5>Set Phone Verification Status to:</h5>
                        <Form.Select
                            className="shadow-none"
                            aria-label="Default select example"
                            defaultValue="SelectStatus"
                            onChange={handlePhoneSelectChange}
                        >
                            <option value="SelectStatus">Select a Status</option>
                            <option value={true}>Verified</option>
                            <option value={false}>Unverified</option>
                        </Form.Select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="danger-btn" variant="danger" onClick={() => setphoneVerifyModal(false)}>
                        Cancel
                    </Button>
                    <Button className="success-button" onClick={handleVerifyPhone} disabled={selectedPhoneVerify === null}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>        {/* Phone Verify Modal */}



            {/* Email Verify Modal */}
            <Modal show={emailVerifyModal} onHide={() => setemailVerifyModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Verify Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <h5>Set Verify Email Status to:</h5>
                        <Form.Select
                            className="shadow-none"
                            aria-label="Default select example"
                            defaultValue="SelectStatus"
                            onChange={handleEmailSelectChange }
                        >
                            <option value="SelectStatus">Select a Status</option>
                            <option value={true}>Verified</option>
                            <option value={false}>Unverified</option>
                        </Form.Select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="danger-btn" variant="danger" onClick={() => setemailVerifyModal(false)}>
                        Cancel
                    </Button>
                    <Button className="success-button" onClick={handleVerifyEmail} disabled={selectedEmailVerify === null}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>        {/* Email Verify Modal */}


            {/* Authenticator Modal */}
            <Modal show={authenticatorModal} onHide={() => setAuthenticatorModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Authenticator Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <h5>Set Authenticator Status to:</h5>
                        <Form.Select
                            className="shadow-none"
                            aria-label="Default select example"
                            defaultValue="SelectStatus"
                            onChange={handleAuthenticatorSelectChange}
                        >
                            <option value="SelectStatus">Select a Status</option>
                            <option value={true}>ON</option>
                            <option value={false}>OFF</option>
                        </Form.Select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="danger-btn" variant="danger" onClick={() => setAuthenticatorModal(false)}>
                        Cancel
                    </Button>
                    <Button className="success-button" onClick={handleAuthenticator} disabled={selectedAuthenticatorStatus === null}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>        {/* Authenticator mmodal */}



            {/* two 2fa mmodal */}
            <Modal show={twoFaEmailModal} onHide={() => setTwoFaEmailModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Email 2FA Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <h5>Set Email 2FA Status to:</h5>
                        <Form.Select
                            className="shadow-none"
                            aria-label="Default select example"
                            value={selectedTwoFaEmailStatus}
                            onChange={e => setselectedTwoFaEmailStatus(e.target.value)}
                        >
                            <option value="SelectStatus">Select a Status</option>
                            <option value={"on"}>ON</option>
                            <option value={"off"}>OFF</option>
                        </Form.Select>
                        {/*  */}{" "}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="danger-btn" variant="danger" onClick={() => setTwoFaEmailModal(false)}>
                        Cancel
                    </Button>
                    <Button className="success-button" onClick={handleTwoFaEmail} disabled={selectedTwoFaEmailStatus === "SelectStatus"}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>        {/* two 2fa mmodal */}





            {/* reset Password */}
            <Modal show={resetPassModal} onHide={() => setResetPassModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset password for these users?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="New Password"
                                value={selectedPassword}
                                onChange={e => setSelectedPassword(e.target.value)}
                            />
                        </div>
                        {selectedPassword.length > 0 && selectedPassword.length < STG_Min_Password_Length && (
                            <div className="error-message" style={{ color: 'red' }}>
                                Minimum Password Length: {STG_Min_Password_Length}.
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer> 
                    <Button className="danger-btn" variant="danger" onClick={() => setResetPassModal(false)}>
                        Cancel
                    </Button>
                    <Button className="success-button" onClick={handleReset} disabled={selectedPassword.length < STG_Min_Password_Length}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>        {/* reset Password */}



            {/* Create User */}
            <Modal show={createModal} onHide={() => setCreateModal(false)} backdrop="static" keyboard={false}>
                <div className="create-user">
                    <IoCloseSharp onClick={() => setCreateModal(false)} className="close-btn-icon" />
                    <h3 className="text-center mb-3" style={{ color: "white" }}>
                        Create New User
                    </h3>
                    <SignInForm
                        variants={staggerVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}>
                        <Row>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <FormLabelText className="dark" variants={tileVariants}>
                                        First Name*
                                    </FormLabelText>
                                    <FormControlField
                                        variants={tileVariants}
                                        type="text"
                                        placeholder="New User First Name"
                                        name="firstName"
                                        required
                                        autocomplete="off"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="dark"
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <FormLabelText className="dark" variants={tileVariants}>
                                        Last Name*
                                    </FormLabelText>
                                    <FormControlField
                                        variants={tileVariants}
                                        type="text"
                                        placeholder="New User Last Name"
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
                                    <FormLabelText variants={tileVariants}>Email (Auto Verified)*</FormLabelText>
                                    <FormControlField
                                        variants={tileVariants}
                                        type="email"
                                        placeholder="New User Email"
                                        name="email"
                                        required
                                        autocomplete="off"
                                        
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <FormLabelText className="dark" variants={tileVariants}>
                                        Password*
                                    </FormLabelText>
                                    <ShowHidePassField variants={tileVariants}>
                                        <FormControlField
                                            type={showPass ? "text" : "password"}
                                            placeholder="Something not easily guessed"
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
                                    <FormLabelText className="dark" variants={tileVariants}>
                                        Mobile Number*
                                    </FormLabelText>
                                    <FormControlField
                                        variants={tileVariants}
                                        type="text"
                                        placeholder="Enter User mobile no"
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
                                    <FormLabelText className="dark" variants={tileVariants}>
                                        &nbsp;
                                    </FormLabelText>
                                    <Form.Check // prettier-ignore
                                        variants={tileVariants}
                                        type="checkbox"
                                        className="dark"
                                        id={`default-checkbox`}
                                        label={`Subscribe to ATA2GO important events and promotional email, User can unsubscribe anytime!`}
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
                                    <FormButton variants={tileVariants} variant="primary" className="mt-3 " onClick={handleSubmitData}>
                                        <span>Proceed</span>
                                    </FormButton>
                                ) : (
                                    <FormButton
                                        variants={tileVariants}
                                        variant="primary"
                                        className="mt-3 sm-width rightBtn"
                                        onClick={() => setError("Please fill the captcha!")}>
                                        <span>Create</span>
                                    </FormButton>
                                )}
                            </Col>
                        </Row>
                    </SignInForm>
                </div>
            </Modal>        {/* Create User */}



        </div>
    );
};

export default ManageUser;
