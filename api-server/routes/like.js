const express = require('express');
const { Like } = require('../models');

const router = express.Router();

router.get('/like-video', async (req, res) => {
  const data = await Like.registerLike();
  return res.json(data);
});

router.get('/dislike-video', async (req, res) => {
  const data = await Like.deregisterLike();
  return res.json(data);
});

module.exports = router;
