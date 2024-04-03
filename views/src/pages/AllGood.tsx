import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/all.scss';

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

export default function Sale() {
  const [items, setItems] = useState<Item[]>([]);
  const [navigate1State, setNavigate1State] = useState<string>('activeAllBest');
  const [navigate2State, setNavigate2State] = useState<string>('viewAll');
  useEffect(() => {
    const chart_ALL = async () => {
      setItems([]);
      const best_items = await axios.get(
        'http://localhost:5000/api/item/chart'
      );
      const { best_item } = best_items.data;
      console.log(best_item);
      setItems(best_item);
      console.log('items', items);
    };
    if (navigate1State === 'activeAllBest' && navigate2State === 'viewAll') {
      chart_ALL();
    }
    // 전체 베스트 20 누른 상태에서 전체보기 / 주간 차트.. 누를 시 메뉴에 맞는 메뉴 띄우기
  }, [navigate1State, navigate2State]);
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 아이템 수

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
        </div>
        <div className="allButtonDiv">
          <div>
            {' '}
            {items.length > 0 &&
              items.map((item) => {
                return <div key={item.id}>{item.body}</div>;
              })}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={`${process.env.PUBLIC_URL}/image/backs.png`} alt="" />
          </button>

          <button>
            <img src={`${process.env.PUBLIC_URL}/image/fronts.png`} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
