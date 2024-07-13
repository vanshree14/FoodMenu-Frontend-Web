import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mobileImg from '../../asstes/Images/Mobile-login-rafiki.png';
import { useDispatch } from 'react-redux';
import { OTP as verifyOTP } from '../../redux/slice/AuthSlice';

const OTP = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
      if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    } else {
      setError("Invalid OTP format");
    }
  };

  const handleLogin = async () => {
    const storedOtp = sessionStorage.getItem('otp');
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError("Please enter the complete OTP");
      return;
    }
    if (enteredOtp !== storedOtp) {
      setError("Invalid OTP");
    } else {
      try {
        const payload = { otp: enteredOtp, email: JSON.parse(sessionStorage.getItem('user')).email };
        await dispatch(verifyOTP(payload)).unwrap();
        alert("Verification successful");
        navigate("/signin");
      } catch (error) {
        setError("OTP verification failed");
        console.error('OTP verification error:', error);
      }
    }
  };

  return (
    <div className="MainLoginForm">
      <div className="container">
        <div className="forms-container">
          <div className="MainOtpForm">
            <div className="container-fluid">
              <div className="forms-container">
                <div className="Otp-form">
                  <div className="title">
                    <h3>OTP VERIFICATION</h3>
                    <p className="info">An OTP has been sent to ********k876@gmail.com</p>
                    <p className="msg">Please enter OTP to verify</p>
                  </div>
                  <div className="otp-input-fields">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="otp__digit"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onPaste={handlePaste}
                        ref={el => inputRefs.current[index] = el}
                        maxLength="1"
                      />
                    ))}
                  </div>
                  <span className="error">{error}</span>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn solid mt-5"
                    onClick={handleLogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New to our community?</h3>
              <p>
                Discover a world of possibilities! Join us and explore a vibrant
                community where ideas flourish and connections thrive.
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign In
              </button>
            </div>
            <img src={mobileImg} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
