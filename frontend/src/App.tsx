import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Agent } from "./pages/agent/Agent";
import { P404 } from "./pages/P404/P404";
import { CustomerQueries } from "./pages/customer_queries";
import { AgentQueries } from "./pages/agent_queries";
import { Messaging } from "./pages/messaging";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import VerifyEmail from "./pages/authentication/Verify";
import SecurityQuestions from "./pages/authentication/Secques";
import LoginVerify from "./pages/authentication/LoginVerify";
import ForgotPassword from "./pages/authentication/ForgetPassword";
import UserProfile from "./pages/authentication/UserProfile";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ChatbotLoader from "./components/ChatbotLoader";
import RoomManagment from "./pages/room_managment/RoomManagment";
import { AddRoom } from "./pages/room_managment/AddRoom";
import Home from "./pages/Home";
import RoomDetails from "./pages/room_managment/RoomDetails";
import BookingHistory from "./pages/bookings/BookingHistory";
import UpdateRoom from "./pages/room_managment/UpdateRoom";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import { useAuth } from "./context/Auth";

function App() {
  const { status } = useAuth();

  return (
    <div className='App'>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route
            path='/login'
            element={status ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path='/signup'
            element={status ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path='/verify'
            element={status ? <Navigate to="/" replace /> : <VerifyEmail />}
          />
          <Route
            path='/sec-ques'
            element={status ? <Navigate to="/" replace /> : <SecurityQuestions />}
          />
          <Route
            path='/login-verify'
            element={status ? <Navigate to="/" replace /> : <LoginVerify />}
          />
          <Route
            path='/forgotpass'
            element={status ? <Navigate to="/" replace /> : <ForgotPassword />}
          />
          <Route path='/userprofile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path='/room-managment' element={<ProtectedRoute><RoomManagment /></ProtectedRoute>} /> 
          <Route path='/room-managment/add' element={<ProtectedRoute><AddRoom /></ProtectedRoute>} />
          <Route path='/room-managment/update' element={<ProtectedRoute><UpdateRoom /></ProtectedRoute>} />
          <Route path='/room/:roomId' element={<RoomDetails />} />
          <Route path='/booking-history' element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path='/analysis' element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path='/agent' element={<ProtectedRoute><Agent /></ProtectedRoute>} />
          <Route path='/customer-queries' element={<ProtectedRoute><CustomerQueries /></ProtectedRoute>} />
          <Route
            path='/messaging/:customerId/:agentId/:bookingId'
            element={<ProtectedRoute><Messaging /></ProtectedRoute>}
          />
          <Route path='/agent-queries' element={<ProtectedRoute><AgentQueries /></ProtectedRoute>} />
          <Route path='*' Component={P404}></Route>
        </Routes>
      </Router>
      <ToastContainer position='top-right' theme='light' />
      <ChatbotLoader />
    </div>
  );
}

export default App;
