const express = require('express');
const app = require('../server');
const catalogoRouter = require('./catalogo');
const apiRouter = express.Router();

apiRouter.use('/catalogo', catalogoRouter);

module.exports = apiRouter;