import React, { useState }          from "react";
import contactBackgroundImage       from "../../../assets/images/img/work-3.jpg";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsFillTelephoneFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { MdLocationOn }           from "react-icons/md";
import ReCAPTCHA                  from "react-google-recaptcha";
import { useSendSupportMutation } from "../../../services/userApi";
import { toast }                  from "react-toastify";
import axios                      from "axios";

const Contact = () => {
  const [verifCaptcha, setVerifCaptcha] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [letterCount, setLetterCount] = useState([]);
  const [badWord, setBadWord] = useState(false);

  const [sendSupport] = useSendSupportMutation();
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifCaptcha(true);
  }
  const handleName = (e) => {
    const inputValue = e.target.value;
    const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
    setName(sanitizedInputValue);
  };
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
    setEmail(sanitizedInputValue);
  };
  const handleSub = (e) => {
    const inputValue = e.target.value;
    const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
    setSubject(sanitizedInputValue);
  };
  const handleText = (e) => {
    const inputValue = e.target.value;
    const sanitizedInputValue = inputValue.replace(/[^A-Za-z0-9.,!?@ ]/g, "");
    if (message.split(" ").length > 120) {
      const regex = /[\w\d\s]/g;
      const result = message.replace(regex, "");
    } else {
      setMessage(sanitizedInputValue);
      setLetterCount(sanitizedInputValue.split(" "));
    }
  };
  console.log(message);
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const data = { name, email, subject, text: message };
    const options = {
      method: "GET",
      url: "https://community-purgomalum.p.rapidapi.com/json",
      params: {
        text: message,
      },
      headers: {
        "X-RapidAPI-Key": "3183ae9d2bmshd63837079167294p121a90jsn3387d784707e",
        "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data)
      if (response?.data?.result?.includes("*")) {
        setError("Please remove inappropriate words!");
      } else {
        sendSupport(data).then((res) => {
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            setEmail("");
            setName("");
            setSubject("");
            setMessage("");
            setError("");
          } else {
            setError(res?.data?.message);
          }
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(letterCount);

  return (
    <>
      {/* <!--/ Section Contact-Footer Start /--> */}
      <section
        className="paralax-mf footer-paralax bg-image sect-mt4 route"
        style={{ backgroundImage: `url(${contactBackgroundImage}` }}
      >
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="contact-mf">
                <div id="contact" className="box-shadow-full">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="title-box-2">
                        <h5 className="title-left">Message Us</h5>
                      </div>
                      <div>
                        <form
                          onSubmit={handleSendMessage}
                          className="contactForm"
                        >
                          <div id="sendmessage">
                            Your message has been sent. Thank you!
                          </div>
                          <div id="errormessage"></div>
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  id="name"
                                  placeholder="Your Name"
                                  value={name}
                                  onChange={handleName}
                                  required
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Your Email"
                                  value={email}
                                  onChange={handleEmail}
                                  required
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="subject"
                                  id="subject"
                                  placeholder="Subject"
                                  value={subject}
                                  onChange={handleSub}
                                  required
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  name="message"
                                  rows="5"
                                  data-rule="required"
                                  value={message}
                                  onChange={handleText}
                                  placeholder="Message"
                                  required
                                ></textarea>
                                <p className="text-end">
                                  {letterCount[0] === "" && letterCount.length
                                    ? 0
                                    : letterCount.length}
                                  /120
                                </p>
                              </div>
                              {error && (
                                <p className="error-message">{error}</p>
                              )}

                              <div className="recaptcha-container">
                                <ReCAPTCHA
                                  className="recaptcha-field"
                                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                  onChange={onChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="button button-a button-big button-rouded"
                                disabled={!verifCaptcha}
                              >
                                Send Message
                              </button>
                            </div>
                            {/* <!--/ Google ReCAPTCHA /--> */}
                            {/* <form action="?" method="POST">
                              <div
                                className="g-recaptcha"
                                data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                              ></div>
                            </form> */}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="title-box-2 pt-4 pt-md-0">
                        <h5 className="title-left">Get in Touch</h5>
                      </div>
                      <div className="more-info">
                        <p className="lead">Contact US....</p>
                        <ul className="list-ico">
                          <li>
                            <MdLocationOn className="contact-icon" />
                            <span>Montreal, Quebec</span>
                          </li>
                          <li>
                            <BsFillTelephoneFill className="contact-icon" />
                            <span>514-867-5523</span>
                          </li>
                          <li>
                            <BsFillEnvelopeFill className="contact-icon" />
                            <span>support@ata2go.com</span>
                          </li>
                        </ul>
                      </div>
                      <div className="socials">
                        <ul>
                          {/* <!-- social links  --> */}
                          {/* <!-- you can add your social links in href tages  --> */}
                          <li>
                            <a>
                              <span className="ico-circle">
                                <BsFacebook />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a>
                              <span className="ico-circle">
                                <BsInstagram />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a>
                              <span className="ico-circle">
                                <BsTwitter />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a>
                              <span className="ico-circle">
                                <BsYoutube />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- footer and copy writes section  --> */}
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="copyright-box">
                  <p className="copyright ">
                    &copy; Copyright <strong>ATA2GO</strong>. All Rights
                    Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
      {/* <!--/ Section Contact-footer End /--> */}
    </>
  );
};

export default Contact;
