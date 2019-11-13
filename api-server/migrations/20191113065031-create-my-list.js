module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MyLists', {
      mylist_id: {
        allowNull: false,
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
      },
      video_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MyLists');
  },
};
