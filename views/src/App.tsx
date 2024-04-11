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
import AllGood from './pages/AllGood';
import ItemTrees from './pages/ItemType/ItemTrees';
import HomeAppliances from './pages/ItemType/HomeAppliances';
import Fabric from './pages/ItemType/Fabric';
import Clothes from './pages/ItemType/Clothes';
import DailySupplies from './pages/ItemType/DailySupplies';
import Hobby from './pages/ItemType/Hobby';
import Lighting from './pages/ItemType/Lighting';
import Tool from './pages/ItemType/Tool';
import Money from './pages/Money';
import HouseGift from './pages/HouseGift';
import AllSet from './pages/AllSet';
import Set from './pages/Set';
import Search from './pages/Search';
import { MainsetImg } from './Comment/tool/MainSetTool';

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
        <Route path="/" element={<MainPage setShowHeader={setShowHeader} />} />
        <Route path="/all" element={<AllGood />} />
        <Route path="/ItemTrees" element={<ItemTrees />} />
        <Route path="/homeAppliances" element={<HomeAppliances />} />
        <Route path="/Fabric" element={<Fabric />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path="/Hobby" element={<Hobby />} />
        <Route path="/Lighting" element={<Lighting />} />
        <Route path="/Tool" element={<Tool />} />
        <Route path="/Money" element={<Money />} />
        <Route path="/HouseGift" element={<HouseGift />} />
        <Route path="/DailySupplies" element={<DailySupplies />} />
        <Route path="/Announcement1" element={<Announcement1 />} />
        <Route path="/Announcement2" element={<Announcement2 />} />
        <Route path="/Announcement3" element={<Announcement3 />} />
        <Route path="/AllSet" element={<AllSet />} />
        <Route path="/Set/:type" element={<Set MainsetImg={MainsetImg} />} />
        <Route path="/search/:item" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
