module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      tag_id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fk_video_id: {
        type: Sequelize.STRING,
        references: {
          model: 'videos',
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
    return queryInterface.dropTable('tags');
  },
};
