import React, { useEffect, useState } from 'react';
import './css/Search.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Pagination from 'react-js-pagination';
import { HeartState, Item } from '../component/interface';
import { useDispatch, useSelector } from 'react-redux';
import { activeHeart, deactiveHeart } from '../store/heartReducer';

export default function Search() {
  // 페이지네이션 패키지 사용
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // 페이지당 아이템 수
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };
  // 페이지네이션을 위한 아이템 리스트 슬라이싱 함수
  const sliceItems = (items: Item[], currentPage: number): Item[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const navigate = useNavigate();
  const params = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const input_item = params.item;
  // console.log(item);
  useEffect(() => {
    const search_items = async () => {
      const res = await axios.get('http://localhost:5000/api/item/search', {
        params: {
          input_item,
        },
      });
      // 배열 형태
      const { success, items, message, user_input } = res.data;
      if (success) {
        setItems(items);
        setItemCount(items.length);
        setUserInput(user_input);
        setItems(sliceItems(items, currentPage));
      } else {
        // 에러 메시지 띄우기용 + 버그 생겨서 set 코드 3개 추가
        setItems([]);
        setItemCount(0);
        setUserInput('');
        setUserInput(message);
      }
    };
    search_items();
  }, [params, currentPage]);
  // 하트 상태 변경(Store 사용)
  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();
  // 하트 클릭 시, Store 상태 변경
  const handleHeart = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    itemTitle: string
  ) => {
    e.preventDefault();
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
    <div className="Container">
      <div className="searchResultContainer">
        <div className="reverse">
          <img
            className="reverseImg"
            src={`${process.env.PUBLIC_URL}/image/setLeftArrow.png`}
            alt="이전 페이지"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="searchResult">
          <div>
            검색결과(
            <span style={{ fontSize: '25px', color: 'red' }}>
              <b>{itemCount}</b>
            </span>
            )건
          </div>
        </div>
        {/* space-between 사용위해 텅빈 태그 추가 */}
        <div className="emptyDiv"></div>
      </div>
      <hr />
      <div>
        {items.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ margin: '10px 0' }}>
              <span style={{ color: 'red' }}>
                <b>{userInput}</b>
              </span>
              &nbsp;키워드로 총{' '}
              <span style={{ fontSize: '25px', color: 'red' }}>
                <b>{itemCount}</b>
              </span>
              개의 상품을 찾았습니다.
            </h2>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2>{userInput}</h2>
          </div>
        )}
      </div>
      {items.length > 0 && <hr style={{ marginBottom: '15px' }} />}
      {/* 가구 View */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <div className="parentToolContainer">
          {items.length > 0 &&
            items
              .filter((_, item) => item % 2 !== 1)
              .map((item) => {
                return (
                  <div key={item.id} className="childImgContainer">
                    <a href="/">
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
                              handleHeart(e, item.title);
                              // 하트 클릭 시, Store 상태 변경 + Store 상태에 맞는 찜한 상품 페이지 상태 변경 + Store 상태에 맞는 이미지 변경
                            }}
                          />
                        </div>
                        <div className="childTitle">
                          <h4>{item.title}</h4>
                          <div className="childPrice">
                            <div className="childSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                          </div>
                          <div className="childBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="childDelivery">
                                {item.delivery}
                              </div>
                            )}
                            {item.review && (
                              <a href="/">
                                <div className="childReview">
                                  리뷰 : {item.review}
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
        </div>
        <div className="parentToolContainer ">
          {items.length > 0 &&
            items
              .filter((_, item) => item % 2 !== 0)
              .map((item) => {
                return (
                  <div key={item.id} className="childImgContainer">
                    <a href="/">
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
                              handleHeart(e, item.title);
                              // 하트 클릭 시, Store 상태 변경 + Store 상태에 맞는 찜한 상품 페이지 상태 변경 + Store 상태에 맞는 이미지 변경
                            }}
                          />
                        </div>
                        <div className="childTitle">
                          <h4>{item.title}</h4>
                          <div className="childPrice">
                            <div className="childSale">{item.sale}</div>
                            {item.price.toLocaleString()}원{' '}
                          </div>
                          <div className="childBody">{item.body}</div>
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="childDelivery">
                                {item.delivery}
                              </div>
                            )}
                            {item.review && (
                              <a href="/">
                                <div className="childReview">
                                  리뷰 : {item.review}
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
        </div>
      </div>
      {items.length > 0 && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={itemCount}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
