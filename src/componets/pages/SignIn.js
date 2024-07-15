import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mobileImg from '../../assets/Images/Mobile-login-rafiki.png'; // Fixed typo in assets path
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/AuthSlice';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        if (isAuth) {
            navigate("/admin");
        }
    }, [isAuth, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setError({ email: "", password: "" });

        if (!email || !password) {
            if (!email) setError((prev) => ({ ...prev, email: "Enter email" }));
            if (!password) setError((prev) => ({ ...prev, password: "Enter password" }));
            return;
        }

        try {
            const payload = { email, password };
            const response = await dispatch(login(payload)).unwrap();

            if (response.status) {
                // Set session storage key
                sessionStorage.setItem('token', response.token);
                alert("User Login successful!");
                navigate('/admin');
            } else {
                if (response.message.includes("Email")) {
                    setError((prev) => ({ ...prev, email: response.message }));
                } else if (response.message.includes("Password")) {
                    setError((prev) => ({ ...prev, password: response.message }));
                } else {
                    alert(response.message || "Login failed");
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert("Oops! Something went wrong.");
        }
    };

    return (
        <div className="MainLoginForm">
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleLogin} className="sign-in-form">
                            <h2 className="title">Sign In</h2>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <p className='error'>{error.email}</p>}
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error.password && <p className='error'>{error.password}</p>}
                            </div>
                            <input type="submit" value="Login" className="btn solid" />
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <button className="google-login mb-3">Sign With Google</button>
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
                            <button className="btn transparent" id="sign-in-btn">
                                Sign up
                            </button>
                        </div>
                        <img src={mobileImg} className="image" alt="Mobile login illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
