import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../DashboardSidebar/DashboardSidebar";
// import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";

const DashboardLayout = () => {
    return (
        <div className="dashboard-margin">
            <div className="container-dashboard ">
                <div className="">
                    <Sidebar />
                </div>

                <div className="main-dashboard">
                    {/* <DashboardNavbar /> */}
                    <div className="main-dashboard-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
