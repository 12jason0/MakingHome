const express = require('express');
const controller = require('../Controller/Citem');
const router = express();

// http://localhost:5000/api/item/all
router.get('/all', controller.all);
// http://localhost:5000/api/item/issue/:id
router.get('/issue/:id', controller.issue);
// http://localhost:5000/api/item

// http://localhost:5000/api/item/gift
router.get('/gift', controller.gift);

// http://localhost:5000/api/item/chart
// http://localhost:5000/api/item/chart , 차트 데이터
router.get('/chart/all', controller.chart_All);
router.get('/chart/week', controller.chart_Week);
router.get('/chart/month', controller.chart_Month);
router.get('/chart/honor', controller.chart_Honor);
router.get('/chart/toolA', controller.chart_ToolA);
router.get('/chart/toolB', controller.chart_ToolB);
router.get('/chart/toolC', controller.chart_ToolC);
router.get('/chart/toolD', controller.chart_ToolD);
router.get('/chart/toolE', controller.chart_ToolE);
router.get('/chart/toolF', controller.chart_ToolF);
router.get('/chart/toolG', controller.chart_ToolG);
router.get('/chart/toolH', controller.chart_ToolH);

// http://localhost:5000/api/item/search
router.get('/search', controller.search);
module.exports = router;
