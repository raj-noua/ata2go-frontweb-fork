import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Link, useNavigate }    from "react-router-dom";
import { LoginButton, SiteNav } from "./siteNavStyle";
import ServicesDropDown         from "../ServicesDropDown";
import ProfileDropDown          from "../ProfileDropDown";
import { UserContext }          from "../../../App";
import { SVGImages }            from "../../../config/images";

const NavItem = React.memo(({ sectionId, children, onMenuItemSelect }) => (
    <Link
        className={sectionId ? "active nav-link" : "nav-link"}
        to={["videos", "dashboard"].includes(sectionId) ? `/${sectionId}` : `/#${sectionId}`}
        onClick={() => onMenuItemSelect(sectionId)}>
        {children}
    </Link>
));

const SiteNavBar = ({ styleClass, onHide = () => {} }) => {
    const [activeSection, setActiveSection] = useState("banner");
    const { user }                          = useContext(UserContext);
    const sectionsRef                       = useRef(null);

    const handleScroll = useCallback(() => {
        const pageYOffset = window.scrollY;
        const newActiveSection = Array.from(sectionsRef.current).find(
            section => pageYOffset >= section.offsetTop && pageYOffset < section.offsetTop + section.offsetHeight
        )?.id;

        if (newActiveSection && newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
        }
    }, [activeSection]);

    useEffect(() => {
        sectionsRef.current = document.querySelectorAll("section");
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const onMenuItemSelectHandler = useCallback(
        sectionId => {
            onHide();
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 60;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        },
        [onHide]
    );

    return (
        <SiteNav className={`ms-auto my-2 my-lg-0 ${styleClass}`} navbarScroll>
            <NavItem sectionId="banner" onMenuItemSelect={onMenuItemSelectHandler}>
                <SVGImages.HomeIcon />
            </NavItem>
            <ServicesDropDown styleClass={activeSection === "services" ? "active nav-link" : "nav-link"} closeMenuToggle={onHide} />
            <NavItem sectionId="privacy" onMenuItemSelect={onMenuItemSelectHandler}>
                Privacy
            </NavItem>
            <NavItem sectionId="mission" onMenuItemSelect={onMenuItemSelectHandler}>
                Mission
            </NavItem>
            <NavItem sectionId="about" onMenuItemSelect={onMenuItemSelectHandler}>
                About
            </NavItem>
            <NavItem sectionId="contact" onMenuItemSelect={onMenuItemSelectHandler}>
                Contact
            </NavItem>
            {user?._id && user.role !== "affiliate" && (
                <NavItem sectionId="videos" onMenuItemSelect={onMenuItemSelectHandler}>
                    MyPromo
                </NavItem>
            )}
            {["admin", "power", "support", "audit", "affiliate"].includes(user?.role) && (
                <NavItem sectionId="dashboard" onMenuItemSelect={onMenuItemSelectHandler}>
                    Dashboard
                </NavItem>
            )}
            <UserDropdownBox isScrolled={styleClass} onHide={onHide} />
        </SiteNav>
    );
};

const UserDropdownBox = ({ isScrolled, onHide }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return user?._id ? (
        <ProfileDropDown styleClass={isScrolled} />
    ) : (
        <LoginButton
            variant="primary"
            onClick={() => {
                navigate("/signin");
                onHide(); // Close the menu when Login2 button is clicked
            }}>
            <span>Login</span>
        </LoginButton>
    );
};

export default SiteNavBar;
