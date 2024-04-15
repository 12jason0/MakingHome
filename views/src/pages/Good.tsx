import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import './css/all.scss';
import { useDispatch, useSelector } from 'react-redux';
import { HeartState } from '../component/interface';
import { activeHeart, deactiveHeart } from '../store/heartReducer';

interface AllProps {
  Categoryitems: Array<{
    id: string;
    url: string;
    title: string;
    EnglishTitle: string;
  }>;
}

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
}

const Good: React.FC<AllProps> = ({ Categoryitems }: AllProps) => {
  const { type } = useParams<{ type: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 선택된 카테고리 상태를 정의합니다.

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPages);
  }, [totalItems, itemsPerPage]);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/all');
        const { all_item } = response.data;
        setItems(all_item);
        setFilteredItems(all_item);
        setTotalItems(all_item.length);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchItems();
  }, []);

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
    localStorage.setItem('items', JSON.stringify(filteredItems));
    setCurrentPage(1); // 페이지를 첫 페이지로 설정
  }, [type, items]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    const sortedItems = sortGoods(option);
    if (sortedItems !== undefined) {
      setItems(sortedItems);
      setCurrentPage(1); // 페이지를 첫 페이지로 설정
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /////////////////////////////////////////////
  // 카테고리 버튼 클릭 이벤트 처리 함수들
  /////////////////////////////////////////////
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
    const url = category === '전체보기' ? '/Good/10' : `/Good/${index - 1}`;

    // 페이지 이동
    Navigate(url);
    // 현재 선택된 카테고리 표시
    setSelectedCategory(category);
  };

  // Good 컴포넌트에서 아이템 클릭 시 해당 아이템의 상세 페이지로 이동하는 함수 추가
  const handleItemClick = (itemId: number) => {
    navigate(`/GoodIssue/${itemId}`); // 해당 아이템의 ID를 이용하여 상세 페이지로 이동
  };
  // 하트 상태 변경(Store 사용)
  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();
  // 하트 클릭 시, Store 상태 변경
  const handleHeart = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    itemTitle: string
  ) => {
    // 비활성화된 하트를 클릭할 경우
    if (
      !heart.find((product: HeartState) => product.title === itemTitle)
        ?.heartStatus
    ) {
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
  };

  return (
    <>
      <div className="AllCon">
        <div className="navigate2">
          {Categoryitems.map((item, index) => (
            <div
              key={item.id}
              onClick={(e) => handleCategoryClick(item.title, index, e)}
              className={
                selectedCategory === item.title ? 'selectedCategory' : ''
              }
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
              {filteredItems
                .filter((_, index) => index % 2 !== 1)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="AllImgDiv"
                    onClick={() => handleItemClick(item.id)}
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
                            e.stopPropagation(); // 페이지 이동 금지
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
                            <div className="allReview">
                              리뷰 : {item.review}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="allToolCon">
              {filteredItems
                .filter((_, index) => index % 2 !== 0)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="AllImgDiv"
                    onClick={() => handleItemClick(item.id)}
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
                            e.stopPropagation();
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
                            <div className="allReview">
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

export default Good;
