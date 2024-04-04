import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ItemPage.scss';

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

export default function HomeAppliances() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(2);

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
  // category 필터링
  const furnitureItems = items.filter((item) => item.category1 === '원룸 가전');

  // 페이지 변경 처리 함수, 필터링된 항목 개수에 따라 totalPages 갱신
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
              {furnitureItems
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
                            {item.price}원
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
              {furnitureItems
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
                            <div className="allSale">{item.sale}</div>{' '}
                            {item.price}
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
