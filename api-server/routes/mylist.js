const express = require('express');
const { Myvideos } = require('../models');
const { Video } = require('../models');

const router = express.Router();

router.post('/mylist-video', async (req, res) => {
  const reqData = req.body.params;
  const { userId } = reqData;
  const { videoId } = reqData;
  const data = await Myvideos.registerMyVideo(userId, videoId);
  return res.json(data);
});

router.post('/unMylist-video', async (req, res) => {
  const reqData = req.body.params;
  const { userId } = reqData;
  const { videoId } = reqData;
  const data = await Myvideos.deregisterMyVideo(userId, videoId);
  return res.json(data);
});

router.post('/my-videos', async (req, res) => {
  Myvideos.findAll({
    where: { fk_user_id: req.body.id },
    include: [Video],
  }).then(rawData => {
    const resultData = rawData.map(data => data.dataValues.Video);
    return res.json(resultData);
  });
});

module.exports = router;
