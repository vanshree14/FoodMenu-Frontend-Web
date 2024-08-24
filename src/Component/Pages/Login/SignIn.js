import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Component/Redux/Slice/AuthSlice';
import Input from "../../Extra/Input";
import Button from "../../Extra/Button";
import { submitData } from '../../Utils/Fuction';
import logobar from '../../../Asstes/Images/loginLogo.png';
import { setToast } from '../../Extra/Toast';
import Loader from '../../Utils/Loader';


const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, isLoading } = useSelector((state) => state.user);



    useEffect(() => {
        isAuth && navigate("/booking/tables");
    }, [isAuth, navigate]);

    const handleLogin = async (e) => {
        const loginData = submitData(e);
        console.log("loginData", loginData);
        if (loginData) {
            let response = await dispatch(login(loginData)).unwrap();
            if (response.status) {
                setToast("success", response.message)
                navigate("/booking/tables")
            } else {
                setToast("error", response.message)
            }
        }

    };
    const handleclick = () => {
        navigate("/signup")
    }
    return (
        <div className="mainLoginPage">
            <div className="loginDiv" >
                <div className="loginPage pt-3 m-auto text-center width-sm-500  w-100 p15-y p60-sm-x p70-smm-x p30-x " >
                    <div className="loginTitle mb-5 mt-5">
                        <img src={logobar} alt='img' />
                        <p className='text-white'>Login with your details</p>
                    </div>
                    <h2 className='text-white fw-700 m40-y'>LOGIN</h2>
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
                        <span className='text-light fw-700 mb-4 account-details fs-sm-15 fs-14' >Already have an account?<span className='fw-700 signIn ps-2 signIn' style={{ color: '#9B7A41' }} onClick={handleclick}>Sign In </span> </span>
                        <p className='text-light fw-700 mb-5 fs-sm-16 fs-14' >I forgot my password</p>
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default SignIn;
