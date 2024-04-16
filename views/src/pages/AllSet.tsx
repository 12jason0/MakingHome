import React, { useEffect, useState } from 'react';
import { MainsetImg } from '../Comment/tool/MainSetTool';
import { Link } from 'react-router-dom';
import './css/AllSet.scss';

export default function AllSet() {
  const [imgset, setImgSet] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setNextSlide();
    }, 1500);

    return () => clearInterval(interval);
  }, [imgset]);

  const setPreSlide = () => {
    setImgSet((preIdx) => (preIdx - 1 + MainsetImg.length) % MainsetImg.length);
  };
  const setNextSlide = () => {
    setImgSet((preIdx) => (preIdx + 1) % MainsetImg.length);
  };

  return (
    <>
      <div className="AllSetCon">
        <div className="ALlSetDiv">
          <div className="AllSetMenu">
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
          <div className="AllSetConDivCon">
            <div className="AllSetConDiv">
              <div className="allToolCon">
                {MainsetImg.filter((item, index) => index % 2 === 0).map(
                  (item) => (
                    <Link
                      to={`/set/${item.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div key={item.id} className="SetAllImgDiv">
                        <img src={item.img} alt={item.title} />
                        <div className="SettitleDiv">
                          <h4>{item.title}</h4>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="AllSetConDiv">
              <div className="allToolCon">
                {MainsetImg.filter((item, index) => index % 2 === 1).map(
                  (item) => (
                    <Link
                      to={`/set/${item.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div key={item.id} className="SetAllImgDiv">
                        <img src={item.img} alt={item.title} />
                        <div className="SettitleDiv">
                          <h4>{item.title}</h4>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
