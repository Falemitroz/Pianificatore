import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TravelServices from './pages/TravelServices';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import ExpenseTracker from './components/ExpenseTracker';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/travel-services" element={<TravelServices />} />
        <Route path="/expense-tracker" element={<ExpenseTracker/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
