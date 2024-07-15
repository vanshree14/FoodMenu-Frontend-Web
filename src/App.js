import './App.css';
import './asstes/Scss/default/default.css'
import './asstes/Scss/custom/custom.css'
import './asstes/Scss/style/style.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './componets/pages/Admin';
import Signup from './componets/pages/Signup';
import SignIn from './componets/pages/SignIn';
import CategoryList from './componets/pages/CategoryList';
import Otp from './componets/pages/OTP';
// import PrivateRoute from './componets/utils/PrivateRoute';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setToken } from './componets/utils/SetAuth';
// import { setOldAdmin } from './redux/slice/AuthSlice';

function App() {
  // const dispatch = useDispatch();
  // const key = sessionStorage.getItem("key");
  // const token = sessionStorage.getItem("token");
  // const tokenSil = sessionStorage.getItem("tokenSil");

  // useEffect(() => {
  //   if (!token && !key) return;
  //   setToken(tokenSil)
  //   dispatch(setOldAdmin({token}))
  // }, [setToken, key]);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<Otp/>} />
        <Route path='/signin' element={<SignIn/>}/>
        {/* <Route  element={<PrivateRoute/>}>      </Route> */}
         <Route path='/admin' element={<Admin/>}/>
    
       
        <Route path='/burger' element={<CategoryList />} />
        <Route path='/pizza' element={<CategoryList />} />
      </Routes>
    </div>
  );
}

export default App;
