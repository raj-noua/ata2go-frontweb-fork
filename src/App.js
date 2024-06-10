import React, { createContext, useEffect, useState } from "react";
import { ToastContainer }                            from "react-toastify";
import                                                    "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation }                from "react-router-dom";
import { Image }                                     from "react-bootstrap";
import                                                    "bootstrap/dist/css/bootstrap.min.css";

import axios                                         from "axios";
import                                                    "./App.scss";
import Header                                        from "./pages/Header";
import ScrollToHashElement                           from "./components/UI/ScrollToHashElement";

import { Images }                                    from "./config/images";
import { baseUrl }                                   from "./services/api";

import VerifyEmail                                   from "./pages/Auth/VerifyEmail/VerifyEmail";
import DashboardLayout                               from "./pages/Dashboard/DashboardLayout/DashboardLayout";
import ManageAffiliate                               from "./pages/Dashboard/DashboardPages/ManageAffiliates/ManageAffiliates";
import ManageCars                                    from "./pages/Dashboard/DashboardPages/ManageVehicle/ManageVehicle";
import ManageCourses                                 from "./pages/Dashboard/DashboardPages/ManageCourses/ManageCourses";
import ManageInterests                               from "./pages/Dashboard/DashboardPages/ManageInterests/ManageInterests";
import ManageInternet                                from "./pages/Dashboard/DashboardPages/ManageInternet/HomeInternet";
import ManageOrder                                   from "./pages/Dashboard/DashboardPages/ManageOrders/ManageOrder";
import ManagePartsList                               from "./pages/Dashboard/DashboardPages/ManagePartsList/ManagePartsList";
import ManagePartsRequests                           from "./pages/Dashboard/DashboardPages/ManagePartsRequests/ManagePartsRequests";
import ManageServices                                from "./pages/Dashboard/DashboardPages/ManageServices/ManageServices";
import ManageUser                                    from "./pages/Dashboard/DashboardPages/ManageUsers/ManageUser";
import ManageVideos                                  from "./pages/Dashboard/DashboardPages/ManageVideoPromos/ManageVideoPromos";
import UpdateProfile                                 from "./pages/Dashboard/DashboardPages/UpdateProfile/UpdateProfile";
import ManageBilling                                    from "./pages/Dashboard/DashboardPages/ManageBilling/ManageBilling";


import RequiredAffiliate                             from "./components/Authentication/RequiredAffiliate";
import RequiredDashboard                             from "./components/Authentication/RequiredDashboard";
import RequiredDashboardVideo                        from "./components/Authentication/RequiredDashboardVideo";
import RequiredPkg                                   from "./components/Authentication/RequiredPkg";
import RequiredUser                                  from "./components/Authentication/RequiredUser";
import RequiredUsersAuth                             from "./components/Authentication/RequiredUsersAuth";




const Home              = React.lazy(() => import("./pages/Home/index"));
const SignIn            = React.lazy(() => import("./pages/Auth/SignIn/index"));
const SignUp            = React.lazy(() => import("./pages/Auth/SignUp"));
const ForgotPassword    = React.lazy(() => import("./pages/Auth/ForgotPassword"));
const Settings          = React.lazy(() => import("./pages/Settings"));
const Subscriptions     = React.lazy(() => import("./pages/Subscriptions"));
const ResetPassword     = React.lazy(() => import("./pages/Auth/ForgotPassword/ResetPassword"));
const NewPassword       = React.lazy(() => import("./pages/Auth/ForgotPassword/NewPassword"));
const Page404           = React.lazy(() => import("./pages/404Page"));
const MyPromo    = React.lazy(() => import("./pages/MyPromo"));

export const UserContext    = createContext();
export const ServiceContext = createContext();
function App() {
    const [user, setUser]           = useState(null);
    const [refetch, setRefetch]     = useState(0);
    const token                     = localStorage.getItem("token");
    const [loading, setLoading]     = useState(false);
    const [show, setShow]           = useState(false);
    const handleClose               = () => setShow(false);
    const handleShow                = () => setShow(true);
    const [serviceId, setServiceId] = useState(1);
    const location                  = useLocation();
    const currentPath               = location.pathname;
    useEffect(() => {
        if (token) {
            setLoading(true);
            axios
                .get(baseUrl + "/auth/autoLogin", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setUser(res.data.result);
                    setLoading(false);
                })
                .catch(error => console.log(error));
        }
    }, [token, refetch]);
    return (
        <div className="App">
            <ServiceContext.Provider value={{ serviceId, setServiceId }}>
                <UserContext.Provider value={{ user, setUser, refetch, setRefetch, loading }}>
                    <ScrollToHashElement />
                    {!currentPath.split("/").includes("dashboard") && <Header />}
                    {/* <Layout> */}
                    <Routes>
                        <Route path="/"                     element={<LazySuspenseRoute>                    <Home />                            </LazySuspenseRoute>} />
                        <Route path="/signin"               element={<LazySuspenseRoute>                    <SignIn />                          </LazySuspenseRoute>} />
                        <Route path="/signup"               element={<LazySuspenseRoute>                    <SignUp />                          </LazySuspenseRoute>} />
                        <Route path="/forget-password"      element={<LazySuspenseRoute>                    <ForgotPassword />                  </LazySuspenseRoute>} />
                        <Route path="/verify-email/:email"  element={<LazySuspenseRoute>                    <VerifyEmail />                     </LazySuspenseRoute>} />
                        <Route path="/verify-code/:email"   element={<LazySuspenseRoute>                    <ResetPassword />                   </LazySuspenseRoute>} />
                        <Route path="/update-pass/:id"      element={<LazySuspenseRoute>                    <NewPassword />                     </LazySuspenseRoute>} />
                        <Route path="/settings"             element={<LazySuspenseRoute>    <RequiredUser>  <Settings />        </RequiredUser> </LazySuspenseRoute>} />
                        <Route path="/subscriptions"        element={<LazySuspenseRoute>    <RequiredUser>  <Subscriptions />   </RequiredUser> </LazySuspenseRoute>} />
                        <Route path="/videos"               element={<LazySuspenseRoute>    <RequiredUser>  <MyPromo />  </RequiredUser> </LazySuspenseRoute>} />

                        {/* dashboard Routes */}
                        <Route
                            path="/dashboard"               element={<LazySuspenseRoute>    <RequiredDashboard><DashboardLayout /></RequiredDashboard></LazySuspenseRoute> }>
                            <Route path="user"              element={<LazySuspenseRoute>    <RequiredUsersAuth><ManageUser show={show} handleShow={handleShow} handleClose={handleClose} /></RequiredUsersAuth></LazySuspenseRoute>} />
                            <Route path="billing"           element={<LazySuspenseRoute>    <RequiredUsersAuth><ManageBilling show={show} handleShow={handleShow} handleClose={handleClose} /></RequiredUsersAuth></LazySuspenseRoute>} />
                            <Route path="affiliate"         element={<RequiredAffiliate>                    <ManageAffiliate />             </RequiredAffiliate>} />
                            <Route path="video-upload"      element={<RequiredDashboardVideo>               <ManageVideos />                </RequiredDashboardVideo>} />
                            <Route path="manage-category"   element={<RequiredPkg>                          <ManageInterests />             </RequiredPkg>} />
                            <Route path="service"           element={<RequiredPkg>                          <ManageServices />              </RequiredPkg>} />
                            <Route path="orders"            element={<RequiredPkg>                          <ManageOrder />                 </RequiredPkg>} />
                            <Route path="internet"          element={<RequiredPkg>                          <ManageInternet />              </RequiredPkg>} />
                            <Route path="technology"        element={<RequiredPkg>                          <ManageCourses />               </RequiredPkg>} />
                            <Route path="car-parts"         element={<RequiredDashboardVideo>               <ManagePartsList />              </RequiredDashboardVideo>} />
                            <Route path="manage-cars"       element={<RequiredDashboardVideo>               <ManageCars />                  </RequiredDashboardVideo>} />
                            <Route path="update-profile/:id" element={<RequiredDashboardVideo>              <UpdateProfile />               </RequiredDashboardVideo>} />
                            <Route path="car-parts-request" element={<RequiredDashboardVideo>               <ManagePartsRequests />       </RequiredDashboardVideo>} />
                        </Route>
                        <Route path="*"                     element={<LazySuspenseRoute><Page404 /></LazySuspenseRoute>} />

                    </Routes>
                </UserContext.Provider>
            </ServiceContext.Provider>
            <ToastContainer />
        </div>
    );
}

const LazySuspenseRoute = ({ children }) => {
    return <React.Suspense fallback={<SiteLoader />}>{children}</React.Suspense>;
};
export const SiteLoader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <div className="logoBox">
                <Image src={Images.ata2goLogo} width={120} fluid />
            </div>
        </div>
    );
};

export default App;
