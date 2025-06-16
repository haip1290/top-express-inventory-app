const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRoute = Router();

indexRoute.get('/', indexController.index);
indexRoute.get('/category/:id', indexController.getItemsByCategory);
indexRoute.get('/item/add', indexController.createItemGet);
indexRoute.post('/item/add', indexController.createItemPost);
indexRoute.get('/item/:id/update', indexController.updateItemGet);
indexRoute.post('/item/:id/update', indexController.updateItemPost);

module.exports = indexRoute;
