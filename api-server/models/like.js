module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      like_id: {
        allowNull: false,
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
      },
      fk_video_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
      },
    },
    {
      // options???
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
  return Like;
};
