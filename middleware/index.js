const jwt = require('jsonwebtoken');

//사용자 프로필에 접근하기 전에 사용자가 인증되었는지 확인하는 과정
exports.auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ success: false });
  }
  const [_, token] = header.split(' ');
  console.log('@ token: ', token);

  //jwt 인증
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    if (err) {
      console.log('jwt.verify() 에러!');
      return res.status(403).json({ success: false });
    }
    console.log('@ decode: ', decode); //{ id: 'a', iat: 1709121966, exp: 1709125566 }

    req.user = decode; //다음 미들웨어로 전달하는 값
    console.log('@ req.user: ', req.user);
    next();
  });
};
