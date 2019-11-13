module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tags', {
      tag_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(11),
      },
      fk_video_id: {
        type: Sequelize.BIGINT(11),
        references: {
          model: 'Videos',
          key: 'video_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      name: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tags');
  },
};
