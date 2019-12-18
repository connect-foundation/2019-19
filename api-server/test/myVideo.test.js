const { Myvideos } = require('../models');
const { Video } = require('../models');

const uid = '109077139045642010735';
const vid = 6;

const registerMyVideo = async (userId, videoId) => {
  const created = await Myvideos.registerMyVideo(userId, videoId);
  return created;
};

const deregisterMyVideo = async (userId, videoId) => {
  const created = await Myvideos.deregisterMyVideo(userId, videoId);
  return created;
};
