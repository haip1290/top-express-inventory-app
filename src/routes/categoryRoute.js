const { Router } = require('express');
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');
const categoryRoute = Router();

categoryRoute.get('/create', categoryController.createCategoryGet);
categoryRoute.post('/create', categoryController.createCategoryPost);
categoryRoute.get('/:id/update', categoryController.updateCategoryGet);
categoryRoute.post('/:id/update', categoryController.updateCategoryPost);
categoryRoute.post('/:id/delete', categoryController.deleteCategoryById);
categoryRoute.get('/:id', itemController.getItemsByCategory);

module.exports = categoryRoute;
