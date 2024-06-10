import React                  from "react";
import privacyImage           from "../../../assets/images/img/security-shield-icon-abstract-protection-symbol-vector-illustration-logo-design-element_118339-1950.avif";
import { privacyPolicyData }  from "./privacy_en";
const Privacy = () => {
  return (
    <>
      {/* <!--/ Section Privacy Start /--> */}
      <section id="privacy" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="col-sm-12">
            <div className="box-shadow-full">
              <div className="row">
                <div className="col-md-6">
                  <div className="about-me pt-4 pt-md-0">
                    <div className="title-box-2 text-center">
                      <h5 className="title-left">Privacy</h5>
                    </div>
                    {privacyPolicyData?.map((data, i) => (
                      <p key={i} id="privacy_en-content" className="lead ">
                        {data}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="about-img privacy-image my-auto">
                    <img
                      src={privacyImage}
                      className="img-fluid rounded b-shadow-a w-100"
                      alt=""
                    />
                  </div>
                </div>
                {/* <!-- className="row"						--> */}
              </div>
              {/* <!-- className="box-shadow-full"			--> */}
            </div>
            {/* <!-- className="col-sm-12"					--> */}
          </div>
          {/* <!-- className="container"					--> */}
        </div>
        {/* <!-- id="privacy"						--> */}
      </section>
      {/* <!--/ Section Privacy End /--> */}
    </>
  );
};

export default Privacy;
