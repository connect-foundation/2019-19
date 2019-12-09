const casual = require('casual');

const demoData = [];
for (let i = 0; i < 15; i += 1) {
  const myVideoObj = {
    my_video_id: null,
    fk_user_id: '109077139045642010735',
    fk_video_id: casual.integer(820, 1000),
  };

  demoData.push(myVideoObj);
}

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Myvideos', demoData, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Myvideos', null, {});
  },
};
