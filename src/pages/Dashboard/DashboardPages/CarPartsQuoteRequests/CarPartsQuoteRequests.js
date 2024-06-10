import React, { useContext, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import {
  useGetAllcarRequestsQuery,
  useUpdatecarRequestsMutation,
} from "../../../../services/carRequestApi";
import { UserContext } from "../../../../App";
import { BiSolidPencil } from "react-icons/bi";
import { toast } from "react-toastify";
import moment from "moment";

const PartsQuoteRequests = () => {
  const { data } = useGetAllcarRequestsQuery();
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});
  const [price, setPrice] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [notes, setNotes] = useState("");
  const [updateCarRequest] = useUpdatecarRequestsMutation();
  const [statusModal, setStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPart, setSelectedPart] = useState({});

  const updatePrice = () => {
    if (price && notes) {
      const updatedArr = [];
      for (let i of selected?.carParts) {
        if (i == selectedPart) {
          updatedArr.push({
            ...i,
            price: price,
            subTotal: parseInt(i.quantity) * price,
            notes: notes,
          });
        } else {
          updatedArr.push(i);
        }
      }
      setSelected({ ...selected, carParts: updatedArr });
      setPrice("");
      setNotes("");
      setShow(false);
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  const handleUpdate = (task) => {
    if (task === "price") {
      let totalPrice = 0;
      selected?.carParts.forEach((element) => {
        totalPrice = totalPrice + parseInt(element?.subTotal);
      });

      updateCarRequest({
        id: selected?._id,
        data: {
          data: { carParts: selected?.carParts, total: totalPrice },
          task: task,
        },
      }).then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setShow(false);
          setSelected({});
        } else {
          toast.error(res?.data?.message);
        }
      });
    } else {
      updateCarRequest({
        id: selected?._id,
        data: { task: task, data: { status: selectedStatus } },
      }).then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setStatusModal(false);
          setSelected({});
        } else {
          toast.error(res?.data?.message);
        }
      });
    }
  };

  return (
    <div className="manage-video-page">
      <div className="video-upload-container">
        <h4>Requested Quotes</h4>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Requested By</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Updated</th>
              <th>Update Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((d, i) => (
              <tr key={i++}>
                <td>{d?._id}</td>
                <td>{d?.userEmail}</td>
                <td>{d?.carParts?.length}</td>
                <td>{d?.total ? `$${d?.total}` : "Not Added"}</td>
                <td>{d?.status}</td>
                <td>
                  {moment(d?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  {moment(d?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gx-4">
                    {user?.role === "admin" || user?.role === "power" ? (
                      <span
                        className="action-icon update"
                        onClick={() => {
                          setSelected(d);
                          setStatusModal(true);
                        }}
                      >
                        {/* <BiSolidPencil /> */}
                        <span className="ms-2">Update Status</span>
                      </span>
                    ) : (
                      <span
                        className="action-icon update"
                        style={{ background: "grey" }}
                      >
                        {/* <BiSolidPencil /> */}
                        <span className="ms-2">Update Status</span>
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gx-4">
                    {user?.role === "admin" || user?.role === "power" ? (
                      <span
                        className="action-icon update"
                        onClick={() => {
                          setSelected(d);
                        }}
                      >
                        <BiSolidPencil />
                        <span className="ms-2">View Details</span>
                      </span>
                    ) : (
                      <span
                        className="action-icon update"
                        style={{ background: "grey" }}
                      >
                        <BiSolidPencil />
                        <span className="ms-2">View Details</span>
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selected?.userEmail && (
          <>
                  <h4 className="mt-5">Selected Quote Details</h4>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>System</th>
                  <th>Sub System</th>
                  <th>Part Name</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>VIN</th>
                  <th>Quantity</th>
                  <th>Additional</th>
                  <th>Price</th>
                  <th>Notes</th>
                  <th>Sub-Total</th>
                  <th>Update Price</th>
                </tr>
              </thead>
              <tbody>
                {selected?.carParts?.map((d, i) => (
                  <tr key={i++}>
                    <td>{i + 1}</td>
                    <td>{d?.system}</td>
                    <td>{d?.subSystem}</td>
                    <td>{d?.partName}</td>
                    <td>{d?.brand}</td>
                    <td>{d?.model}</td>
                    <td>{d?.year}</td>
                    <td>{d?.vin ? d?.vin : "Not Available"}</td>
                    <td>{d?.quantity}</td>
                    <td>{d?.additional ? d?.additional : "Not Available"}</td>
                    <td>{d?.price ? `$${d?.price}` : "Not Updated"}</td>
                    <td>{d?.notes ? d?.notes : "Not Added"}</td>
                    <td>{d?.subTotal ? `$${d?.subTotal}` : "Not Added"}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gx-4">
                        {user?.role === "admin" || user?.role === "power" ? (
                          <span
                            className="action-icon update"
                            onClick={() => {
                              setSelectedPart(d);
                              setShow(true);
                            }}
                          >
                            <BiSolidPencil />
                            <span className="ms-2">Update Price</span>
                          </span>
                        ) : (
                          <span
                            className="action-icon update"
                            style={{ background: "grey" }}
                          >
                            <BiSolidPencil />
                            <span className="ms-2">Update Price</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center align-items-center">
            <Button
              className="btn btn-danger me-2"
              onClick={() => setSelected({})}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary ms-2"
              onClick={() => handleUpdate("price")}
            >
              Save
            </Button>
            </div>
          </>
        )}
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="modal-form">
            <div className="video-input-box-modal">
              <h2 className="video-page-title text-center">Add Price</h2>
              <div className="input-wrapper">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="subTotal">Sub-Total</label>
                <div className="d-flex justify-content-start align-items-center">
                  <input
                    type="text"
                    id="subTotal"
                    placeholder="Sub-Total"
                    value={price * parseInt(selectedPart?.quantity)}
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label htmlFor="notes">Notes</label>
                <div className="d-flex justify-content-start align-items-center">
                  <textarea
                    type="text"
                    id="notes"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-50 mx-auto d-flex justify-content-around align-items-center">
                <Button variant="secondary me-3" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button onClick={updatePrice} variant="info">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* status update */}
      <Modal
        show={statusModal}
        onHide={() => setStatusModal(false)}
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="CtReqParts">CtReqParts</option>
              <option value="CtReqRefund">CtReqRefund</option>
              <option value="CtReqCancel">CtReqCancel</option>
              <option value="ReqCtInfo">ReqCtInfo</option>
              <option value="PendingDelivery">PendingDelivery</option>
              <option value="ClosedFulfilled">ClosedFulfilled</option>
              <option value="AtaProcessing">AtaProcessing</option>
              <option value="ReqCtQtApp">ReqCtQtApp</option>
              <option value="ClosedInReview">ClosedInReview</option>
              <option value="ClosedInfoOnly">ClosedInfoOnly</option>
              <option value="AtaCancelled">AtaCancelled</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleUpdate("status")} variant="primary">
            Update
          </Button>
          <Button variant="secondary" onClick={() => setStatusModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PartsQuoteRequests;
