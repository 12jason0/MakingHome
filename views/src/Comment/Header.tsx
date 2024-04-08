import React, { useState, useRef, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
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
      !(e.target as HTMLElement).classList.contains('serchdiv') // 팝업 외의 영역을 클릭하고 chatDiv가 아닌 경우에만 모든 팝업 닫기
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
      case '셀프인테리어':
        return Tool;
      default:
        return [];
    }
  };
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
    // // 검색된 내용을 URL에 추가하여 새로운 URL을 생성합니다.
    // const searchQuery = encodeURIComponent(inputValue.trim());
    // const newUrl = `/?q=${searchQuery}`;

    // // 새로운 URL로 페이지를 이동합니다.
    // window.location.href = newUrl;
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
            <Link to="/housewarming-gift" className="menu-link ">
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
                  </button>{' '}
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
