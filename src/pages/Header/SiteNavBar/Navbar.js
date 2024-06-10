import React, { useContext, useState }  from "react";
import { Link, useNavigate }            from "react-router-dom";
import { BiChevronDown }                from "react-icons/bi";
import { HashLink }                     from "react-router-hash-link";
import                                       "bootstrap/dist/css/bootstrap.min.css";
import MegaMenu                         from "../../Tab/MegaMenu/MegaMenu";
import logo                             from "../../../assets/images/img/logo.png";
import avatar                           from "../../../assets/images/img/user.png";
import { useScrollPosition }            from "../../../hooks/useScrollPosition";
import                                       "../../../App.css";
import { UserContext }                  from "../../../App";

const Navbar = () => {
  const scrollPosition                  = useScrollPosition();
  const [showAvatar, setShowAvatar]     = useState(false);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const { user, setUser }               = useContext(UserContext);
  const navigate                        = useNavigate();

  const handleClick = () => {
    window.scrollTo({   top: 0,   behavior: "smooth",   });
    setToggleNavbar(!toggleNavbar);
  };

  const handleLogout = () => {
    setShowAvatar(false);
    localStorage.removeItem("token");
    setUser({});
    navigate("/");
  };

  return (
    <>
      {/* / Nav Start / */}
      <nav
        className={
          toggleNavbar || scrollPosition > 50
            ? "navbar navbar-b navbar-trans navbar-expand-md  py-0 navbar-reduce"
            : "navbar navbar-b navbar-trans navbar-expand-md py-0 "
        }
        id="mainNav "
        style={{ background: "white" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand js-scroll">    <img src={logo} alt="Logo..." />      </Link>
          <button
            onClick={() => setToggleNavbar(!toggleNavbar)}
            className={
              toggleNavbar ? "navbar-toggler " : "navbar-toggler collapsed"
            }
            type="button"
            data-toggle="collapse"
            data-target="#navbarDefault"
            aria-controls="navbarDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className={
              toggleNavbar
                ? "navbar-collapse collapse justify-content-end show"
                : "navbar-collapse collapse justify-content-end "
            }
            id="navbarDefault"
          >
            <ul className="navbar-nav">
              <li                                           className="nav-item" onClick={handleClick}>     <Link to="/" className="nav-link js-scroll"> Home </Link>   </li>
              {user?.role === "affiliate" ? (
                <>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth className="nav-link js-scroll">                  Agreement   </HashLink>  </li>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth className="nav-link js-scroll">                  Billing     </HashLink>  </li>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="#" class="nav-link">                         Engagement  </HashLink>  </li>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="#" className="nav-link js-scroll">           Report      </HashLink>  </li>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="/#contact" className="nav-link js-scroll">   Contact     </HashLink>  </li>
                </>
              ) : (
                <>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="/#mission" className="nav-link js-scroll">   Mission     </HashLink>  </li>

                  <li className="nav-item submenu-link d-flex align-items-center">    <HashLink smooth     class="nav-link dropdown-toggle" >           Services    </HashLink>
                    <div className="mega-menu-wrapper">   <div onClick={() => setToggleNavbar(false)}>  <MegaMenu />  </div>      </div>                                         </li>

                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="/#privacy" class="nav-link">                 Privacy     </HashLink>  </li>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="/#about" className="nav-link js-scroll">     About       </HashLink>  </li>
                  <li onClick={() => setToggleNavbar(false)}  className="nav-item" >  <HashLink smooth to="/#contact" className="nav-link js-scroll">   Contact     </HashLink>  </li>
                </>
              )}
              {user?._id ? (
                <>
                  <li className="nav-item">     <Link to="/videos" className="nav-link js-scroll"> Video   </Link>    </li>  

                  {["admin", "power", "support", "audit", "affiliate"].includes(user?.role) && (
                        <li onClick={() => setToggleNavbar(false)} className="nav-item">
                            <Link to="/dashboard" className="nav-link js-scroll">  {user?.role === 'affiliate' ? 'Promoboard' : 'Dashboard'} </Link>  </li> )
                  }

                  <li className="nav-item avatar-li">
                    <span className="avatar" onClick={() => setShowAvatar(!showAvatar)} >   <img className=" shadow-4-strong avatar-image" alt="avatar2" src={avatar} />   </span>
                    {showAvatar && (
                      <div className="profile-information">
                        <Link to={"/settings"}   onClick={() => { setShowAvatar(false); navigate("/settings"); }}   className="profile-information-link text-decoration-none">  Settings  </Link>
                        <Link to={"/subscriptions"}   onClick={() => { setShowAvatar(false); navigate("/subscriptions"); }}   className="profile-information-link text-decoration-none">  Subscriptions  </Link>
                        <Link onClick={handleLogout} className=" text-decoration-none profile-information-link" > Logout  </Link>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li   className="nav-item"  >   <Link to="/sign-in" className="nav-link js-scroll">  Sign In   </Link>   </li>
                </>
              )}

              {/* <li className="nav-item">
                <Link className="nav-link">FR</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* / Nav End / */}
    </>
  );
};

export default Navbar;
