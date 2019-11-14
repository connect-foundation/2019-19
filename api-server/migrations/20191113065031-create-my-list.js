module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MyVideos', {
      my_video_id: {
        allowNull: false,
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      fk_video_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: 'Videos',
          key: 'video_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MyLists');
  },
};
