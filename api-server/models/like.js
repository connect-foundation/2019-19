module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      like_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fk_video_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    },
  );
  Like.associate = models => {
    Like.belongsTo(models.User, {
      foreignKey: 'fk_user_id',
      targetKey: 'user_id',
    });
    Like.belongsTo(models.Video, {
      foreignKey: 'fk_video_id',
      targetKey: 'video_id',
    });
  };
  Like.didUserLiked = async (userId, videoId) => {
    const data = await Like.findOne({
      where: {
        fk_user_id: userId,
        fk_video_id: videoId,
      },
    });
    if (data) return data.dataValues;
    return null;
  };
  Like.registerLike = async (userId, videoId) => {
    const [_user, created] = await Like.findOrCreate({
      where: { fk_user_id: userId, fk_video_id: videoId },
      defaults: {
        fk_user_id: userId,
        fk_video_id: videoId,
      },
    });
    return created;
  };
  Like.deregisterLike = async (userId, videoId) => {
    const data = await Like.destroy({
      where: {
        fk_user_id: userId,
        fk_video_id: videoId,
      },
    });
    return data;
  };
  return Like;
};
