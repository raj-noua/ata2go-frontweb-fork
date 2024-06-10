import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDeleteCourseMutation, useGetAllCoursesQuery, useGetCourseByIdQuery, useUpdateCourseMutation } from "../../../../services/courseApi";
import { BiSolidPencil }              from "react-icons/bi";
import { MdDelete }                   from "react-icons/md";
import { toast }                      from "react-toastify";

const CourseTable = () => {
  const {data, isLoading} =useGetAllCoursesQuery()
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { data: data1, isLoading1 } = useGetCourseByIdQuery(selectedId);
  const [formData, setFormData] = useState({
    serviceCode: "",
    courseName: "",
    courseLevel: "",
    price: "",
    project: "",
    session: "",
    description: "",
  });
  const [deleteCourse] = useDeleteCourseMutation()
  const [updateCourses] = useUpdateCourseMutation()



  useEffect(() => {
    setFormData({
      serviceCode: data1?.result?.serviceCode,
      courseName: data1?.result?.courseName,
      courseLevel: data1?.result?.courseLevel,
      price: data1?.result?.price,
      project: data1?.result?.project,
      session: data1?.result?.session,
      description: data1?.result?.description,
    })
  }, [data1]);

  const handleDeleteCourse = (id) => {
    deleteCourse(id).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdate = () => {
    updateCourses({
      id: selectedId,
      data: formData,
    }).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setShow(false);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };
  return (
    <div className="video-table-container">
      <h2 className="video-page-title">Courses Data</h2>

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
                <td>{data?.project ? data?.project : '0'}</td>
                <td>{data?.session ? data?.session : '0'}</td>
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
                      onClick={() => handleDeleteCourse(data?._id)}
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
          <Modal.Title>Update The Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          
          <div className="modal-form">
            <div className="video-input-box-modal">
            <div className="input-wrapper">
            <label htmlFor="serviceCode">Course Code</label>
            <input
              type="text"
              id="serviceCode"
              onChange={handleInputChange}
              value={formData.serviceCode}
              name="serviceCode"
              placeholder="Enter Course Code Update"
            />

            <label htmlFor="course-name">Course Name</label>
            <input
              type="text"
              id="course-name"
              onChange={handleInputChange}
              value={formData.courseName}
              name="courseName"
              placeholder="Enter Course Name Update"
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
              <option>Select Expertise</option>
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Professional</option>
            </Form.Select>
          </div>

          {(formData?.courseLevel === "Beginner" ||
            formData?.courseLevel === "Advanced") && (
            <div className="input-wrapper">
              <label htmlFor="session">Sessions</label>
              <input
                type="text"
                id="session"
                name="session"
                onChange={handleInputChange}
                value={formData.session}
                placeholder="Number of Sessions"
              />
            </div>
          )}

          {formData?.courseLevel === "Professional" && (
            <div className="input-wrapper">
              <label htmlFor="project">Projects</label>
              <input
                type="text"
                id="project"
                onChange={handleInputChange}
                value={formData.project}
                name="beginnerSessionProject"
                placeholder="Number of Projects"
              />
            </div>
          )}
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
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseTable;
