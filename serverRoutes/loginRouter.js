const express = require('express');
const controller = require('../Controller/Clogin');
const router = express();

// http://localhost:5000/login/kakao
router.post('/kakao',controller.kakaoLogin)

module.exports = router;