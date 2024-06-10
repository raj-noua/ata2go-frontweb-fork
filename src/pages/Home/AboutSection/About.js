import React          from "react";
import logo           from "../../../assets/images/img/ATA2GO-Arrow-Logo.png";
import aboutImage     from "../../../assets/images/img/business-handshake-background-flat-style_23-2147789647.avif";
import { aboutData }  from "./about_en";

const About = () => {
  return (
    <>
      {/* <!-- About Section  --> */}

      <section id="about" className="about-mf sect-pt4 route">
        {/* <MegaMenu /> */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div className="col-sm-6 col-md-5">
                      <div className="about-img my-auto">
                        <img
                          src={logo}
                          className="img-fluid rounded b-shadow-a w-100"
                          alt=""
                        />
                      </div>
                      <div className="about-img">
                        <img
                          src={aboutImage}
                          className="img-fluid rounded b-shadow-a w-100 mt-5"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2 text-center">
                        <h5 className="title-left">About US</h5>
                      </div>

                      {aboutData?.map((item, index) => (
                        <p
                          key={index}
                          id="aboutus_en-content"
                          className="lead text-justify"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About Section End  --> */}
    </>
  );
};

export default About;
