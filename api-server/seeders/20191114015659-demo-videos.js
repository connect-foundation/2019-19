const data = require('../../crawler/tagJson/file11.json');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('tags', data, {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
