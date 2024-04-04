import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Money.scss';

interface Item {
  id: number;
  body: string;
  img: string;
  title: string;
  sale: string;
  price: string;
  delivery: string;
  review: number;
  chart: number;
}

export default function Money() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(6);

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

  return (
    <>
      <div className="AllCon">
        <div className="AllDiv">
          <div className="navigate2">
            <div className="AllMoney">
              <p>전체 보기</p>
              <div />

              <div className="div1000"></div>
              <div className="div3000"></div>
              <div className="div5000"></div>
              <div className="div7000"></div>
              <div className="div9000"></div>
              <p>천원 코너</p>
              <p>3천원 코너</p>
              <p>5천원 코너</p>
              <p>7천원 코너</p>
              <p>9천원 코너</p>
            </div>
          </div>
          <hr />
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
                        <img src={item.img} alt={item.title} />
                        <div className="titleDiv">
                          <h4>{item.title}</h4>
                          <div className="allPrice">
                            <div className="allSale">{item.sale}</div>{' '}
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
