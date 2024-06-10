import React, { useContext, useEffect, useState } from "react";
import "../DashboardLayout/DashboradLayout.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaSignOutAlt,
  FaVideo,
  FaWifi,
  FaUsers,
  FaHome,
  FaTools,
} from "react-icons/fa";
import { DiTechcrunch } from "react-icons/di";
import logo from "../../../assets/images/img/ATA2GO-Arrow-Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { BiCategory } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobileDevice) {
      setIsOpen(false); // Set to false for mobile devices
    }
  }, []);
  const menuItem = [
    {
      path: "/settings",
      name: "Settings",
      icon: <FaUserAlt />,
    },
    {
      path: "/subscriptions",
      name: "Subscriptions",
      icon: <FaUserAlt />,
    },
    {
      path: "/dashboard/user",
      name: "Manage Users",
      icon: <FaUsers />,
    },
    {
      path: "/dashboard/internet",
      name: "Home Internet",
      icon: <FaWifi />,
    },
    {
      path: "/dashboard/manage-category",
      name: "Manage Categories",
      icon: <BiCategory />,
    },
    {
      path: "/dashboard/technology",
      name: "Technology & Courses",
      icon: <DiTechcrunch />,
    },
    {
      path: "/dashboard/video-upload",
      name: "Manage Videos",
      icon: <FaVideo />,
    },
    {
      path: "/dashboard/car-parts",
      name: "Manage Car Parts",
      icon: <FaTools />,
    },
    {
      path: "/dashboard/car-parts-request",
      name: "Manage Car Parts",
      icon: <FaTools />,
    },
    // {
    //   path: "/dashboard/orders",
    //   name: "Manage Order",
    //   icon: <FaShoppingBag />,
    // },
    // {
    //   path: "/dashboard/service",
    //   name: "Manage Service",
    //   icon: <FaRegChartBar />,
    // },

    {
      path: "/",
      name: "Home Page",
      icon: <FaHome />,
    },
    // {
    //   path: "/logout",
    //   name: "Logout",
    //   icon: <FaSignOutAlt />,
    // },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setUser({});
  };

  return (
    <div>
      <div className="container-dashboard">
        <div style={{ width: isOpen ? "260px" : "70px" }} className="sidebar">
          <div className="top_section">
            <img
              src={logo}
              alt="Logo..."
              className="logo"
              style={{ display: isOpen ? "block" : "none" }}
            />
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="">
            {(user?.role === "admin" ||
              user?.role === "power" ||
              user?.role === "billing" ||
              user?.role === "audit" ||
              user?.role === "support") && (
              <NavLink
                to={"/dashboard/user"}
                className="dashboard-link"
                activeclassName="active"
              >
                <div className="icon">
                  <FaUsers />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Manage Users
                </div>
              </NavLink>
            )}

            {(user?.role === "admin" ||
              user?.role === "power" ||
              user?.role === "billing" ||
              user?.role === "support") && (
              <>
                <NavLink
                  to={"/dashboard/internet"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <FaWifi />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Home Internet
                  </div>
                </NavLink>

                <NavLink
                  to={"/dashboard/manage-category"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <BiCategory />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Manage Categories
                  </div>
                </NavLink>
                

                <NavLink
                  to={"/dashboard/technology"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <DiTechcrunch />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Technology & Courses
                  </div>
                </NavLink>
              </>
            )}

            {(user?.role === "admin" ||
              user?.role === "power" ||
              user?.role === "support") && (
              <>
                <NavLink
                  to={"/dashboard/video-upload"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <FaVideo />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Manage Videos
                  </div>
                </NavLink>

                <NavLink
                  to={"/dashboard/car-parts"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <FaTools />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Manage Car Parts
                  </div>
                </NavLink>

                <NavLink
                  to={"/dashboard/manage-cars"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <FaTools />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Manage Cars
                  </div>
                </NavLink>

                <NavLink
                  to={"/dashboard/car-parts-request"}
                  className="dashboard-link"
                  activeclassName="active"
                >
                  <div className="icon">
                    <FaTools />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    Manage Car Requests
                  </div>
                </NavLink>
              </>
            )}

            <NavLink
              to={"/settings"}
              className="dashboard-link"
              activeclassName="active"
            >
              <div className="icon">
                <FaUserAlt />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Settings
              </div>
            </NavLink>

            <NavLink
              to={"/subscriptions"}
              className="dashboard-link"
              activeclassName="active"
            >
              <div className="icon">
                <FaUserAlt />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Subscriptions
              </div>
            </NavLink>

            <NavLink
              to={"/"}
              className="dashboard-link"
              activeclassName="active"
            >
              <div className="icon">
                <FaHome />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Home Page
              </div>
            </NavLink>

            <NavLink
              className="dashboard-link-last"
              key={4}
              // activeclassName="active"
              onClick={handleLogout}
            >
              <div className="icon">
                <FaSignOutAlt />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Logout
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
