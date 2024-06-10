import React, { useContext }        from "react";
import { Navigate, useLocation }    from "react-router-dom";
import { SiteLoader, UserContext }  from "../../App";

const RequiredDashboardVideo = ({ children }) => {
    const location          = useLocation();
    const { user, loading } = useContext(UserContext);
    const token             = localStorage.getItem("token");
    const allowedRoles      = ["admin", "power", "support", "affiliate"];

    if (loading)                            { return <SiteLoader />; }

    if (!token || !user)                    { return <Navigate to="/signin" state={{ from: location }} replace />; }

    if (allowedRoles.includes(user?.role)) { return children; }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default RequiredDashboardVideo;
