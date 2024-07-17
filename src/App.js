import './App.css';
import './Asstes/Scss/Default/default.css'
import './Asstes/Scss/Custom/custom.css'
import './Asstes/Scss/Style/style.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './Component/Pages/Admin';
import Signup from './Component/Pages/Signup';
import SignIn from './Component/Pages/SignIn';
import CategoryList from './Component/Pages/CategoryList';
import Otp from './Component/Pages/Otp';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './Component/Utils/SetAuth';
import { setOldAdmin } from './Component/Redux/Slice/AuthSlice';
import PrivateRoute from './Component/Utils/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    setToken(token)
    dispatch(setOldAdmin({token}))
  }, [setToken, key]);


  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<Otp/>} />
        <Route  element={<PrivateRoute/>}>      
        <Route path='/signin' element={<SignIn/>}/>
         <Route path='/admin/*' element={<Admin/>}/>
         </Route>
       
        <Route path='/burger' element={<CategoryList />} />
        <Route path='/pizza' element={<CategoryList />} />
      </Routes>
    </div>
  );
}

export default App;
