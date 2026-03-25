import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainWelcome from './pages/MainWelcome';
import RegisterRole from './pages/RegisterRole';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RegisterCharity from './pages/RegisterCharity';
const Login = () => <div style={{padding: '50px'}}>Login Page...</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          
          <Route path="/" element={<MainWelcome />} />
          
          
          <Route path="/register-role" element={<RegisterRole />} />
          
          
          <Route path="/login" element={<Login />} />


          <Route path="/register-restaurant" element={<RegisterRestaurant />} />
        
          <Route path="/register-charity" element={<RegisterCharity />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;