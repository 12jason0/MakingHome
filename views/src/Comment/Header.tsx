import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './css/Header.scss';
import {
  items,
  itemTrees,
  homeAppliances,
  Fabric,
  clothes,
  DailySupplies,
  hobby,
  Lighting,
  Tool,
} from './tool/MenuTool';

export default function Header() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleItemClick = (item: string) =>
    setSelectedItem((prev) => (prev === item ? null : item));

  const handleMouseLeave = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPopup]);

  const getPopupItems = () => {
    switch (selectedItem) {
      case '원룸 가전':
        return homeAppliances;
      case '가구':
        return itemTrees;
      case '패브릭':
        return Fabric;
      case '옷정리/보관':
        return clothes;
      case '생활용품':
        return DailySupplies;
      case '소품/취미':
        return hobby;
      case '조명':
        return Lighting;
      case '셀프인테리어/공구':
        return Tool;
      default:
        return [];
    }
  };

  return (
    <>
      <div>
        <div className="header">
          <div className="headerCon">
            <button className="open" onClick={togglePopup}>
              <span className="menuDiv">
                <img
                  src={`${process.env.PUBLIC_URL}/image/menu.png`}
                  alt="menu"
                />
              </span>
            </button>
            {showPopup && (
              <nav className="popup" onMouseLeave={handleMouseLeave}>
                <div className="popup_inner">
                  <div className="spanDiv">
                    <div className="menutoggle">
                      {items.map((item, index) => (
                        <span
                          key={index}
                          onMouseEnter={() => setHoveredItem(index)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => handleItemClick(item)}
                        >
                          {item}
                          {hoveredItem === index && (
                            <img
                              src={`${process.env.PUBLIC_URL}/image/right-arrow.png`}
                              alt="Right Arrow"
                            />
                          )}
                        </span>
                      ))}
                    </div>
                    {selectedItem && (
                      <div className="itemTrees">
                        {getPopupItems().map((tree, index) => (
                          <span key={index}>{tree}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            )}
            <a href="/">
              <span className="logoDiv">
                <img
                  src={`${process.env.PUBLIC_URL}/image/logo.png`}
                  alt="logo"
                />
              </span>
            </a>
            <span className="rightCon">
              <Link to="/Search">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/search.png`}
                    alt="search"
                  />
                </div>
              </Link>
              <Link to="/shopping">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/shopping-cart.png`}
                    alt="shopping cart"
                  />
                </div>
              </Link>
              <Link to="user">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/user.png`}
                    alt="user"
                  />
                </div>
              </Link>
            </span>
          </div>
          <div className="line"></div>
          <div className="headerConUnder">
            <Link to="/Sale" className="Sale">
              단독 세일
            </Link>
            <Link to="/Popular" className="menu-link">
              인기 차트
            </Link>
            <Link to="/under-10000" className="menu-link">
              만원 이하
            </Link>
            <Link to="/housewarming-gift" className="menu-link">
              집들이 선물
            </Link>
            <Link to="/all-products" className="menu-link">
              모든 상품
            </Link>
          </div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
}
