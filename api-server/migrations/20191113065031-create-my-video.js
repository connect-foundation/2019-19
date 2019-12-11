module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Myvideos', {
      my_video_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      fk_video_id: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Myvideos');
  },
};
