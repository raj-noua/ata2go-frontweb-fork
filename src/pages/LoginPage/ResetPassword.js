import React, { useState }        from "react";
import { Button }                 from "react-bootstrap";
import { useUpdateUserMutation }  from "../../services/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { BsEye, BsEyeSlash }      from "react-icons/bs";

const ResetPassword = () => {
  const [password, setPassword]       = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError]             = useState("");
  const [updateUser]                  = useUpdateUserMutation();
  const [show, setShow]               = useState(false);
  const [show1, setShow1]             = useState(false);
  const { id }                        = useParams();
  const navigate                      = useNavigate()

  const handleUpdatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (passwordRegex.test(password)) {
      if (password === conPassword) {
        updateUser({ id: id, data: { password: password, task: 'forget' } }).then((res) => {
          if (res?.data?.status) {
            setError(res?.data?.message);
            setPassword("");
            navigate('/sign-in')
          } else {
            setError(res?.data?.message);
          }
        });
      } else {
        setError("Passwords didn't match!");
      }
    } else {
      setError(
        "Password must contain 8 characters and one uppercase and one lowercase  character and one number!"
      );
    }
  };

  return (
    <div className="users-login-page">
      <div className="video-input-box-modal email-taker-box">
        <h5 className="text-center">Update Password</h5>
        
        <div className="input-wrapper w-100">
          <label htmlFor="title">Password</label>
          <input
            type={show ? 'text' : 'password'} id="password" placeholder="Enter New Password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-reset-toggle">
                {password.length > 1 && (
                  <span className="password-show-icon">
                    {show ? (
                      <BsEyeSlash onClick={() => setShow(!show)} />
                    ) : (
                      <BsEye onClick={() => setShow(!show)} />
                    )}
                  </span>
                )}
          </div>
        </div>
        
        <div className="input-wrapper w-100">
          <label htmlFor="title">Confirm Password</label>
          <input
            type={show1 ? 'text' : 'password'} id="conPassword" placeholder="Confirm Password" value={conPassword} onChange={(e) => setConPassword(e.target.value)}

          />
           <div className="password-reset-toggle">
                {conPassword.length > 1 && (
                  <span className="password-show-icon">
                    {show1 ? (
                      <BsEyeSlash onClick={() => setShow1(!show1)} />
                    ) : (
                      <BsEye onClick={() => setShow1(!show1)} />
                    )}
                  </span>
                )}
              </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <Button
          onClick={handleUpdatePassword}
          className="btn btn-primary d-block btn-cancel"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
