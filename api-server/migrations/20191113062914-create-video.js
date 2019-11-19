module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos', {
      video_id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      reg_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      thumbnail_img_url: {
        type: Sequelize.STRING,
      },
      thumbnai_video_url: {
        type: Sequelize.STRING,
      },
      streaming_url: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  },
};
