import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/all.scss';
import { useDispatch, useSelector } from 'react-redux';
import { activeHeart, deactiveHeart } from '../store/heartReducer';
import { Item, HeartState } from '../component/interface';
import { useNavigate } from 'react-router';

export default function AllGood() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(10);

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
  }, []);
  ////////////////////////////////정렬 방식/////////////////////////////////////////
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    const sortedItems = sortGoods(option);
    if (sortedItems !== undefined) {
      setItems(sortedItems);
      setCurrentPage(1);
      scrollToTop();
    }
  };

  const sortGoods = (option: string): Item[] => {
    if (option === '리뷰 많은 수') {
      return items.slice().sort((a, b) => (b.review || 0) - (a.review || 0));
    } else if (option === '리뷰 적은 수') {
      return items.slice().sort((a, b) => (a.review || 0) - (b.review || 0));
    } else {
      return items;
    }
  };

  ////////////////////////페이지 버튼 및 숫자//////////////////////////
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  ////////////////////////////////////////////////////////////////////
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 하트 상태 변경(Store 사용)
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

  return (
    <>
      <div className="AllCon">
        <div className="AllDiv">
          <div className="AllKind">
            <select name="" id="" onChange={handleSortChange}>
              <option value="정렬방식" hidden>
                정렬방식
              </option>
              <option value="리뷰 많은 수">리뷰 많은 수</option>
              <option value="리뷰 적은 수">리뷰 적은 수</option>
            </select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: '50px',
            }}
          >
            <div className="allToolCon">
              {items
                .filter((_, index) => index % 2 !== 1)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div key={item.id} className="AllImgDiv">
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
                          <div className="allPrice">
                            <div className="allSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                            {/* 원화 표시 추가 */}
                          </div>
                          <div className="allBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="allDelivery">{item.delivery}</div>
                            )}{' '}
                            {item.review && (
                              <a href="/">
                                <div className="allReview">
                                  {' '}
                                  리뷰 : {item.review}
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
            <div className="allToolCon">
              {items
                .filter((_, index) => index % 2 !== 0)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div key={item.id} className="AllImgDiv">
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
                          <div className="allPrice">
                            <div className="allSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                            {/* 원화 표시 추가 */}
                          </div>
                          <div className="allBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="allDelivery">{item.delivery}</div>
                            )}{' '}
                            {item.review && (
                              <a href="/">
                                <div className="allReview">
                                  {' '}
                                  리뷰 : {item.review}
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="allButtonDiv">
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
    </>
  );
}
