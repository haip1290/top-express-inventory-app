const { Router } = require('express');
const itemController = require('../controllers/itemController');
const itemRoute = Router();

itemRoute.get('/add', itemController.createItemGet);
itemRoute.post('/add', itemController.createItemPost);
itemRoute.get('/:id/update', itemController.updateItemGet);
itemRoute.post('/:id/update', itemController.updateItemPost);
itemRoute.post('/:id/delete', itemController.deleteItemById);

module.exports = itemRoute;
