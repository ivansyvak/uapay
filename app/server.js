const path = require('path');

const express = require('express');

const router = require('./routes');
const apiRouter = require('./api.routes');

const app = express();

const staticPath = path.resolve(__dirname, '/app/static');
app.use('/static', express.static(staticPath));

app.use(router);
app.use('/api', apiRouter);

app.listen(3000);
