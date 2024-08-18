import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage/HomePage.js';
// import NavBar from './HomePage/NavBar.js';
import ProfileList from './HomePage/ProfileList.jsx';
import Login from './HomePage/Login.jsx';

function App() {
  return (
    <Router>
      <div className="app">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<ProfileList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
