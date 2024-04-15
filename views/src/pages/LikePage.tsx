import React, { useEffect, useState } from 'react';
import { HeartState, Item } from '../component/interface';
import axios from 'axios';
import './css/LikePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { activeHeart, deactiveHeart } from '../store/heartReducer';

export default function LikePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [userName, setUserName] = useState<string>('');
  useEffect(() => {
    const getUserName = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_DB_HOST}/user/name`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
          },
        }
      );
      const { username } = res.data;
      setUserName(username);
    };
    getUserName();
  }, []);
  // useEffect 로 페이지 열릴 시, user가 heart를 누른 상태에 대한 녀석들만 가지고온다. 로그인해야함
  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        if (!window.confirm('정말 삭제하시겠습니까?')) {
          return;
        }
        dispatch(
          deactiveHeart({
            title: itemTitle,
          })
        );
        document.location.reload();
      }
    } else {
      alert('로그인 후 이용가능 합니다.');
      navigate('/login');
    }
  };
  useEffect(() => {
    const a = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_DB_HOST}/user/itemView`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
          },
        }
      );
      const { viewItem } = res.data;
      setItems(viewItem);
    };
    a();
  }, []);
  const itemAdd = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemTitle: string
  ) => {
    e.preventDefault();
    if (!window.confirm('장바구니에 추가하시겠습니까?')) {
      return;
    }
    const res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/user/bucketAdd`,
      {
        title: itemTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
        },
      }
    );
    if (res.data.success) {
      alert('장바구니에 추가되었습니다.');
    } else {
      alert(`${res.data.message}`);
      return;
    }
  };
  const itemDel = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemTitle: string
  ) => {
    e.preventDefault();
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    dispatch(
      deactiveHeart({
        title: itemTitle,
      })
    );
    document.location.reload();
  };

  return (
    <div className="Container">
      <div className="user">
        <h1>{userName}님의 찜한 상품</h1>
      </div>
      <hr />
      <br />
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

                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="childDelivery">
                                {item.delivery}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="heartShop">
                          <div
                            className="itemAdd"
                            onClick={(e) => {
                              itemAdd(e, item.title);
                            }}
                          >
                            장바구니
                          </div>
                          <div
                            className="itemDel"
                            onClick={(e) => {
                              itemDel(e, item.title);
                            }}
                          >
                            삭제
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
                            // src도 현재 상품이 Store 상의 상태를 보고 바꿔줘야함(빈하트, 하트)
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
                          <div style={{ display: 'flex' }}>
                            {item.delivery && (
                              <div className="childDelivery">
                                {item.delivery}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="heartShop">
                          <div
                            className="itemAdd"
                            onClick={(e) => {
                              itemAdd(e, item.title);
                            }}
                          >
                            장바구니
                          </div>
                          <div
                            className="itemDel"
                            onClick={(e) => {
                              itemDel(e, item.title);
                            }}
                          >
                            삭제
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
