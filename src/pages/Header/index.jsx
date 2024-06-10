import { useContext, useEffect, useState } from "react";
import { Container, Image, Navbar, Offcanvas } from "react-bootstrap";
import { HeaderBar, MobileMenu, RespinsiveView, SiteLogo } from "./headerStyle";
import SiteNavBar from "./SiteNavBar";
import ProfileDropDown from "./ProfileDropDown";
import { Images } from "../../config/images";
import { UserContext } from "../../App";

const Header = () => {
    const [mouseScroll, setMouseScroll] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setMouseScroll(window.scrollY > 5);
        });
    }, []);

    return (
        <HeaderBar id="header" className={`${mouseScroll ? "scrolled" : ""}`}>
            <Navbar expand="md">
                <Container>
                    <SiteLogo className={`${mouseScroll ? "scrolled" : ""}`} to="/">
                        <Image src={Images.ata2goLogo} />
                    </SiteLogo>
                    <RespinsiveView className="desktop_only" desktop={+true}>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <SiteNavBar styleClass={`${mouseScroll ? "scrolled" : ""}`} />
                        </Navbar.Collapse>
                    </RespinsiveView>
                    <RespinsiveView className="mobile_only" mobile={+true}>
                        <MobileMenu>
                            {user?._id && <ProfileDropDown styleClass={`${mouseScroll ? "scrolled" : ""}`} />}
                            <MobileNav styleClass={`${mouseScroll ? "scrolled" : ""}`} />
                        </MobileMenu>
                    </RespinsiveView>
                </Container>
            </Navbar>
        </HeaderBar>
    );
};

const MobileNav = ({ styleClass }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar.Toggle onClick={handleShow} aria-controls={`offcanvasNavbar-expand-lg`} className={`toggleMenu ${styleClass}`}>
                <span></span>
                <span className="centerLine"></span>
                <span></span>
            </Navbar.Toggle>
            <Navbar.Offcanvas
                show={show}
                onHide={handleClose}
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        <Image src={Images.ata2goLogo} width={80} fluid />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SiteNavBar styleClass={"scrolleds"} onHide={handleClose} />
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </>
    );
};

export default Header;
