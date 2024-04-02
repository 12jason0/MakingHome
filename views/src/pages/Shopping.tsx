import React, { useState, useEffect } from 'react';
import './css/Shopping.scss';

// 각 항목의 형태를 나타내는 인터페이스 정의
interface Item {
  id: string;
  selected: boolean;
  body: string;
  img: string;
  title: string;
}

export default function Shopping() {
  // items 상태를 명시적으로 정의
  const [items, setItems] = useState<Item[]>([]);

  // 데이터 불러오기
  useEffect(() => {
    // 여기에 실제 데이터를 불러오는 코드를 작성하세요.
    // 예를 들어, 서버에서 데이터를 가져올 때 사용하는 fetch 등의 코드가 들어갑니다.
    // 가상의 초기 데이터를 사용하는 예시 코드를 작성하겠습니다.
    const initialItems: Item[] = [
      {
        id: '1',
        img: 'https://m.oneroommaking.com/web/product/medium/202403/a3c5aeadaa39e93e04f82ac9ac68f025.png',
        title: '플러피 매트 토퍼 12cm',
        body: '37,900원',
        selected: false,
      },
      {
        id: '2',
        img: 'https://m.oneroommaking.com/web/product/medium/202401/0a17aed4294ffebf34f6499728cca598.webp',
        title: '자국없는 벨크로 암막커튼',
        body: '16,800원',
        selected: false,
      },
      // 필요한 만큼 더 추가하세요.
    ];
    setItems(initialItems);
  }, []);

  // 전체 선택 기능
  const handleSelectAll = () => {
    const allSelected = items.every((item) => item.selected); // 모든 항목이 선택된 상태인지 확인
    const updatedItems = items.map((item) => ({
      ...item,
      selected: !allSelected, // 모든 항목이 선택된 상태면 선택 취소, 아니면 모두 선택
    }));
    setItems(updatedItems);
  };

  // 전체 삭제 기능
  const handleDeleteAll = () => {
    const remainingItems = items.filter((item) => !item.selected);
    setItems(remainingItems);
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
              <div className="allExit" onClick={handleDeleteAll}>
                전체 삭제
              </div>
            </div>
            <div style={{ height: '20px' }}></div>
            {/* 각 항목을 form 요소 안에 표시 */}
            {items.map((item) => (
              <form key={item.id}>
                {/* 체크박스로 선택 여부 표시 */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => {
                    const updatedItems = items.map((i) =>
                      i.id === item.id ? { ...i, selected: !i.selected } : i
                    );
                    setItems(updatedItems);
                  }}
                />
                <div className="shoppingImg">
                  <img src={item.img} alt="" />
                </div>
                <span className="shoppingTitle">{item.title}</span>
                <div className="shoppingPrice">{item.body}</div>
              </form>
            ))}
          </div>
          <div className="shoppingMoney">
            <div></div>
            <form>
              {' '}
              <label>총 상품 금액 : 원</label>
              <label>배송비 : 원</label>
              <label>결제 예정 금액 : 원</label>
              <button>
                <div className="paymentDiv">선택 상품 주문하기</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
