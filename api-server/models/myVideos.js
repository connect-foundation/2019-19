module.exports = (sequelize, DataTypes) => {
  const Myvideos = sequelize.define(
    'Myvideos',
    {
      my_video_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      fk_user_id: DataTypes.STRING,
      fk_video_id: DataTypes.INTEGER,
    },
    {
      underscored: false,
      timestamps: false,
    },
  );
  Myvideos.associate = models => {
    Myvideos.belongsTo(models.User, {
      foreignKey: 'fk_user_id',
      targetKey: 'user_id',
    });
    Myvideos.belongsTo(models.Video, {
      foreignKey: 'fk_video_id',
      targetKey: 'video_id',
    });
  };
  Myvideos.registerMyVideo = async (userId, videoId) => {
    const done = await Myvideos.create({
      fk_user_id: userId,
      fk_video_id: videoId,
    });
    return done;
  };
  Myvideos.deregisterMyVideo = async (userId, videoId) => {
    const data = await Myvideos.destroy({
      where: {
        fk_user_id: userId,
        fk_video_id: videoId,
      },
    });
    return data;
  };
  Myvideos.didUserZzim = async (userId, videoId) => {
    const data = await Myvideos.findOne({
      where: {
        fk_user_id: userId,
        fk_video_id: videoId,
      },
    });
    if (data) return data.dataValues;
    return null;
  };
  return Myvideos;
};
