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
    const data = await Video.increment('likes', {
      where: { video_id: videoId },
    });
    return data;
  };
  Video.decreaseLike = async videoId => {
    const data = await Video.decrement('likes', {
      where: { video_id: videoId },
    });
    return data;
  };
  return Video;
};
