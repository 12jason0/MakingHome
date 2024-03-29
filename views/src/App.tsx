import React from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Comment/Header';
import Popular from './pages/Popular';
import Sale from './pages/Sale';
import Footer from './Comment/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Popular" element={<Popular />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
