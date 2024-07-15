import React, {  useState } from 'react';
import mobileImg from '../../asstes/Images/Mobile-login-rafiki.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Register } from '../../redux/slice/AuthSlice';


const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState({
        fullname: "",
        password: "",
        email: "",
    });
    const dispatch = useDispatch();
  

    // const googleAuth = () => {
    //     window.open( `http://192.168.1.5:5000/auth/google/callback`,"_self");
    //     // window.location.href = 'http://192.168.1.5:5000/auth/google';
    // };

    // const googleAuth = useGoogleLogin({
    //     onSuccess: async tokenResponse => {
    //         console.log(tokenResponse);

    //         try {
    //             const response = await fetch('http://192.168.1.5:5000/auth/google', {
    //                 method: 'OPTIONS',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ token: tokenResponse }),
    //                 mode: 'cors', // Ensure CORS is enabled
    //             });

    //             const data = await response.json();

    //             if (data.success) {
    //                 window.location.href = 'http://192.168.1.5:5000/auth/google/callback'; // Redirect to your desired route after successful login
    //             } else {
    //                 console.error('Authentication failed');
    //             }
    //         } catch (error) {
    //             console.error('Error sending token to backend:', error);
    //         }
    //     },
    //     onFailure: error => {
    //         console.error('Login failed:', error);
    //     },
    // });



    const handleLogin = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) {
            if (!fullName) {
                setError((val) => ({ ...val, fullname: "Enter fullname" }));
            }
            if (!email) {
                setError((val) => ({ ...val, email: "Enter email" }));
            }
            if (!password) {
                setError((val) => ({ ...val, password: "Enter password" }));
            }
        } else {
            const payload = { fullName, email, password };
            try {
                const response = await dispatch(Register(payload)).unwrap();
                sessionStorage.setItem('user', JSON.stringify(response.user));
                sessionStorage.setItem('otp', response.otp);
                navigate("/otp")
                alert("Otp Sent Your Email successfully")
            } catch (error) {
                alert("someThing is Missing");
            }
        }
    };

    return (
        <div className="MainLoginForm">
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form className="sign-in-form" >
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Fullname" value={fullName}
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                        if (!e.target.value) {
                                            setError({ ...error, fullname: "Enter fullname" });
                                        } else {
                                            setError({ ...error, fullname: "" });
                                        }
                                    }} />
                                <p className='error'>{error.fullname}</p>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (!e.target.value) {
                                            setError({ ...error, email: "Enter email" });
                                        } else {
                                            setError({ ...error, email: "" });
                                        }
                                    }} />
                                <p className='error'>{error.email}</p>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (!e.target.value) {
                                            setError({ ...error, password: "Enter password" });
                                        } else {
                                            setError({ ...error, password: "" });
                                        }
                                    }} />
                                <p className='error'>{error.password}</p>
                            </div>
                            <input type="submit" value="Sign Up" className="btn solid" onClick={handleLogin} />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media" >
                                <button type='button' className="google-login mb-3" >Sign With Google</button>
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
                        <img src={mobileImg} className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;


