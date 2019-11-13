module.exports = (sequelize, DataTypes) => {
  const MyList = sequelize.define(
    'MyList',
    {
      mylist_id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
      },
      user_id: DataTypes.BIGINT(11),
      video_id: DataTypes.BIGINT(11),
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
