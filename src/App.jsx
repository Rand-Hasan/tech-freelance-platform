import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './features/Auth/pages/SignIn';
import ForgetPassword from './features/Auth/pages/ForgetPassword';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;