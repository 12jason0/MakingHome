const express = require('express');
const controller = require('../Controller/Capi');
const router = express();

// 로컬용 API
// http://localhost:5000/
// 배포용 API
// http://54.180.183.108/

// http://localhost:5000/api/login/kakao 카카오 로그인
router.post('/login/kakao', controller.kakaoLogin);
// http://localhost:5000/api/register 일반 회원가입
router.post('/register', controller.register);
// http://localhost:5000/api/login 일반 로그인
router.post('/login', controller.login);

module.exports = router;
