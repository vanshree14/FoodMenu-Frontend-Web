import React, { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Extra/Input';
import Button from '../../Extra/Button';
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import { OTP } from '../../Redux/Slice/AuthSlice';
import { submitData } from '../../Utils/Fuction';

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/LogIn");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    const loginData = submitData(e);
    console.log('loginData', loginData);
    const token = sessionStorage.getItem("token")
   const decodeToken = JSON.parse(token)
    loginData.email = decodeToken.email
    if (!loginData || !loginData.otp || !loginData.email) {
      setError("Please provide both email and OTP");
      
      return;
    }

    try {
      await dispatch(OTP(loginData)).unwrap();
      alert("Verification successful");
      sessionStorage.removeItem('otp');
      navigate("/LogIn");
    } catch (error) {
      setError("OTP verification failed");
      console.error('OTP verification error:', error);
    }
  };



  return (
    <div className="mainLoginPage" style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
      <div className="loginDiv">
        <div className="loginPage pt-3 m-auto text-center" style={{ width: "499px" }}>
          <div className="loginTitle" style={{ marginBottom: '120px', marginTop: '40px' }}>
            <h1 className="fw-bold m-0">FOOOD LOGO</h1>
            <p className='text-white'>Enter with your OTP</p>
          </div>
          <h1 className='text-light fw-800 mb-3' style={{ fontSize: '30px' }}>ENTER OTP</h1>
          <form onSubmit={handleSubmit} id="loginForm">
            <div className="loginInput m-0">
              <Input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                name="otp"
                errorMessage="Enter Your OTP"
                icon="fa-solid fa-mobile-screen"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="loginButton m-0">
              <Button
                type={"submit"}
                className={"text-light cursor-pointer m10-top"}
                text={"Verify"}
              />
            </div>
            <p className='text-light mt-4 fw-800' style={{ fontSize: '14px', marginBottom: '200px' }}>Resend OTP</p>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Otp;
