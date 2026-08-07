import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import ClientLayout from './features/Client/layout/ClientLayout';
import SignIn from './features/Auth/pages/SignIn';
import Otp from './features/Auth/pages/Otp';
import ForgetPassword from './features/Auth/pages/ForgetPassword';
import CreateAccount from './features/Auth/pages/CreateAccount';
import NavbarLanding from './features/landing-page/pages/navbarlanding';
import MessageClient from './features/Client/client- messages/pages/MessageClient';
import Dashboard from './features/Client/client-dashboard/pages/Dashboard';
import FindFreelancers from './features/Client/client-findfreelancer/pages/FindFreelancers';
import Projects from './features/Client/client-projects/pages/Project';
import Contracts from './features/Client/client-contracts/pages/Contracts';
import Profile from './features/Client/client-profile/pages/Profile';
import Settings from './features/Client/client-setting/pages/Setting';
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
import Myproject from './features/FreeLancer/myproject/pages/myproject';
import ProjectProposalDetails from './features/FreeLancer/project-proposal/pages/ProjectProposaldetails';
import ShowInvationFree from './features/FreeLancer/request/pages/freelancer-invation';
import ProjectDetails from "./features/Client/client-projects/pages/ProjectDetails";
import MatchedFreelancers from "./features/Client/MatchedFreelancers/pages/MatchedFreelancers";
import ProgressMonitor from "./features/Client/ProgressMonitor/pages/ProgressMonitor";
import StagesAndTasks from './features/Client/StagesAndTasks/pages/StagesAndTasks';
import WorkAndCodeReview from "./features/Client/WorkAndCodeReview/pages/WorkAndCodeReview";
import Invaitations from "./features/Client/Invaitations/pages/Invaitations";
import ShowOffersFreelancer from './features/FreeLancer/offers/pages/ShowOffersFreelancer';
import ShowOfferProject from './features/Client/offer-project/pages/ShowOfferProject';
import CreateContractt from './features/Client/client-contracts/pages/CreateContract';
import FreelancerHome from './features/FreeLancer/Home/pages/FreelancerHome';
import WalletClient from './features/Client/client-wallet/pages/Wallet';
import PaymentSuccess from './features/Client/client-wallet/pages/PaymentSuccess';
import PaymentPage from './features/Client/client-wallet/pages/PaymentPage';
import PhasesProject from './features/FreeLancer/myproject/pages/PhaseProject';
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
        <Route path='CreateCv' element={<CreateCv />} />
        <Route path="/CreateProfile" element={<CreateProfilee />} />
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {/* Client */}
        <Route path="/clientlayout" element={<ClientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
         <Route path="messageClient" element={<MessageClient/>} />
          <Route path="messageClient/:freelancer_id" element={<MessageClient/>} />
         <Route path="wallet" element={<WalletClient />} />
         <Route path="wallet/:contractId" element={<WalletClient />} />    
          <Route path="payment/:contractId" element={<PaymentPage/>}/>
          <Route
    path="payment-success"
    element={<PaymentSuccess />}
/>
          <Route path="projects" element={<Projects />} />
          <Route path='invaitations' element={<Invaitations/>}/>
          {/* project detail client */}
          <Route path="projectdetails/:id" element={<ProjectDetails />}>
            <Route index element={<StagesAndTasks />} />
            <Route path="matched-freelancers" element={<MatchedFreelancers />} />
            <Route path="progress-monitor" element={<ProgressMonitor />} />
            <Route path="WorkAndCodeReview" element={<WorkAndCodeReview />} />
            <Route path='offer-project' element={<ShowOfferProject/>}/>
          </Route>
          <Route path="createproject" element={<CreateProject />} />
          <Route path="editproject/:id" element={< CreateProject />} />
          <Route path='createcontract' element={<CreateContractt/>} />
          <Route path='editcontract/:id' element={<CreateContractt/>}/>
          <Route path="FindFreelancers" element={<FindFreelancers />} />
          <Route path="contracts" element={<Contracts />} />

          <Route path="ContractDetails/:id" element={<ContractDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Settings />} />
          <Route path="FreeLanceInfo" element={<FreeLanceInfo />} />
        </Route>
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        {/* Freelancer */}
        <Route path='/freelancerlayout' element={<FreeLancerLayout />}>
        <Route index element={<FreelancerHome/>} />
          <Route path="contractfree" element={<ContractFree />} />
          {/* project freelancer */}
          <Route path='projectfree' element={<ProjectFree />}>
            <Route path='projectproposal' element={<ProjectProposal />} />
            <Route path='projectproposaldetails/:id' element={<ProjectProposalDetails />} />
            <Route path='freelancerrequest' element={<ShowInvationFree />} />
            <Route path='myoffers' element ={<ShowOffersFreelancer/>}/>
            <Route path='myproject' element={<Myproject />}/> 
            <Route path='phaseproject/:id' element={<PhasesProject/>}/>
          </Route>

         <Route path='messagefree/:clientId' element={<MessageFree />} />
         <Route path='messagefree' element={<MessageFree />} />
          <Route path='walletfree' element={<WalletFree />} />
          {/* Show Profile */}
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