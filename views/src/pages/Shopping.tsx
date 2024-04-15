import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './css/Shopping.scss';
import { useNavigate } from 'react-router';

// 각 항목의 형태를 나타내는 인터페이스 정의
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
  selected: boolean;
}
interface Pay {
  price: number;
  delivery_fee: number;
  total_payment: number;
}

export default function Shopping() {
  // items 상태를 명시적으로 정의
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const [pay, setPay] = useState<Pay>({
    price: 0,
    delivery_fee: 0,
    total_payment: 0,
  });
  // 데이터 불러오기
  useEffect(() => {
    if (localStorage.getItem('oneroomToken')) {
      const getUserBucket = async () => {
        const res = await axios.get('http://localhost:5000/user/bucketView', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
          },
        });
        const { viewItem } = res.data;
        const itemSelected = viewItem.map((item: Item) => ({
          ...item,
          selected: false,
        }));
        setItems(itemSelected);
      };
      getUserBucket();
    } else {
      navigate('/login');
    }
  }, []);

  // 전체 선택 기능
  const handleSelectAll = () => {
    console.log('items : before', items);
    const updatedItems = items.map((item) => ({
      ...item,
      selected: !item.selected, // 모든 항목이 선택된 상태면 선택 취소, 아니면 모두 선택
    }));
    setItems(updatedItems);
    const selectedItems = updatedItems.filter((item) => item.selected);
    selectedItems.map((item) => {
      itemSelectedEvent(item.selected, item.price, item.delivery);
    });
    console.log('items', items);
  };

  // 전체 삭제 기능
  const handleDeleteAll = () => {
    const remainingItems = items.filter((item) => !item.selected);
    setItems(remainingItems);
  };
  // 체크박스 클릭 이벤트
  const itemSelectedEvent = (
    selected: boolean,
    price: number,
    delivery: string
  ) => {
    // 구매 선택
    if (selected) {
      if (delivery === '무료배송')
        setPay((prevPays: Pay) => {
          return {
            price: prevPays.price + price,
            delivery_fee: prevPays.delivery_fee + 0,
            total_payment: prevPays.total_payment + price,
          };
        });
      else {
        setPay((prevPays: Pay) => {
          return {
            price: prevPays.price + price,
            delivery_fee: prevPays.delivery_fee + 1000,
            total_payment: prevPays.total_payment + 1000 + price,
          };
        });
      }
      // 구매 취소
    } else {
      if (delivery === '무료배송')
        setPay((prevPays: Pay) => {
          return {
            price: prevPays.price - price,
            delivery_fee: prevPays.delivery_fee - 0,
            total_payment: prevPays.total_payment - price,
          };
        });
      else {
        setPay((prevPays: Pay) => {
          return {
            price: prevPays.price - price,
            delivery_fee: prevPays.delivery_fee - 1000,
            total_payment: prevPays.total_payment - 1000 - price,
          };
        });
      }
    }
  };
  const itemAdd = (title: string) => {
    const updatedItems = items.filter((item) => item.title === title);
    if (updatedItems[0].selected === false) {
      setItems((prev) => {
        return prev.map((item) => {
          if (updatedItems.includes(item)) {
            return { ...item, selected: true };
          }
          return item;
        });
      });
      itemSelectedEvent(true, updatedItems[0].price, updatedItems[0].delivery);
    } else {
      alert('이미 추가하신 상품입니다.');
    }
  };
  const itemDel = async (title: string) => {
    if (!window.confirm('구매 목록에서 삭제하시겠습니까?')) {
      return;
    } else {
      const res = await axios.post(
        'http://localhost:5000/user/bucketDel',
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
          },
        }
      );
      const { success, message } = res.data;
      if (success) {
        alert(`${message}`);
        document.location.reload();
      } else {
        alert(`오류가 발생하였습니다.`);
      }
    }
  };
  return (
    <>
      <div className="shoppingCon">
        <div className="shoppingDiv">
          <div className="shoppingMenu">
            <div className="allDiv">
              <div className="imgDiv">
                {' '}
                <img
                  src={`${process.env.PUBLIC_URL}/image/checkblack.png`}
                  alt=""
                />
                <div onClick={handleSelectAll}> 전체 선택</div>
              </div>
              <div className="allExit" onClick={handleDeleteAll}></div>
            </div>
            <div style={{ height: '20px' }}></div>
            {/* 각 항목을 form 요소 안에 표시 */}
            {items.map((item) => (
              <>
                <form style={{ display: 'flex', justifyContent: 'start' }}>
                  {/* 체크박스로 선택 여부 표시 */}
                  <input
                    key={item.id}
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => {
                      const updatedItems = items.map((i) =>
                        i.id === item.id ? { ...i, selected: !i.selected } : i
                      );
                      setItems(updatedItems);
                      itemSelectedEvent(
                        !item.selected,
                        item.price,
                        item.delivery
                      );
                    }}
                  />
                </form>
                <div className="shoopingElement">
                  <div className="shoppingImg">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="Attributes">
                    <div className="shoppingTitle">{item.title}</div>
                    <div className="shoppingBody">{item.body}</div>
                    <div className="PriceSale">
                      <div className="shoppingSale">{item.sale}</div>
                      <div className="shoppingPrice">
                        {item.price.toLocaleString()}원
                      </div>
                    </div>
                    <div className="shopDel">
                      <div
                        className="itemAdd"
                        onClick={() => {
                          itemAdd(item.title);
                        }}
                      >
                        추가
                      </div>
                      <div
                        className="itemDel"
                        onClick={() => {
                          itemDel(item.title);
                        }}
                      >
                        삭제
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="shoppingMoney">
            <form>
              <label>총 상품 금액 : {pay.price.toLocaleString()}원</label>
              <label>배송비 : {pay.delivery_fee.toLocaleString()}원</label>
              <label>
                결제 예정 금액 : {pay.total_payment.toLocaleString()}원
              </label>
              <button>
                <div
                  className="paymentDiv"
                  onClick={() => {
                    if (pay.total_payment > 0) {
                      if (!window.confirm('구매하시겠습니까?')) {
                        return;
                      }
                      alert('정상적으로 구매되었습니다.');
                    } else {
                      alert('선택된 상품이 없습니다.');
                    }
                  }}
                >
                  선택 상품 주문하기
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

/* 
더 처리해야 될 것
1. 구매 시, 구매한 상품 어떻게 처리할건지
3. 삭제 버튼 기능 추가(api도 넣어야함)
*/
