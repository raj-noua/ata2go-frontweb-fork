import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import ModalBody from "../../../../components/Modal/Modal"; //
import { useDeleteAffiliateMutation, useGetAllAffiliatesQuery } from "../../../../services/affiliateApi";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ManageAffiliate = ({ show, handleClose }) => {
    const { data } = useGetAllAffiliatesQuery();
    const [deleteAffiliate] = useDeleteAffiliateMutation();
    // const [updateAffiliate] = useUpdateAffiliateMutation();
    // const [roleModal, setRoleModal] = useState(false);
    const [selected, setSelected] = useState({});
    // const [selectedRole, setSelectedRole] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    // const { Affiliate, refetch, setRefetch } = useContext(UserContext);

    const handleDeleteAffiliate = id => {
        deleteAffiliate(id).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setDeleteModal(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };
    return (
        <div>
            {/* table start  */}

            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Affiliate ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone No</th>
                        <th>Phone Verified</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Email Verified</th>
                        <th>2FA Active</th>
                        <th>Force Pwd Reset</th>
                        <th>Role</th>
                        <th>Delete Affiliate</th>
                        <th>Affiliate Updated</th>
                        <th>Affiliate Created</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((data, i) => (
                        <tr key={i++}>
                            <td>{data?._id?.toString().slice(data?._id.length - 7, data?._id.length)}</td>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.phoneNo}</td>
                            <td>{data.phoneVerified ? "Yes" : "No"}</td>
                            <td>{data.address}</td>
                            <td>{data.email}</td>
                            <td>{data.emailVerified ? "Yes" : "No"}</td>
                            <td>{data.twoFaEmailEnabled ? "Yes" : "No"}</td>
                            <td>{data?.forcePassReset ? "Yes" : "No"}</td>
                            <td>{data.role}</td>

                            <td>
                                <div className="d-flex align-items-center  justify-content-center gx-4">
                                    <span
                                        onClick={() => {
                                            setDeleteModal(true);
                                            setSelected(data);
                                        }}
                                        className="action-icon delete"
                                    >
                                        <MdDelete />
                                    </span>
                                </div>
                            </td>
                            <td>
                                {new Date(data?.updatedAt).getDate()}-{new Date(data?.updatedAt).getMonth()}-
                                {new Date(data?.updatedAt).getFullYear()}
                            </td>
                            <td>
                                {new Date(data?.createdAt).getDate()}-{new Date(data?.createdAt).getMonth()}-
                                {new Date(data?.createdAt).getFullYear()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalBody show={show} handleClose={handleClose} />

            {/* delete modal */}
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Affiliate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <h5>Do you really want to delete this Affiliate?</h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button className="danger-btn" variant="danger" onClick={() => handleDeleteAffiliate(selected?._id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageAffiliate;
