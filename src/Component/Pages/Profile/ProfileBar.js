import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGet } from '../../Redux/Slice/UserSlice';
import logobar from '../../../Asstes/Images/loginLogo.png';
import userIcon from '../../../Asstes/Icon/user.png';
import emailIcon from '../../../Asstes/Icon/email.png';
import order from '../../../Asstes/Icon/order.png';
import cart from '../../../Asstes/Icon/cart.png';
import call from '../../../Asstes/Icon/call.png';
import facebook from '../../../Asstes/Icon/facebook.png';
import heart from '../../../Asstes/Icon/heart.png';
import instrgram from '../../../Asstes/Icon/instagram.png';
import { useNavigate } from 'react-router-dom';

const ProfileBar = ({ toggleProfileBar, isProfileBarVisible }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const userId = JSON.parse(sessionStorage.getItem('token'))?._id;

    useEffect(() => {
        if (userId) {
            dispatch(userGet({ page: 1, limit: 10, search: '', userId }));
        }
    }, [dispatch, userId]);

    const handleWishlistClick = () => {
        navigate("booking/wishlist"); 
    };
    const haadlecartclick = () => {
        navigate("booking/cart"); 
    };
    const handleOrderClick = () => {
        navigate("/booking/orders")
    }

    return (
        <div>
            <div className={`profile custombackgroud ${isProfileBarVisible ? 'visible' : 'hidden'}`}>
                <div className="ProfileWrap mt-4">
                    <div className="header text-center position-relative">
                        <div className="logo ">
                            <img src={logobar} alt='img' />
                        </div>
                        <div className="tagline fs-12 text-light fw-900">Your Tagline</div>
                    </div>
                    <div className={`back-button  ${toggleProfileBar ? 'hidden' : ''}`} onClick={toggleProfileBar} >
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className="profile-details text-center">
                        <h1 className='fs-32 fw-900'>PROFILE</h1>
                        <p className='fs-16 fw-700'>{user?.gender || "Gender"}</p>
                        <div className="user-info d-flex flex-column">
                            <button className="action-button mb-4">
                                <img src={userIcon} alt='img' /> {user?.fullName || "User Name"}
                            </button>
                            <button className="action-button mb-5">
                                <img src={emailIcon} alt='img' /> {user?.email || "Email"}
                            </button>
                        </div>
                        <div className="action-list mt-5 d-flex flex-column ">
                            <button className="action-button" onClick={handleOrderClick}>
                                <img src={order} alt='img' /> My Orders
                            </button>
                            <button className="action-button" onClick={haadlecartclick}>
                                <img src={cart} alt='img' /> My Cart
                            </button>
                            <button className="action-button" onClick={handleWishlistClick}>
                                <img src={heart} alt='img' className='width-46' /> Wishlist
                            </button>
                            <button className="action-button">
                                <img src={call} alt='img' /> Call Outlet
                            </button>
                            <button className="action-button">
                                <img src={facebook} alt='img' /> Facebook
                            </button>
                            <button className="action-button">
                                <img src={instrgram} alt='img' className='width-46' /> Instagram
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileBar;
