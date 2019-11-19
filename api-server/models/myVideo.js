module.exports = (sequelize, DataTypes) => {
  const MyVideo = sequelize.define(
    'MyVideo',
    {
      myVideo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      fk_user_id: DataTypes.INTEGER,
      fk_video_id: DataTypes.INTEGER,
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
