import React, { useState }              from "react";
import { Button, Table }                from "react-bootstrap";
import moment                           from "moment";
import { useGetcarRequestsByUserQuery } from "../../../services/carRequestApi";

const SubsPartsQuotes = ({ user }) => {
    const { data, refetch } = useGetcarRequestsByUserQuery(user?._id);
    const [selected, setSelected] = useState({});

    return (
        <div className="manage-video-page">
            <div className="video-upload-container">
                <h4>Requested Quotes</h4>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Submitted At</th>
                            <th>Status Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((d, i) => (
                            <tr key={i++}>
                                <td>{d?._id?.slice(-8, -1)}</td>
                                <td>{d?.carParts?.length}</td>
                                <td>{d?.total ? `$${d?.total}` : "Not Added"}</td>
                                <td>{d?.status}</td>
                                <td>{moment(d?.createdAt).format("YYYY-MM-DD, HH:MM:SS")}</td>
                                <td>{moment(d?.updatedAt).format("YYYY-MM-DD, HH:MM:SS")}</td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-center gx-4">
                                        {user?.role === "admin" || user?.role === "power" ? (
                                            <span
                                                className="action-icon update"
                                                onClick={() => {
                                                    refetch();
                                                    setSelected(d);
                                                }}
                                            >
                                                {/* <BiSolidPencil /> */}
                                                <span className="ms-2">View Status</span>
                                            </span>
                                        ) : (
                                            <span className="action-icon update" style={{ background: "grey" }}>
                                                {/* <BiSolidPencil /> */}
                                                <span className="ms-2">View Status</span>
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
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>VIN</th>
                                    <th>Quantity</th>
                                    <th>Additional</th>
                                    <th>Price</th>
                                    <th>QST</th>
                                    <th>GST</th>
                                    <th>Hold</th>
                                    <th>Notes</th>
                                    <th>Sub-Total</th>
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
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-center align-items-center">
                            <Button className="btn btn-danger me-2" onClick={() => setSelected({})}>
                                Close
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubsPartsQuotes;
