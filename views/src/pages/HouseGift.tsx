import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/HouseGift.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { activeHeart, deactiveHeart } from '../store/heartReducer';
import { HeartState } from '../component/interface';
interface Item {
  id: number;
  body: string;
  img: string;
  title: string;
  sale: string;
  price: number;
  delivery: string;
  review: number;
  chart: number;
  category1: string;
  category2: string;
  gift: string;
}

export default function HouseGift() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(2);
  const [navigate2State, setNavigate2State] = useState<string>('viewAll');
  const navigator = useNavigate();

  const all = () => {
    setNavigate2State('viewAll');
  };

  const gift = () => {
    setNavigate2State('gift');
  };

  const view20000 = () => {
    setNavigate2State('view20000');
  };

  const view30000 = () => {
    setNavigate2State('view30000');
  };

  const view50000 = () => {
    setNavigate2State('view50000');
  };
  /////////////////////////////////////////데이터 가져오기///////////////////////////////////////////////
  useEffect(() => {
    const fetchgifts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/gift');
        const { gift_item } = response.data;
        setItems(gift_item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchgifts();
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
        return true;
      case 'gift':
        return item.gift === 'gift';
      case 'view20000':
        return item.price <= 29999;
      case 'view30000':
        return item.price >= 30000 && item.price <= 39999;
      case 'view50000':
        return item.price >= 50000;
      default:
        return true;
    }
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  /////////////////////////////////option, 페이지 번호, 이동 할 시 페이지 맨 위로 이동//////////////////////////////////////
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  /////////////////////////////////HeartButton, 클릭 시, 찜 목록 등록 혹은 삭제//////////////////////////////////////
  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  ///////////////////////////////////////title 비교 해서 /all의 id 가져오기///////////////////////////////////////
  const navigateToDetail = async (title: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/item/all');
      const { all_item } = response.data;
      const foundItem = all_item.find((item: Item) => item.title === title);
      if (foundItem) {
        navigator(`/GoodIssue/${foundItem.id}`);
      } else {
        console.error('Item not found');
      }
    } catch (error) {
      console.error('Error fetching all items:', error);
    }
  };

  return (
    <>
      <div className="HouseCon">
        <div className="HouseDiv">
          <div className="navigate2">
            <div
              className={navigate2State === 'viewAll' ? navigate2State : ''}
              onClick={all}
            >
              <p>전체보기</p>
            </div>
            <div
              className={navigate2State === 'gift' ? navigate2State : ''}
              onClick={gift}
            >
              <p>병맛 선물</p>
            </div>
            <div
              className={navigate2State === 'view20000' ? navigate2State : ''}
              onClick={view20000}
            >
              <p>1~2만원대</p>
            </div>
            <div
              className={navigate2State === 'view30000' ? navigate2State : ''}
              onClick={view30000}
            >
              <p>3~4만원대</p>
            </div>
            <div
              className={navigate2State === 'view50000' ? navigate2State : ''}
              onClick={view50000}
            >
              <p>5만원 이상</p>
            </div>
          </div>
          <hr />
          <div className="HouseKind">
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
          <div className="HouseStart">
            <div className="HouseToolCon">
              {furnitureItems
                .filter((_, index) => index % 2 !== 1)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="HouseImgDiv"
                    onClick={() => navigateToDetail(item.title)}
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
                            localStorage.getItem('oneroomToken')
                              ? heart.find(
                                  (product: HeartState) =>
                                    product.title === item.title
                                )?.heartStatus
                                ? 'https://m.oneroommaking.com/web/upload/icon_202008221349389500.png'
                                : 'https://m.oneroommaking.com/_sp/image/mobile/bookmark_h.png'
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
                        <div className="HousePrice">
                          <div className="HouseSale">{item.sale}</div>
                          {item.price.toLocaleString()}원
                        </div>
                        <div className="HouseBody">{item.body}</div>
                        <div style={{ display: 'flex' }}>
                          {item.delivery && (
                            <div className="HouseDelivery">{item.delivery}</div>
                          )}
                          {item.review && (
                            <div className="HouseReview">
                              리뷰 : {item.review}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="HouseToolCon">
              {furnitureItems
                .filter((_, index) => index % 2 !== 0)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="HouseImgDiv"
                    onClick={() => navigateToDetail(item.title)}
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
                            localStorage.getItem('oneroomToken')
                              ? heart.find(
                                  (product: HeartState) =>
                                    product.title === item.title
                                )?.heartStatus
                                ? 'https://m.oneroommaking.com/web/upload/icon_202008221349389500.png'
                                : 'https://m.oneroommaking.com/_sp/image/mobile/bookmark_h.png'
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
                        <div className="HousePrice">
                          <div className="HouseSale">{item.sale}</div>
                          {item.price.toLocaleString()}원
                        </div>
                        <div className="HouseBody">{item.body}</div>
                        <div style={{ display: 'flex' }}>
                          {item.delivery && (
                            <div className="HouseDelivery">{item.delivery}</div>
                          )}
                          {item.review && (
                            <div className="HouseReview">
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

          <div className="HouseButtonDiv">
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
