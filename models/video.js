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
      url: DataTypes.STRING,
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
  Video.getRandomPopularVideo = async () => {
    const data = await Video.findAll({
      order: ['likes', 'DESC'],
    });
    return data;
  };
};
