const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRoute = Router();

indexRoute.get('/', indexController.index);
indexRoute.get('/category/:id', indexController.getItemsByCategory);
indexRoute.post('/category/:id/add', indexController.createItem);

module.exports = indexRoute;
