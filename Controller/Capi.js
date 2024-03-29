const axios = require('axios');
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

    // 액세스 토큰을 프론트엔드로 응답
    res.json({ access_token, result: response.data });
  } catch (e) {
    console.log(e);
  }
};

const register = async (req, res) => {
  const { name, age, email, phone, userId, userPw } = req.body.userInfo;
  console.log(name);
  console.log(age);
  console.log(email);
  console.log(phone);
  console.log(userId);
  console.log(userPw);
};

module.exports = { kakaoLogin, register };
