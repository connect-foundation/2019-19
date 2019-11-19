const express = require('express');
const { Video } = require('../models');

const router = express.Router();

router.get('/ten-random-popular-videos', async (req, res) => {
  const data = await Video.getTenPopularVideos();
  return res.json(data);
});

router.get('/main-thumbnail-video', async (req, res) => {
  const data = await Video.getRandomPopularVideo();
  return res.json(data);
});

module.exports = router;
