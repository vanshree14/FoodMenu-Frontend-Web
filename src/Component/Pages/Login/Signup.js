import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../../../Component/Redux/Slice/AuthSlice';
import Input from "../../Extra/Input";
import Button from "../../Extra/Button";
import { submitData } from "../../Utils/Fuction";

import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';


const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/otp");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    const loginData = submitData(e);
    console.log("loginData", loginData);
    try {
      const response = await dispatch(Register(loginData)).unwrap();
      alert("OTP sent to your email successfully");
      navigate("/otp");
    } catch (error) {
      setError("Something is missing");
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="mainLoginPage" style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
      <div className="loginDiv" >
        <div className="loginPage pt-3 m-auto text-center" style={{ width: "499px" }}>
          <div className="loginTitle mb-3 mt-4">
            <h1 className="fw-bold m-0 ">FOOOD LOGO</h1>
            <p className='text-white'>resigter with your Details</p>
          </div>
          <h2 className='text-white fw-700 mb-5 mt-2'>SIGN-UP</h2>
          <form
            onSubmit={handleSubmit}
            id="loginForm">
            <div className="loginInput ">
              <Input
                type={`text`}
                id={`fullName`}
                placeholder={`Enter Your Name`}
                name={`fullName`}
                errorMessage={`Enter fullName`}
                icon="fa-solid fa-user"

              />
              <Input
                type={`text`}
                id={`email`}
                placeholder={`Enter Your Email`}
                name={`email`}
                errorMessage={`Enter Email`}
                icon="fa-solid fa-envelope"
              />
              <Input
                type={`password`}
                id={`password`}
                placeholder={`Enter Your Password`}
                name={`password`}
                errorMessage={`Enter Password`}
                icon="fa-solid fa-lock"
              />
              <div className='d-flex  justify-content-center'>
                <Input
                  label={`Male`}
                  type={`radio`}
                  id={`male`}
                  name={`gender`}
                  value={`male`}
                />
                <Input
                  type={`radio`}
                  id={`female`}
                  name={`gender`}
                  label={`Female`}
                  value={`female`}
                />
              </div>
            </div>
            <div className="loginButton">
              <Button
                type={`submit`}
                className={`text-light cursor-pointer m10-top`}
                text={`Sign up`}
              />
            </div>
          </form>
          <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
            <p className='text-light m-2'>OR</p>
            <div className="social-media">
              <button className="google-login mb-3">Continue with google</button>
            </div>
            <span className='text-light fw-700 mb-5' style={{ fontSize: '15px' }}>Already have an account?<span className='fw-700' style={{ color: '#9B7A41' }}>Login </span> </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
