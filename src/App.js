import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/js/Login';
// import OTP from './components/js/OTP';
import SuperAdminDashboard from './components/js/SuperAdminDashboard';
import ClientDashboard from './components/js/ClientDashboard';
// import ClientQuestionnaireDasboard from './components/js/ClientQuestionnaireDasboard';
// import ClientQuestionnaireTeamSplit from './components/js/ClientQuestionnaireTeamSplit';
// import ClientQuestionaire from './components/js/ClientQuestionaire';
import LoadingResponse from './components/js/LoadingResponse';
// import ClientQuestionnaireGeneral from './components/js/ClientQuestionnaireGeneral';
// import ClientLogin from './components/js/ClientLogin';
// import ClientOTP from './components/js/ClientOTP';
// import SuperAdminQuestionnaireDasboard from './components/js/SuperAdminQuestionnaireDasboard';
// import SuperAdminQuestionnaireTeamSplit from './components/js/SuperAdminQuestionnaireTeamSplit';
// import SuperAdminQuestionnaireList from './components/js/SuperAdminQuestionnaireList';
// import SuperAdminMIS from './components/js/SuperAdminMIS';
// import AdminCIReportWord from './components/js/AdminCIReportWord';
// import AdminQuestionnaireGeneral from './components/js/AdminQuestionnaireGeneral';
import AddInsurerComponent from './components/js/AddInsurerComponent'
import AddUserComponent from './components/js/AddUserComponent'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        {/* <Route exact path='/otp' element={<OTP />} /> */}
        <Route exact path='/superAdminDashboard' element={<SuperAdminDashboard />} />
        {/* <Route exact path='/superAdminQuestionnaireDasboard' element={<SuperAdminQuestionnaireDasboard />} /> */}
        {/* <Route exact path='/superAdminQuestionnaireTeamSplit' element={<SuperAdminQuestionnaireTeamSplit />} /> */}
        {/* <Route exact path='/superAdminQuestionnaireList' element={<SuperAdminQuestionnaireList />} /> */}
        {/* <Route exact path='/superAdminMIS' element={<SuperAdminMIS />} /> */}
        {/* <Route exact path='/adminCIReportWord' element={<AdminCIReportWord />} /> */}
        {/* <Route exact path='/adminQuestionnaireGeneral' element={<AdminQuestionnaireGeneral />} /> */}
        <Route exact path='/clientDashboard' element={<ClientDashboard />} />
        {/* <Route exact path='/clientQuestionnaireDasboard' element={<ClientQuestionnaireDasboard />} /> */}
        {/* <Route exact path='/clientQuestionnaireTeamSplit' element={<ClientQuestionnaireTeamSplit />} /> */}
        {/* <Route exact path='/clientQuestionaire' element={<ClientQuestionaire />} /> */}
        <Route exact path='/loadingResponse' element={<LoadingResponse />} />
        {/* <Route exact path='/clientQuestionnaireGeneral' element={<ClientQuestionnaireGeneral />} /> */}
        {/* <Route exact path='/clientLogin' element={<ClientLogin />} /> */}
        {/* <Route exact path='/clientOTP' element={<ClientOTP />} /> */}
        <Route exact path='/addInsurerComponent' element={<AddInsurerComponent/>} />
        <Route exact path='/addUserComponent' element={<AddUserComponent/>} />
      </Routes>
    </div>
  );
}

export default App;
