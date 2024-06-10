import React            from "react";
import { missionText }  from "./misson_en";
import "bootstrap/dist/css/bootstrap.min.css";

const Mission = () => {
  return (
    <>
      {/* Mission Section   */}

      <section id="mission" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-12">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2 text-center">
                        <h5 className="title-left">The Mission</h5>
                      </div>

                      {missionText?.map((data, i) => (
                        <p
                          key={i}
                          id="mission_en-content"
                          className="lead text-justify"
                        >
                          {data}
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
      {/* mission section  */}
    </>
  );
};

export default Mission;
