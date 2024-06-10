import React, { useState } from "react";
import "./ManageStyle.css";
import { Button, Modal, Table } from "react-bootstrap";
import {
  useDeleteInternetMutation,
  useGetAllInternetsQuery,
  useUploadInternetMutation,
} from "../../../services/internetApi";
import { toast } from "react-toastify";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import InternetModal from "./InternetModal";
import { useContext } from "react";
import { UserContext } from "../../../App";
const HomeInternet = () => {
  const { user } = useContext(UserContext);
  const [downloadSpeed, setDownloadSpeed] = useState("");
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [temp, setTemp] = useState("");
  const [extraInfo, setExtraInfo] = useState([]);
  const [uploadInternet] = useUploadInternetMutation();
  const [deleteInternet] = useDeleteInternetMutation();
  const { data, isLoading } = useGetAllInternetsQuery();
  const [selectedId, setSelectedId] = useState("");
  const [show, setShow] = useState(false);

  const handleExtra = () => {
    setExtraInfo([...extraInfo, temp]);
    setTemp("");
  };

  const handleInternet = () => {
    const data = {
      downloadSpeed,
      uploadSpeed,
      price,
      extraInfo,
    };
    uploadInternet(data).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setDownloadSpeed("");
        setUploadSpeed("");
        setPrice("");
        setExtraInfo([]);
        setTemp("");
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleDeletePackage = (id) => {
    deleteInternet(id).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleUpdate = () => {};
  return (
    <div className="manage-video-page">
      {(user?.role === "power" || user?.role === "admin") && (
        <div className="video-upload-container">
          <div className="video-input-box">
            <h2 className="video-page-title">Add Home Internet Package</h2>
            <div className="input-wrapper">
              <label htmlFor="title">Download Speed</label>
              <input
                type="text"
                id="downloadSpeed"
                placeholder="Download Speed"
                value={downloadSpeed}
                onChange={(e) => setDownloadSpeed(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="title">Upload Speed</label>
              <input
                type="text"
                id="uploadSpeed"
                placeholder="Upload Speed"
                value={uploadSpeed}
                onChange={(e) => setUploadSpeed(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="title">Price per Month($)</label>
              <input
                type="text"
                id="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="title">Extra Info</label>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  id="extraInfo"
                  placeholder="Extra Info"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                />
                <button onClick={handleExtra} className="extra-btn">
                  Add
                </button>
              </div>
              <div>
                {extraInfo?.length > 0 && (
                  <>
                    <h5>Extra Information</h5>
                    {extraInfo?.map((e, i) => (
                      <p className="mb-0">
                        {i + 1}. {e}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="input-button mt-3">
              <button onClick={handleInternet}>Add Package</button>
            </div>
          </div>
        </div>
      )}

      <div className="video-table-container">
        <h2 className="video-page-title">My Total Video</h2>

        <div className="table-data">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Download Speed</th>
                <th>Upload Speed</th>
                <th>Price per month</th>
                <th>Package Information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((data, i) => (
                <tr key={i++}>
                  <td>{i + 1}</td>
                  <td>{data.downloadSpeed}Mbps</td>
                  <td>{data.uploadSpeed}Mbps</td>
                  <td>${data?.price}.00/mois</td>
                  <td>
                    {data?.extraInfo?.map((e, i) => (
                      <>
                        {i + 1}. {e} <br />
                      </>
                    ))}
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gx-4">
                      {user?.role === "power" ||
                      user?.role === "admin" ||
                      user?.role === "support" ? (
                        <span
                          className="action-icon update"
                          onClick={() => {
                            setSelectedId(data?._id);
                            setShow(true);
                          }}
                        >
                          <BiSolidPencil />
                          <span className="ms-2">Update</span>
                        </span>
                      ) : (
                        <span
                          className="action-icon update"
                          style={{ background: "grey" }}
                        >
                          <BiSolidPencil />
                          <span className="ms-2">Update</span>
                        </span>
                      )}
                      {user?.role === "admin" ? (
                        <span
                          onClick={() => handleDeletePackage(data?._id)}
                          className="action-icon delete"
                        >
                          <MdDelete />
                        </span>
                      ) : (
                        <span
                          style={{ background: "grey" }}
                          className="action-icon delete"
                        >
                          <MdDelete />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <InternetModal
        show={show}
        setShow={setShow}
        selectedId={selectedId}
        // handleUpdate={handleUpdate}
      ></InternetModal>
    </div>
  );
};

export default HomeInternet;
