const express = require('express');
const decodeUrl = require('urldecode');
const { Video } = require('../models');
const ElasticSearch = require('../elastic-server/src/controller/ElasticSearchController');

const router = express.Router();

router.get('/five-random-popular-videos', async (req, res) => {
  const data = await Video.getTopFivePopularVideos();
  return res.json(data);
});

router.get('/popular-thumbnail-video', async (req, res) => {
  const data = await Video.getRandomPopularVideo();
  return res.json(data);
});

router.get('/popular-videos', async (req, res) => {
  const result = await ElasticSearch.getPopularVideos();
  return res.json(result);
});

router.get('/recent-thumbnail-video', async (req, res) => {
  const topFiveRecentVideos = await ElasticSearch.getFiveRecentVideos();
  const result =
    topFiveRecentVideos[Math.floor(Math.random() * topFiveRecentVideos.length)];
  return res.json(result);
});

// 요청받은 카테고리의 컨텐츠들을 좋아요 높은 순으로 json 데이터 제공 (Home 페이지 캐러셀에 쓰임)
router.get('/:category', async (req, res) => {
  const decodedCategory = decodeUrl(req.params.category);
  const data = await ElasticSearch.filterController(
    'category',
    'desc',
    [decodedCategory],
    [{ likes: { order: 'desc' } }],
  );
  return res.json(data);
});

// 요청받은 카테고리의 컨텐츠들을 최근 날짜 순으로 json 데이터 제공 (Recent 페이지 캐러셀에 쓰임)
router.get('/:category/recent', async (req, res) => {
  const decodedCategory = decodeUrl(req.params.category);
  const data = await ElasticSearch.filterController(
    'category',
    'desc',
    [decodedCategory],
    [{ reg_date: { order: 'desc' } }],
  );
  return res.json(data);
});

router.get('/search/:keyword', async (req, res) => {
  const decodedKeyword = decodeUrl(req.params.keyword);
  console.log(`decodedKeyword is ${decodedKeyword}`);
  const data = await ElasticSearch.getResult('name', decodedKeyword, 'asc');
  return res.json(data);
});

module.exports = router;
