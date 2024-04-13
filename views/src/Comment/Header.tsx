import React, { useState, useRef, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './css/Header.scss';
import { Categoryitems } from './tool/MenuTool';

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

  const handleItemClick = (url: string) => {
    // 수정된 부분: item.url을 직접 전달받음
    navigate(url); // 수정된 부분: url로 바로 이동
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
    } else {
      // 사용자 입력값을 가지고 Search 페이지로 이동합니다.
      const searchQuery = encodeURIComponent(inputValue.trim());
      navigate(`/search/${searchQuery}`);
      closePopup();
    }
  };

  // 새로운 창으로 이동할 때 팝업을 닫기
  const handleLinkClick = () => {
    setSearchPopup(false);
  };
  // 검색 클릭 > popup 창 > 하단 li 리스트 클릭 이벤트
  const searchClick = (e: any) => {
    navigate(`/search/${e.target.textContent}`);
    closePopup();
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
                      {Categoryitems.map((Categoryitems, index) => (
                        <span
                          key={index}
                          onMouseEnter={() => setHoveredItem(index)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => handleItemClick(Categoryitems.url)}
                        >
                          {Categoryitems.title}{' '}
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
              <Link to="/shop">
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
            <Link to="/AllSet" className="AllSet">
              세트 메뉴
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
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        행거
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        사계절 이불
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        불끄기 스위치
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        호텔수건
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        보풀제거기
                      </li>
                    </ul>
                    <ul>
                      {' '}
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        화장품 정리함
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        압축백
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        디퓨저
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        접이식 매트리스
                      </li>
                      <li
                        onClick={(e) => {
                          searchClick(e);
                        }}
                      >
                        청소기
                      </li>
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
