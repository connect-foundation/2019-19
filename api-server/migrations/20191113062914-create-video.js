module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos', {
      video_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
      thumbnail_video_url: {
        type: Sequelize.STRING,
      },
      streaming_url: {
        type: Sequelize.STRING,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('videos');
  },
};
