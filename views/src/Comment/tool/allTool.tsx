const GoodsTool = [
  {
    id: '0',
    img: 'https://m.oneroommaking.com/web/product/medium/202404/e2dc8426b0c8b7a6dd12a7dd8eb4ec6a.png',
    title: '플러피 매트 토퍼 12cm',
    price: '42,900원',
    sale: '52%',
    body: '뚱땡이 토퍼 팝니다',
    delivery: '무료 배송',
    review: 65,
  },
  {
    id: '1',
    img: 'https://m.oneroommaking.com/web/product/medium/202402/ddeaeab029430ec8d5a15d1a40b02eb6.jpg',
    title: '반반 매트리스 토퍼 10cm',
    price: '39,800원',
    sale: '50%',
    body: '토퍼 반반 무 많이 ',
    delivery: '무료 배송',
    review: 1.482,
    category: '생활용품',
  },
  {
    id: '2',
    img: 'https://m.oneroommaking.com/web/product/medium/202402/f8918f6391370e0543411f8dcf15a7ec.png',
    title: '이동식 바지 걸이 행거',
    price: '26,900원',
    sale: '33%',
    body: '바짓가량이 붙잡는 행거',
    delivery: '무료배송',
    review: 1.272,
  },
  {
    id: '3',
    img: 'https://m.oneroommaking.com/web/product/medium/202401/0a17aed4294ffebf34f6499728cca598.webp',
    title: '자국없는 벨크로 암막 커튼',
    price: '아무리 매달려도 소용없어',
    sale: '58%',
    body: '16,800원',
    delivery: '',
    review: 386,
  },
  {
    id: '4',
    img: 'https://m.oneroommaking.com/web/product/medium/202403/f54b7778d96dc11e15cbd6de221a73b3.jpg',
    title: '자동 불끄기 스위치',
    price: '28,900원',
    sale: '33%',
    body: '~ 4월 2일까지 ',
    delivery: '',
    review: 178,
  },
  {
    id: '5',
    img: 'https://m.oneroommaking.com/web/product/medium/202402/28bb45afc7bf7b317e73d65acfd88800.png',
    title: '내솥분리 멀티 포트',
    price: '48,900원',
    sale: '51%',
    body: '이제야 속내를 드러냈군',
    delivery: '무료배송',
    review: 434,
  },
  {
    id: '6',
    img: 'https://m.oneroommaking.com/web/product/medium/202112/f227c9e8143676cf1992ae394d8f58ca.jpg',
    title: '이동식 팬트리 스낵 선반',
    price: '34,000원',
    sale: '48%',
    body: '내 집 앞에 편의점 만들기 ',
    delivery: '무료배송',
    review: 33,
  },
  {
    id: '7',
    img: 'https://m.oneroommaking.com/web/product/medium/202402/19cfc688cd40bfba5f9508a86a852cf7.jpg',
    title: '중소바이미  TV 세트',
    price: '261,000원',
    sale: '62%',
    body: '스텐마X미 1/3 가격',
    delivery: '무료배송',
    review: 124,
  },
  {
    id: '8',
    img: 'https://m.oneroommaking.com/web/product/medium/202311/e4de427ac1a56172086b500b45b70f12.jpg',
    title: '각도조절 집순이 소파배드',
    price: '125,900원',
    sale: '16%',
    body: '집순이 요람',
    delivery: '',
    review: null,
  },
  {
    id: '9',
    img: 'https://m.oneroommaking.com/web/product/medium/202404/ecc041b1f5366e189e6c2ef56556300d.jpg',
    title: '대용량 화장품 정리함',
    price: '34,900원',
    sale: '13%',
    body: '어디까지 들어가시는거예요?',
    delivery: '',
    review: 508,
  },

  // {
  //   id: '10',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202301/66f27db8004cc6ab65f362d26b350470.jpg',
  //   title: '원코 멀티 쿠커 1.5L',
  //   price: '29,900원',
  //   sale: '33%',
  //   body: '물이 없어도 가능한 요리',
  //   delivery: '',
  //   review: '리뷰 939',
  // },
  // {
  //   id: '11',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/af1a0e3f23b2b7d26b2e75d1f9a3e0c8.png',
  //   title: 'DIY 타일 카페트',
  //   price: '2,990원',
  //   sale: '25%',
  //   body: '셀프인테리어의 기초',
  //   delivery: '',
  //   review: '리뷰 694',
  // },
  // {
  //   id: '12',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202206/91302cd08b6ffd85904d3b354a49ce1e.webp',
  //   title: '강화유리 원룸 전신거울',
  //   price: '22,900원',
  //   sale: '54%',
  //   body: '거울이 무슨 잘못을 했길래....',
  //   delivery: '',
  //   review: '리뷰 72',
  // },
  // {
  //   id: '13',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202305/269e1a7f4232c6e4e2934e703ce26a07.jpg',
  //   title: '꿀잠 매트리스',
  //   price: '64,9900원',
  //   sale: '67%',
  //   body: '매트리스도 수명이 있음 ',
  //   delivery: '',
  //   review: '리뷰 539',
  // },
  // {
  //   id: '14',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202206/3cf1ee4b28d16b145653e75812dea860.webp',
  //   title: '저상형 LED 수납침대',
  //   price: '66,900원',
  //   sale: '66%',
  //   body: '이런 나 저상인가요?',
  //   delivery: '',
  //   review: '리뷰 270',
  // },
  // {
  //   id: '15',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202312/14a5cff557142f2ceea60980a41a0223.png',
  //   title: '무볼트 드레스룸 행거',
  //   price: '26,900원',
  //   sale: '39%',
  //   body: '아시 갈 때 분리되는 행거',
  //   delivery: '무료배송',
  //   review: '리퓨 515',
  // },
  // {
  //   id: '16',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202310/c0d2f481d45a81c60ddf46072e0793d2.webp',
  //   title: '불멍 가습기 ',
  //   price: '26,900원',
  //   sale: '40%',
  //   body: '불타는 가습',
  //   delivery: '',
  //   review: '리뷰 42',
  // },
  // {
  //   id: '17',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/06ec1b4a24334a07ed1c235ab2b025dd.png',
  //   title: '특허받은 튼튼한 행거',
  //   price: '37,900원',
  //   sale: '21%',
  //   body: '턱걸이도 할 수 있을 듯ㅋ',
  //   delivery: '무료배송',
  //   review: '리뷰 379',
  // },
  // {
  //   id: '18',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/6452de714409839f0338bd9b2713d40b.jpg',
  //   title: '딥슬립 진동 침구 청소기',
  //   price: '47,900원',
  //   sale: '16%',
  //   body: '나 지금 털고 있니',
  //   delivery: '무료배송',
  //   review: '리뷰 252',
  // },
  // {
  //   id: '19',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/51f8a792214868cfd35cbdbd76c942c5.jpg',
  //   title: '러블리 사이드 테이블 3종',
  //   price: '23,900원',
  //   sale: '66%',
  //   body: '매트리스에 끼우는 테이블',
  //   delivery: '무료배송',
  //   review: '리뷰 211',
  // },
  // {
  //   id: '20',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202308/89dc28df04915eb52d31fd1871140fac.jpg',
  //   title: '부드러운 사계절 차렵침구',
  //   price: '27,900원',
  //   sale: '30%',
  //   body: '이불 : ㅂㄷㅂㄷ',
  //   delivery: '',
  //   review: '리뷰 475',
  // },
  // {
  //   id: '21',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202307/b998c6a197dbcb7f231b5def5f7354d9.jpg',
  //   title: '못없이 설치하는 브라켓',
  //   price: '6,500원',
  //   sale: '46%',
  //   body: '집주인 취향 맞춤',
  //   delivery: '',
  //   review: '리뷰 1,311',
  // },
  // {
  //   id: '22',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202312/01f965248bce3c5ce4ba65d51f8eecc1.png',
  //   title: '탈부착 크록스 내피 1+1',
  //   price: '5,900원',
  //   sale: '54%',
  //   body: '크록스에 미친 대한민국',
  //   delivery: '',
  //   review: '리뷰 402',
  // },
  // {
  //   id: '23',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202301/f9ec736ff8943c55f7d635a1c76baf89.jpg',
  //   title: '대왕 조개 쿠션',
  //   price: '26,900원',
  //   sale: '19%',
  //   body: "인어공주's 자취방",
  //   delivery: '무료배송',
  //   review: '리뷰 3',
  // },
  // {
  //   id: '24',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/88d1559f10ea7cac811c75d4264b4dc3.jpg',
  //   title: '가벼운 살균 스팀 청소기',
  //   price: '39,800원',
  //   sale: '33%',
  //   body: '99.9%살균 + 무게 1.3kg',
  //   delivery: '무료배송',
  //   review: '',
  // },
  // {
  //   id: '25',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/4a972fc2fab5166b5dc8a662dde28fdb.jpg',
  //   title: 'LED 햄버거 무드등',
  //   price: '9,900원',
  //   sale: '29%',
  //   body: '참깨빵 위에 순쇠고기 패티 두 장',
  //   delivery: '무료배송',
  //   review: '',
  // },
  // {
  //   id: '26',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202308/44753d55abc24e5bb372b7e2fde19f21.jpg',
  //   title: '악취방지 하수구 트랩',
  //   price: '6,900원',
  //   sale: '47%',
  //   body: '물 내려갑니다 문 열어주세요',
  //   delivery: '',
  //   review: '리뷰 90',
  // },
  // {
  //   id: '27',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202102/923cffc22bc4f3524a374c354b7a8913.jpg',
  //   title: '자바라 거치대',
  //   price: '15,900원',
  //   sale: '39%',
  //   body: '팔 하나 더 생김',
  //   delivery: '',
  //   review: '리뷰 748',
  // },
  // {
  //   id: '28',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/b8f4e77a063dcf0a7d83bcd99de440f1.jpg',
  //   title: '부착식 LED 센서바 모음',
  //   price: '8,500원',
  //   sale: '14%',
  //   body: '집에 오면 반겨줌',
  //   delivery: '무료배송',
  //   review: '리뷰 496',
  // },
  // {
  //   id: '29',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/ca57c0566de49cee788fe304d2c16aa1.webp',
  //   title: '배불뚝이 규조토 발매트',
  //   price: '12,900원',
  //   sale: '35%',
  //   body: '물만 먹어도 살찜',
  //   delivery: '무료배송',
  //   review: '',
  // },
  // {
  //   id: '30',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202401/9a282d5b8a1eb52847ed131357894be8.jpg',
  //   title: '토마토 냄비 & 후라이팬',
  //   price: '34,900원',
  //   sale: '30%',
  //   body: '토맛 토마토 VS 토마토맛 토',
  //   delivery: '무료배송',
  //   review: '리뷰 5',
  // },
  // {
  //   id: '31',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202105/9b50682648a641f3ecda9938a7f6816b.jpg',
  //   title: '초미니 LED 스탠드',
  //   price: '3,500원',
  //   sale: '50%',
  //   body: '작지만 밝은 녀석',
  //   delivery: '',
  //   review: '리뷰 152',
  // },
  // {
  //   id: '32',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202304/a05169f2e1a1dbdd660cb6eeb016b2fd.webp',
  //   title: '레트로 어른이 카메라 4종',
  //   price: '23,500원',
  //   sale: '4%',
  //   body: '사진  + 셀카 +동영상 가능',
  //   delivery: '',
  //   review: '리뷰 523',
  // },
  // {
  //   id: '33',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202305/975156b3f8df0b23efaab6a1ea50f687.jpg',
  //   title: '타이탄 게이밍 체어 모음 ',
  //   price: '54,900원',
  //   sale: '45%',
  //   body: 'PC방 사장님 의자',
  //   delivery: '',
  //   review: '리뷰 850',
  // },
  // {
  //   id: '34',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202211/235a4af76af834c01378db73870b41c6.jpg',
  //   title: '뽀글이 조각 매트 10장',
  //   price: '14,900원',
  //   sale: '50%',
  //   body: '크리스마스에는 축뽀글~',
  //   delivery: '무료배송',
  //   review: '리뷰 59',
  // },
  // {
  //   id: '35',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/328451a2998826ed328cd8fafabbc3f4.jpg',
  //   title: '블루투스 반지 리모컨',
  //   price: '19,900원',
  //   sale: '13%',
  //   body: '마이 프레셔스',
  //   delivery: '무료배송',
  //   review: '',
  // },
  // {
  //   id: '36',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202305/8839494b0d8649b65ed0934048364132.jpg',
  //   title: '디스이즈 샤쉐 방향제 6종',
  //   price: '2,900원',
  //   sale: '41%',
  //   body: '그들이 샤는 쉐상',
  //   delivery: '',
  //   review: '리뷰 5',
  // },
  // {
  //   id: '37',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/a71e7de8b824ca271135cfe8341d5c55.jpg',
  //   title: '접이식 상판 보조 테이블',
  //   price: '45,900원',
  //   sale: '30%',
  //   body: '상 놓고 ㄱ자도 모른다 ',
  //   delivery: '',
  //   review: '리뷰 71',
  // },
  // {
  //   id: '38',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/2552f300917e6066714b5dbb7a8d0e43.jpg',
  //   title: '인공태양 알람 시계',
  //   price: '51,900원',
  //   sale: '21%',
  //   body: '내일은 해가 원룸에서 뜨겠네',
  //   delivery: '',
  //   review: '리뷰 33',
  // },
  // {
  //   id: '39',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202312/eaf347b59204ac632ce6d9b0b348edd9.gif',
  //   title: '가벼운 초강력 청소기',
  //   price: '36,900원',
  //   sale: '54%',
  //   body: '천장도 청소하겠다',
  //   delivery: '무료배송',
  //   review: '리뷰 223',
  // },
  // {
  //   id: '40',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202105/173ae4fb131d575c20fb4a96ab6e65ec.jpg',
  //   title: '진공 음식물 쓰레기통',
  //   price: '19,900원',
  //   sale: '57%',
  //   body: '부정부패 근절',
  //   delivery: '',
  //   review: '리뷰 890 ',
  // },
  // {
  //   id: '41',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202310/2804aa7271307c2daf01bf3b09bcf7fe.jpg',
  //   title: 'LED 먼티수납침대 2종',
  //   price: '169,000원',
  //   sale: '43%',
  //   body: '침대 + 서랍 + 조명',
  //   delivery: '',
  //   review: '리뷰 211 ',
  // },
  // {
  //   id: '42',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202212/04d691449e648375b793f4945883e0e2.webp',
  //   title: '파인포스 무선 청소기',
  //   price: '59,900원',
  //   sale: '43%',
  //   body: '강한포스가 느껴진다',
  //   delivery: '무료배송',
  //   review: '리뷰 76 ',
  // },
  // {
  //   id: '43',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202312/e73f43e6cabb7d9862d1d3d33ee4992b.gif',
  //   title: '높이 조절 탱크 벙커침대',
  //   price: '299,000원',
  //   sale: '21%',
  //   body: '원룸 안에 원룸',
  //   delivery: '',
  //   review: '리뷰 22 ',
  // },
  // {
  //   id: '44',
  //   img: 'https://m.oneroommaking.com/web/product/medium/201910/dadc4fe607d42346a26db4bf91947744.jpg',
  //   title: '하티 포트 전기 주전자',
  //   price: '35,900원',
  //   sale: '10%',
  //   body: '끓는 점이 보여요',
  //   delivery: '',
  //   review: '리뷰 78 ',
  // },
  // {
  //   id: '45',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202305/e824edc511448488c40b30b4b467f949.jpg',
  //   title: '멜로드 원룸 의류관리기',
  //   price: '349,000원',
  //   sale: '26%',
  //   body: '자취생용 스타일러',
  //   delivery: '무료배송',
  //   review: '리뷰 5 ',
  // },
  // {
  //   id: '46',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/06c962896994797195ef86b9ae32f274.jpg',
  //   title: '노파이어 렌지 그릴',
  //   price: '24,900원',
  //   sale: '72%',
  //   body: '전자렌지로 고기 굽기',
  //   delivery: '',
  //   review: '',
  // },
  // {
  //   id: '47',
  //   img: 'https://m.oneroommaking.com/web/product/medium/201803/211_shop1_722607.jpg',
  //   title: '솔리드 암막 아일렛 커튼',
  //   price: '12,900원',
  //   sale: '12%',
  //   body: '햇빛 잡는 커튼',
  //   delivery: '',
  //   review: '리뷰 769',
  // },
  // {
  //   id: '48',
  //   img: 'https://m.oneroommaking.com/web/product/medium/201808/db2ea84d243b25df6ece937047d61dfb.jpg',
  //   title: '컴퓨터 책상 모음',
  //   price: '60,000원',
  //   sale: '33%',
  //   body: '1인용, 2인용 다있음',
  //   delivery: '',
  //   review: '리뷰 426 ',
  // },
  // {
  //   id: '49',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202010/01ec64957d11540882998ddefa7e87f7.jpg',
  //   title: '문걸이 선반 모음',
  //   price: '27,500원',
  //   sale: '8%',
  //   body: '공간활용 갑',
  //   delivery: '무료배송',
  //   review: '리뷰 532',
  // },
  // {
  //   id: '50',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202210/84f1c40b7d67196a0b41dd7630745d28.jpg',
  //   title: '딜라이브 셋탑박스',
  //   price: '129,000원',
  //   sale: '32%',
  //   body: '이제 TV만 있으면 되겠다',
  //   delivery: '무료배송',
  //   review: '리뷰 278',
  // },
  // {
  //   id: '51',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202302/543a59fde0843f557c78b2265c4b6d85.jpg',
  //   title: 'FHD 무선 스마트 빔',
  //   price: '129,900원',
  //   sale: '15%',
  //   body: '유튜브 + 디즈니 + 넷플릭스',
  //   delivery: '',
  //   review: '리뷰 22 ',
  // },
  // {
  //   id: '52',
  //   img: 'https://m.oneroommaking.com/web/product/medium/20200304/bfd038d20a764fb4de6e846d46c76122.jpg',
  //   title: '로슬린 2인 식기 세트',
  //   price: '16,900원',
  //   sale: '88%',
  //   body: '혼자서 2인분 먹어요',
  //   delivery: '무료배송',
  //   review: '리뷰 633',
  // },
  // {
  //   id: '53',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202307/9da2c095b5231c18efe19e6cd175865c.jpg',
  //   title: '원룸 일체형 침대 3종',
  //   price: '59,900원',
  //   sale: '68%',
  //   body: '다리 달린 매트리스',
  //   delivery: '',
  //   review: '리뷰 17 ',
  // },
  // {
  //   id: '54',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/a362ffc270d01955c55fc4c0f10ca901.jpg',
  //   title: '쿠잉 미니건조기 4.5KG',
  //   price: '240,000원',
  //   sale: '44%',
  //   body: '수건 최대 20장',
  //   delivery: '무료배송',
  //   review: '리뷰 108',
  // },
  // {
  //   id: '55',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202109/e965656b42de4c353a2e122ef8ae5038.gif',
  //   title: 'DIY 미니 도예 세트',
  //   price: '22,900원',
  //   sale: '36%',
  //   body: '안돼예? 이래도예?',
  //   delivery: '',
  //   review: '리뷰 17',
  // },
  // {
  //   id: '56',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202312/667abb0f1ba42e4b46708e973793b1f4.gif',
  //   title: '레벨업 확장형 드레스룸',
  //   price: '35,900원',
  //   sale: '9%',
  //   body: '옷 살때마다 늘어남',
  //   delivery: '',
  //   review: '리뷰 105',
  // },
  // {
  //   id: '57',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202208/a2511808366535cab7e4c2465b66443a.jpg',
  //   title: 'Q10 무선 청소기',
  //   price: '56,900원',
  //   sale: '13%',
  //   body: '청소기도 이쁠수 있음 ',
  //   delivery: '무료배송',
  //   review: '리뷰 784',
  // },
  // {
  //   id: '58',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/bfe76b0dcb0623e7fd457d3c3846725a.jpg',
  //   title: '네오 드레스룸 벙커침대',
  //   price: '1,980,000원',
  //   sale: '34%',
  //   body: '수납력 디진다돈까쓰',
  //   delivery: '무료배송',
  //   review: '',
  // },
  // {
  //   id: '59',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202205/6372a770cdb1ee6cef94a10f69c4a823.jpg',
  //   title: '폭좁은 다용도 수납장',
  //   price: '39,000원',
  //   sale: '19%',
  //   body: '으이그 폭 좁은 놈',
  //   delivery: '',
  //   review: '리뷰 113 ',
  // },
  // {
  //   id: '60',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202210/b8d871cbfc8c5a6ad6c5626244e047ca.jpg',
  //   title: '원룸 구름 소파 베드',
  //   price: '94,000원',
  //   sale: '37%',
  //   body: '너가 구름그렇지',
  //   delivery: '',
  //   review: '리뷰 121 ',
  // },
  // {
  //   id: '61',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202205/9bec03372731202f184f47ac0be9de94.jpg',
  //   title: '원룸 미니 빈백 소파',
  //   price: '56,900원',
  //   sale: '69%',
  //   body: '2인용 같은 1인용',
  //   delivery: '',
  //   review: '리뷰 17',
  // },
  // {
  //   id: '62',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202111/27e7a9e3295cc6091e3bb4e9a79c6d95.jpeg',
  //   title: '자국 안 남는 현관 방음재',
  //   price: '124,000원',
  //   sale: '20%',
  //   body: '치킨오는 소리 안 들릴 수 있음',
  //   delivery: '',
  //   review: '리뷰 89',
  // },
  // {
  //   id: '63',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202103/e4a21bf4109494037425d0cb7c6a8401.webp',
  //   title: '한손 진공 압축팩',
  //   price: '4,900원',
  //   sale: '55%',
  //   body: '복수 진공',
  //   delivery: '',
  //   review: '리뷰 56',
  // },
  // {
  //   id: '64',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202310/d00945cbb57d5d4226811573f0add36c.jpg',
  //   title: '전자파 안심 전기요',
  //   price: '32,900원',
  //   sale: '56%',
  //   body: '전기요, 잠깐만요!',
  //   delivery: '무료배송',
  //   review: '리뷰 503',
  // },
  // {
  //   id: '65',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202401/886ec86dc1a8031a26d97ee513c93fae.png',
  //   title: '모자 스타일러',
  //   price: '129,000원',
  //   sale: '13%',
  //   body: '세탁기에 돌리지마',
  //   delivery: '무료배송',
  //   review: '리뷰 85',
  // },
  // {
  //   id: '66',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202301/6911386f19b5b53df9aa6ae4eb8debc8.webp',
  //   title: '문 뒤 공간활용 선반',
  //   price: '79,000원',
  //   sale: '30%',
  //   body: '문뒤 자슥아',
  //   delivery: '',
  //   review: '리뷰 24 ',
  // },
  // {
  //   id: '67',
  //   img: 'https://m.oneroommaking.com/web/product/medium/20191217/62a5b9ebf2763a317b45ce752a04a10a.jpeg',
  //   title: '어른이 쿠폰 8종',
  //   price: '8,800원',
  //   sale: '11%',
  //   body: '긁지 않은 복권',
  //   delivery: '',
  //   review: '리뷰 1,171 ',
  // },
  // {
  //   id: '68',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/26d0f91cea6749d14b3273f1516b2964.webp',
  //   title: '패브릭 리프트업 침대 2종',
  //   price: '179,000원',
  //   sale: '36%',
  //   body: '매트리스 그대로 들어올림',
  //   delivery: '',
  //   review: '',
  // },
  // {
  //   id: '69',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202401/87d2810ffce88a594f056d4b3b37a19c.jpg',
  //   title: '라미 멀티 책장형 침대',
  //   price: '229,000원',
  //   sale: '38%',
  //   body: '난 책장에 먹을 것 쌓아둠',
  //   delivery: '',
  //   review: '리뷰 36 ',
  // },
  // {
  //   id: '70',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/8b29d7a9bcb9e08b6d3198b3a887528d.png',
  //   title: '접이식 간이 반신욕조',
  //   price: '43,000원',
  //   sale: '31%',
  //   body: '정신차리게 욕조 해줘 ',
  //   delivery: '',
  //   review: ' ',
  // },
  // {
  //   id: '71',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/548aec233884826b27e934f82a3c49d6.jpg',
  //   title: '매직 파티션 3종',
  //   price: '35,900원',
  //   sale: '32%',
  //   body: '공간분리만 잘해도 반은 완성',
  //   delivery: '무료배송',
  //   review: '리뷰 4 ',
  // },
  // {
  //   id: '72',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/01c7e623e0a2f74553d6064512b240cd.jpg',
  //   title: '투명 아이패드 케이스',
  //   price: '21,900원',
  //   sale: '39%',
  //   body: '가로세로스텐드 + 펜슬보관',
  //   delivery: '',
  //   review: '리뷰 234 ',
  // },
  // {
  //   id: '73',
  //   img: 'https://m.oneroommaking.com/web/product/medium/201807/482_shop1_15313124262611.jpg',
  //   title: '라이트보울 변기 라이트',
  //   price: '9,900원',
  //   sale: '29%',
  //   body: '자다가도 조준 성공',
  //   delivery: '',
  //   review: '리뷰 70 ',
  // },
  // {
  //   id: '74',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202307/f358c9d0d309802bfd3e1f4a79a20fc2.jpg',
  //   title: '다용도 세척볼',
  //   price: '13,800원',
  //   sale: '7%',
  //   body: '솔직히 비빔면 끓일 때 개꿀',
  //   delivery: '무료배송',
  //   review: '리뷰 117 ',
  // },
  // {
  //   id: '75',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202401/b09d8f3268a0aa889a1c6bf25a16043d.jpg',
  //   title: '전자렌지용 라면 그릇',
  //   price: '12,900원',
  //   sale: '22%',
  //   body: '계란찜, 냉동식품 모두 ㄱㄱ',
  //   delivery: '',
  //   review: '리뷰 1 ',
  // },

  // {
  //   id: '76',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/babdb8feef2f93fe003dc3e0fd2d2eed.png',
  //   title: '프래밀리 사계절 침구세트',
  //   price: '37,900원',
  //   sale: '71%',
  //   body: '미리밀리 준비하세요',
  //   delivery: '',
  //   review: '',
  // },
  // {
  //   id: '77',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/f08610b48916e4e6a7d525561ae23ce6.jpg',
  //   title: '양면 이불 커버 세트',
  //   price: '21,900원',
  //   sale: '16%',
  //   body: '베개커버 +이불커버+침대커버',
  //   delivery: '무료배송',
  //   review: '',
  // },
  // {
  //   id: '78',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202312/cb013f3517aa14584b4d81c11e3d6536.png',
  //   title: '만능 슬라이딩 수납장 5종',
  //   price: '19,900원',
  //   sale: '67%',
  //   body: '밀당의 고수',
  //   delivery: '',
  //   review: '리뷰 3 ',
  // },
  // {
  //   id: '79',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202104/94f8d2299b7109aa64ea565b5e42e4bb.jpg',
  //   title: '주문제작 각인 소주잔',
  //   price: '4,900원',
  //   sale: '39%',
  //   body: '소주잔에 이름 써놨냐ㅋ',
  //   delivery: '',
  //   review: '리뷰 204 ',
  // },
  // {
  //   id: '80',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202305/4e90c706fdf699c22fd92d0090cb6bb1.jpg',
  //   title: '원도우 커버 옷장 9종',
  //   price: '36,900원',
  //   sale: '26%',
  //   body: '창문 달린 행거',
  //   delivery: '무료배송',
  //   review: '리뷰 284 ',
  // },
  // {
  //   id: '81',
  //   img: 'https://m.oneroommaking.com/web/product/medium/201906/ba6f77b954fbb3fa1fa784631832701e.jpg',
  //   title: '커플 백문백답',
  //   price: '8,800원',
  //   sale: '25%',
  //   body: '날 아직도 몰라?',
  //   delivery: '',
  //   review: '리뷰 549 ',
  // },
  // {
  //   id: '82',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/ba7affdd0096fde915b940324a5dad64.webp',
  //   title: '로롬 파워 무선청소기',
  //   price: '34,900원',
  //   sale: '24%',
  //   body: '흡입력 12000PA',
  //   delivery: '',
  //   review: '',
  // },
  // {
  //   id: '83',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202301/9a2f6bd652ee1aad089e93e37f1404a1.jpg',
  //   title: '덤블워싱 차렵침구',
  //   price: '29,900원',
  //   sale: '38%',
  //   body: '이불 덮기 딱 좋은 날씨네',
  //   delivery: '',
  //   review: '리뷰 256 ',
  // },
  // {
  //   id: '84',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202311/9db933f8151b788f3f422fe158e7de4f.jpg',
  //   title: '터치미 극세사 러그',
  //   price: '18,900원',
  //   sale: '50%',
  //   body: '깔아만 놔도 온도 올라감',
  //   delivery: '무료배송',
  //   review: '리뷰 480 ',
  // },
  // {
  //   id: '85',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/d5de3f21891def6467fceb77b91472ae.jpg',
  //   title: '대용량 수납 침대 2종',
  //   price: '109,900원',
  //   sale: '45%',
  //   body: '수납침대 = 원룸 필수템',
  //   delivery: '',
  //   review: '리뷰 153 ',
  // },
  // {
  //   id: '86',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202012/fd23da70bcfc36b0c409ad423349ed3e.jpg',
  //   title: '전면 거울 장롱',
  //   price: '19,000원',
  //   sale: '48%',
  //   body: '장롱 셀카존',
  //   delivery: '',
  //   review: '리뷰 13 ',
  // },
  // {
  //   id: '87',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202402/b32e00722a126ac2fe71831511c296c3.jpg',
  //   title: '자국없는 벨크로 쉬폰커튼',
  //   price: '17,800원',
  //   sale: '56%',
  //   body: '매달려도 소용없다고 했지',
  //   delivery: '',
  //   review: '리뷰 21 ',
  // },
  // {
  //   id: '88',
  //   img: 'https://m.oneroommaking.com/web/product/medium/20200121/5e573b29ae401219497ea8e58cb5a620.jpg',
  //   title: '3초 온수 포트',
  //   price: '69,000원',
  //   sale: '37%',
  //   body: '딱 3초 준다 당장 내려와라',
  //   delivery: '무료배송',
  //   review: '리뷰 59 ',
  // },
  // {
  //   id: '89',
  //   img: 'https://m.oneroommaking.com/web/product/medium/202403/12043deff3bf7de331df58a5d176da07.png',
  //   title: '잠자는 고양이 무드등',
  //   price: '15,800원',
  //   sale: '20%',
  //   body: '왜 여기서 자?',
  //   delivery: '무료배송',
  //   review: '리뷰 46 ',
  // },
  {
    id: '90',
    img: 'https://m.oneroommaking.com/web/product/medium/202306/c5f11d32e602778fc7134156f7c7850a.jpg',
    title: 'JMW 접이식 에어플립',
    price: '75,000원',
    sale: '26%',
    body: '접이식 + 항공뫁 + 저소음',
    delivery: '무료배송',
    review: 790,
  },
  {
    id: '91',
    img: 'https://m.oneroommaking.com/web/product/medium/202206/8de7f44fcc882f14760194e36174331e.jpg',
    title: '파닥 모찌 오리인형',
    price: '9,900원',
    sale: '59%',
    body: '아 잠깐 명치 맞았어',
    delivery: '무료배송',
    review: 182,
  },
  {
    id: '92',
    img: 'https://m.oneroommaking.com/web/product/medium/202312/78197b9356d7f0fcce16c12266f655ea.png',
    title: '로잔 세라민 후라이팬 6종',
    price: '19,900원',
    sale: '57%',
    body: '안 눌러 붙는 후라이팬',
    delivery: '무료배송',
    review: 41,
  },
  {
    id: '93',
    img: 'https://m.oneroommaking.com/web/product/medium/202312/78197b9356d7f0fcce16c12266f655ea.png',
    title: '접이식 수납 소파베드',
    price: '328,000원',
    sale: '27%',
    body: '자치방 올라운더',
    delivery: '',
    review: 9,
  },
  {
    id: '94',
    img: 'https://m.oneroommaking.com/web/product/medium/202102/bf7211a755bea68cd51a0677dae820a3.jpg',
    title: '루트 게이밍 컴퓨터 책상',
    price: '68,000원',
    sale: '15%',
    body: '엄마 게일하려고 산 거 아냐',
    delivery: '',
    review: 91,
  },
  {
    id: '95',
    img: 'https://m.oneroommaking.com/web/product/medium/202309/15abdd067423dea74aa40b7a065ec8b3.jpg',
    title: '깊게자요 솔리드 침구 세트',
    price: '29,900원',
    sale: '57%',
    body: '누가 업어가도 모르겠네',
    delivery: '',
    review: 14,
  },
  {
    id: '96',
    img: 'https://m.oneroommaking.com/web/product/medium/202105/4bc49e048b98af218361a26adb54f1de.jpg',
    title: '디스이즈 디퓨저',
    price: '6,900원',
    sale: '43%',
    body: '두개 사도 만원 안함',
    delivery: '',
    review: 4.515,
  },
  {
    id: '97',
    img: 'https://m.oneroommaking.com/web/product/medium/202112/865407554e5a28bd68e3fd4cc09e2411.jpg',
    title: '3단 접이식 매트리스',
    price: '29,900원',
    sale: '40%',
    body: '친구 놀러 왔을 때 개꿀',
    delivery: '',
    review: 119,
  },
  {
    id: '98',
    img: 'https://m.oneroommaking.com/web/product/medium/202401/be364592e04cbc02f4b434c08464b9eb.jpg',
    title: '인스탁스 키링 카메라',
    price: '159,000원',
    sale: '6%',
    body: '찍은 사진 폰에서 보정 가능',
    delivery: '무료배송',
    review: null,
  },
  {
    id: '99',
    img: 'https://m.oneroommaking.com/web/product/medium/202212/867240f2ffb8eab932cb3b828977daff.gif',
    title: '스마트 센서 휴지통',
    price: '19,900원',
    sale: '50%',
    body: '나 이제 거기서 뗐어',
    delivery: '',
    review: 161,
  },
];

export { GoodsTool };