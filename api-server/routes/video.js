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

router.get('/:category', async (req, res) => {
  const decodedCategory = decodeUrl(req.params.category);
  const data = await ElasticSearch.filterController('category', 'desc', [
    decodedCategory,
  ]);
  console.log(data);
  return res.json(data);
});

module.exports = router;
