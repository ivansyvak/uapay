const express = require('express');
const apiRouter = express.Router();

const apiController = require('./controllers/api');

apiRouter.get('/checkoutECOM', apiController.checkoutECOM);
apiRouter.get('/checkoutP2P', apiController.checkoutP2P);

module.exports = apiRouter;
