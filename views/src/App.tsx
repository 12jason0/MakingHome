import React, { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Header from './Comment/Header';
import Popular from './pages/Popular';
import Sale from './pages/Sale';

function App() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  return (
    <BrowserRouter>
      {showHeader && <Header />}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setShowHeader={setShowHeader} />}
        />
        <Route
          path="/register"
          element={<RegisterPage setShowHeader={setShowHeader} />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Popular" element={<Popular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
