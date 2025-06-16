const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const indexRoute = Router();

indexRoute.get('/', categoryController.index);

module.exports = indexRoute;
