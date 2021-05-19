const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

router.get('/redirect', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/redirect.html'));
});

module.exports = router;
