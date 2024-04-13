import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categoryitems } from '../Comment/tool/MenuTool'; // Categoryitems를 import 합니다.
import axios from 'axios';
import './css/all.scss';
import { useDispatch, useSelector } from 'react-redux';
import { activeHeart, deactiveHeart } from '../store/heartReducer';
import { Item, HeartState } from '../component/interface';

const AllGood: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [Set, setSet] = useState<{ id: string; url?: string; title: string }>({
    id: '',
    url: '',
    title: '',
  });
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(6);
  const Navigate = useNavigate();

  /////////////////////////////////////////데이터 가져오기///////////////////////////////////////////////
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/all');
        const { all_item } = response.data;
        setItems(all_item);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchItems();
  }, []); // 페이지 로드 시에만 데이터를 가져오도록 변경
  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const index = !isNaN(parseInt(type || '', 10))
      ? parseInt(type || '', 10)
      : 0;
    setSet(Categoryitems[index] || { id: '', url: '', title: '' });
  }, [type]);

  useEffect(() => {
    let filteredItems = [];
    if (type === '0') {
      filteredItems = items.filter((item) => item.category1 === '가구');
    } else if (type === '1') {
      filteredItems = items.filter((item) => item.category1 === '원룸 가전');
    } else if (type === '2') {
      filteredItems = items.filter((item) => item.category1 === '패브릭');
    } else if (type === '3') {
      filteredItems = items.filter((item) => item.category1 === '옷정리/보관');
    } else if (type === '4') {
      filteredItems = items.filter((item) => item.category1 === '생활 용품');
    } else if (type === '5') {
      filteredItems = items.filter((item) => item.category1 === '소품/취미');
    } else if (type === '6') {
      filteredItems = items.filter((item) => item.category1 === '조명');
    } else if (type === '7') {
      filteredItems = items.filter((item) => item.category1 === '셀프인테리어');
    } else {
      filteredItems = items;
    }

    setFilteredItems(filteredItems);
  }, [type, items]);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(filteredItems));
  }, [filteredItems]);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems !== null) {
      setItems(JSON.parse(storedItems));
    }
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
  const getDisplayedItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  };

  /////////////////////////////////////////////
  // 카테고리 버튼 클릭 이벤트 처리 함수들
  /////////////////////////////////////////////
  const handleCategoryClick = (
    category: string,
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSet({ id: '', url: '', title: category }); // Set 상태 업데이트
    event.preventDefault(); // 기본 이벤트 동작 막기
    if (category === '전체보기') {
      Navigate(`/all`);
    } else {
      Navigate(`/Good/${index}`);
    }
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
        <div className="navigate2">
          {Categoryitems.map((item, index) => (
            <div
              key={item.id}
              className={type === item.id ? 'active' : ''}
              onClick={(e) => handleCategoryClick(item.title, index, e)}
            >
              <p>{item.title}</p>
            </div>
          ))}
        </div>
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
              {getDisplayedItems()
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
                            {item.price.toLocaleString()}원
                          </div>
                          <div className="allBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="allDelivery">{item.delivery}</div>
                            )}
                            {item.review && (
                              <a href="/">
                                <div className="allReview">
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
              {getDisplayedItems()
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
                            {item.price.toLocaleString()}원
                          </div>
                          <div className="allBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="allDelivery">{item.delivery}</div>
                            )}
                            {item.review && (
                              <a href="/">
                                <div className="allReview">
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
};

export default AllGood;
