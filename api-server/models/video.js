module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      video_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      reg_date: {
        type: DataTypes.DATE(3),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
      thumbnail_img_url: {
        type: DataTypes.STRING,
      },
      thumbnail_video_url: {
        type: DataTypes.STRING,
      },
      streaming_url: {
        type: DataTypes.STRING,
      },
    },
    {
      // options???
      underscored: true,
      timestamps: false,
    },
  );
  Video.associate = models => {
    Video.hasMany(models.Myvideos, {
      foreignKey: 'fk_video_id',
      sourceKey: 'video_id',
    });
    Video.hasMany(models.Like, {
      foreignKey: 'fk_video_id',
      sourceKey: 'video_id',
    });
    Video.hasMany(models.Tag, {
      foreignKey: 'fk_video_id',
      sourceKey: 'video_id',
    });
  };
  Video.getAllVideos = async () => {
    const data = await Video.findAll();
    return data;
  };
  Video.getVideoNameById = async videoId => {
    const data = await Video.findAll({ where: { video_id: videoId } });
    return data;
  };
  Video.postVideo = async (name, category, url) => {
    Video.create({
      name,
      category,
      url,
    });
  };
  Video.getTopFivePopularVideos = async () => {
    const data = await Video.findAll({
      order: [['likes', 'DESC']],
      limit: 5,
    });
    return data;
  };
  Video.getRandomPopularVideo = async () => {
    const fivePopularVideos = await Video.getTopFivePopularVideos();
    const data =
      fivePopularVideos[Math.floor(Math.random() * fivePopularVideos.length)];
    return data;
  };
  Video.increaseLike = async videoId => {
    try {
      const data = await Video.increment('likes', {
        where: { video_id: videoId },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  Video.decreaseLike = async videoId => {
    try {
      const data = await Video.decrement('likes', {
        where: { video_id: videoId },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  Video.recommendationQuery = (userId, videoId) => {
    const queryStatement = `
      SELECT video_id, name, category, likes, reg_date,
      thumbnail_img_url, thumbnail_video_url, like_cnt
      FROM videos a,
      (
      SELECT fk_video_id, count(fk_video_id) AS "like_cnt"
      FROM likes
      WHERE fk_user_id IN(
          SELECT fk_user_id
          FROM likes
          WHERE fk_video_id='${videoId}'
          AND fk_user_id NOT IN ('${userId}')
      )
      GROUP BY fk_video_id
      ORDER BY like_cnt DESC
      ) b
      WHERE a.video_id = b.fk_video_id
      ORDER BY like_cnt DESC;`;
    return queryStatement;
  };
  return Video;
};
