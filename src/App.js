import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import your Navbar component
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import './App.css'; // Global styles, if any

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar displayed on all pages */}
        <Navbar />
        <div className="app-content">
          {/* Define routes for each page */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
