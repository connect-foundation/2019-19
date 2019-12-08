const data = require('../../crawler/infoJson/file0.json');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('videos', data, {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('videos', null, {});
  },
};
