import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import './css/all.scss';

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
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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
    const url = category === '전체보기' ? '/all' : `/Good/${index - 1}`;

    // 페이지 이동
    Navigate(url);
  };

  return (
    <>
      <div className="AllCon">
        <div className="navigate2">
          {Categoryitems.map((item, index) => (
            <div
              key={item.id}
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
              {filteredItems
                .filter((_, index) => index % 2 !== 1)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div key={item.id} className="AllImgDiv">
                    <a href="/">
                      <div>
                        <img src={item.img} alt={item.title} />
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
              {filteredItems
                .filter((_, index) => index % 2 !== 0)
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <div key={item.id} className="AllImgDiv">
                    <a href="/">
                      <div>
                        <img src={item.img} alt={item.title} />
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

export default Good;
