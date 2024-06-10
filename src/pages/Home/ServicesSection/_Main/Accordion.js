import React, { useContext, useState }                from "react";
import { BsCloudDownloadFill, BsFillCloudUploadFill } from "react-icons/bs";
import { HiWifi }                                     from "react-icons/hi";
import { TiTick }                                     from "react-icons/ti";
import { FaUserGraduate, FaUserSecret, FaUserTie }    from "react-icons/fa";
import { Button }                                     from "react-bootstrap";
import { useNavigate }                                from "react-router-dom";
import { coursesData }                                from "../_textData/courses_en";
import { marketingData }                              from "../_textData/marketing_en";
import { autopartsData }                              from "../_textData/autoparts_en";
import technologyImage1                               from "../../../../assets/images/img/Microsoft-Word-Logo.png";
import technologyImage2                               from "../../../../assets/images/img/Microsoft_Excel-Logo.wine.png";
import technologyImage3                               from "../../../../assets/images/img/sm_5acd1797b5783.jpg";
import carPartsImage                                  from "../../../../assets/images/img/istockphoto-1174548417-612x612.jpg";
import { useGetAllInternetsQuery }                    from "../../../../services/internetApi";
import { useGetAllCoursesQuery }                      from "../../../../services/courseApi";
import { NavContext, UserContext }                    from "../../../../App";
const Accordion = () => {
  const {user} = useContext(UserContext)
  const [selectedService, setSelectedService] = useState({});
  const { data, isLoading } = useGetAllInternetsQuery();
  const { data: data1, isLoading: isLoading1 } = useGetAllCoursesQuery();
  const navigate = useNavigate()
  const {openAccordion, setOpenAccordion} = useContext(NavContext)
  console.log(openAccordion)

  return (
    <div id="service">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item" id="home-internet">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded={openAccordion === 'one' ? true : false}
              aria-controls="collapseOne"
            >
              Home Internet
            </button>
          </h2>
          <div
            id="collapseOne"
            class={`accordion-collapse collapse ${openAccordion === 'one' ? 'show' : ''}`}
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="">
                <p className="subtitle-a text-justify mt-2">
                  With ATA2GO, sign up for the best internet packages with $0
                  startup fees!
                  <h6>Each package is commitment-free and includes:</h6>
                  <ul>
                    <li>Unlimited downloads</li>
                    <li>Free service installation</li>
                    <li>Free modem rental and included Wifi*</li>
                  </ul>
                </p>

                <div className="row justify-content-center">
                  {data?.data?.map((d) => (
                    <div
                      onClick={() => setSelectedService(d)}
                      className="col-8 col-sm-4 col-md-4 col-lg-2"
                    >
                      <div className="service-box">
                        <h4 className="text-center pt-2">{d?.downloadSpeed}</h4>
                        <h5 className="text-center">Mbps</h5>
                        <hr />
                        <div className="downup d-flex justify-content-evenly align-items-center">
                          <div className="download d-inline-block">
                            <BsCloudDownloadFill
                              className="mx-auto d-block mb-2"
                              style={{ fontSize: "25px" }}
                            />
                            <h6>{d?.downloadSpeed}Mbps</h6>
                          </div>
                          <div className="upload d-inline-block">
                            <BsFillCloudUploadFill
                              className="mx-auto d-block mb-2"
                              style={{ fontSize: "25px" }}
                            />
                            <h6>{d?.uploadSpeed}Mbps</h6>
                          </div>
                        </div>
                        <div className="wifi text-center">
                          <HiWifi
                            className="mx-auto d-block mb-2 mt-2"
                            style={{ fontSize: "25px" }}
                          />
                        </div>
                        <div className="rates text-center p-3">
                          <h1 className="d-inline-block">{d?.price}</h1>
                          <div className="d-inline-block">
                            <div>
                              <sup>.00$</sup>
                            </div>
                            <div>
                              <sub>/mois</sub>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 10 Mbps Option */}
                    </div>
                  ))}

                  {/* <!-- className="row justify-content-center"		--> */}
                  {selectedService?.downloadSpeed && (
                    <div className="service-details">
                      <h5>Package Information</h5>
                      {selectedService?.extraInfo?.map((e, i) => (
                        <>
                          {i + 1}. {e}. <br />
                        </>
                      ))}
                    </div>
                  )}
                </div>
                {/* <!-- className="accordion-content"			    --> */}
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item" id="technology">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded={openAccordion === 'two' ?  true : false}
              aria-controls="collapseTwo"
            >
              Technology Courses
            </button>
          </h2>
          <div
            id="collapseTwo"
            class={`accordion-collapse collapse ${openAccordion === 'two' ? 'show' : ''}`}
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body text-justify">
              <div className="row justify-content-center">
                {data1?.data?.map((d) => (
                  <div
                    onClick={() => setSelectedService(d)}
                    className="col-8 col-sm-4 col-md-4 col-lg-2"
                  >
                    <div className="service-box">
                      <h4 className="text-center pt-2">{d?.courseName}</h4>
                      <hr />

                      <div className="wifi text-center">
                        {d?.courseLevel === "Beginner" && (
                          <FaUserTie
                            className="mx-auto d-block mb-2 mt-2"
                            style={{ fontSize: "25px" }}
                          />
                        )}

                        {d?.courseLevel === "Advanced" && (
                          <FaUserGraduate
                            className="mx-auto d-block mb-2 mt-2"
                            style={{ fontSize: "25px" }}
                          />
                        )}
                        {d?.courseLevel === "Professional" && (
                          <FaUserSecret
                            className="mx-auto d-block mb-2 mt-2"
                            style={{ fontSize: "25px" }}
                          />
                        )}
                      </div>
                      <div className="downup mb-3 d-flex justify-content-evenly align-items-center">
                        {d?.courseLevel}
                      </div>
                      <p className="text-center">{d?.description}</p>
                      <div className="rates text-center p-3">
                        <h1 className="d-inline-block">${d?.price}</h1>
                        <div className="d-inline-block">
                          <div>
                            <sup>.00$</sup>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 10 Mbps Option */}
                  </div>
                ))}
              </div>
              {/* service box  */}

              {/* service box end  */}
              <p id="courses_en-content" className="lead text-justify"></p>
              {coursesData?.map((data, i) => (
                <p
                  key={i}
                  id="courses_en-content"
                  className="lead text-justify"
                >
                  {data}
                </p>
              ))}
              {/* <!-- className="accordion-content text-justify"		--> */}
            </div>
          </div>
        </div>
        {/* 3rd accordion  */}
        <div class="accordion-item" id="marketing">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded={openAccordion === 'three' ?  true : false}
              aria-controls="collapseThree"
            >
              Marketing
            </button>
          </h2>
          <div
            id="collapseThree"
            class={`accordion-collapse collapse ${openAccordion === 'three' ? 'show' : ''}`}
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>Affiliate Video Marketing</p>
              {
                user?._id ?
                <Button className="" onClick={()=>navigate('/videos')}>Visit</Button>
                :
                <p className="error-message">Please Login to see the videos!</p>
              }
              {/* <!-- className="accordion-content"					--> */}
            </div>
          </div>
        </div>
        {/* 4th item  */}
        <div class="accordion-item" id="car">
          <h2 class="accordion-header" id="headingFour">
            <button
              class="accordion-button collapsed shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded={openAccordion === 'four' ?  true : false}
              aria-controls="collapseFour"
            >
              Car Parts
            </button>
          </h2>
          <div
            id="collapseFour"
            class={`accordion-collapse collapse ${openAccordion === 'four' ? 'show' : ''}`}
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="courses-img my-auto d-inline-block">
                <img
                  src={carPartsImage}
                  className="img-fluid rounded b-shadow-a"
                  alt=""
                />
              </div>
              <p id="autoparts_en-content" className="lead text-justify"></p>
              {autopartsData?.map((data, i) => (
                <p
                  key={i}
                  id="autoparts_en-content"
                  className="lead text-justify"
                >
                  {data}
                </p>
              ))}
              {/* <!-- className="accordion-content"					--> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
