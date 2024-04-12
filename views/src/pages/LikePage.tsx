import React, { useEffect, useState } from 'react';
import { Item } from '../component/interface';
import axios from 'axios';

export default function LikePage() {
  const [items, setItems] = useState<Item[]>([]);
  // useEffect 로 페이지 열릴 시, user가 heart를 누른 상태에 대한 녀석들만 가지고온다. 로그인해야함
  useEffect(() => {
    const a = async () => {
      const res = await axios.get('http://localhost:5000/user/itemView', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
        },
      });
      console.log('res', res);
    };
  }, []);
  return (
    <div className="Container">
      <div className="temp1">
        <h1>~~님의 찜한 상품</h1>
      </div>
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
                          {/* <img
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
                            }} */}
                          {/* /> */}
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
                          {/* <img
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
                          /> */}
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
    </div>
  );
}
