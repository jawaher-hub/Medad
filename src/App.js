import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import MainWelcome from './pages/MainWelcome';   

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<MainWelcome />} />  
        </Routes>
      </div>
    </Router>
  );
}
export default App;
