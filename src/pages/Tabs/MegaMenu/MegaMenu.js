import React, { useContext }  from "react";
import { HashLink }           from "react-router-hash-link";
import                             "./MegaMenu.css";
import { NavContext }         from "../../App";

const MegaMenu = () => {
  const { openAccordion, setOpenAccordion } = useContext(NavContext);
  return (
    <div className="mega-menu-container">
      <div className="menu">
        <div className="menu-column"> <HashLink onClick={() => setOpenAccordion("one")}   smooth to="/#home-internet"> <h3  className="menu-heading mb-3">Internet</h3>  </HashLink> </div>
        <div className="menu-column"> <HashLink onClick={() => setOpenAccordion("two")}   smooth to="/#technology"> <h3     className="menu-heading mb-3">Learning</h3>  </HashLink> </div>
        <div className="menu-column"> <HashLink onClick={() => setOpenAccordion("three")} smooth to="/#marketing"> <h3      className="menu-heading mb-3">Marketing</h3> </HashLink> </div>
        <div className="menu-column"> <HashLink onClick={() => setOpenAccordion("four")}  smooth to="/#car"> <h3            className="menu-heading mb-3">Car Parts</h3> </HashLink> </div>
      </div>
    </div>
  );
};

export default MegaMenu;
