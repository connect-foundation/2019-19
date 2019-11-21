const express = require('express');
const { Video } = require('../models');

const router = express.Router();

router.get('/five-random-popular-videos', async (req, res) => {
  const data = await Video.getTopFivePopularVideos();
  return res.json(data);
});

router.get('/main-thumbnail-video', async (req, res) => {
  const data = await Video.getRandomPopularVideo();
  return res.json(data);
});

module.exports = router;
