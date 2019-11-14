module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('likes', {
      like_id: {
        allowNull: true,
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      fk_video_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: 'videos',
          key: 'video_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('likes');
  },
};
