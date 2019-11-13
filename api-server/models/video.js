module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      video_id: {
        type: DataTypes.BIGINT(11),
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
  Video.associate = function(models) {
    // associations can be defined here
  };
  return Video;
};
