import React, { useState } from 'react';
import mobileImg from '../../Asstes/Images/Mobile-login-rafiki.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Register } from '../Redux/Slice/AuthSlice';

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState({ fullname: "", password: "", email: "" });
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) {
            setError({
                fullname: !fullName ? "Enter fullname" : "",
                email: !email ? "Enter email" : "",
                password: !password ? "Enter password" : "",
            });
        } else {
            const payload = { fullName, email, password };
            try {
                
                const response = await dispatch(Register(payload)).unwrap();
                sessionStorage.setItem('user', JSON.stringify(response.user));
                sessionStorage.setItem('otp', response.otp);
                navigate("/otp");
                alert("Otp Sent Your Email successfully");
            } catch (error) {
                alert("Something is Missing");
                console.log('error :>> ', error);
            }
        }
    };

    return (
        <div className="MainLoginForm">
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form className="sign-in-form" onSubmit={handleLogin}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Fullname"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <p className='error'>{error.fullname}</p>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className='error'>{error.email}</p>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className='error'>{error.password}</p>
                            </div>
                            <input type="submit" value="Sign Up" className="btn solid" />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <button type='button' className="google-login mb-3">Sign With Google</button>
                            </div>
                        </form>
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
                            <button className="btn transparent" id="sign-in-btn">Sign up</button>
                        </div>
                        <img src={mobileImg} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
