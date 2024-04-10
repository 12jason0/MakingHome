import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import './css/Popular.scss';
import { useDispatch, useSelector } from 'react-redux';
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
  isHearted: boolean; // heart 상태 변경용 boolean 타입 추가
}

interface HeartState {
  title: string;
  heartState: boolean;
}

export default function Popular() {
  // 페이지네이션 패키지 사용
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 20; // 페이지당 아이템 수
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };
  // use hook 사용
  const [navigate1State, setNavigate1State] = useState<string>('activeAllBest');
  const [navigate2State, setNavigate2State] = useState<string>('viewAll');
  const [items, setItems] = useState<Item[]>([]);
  // 하트 상태 변경(Store 사용)
  const heart = useSelector((store: any) => store.heartState);
  const dispatch = useDispatch();
  // 하트 클릭 시, Store 상태 변경
  const handleHeart = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    itemTitle: string
  ) => {
    e.preventDefault();
    // 비활성화된 하트를 클릭할 경우
    if (
      !heart.find((product: HeartState) => product.title === itemTitle)
        ?.heartStatus
    ) {
      dispatch({
        type: 'active_heart',
        title: itemTitle,
      });
      // 활성화된 하트를 클릭할 경우
    } else {
      dispatch({
        type: 'deactive_heart',
        title: itemTitle,
      });
    }
  };

  // 페이지네이션을 위한 아이템 리스트 슬라이싱 함수
  const sliceItems = (items: Item[], currentPage: number): Item[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

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
  // 전체 베스트 50 목록 클릭 시 해당 목록 CSS 변경 + 페이지 인덱스 1 로 변환
  const all = () => {
    setNavigate2State('viewAll');
    setCurrentPage(1);
  };
  const viewWeekChart = () => {
    setNavigate2State('viewWeekChart');
    setCurrentPage(1);
  };
  const viewMonthChart = () => {
    setNavigate2State('viewMonthChart');
    setCurrentPage(1);
  };
  const viewHonor = () => {
    setNavigate2State('viewHonor');
    setCurrentPage(1);
  };
  // 전체 베스트 50 끝

  // 카테고리 베스트 목록 클릭 시 해당 목록 CSS 변경
  const viewToolA = () => {
    setNavigate2State('viewToolA');
    setCurrentPage(1);
  };
  const viewToolB = () => {
    setNavigate2State('viewToolB');
    setCurrentPage(1);
  };
  const viewToolC = () => {
    setNavigate2State('viewToolC');
    setCurrentPage(1);
  };
  const viewToolD = () => {
    setNavigate2State('viewToolD');
    setCurrentPage(1);
  };
  const viewToolE = () => {
    setNavigate2State('viewToolE');
    setCurrentPage(1);
  };
  const viewToolF = () => {
    setNavigate2State('viewToolF');
    setCurrentPage(1);
  };
  const viewToolG = () => {
    setNavigate2State('viewToolG');
    setCurrentPage(1);
  };
  const viewToolH = () => {
    setNavigate2State('viewToolH');
    setCurrentPage(1);
  };
  // 네비게이션바 클릭 이벤트
  useEffect(() => {
    // 함수 시작
    const chart_ALL = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/all'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_Week = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/week'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_Month = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/month'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_honor = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/honor'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolA = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolA'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolB = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolB'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolC = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolC'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolD = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolD'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolE = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolE'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolF = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolF'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolG = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolG'
      );
      const { best_item, type } = best_items.data;
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
    };
    const chart_ToolH = async () => {
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart/toolH'
      );
      const { best_item, type } = best_items.data;
      console.log('best_item', best_item.length);
      setTotalItems(best_item.length);
      setItems(sliceItems(best_item, currentPage));
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
  }, [navigate1State, navigate2State, currentPage]);

  return (
    <>
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
              className={
                navigate2State === 'viewWeekChart' ? navigate2State : ''
              }
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
                          {/* 기존 코드: <img src={item.img} alt={item.title} /> */}
                          <div className="imageBox">
                            <img
                              className="toolImg"
                              src={item.img}
                              alt={item.title}
                            />
                            <img
                              className="heart"
                              // src도 현재 상품이 Store 상의 상태를 보고 바꿔줘야함(빈하트, 하트) / 그렇게 되면 item ishearted삭제해야함
                              src={
                                heart.find(
                                  (product: HeartState) =>
                                    product.title === item.title
                                )?.heartStatus
                                  ? 'https://m.oneroommaking.com/web/upload/icon_202008221349389500.png'
                                  : 'https://m.oneroommaking.com/_sp/image/mobile/bookmark_h.png'
                              }
                              alt="하트 이미지"
                              onClick={(e) => {
                                handleHeart(e, item.title);
                                // 하트 클릭 시, Store 상태 변경 + Store 상태에 맞는 찜한 상품 페이지 상태 변경 + Store 상태에 맞는 이미지 변경
                              }}
                            />
                          </div>
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
                          <div className="imageBox">
                            <img
                              className="toolImg"
                              src={item.img}
                              alt={item.title}
                            />
                            <img
                              className="heart"
                              // src도 현재 상품이 Store 상의 상태를 보고 바꿔줘야함(빈하트, 하트)
                              src={
                                heart.find(
                                  (product: HeartState) =>
                                    product.title === item.title
                                )?.heartStatus
                                  ? 'https://m.oneroommaking.com/web/upload/icon_202008221349389500.png'
                                  : 'https://m.oneroommaking.com/_sp/image/mobile/bookmark_h.png'
                              }
                              alt="하트 이미지"
                              onClick={(e) => {
                                handleHeart(e, item.title);

                                // 하트 클릭 시, Store 상태 변경 + Store 상태에 맞는 찜한 상품 페이지 상태 변경 + Store 상태에 맞는 이미지 변경
                              }}
                            />
                          </div>

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
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
