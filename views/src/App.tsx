import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;


