const express = require('express');
const { Like, Video } = require('../models');

const router = express.Router();

router.get('/like-video', async (req, res) => {
  const data = await Like.registerLike();
  const data2 = await Video.increaseLike();
  return res.json(data, data2);
});

router.get('/unlike-video', async (req, res) => {
  const data = await Like.deregisterLike();
  const data2 = await Video.decreaseLike();
  return res.json(data, data2);
});

module.exports = router;
