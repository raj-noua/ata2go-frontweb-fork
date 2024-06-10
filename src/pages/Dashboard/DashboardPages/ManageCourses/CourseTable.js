import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import {
    useDeleteCourseMutation,
    useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useUpdateCourseMutation
} from "../../../../services/courseApi";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DeleteModal from "../../../../components/Modal/DeleteModal";
import { UserContext } from "../../../../App";

const CourseTable = () => {
    const { data } = useGetAllCoursesQuery();
    const [show, setShow] = useState(false);
    const { user } = useContext(UserContext);
    const [selectedId, setSelectedId] = useState("");
    const { data: data1 } = useGetCourseByIdQuery(selectedId);
    const [formData, setFormData] = useState({
        serviceCode: "",
        courseName: "",
        courseLevel: "",
        price: "",
        project: "",
        session: "",
        description: ""
    });
    const [deleteCourse] = useDeleteCourseMutation();
    const [updateCourses] = useUpdateCourseMutation();
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        setFormData({
            serviceCode: data1?.result?.serviceCode,
            courseName: data1?.result?.courseName,
            courseLevel: data1?.result?.courseLevel,
            price: data1?.result?.price,
            project: data1?.result?.project,
            session: data1?.result?.session,
            description: data1?.result?.description
        });
    }, [data1]);

    const handleDeleteCourse = id => {
        deleteCourse(id).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setDeleteModal(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };
    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    const handleUpdate = () => {
        updateCourses({
            id: selectedId,
            data: formData
        }).then(res => {
            if (res?.data?.status) {
                toast.success(res?.data?.message);
                setShow(false);
            } else {
                toast.error(res?.data?.message);
            }
        });
    };
    
    const canEdit = ['power', 'admin', 'support'].includes(user?.role);
    const actionStyle = canEdit ? {} : { background: "grey" };

    return (
        <div className="video-table-container">
            <h2 className="video-page-title">Learning Offerings</h2>

            <div className="table-data">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Course</th>
                            <th>Expertise</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Projects</th>
                            <th>Sessions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((data, i) => (
                            <tr key={i++}>
                                <td>{data.serviceCode}</td>
                                <td>{data.courseName}</td>
                                <td>{data.courseLevel}</td>
                                <td>${data.price}</td>
                                <td>{data.description}</td>
                                <td>{data?.project ? data?.project : "0"}</td>
                                <td>{data?.session ? data?.session : "0"}</td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-center gx-4">
                                        <span
                                            className="action-icon update"
                                            style={actionStyle}
                                            onClick={canEdit ? () => {
                                                setSelectedId(data?._id);
                                                setShow(true);
                                            } : null}
                                        >
                                            <BiSolidPencil />
                                        </span>
                                        <span
                                            className="action-icon delete"
                                            style={actionStyle}
                                            onClick={canEdit ? () => {
                                                setDeleteModal(true);
                                                setSelectedItem(data?._id);
                                            } : null}
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



            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update The Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-form">
                        <div className="video-input-box-modal">
                            <div className="input-wrapper">
                                <label htmlFor="serviceCode">Service Code</label>
                                <input
                                    type="text"
                                    id="serviceCode"
                                    onChange={handleInputChange}
                                    value={formData.serviceCode}
                                    name="serviceCode"
                                    placeholder="Enter Course Code"
                                />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="course-name">Course Name</label>
                                <input
                                    type="text"
                                    id="course-name"
                                    onChange={handleInputChange}
                                    value={formData.courseName}
                                    name="courseName"
                                    placeholder="Enter All Course Name"
                                />
                            </div>

                            <div className="input-wrapper mb-3">
                                <label htmlFor="text">Course Level</label>
                                <Form.Select
                                    onChange={handleInputChange}
                                    value={formData.courseLevel}
                                    name="courseLevel"
                                    aria-label="Default select example"
                                    className="shadow-none"
                                >
                                    <option>Select Expertises</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Professional">Professional</option>
                                </Form.Select>
                            </div>

                            {['Beginner', 'Advanced'].includes(formData?.courseLevel) ? (
                                <div className="input-wrapper">
                                    <label htmlFor="session">Nb. of Sessions</label>
                                    <input
                                        type="text"
                                        id="session"
                                        name="session"
                                        onChange={handleInputChange}
                                        value={formData.session}
                                        placeholder="Number of Sessions"
                                    />
                                </div>
                            ) : formData?.courseLevel === "Professional" ? (
                                <div className="input-wrapper">
                                    <label htmlFor="project">Nb of Projects</label>
                                    <input
                                        type="text"
                                        id="project"
                                        name="beginnerSessionProject"
                                        onChange={handleInputChange}
                                        value={formData.project}
                                        placeholder="Contact for details"
                                    />
                                </div>
                            ) : null}

                            <div className="input-wrapper">
                                <label htmlFor="project">Price($)</label>
                                <input
                                    type="text"
                                    id="price"
                                    onChange={handleInputChange}
                                    value={formData.price}
                                    name="price"
                                    placeholder="Price"
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="text">Description</label>
                                <input
                                    type="text"
                                    id="text"
                                    name="description"
                                    onChange={handleInputChange}
                                    value={formData.description}
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleUpdate} variant="primary">
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <DeleteModal
                question={"Do you really delete the package?"}
                heading={"Delete Package"}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                handleDeleteItem={handleDeleteCourse}
                id={selectedItem}
            ></DeleteModal>
        </div>
    );
};

export default CourseTable;
