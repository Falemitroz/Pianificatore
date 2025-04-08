import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TripDetails from './pages/TripDetails';


import SlotsSignIn from './pages/login1.js';

import './styles/App.css'; // se hai uno stile globale


function App() {
  return (
    <AuthProvider>
      
  

       <Routes>

       
        <Route path="/login" element={<SlotsSignIn />} />
        {/* altre route */}
      
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trip-details" element={<TripDetails />} />
      </Routes>
     
    </AuthProvider>
  );
}

export default App;
