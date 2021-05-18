const express = require('express');
const apiRouter = express.Router();

const apiController = require('./controllers/api');

apiRouter.get('/checkout', apiController.checkout);

module.exports = apiRouter;
