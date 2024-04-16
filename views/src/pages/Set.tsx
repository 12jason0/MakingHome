import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/ItemPage.scss';

interface SetProps {
  MainsetImg: Array<{ id: string; img: string; title: string }>;
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

const Set: React.FC<SetProps> = ({ MainsetImg }: SetProps) => {
  const { type } = useParams<{ type?: string }>();
  const [Set, setSet] = useState<{ id: string; img: string; title: string }>({
    id: '',
    img: '',
    title: '',
  });
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/all');
        const { all_item } = response.data;
        setItems(all_item);
        // 로컬 스토리지에 데이터 저장
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const index = !isNaN(parseInt(type || '', 10))
      ? parseInt(type || '', 10)
      : 0;
    setSet(MainsetImg[index] || { id: '', img: '', title: '' });
  }, [type, MainsetImg]);

  useEffect(() => {
    let filteredItems = [];
    if (Set.title === 'PC + 영화관 세트') {
      filteredItems = items.filter(
        (item) => item.category2 === '게이밍' || item.category2 === '영화관'
      );
    } else if (Set.title === '포장마차 세트') {
      filteredItems = items.filter((item) => item.category2 === '포장마차');
    } else if (Set.title === '이자카야 세트') {
      filteredItems = items.filter((item) => item.category2 === '이자카야');
    } else if (Set.title === '대청소 세트') {
      filteredItems = items.filter(
        (item) => item.category2 === '화장실' || item.category2 === '청소 가전'
      );
    } else if (Set.title === '커플 PC방 세트') {
      filteredItems = items.filter(
        (item) => item.category2 === '게이밍' || item.category2 === 'PC'
      );
    } else if (Set.title === '기숙사 입주 세트') {
      filteredItems = items.filter((item) => item.category2 === '기숙사');
    } else if (Set.title === '영화관 세트') {
      filteredItems = items.filter((item) => item.category2 === '영화관');
    } else if (Set.title === '노래방 세트') {
      filteredItems = items.filter((item) => item.category2 === '노래방');
    } else {
      filteredItems = items;
    }

    setFilteredItems(filteredItems);
  }, [Set.title, items]);

  useEffect(() => {
    // 로컬 스토리지에 필터링된 데이터 저장
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(filteredItems));
  }, [filteredItems]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 로드
    const storedItems = localStorage.getItem('items');
    if (storedItems !== null) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <>
      <div className="SetCon">
        <div className="SetDiv">
          <img src={Set.img} alt={Set.title} />
          <div className="SetKind">
            <select name="" id="" onChange={handleSortChange}>
              <option value="정렬방식" hidden>
                정렬방식
              </option>
              <option value="리뷰 많은 수">리뷰 많은 수</option>
              <option value="리뷰 적은 수">리뷰 적은 수</option>
            </select>
          </div>
          <h2>{Set.title} 카테고리 아이템</h2>
          <div className="SetConDiv">
            {/* 왼쪽에 홀수 번째 아이템 출력 */}
            <div className="SetToolCon">
              {getDisplayedItems().map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <div
                      key={item.id}
                      className="SetImgDiv"
                      onClick={() => {
                        navigator(`/GoodIssue/${item.id}`); // 해당 아이템의 상세 페이지로 이동
                      }}
                    >
                      <div>
                        <img src={item.img} alt={item.title} />
                        <div className="titleDiv">
                          <h4>{item.title}</h4>
                          <div className="SetPrice">
                            <div className="SetSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                          </div>
                          <div className="SetBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="SetDelivery">{item.delivery}</div>
                            )}
                            {item.review && (
                              <div className="SetReview">
                                리뷰 : {item.review}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            {/* 오른쪽에 짝수 번째 아이템 출력 */}
            <div className="SetToolCon">
              {getDisplayedItems().map((item, index) => {
                if (index % 2 !== 0) {
                  return (
                    <div
                      key={item.id}
                      className="SetImgDiv"
                      onClick={() => {
                        navigator(`/GoodIssue/${item.id}`); // 해당 아이템의 상세 페이지로 이동
                      }}
                    >
                      <div>
                        <img src={item.img} alt={item.title} />
                        <div className="titleDiv">
                          <h4>{item.title}</h4>
                          <div className="SetPrice">
                            <div className="SetSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                            {/* 원화 표시 추가 */}
                          </div>
                          <div className="SetBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="SetDelivery">{item.delivery}</div>
                            )}
                            {item.review && (
                              <div className="SetReview">
                                리뷰 : {item.review}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="SetButtonDiv">
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
};

export default Set;
