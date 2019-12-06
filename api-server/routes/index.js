const express = require('express');

const router = express.Router();
const ElasticSearch = require('../elastic-server/src/controller/ElasticSearchController');

router.get('/', (req, res) => {
  return res.send('express on 8000');
});

router.get('/test', async (req, res) => {
  const data = await ElasticSearch.filterController('category', 'desc', [
    '스포츠',
  ]);
  console.dir(typeof data);
  return res.json(data);
});

module.exports = router;
