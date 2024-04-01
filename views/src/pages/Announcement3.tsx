import './css/Announcement.scss';
export default function Announcement3() {
  return (
    <>
      <div className="AnnCon">
        <div className="AnnDiv  ">
          <div className="AnnContent">
            <h1>2023 추석 연휴 안내</h1>
            <>
              <div className="div1">
                <ul>
                  {' '}
                  <span>[주문/배송]</span> 설 연휴 전후로 택배 물량 증가가
                  예상됨에 상품 배송 및 교환/반품 처 리가 지연될 수 있습니다.
                  <li>
                    주문 처리 및 배송 일정은 업체/택배사에 따라 상이하니, 상품
                    페이지 내 공지를 꼭 확인 부탁드립니다.
                  </li>
                  <li>
                    택배사의 배송 접수가 마감된 경우, 설 연휴 이후 배송이
                    순차적으로 진행 될 예정입니다.
                  </li>
                  <li>
                    연휴 전후 주문/배송 물량 증가로 인해 택배사 배송이 지연 될
                    수 있으 니 충분한 시간 여유를 가지고 주문해 주세요.
                  </li>
                </ul>
              </div>
              <div className="div2">
                <p>
                  <span>[고객 센터 운영 안내]</span> 아래와 같이 연휴 기간 동안
                  고객 센터도 잠시 쉬어 갈 예정입니다. 휴무 기간 동안 상담, 기타
                  업무 처리가 불가하오니 양해 부탁 드립니다.{' '}
                </p>
              </div>
              <div className="day">
                {' '}
                <p>
                  <span>고객센터 휴무 기간</span> : 2023년 9월 28일(목) ~ 10월
                  3일(화){' '}
                </p>
                <p>
                  <span>정상업무 </span>:2023년 10월 4일(수) 오전 10시부터 임시
                  공휴일 지정으로 6일간의 긴 추석 연휴가 시작됩니다.
                </p>{' '}
              </div>
              <div className="div3">
                <p> 소중한 가족과 함께 풍성한 한가위를 즐기시길 바랍니다.</p>
                <p>이용해 주셔서 진심으로 감사 드립니다.</p>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
