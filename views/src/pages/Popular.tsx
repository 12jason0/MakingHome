import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Popular.scss';

interface Item {
  id: number;
  body: string;
  img: string;
  title: string;
  sale: string;
  price: string;
  delivery: string;
  review: string;
  chart: number;
}

export default function Popular() {
  const [navigate1State, setNavigate1State] = useState<string>('activeAllBest');
  const [navigate2State, setNavigate2State] = useState<string>('viewAll');
  const [items, setItems] = useState<Item[]>([]);
  const allBestActive = () => {
    setNavigate1State('activeAllBest');
    // 전체 베스트 50 클릭 시 "전체보기" 제일 먼저 띄어주기
    setNavigate2State('viewAll');
  };
  const categoryBestActive = () => {
    setNavigate1State('activeCategoryBest');
    // 카테고리 베스트 클릭 시 "가구" 제일 먼저 띄어주기
    setNavigate2State('viewToolA');
  };
  // 전체 베스트 50 목록 클릭 시 해당 목록 CSS 변경
  const all = () => {
    setNavigate2State('viewAll');
  };
  const viewWeekChart = () => {
    setNavigate2State('viewWeekChart');
  };
  const viewMonthChart = () => {
    setNavigate2State('viewMonthChart');
  };
  const viewHonor = () => {
    setNavigate2State('viewHonor');
  };
  // 전체 베스트 50 끝

  // 카테고리 베스트 목록 클릭 시 해당 목록 CSS 변경
  const viewToolA = () => {
    setNavigate2State('viewToolA');
  };
  const viewToolB = () => {
    setNavigate2State('viewToolB');
  };
  const viewToolC = () => {
    setNavigate2State('viewToolC');
  };
  const viewToolD = () => {
    setNavigate2State('viewToolD');
  };
  const viewToolE = () => {
    setNavigate2State('viewToolE');
  };
  const viewToolF = () => {
    setNavigate2State('viewToolF');
  };
  const viewToolG = () => {
    setNavigate2State('viewToolG');
  };
  const viewToolH = () => {
    setNavigate2State('viewToolH');
  };
  // 네비게이션바 클릭 이벤트
  useEffect(() => {
    // 함수 시작
    const chart_ALL = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/all'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_Week = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/week'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_Month = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/month'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_honor = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/honor'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolA = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolA'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolB = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolB'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolC = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolC'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolD = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolD'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolE = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolE'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolF = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolF'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolG = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolG'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    const chart_ToolH = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolH'
      );
      const { best_item, type } = best_items.data;
      setItems(best_item);
    };
    // 함수 끝
    if (navigate1State === 'activeAllBest') {
      if (navigate2State === 'viewAll') {
        setItems([]);
        chart_ALL();
      } else if (navigate2State === 'viewWeekChart') {
        setItems([]);
        chart_Week();
      } else if (navigate2State === 'viewMonthChart') {
        setItems([]);
        chart_Month();
      } else if (navigate2State === 'viewHonor') {
        setItems([]);
        chart_honor();
      }
    } else if (navigate1State === 'activeCategoryBest') {
      if (navigate2State === 'viewToolA') {
        setItems([]);
        chart_ToolA();
      } else if (navigate2State === 'viewToolB') {
        setItems([]);
        chart_ToolB();
      } else if (navigate2State === 'viewToolC') {
        setItems([]);
        chart_ToolC();
      } else if (navigate2State === 'viewToolD') {
        setItems([]);
        chart_ToolD();
      } else if (navigate2State === 'viewToolE') {
        setItems([]);
        chart_ToolE();
      } else if (navigate2State === 'viewToolF') {
        setItems([]);
        chart_ToolF();
      } else if (navigate2State === 'viewToolG') {
        setItems([]);
        chart_ToolG();
      } else if (navigate2State === 'viewToolDH') {
        setItems([]);
        chart_ToolH();
      }
    }
    // 전체 베스트 20 누른 상태에서 전체보기 / 주간 차트.. 누를 시 메뉴에 맞는 메뉴 띄우기
  }, [navigate1State, navigate2State]);

  return (
    <div className="top">
      <div className="navigate1">
        <div
          className={
            navigate1State === 'activeAllBest' ? navigate1State : 'allBest'
          }
          onClick={allBestActive}
        >
          전체 베스트 50
        </div>
        <div
          className={
            navigate1State === 'activeCategoryBest'
              ? navigate1State
              : 'categoryBest'
          }
          onClick={categoryBestActive}
        >
          카테고리 베스트
        </div>
      </div>
      {navigate1State === 'activeAllBest' ? (
        <div className="navigate2">
          <div
            className={navigate2State === 'viewAll' ? navigate2State : ''}
            onClick={all}
          >
            <p>전체보기</p>
          </div>
          <div
            className={navigate2State === 'viewWeekChart' ? navigate2State : ''}
            onClick={viewWeekChart}
          >
            <p>주간 차트</p>
          </div>
          <div
            className={
              navigate2State === 'viewMonthChart' ? navigate2State : ''
            }
            onClick={viewMonthChart}
          >
            <p>월간 차트</p>
          </div>
          <div
            className={navigate2State === 'viewHonor' ? navigate2State : ''}
            onClick={viewHonor}
          >
            <p>명예의 전당</p>
          </div>
        </div>
      ) : (
        <div className="navigate2">
          <div
            className={navigate2State === 'viewToolA' ? navigate2State : ''}
            onClick={viewToolA}
          >
            <p>가구</p>
          </div>
          <div
            className={navigate2State === 'viewToolB' ? navigate2State : ''}
            onClick={viewToolB}
          >
            <p>원룸 가전</p>
          </div>
          <div
            className={navigate2State === 'viewToolC' ? navigate2State : ''}
            onClick={viewToolC}
          >
            <p>패브릭</p>
          </div>
          <div
            className={navigate2State === 'viewToolD' ? navigate2State : ''}
            onClick={viewToolD}
          >
            <p>옷정리/보관</p>
          </div>
          <div
            className={navigate2State === 'viewToolE' ? navigate2State : ''}
            onClick={viewToolE}
          >
            <p>소품/취미</p>
          </div>
          <div
            className={navigate2State === 'viewToolF' ? navigate2State : ''}
            onClick={viewToolF}
          >
            <p>생활용품</p>
          </div>
          <div
            className={navigate2State === 'viewToolG' ? navigate2State : ''}
            onClick={viewToolG}
          >
            <p>조명</p>
          </div>
          <div
            className={navigate2State === 'viewToolH' ? navigate2State : ''}
            onClick={viewToolH}
          >
            <p>셀프 인테리어</p>
          </div>
        </div>
      )}
      <hr />
      {/* 가  구 View  */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <div className="parentToolContainer">
          {items.length > 0 &&
            items
              .filter((_, item) => item % 2 !== 1)
              .map((item) => {
                return (
                  <div key={item.id} className="childImgContainer">
                    <a href="/">
                      <div>
                        <img src={item.img} alt={item.title} />
                        <div className="childTitle">
                          <h4>{item.title}</h4>
                          <div className="childPrice">
                            <div className="childSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                          </div>
                          <div className="childBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="childDelivery">
                                {item.delivery}
                              </div>
                            )}
                            {item.review && (
                              <a href="/">
                                <div className="childReview">
                                  리뷰 : {item.review}
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
        </div>
        <div className="parentToolContainer ">
          {items.length > 0 &&
            items
              .filter((_, item) => item % 2 !== 0)
              .map((item) => {
                return (
                  <div key={item.id} className="childImgContainer">
                    <a href="/">
                      <div>
                        <img src={item.img} alt={item.title} />
                        <div className="childTitle">
                          <h4>{item.title}</h4>
                          <div className="childPrice">
                            <div className="childSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                          </div>
                          <div className="childBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="childDelivery">
                                {item.delivery}
                              </div>
                            )}
                            {item.review && (
                              <a href="/">
                                <div className="childReview">
                                  리뷰 : {item.review}
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
