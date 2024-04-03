import React, { useState } from 'react';
// import './App.css';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Header from './Comment/Header';
import Popular from './pages/Popular';
import Footer from './Comment/Footer';
import Announcement1 from './pages/Announcement1';
import Announcement2 from './pages/Announcement2';
import Announcement3 from './pages/Announcement3';
import Shopping from './pages/Shopping';
import AllGood from './pages/AllGood';

function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  return (
    <BrowserRouter>
      {showHeader && <Header /> }
      <Routes>
<<<<<<< HEAD
        <Route
          path="/login"
          element={<LoginPage setShowHeader={setShowHeader} />}
=======
        <Route path="/login" element={<LoginPage setShowHeader={setShowHeader} />}
>>>>>>> b1f44e3b22ceefef344d3a4d22fa98eee973b2d1
        />
        <Route
          path="/register"
          element={<RegisterPage setShowHeader={setShowHeader} />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/all" element={<AllGood />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Announcement1" element={<Announcement1 />} />
        <Route path="/Announcement2" element={<Announcement2 />} />
        <Route path="/Announcement3" element={<Announcement3 />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
