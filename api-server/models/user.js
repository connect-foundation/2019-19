module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      // options???
      underscored: true,
      timestamps: false,
    },
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
