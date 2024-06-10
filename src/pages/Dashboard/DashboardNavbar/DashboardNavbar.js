import React from "react";
import { BsSearch } from "react-icons/bs";

import "./DashboardNavbar.css";

const DashboardNavbar = () => {
    return (
        <div className="dashboard-navbar">
            <div className=" d-flex justify-content-between align-items-center w-100">

               
                <div className="search-bar me-auto ms-3">
                    <input type="text" name="" placeholder="search" id="" />
                    <span className="search-icon">
                        <BsSearch />
                    </span>
                </div>
            

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
        </div>
    );
};

export default DashboardNavbar;
