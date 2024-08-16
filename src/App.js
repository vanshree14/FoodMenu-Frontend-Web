import './App.css';
import './Asstes/Scss/Default/default.css'
import './Asstes/Scss/Custom/custom.css'
import './Asstes/Scss/Style/style.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './Component/Pages/Admin';
import CategoryList from './Component/Pages/Category/CategoryList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './Component/Utils/SetAuth';
import { setOldAdmin } from './Component/Redux/Slice/AuthSlice';
import PrivateRoute from './Component/Utils/PrivateRoute';
import Signup from './Component/Pages/Login/Signup';
import Otp from './Component/Pages/Login/Otp';
import SignIn from './Component/Pages/Login/SignIn';
import CategoryProducts from './Component/Pages/Category/CategoryProducts ';

function App() {
  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    setToken(token)
    dispatch(setOldAdmin({ token }))
  }, [setToken, key]);

 
  return (
    <div>
      <Routes>
        <Route path='/Log in' element={<SignIn />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/booking/*' element={<Admin />} />
        <Route path='/categories' element={<CategoryList />} />
        <Route path="/categories/:categoryName" element={<CategoryProducts />} />
    
      </Routes>
    </div>
  );
}

export default App;
