import React, { useState } from 'react';
import { GoodsTool } from '../Comment/tool/allTool';
import './css/all.scss';

export interface Item {
  id: string;
  img: string;
  title: string;
  price: number;
  sale: number;
  body: string;
  delivery: string;
  review: number | null; // 리뷰가 없는 경우를 고려하여 null로 타입 설정
}

export default function Sale() {
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 아이템 수

  const startAllIndex = (currentPage - 1) * itemsPerPage;
  const endAllIndex = Math.min(startAllIndex + 5, GoodsTool.length);

  const totalPages = Math.ceil(GoodsTool.length / itemsPerPage); // 전체 페이지 수

  const processedGoods = GoodsTool.map((item) => ({
    ...item,
    price: Number(item.price.replace(/[^0-9]/g, '')), // 숫자 이외의 문자열 제거 후 숫자로 변환
    sale: Number(item.sale.replace(/[^0-9]/g, '')),
  }));

  // 입력된 텍스트를 기준으로 상품을 필터링합니다.
  const filteredGoods = processedGoods.filter((item: Item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // 정렬 함수
  const sortGoods = (option: string): Item[] => {
    if (option === '리뷰 많은 수') {
      return filteredGoods.sort((a, b) => (b.review || 0) - (a.review || 0));
    } else if (option === '리뷰 적은 수') {
      return filteredGoods.sort((a, b) => (a.review || 0) - (b.review || 0));
    }
    return filteredGoods;
  };

  // 정렬된 상품 목록
  const sortedGoods = sortGoods(sortOption);

  // 페이지 변경 함수
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="AllCon">
        <div className="AllDiv">
          <div className="AllKind">
            <select
              name=""
              id=""
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">정렬방식</option>
              <option value="리뷰 많은 수">리뷰 많은 수</option>
              <option value="리뷰 적은 수">리뷰 적은 수</option>
            </select>
          </div>
          {sortedGoods.slice(startAllIndex, endAllIndex).map((item, index) => (
            <div key={index} className="AllImgDiv">
              <a href="/">
                <div>
                  <img src={item.img} alt={item.title} />
                  <div className="titleDiv">
                    <h3> {item.title}</h3>
                    <div className="allPrice">
                      <div className="allSale">{item.sale}%</div> {item.price}원
                    </div>
                    <div className="allBody"> {item.body}</div>
                    <div style={{ display: 'flex' }}>
                      {item.delivery && (
                        <div className="allDelivery">{item.delivery}</div>
                      )}{' '}
                      {item.review && (
                        <a href="/">
                          <div className="allReview"> 리뷰 : {item.review}</div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="allButtonDiv">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={`${process.env.PUBLIC_URL}/image/backs.png`} alt="" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              onClick={() => changePage(i + 1)}
              className={currentPage === i + 1 ? 'activePage' : ''}
            >
              {i + 1}
            </div>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={`${process.env.PUBLIC_URL}/image/fronts.png`} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
