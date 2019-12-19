const express = require('express');
const { Like, Video } = require('../models');

const router = express.Router();

router.post('/like-video', async (req, res) => {
  const reqData = req.body.params;
  const { userId } = reqData;
  const { videoId } = reqData;
  const data = await Like.registerLike(userId, videoId);
  const data2 = await Video.increaseLike(videoId);
  return res.json({ data, data2 });
});

router.post('/unlike-video', async (req, res) => {
  const reqData = req.body.params;
  const { userId } = reqData;
  const { videoId } = reqData;
  const data = await Like.deregisterLike(userId, videoId);
  const data2 = await Video.decreaseLike(videoId);
  return res.json({ data, data2 });
});

router.post('/isLiked', async (req, res) => {
  const reqData = req.body.params;
  const { userId } = reqData;
  const { videoId } = reqData;
  const data = await Like.didUserLiked(userId, videoId);
  const likesData = await Video.findAll({
    attributes: ['likes'],
    where: { video_id: videoId },
  });
  const result = Object.assign({}, data, likesData);
  //   if (!data) return res.json({});
  return res.json(result);
});

module.exports = router;
