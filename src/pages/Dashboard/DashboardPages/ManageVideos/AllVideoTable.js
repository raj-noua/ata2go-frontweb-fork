import React, { useEffect, useState } from "react";
import { Button, Modal, Table }       from "react-bootstrap";
import {
  useDeleteVideoMutation,
  useGetAllVideosQuery,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
}                                     from "../../../../services/videoApi";
import { BiSolidPencil }              from "react-icons/bi";
import { MdDelete }                   from "react-icons/md";
import { toast }                      from "react-toastify";

const AllVideoTable = () => {
  const { data, isLoading } = useGetAllVideosQuery();
  const [deleteVideo] = useDeleteVideoMutation();
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [updateVideo] = useUpdateVideoMutation();
  const { data: data1, isLoading1 } = useGetVideoByIdQuery(selectedId);

  useEffect(() => {
    setTitle(data1?.result?.title);
    setUrl(data1?.result?.videoUrl);
    setDesc(data1?.result?.description);
  }, [data1]);

  const handleDeleteVideo = (id) => {
    deleteVideo(id).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };
  const handleUpdate = () => {
    updateVideo({
      id: selectedId,
      data: { title: title, description: desc, videoUrl: url },
    }).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setShow(false);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };
  console.log(title)
  return (
    <div className="video-table-container">
      <h2 className="video-page-title">My Total Video</h2>

      <div className="table-data">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>title</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Total Comments</th>
              <th>Video URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((data, i) => (
              <tr key={i++}>
                <td>{i + 1}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data?.rating ? data?.rating : "Null"}</td>
                <td>{data?.comments?.length}</td>
                <td>
                  <a target="_blank" href={data.videoUrl}>
                    {data.videoUrl}
                  </a>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gx-4">
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
                    <span
                      onClick={() => handleDeleteVideo(data?._id)}
                      className="action-icon delete"
                    >
                      <MdDelete />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update The video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            <div className="video-input-box-modal">
              <div className="input-wrapper w-100">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-wrapper w-100">
                <label htmlFor="title">Video URL</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Video URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="input-wrapper text-area w-100">
                <label htmlFor="textarea">Description</label>
                <textarea
                  name=""
                  id="textarea"
                  cols="30"
                  rows="5"
                  placeholder="Video Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="input-button">
                {/* <button onClick={handleUploadVideo}>Share Video</button> */}
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
    </div>
  );
};

export default AllVideoTable;
