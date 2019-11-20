const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  return res.send('express on 8000');
});

router.get('/test', (req, res) => {
  return res.json({ msg: 'hello' });
});

module.exports = router;