import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css';
import './styles/App.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const ClientID="734648840567-702lqntvo1k2htdvtck6ja0u0q034g95.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <GoogleOAuthProvider clientId={ClientID}>  
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
