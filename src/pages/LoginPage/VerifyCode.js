import React, { useState }        from "react";
import logo                       from "../../assets/images/img/logo.png";
import { Button }                 from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useReSendPassVerifyMutation,
  useVerifyCodeMutation,
}                                 from "../../services/userApi";
import { toast }                  from "react-toastify";

const VerifyCode = () => {
  const [code, setCode]         = useState("");
  const [error, setError]       = useState("");
  const navigate                = useNavigate();
  const { email }               = useParams();
  const [verifyCode]            = useVerifyCodeMutation();
  const [ReSendPassVerify]      = useReSendPassVerifyMutation();
  const [resetBtn, setResetBtn] = useState(false);
  
  const handleVerifyCode = () => {
    if (code) {
      verifyCode({ email: email, code: code }).then((res) => {
        if (res?.data?.status) {
          navigate(`/update-pass/${res.data.result}`);
          setError("");
        } else {
          if (res?.data?.message === "Expired!") {
            setResetBtn(true);
            setError("Verification code has been Expired!");
            setCode("");
          } else {
            setError(res?.data?.message);
          }
        }
      });
    } else {
      setError("Please Enter verification code!");
    }
  };

  const handleResendPass = () => {
    ReSendPassVerify({ email: email }).then((res) => {
      if (res?.data?.status) {
        setResetBtn(false);
        setError("");
        toast.success(res?.data?.message);
      } else {
        setError(res?.data?.message);
      }
    });
  };

  return (
    <div className="users-login-page">
      <div className="video-input-box-modal email-taker-box">
        <div className="input-wrapper w-100">
          {/* <label htmlFor="title">Email</label> */}
          <h5 className="mb-3 text-center">Reset Password</h5>
          <p className="text-center text-primary">
            A verification code was sent to your email
          </p>

          <input  
            type="text" id="code" placeholder="Enter The verification code!" value={code} onChange={(e) => setCode(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {resetBtn ? (
          <>
            <div className="buttons-div-password">
              <Button onClick={() => navigate("/sign-in")}  className="btn btn-danger d-block btn-cancel">  Cancel        </Button>
              <Button onClick={handleResendPass}            className="btn btn-success d-block btn-cancel"> Resend Code   </Button>
            </div>
          </>
        ) : (
          <>
            <div className="buttons-div-password">
              <Button onClick={() => navigate("/sign-in")}  className="btn btn-danger d-block btn-cancel">  Cancel        </Button>
              <Button onClick={handleVerifyCode}            className="btn btn-primary d-block btn-cancel"> Verify        </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyCode;
