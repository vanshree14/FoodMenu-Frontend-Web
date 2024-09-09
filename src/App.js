import './App.css';
import './Asstes/Scss/Default/default.css'
import './Asstes/Scss/Custom/custom.css'
import './Asstes/Scss/Style/style.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './Component/Pages/Admin';
import CategoryList from './Component/Pages/Category/CategoryList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './Component/Utils/SetAuth';
import { setOldAdmin } from './Component/Redux/Slice/AuthSlice';
import PrivateRoute from './Component/Utils/PrivateRoute';
import Signup from './Component/Pages/Login/Signup';
import Otp from './Component/Pages/Login/Otp';
import SignIn from './Component/Pages/Login/SignIn';
import CategoryProducts from './Component/Pages/Category/CategoryProducts ';
import CartDetails from './Component/Pages/Cart/CartDetails';
import ProductDetails from './Component/Pages/Category/ProductDetails';
import AuthRoute from './Component/Utils/AuthRoute';
import OtpRouter from './Component/Utils/OtpRouter';
import settingicon from './Asstes/Images/gear.webp';
import ProfileBar from './Component/Pages/Profile/ProfileBar';
import WishList from './Component/Pages/WishList/WishList';

function App() {
  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    setToken(token)
    dispatch(setOldAdmin({ token }))
  }, [setToken, key]);
  const [isProfileBarVisible, setProfileBarVisible] = useState(false);

  const toggleProfileBar = () => {
    setProfileBarVisible(!isProfileBarVisible);
  };

  return (
    <div className='custombackgroud'>
      <div class="tigger-arrow" onClick={toggleProfileBar}>
        <div class="gear-icon">
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>

      {isProfileBarVisible && <ProfileBar toggleProfileBar={toggleProfileBar} isProfileBarVisible={isProfileBarVisible} />}


      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<OtpRouter />}>
          <Route path='/otp' element={<Otp />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path='/booking/*' element={<Admin />} />
        </Route>
       

      </Routes>
    </div>
  );
}

export default App;
