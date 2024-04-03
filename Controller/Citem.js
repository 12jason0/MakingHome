const { Items } = require('../models');
const { Sequelize, Op } = require('sequelize');


// all 모든 상품 페이지 데이터 조회
const all = async (req, res) => {
    const all_item = await Items.findAll();
    console.log('all_item',all_item);
    res.json({all_item});
};
// best 50개 상품 데이터 뽑아오기(현재 20개인데 늘릴거)
const chart = async (req, res) => {
    const best_item = await Items.findAll({where : {chart : {[Sequelize.Op.between] :  [1,20]}}});
    console.log('best_item',best_item);
    res.json({best_item});
};

module.exports = { all,chart };
