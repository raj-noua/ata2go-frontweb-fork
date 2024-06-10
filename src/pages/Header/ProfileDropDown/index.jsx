import { useState, useEffect, useRef, useContext }  from "react";
import { useNavigate }                              from "react-router-dom";
import { useAnimate, stagger, motion }              from "framer-motion";
import { ProfileDD }                                from "./profileDropDownStyle";
import { SVGImages }                                from "../../../config/images";
import { UserContext }                              from "../../../App";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
        try {
            animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });
            animate("ul",{
                    clipPath: isOpen ? "inset(0% 0% 0% 0% round 10px)" : "inset(10% 50% 90% 50% round 10px)",
            }, {
                type: "spring",      bounce: 0,     duration: 0.5,
            });
            animate("li", isOpen ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.3, filter: "blur(5px)" }, {
                duration: 0.2,
                delay: staggerMenuItems,
            });
        } catch (error) {
            console.error("Animation error: ", error);
            // Handle the error, maybe fallback to no animation
        }
    }, [isOpen, animate]);
    return scope;
}

export default function ProfileDropDown({ styleClass }) {
    const [isOpen, setIsOpen]   = useState(false);
    const scope                 = useMenuAnimation(isOpen);
    const wrapperRef            = useRef(null);
    const navigate              = useNavigate();
    const {user, setUser }      = useContext(UserContext);


    useEffect(() => {
        const handleClickOutside = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                if (isOpen) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, isOpen]);

    const onClickHandler = () => setIsOpen(!isOpen);

    const onMenuItemClickHandler = sitePage => {
        setIsOpen(false);
        navigate(sitePage);
    };

    const logoutHandler = () => {
        setIsOpen(false);
        localStorage.removeItem("token");
        setUser({});
        navigate("/");
    };

    return (
        <ProfileDD ref={wrapperRef}>
            <div className="menu profileMenu" ref={scope}>
                
                <motion.button whileTap={{ scale: 1 }} onClick={onClickHandler} className={styleClass}>
                    <SVGImages.UserCircleIcon className="userProfile" />
                    
                    <div className="arrow" style={{ transformOrigin: "50% 55%" }}>  <SVGImages.ChevronDownIcon />   </div>
                </motion.button>
                <span style={{ color: 'white' }}>{`${user?.firstName}`}</span>
                <ul
                    style={{    pointerEvents: isOpen ? "auto" : "none",        clipPath: "inset(10% 50% 90% 50% round 10px)",  }}>
                    <li onClick={() => onMenuItemClickHandler("/settings")}>        <SVGImages.UserIcon />              <span>Settings</span>    </li>
                    <li onClick={() => onMenuItemClickHandler("/subscriptions")}>   <SVGImages.SubscriptionsIcon />     <span>Subs</span>    </li>
                    <li onClick={logoutHandler}>                                    <SVGImages.LogoutIcon />            <span>Disconnect</span>    </li>
                </ul>
            </div>
        </ProfileDD>
    );
}
