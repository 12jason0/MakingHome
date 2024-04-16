import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Money.scss';
import { useDispatch, useSelector } from 'react-redux';
import { activeHeart, deactiveHeart } from '../store/heartReducer';
import { Item, HeartState } from '../component/interface';
import { useNavigate } from 'react-router';

export default function Money() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(1);
  const [navigate2State, setNavigate2State] = useState<string>('viewAll');

  const all = () => {
    setNavigate2State('viewAll');
  };

  const view1000 = () => {
    setNavigate2State('view1000');
  };

  const view3000 = () => {
    setNavigate2State('view3000');
  };

  const view5000 = () => {
    setNavigate2State('view5000');
  };

  const view7000 = () => {
    setNavigate2State('view7000');
  };

  const view9000 = () => {
    setNavigate2State('view9000');
  };
  // 하트 상태 변경(Store 사용)
  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 하트 클릭 시, Store 상태 변경
  const handleHeart = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    itemTitle: string
  ) => {
    e.preventDefault();
    if (localStorage.getItem('Token') || localStorage.getItem('oneroomToken')) {
      if (
        !heart.find((product: HeartState) => product.title === itemTitle)
          ?.heartStatus
      ) {
        // 비활성화된 하트를 클릭할 경우
        dispatch(
          activeHeart({
            title: itemTitle,
          })
        );
        // 활성화된 하트를 클릭할 경우
      } else {
        dispatch(
          deactiveHeart({
            title: itemTitle,
          })
        );
      }
    } else {
      alert('로그인 후 이용가능 합니다.');
      navigate('/login');
    }
  };

  /////////////////////////////////////////데이터 가져오기///////////////////////////////////////////////
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/all');
        const { all_item } = response.data;
        setItems(all_item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchItems();
  }, [navigate2State]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    const sortedItems = sortGoods(option);
    if (sortedItems !== undefined) {
      setItems(sortedItems);
      setCurrentPage(1);
      scrollToTop();
    }
  };
  /////////////////////////////////////////option///////////////////////////////////////////////
  const sortGoods = (option: string): Item[] => {
    if (option === '리뷰 많은 수') {
      return items.slice().sort((a, b) => (b.review || 0) - (a.review || 0));
    } else if (option === '리뷰 적은 수') {
      return items.slice().sort((a, b) => (a.review || 0) - (b.review || 0));
    } else {
      return items;
    }
  };
  ////////////////////////////////////가격 별로 해당 데이터 불러오기///////////////////////////////////
  const furnitureItems = items.filter((item) => {
    switch (navigate2State) {
      case 'viewAll':
        return item.price <= 10000;
      case 'view1000':
        return item.price <= 1000;
      case 'view3000':
        return item.price >= 1001 && item.price <= 3000;
      case 'view5000':
        return item.price >= 3001 && item.price <= 5000;
      case 'view7000':
        return item.price >= 5001 && item.price <= 7000;
      case 'view9000':
        return item.price >= 7001 && item.price <= 9000;
      default:
        return true;
    }
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const navigator = useNavigate();

  /////////////////////////////////option, 페이지 번호, 이동 할 시 페이지 맨 위로 이동//////////////////////////////////////
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="MoneyCon">
        <div className="MoneyDiv">
          <div className="navigate2">
            <div
              className={navigate2State === 'viewAll' ? navigate2State : ''}
              onClick={all}
            >
              <p>전체보기</p>
            </div>
            <div
              className={navigate2State === 'view1000' ? navigate2State : ''}
              onClick={view1000}
            >
              <p>천원 코너</p>
            </div>
            <div
              className={navigate2State === 'view3000' ? navigate2State : ''}
              onClick={view3000}
            >
              <p>3천원 코너</p>
            </div>
            <div
              className={navigate2State === 'view5000' ? navigate2State : ''}
              onClick={view5000}
            >
              <p>5천원 코너</p>
            </div>
            <div
              className={navigate2State === 'view7000' ? navigate2State : ''}
              onClick={view7000}
            >
              <p>7천원 코너</p>
            </div>
            <div
              className={navigate2State === 'view9000' ? navigate2State : ''}
              onClick={view9000}
            >
              <p>9천원 코너</p>
            </div>
          </div>
          <hr />
          <div className="MoneyKind">
            <select name="" id="" onChange={handleSortChange}>
              <option value="정렬방식" hidden>
                정렬방식
              </option>
              <option value="리뷰 많은 수">리뷰 많은 수</option>
              <option value="리뷰 적은 수">리뷰 적은 수</option>
            </select>
          </div>
          {/* ///////////////////////////////////////해당 데이터가 없을 때///////////////////////////////////////////////////////// */}
          {furnitureItems.length === 0 && (
            <div className="emptyMessage">
              <div className="imageContainer">
                <div className="spinner"></div>
              </div>
              더 열심히 하겠습니다.
            </div>
          )}
          {/* //////////////////////////////////////결과 화면 시작//////////////////////////////////////// */}
          <div className="MoneyStart">
            <div className="MoneyToolCon">
              {furnitureItems
                .filter((_, index) => index % 2 !== 1)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="MoneyImgDiv"
                    onClick={() => {
                      navigator(`/GoodIssue/${item.id}`); // 해당 아이템의 상세 페이지로 이동
                    }}
                  >
                    <div>
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
                      <div className="titleDiv">
                        <h4>{item.title}</h4>
                        <div className="MoneyPrice">
                          <div className="MoneySale">{item.sale}</div>
                          {item.price.toLocaleString()}원
                        </div>
                        <div className="MoneyBody">{item.body}</div>
                        <div style={{ display: 'flex' }}>
                          {item.delivery && (
                            <div className="MoneyDelivery">{item.delivery}</div>
                          )}
                          {item.review && (
                            <div className="MoneyReview">
                              리뷰 : {item.review}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="MoneyToolCon">
              {furnitureItems
                .filter((_, index) => index % 2 !== 0)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="MoneyImgDiv"
                    onClick={() => {
                      navigator(`/GoodIssue/${item.id}`); // 해당 아이템의 상세 페이지로 이동
                    }}
                  >
                    <div>
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
                      <div className="titleDiv">
                        <h4>{item.title}</h4>
                        <div className="MoneyPrice">
                          <div className="MoneySale">{item.sale}</div>
                          {item.price.toLocaleString()}원
                        </div>
                        <div className="MoneyBody">{item.body}</div>
                        <div style={{ display: 'flex' }}>
                          {item.delivery && (
                            <div className="MoneyDelivery">{item.delivery}</div>
                          )}
                          {item.review && (
                            <div className="MoneyReview">
                              리뷰 : {item.review}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="MoneyButtonDiv">
            <button
              onClick={() => {
                handlePageChange(currentPage - 1);
                scrollToTop();
              }}
              disabled={currentPage === 1}
            >
              <img src={`${process.env.PUBLIC_URL}/image/backs.png`} alt="" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <div
                key={i}
                onClick={() => {
                  handlePageChange(i + 1);
                  scrollToTop();
                }}
                className="pageNumber"
              >
                <div
                  className={`pageNumberCircle ${
                    currentPage === i + 1 ? 'activePage' : ''
                  }`}
                >
                  {i + 1}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                handlePageChange(currentPage + 1);
                scrollToTop();
              }}
              disabled={currentPage === totalPages}
            >
              <img src={`${process.env.PUBLIC_URL}/image/fronts.png`} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
