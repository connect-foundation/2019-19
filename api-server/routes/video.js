const express = require('express');
const decodeUrl = require('urldecode');
const { Video } = require('../models');
const ElasticSearch = require('../elastic-server/src/controller/ElasticSearchController');

const router = express.Router();

router.get('/five-random-popular-videos', async (req, res) => {
  const data = await Video.getTopFivePopularVideos();
  return res.json(data);
});

router.get('/main-thumbnail-video', async (req, res) => {
  const data = await Video.getRandomPopularVideo();
  return res.json(data);
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
  //   console.log(data);
  return res.json(data);
});

router.get('/search/:keyword', async (req, res) => {
  const decodedKeyword = decodeUrl(req.params.keyword);
  console.log(`decodedKeyword is ${decodedKeyword}`);
  const data = await ElasticSearch.getResult('name', decodedKeyword, 'asc');
  return res.json(data);
});

module.exports = router;
