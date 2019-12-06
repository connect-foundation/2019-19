module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.STRING,
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
  User.associate = models => {
    User.hasMany(models.Myvideos, {
      foreignKey: 'fk_user_id',
      sourceKey: 'user_id',
    });
    User.hasMany(models.Like, {
      foreignKey: 'fk_user_id',
      sourceKey: 'user_id',
    });
  };
  return User;
};
