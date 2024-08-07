import React, { useState } from 'react';
import mobileImg from '../../Asstes/Images/Mobile-login-rafiki.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Register } from '../../Component/Redux/Slice/AuthSlice';
import Input from "../Extra/Input";
import Button from "../Extra/Button";
import profileimg from "../../Asstes/Images/0d64989794b1a4c9d89bff571d3d5842.jpg"
import BannerbackgroundImg from '../../Asstes/Images/fa3ea1263d103c3a22d1096792fafc70.png';

const SignIn = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState({ email: "", password: "" });
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const isAuth = useSelector((state) => state.user.isAuth);

    // useEffect(() => {
    //     isAuth && navigate("/admin");
    //   }, [isAuth]);

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     // Reset previous errors
    //     setError({ email: "", password: "" });

    //     if (!email || !password) {
    //         if (!email) setError((prev) => ({ ...prev, email: "Enter email" }));
    //         if (!password) setError((prev) => ({ ...prev, password: "Enter password" }));
    //         return;
    //     }

    //     try {
    //         const payload = { email, password };
    //         const response = await dispatch(login(payload)).unwrap();

    //         if (response.status) {
    //             // Set session storage key
    //             sessionStorage.setItem('token', response.token);
    //             alert("User Login successful!");
    //             navigate('/admin');
    //         } else {
    //             if (response.message.includes("Email")) {
    //                 setError((prev) => ({ ...prev, email: response.message }));
    //             } else if (response.message.includes("Password")) {
    //                 setError((prev) => ({ ...prev, password: response.message }));
    //             } else {
    //                 alert(response.message || "Login failed");
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         alert("Oops! Something went wrong.");
    //     }
    // };

    return (
        <div className="mainLoginPage" style={{ backgroundImage: `url(${BannerbackgroundImg})` }}>
            <div className="loginDiv" >
                <div className="loginPage pt-3 m-auto text-center" style={{ width: "499px" }}>
                    <div className="loginTitle mb-5 mt-5">
                        <h1 className="fw-bold m-0 ">FOOOD LOGO</h1>
                        <p className='text-white'>Login with your details</p>
                    </div>
                    <h2 className='text-white fw-700 mb-3'>LOGIN</h2>
                    <form
                        // onSubmit={handleSubmit}
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
                        <p className='text-light fw-700 mb-5' style={{fontSize:'16px',}}>I forgot my password</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
