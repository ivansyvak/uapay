const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

module.exports = router;
