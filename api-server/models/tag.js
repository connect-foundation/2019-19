module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      tag_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(11),
      },
      fk_video_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // options???
      underscored: true,
      timestamps: false,
    },
  );
  Tag.associate = models => {
    Tag.belongsTo(models.Video, {
      foreignKey: 'fk_video_id',
      targetKey: 'video_id',
    });
  };
  Tag.postTag = (fk_video_id, name) => {
    Tag.create({
      fk_video_id,
      name,
    });
  };
  return Tag;
};
