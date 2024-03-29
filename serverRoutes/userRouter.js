const express = require('express');
const controller = require('../Controller/Cuser');
const router = express();

// http://localhost:5000/login/kakao
router.post('/kakao',controller.kakaoUser);

module.exports = router;