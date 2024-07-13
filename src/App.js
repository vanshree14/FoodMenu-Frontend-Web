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

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/otp' element={<Otp/>} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/burger' element={<CategoryList />} />
        <Route path='/pizza' element={<CategoryList />} />
      </Routes>
    </div>
  );
}

export default App;
