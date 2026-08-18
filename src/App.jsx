
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";

// Layouts
import ClientLayout from "./features/Client/layout/ClientLayout";
import FreeLancerLayout from "./features/FreeLancer/layout/FreelancerLayout";
import AdminLayout from "./features/Admin/Layout/AdminLayout";

// Auth
import SignIn from "./features/Auth/pages/SignIn";
import Otp from "./features/Auth/pages/Otp";
import ForgetPassword from "./features/Auth/pages/ForgetPassword";
import CreateAccount from "./features/Auth/pages/CreateAccount";

// Landing
import NavbarLanding from "./features/landing-page/pages/navbarlanding";

// Client
import MessageClient from "./features/Client/client- messages/pages/MessageClient";
import Dashboard from "./features/Client/client-dashboard/pages/Dashboard";
import FindFreelancers from "./features/Client/client-findfreelancer/pages/FindFreelancers";
import WalletClient from "./features/Client/client-wallet/pages/Wallet";
import PaymentSuccess from "./features/Client/client-wallet/pages/PaymentSuccess";
import PaymentPage from "./features/Client/client-wallet/pages/PaymentPage";
import Projects from "./features/Client/client-projects/pages/Project";
import Contracts from "./features/Client/client-contracts/pages/Contracts";
import Profile from "./features/Client/client-profile/pages/Profile";
import Settings from "./features/Client/client-setting/pages/Setting";
import ContractDetails from "./features/Client/client-contracts/pages/ContractDetails";
import CreateProject from "./features/Client/client-projects/pages/CraeteProject";
import CreateContractt from "./features/Client/client-contracts/pages/CreateContract";
import ProjectDetails from "./features/Client/client-projects/pages/ProjectDetails";
import MatchedFreelancers from "./features/Client/MatchedFreelancers/pages/MatchedFreelancers";
import ProgressMonitor from "./features/Client/ProgressMonitor/pages/ProgressMonitor";
import StagesAndTasks from "./features/Client/StagesAndTasks/pages/StagesAndTasks";
import AddPhaseDetailes from "./features/Client/StagesAndTasks/pages/AddPhaseDetailes";
import StageAndTasksDetailes from "./features/Client/StagesAndTasks/pages/StageAndTasksDetailes";
import UpdatePhaseOfferPage from "./features/Client/StagesAndTasks/pages/UpdatePhaseOfferPage";
import WorkAndCodeReview from "./features/Client/WorkAndCodeReview/pages/WorkAndCodeReview";
import Invaitations from "./features/Client/Invaitations/pages/Invaitations";
import ShowOfferProject from "./features/Client/offer-project/pages/ShowOfferProject";

// Freelancer
import CreatePortifolio from "./features/FreeLancer/Portifolio/Pages/CreatePortifolio";
import CreateCv from "./features/FreeLancer/CV/pages/CreateCv";
import CreateSkill from "./features/FreeLancer/Skills/pages/CreateSkillis";
import CreateProfilee from "./features/FreeLancer/Profile/pages/Createprofile";
import ContractFree from "./features/FreeLancer/freelancer-contract/pages/ContractFree";
import FreelancerContractDetailes from "./features/FreeLancer/freelancer-contract/pages/FreelancerContractDetailes";
import ProjectFree from "./features/FreeLancer/freelancer-project/pages/ProjectFree";
import MessageFree from "./features/FreeLancer/freelancer-message/pages/MessageFree";
import WalletFree from "./features/FreeLancer/freelancer-wallet/pages/WalletFree";
import ShowProfile from "./features/FreeLancer/Profile/pages/ShowProfile";
import PersonalInfo from "./features/FreeLancer/Profile/pages/PersonalInfo";
import ShowSkills from "./features/FreeLancer/Skills/pages/ShowSkills";
import ShowPortfolio from "./features/FreeLancer/Portifolio/Pages/ShowPortfolio";
import Showportofoliodetails from "./features/FreeLancer/Portifolio/Pages/Showportofoliodetails";
import ShowCv from "./features/FreeLancer/CV/pages/ShowCv";
import ProjectProposal from "./features/FreeLancer/project-proposal/pages/projectproposal";
import ProjectProposalDetails from "./features/FreeLancer/project-proposal/pages/ProjectProposaldetails";
import Myproject from "./features/FreeLancer/myproject/pages/myproject";
import PhasesProject from "./features/FreeLancer/myproject/pages/PhaseProject";
import PhaseDetails from "./features/FreeLancer/myproject/pages/PhaseDetails";
import TasksandFiles from "./features/FreeLancer/myproject/pages/TasksandFiles";
import ClientRespond from "./features/FreeLancer/myproject/pages/ClientResponds";
import ShowInvationFree from "./features/FreeLancer/request/pages/freelancer-invation";
import ShowOffersFreelancer from "./features/FreeLancer/offers/pages/ShowOffersFreelancer";
import AssessmentQuestionsf from "./features/FreeLancer/Questions/pages/AssessmentQuestionsf";
import AssessmentLevel from "./features/FreeLancer/Questions/pages/AssessmentLevel";
import FreelancerHome from "./features/FreeLancer/Home/pages/FreelancerHome";

// Admin
import Employees from "./features/Admin/Employees/pages/Employees";
import EmployeeDetails from "./features/Admin/Employees/pages/EmployeeDetails";
import RolesPermissions from "./features/Admin/RolesPermissions/pages/RolesPermissions";
import AssessmentQuestions from "./features/Admin/AssessmentQuestions/pages/AssessmentQuestions";
import AddQuestion from "./features/Admin/AssessmentQuestions/pages/AddQuestion";
import EditQuestion from "./features/Admin/AssessmentQuestions/pages/EditQuestion";
import Financial from "./features/Admin/FinesCommission/pages/Financial";
import Statistics from "./features/Admin/Statistics/pages/Statistics";
import AdminContracts from "./features/Admin/Contracts/pages/AdminContracts";
import AdminContractDetails from "./features/Admin/Contracts/pages/AdminContractDetails";
import AdminProjects from "./features/Admin/AdminProjects/pages/AdminProjects";
import AdminProjectDetails from "./features/Admin/AdminProjects/pages/AdminProjectDetails";
import UsersManagement from "./features/Admin/UsersManagement/pages/UsersManagement";
import UserDetails from "./features/Admin/UsersManagement/pages/UserDetails";
import AuditLog from "./features/Admin/AuditLog/pages/AuditLog";
import AdminOffers from "./features/Admin/AdminOffers/pages/AdminOffers";
import AdminOfferDetails from "./features/Admin/AdminOffers/pages/AdminOfferDetails";
import AdminReviews from "./features/Admin/Reviews/pages/AdminReviews";
import FreeLanceInfo from "./features/Client/MatchedFreelancers/pages/FreelancerInfo";
import AdminWallet from "./features/Admin/Wallet/pages/AdminWallet";

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
        <Route path="/CreateCv" element={<CreateCv />} />
        <Route path="/CreateProfile" element={<CreateProfilee />} />
        <Route path="/AssessmentLevel" element={<AssessmentLevel />} />
        <Route path="/AssessmentQuestionsf" element={<AssessmentQuestionsf />} />

        {/* Client */}
        <Route path="/clientlayout" element={<ClientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="messageClient" element={<MessageClient />} />
          <Route path="messageClient/:freelancer_id" element={<MessageClient />} />

          <Route path="wallet" element={<WalletClient />} />
          <Route path="wallet/:contractId" element={<WalletClient />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />

          <Route path="projects" element={<Projects />} />
          <Route path="invaitations" element={<Invaitations />} />
           <Route path="FreeLanceInfo/:id" element={<FreeLanceInfo/>} />

          {/* project detail client */}
          <Route path="projectdetails/:id" element={<ProjectDetails />}>
            <Route index element={<StagesAndTasks />} />
            <Route path="add-phase/:contract_id" element={<AddPhaseDetailes />} />
            <Route path="update-phase/:phaseId" element={<UpdatePhaseOfferPage />} />
            <Route path=":phaseId" element={<StageAndTasksDetailes />} />
            <Route path="matched-freelancers" element={<MatchedFreelancers />} />
            <Route path="progress-monitor" element={<ProgressMonitor />} />
            <Route path="progress-monitor/:id" element={<ProgressMonitor />} />
            <Route path="WorkAndCodeReview" element={<WorkAndCodeReview />} />
            <Route path="offer-project" element={<ShowOfferProject />} />
          </Route>

          <Route path="createproject" element={<CreateProject />} />
          <Route path="editproject/:id" element={<CreateProject />} />
          <Route path="createcontract" element={<CreateContractt />} />
          <Route path="editcontract/:id" element={<CreateContractt />} />

          {/* <Route path="FindFreelancers" element={<FindFreelancers />} /> */}
          <Route path="contracts" element={<Contracts />} />
          <Route path="ContractDetails/:id" element={<ContractDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Settings />} />
          
        </Route>

        {/* Freelancer */}
        <Route path="/freelancerlayout" element={<FreeLancerLayout />}>
          <Route index element={<FreelancerHome />} />
          <Route path="contractfree" element={<ContractFree />} />
          <Route path="FreelancerContractDetailes/:id" element={<FreelancerContractDetailes />} />

          <Route path="projectfree" element={<ProjectFree />}>
            <Route index element={<ProjectProposal />} />
            <Route path="projectproposaldetails/:id" element={<ProjectProposalDetails />} />
            <Route path="freelancerrequest" element={<ShowInvationFree />} />
            <Route path="myoffers" element={<ShowOffersFreelancer />} />
            <Route path="myproject" element={<Myproject />} />
            <Route path="phaseproject/:id" element={<PhasesProject />} />
            <Route path="phasedetails/:id" element={<PhaseDetails />}>
              <Route index element={<TasksandFiles />} />
              <Route path="clientrespond" element={<ClientRespond />} />
            </Route>
          </Route>

          <Route path="messagefree/:clientId" element={<MessageFree />} />
          <Route path="messagefree" element={<MessageFree />} />
          <Route path="walletfree" element={<WalletFree />} />

          <Route path="showprofile" element={<ShowProfile />}>
            <Route path="personal" element={<PersonalInfo />} />
            <Route path="skills" element={<ShowSkills />} />
            <Route path="portfolio" element={<ShowPortfolio />} />
            <Route path="cv" element={<ShowCv />} />
            <Route path="showportofoliodetails" element={<Showportofoliodetails />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route path="/AdminLayout" element={<AdminLayout />}>
          <Route index element={<Navigate to="Employees" replace />} />

          <Route path="Employees" element={<Employees />} />
          <Route path="employees/:employeeId" element={<EmployeeDetails />} />

          <Route path="RolesPermissions" element={<RolesPermissions />} />
          <Route path="AssessmentQuestions" element={<AssessmentQuestions />} />
          <Route path="AddQuestion" element={<AddQuestion />} />
          <Route path="EditQuestion/:id" element={<EditQuestion />} />

          <Route path="Financial" element={<Financial />} />
          <Route path="Statistics" element={<Statistics />} />

          <Route path="AdminContracts" element={<AdminContracts />} />
          <Route path="AdminContractDetails/:contractId" element={<AdminContractDetails />} />
          <Route path="AdminProjects" element={<AdminProjects />} />
          <Route path="AdminProjectDetails/:projectId" element={<AdminProjectDetails />} />

          <Route path="UsersManagement" element={<UsersManagement />} />
          <Route path="UsersManagement/:userId" element={<UserDetails />} />

          <Route path="AuditLog" element={<AuditLog />} />
          <Route path="AdminWallet" element={<AdminWallet />} />
          <Route path="AdminOffers" element={<AdminOffers />} />
          <Route path="AdminOfferDetails/:offerId" element={<AdminOfferDetails />} />
          <Route path="AdminReviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
