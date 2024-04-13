const axios = require('axios');
const { Items, User, UserLike, Bucket } = require('../models');
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
const name = async (req, res) => {
  const { id } = req.user;
  const findUser = await User.findOne({ where: { userId: id } });
  if (findUser) {
    res.json({ username: findUser.userId });
  } else {
    res.json({ message: '오류가 발생하였습니다' });
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

const bucketAdd = async (req, res) => {
  const { title } = req.body;
  const findId = await Items.findOne({ where: { title } });
  const { id } = req.user; // userId
  const user = await User.findOne({ where: { userId: id } });
  console.log('user : ', user);
  const find = await Bucket.findOne({
    where: { userId: user.id, itemId: findId.id },
  });
  // 장바구니 : 상품이 이미 존재하는 경우 | 상품이 존재하지 않을 경우
  if (find) {
    res.json({ success: false, message: '이미 장바구니에 추가된 상품입니다.' });
  } else {
    res.json({ success: true, message: '장바구니에 추가되었습니다.' });
    await Bucket.create({ userId: user.id, itemId: findId.id });
  }
};
const bucketDel = async (req, res) => {
  const { title } = req.body;
  const findId = await Items.findOne({ where: { title } });
  const { id } = req.user; // userId
  console.log('id : ', id);
  const user = await User.findOne({ where: { userId: id } });
  console.log('user : ', user);
  await Bucket.destroy({ where: { userId: user.id, itemId: findId.id } });
};

const bucketView = async (req, res) => {
  const { id } = req.user;
  const user = await User.findOne({ where: { userId: id } });
  const list = await Bucket.findAll({ where: { userId: user.id } });
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

module.exports = {
  kakaoUser,
  name,
  likeAdd,
  likeDel,
  likeView,
  bucketAdd,
  bucketDel,
  bucketView,
};
