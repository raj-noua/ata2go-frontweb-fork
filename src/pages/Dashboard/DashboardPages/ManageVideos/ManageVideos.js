import React, { useContext, useState } from "react";
import "../ManageStyle.css";
import AllVideoTable from "./AllVideoTable";
import { UserContext } from "../../../../App";
import { useUploadVideoMutation } from "../../../../services/videoApi";
import { toast } from "react-toastify";

const ManageVideos = () => {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [embed, setEmbed] = useState("");
    const [uploadVideo] = useUploadVideoMutation();
    const handleUploadVideo = () => {
        const data = {
            title,
            videoUrl: url,
            description: desc,
            postedBy: user?._id,
        };
        uploadVideo(data).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setTitle("");
                setUrl("");
                setDesc("");
            } else {
                toast.error(res?.data?.message);
            }
        });
    };
    return (
        <div className="manage-video-page">
            <div className="video-upload-container">
                <div className="video-input-box">
                    <h2 className="video-page-title">Share your video</h2>
                    <div className="input-wrapper">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="title">Video URL</label>
                        <input type="text" id="title" placeholder="Video URL" value={url} onChange={e => setUrl(e.target.value)} />
                    </div>
                    <div className="input-wrapper text-area">
                        <label htmlFor="textarea">Description</label>
                        <textarea
                            name=""
                            id="textarea"
                            cols="30"
                            rows="5"
                            placeholder="Video Description"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="input-button">
                        <button onClick={handleUploadVideo}>Share Video</button>
                    </div>
                </div>
            </div>
            <AllVideoTable />
        </div>
    );
};

export default ManageVideos;
