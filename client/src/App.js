import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TripDetails from './pages/TripDetails';
import UserProfile from'./pages/UserProfile';



import './styles/App.css'; // se hai uno stile globale


function App() {
  return (
    <AuthProvider>
      
  
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trip-details" element={<TripDetails />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
     
    </AuthProvider>
  );
}

export default App;
