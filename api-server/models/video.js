module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      video_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      thumbnai_video_url: {
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
    Video.hasMany(models.MyVideo, {
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
  Video.getTenPopularVideos = async () => {
    const data = await Video.findAll({
      order: [['likes', 'DESC']],
      limit: 10,
    });
    return data;
  };
  Video.getRandomPopularVideo = async () => {
    tenPopularVideos = await Video.getTenPopularVideos();
    const data =
      tenPopularVideos[Math.floor(Math.random() * tenPopularVideos.length)];
    return data;
  };
  return Video;
};
