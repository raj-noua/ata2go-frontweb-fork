import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useGetInternetByIdQuery, useUpdateInternetMutation } from "../../../../services/internetApi";
import { toast } from "react-toastify";

const InternetModal = ({ show, setShow, selectedId }) => {
    const { data } = useGetInternetByIdQuery(selectedId);
    const [serviceCode, setServiceCode] = useState("");
    const [downloadSpeed, setDownloadSpeed] = useState("");
    const [uploadSpeed, setUploadSpeed] = useState("");
    const [price, setPrice] = useState("");
    const [temp, setTemp] = useState("");
    const [updateInternet] = useUpdateInternetMutation();
    const [extraInfo, setExtraInfo] = useState([]);

    useEffect(() => {
        setServiceCode(data?.result?.serviceCode);
        setDownloadSpeed(data?.result?.downloadSpeed);
        setUploadSpeed(data?.result?.uploadSpeed);
        setPrice(data?.result?.price);
        setExtraInfo(data?.result?.extraInfo);
    }, [data]);

    const handleExtra = () => {
        setExtraInfo([...extraInfo, temp]);
        setTemp("");
    };

    const handleUpdate = () => {
        updateInternet({
            id: selectedId,
            data: { serviceCode: serviceCode, downloadSpeed: downloadSpeed, uploadSpeed: uploadSpeed, price: price, extraInfo: extraInfo }
        }).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setShow(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add Home Internet Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-form">
                    <div className="video-input-box-modal">
                    <div className="input-wrapper">
                            <label htmlFor="title">Service Code</label>
                            <input
                                type="text"
                                id="serviceCode"
                                placeholder="Service Code"
                                value={serviceCode}
                                onChange={e => setServiceCode(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="title">Download Speed</label>
                            <input
                                type="text"
                                id="downloadSpeed"
                                placeholder="Download Speed"
                                value={downloadSpeed}
                                onChange={e => setDownloadSpeed(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="title">Upload Speed</label>
                            <input
                                type="text"
                                id="uploadSpeed"
                                placeholder="Upload Speed"
                                value={uploadSpeed}
                                onChange={e => setUploadSpeed(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="title">Price per Month($)</label>
                            <input type="text" id="price" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="title">Extra Info</label>
                            <div className="d-flex justify-content-start align-items-center">
                                <input
                                    type="text"
                                    id="extraInfo"
                                    placeholder="Extra Info"
                                    value={temp}
                                    onChange={e => setTemp(e.target.value)}
                                />
                                <button onClick={handleExtra} className="extra-btn">
                                    Add
                                </button>
                            </div>
                            <div>
                                {extraInfo?.length > 0 && (
                                    <>
                                        <h5>Extra Information</h5>
                                        {extraInfo.map((e, i) => (
                                            <p key={i} className="mb-0">
                                                {i + 1}. {e}
                                            </p>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleUpdate} variant="primary">
                    Update
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InternetModal;
