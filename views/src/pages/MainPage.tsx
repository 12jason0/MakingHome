import React, { useEffect, useState } from 'react';
import { MiddleImages, MiddleCategory } from '../Comment/tool/MainTool';
import './css/Main.scss';

function MainPage() {
  const Slide = () => {
    const slideImages = [
      {
        id: '0',
        img: 'https://m.oneroommaking.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/651b0ef01c3a8964e1b33285c0cdbcad.png',
      },
      {
        id: '1',
        img: 'https://m.oneroommaking.com/web/product/extra/big/202312/a465bdb5a1fe7d4b3a585d4cf9bbfc5d.jpg',
      },
      {
        id: '2',
        img: 'https://m.oneroommaking.com/web/product/big/202311/656b8a84bc76dc0a514c4845f547e9f3.jpg',
      },
      {
        id: '3',
        img: 'https://m.oneroommaking.com/web/product/big/202206/edca24f5e9d8e1ca73a84d437f273c2c.gif',
      },
      {
        id: '4',
        img: 'https://m.oneroommaking.com/web/product/medium/202402/2552f300917e6066714b5dbb7a8d0e43.jpg',
      },
    ];

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

    ////////////////////////////////// /////////////////////////////////
    const [slideImg, setSlideImg] = useState(0);
    const leftSlide = () => {
      setSlideImg(
        (prevIdx) => (prevIdx - 4 + MiddleImages.length) % MiddleImages.length
      );
    };
    const rightSlide = () => {
      setSlideImg((prevIdx) => (prevIdx + 1) % MiddleImages.length);
    };
    const startIndex = slideImg;
    const endIndex = Math.min(startIndex + 4, MiddleImages.length);
    if (slideImg >= MiddleImages.length) {
      setSlideImg(0);
    }
    //////////////////////////////카테고리//////////////////////////////////
    const [CategoryImg, setCategoryImg] = useState(0);
    // const MiddleCategory =() => ()

    const leftCategory = () => {
      setCategoryImg(
        (prevIdx) =>
          (prevIdx - 1 + MiddleCategory.length) % MiddleCategory.length
      );
    };
    const rightCategory = () => {
      setCategoryImg((prevIdx) => (prevIdx + 1) % MiddleCategory.length);
    };

    return (
      <>
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
                    src={`${process.env.PUBLIC_URL}/image/MainLeftArrow.png`}
                    alt="이전"
                  />
                </div>
                <div className="rightButton" onClick={nextSlide}>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/mainRightArrow.png`}
                    alt="다음"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="MainLine"></div>
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
          <div className="PopolarMiddle">매일 추가되는 인기템</div>
          <div className="PopularMain">
            <div className="MiddleButton" onClick={leftSlide}>
              <img
                src={`${process.env.PUBLIC_URL}/image/MainLeftArrow.png`}
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
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </a>
              </div>
            ))}
            <div className="MiddleButton" onClick={rightSlide}>
              <img
                src={`${process.env.PUBLIC_URL}/image/mainRightArrow.png`}
                alt="다음"
              />
            </div>
          </div>
        </div>
        <div className="MainCategoryCon">
          <div className="MainCategoryDiv">
            <span>카테고리별 상품 찾기</span>
            <div className="CategoryCon">
              <div className="MiddleButton" onClick={leftCategory}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/MainLeftArrow.png`}
                  alt="이전"
                />
              </div>
              {MiddleCategory.map((item, index) => (
                <a href="">
                  <div key={index} className="CategoryImg">
                    <img src={item.src} alt={`slide ${CategoryImg + index}`} />
                    <div>{item.title}</div>
                  </div>
                </a>
              ))}
              <div className="MiddleButton" onClick={rightCategory}>
                <img
                  src={`${process.env.PUBLIC_URL}/image/mainRightArrow.png`}
                  alt="다음"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return <Slide />;
}
export default MainPage;
