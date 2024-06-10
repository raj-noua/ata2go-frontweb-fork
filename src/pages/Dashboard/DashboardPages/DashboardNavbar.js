import React, { useState } from "react";
import { BsEye, BsEyeSlash, BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import profileImage from "../../../assets/images/img/dashboard-profile.jpg";
import { Button, Form, Modal } from "react-bootstrap";
import { useSignupMutation } from "../../../services/userApi";
import { toast } from "react-toastify";
const DashboardNavbar = () => {
  const [createModal, setCreateModal] = useState(false);
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [signup] = useSignupMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    address: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (
      event.target.name === "password" &&
      !passwordRegex.test(event.target.value)
    ) {
      // setError1(true);
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    } else {
      // setError1(false);
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    const phoneNumberRegex = /[^+\d\s()\-]/g; // Match any character that is not a digit, plus sign, space, open/close bracket, or hyphen

    const sanitizedValue = inputValue.replace(phoneNumberRegex, "");

    console.log(sanitizedValue);
    if (sanitizedValue.length > 0) {
      setPhone(sanitizedValue);
      console.log(sanitizedValue);
    } else {
      setPhone("");
    }
  };

  const handleSubmitData = () => {
    if (
      formData.email &&
      formData.firstName &&
      formData.password &&
      formData.lastName
    ) {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: "user",
        password: formData.password,
        phoneNo: formData.phoneNo,
        address: formData.address,
      };
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (data) {
        if (passwordRegex.test(formData.password)) {
          signup(data).then((res) => {
            if (res?.data?.status) {
              toast.success("User created successfully!");
              setCreateModal(false);
            } else {
              toast.error(res?.data?.message);
            }
          });
        } else {
          toast.error("Please fill out the required information!");
        }
      }
    } else {
      toast.error("Please fill out the required information!");
    }
  };
  return (
    <div className="dashboard-navbar">
      <div className=" d-flex justify-content-between align-items-center w-100">
        <div className="search-bar me-auto">
          <input type="text" name="" placeholder="search" id="" />
          <span className="search-icon">
            <BsSearch />
          </span>
        </div>
        <Button
          onClick={() => setCreateModal(true)}
          className="btn btn-primary"
        >
          Create User
        </Button>
        {/* <div className="profile-bar d-flex align-items-center ">
          <div className="notification-icon">
            <IoMdNotificationsOutline className="notification" />
          </div>
          <div className="dashboard-profile-image ">
            <img src={profileImage} alt="" className="profile-image" />
            <span className="active-sign"></span>
          </div>
        </div> */}
      </div>

      <Modal
        show={createModal}
        onHide={() => setCreateModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className=" input-box">
            <h4 className="text-center m-2">Create User</h4>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="firstName"
                name="firstName"
                required
                autocomplete="off"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <label for="firstName">
                First Name <span style={{ color: "red" }}>*</span>
              </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="lastName"
                name="lastName"
                required
                autocomplete="off"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <label for="lastName">
                Last Name<span style={{ color: "red" }}>*</span>
              </label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="email"
                name="email"
                required
                autocomplete="off"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label for="email">
                Email<span style={{ color: "red" }}>*</span>
              </label>
            </div>

            <div className="input-field">
              <input
                type={show ? "text" : "password"}
                className="input"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <label for="password">
                Password<span style={{ color: "red" }}>*</span>
              </label>

              <div className="password-toggle">
                {formData.password.length > 1 && (
                  <span className="password-show-icon">
                    {show ? (
                      <BsEyeSlash onClick={() => setShow(!show)} />
                    ) : (
                      <BsEye onClick={() => setShow(!show)} />
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="phoneNo"
                name="phoneNo"
                required
                autocomplete="off"
                value={phone}
                onChange={handlePhoneNumberChange}
              />
              <label for="phoneNo">Phone Number</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                className="input"
                id="address"
                name="address"
                required
                autocomplete="off"
                value={formData.address}
                onChange={handleInputChange}
              />
              <label for="address">Address</label>
            </div>
            <div className="input-field">
              <button
                // type="submit"
                onClick={handleSubmitData}
                className="submit"
                // value=""
                // disabled
              >
                Create Account
              </button>
            </div>
            <div className="input-field">
              <button
                // type="submit"
                onClick={() => setCreateModal(false)}
                className="submit bg-danger mt-3"
                // value=""
                // disabled
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardNavbar;
