module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      like_id: {
        allowNull: false,
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
      },
      fk_video_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  },
};
