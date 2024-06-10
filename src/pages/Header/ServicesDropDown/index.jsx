import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Link, useNavigate }                                    from "react-router-dom";
import { useAnimate, stagger, motion }                          from "framer-motion";
import { ServicesDD }                                           from "./servicesDropDownStyle";
import { SVGImages }                                            from "../../../config/images";
import { serviceTabs }                                          from "../../../utils/constants";
import { ServiceContext }                                       from "../../../App";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
        try {
            animate(".arrow",   { rotate: isOpen ? 180 : 0 },   { duration: 0.2 });
            animate( "ul", {
                clipPath: isOpen ? "inset(0% 0% 0% 0% round 10px)" : "inset(0% 0% 100% 0% round 10px)",
            }, {
                type: "spring",     bounce: 0,  duration: 0.5,
            });
            animate("li", isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }, {
                duration: 0.2,      delay: staggerMenuItems,
            });
        } catch (error) {
            console.error("Animation error: ", error);
            // Handle the error, maybe fallback to no animation
        }
    }, [isOpen, animate]);
    return scope;
}

const ServicesDropDown = ({ styleClass, closeMenuToggle = () => {} }) => {
    const [isOpen, setIsOpen]   = useState(false);
    const navigate              = useNavigate();
    const { setServiceId }      = useContext(ServiceContext);
    const wrapperRef            = useRef(null);
    const scope                 = useMenuAnimation(isOpen);

    const onClickHandler = useCallback(() => {
        setIsOpen(prev => !prev);
        if (!isOpen) navigate("/#services");
    }, [navigate, isOpen]);

    useEffect(() => {
        const handleClickOutside = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);                 // Bind the event listener
        return () => document.removeEventListener("mousedown", handleClickOutside); // Unbind the event listener on clean up
    }, [isOpen]);

    const onMenuItemClickHandler = useCallback((serviceId) => {
        closeMenuToggle();
        setIsOpen(false);
        if (setServiceId && navigate) {
            setServiceId(serviceId);
            navigate(`/#${serviceId}`);
        } else {
            console.error("Service context or navigation function is undefined.");
        }
        setTimeout(() => {
            const element = document.getElementById(serviceId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            } else {
                console.error("Element not found: ", serviceId);
                // Handle the error, perhaps fallback to a default behavior
            }
        }, 500);
    }, [closeMenuToggle, navigate, setServiceId]);

    return (
        <ServicesDD ref={wrapperRef}>
            <div className={`menu servicesMenu ${isOpen ? "active" : "notActive"}`} ref={scope}>
                <motion.button whileTap={{ scale: 1 }} onClick={onClickHandler}>
                    <Link to="/#services" className={styleClass}>                                   Services                        </Link>
                    <div className="arrow" style={{ transformOrigin: "50% 55%" }}>                  <SVGImages.ChevronDownIcon />   </div>
                </motion.button>

                <motion.ul initial="hidden" style={{ pointerEvents: isOpen ? "auto" : "none" }}>
                    {serviceTabs.map((service, index) => (
                        <motion.li key={index} onClick={() => onMenuItemClickHandler(service.id)}>  <service.icon />                <span>{service.label}</span>        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </ServicesDD>
    );
};

export default ServicesDropDown;