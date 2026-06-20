
import Navbar from './features/landing-page/pages/navbarlanding';
import HeroSection from './features/landing-page/pages/HeroSection';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './features/Auth/pages/SignIn';

import Otp from './features/Auth/pages/Otp';

import ForgetPassword from './features/Auth/pages/ForgetPassword';
import CreateAccount from './features/Auth/pages/CreateAccount';
import NavbarLanding from './features/landing-page/pages/navbarlanding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<NavbarLanding/>} />
        <Route path='SignIn' element={<SignIn />} />
        <Route path='Otp' element={<Otp />} />
        <Route path='CreateAccount' element={<CreateAccount />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  
)}
export default App;