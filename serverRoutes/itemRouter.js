const express = require('express');
const controller = require('../Controller/Citem');
const router = express();

// http://localhost:5000/api/item
// router.post('/login/kakao', controller.);
// http://localhost:5000/api/item
// router.post('/register', controller.);

// http://localhost:5000/api/item/chart
router.get('/chart', controller.chart);
module.exports = router;
