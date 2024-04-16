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
      (searchPopup &&
        searchUseRef.current &&
        !searchUseRef.current.contains(e.target as Node)) ||
      (!searchPopup &&
        showPopup &&
        !(e.target as HTMLElement).classList.contains('menuDiv'))
    ) {
      closePopup();
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (searchPopup || showPopup) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [searchPopup, showPopup]);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleItemClick = (url: string) => {
    navigate(url); // URL로 이동
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
      const searchQuery = encodeURIComponent(inputValue.trim());
      navigate(`/search/${searchQuery}`);
      closePopup();
    }
  };

  const handleLinkClick = () => {
    setShowPopup(false); // 다른 페이지로 이동할 때 팝업 닫기
    setSearchPopup(false); // 다른 페이지로 이동할 때 검색 팝업 닫기
  };

  const searchClick = (e: any) => {
    navigate(`/search/${e.target.textContent}`);
    closePopup();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 510);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 510);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
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
                          onClick={(e) => {
                            handleItemClick(Categoryitems.url);
                            e.stopPropagation(); // 이벤트 버블링 중지
                          }}
                        >
                          {Categoryitems.title}
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
                    onClick={() =>
                      localStorage.getItem('oneroomToken')
                        ? navigate('/mypage')
                        : navigate('/shop')
                    }
                  />
                </div>
              </Link>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/image/user.png`}
                  alt="user"
                  onClick={() =>
                    localStorage.getItem('oneroomToken')
                      ? navigate('/mypage')
                      : navigate('/login')
                  }
                />
              </div>
            </span>
          </div>
          <div className="line"></div>

          <div onClick={toggleMenu} className="toggleMenu">
            {isSmallScreen ? (
              isOpen ? (
                <div className="MenuToggle2">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/upArrow.png`}
                    alt="arrow_down"
                    onClick={handleToggle}
                  />
                  <div className="headerConUnder">
                    <div style={{ display: isOpen ? 'block' : 'none' }}>
                      <Link
                        to="/AllSet"
                        className="AllSet"
                        onClick={scrollToTop}
                      >
                        세트 메뉴
                      </Link>
                      <Link
                        to="/Popular"
                        className="menu-link"
                        onClick={scrollToTop}
                      >
                        인기 차트
                      </Link>
                      <Link
                        to="/Money"
                        className="menu-link"
                        onClick={scrollToTop}
                      >
                        만원 이하
                      </Link>
                      <Link
                        to="/HouseGift"
                        className="menu-link"
                        onClick={scrollToTop}
                      >
                        집들이 선물
                      </Link>
                      <Link
                        to="/Good/10"
                        className="menu-link"
                        onClick={scrollToTop}
                      >
                        모든 상품
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/image/UnderArrow.png`}
                  alt="arrow_up"
                  onClick={handleToggle}
                />
              )
            ) : (
              <div className="headerConUnder">
                <Link to="/AllSet" className="AllSet" onClick={scrollToTop}>
                  세트 메뉴
                </Link>
                <Link to="/Popular" className="menu-link" onClick={scrollToTop}>
                  인기 차트
                </Link>
                <Link to="/Money" className="menu-link" onClick={scrollToTop}>
                  만원 이하
                </Link>
                <Link
                  to="/HouseGift"
                  className="menu-link"
                  onClick={scrollToTop}
                >
                  집들이 선물
                </Link>
                <Link to="/Good/10" className="menu-link" onClick={scrollToTop}>
                  모든 상품
                </Link>
              </div>
            )}
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
