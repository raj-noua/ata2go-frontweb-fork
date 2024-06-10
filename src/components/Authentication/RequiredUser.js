import React, { useContext }        from "react";
import { Navigate, useLocation }    from "react-router-dom";
import { SiteLoader, UserContext }  from "../../App";

const RequiredUser  = ({ children }) => {
    const location          = useLocation();
    const { user, loading } = useContext(UserContext);
    const token             = localStorage.getItem("token");

    if (loading)            { return <SiteLoader />; }

    if (!user && !token)    { return <Navigate to="/signin" state={{ from: location }} replace />; }

    return children;
};

export default RequiredUser;
