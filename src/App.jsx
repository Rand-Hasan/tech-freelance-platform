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
import CreatePortifolio from './features/FreeLancer/Portifolio/Pages/CreatePortifolio';
import CreateCv from './features/FreeLancer/CV/pages/CreateCv';
import CreateSkill from './features/FreeLancer/Skills/pages/CreateSkillis';
import CreateProfilee from './features/FreeLancer/Profile/pages/Createprofile';
import FreeLancerLayout from './features/FreeLancer/layout/FreelancerLayout';
import ContractFree from './features/FreeLancer/freelancer-contract/pages/ContractFree';
import ProjectFree from './features/FreeLancer/freelancer-project/pages/ProjectFree';
import MessageFree from './features/FreeLancer/freelancer-message/pages/MessageFree';
import WalletFree from './features/FreeLancer/freelancer-wallet/pages/WalletFree';
import ShowProfile from './features/FreeLancer/Profile/pages/ShowProfile';
import Showportofoliodetails from './features/FreeLancer/Portifolio/Pages/Showportofoliodetails';
import PersonalInfo from './features/FreeLancer/Profile/pages/PersonalInfo';
import ShowSkills from './features/FreeLancer/Skills/pages/ShowSkills';
import ShowPortfolio from './features/FreeLancer/Portifolio/Pages/ShowPortfolio';
import ShowCv from './features/FreeLancer/CV/pages/ShowCv';
import ProjectProposal from './features/FreeLancer/project-proposal/pages/projectproposal';
import Request from './features/FreeLancer/request/pages/client-request';
import Myproject from './features/FreeLancer/myproject/pages/myproject';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarLanding />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />


        <Route path="/CreateSkillis" element={<CreateSkill />} />
        <Route path="/CreatePortifolio" element={<CreatePortifolio />} />
        <Route path='CreateCv' element={<CreateCv />} />CreateProfile
        <Route path="/CreateProfile" element={<CreateProfilee />} />



        {/* Client */}
        <Route path="/clientlayout" element={<ClientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="wallet" element={<Wallet />} />

          <Route path="projects" element={<Projects />} />

          <Route path="createproject" element={<CreateProject />} />
          <Route path="editproject/:id" element={< CreateProject />} />
          <Route path="FindFreelancers" element={<FindFreelancers />} />
          <Route path="contracts" element={<Contracts />} />

          <Route path="ContractDetails" element={<ContractDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Settings />} />
          <Route path="FreeLanceInfo" element={<FreeLanceInfo />} />
        </Route>
        {/* Freelancer */}
        <Route path='/freelancerlayout' element={<FreeLancerLayout />}>
          <Route path="contractfree" element={<ContractFree />} />
          {/* project */}
          <Route path='projectfree' element={<ProjectFree />}>
            <Route path='projectproposal' element={<ProjectProposal />} />
            <Route path='clientrequest' element={<Request />} />
            <Route path='myproject' element={<Myproject />} />
          </Route>

          <Route path='messagefree' element={<MessageFree />} />
          <Route path='walletfree' element={<WalletFree />} />

          <Route path='showprofile' element={<ShowProfile />}>
            <Route path='personal' element={<PersonalInfo />} />
            <Route path='skills' element={<ShowSkills />} />
            <Route path='portfolio' element={<ShowPortfolio />} />
            <Route path='cv' element={<ShowCv />} />
            <Route path='showportofoliodetails' element={<Showportofoliodetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;