import React, { useState, useRef, useEffect } from 'react';
import './css/Footer.scss';
import './css/popup.scss';

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenLi1, setIsOpenLi1] = useState(false);
  const [isOpenLi2, setIsOpenLi2] = useState(false);
  const [isOpenLi3, setIsOpenLi3] = useState(false);
  const [isOpenLi4, setIsOpenLi4] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsOpenLi1(false);
    setIsOpenLi2(false);
    setIsOpenLi3(false);
    setIsOpenLi4(false);
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      (isPopupOpen || isOpenLi1 || isOpenLi2 || isOpenLi3 || isOpenLi4) &&
      popupRef.current &&
      !popupRef.current.contains(e.target as Node) &&
      !(e.target as HTMLElement).classList.contains('chatDiv') // 팝업 외의 영역을 클릭하고 chatDiv가 아닌 경우에만 모든 팝업 닫기
    ) {
      closePopup();
    }
  };

  useEffect(() => {
    if (isPopupOpen || isOpenLi1 || isOpenLi2 || isOpenLi3 || isOpenLi4) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopupOpen, isOpenLi1, isOpenLi2, isOpenLi3, isOpenLi4]);

  const li1 = () => {
    setIsOpenLi1(true);
    setIsPopupOpen(false); // 새로운 팝업이 열릴 때 이전 팝업을 닫음
  };

  const li2 = () => {
    setIsOpenLi2(true);
    setIsPopupOpen(false); // 새로운 팝업이 열릴 때 이전 팝업을 닫음
  };

  const li3 = () => {
    setIsOpenLi3(true);
    setIsPopupOpen(false); // 새로운 팝업이 열릴 때 이전 팝업을 닫음
  };

  const li4 = () => {
    setIsOpenLi4(true);
    setIsPopupOpen(false); // 새로운 팝업이 열릴 때 이전 팝업을 닫음
  };
  const liClose = () => {
    setIsPopupOpen(true);
    setIsOpenLi1(false);
    setIsOpenLi2(false);
    setIsOpenLi3(false);
    setIsOpenLi4(false);
  };

  return (
    <>
      <div className="chatDiv" onClick={openPopup}>
        <img
          src="https://happytalk.io/data/chat_editor/1000227402/button-1685010456.png"
          alt="Chat Button"
        />
      </div>
      {isPopupOpen && (
        <div className="popup-overlay" ref={popupRef}>
          <div className="popup-content">
            <div className="popup">
              <span>고객 센터 10:00 ~ 17:00</span>
              <h3>자주 묻는 질문</h3>
              <ul>
                <li onClick={li1}>🗣️상담 시간이 궁금해요!</li>
                <li onClick={li2}>🚚배송 기간이 궁금해요!</li>
                <li onClick={li3}>📦교환/반품하고 싶어요!</li>
                <li onClick={li4}>🙅🏻‍♂️샀는데 취소하고 싶어요</li>
                <a
                  href="https://www.youtube.com/c/%EC%9B%90%EB%A3%B8%EB%A7%8C%EB%93%A4%EA%B8%B0"
                  target="_blank"
                >
                  <li>금주의 유튜브 조회수 TOP5</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      )}
      {isOpenLi1 && (
        <div className="popup-overlay" ref={popupRef}>
          <div className="popup-content">
            <div className="popup">
              <div onClick={liClose} className="li1Div">
                <img
                  className="li1Img"
                  src={`${process.env.PUBLIC_URL}/image/back.png`}
                  alt="뒤로가기 버튼"
                />
              </div>
              <h5>🗣️ 상담 시간이 궁금합니다!</h5>
              <p> 안녕하세요, 원룸만들기 상담원이에요👩🏻‍💻 </p>
              <p>
                저희가 매일 24시간 연락을 받기는 어려워서, 상담이 가능한
                시간대에 순차대로 답변을 드릴테니 너그러운 마음으로 기다려주시면
                감사하겠습니다! (꾸벅) 💬
              </p>
              <p>상담가능 : 오전11시 ~ 오후5시 </p>
              <p>🍚 점심시간 : 오후 12시30분 ~ 2시</p>
              <p>😌 휴일 : 토, 일, 공휴일</p>
            </div>
          </div>
        </div>
      )}
      {isOpenLi2 && (
        <div className="popup-overlay" ref={popupRef}>
          <div className="popup-content">
            <div className="popup">
              <div onClick={liClose} className="li2Div">
                <img
                  className="li1Img"
                  src={`${process.env.PUBLIC_URL}/image/back.png`}
                  alt="뒤로가기 버튼"
                />
              </div>
              <h5>🚚 배송기간이 궁금해요!</h5>
              <p>
                🙇🏻‍♂️ 원룸만들기는 여러 브랜드의 좋은 상품만 골라서 모아둔
                편집샵이에요! 때문에 브랜드와 배송지에 따라 배송기간이 다른데요
              </p>
              <p>📦 일반 택배 : 구매일로부터 3~5일 소요 (영업일 기준)</p>
              <p>
                🚛 가구, 가구, 브랜드 직배송 : 부피가 크거나 설치가 필요한
                상품은 구매일로부터 7~15일 소요{' '}
              </p>
              <p>
                📣 배송지, 입고 일정, 판매자/택배사 일정, 천재지변 등에 따라
                배송 일정이 달라질 수 있음
              </p>
              <p>
                💙 주문을 한 상태라면 마이원룸.주문내역 조회 버튼을 클릭하여
                [주문내역]에서 배송정보를 확인하시거나, 원룸만들기 배송시작
                카톡을 참고해주세요!
              </p>
            </div>
          </div>
        </div>
      )}{' '}
      {isOpenLi3 && (
        <div className="popup-overlay" ref={popupRef}>
          <div className="popup-content">
            <div className="popup">
              <div onClick={liClose} className="li3Div">
                <img
                  className="li1Img"
                  src={`${process.env.PUBLIC_URL}/image/back.png`}
                  alt="뒤로가기 버튼"
                />
              </div>
              <h5>📦 교환/반품하고 싶어요!</h5>
              <p>
                1️⃣ 마이원룸.주문내역 조회 버튼 클릭 2️⃣ 교환/반품 버튼이 있으면
                가능한 상태 3️⃣ 원하는 버튼 눌러 신청하기
              </p>
              <p>
                📆 가능 기간 - 상품을 받은 날로부터 7일 이내 - 옵션 교환의 경우
                취소 후 재주문
              </p>
              <p>
                📦 교환/반품 배송비 - 상품 불량, 오배송 : 수거 및 확인 후 브랜드
                부담 - 단순 변심 : 왕복 택배비 고객님 부담
              </p>
              <p>
                🤔 불가능한 경우 - 받은 날로부터 7일이 초과 - 고객님 사용 또는
                훼손으로 재판매가 불가 - 현재 상태가 배송 당시 구성품 & 포장
                상태와 다름 - 상품 설치가 완료됨 (가구, 가전 등) - 소비자보호
                법률이 정하는 청약철회 제한사유에 해당할 경우 - 요청 후 주말
                제외 7일 동안 연락이 안 되실 경우
              </p>
            </div>
          </div>
        </div>
      )}{' '}
      {isOpenLi4 && (
        <div className="popup-overlay" ref={popupRef}>
          <div className="popup-content">
            <div className="popup">
              <div onClick={liClose} className="li4Div">
                <img
                  className="li1Img"
                  src={`${process.env.PUBLIC_URL}/image/back.png`}
                  alt="뒤로가기 버튼"
                />
              </div>
              <h5>🙅🏻‍♂️ 샀는데 취소하고 싶어요</h5>
              <p>
                🙆🏻‍♂️ 즉시 취소가 가능한 경우 : 주문 후 [결제완료] 단계인 경우, 즉
                주문은 완료되었지만 배송이 시작되지 않은 경우엔 즉시 취소처리가
                가능해요!
              </p>
              <p>
                🙅🏻‍♂️ 취소가 어려운 경우 : [배송준비] 또는 [배송중] 단계라면,
                취소가 어렵기 때문에 배송이 완료된 후 반품으로 진행해야 해요.
                때문에 단순 변심 반품비용이 발생될 수 있습니다!
              </p>
              <p>
                👉 취소하는 방법 : 마이원룸 .주문내역 조회 버튼을 눌러
                [주문내역] 에서 취소 가능한 상품은 [취소] 버튼이 보여요. 눌러서
                신청하시면 되고, 이미 배송이 진행중이라면 배송 완료 후 보이는
                [반품신청] 버튼을 눌러주세요!
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="footerMenu">
        <div className="footerMenuCon">
          <ul>
            <a href=" /Search">
              {''}
              <li>
                <img src="https://m.oneroommaking.com/web/mobile/220328_search01.png" />
                상품검색
              </li>
            </a>
            <a href="">
              {' '}
              <li>
                <img src="https://m.oneroommaking.com/web/mobile/220328_home02.png" />
                홈
              </li>
            </a>
            <a href="">
              {' '}
              <li>
                <img src="https://m.oneroommaking.com/web/mobile/220328_wish01.png" />
                찜한 상품
              </li>
            </a>
            <a href="/user">
              {' '}
              <li>
                <img src="https://m.oneroommaking.com/web/mobile/220328_mypage01.png" />
                마이원룸
              </li>
            </a>
          </ul>
        </div>
        <div className="footer">
          <div className="footerCon">
            <div className="footerTextCon">
              <div className="footerText1">
                <h2>공지 사항</h2>
                <a href="/announcement1">
                  <div>2024 설 연휴 안내</div>
                </a>
                <a href="/Announcement2">
                  <div>고객 센터 임시 휴무 안내</div>
                </a>
                <a href="/Announcement3">
                  <div>2023 추석 연휴 안내</div>
                </a>
              </div>
              <div className="footerText2">
                <h2>고객 센터</h2>
                <div>평일 10:00 ~ 17:00</div>
                <div>주말 및 공휴일 제외</div>
                <div>점심 시간(12:00~ 13:00)</div>
              </div>
            </div>
            <div className="footerImgCon">
              <a
                href="https://www.youtube.com/c/%EC%9B%90%EB%A3%B8%EB%A7%8C%EB%93%A4%EA%B8%B0"
                target="_blank"
              >
                {' '}
                <div className="footerImgDiv">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/youtube.png`}
                    alt=""
                  />
                </div>
              </a>
              <a href="https://www.instagram.com/oneroom.mart/" target="_blank">
                {' '}
                <div className="footerImgDiv">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/instagram.png`}
                    alt=""
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="footerUnderCon">
            <div>교환, 반품주소 : 각 상품 상세페이지 참고</div>
            <div>서울 마포구 숭문 4길 6 지한 1층</div>
          </div>
        </div>
      </div>
    </>
  );
}
