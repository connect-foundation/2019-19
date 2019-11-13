module.exports = (sequelize, DataTypes) => {
  const MyList = sequelize.define(
    'MyList',
    {
      mylist_id: {
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
  MyList.associate = function(models) {
    // associations can be defined here
  };
  return MyList;
};
