import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./context/AuthContext.jsx";

import Splash from "./pages/Splash.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Login from "./pages/Login.jsx";
import Otp from "./pages/Otp.jsx";
import Permissions from "./pages/Permissions.jsx";
import VehicleDetails from "./pages/VehicleDetails.jsx";
import PersonalDetails from "./pages/PersonalDetails.jsx";
import AddService from "./pages/AddService.jsx";
import AddServiceLocation from "./pages/AddServiceLocation.jsx";
import ApplicationUnderReview from "./pages/ApplicationUnderReview.jsx";
import ActionRequired from "./pages/ActionRequired.jsx";
import GoOnline from "./pages/GoOnline.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import NewJobRequest from "./pages/NewJobRequest.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import JobInProgress from "./pages/JobInProgress.jsx";
import JobCompleted from "./pages/JobCompleted.jsx";
import Earnings from "./pages/Earnings.jsx";
import Messages from "./pages/Messages.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileEdit from "./pages/ProfileEdit.jsx";
import ServiceEdit from "./pages/ServiceEdit.jsx";
import LocationEdit from "./pages/LocationEdit.jsx";

function Protected({ element }) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/permissions" element={<Permissions />} />
          {/* Not wrapped in ProtectedRoute: at this point the technician only holds a
              short-lived, OTP-verified registration token (not a JWT) from /otp. */}
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/vehicle-details" element={<Protected element={<VehicleDetails />} />} />
          <Route path="/add-service" element={<Protected element={<AddService />} />} />
          <Route path="/add-service-location" element={<Protected element={<AddServiceLocation />} />} />
          <Route path="/application-under-review" element={<Protected element={<ApplicationUnderReview />} />} />
          <Route path="/action-required" element={<Protected element={<ActionRequired />} />} />
          <Route path="/go-online" element={<Protected element={<GoOnline />} />} />

          <Route path="/dashboard" element={<Protected element={<Dashboard />} />} />
          <Route path="/jobs" element={<Protected element={<MyJobs />} />} />
          <Route path="/jobs/new" element={<Protected element={<NewJobRequest />} />} />
          <Route path="/jobs/details" element={<Protected element={<JobDetails />} />} />
          <Route path="/jobs/in-progress" element={<Protected element={<JobInProgress />} />} />
          <Route path="/jobs/completed" element={<Protected element={<JobCompleted />} />} />
          <Route path="/earnings" element={<Protected element={<Earnings />} />} />
          <Route path="/messages" element={<Protected element={<Messages />} />} />
          <Route path="/profile" element={<Protected element={<Profile />} />} />
          <Route path="/profile/edit" element={<Protected element={<ProfileEdit />} />} />
          <Route path="/profile/service" element={<Protected element={<ServiceEdit />} />} />
          <Route path="/profile/location" element={<Protected element={<LocationEdit />} />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
