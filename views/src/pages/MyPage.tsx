import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './css/MyPage.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activeHeart, deactiveHeart } from '../store/heartReducer';
import { HeartState, Item } from '../component/interface';

export default function MyPage() {
  const [userName, setUserName] = useState<string>('');
  const [likeItem, setLikeItem] = useState<Item[]>([]);
  const [orderDetail, setOrderDetail] = useState();
  const settingsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('oneroomToken')) {
      const getUserName = async () => {
        const res = await axios.get('http://localhost:5000/user/name', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
          },
        });
        const { username } = res.data;
        setUserName(username);
      };
      getUserName();
    } else {
      navigate('/login');
    }
  }, []);
  const heart = useSelector((store: any) => store.heartStateA);
  const dispatch = useDispatch();

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
      const res = await axios.get('http://localhost:5000/user/itemView', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
        },
      });
      const { viewItem } = res.data;
      setLikeItem(viewItem);
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
      'http://localhost:5000/user/bucketAdd',
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
  const loginState = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('oneroomToken');
      setUserName('');
      setLikeItem([]);

      alert('로그아웃 되었습니다.');
      navigate('/login');
    }
  };
  const logoutConfirmation = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout(); // 로그아웃 실행
    }
  };

  const logout = () => {
    localStorage.removeItem('oneroomToken');
    setUserName('');
    setLikeItem([]);

    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <div className="Container">
      <div className="Container1">
        <h1>
          어서오세요&nbsp; <span>{userName}</span>식구님!
        </h1>
        <img
          src={`${process.env.PUBLIC_URL}/image/settings.png`}
          alt=""
          onClick={logoutConfirmation}
        />
      </div>

      <div className="Container2">
        <div className="childContainer2">
          <div className="box">
            <div>쿠폰</div>
            <div className="childDiv2">0개</div>
          </div>
          <div className="box">
            <div>적립금</div>
            <div className="childDiv2">0원</div>
          </div>
          <div className="box">
            <div>총 주문금액</div>
            <div className="childDiv2">0원</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="Container3">
        <div className="orderDetail">주문내역</div>
        <hr />
        <div className="likeItem">
          <div
            style={{ cursor: 'pointer', width: '200px' }}
            onClick={() => {
              navigate('/LikePage');
            }}
          >
            찜한 상품
          </div>
          <br />
          <div className="LikeItemDiv">
            <div className="LikeItemContainer">
              {likeItem.length > 0 &&
                likeItem.map((item) => {
                  return (
                    <div key={item.id} className="childImgContainer">
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
                          <h6>{item.title}</h6>
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
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
