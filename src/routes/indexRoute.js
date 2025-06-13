const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRoute = Router();

indexRoute.get('/', indexController.index);
indexRoute.get('/:category', indexController.getItemsByCategory);

module.exports = indexRoute;
