import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MiddleImages } from '../Comment/tool/MainTool';
import { MiddleCategory } from '../Comment/tool/MainMiddleTool';
import { MainsetImg } from '../Comment/tool/MainSetTool';
import { MainGiftImg } from '../Comment/tool/MainGiftTool';
import { MainUnderGift } from '../Comment/tool/MainGiftUnderTool';
import './css/Main.scss';

interface RMainPageProps {
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
}
function MainPage({ setShowHeader }: RMainPageProps) {
  setShowHeader(true);

  const Slide = () => {
    const slideImages = [
      {
        id: '0',
        img: 'https://m.oneroommaking.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/651b0ef01c3a8964e1b33285c0cdbcad.png',
        url: '',
      },
      {
        id: '1',
        img: 'https://m.oneroommaking.com/web/product/extra/big/202312/a465bdb5a1fe7d4b3a585d4cf9bbfc5d.jpg',
        url: '',
      },
      {
        id: '2',
        img: 'https://m.oneroommaking.com/web/product/big/202311/656b8a84bc76dc0a514c4845f547e9f3.jpg',
        url: '',
      },
      {
        id: '3',
        img: 'https://m.oneroommaking.com/web/product/big/202206/edca24f5e9d8e1ca73a84d437f273c2c.gif',
        url: '',
      },
      {
        id: '4',
        img: 'https://m.oneroommaking.com/web/product/medium/202402/2552f300917e6066714b5dbb7a8d0e43.jpg',
        url: '',
      },
    ];

    /////////////////////////////메인 화면 자동 슬라이드//////////////////////////////////////////////////////
    const [currentIdx, setCurrentIdx] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => clearInterval(interval);
    }, [currentIdx]);

    const preSlide = () => {
      setCurrentIdx(
        (preIdx) => (preIdx - 1 + slideImages.length) % slideImages.length
      );
    };
    const nextSlide = () => {
      setCurrentIdx((preIdx) => (preIdx + 1) % slideImages.length);
    };

    /////////////////////////////인기템 슬라이드//////////////////////////////////////////////////////////
    const [slideImg, setSlideImg] = useState(0);
    const leftSlide = () => {
      const nextIndex = slideImg - 1;
      if (nextIndex >= 0) {
        setSlideImg(nextIndex);
      } else {
        setSlideImg(MiddleImages.length - 4);
      }
    };
    const rightSlide = () => {
      const nextIndex = slideImg + 1;
      if (nextIndex + 3 < MiddleImages.length) {
        setSlideImg(nextIndex);
      } else {
        setSlideImg(0);
      }
    };
    const startIndex = slideImg;
    const endIndex = Math.min(startIndex + 4, MiddleImages.length);

    /////////////////////////////////카테고리///////////////////////////////////////////////////
    const [slideCategoryIdx, setSlideCategoryIdx] = useState(0);
    const leftCategory = () => {
      const nextIndex = slideCategoryIdx - 1;
      if (nextIndex >= 0) {
        setSlideCategoryIdx(nextIndex);
      } else {
        setSlideCategoryIdx(MiddleCategory.length - 6);
      }
    };

    const rightCategory = () => {
      const nextIndex = slideCategoryIdx + 1;
      if (nextIndex <= MiddleCategory.length - 6) {
        setSlideCategoryIdx(nextIndex);
      } else {
        setSlideCategoryIdx(0);
      }
    };
    const startCategoryIndex = slideCategoryIdx;
    const endCategoryIndex = Math.min(
      startCategoryIndex + 6,
      MiddleCategory.length
    );

    ////////////////////////////////////세트 추천/////////////////////////////////////////////
    const [imgset, setImgSet] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setNextSlide();
      }, 3000);

      return () => clearInterval(interval);
    }, [imgset]);

    const setPreSlide = () => {
      setImgSet(
        (preIdx) => (preIdx - 1 + MainsetImg.length) % MainsetImg.length
      );
    };
    const setNextSlide = () => {
      setImgSet((preIdx) => (preIdx + 1) % MainsetImg.length);
    };

    //////////////////////////////////////집들이 선물/////////////////////////////////////////////
    const [giftImg, setGiftImg] = useState(0);
    const startGitfIndex = giftImg;
    const endGiftIndex = Math.min(
      startCategoryIndex + 4,
      MiddleCategory.length
    );

    //////////////////////////////////////만원 이하 선물/////////////////////////////////////////////
    const [giftUnderImg, setGiftUnderImg] = useState(0);
    const startGitfUnderIndex = giftUnderImg;
    const endGiftUnderIndex = Math.min(
      startCategoryIndex + 4,
      MiddleCategory.length
    );

    /////////////////////////////////////////////////////////////////////////////////////
    return (
      <div className="main">
        <div className="BannerSlide">
          <div className="swiperNumber">
            <div className="slideImgContainer">
              <img
                src={slideImages[currentIdx].img}
                alt={`Slide ${currentIdx}`}
              />
            </div>
            <div className="buttonCon">
              <div className="buttonDiv">
                <div className="leftButton" onClick={preSlide}>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/slideleftarrow.png`}
                    alt="이전"
                  />
                </div>
                <div>
                  {currentIdx + 1} / {slideImages.length}
                </div>
                <div className="rightButton" onClick={nextSlide}>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/sliderightarrow.png`}
                    alt="다음"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /////////////////////////////인기템 슬라이드////////////////////////////////////////////////////////// */}
        <div className="MainMiddle">
          <div className="PopolarTitle">
            인기템부터 보여드립니다
            <a href="/popular">
              {' '}
              <button>
                <span>전체 보기</span>
              </button>
            </a>
          </div>
          <div className="PopolarMiddle">
            매일 추가되는 <span>인기템</span>
          </div>
          <div className="PopularMain">
            <div className="MiddleButton" onClick={leftSlide}>
              <img
                src={`${process.env.PUBLIC_URL}/image/setLeftArrow.png`}
                alt="이전"
              />
            </div>
            {MiddleImages.slice(startIndex, endIndex).map((item, index) => (
              <div className="ImgBox" key={index}>
                <a href="">
                  <div className="MiddleSlide">
                    <img src={item.img} alt={`Slide ${slideImg + index}`} />
                  </div>
                  <div className="ImgText">
                    <h5>{item.title}</h5>
                    <p>{item.body}</p>
                  </div>
                </a>
              </div>
            ))}
            <div className="MiddleButton" onClick={rightSlide}>
              <img
                src={`${process.env.PUBLIC_URL}/image/setRightArrow.png`}
                alt="다음"
              />
            </div>
          </div>
        </div>
        {/* /////////////////////////////////카테고리/////////////////////////////////////////////////// */}
        <div className="MainCategoryCon">
          <div className="MainCategoryDiv">
            <span>카테고리별 상품 찾기</span>
            <div className="CategoryCon">
              <div className="leftButton" onClick={leftCategory}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/setLeftArrow.png`}
                  alt="이전"
                />
              </div>
              {MiddleCategory.slice(startCategoryIndex, endCategoryIndex).map(
                (item, index) => (
                  <a href={item.url} key={index}>
                    <div className="CategoryImg">
                      <img
                        src={item.src}
                        alt={`slide ${startCategoryIndex + index}`}
                      />
                    </div>
                    <div>{item.title}</div>
                  </a>
                )
              )}
              <div className="rightButton" onClick={rightCategory}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/setRightArrow.png`}
                  alt="다음"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ////////////////////////////////////세트 추천///////////////////////////////////////////// */}

        <div className="MainSetCon">
          <div className="MainSetDiv">
            <span>자취 로망 세트 메뉴</span>
            <div className="MainSetMenu">
              <div className="leftButton" onClick={setPreSlide}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/setLeftArrow.png`}
                  alt="이전"
                />
              </div>
              <div className="setImgDiv">
                <Link to={`/set/${imgset}`}>
                  <img src={MainsetImg[imgset].img} alt={`Slide${imgset}`} />
                </Link>
              </div>

              <div className="rightButton" onClick={setNextSlide}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/setRightArrow.png`}
                  alt="다음"
                />
              </div>
            </div>
          </div>
        </div>

        {/*    //////////////////////////////////////집들이 선물///////////////////////////////////////////// */}
        <div className="giftCon">
          <div className="giftTitle">
            <span>
              집들이 선물 Best4{' '}
              <img src={`${process.env.PUBLIC_URL}/image/fire.png`} />
            </span>
            <div className="giftDiv">
              {MainGiftImg.slice(startGitfIndex, endGiftIndex).map(
                (item, index) => (
                  <a href="/" key={index}>
                    <div className="giftImgdiv">
                      <img
                        src={item.img}
                        alt={`slide ${startGitfIndex + index}`}
                      />
                      <div className="title">{item.title}</div>
                      <div className="body">{item.body}</div>
                      <div className="sale">
                        {item.sale} <span>{item.price}</span>
                      </div>
                      {item.delivery && (
                        <div className="delivery">{item.delivery}</div>
                      )}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/*    //////////////////////////////////////만원 이하 선물///////////////////////////////////////////// */}
        <div className="giftUnder">
          <div className="giftUnderTitle">
            <span>만원 이하 Best4 ! 가성비 짱</span>
            <div className="giftUnder">
              {MainUnderGift.slice(startGitfUnderIndex, endGiftUnderIndex).map(
                (item, index) => (
                  <a href="/" key={index}>
                    <div className="giftImgUnderdiv">
                      <img
                        className="giftImg"
                        src={item.img}
                        alt={`slide ${startGitfUnderIndex + index}`}
                      />
                      <div className="heartDiv">
                        <img
                          className="heart"
                          src="https://m.oneroommaking.com/_sp/image/mobile/bookmark_h.png"
                          alt=""
                        />
                      </div>
                      <div className="title">{item.title}</div>
                      <div className="body">{item.body}</div>
                      <div className="sale">
                        {item.sale} <span>{item.price}</span>
                      </div>
                      {item.delivery && (
                        <div className="delivery">{item.delivery}</div>
                      )}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Slide />;
}

export default MainPage;
