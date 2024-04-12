const axios = require('axios');
const { Items, User, UserLike } = require('../models');
// 로그인 아님! 카카오 유저 데이터 조회 기능
const kakaoUser = async (req, res) => {
  try {
    console.log('React에서 서버 API에 데이터 전송 성공');
    const { access_token } = req.body;
    console.log('access_token', access_token);
    try {
      const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log('userInfo : ', userInfo);
      res.json({ result: userInfo.data });
    } catch (e) {
      console.log('e : ', e);
    }
  } catch (e) {
    // console.log('에러',e);
  }
};

const likeAdd = async (req, res) => {
  const { title } = req.body;
  const findId = await Items.findOne({ where: { title } });
  const { id } = req.user; // userId
  console.log('id : ', id); // 실제 id가 아니라 index 가 나옴.. -> 로그인 할 때 jwt 에 index 값을 전달해서 생긴 문제
  const user = await User.findOne({ where: { userId: id } });
  console.log('user : ', user);
  const find = await UserLike.findOne({
    where: { userId: user.id, itemId: findId.id },
  });
  if (find) {
    return;
  } else {
    await UserLike.create({ userId: user.id, itemId: findId.id });
  }
};
const likeDel = async (req, res) => {
  const { title } = req.body;
  const findId = await Items.findOne({ where: { title } });
  const { id } = req.user; // userId
  console.log('id : ', id);
  const user = await User.findOne({ where: { userId: id } });
  console.log('user : ', user);
  await UserLike.destroy({ where: { userId: user.id, itemId: findId.id } });
};

const likeView = async (req, res) => {
  const { id } = req.user;
  const user = await User.findOne({ where: { userId: id } });
  // list 는 배열
  const list = await UserLike.findAll({ where: { userId: user.id } });
  let viewItem = [];
  for (let i = 0; i < list.length; i++) {
    // itemId는 items 의 각 상품 id와 같음
    // Items db의 id에 접근하기 위해 itemId를 사용
    viewItem.push(await Items.findOne({ where: { id: list[i].itemId } }));
  }
  console.log('viewitem : ', viewItem);
  // viewItem은 사용자가 heart를 눌렀던 목록들 배열 상태로 나열됨
  res.json({ viewItem });
};

module.exports = { kakaoUser, likeAdd, likeDel, likeView };
