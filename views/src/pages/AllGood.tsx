import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categoryitems } from '../Comment/tool/MenuTool';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import './css/all.scss';
import { useDispatch, useSelector } from 'react-redux';
import { activeHeart, deactiveHeart } from '../store/heartReducer';
import { Item, HeartState } from '../component/interface';

const AllGood: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const Navigate = useNavigate();

  // 데이터 로드 및 필터링 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/item/all');
      const { all_item } = response.data;
      setItems(all_item);
      setFilteredItems(all_item);
      setTotalItems(all_item.length);

      localStorage.setItem('items', JSON.stringify(all_item));
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 필터링된 데이터 업데이트 함수
  const updateFilteredItems = () => {
    let filteredItems: Item[] = [];
    if (type === undefined) {
      filteredItems = items;
    } else {
      filteredItems = items.filter(
        (item) => item.category1 === Categoryitems[parseInt(type)].title
      );
    }
    setFilteredItems(filteredItems);
    localStorage.setItem('items', JSON.stringify(filteredItems));
  };

  // 페이지 변경 처리 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  // 정렬 방식 변경 처리 함수
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateFilteredItems();
  }, [type, items]);

  const getDisplayedItems = (): Item[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  const handleCategoryClick = (
    category: string,
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault(); // 기본 이벤트 동작 막기

    // 클릭된 카테고리를 기준으로 필터링
    let filteredItems: Item[] = [];

    if (category === '전체보기') {
      setFilteredItems(items); // 모든 아이템 표시
    } else {
      filteredItems = items.filter((item) => item.category1 === category);
      setFilteredItems(filteredItems);
    }

    // 로컬 스토리지 업데이트
    localStorage.setItem('items', JSON.stringify(filteredItems));

    // 올바른 URL 구성
    const url = category === '전체보기' ? '/all' : `/Good/${index - 1}`;

    // 페이지 이동
    Navigate(url);
  };

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
};

export default AllGood;
