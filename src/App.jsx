// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import ClientLayout from './features/Client/layout/ClientLayout';
import SignIn from './features/Auth/pages/SignIn';
import Otp from './features/Auth/pages/Otp';
import ForgetPassword from './features/Auth/pages/ForgetPassword';
import CreateAccount from './features/Auth/pages/CreateAccount';
import NavbarLanding from './features/landing-page/pages/navbarlanding';
import Messages from './features/Client/client- messages/pages/Messages';
import Dashboard from './features/Client/client-dashboard/pages/Dashboard';
import FindFreelancers from './features/Client/client-findfreelancer/pages/FindFreelancers';
import Wallet from './features/Client/client-wallet/pages/Wallet';
import Projects from './features/Client/client-projects/pages/Project';
import Contracts from './features/Client/client-contracts/pages/Contracts';
import Profile from './features/Client/client-profile/pages/Profile';
import Settings from './features/Client/client-setting/pages/Setting';
import ProjectDetails from './features/Client/client-projects/pages/ProjectDetails';
import ContractDetails from './features/Client/client-contracts/pages/ContractDetails';
import FreeLanceInfo from './features/Client/client-findfreelancer/pages/FreeLanceInfo';
import CreateProject from './features/Client/client-projects/pages/CraeteProject';

    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<NavbarLanding/>} /> 
    //     <Route path='/SignIn' element={<SignIn />} />
    //      <Route path='/Otp' element={<Otp />} />
    //      <Route path='/CreateAccount' element={<CreateAccount />} />
    //      <Route path='/ForgetPassword' element={<ForgetPassword />} />     
        
    //     <Route path="/clientlayout" element={<ClientLayout />}/>
    //        {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
    //       <Route path="/dashboard" element={<Dashboard/>} />
    //       <Route path="/messages" element={<Messages />} />
    //       <Route path="/wallet" element={<Wallet/>} />
      
    //       <Route path="/projects" element={<Projects />}/>
    //       <Route path="/createproject" element={<CreateProject />} />
             
    //       <Route path="id" element={<ProjectDetails />} />
    //       {/* </Route> */}
         
    //       <Route path="/find-freelancers" element={<FindFreelancers />} />
    //       <Route path="/contracts" element={<Contracts />} />
          
    //          <Route path="/ContractDetails" element={<ContractDetails />} />
    //       <Route path="/profile" element={<Profile />} />
    //      <Route path="/setting" element={<Settings />} />
          
    //     {/* </Route> */}
    //   </Routes>
    // </BrowserRouter>
  
        {/* <Route path="/" element={<NavbarLanding />} /> */}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="wallet" element={<Wallet/>} />

          <Route path="projects" element={<Projects />} />

          <Route path="createproject" element={<CreateProject/>}/>
          <Route path="editproject/:id" element={< CreateProject/>} />
          <Route path="FindFreelancers" element={<FindFreelancers/>} />
          <Route path="contracts" element={<Contracts />} />

          <Route path="ContractDetails" element={<ContractDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Settings />} />
              <Route path="/createaccount" element={<CreateAccount />} />
                <Route path="/otp" element={<Otp />} />
          {/* <Route path="SignIn" element={<SignIn />} />
          <Route path="ForgetPassword" element={<ForgetPassword />} />
          <Route path="CreateAccount" element={<CreateAccount />} />
          <Route path="Otp" element={<Otp />} />
          <Route path="NavbarLanding" element={<NavbarLanding />} /> */}
          <Route path="FreeLanceInfo" element={<FreeLanceInfo />} />
        </Route>


     {/* <Route path="/" element={<NavbarLanding />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/otp" element={<Otp />} />
    <Route path="/createaccount" element={<CreateAccount />} />
    <Route path="/forgetpassword" element={<ForgetPassword />} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;