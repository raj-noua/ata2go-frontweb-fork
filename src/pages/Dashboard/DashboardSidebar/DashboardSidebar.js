import "../DashboardLayout/DashboradLayout.css";
import logo from "../../../assets/images/ata2goLogo.png";
import { UserContext } from "../../../App";
import { DiTechcrunch } from "react-icons/di";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import React, { useContext, useEffect, useState } from "react";
import {
    FaBars,
    FaUserAlt,
    FaSignOutAlt,
    FaVideo,
    FaWifi,
    FaUsers,
    FaHome,
    FaTools,
    FaTruckPickup,
    FaList,
    FaReceipt,
} from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobileDevice) {
            setIsOpen(false); // Set to false for mobile devices
        }
    }, []);

    const toggle = () => setIsOpen(!isOpen);
    const hasRole = roles => roles.includes(user?.role);
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear user session or token
        setUser({}); // Reset user state
        navigate("/"); // Redirect to the homepage or login page
    };

    const NavItem = ({ to, icon: Icon, text, isOpen }) => (
        <NavLink to={to} className="dashboard-link" activeclassname="active">
            <div className="icon">
                <Icon />
            </div>
            {isOpen && <div className="link_text">{text}</div>}
        </NavLink>
    );

    const NavItemLogout = ({ icon: Icon, text, isOpen, onClick }) => {
        return (
            <div className="dashboard-link-last" onClick={onClick}>
                <div className="icon">
                    <Icon />
                </div>
                {isOpen && <div className="link_text">{text}</div>}
            </div>
        );
    };

    return (
        <div className="container-dashboard">
            <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
                <div className="top_section">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                        style={{ display: isOpen ? "block" : "none", height: "28px", width: "40px" }}
                    />
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                <div className="">
                    {hasRole(["admin", "power", "billing", "audit", "support"]) && (
                        <NavItem to="/dashboard/user" icon={FaUsers} text="Users [All]" isOpen={isOpen} />
                    )}

                    {hasRole(["admin", "power", "billing", "audit", "support"]) && (
                        <NavItem to="/dashboard/billing" icon={FaReceipt} text="Billings" isOpen={isOpen} />
                    )}

                    {hasRole(["admin", "power", "support"]) && (
                        <NavItem to="/dashboard/affiliate" icon={FaUsers} text="Affiliates" isOpen={isOpen} />
                    )}

                    {hasRole(["admin", "power", "billing", "support"]) && (
                        <>
                            <NavItem to="/dashboard/internet" icon={FaWifi} text="Internet" isOpen={isOpen} />
                            <NavItem to="/dashboard/technology" icon={DiTechcrunch} text="Courses" isOpen={isOpen} />
                            <NavItem to="/dashboard/manage-category" icon={BiCategory} text="Mktg-Interests" isOpen={isOpen} />
                        </>
                    )}

                    {hasRole(["admin", "power", "affiliate", "support"]) && (
                        <NavItem to="/dashboard/video-upload" icon={FaVideo} text="Mktg-Videos" isOpen={isOpen} />
                    )}

                    {hasRole(["admin", "power", "support"]) && (
                        <>
                            <NavItem to="/dashboard/manage-cars" icon={FaTruckPickup} text="Vehicle-List" isOpen={isOpen} />
                            <NavItem to="/dashboard/car-parts" icon={FaTools} text="Parts-List" isOpen={isOpen} />
                            <NavItem to="/dashboard/car-parts-request" icon={FaList} text="Parts-Requests" isOpen={isOpen} />
                        </>
                    )}

                    <NavItem to="/settings" icon={FaUserAlt} text="Settings" isOpen={isOpen} />
                    <NavItem to="/subscriptions" icon={FaUserAlt} text="Subscriptions" isOpen={isOpen} />
                    <NavItem to="/" icon={FaHome} text="Home" isOpen={isOpen} />
                    <NavItemLogout icon={FaSignOutAlt} text="Logout" isOpen={isOpen} onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
