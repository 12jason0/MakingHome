import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.scss';
import { items } from './tool/MenuTool';

export default function Header() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchPopup, setSearchPopup] = useState(false);
  const searchUseRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const OpenPopup = () => {
    setSearchPopup(true);
  };

  const closePopup = () => {
    setSearchPopup(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      searchPopup &&
      searchUseRef.current &&
      !searchUseRef.current.contains(e.target as Node) &&
      !(e.target as HTMLElement).classList.contains('serchdiv')
    ) {
      closePopup();
    }
  };

  useEffect(() => {
    if (searchPopup) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [searchPopup]);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleItemClick = (item: string) => {
    setSelectedItem((prev) => (prev === item ? null : item));
    navigate(`/category/${item}`);
  };

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = (event.target as HTMLFormElement).querySelector(
      'input'
    )?.value;
    if (!inputValue || inputValue.trim() === '') {
      alert('검색어를 입력하세요!');
      return;
    }
  };

  // 새로운 창으로 이동할 때 팝업을 닫기
  const handleLinkClick = () => {
    setSearchPopup(false);
  };

  return (
    <>
      <div className="headerDiv">
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
                  </div>
                </div>
              </nav>
            )}
            <Link to="/" onClick={handleLinkClick}>
              {' '}
              <span className="logoDiv">
                <img
                  src={`${process.env.PUBLIC_URL}/image/logo.png`}
                  alt="logo"
                />
              </span>
            </Link>{' '}
            <span className="rightCon">
              <div className="serchdiv" onClick={OpenPopup}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/search.png`}
                  alt="search"
                />
              </div>
              <Link to="/shopping">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/shopping-cart.png`}
                    alt="shopping cart"
                  />
                </div>
              </Link>
              <Link to="login">
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
            <Link to="/sale" className="Sale">
              단독 세일
            </Link>
            <Link to="/Popular" className="menu-link">
              인기 차트
            </Link>
            <Link to="/Money" className="menu-link">
              만원 이하
            </Link>
            <Link to="/HouseGift" className="menu-link ">
              집들이 선물
            </Link>
            <Link to="/all" className="menu-link">
              모든 상품
            </Link>
          </div>
          {searchPopup && (
            <div ref={searchUseRef} className="SearchPopupLayout">
              <div className="searchPoppupDiv">
                <form onSubmit={handleSubmit} className="searchForm">
                  {' '}
                  <input
                    type="text"
                    placeholder="입력해주세요"
                    required
                    className="search
                  "
                  />
                  <button type="submit" className="serchButton">
                    <img
                      src={`${process.env.PUBLIC_URL}/image/search.png`}
                      alt=""
                    />
                  </button>
                </form>
                <div>
                  <h3>자취 순위 키워드</h3>
                  <div className="popupList">
                    <ul>
                      <li>행거</li>
                      <li>사계절 이불</li>
                      <li>불끄기 스위치</li>
                      <li>호텔수건</li>
                      <li>보풀제거기</li>
                    </ul>
                    <ul>
                      <li>화장품 정리함</li>
                      <li>압축백</li>
                      <li>디퓨저</li>
                      <li>접이식 매트리스</li>
                      <li>청소기</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
