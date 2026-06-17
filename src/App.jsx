import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './features/Auth/pages/SignIn';

import CreateAccount from './features/Auth/pages/CreatAccount';
import Otp from './features/Auth/pages/Otp';

import ForgetPassword from './features/Auth/pages/ForgetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<CreateAccount />} />
        <Route path='/SignIn' element={<SignIn />} />

           <Route path='/Otp' element={<Otp />} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
        
        

        <Route path='/ForgetPassword' element={<ForgetPassword />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;