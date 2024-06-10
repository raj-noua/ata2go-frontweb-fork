import React            from "react";
import serviceImage     from "../../../../assets/images/img/arlington-research-kN_kViDchA0-unsplash.jpg";
import { servicesText } from "../_textData/services_en";
import                       "bootstrap/dist/css/bootstrap.min.css";
import                       "../../../../App.css";
import Accordion        from "./Accordion";

const Services = () => {
  return (
    <>
      {/* / Section Services Start / */}
      <section
        id="service"
        className="services-mf paralax-mf bg-image sect-mt4 route"
        style={{ backgroundImage: `url(${serviceImage}` }}
      >
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row box-shadow-full">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">Services</h3>
                <div className="line-mf"></div>
                {servicesText?.map((data, i) => (
                  <p
                    key={i}
                    id="services_en-content"
                    className="lead text-justify"
                  >
                    {data}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* slide down section  */}
          <div className="box-shadow-full">
            <Accordion />

            {/* <!-- className="box-shadow-full"					--> */}
          </div>
          {/* <!-- Slide down section End  --> */}
          {/* <!-- className="container"							--> */}
        </div>
        {/* <!-- id="service"								--> */}
      </section>
      {/* <!--/ Section Services End /--> */}
    </>
  );
};

export default Services;
