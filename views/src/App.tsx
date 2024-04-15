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
import Money from './pages/Money';
import HouseGift from './pages/HouseGift';
import AllSet from './pages/AllSet';
import Set from './pages/Set';
import Search from './pages/Search';
import { MainsetImg } from './Comment/tool/MainSetTool';
import LikePage from './pages/LikePage';
import { Categoryitems } from './Comment/tool/MenuTool';
import Good from './pages/Good';
import Shopping from './pages/Shopping';
import GoodIssue from './pages/GoodIssue';
import MyPage from './pages/MyPage';

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
        <Route
          path="/Good/:type"
          element={<Good Categoryitems={Categoryitems} />}
        />
        <Route path="/GoodIssue/:id" element={<GoodIssue />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Money" element={<Money />} />
        <Route path="/HouseGift" element={<HouseGift />} />
        <Route path="/Announcement1" element={<Announcement1 />} />
        <Route path="/Announcement2" element={<Announcement2 />} />
        <Route path="/Announcement3" element={<Announcement3 />} />
        <Route path="/AllSet" element={<AllSet />} />
        <Route path="/Set/:type" element={<Set MainsetImg={MainsetImg} />} />
        <Route path="/search/:item" element={<Search />} />
        <Route path="/LikePage" element={<LikePage />} />
        <Route path="/shop" element={<Shopping />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
