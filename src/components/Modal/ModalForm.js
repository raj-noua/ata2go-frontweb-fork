import                          "./ModalForm.css";
import React, { useState } from "react";

// Form for: firstName, lastName, phoneNo, address, email, password

const ModalForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        address: "",
        email: "",
        password: ""
    });

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    return (
        <div>
            <form>
                <label>First Name</label>
                <input type="text"      defaultValue="User value"   name="firstName"    value={formData.firstName}  onChange={handleInputChange} />
                <label>Last Name</label>
                <input type="text"      placeholder=""              name="lastName"     value={formData.lastName}   onChange={handleInputChange} />
                <label>Email</label>
                <input type="email"     placeholder=""              name="email"        value={formData.email}      onChange={handleInputChange} />
                <label>Phone No</label>
                <input type="text"      placeholder=""              name="phoneNo"      value={formData.phoneNo}    onChange={handleInputChange} />
                <label>Address</label>
                <input type="password"  placeholder=""              name="address"      value={formData.address}    onChange={handleInputChange} />
                {/* button from modal page  */}
            </form>
        </div>
    );
};

export default ModalForm;
