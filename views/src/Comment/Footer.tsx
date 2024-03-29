import './css/Footer.scss';
export default function Footer() {
  return (
    <>
      <div className="footerMenu">
        <div className="footerMenuCon"></div>
        <div className="footer">
          <div className="footerCon">
            <div className="footerTextCon">
              <div className="footerText1">
                <h2>공지 사항</h2>
                <a href="">
                  <div>2024 설 연휴 안내</div>
                </a>
                <a href="">
                  <div>고객 센터 임시 휴무 안내</div>
                </a>
                <a href="">
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
