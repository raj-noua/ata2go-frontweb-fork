import React, { useContext, useState }  from "react";
import Table                            from "react-bootstrap/Table";
import { BiSolidPencil }                from "react-icons/bi";
import { MdDelete }                     from "react-icons/md";
import ModalBody                        from "../../../components/Modal/Modal";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
}                                       from "../../../services/userApi";
import { toast }                        from "react-toastify";
import { Button, Form, Modal }          from "react-bootstrap";
import { UserContext }                  from "../../../App";

const ManageUser = ({ show, handleShow, handleClose }) => {
  const { data, loading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [roleModal, setRoleModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const { user, refetch, setRefetch } = useContext(UserContext);

  const handleUpdateRole = (id, role) => {
    updateUser({ id: id, data: { role: role } }).then((res) => {
      if (res?.data?.status) {
        setRoleModal(false);
        setRefetch(refetch+1)
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then((res) => {
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
            <th>User ID</th>
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
            <th>Assign Role</th>
            <th>Delete User</th>
            <th>User Updated</th>
            <th>User Created</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((data, i) => (
            <tr key={i++}>
              <td>
                {data?._id
                  ?.toString()
                  .slice(data?._id.length - 7, data?._id.length)}
              </td>
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
                <div className="d-flex align-items-center justify-content-center gx-4">
                  {user?.role === "admin" ||
                  user?.role === "power" ? (
                    <span
                      className="action-icon update"
                      onClick={() => {
                        setSelected(data);
                        setRoleModal(true);
                        setSelectedRole(data?.role);
                      }}
                    >
                      <BiSolidPencil />
                      <span className="ms-2">Assign Role</span>
                    </span>
                  ) : (
                    <span className="action-icon update" style={{background: 'grey'}}>
                      <BiSolidPencil />
                      <span className="ms-2">Assign Role</span>
                    </span>
                  )}
                </div>
              </td>
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
                {new Date(data?.updatedAt).getDate()}-
                {new Date(data?.updatedAt).getMonth()}-
                {new Date(data?.updatedAt).getFullYear()}
              </td>
              <td>
                {new Date(data?.createdAt).getDate()}-
                {new Date(data?.createdAt).getMonth()}-
                {new Date(data?.createdAt).getFullYear()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalBody show={show} handleClose={handleClose} />

      {/* update role */}
      <Modal
        show={roleModal}
        onHide={() => setRoleModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            <Form.Select
              className="shadow-none"
              aria-label="Default select example"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="billing">Billing</option>
              <option value="affiliate">Affiliate</option>
              <option value="support">Support</option>
              <option value="audit">Audit</option>
              <option value="audit">Power</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleUpdateRole(selected?._id, selectedRole)}
            variant="primary"
          >
            Update
          </Button>
          <Button variant="secondary" onClick={() => setRoleModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete modal */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            <h5>Do you really want to delete this user?</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteUser(selected?._id)}
            variant="danger"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUser;
