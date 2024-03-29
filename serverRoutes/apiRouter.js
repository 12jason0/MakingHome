const express = require('express');
const controller = require('../Controller/Capi');
const router = express();

// http://localhost:5000/api/login/kakao
router.post('/login/kakao', controller.kakaoLogin);
// http://localhost:5000/api/register
router.post('/register', controller.register);
module.exports = router;
