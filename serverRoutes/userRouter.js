const express = require('express');
const controller = require('../Controller/Cuser');
const middleware = require('../middleware'); //사용자 인증정보 미들웨어 추가

const router = express();

// http://localhost:5000/user/kakao
router.post('/kakao', controller.kakaoUser);

// http://localhost:5000/user/itemAdd
router.post('/itemAdd', middleware.auth, controller.likeAdd);
// http://localhost:5000/user/itemDel
router.post('/itemDel', middleware.auth, controller.likeDel);

// http://localhost:5000/user/itemView
router.get('/itemView', middleware.auth, controller.likeView);

module.exports = router;
