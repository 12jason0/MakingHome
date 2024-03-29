const axios = require('axios');
const { User, UserProfile } = require('../models');

// 카카오 로그인
const kakaoLogin = async (req, res) => {
  try {
    console.log('React에서 서버 API에 데이터 전송 성공');
    const { code } = req.body;

    const CLIENT_ID = '34596871e6b97db995c419d12fd24a01';
    const CLIENT_SECRET = 'qQfkWLB3et9ak65S36S2Bew9qNZGxDd1';
    // 카카오로 액세스 토큰 요청
    const response = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/login',
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    // 카카오로부터 받은 응답에서 액세스 토큰 추출
    const access_token = response.data.access_token;

    // 액세스 토큰을 프론트엔드로 응답(로그인 완료)
    res.json({ access_token, result: response.data });
  } catch (e) {
    console.log(e);
  }
};

// oneRoom 회원가입
const register = async (req, res) => {
  const { name, age, email, phone, userId, userPw } = req.body.userInfo;
  const findUserName = await UserProfile.findOne({ where: { name } }); // 중복 회원가입 방지
  const findUserId = await User.findOne({ where: { userId } }); // 중복 아이디 방지
  if (findUserName) {
    res.json({ success: false, message: '이미 존재하는 회원입니다.' });
  } else if (findUserId) {
    res.json({ success: false, message: '사용중인 아이디입니다.' });
  } else {
    await User.create({ userId, userPw });
    await UserProfile.create({ name, age, email, phone });
    res.json({ success: true, message: '회원가입에 성공하셨습니다' });
  }
};
// oneroom 로그인 + findUserId,findUserPw(이렇게 해놓고 비밀번호 암호화 > jwt 적용시키면 지울거)
const login = async (req, res) => {
  const { userId, userPw } = req.body.userInput;
  const findUserId = await User.findOne({ where: { userId } });
  const findUserPw = await User.findOne({ where: { userPw } });
  if (findUserId) {
    if (findUserPw) {
      res.json({ success: true, message: '로그인 성공' });
    } else {
      res.json({
        success: false,
        message: '비밀번호를 잘못 입력하셨습니다',
        item: 'userPw',
      });
    }
  } else {
    res.json({
      success: false,
      message: '아이디를 잘못 입력하셨습니다',
      item: 'userId',
    });
  }
};

module.exports = { kakaoLogin, register, login };
