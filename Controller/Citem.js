const { Items, ItemChart, ItemGift } = require('../models');
const { Sequelize, Op } = require('sequelize');

// all 모든 상품 페이지 데이터 조회
const all = async (req, res) => {
  const all_item = await Items.findAll();
  res.json({ all_item });
};
// 집들이 모든 상품 페이지 데이터 조회
const gift = async (req, res) => {
  const gift_item = await ItemGift.findAll();
  res.json({ gift_item });
};
// best 전체 50개 가구 뽑아오기
const chart_All = async (req, res) => {
  const best_item = await ItemChart.findAll({
    where: { chartbar: '전체', chart: { [Sequelize.Op.between]: [1, 50] } },
  });
  res.json({ type: '전체보기', best_item });
};
// best 주간 차트 50개 가구 뽑아오기
const chart_Week = async (req, res) => {
  const best_item = await ItemChart.findAll({
    where: { chartbar: '주간차트', chart: { [Sequelize.Op.between]: [1, 50] } },
  });
  res.json({ type: '주간차트', best_item });
};
// best 월간 차트 50개 가구 뽑아오기
const chart_Month = async (req, res) => {
  const best_item = await ItemChart.findAll({
    where: { chartbar: '월간차트', chart: { [Sequelize.Op.between]: [1, 50] } },
  });
  res.json({ type: '월간차트', best_item });
};
// best 명예의 전당 등록품 50개 가구 뽑아오기
const chart_Honor = async (req, res) => {
  const best_item = await ItemChart.findAll({
    where: {
      chartbar: '명예의 전당',
      chart: { [Sequelize.Op.between]: [1, 50] },
    },
  });
  res.json({ type: '명예의 전당', best_item });
};

const chart_ToolA = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '가구' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
const chart_ToolB = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '원룸 가전' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
const chart_ToolC = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '패브릭' },
    order: [['review', 'DESC']],
  });

  res.json({ best_item });
};
const chart_ToolD = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '옷정리/보관' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
const chart_ToolE = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '소품/취미' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
const chart_ToolF = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '생활 용품' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
const chart_ToolG = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '조명' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
const chart_ToolH = async (req, res) => {
  const best_item = await Items.findAll({
    where: { category1: '셀프 인테리어' },
    order: [['review', 'DESC']],
  });
  res.json({ best_item });
};
module.exports = {
  all,
  gift,
  chart_All,
  chart_Week,
  chart_Month,
  chart_Honor,
  chart_ToolA,
  chart_ToolB,
  chart_ToolC,
  chart_ToolD,
  chart_ToolE,
  chart_ToolF,
  chart_ToolG,
  chart_ToolH,
};
