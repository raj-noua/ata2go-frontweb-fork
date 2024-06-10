import React, { useState } from "react";
import CourseTable from "./CourseTable";
import { Form } from "react-bootstrap";
import { useUploadCourseMutation } from "../../../../services/courseApi";
import { toast } from "react-toastify";

const TechnologyCourses = () => {
  
  const [formData, setFormData] = useState({
    serviceCode: "",
    courseName: "",
    courseLevel: "",
    price: "",
    project: "",
    session: "",
    description: "",
  });
  const [uploadCourse] = useUploadCourseMutation();
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCourseData = () => {
    if (formData && (formData?.session || formData?.project)) {
      uploadCourse(formData).then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setFormData({
            serviceCode: "",
            courseName: "",
            courseLevel: "",
            price: "",
            project: "",
            session: "",
            description: "",
          });
        } else {
          toast.error(res?.data?.message);
        }
      });
    }else{
      toast.error("Please fill all the info!")
    }
  };



  return (
    <div>
      <div className="technology-courses-container">
        <div className="courses-input-box">
          <h2 className="courses-page-title">Learning</h2>

          <div className="input-wrapper">
            <label htmlFor="serviceCode">Service Code</label>
            <input
              type="text"
              id="serviceCode"
              onChange={handleInputChange}
              value={formData.serviceCode}
              name="serviceCode"
              placeholder="Enter Service Code"
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
              placeholder="Enter Course Name"
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
                name="project"
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
          <div className="input-button text-center">
            <button type="submit" onClick={handleCourseData}>
              Create your Course
            </button>
          </div>
        </div>

        {/* course table box  */}
      </div>
      <CourseTable />
    </div>
  );
};

export default TechnologyCourses;
