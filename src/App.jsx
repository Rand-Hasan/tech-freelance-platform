import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './features/Auth/pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SignIn' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;