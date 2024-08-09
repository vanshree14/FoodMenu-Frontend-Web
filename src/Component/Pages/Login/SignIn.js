import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Component/Redux/Slice/AuthSlice';
import Input from "../../Extra/Input";
import Button from "../../Extra/Button";
import BannerbackgroundImg from '../../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';
import { submitData } from '../../Utils/Fuction';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);



    useEffect(() => {
        isAuth && navigate("/table");
    }, [isAuth, navigate]);

    const handleLogin = async (e) => {
        const loginData = submitData(e);
        console.log("loginData", loginData);
        try {
            let response = await dispatch(login(loginData)).unwrap();
            alert("user login successfully");
            response.status ? navigate("/table") : alert("SomeThing IS missing");
        } catch (error) {
            console.error('Login failed:', error);
            alert("Oops! Something went wrong.");
        }
    };
    return (
        <div className="mainLoginPage" style={{ backgroundImage: `url(${BannerbackgroundImg})`, height: '100vh' }}>
            <div className="loginDiv" >
                <div className="loginPage pt-3 m-auto text-center" style={{ width: "499px" }}>
                    <div className="loginTitle mb-5 mt-5">
                        <h1 className="fw-bold m-0 ">FOOOD LOGO</h1>
                        <p className='text-white'>Login with your details</p>
                    </div>
                    <h2 className='text-white fw-700 mb-3'>LOGIN</h2>
                    <form
                        onSubmit={handleLogin}
                        id="loginForm">
                        <div className="loginInput ">
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
                        </div>
                        <div className="loginButton">
                            <Button
                                type={`submit`}
                                className={`text-light cursor-pointer m10-top`}
                                text={`Login`}
                            />
                        </div>
                    </form>
                    <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                        <p className='text-light pt-3 pb-2 fw-700'>OR</p>
                        <div className="social-media mb-2">
                            <button className="google-login mb-3">Continue with google</button>
                        </div>
                        <span className='text-light fw-700 mb-4' style={{ fontSize: '15px' }}>Already have an account?<span className='fw-700' style={{ color: '#9B7A41' }}>Login </span> </span>
                        <p className='text-light fw-700 mb-5' style={{ fontSize: '16px', }}>I forgot my password</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
