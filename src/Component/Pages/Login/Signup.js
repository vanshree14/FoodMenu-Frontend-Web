import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../../../Component/Redux/Slice/AuthSlice';
import Input from "../../Extra/Input";
import Button from "../../Extra/Button";
import { submitData } from "../../Utils/Fuction";
import logobar from '../../../Asstes/Images/loginLogo.png';

import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import Loader from '../../Utils/Loader';
import { setToast } from '../../Extra/Toast';


const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuth,isLoading} = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuth) {
      navigate("/otp");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    const loginData = submitData(e);
    console.log("loginData", loginData);
    if (loginData) {
      let response = await dispatch(Register(loginData)).unwrap();
      if (response.status) {
          setToast("success", response.message)
          navigate("/otp")
      } else {
          setToast("error", response.message)
      }
  }

    // try {
    //   const response = await dispatch(Register(loginData)).unwrap();
    //   alert("OTP sent to your email successfully");
    //   navigate("/otp");
    // } catch (error) {
    //   setError("Something is missing");
    //   console.error('Registration error:', error);
    // }
  };
  const handleclick = () => {
    navigate("/")
  }

  return (
    <div className="mainLoginPage">
      <div className="loginDiv" >
        <div className="loginPage pt-3 m-auto text-center width-sm-500  w-100 p15-y p60-sm-x p70-smm-x p30-x">
          <div className="loginTitle mb-3 mt-4">
          <img src={logobar} alt='img'/>

            <p className='text-white'>resigter with your Details</p>
          </div>
          <h2 className='text-white fw-700 m40-y'>SIGN IN</h2>
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
                inputDataClass={`m10-bottom`}
                icon="fa-solid fa-user"

              />
              <Input

                type={`text`}
                id={`email`}
                placeholder={`Enter Your Email`}
                name={`email`}
                errorMessage={`Enter Email`}
                inputDataClass={`m10-bottom`}
                icon="fa-solid fa-envelope"
              />

              <Input
                type={`password`}
                id={`password`}
                placeholder={`Enter Your Password`}
                name={`password`}
                errorMessage={`Enter Password`}
                inputDataClass={`m10-bottom`}
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
            <div className="loginButton d-flex justify-content-start" >
              <Button
                type={`submit`}
                className={`text-light cursor-pointer m10-top`}
                text={`Sign up`}
              />
            </div>
          </form>
          <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
            <p className='text-light m-2 fs-sm-15 fs-11'>OR</p>
            <div className="social-media">
              <button className="google-login mb-3">Continue with google</button>
            </div>
            <span className='text-light fw-700 mb-5 fs-sm-15 fs-12 m20-top' >Already have an account?<span className='fw-700 ps-2  ' style={{ color: '#9B7A41' }} onClick={handleclick}>Login </span> </span>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
    
  );
};

export default Signup;
