import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useVerifyEmailMutation,
  useReSendEmailVerifyMutation,
} from "../../services/userApi";
const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  const [verifyEmail] = useVerifyEmailMutation();
  const [ReSendEmailVerify] = useReSendEmailVerifyMutation();
  const [resetBtn, setResetBtn] = useState(false);
  const handleVerifyCode = () => {
    if (code) {
      verifyEmail({ email: email, code: code }).then((res) => {
        if (res?.data?.status) {
          setShow(true);
          setError("");
          setResetBtn(false);
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

  const handleResetCode = () => {
    ReSendEmailVerify({ email: email }).then((res) => {
      if (res?.data?.status) {
        setShow(false);
        setResetBtn(false);
      } else {
        setError(res?.data?.message);
      }
    });
  };

  return (
    <div className="users-login-page">
      <div className="video-input-box-modal email-taker-box">
        {show ? (
          <>
            <p className="text-center text-primary">
              Your account was verified.
            </p>
            <Button
              onClick={() => navigate("/sign-in")}
              className="btn btn-primary d-block btn-cancel"
            >
              Go to Sign In
            </Button>
          </>
        ) : (
          <>
          
            <p className="text-center text-primary">
              A verification code was sent to your email
            </p>
            <div className="input-wrapper w-100">
              <input
                type="text"
                id="code"
                placeholder="Enter The verification code!"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={resetBtn ? true : false}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {resetBtn ? (
              <div className="buttons-div-password">
                <Button
                  onClick={() => navigate("/sign-up")}
                  className="btn btn-danger d-block btn-cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleResetCode}
                  className="btn btn-success d-block btn-cancel"
                >
                  Resend Code
                </Button>
              </div>
            ) : (
              <div className="buttons-div-password">
                <Button
                  onClick={() => navigate("/sign-up")}
                  className="btn btn-danger d-block btn-cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerifyCode}
                  className="btn btn-primary d-block btn-cancel"
                >
                  Verify
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
