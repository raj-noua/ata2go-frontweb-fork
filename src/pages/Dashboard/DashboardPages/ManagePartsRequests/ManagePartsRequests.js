//Dashboard/Parts-Requests
import React, { useContext, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useGetAllcarRequestsQuery, useUpdatecarRequestsMutation } from "../../../../services/carRequestApi";
import { UserContext } from "../../../../App";
import { BiSolidPencil } from "react-icons/bi";
import { toast } from "react-toastify";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const ManagePartsRequests = () => {
    const { data } = useGetAllcarRequestsQuery();
    const { user } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({});
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [qst, setQst] = useState("");
    const [gst, setGst] = useState("");
    const [hold, setHold] = useState("");
    const [updateCarRequest] = useUpdatecarRequestsMutation();
    const [statusModal, setStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPart, setSelectedPart] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    const momentFormatter = (cell, format) => <span>{moment(cell).format(format)}</span>;

    const sliceIdFormatter = cell => <span>{cell?.toString().slice(cell.length - 7)}</span>;

    // Simplifying moment date format string
    const DATE_FORMAT = "YYYY-MM-DD, HH:MM:SS";

    const updatePrice = () => {
        if (price && hold && qst && gst) {
            const updatedArr = [];
            // eslint-disable-next-line no-unsafe-optional-chaining
            for (let i of selected?.carParts) {
                if (i === selectedPart) {
                    updatedArr.push({
                        ...i,
                        price: price,
                        subTotal: parseInt(i.quantity) * price + parseInt(qst) + parseInt(gst) + parseInt(hold),
                        notes: notes,
                        qst: qst,
                        gst: gst,
                        hold: hold,
                    });
                } else {
                    updatedArr.push(i);
                }
            }
            setSelected({ ...selected, carParts: updatedArr });
            setPrice("");
            setNotes("");
            setGst("");
            setQst("");
            setHold("");
            setShow(false);
        } else {
            toast.error("Please fill all the fields!");
        }
    };

    const handleUpdate = task => {
        if (task === "price") {
            let totalPrice = 0;
            selected?.carParts.forEach(element => {
                totalPrice = totalPrice + parseInt(element?.subTotal);
            });

            updateCarRequest({
                id: selected?._id,
                data: {
                    data: { carParts: selected?.carParts, total: totalPrice, qst: qst, gst: gst, hold: hold },
                    task: task,
                },
            }).then(res => {
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
            }).then(res => {
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

    const columns = [
        {
            dataField: "_id",
            text: "OrderId",
            sort: true,
            formatter: sliceIdFormatter,
        },
        {
            dataField: "userEmail",
            text: "Requested By",
            sort: true,
        },
        {
            dataField: "carParts",
            text: "Item Count",
            sort: true,
            formatter: (cell, row) => {
                return Array.isArray(row.carParts) ? row.carParts.length : 0;
            },
        },
        {
            dataField: "total",
            text: "Total",
            sort: true,
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
        },
        {
            dataField: "createdAt",
            text: "Created",
            sort: true,
            formatter: cell => momentFormatter(cell, DATE_FORMAT),
        },
        {
            dataField: "updatedAt",
            text: "Updated",
            sort: true,
            formatter: cell => momentFormatter(cell, DATE_FORMAT),
        },
        {
            dataField: "_id",
            text: "Update Status",
            sort: true,
            formatter: (cell, row) => {
                const isAuthorized = user?.role === "admin" || user?.role === "power";
                return isAuthorized ? (
                    <Button
                        onClick={() => {
                            setSelected(row);
                            setStatusModal(true);
                            setShowDetails(false);
                        }}>
                        Update Status
                    </Button>
                ) : (
                    <Button disabled style={{ opacity: 0.5 }}>
                        Update Status
                    </Button>
                );
            },
        },
        {
            dataField: "_id",
            text: "Action",
            sort: true,
            formatter: (cell, row) => {
                const isAuthorized = user?.role === "admin" || user?.role === "power";
                return isAuthorized ? (
                    <span
                        className="action-icon update"
                        onClick={() => {
                            setSelected(row);
                            setShowDetails(true);
                        }}>
                        <BiSolidPencil />
                        <span className="ms-2">View Details</span>
                    </span>
                ) : (
                    <span className="action-icon update" style={{ background: "grey", cursor: "not-allowed", opacity: 0.5 }}>
                        <BiSolidPencil />
                        <span className="ms-2">View Details</span>
                    </span>
                );
            },
        },
    ];

    const handleRowSelect = (row, isSelect, rowIndex, e) => {};

    const selectRow = {
        mode: "checkbox",
        clickToSelect: true,
        onSelect: handleRowSelect,
    };

    const paginationOptions = {
        page: 1,
        sizePerPage: 10,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
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

    return (
        <div className="manage-video-page">
            <div className="video-upload-container">
                <h4>Requested Quotes</h4>

                {/* table */}
                {data?.data?.length > 0 && (
                    <div className="table-responsive">
                        <BootstrapTable
                            keyField="_id"
                            data={data?.data}
                            columns={columns}
                            defaultSortDirection="asc"
                            striped
                            hover
                            condensed
                            responsive
                            scrollable
                            pagination={paginationFactory(paginationOptions)}
                            selectRow={selectRow}
                        />
                    </div>
                )}

                {selected?.userEmail && showDetails && (
                    <>
                        <h4 className="mt-5">Selected Quote Details</h4>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>System</th>
                                    <th>Sub System</th>
                                    <th>Part Name</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>VIN</th>
                                    <th>Qty</th>
                                    <th>Additional</th>
                                    <th>Price</th>
                                    <th>QST</th>
                                    <th>GST</th>
                                    <th>Hold</th>
                                    <th>Notes</th>
                                    <th>Sub-Total</th>
                                    <th>Update Quote</th>
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
                                        <td>{d?.qst ? `$${d?.qst}` : "Not Updated"}</td>
                                        <td>{d?.gst ? `$${d?.gst}` : "Not Updated"}</td>
                                        <td>{d?.hold ? `$${d?.hold}` : "Not Updated"}</td>
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
                                                            setPrice(d?.price);
                                                            setQst(d?.qst);
                                                            setGst(d?.gst);
                                                            setHold(d?.hold);
                                                            setNotes(d?.notes);
                                                        }}>
                                                        <BiSolidPencil />
                                                        <span className="ms-2">Update Parts</span>
                                                    </span>
                                                ) : (
                                                    <span className="action-icon update" style={{ background: "grey" }}>
                                                        <BiSolidPencil />
                                                        <span className="ms-2">Update Parts</span>
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div className="d-flex justify-content-center align-items-center">
                            <Button className="btn btn-danger me-2" onClick={() => setSelected({})}>
                                Cancel
                            </Button>
                            <Button className="btn btn-primary ms-2" onClick={() => handleUpdate("price")}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="modal-form">
                        <div className="video-input-box-modal">
                            <h2 className="video-page-title text-center">Add Price</h2>
                            <div className="input-wrapper">
                                <label htmlFor="price">Price</label>
                                <input type="text" id="price" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="qst">QST</label>
                                <input type="text" id="qst" placeholder="QST" value={qst} onChange={e => setQst(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="gst">GST</label>
                                <input type="text" id="gst" placeholder="GST" value={gst} onChange={e => setGst(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="hold">Hold</label>
                                <input type="text" id="hold" placeholder="Hold" value={hold} onChange={e => setHold(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="notes">Notes</label>
                                <div className="d-flex justify-content-start align-items-center">
                                    <textarea
                                        type="text"
                                        id="notes"
                                        placeholder="Notes"
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="subTotal">Sub-Total</label>
                                <div className="d-flex justify-content-start align-items-center">
                                    <input
                                        type="text"
                                        id="subTotal"
                                        placeholder="Sub-Total"
                                        value={price * parseInt(selectedPart?.quantity) + parseInt(gst) + parseInt(qst) + parseInt(hold)}
                                    />
                                </div>
                            </div>
                            <div className="w-50 mx-auto d-flex justify-content-around align-items-center">
                                <Button variant="secondary me-3" onClick={() => setShow(false)}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={updatePrice}>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* status update */}
            <Modal show={statusModal} onHide={() => setStatusModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <Form.Select
                            className="shadow-none"
                            aria-label="Default select example"
                            value={selectedStatus}
                            onChange={e => setSelectedStatus(e.target.value)}>
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
                    <Button variant="secondary" onClick={() => setStatusModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate("status")} className="btn btn-primary">
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagePartsRequests;
