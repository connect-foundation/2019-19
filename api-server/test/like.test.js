const { Like } = require('../models');
const { Video } = require('../models');

const uid = '109077139045642010735';
const vid = 221;

const registerLike = async (userId, videoId) => {
  const created = await Like.registerLike(userId, videoId);
  const done = created
    ? await Video.increaseLike(videoId)
    : await Video.decreaseLike(videoId);
  console.log(done);
  return done;
};

const deregisterLike = async (userId, videoId) => {
  const data = await Like.deregisterLike(userId, videoId);
  console.log(data);
  return data;
};

const didUserLiked = async (userId, videoId) => {
  const userLiked = await Like.didUserLiked(userId, videoId);
  console.log(userLiked);
  return userLiked;
};

// deregisterLike(uid, vid);
didUserLiked(uid, vid);
