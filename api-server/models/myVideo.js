module.exports = (sequelize, DataTypes) => {
  const MyVideo = sequelize.define(
    'MyVideo',
    {
      myVideo_id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
      },
      fk_user_id: DataTypes.BIGINT(11),
      fk_video_id: DataTypes.BIGINT(11),
    },
    {
      // options???
      underscored: true,
      timestamps: false,
    },
  );
  MyVideo.associate = models => {
    MyVideo.belongsTo(models.User, {
      foreignKey: 'fk_user_id',
      targetKey: 'user_id',
    });
    MyVideo.belongsTo(models.Video, {
      foreignKey: 'fk_video_id',
      targetKey: 'video_id',
    });
  };
  return MyVideo;
};
