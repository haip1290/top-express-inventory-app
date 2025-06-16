const { Router } = require('express');
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');
const categoryRoute = Router();

categoryRoute.get('/create', categoryController.createCategoryGet);
categoryRoute.post('/create', categoryController.createCategoryPost);
categoryRoute.post('/delete/:id', categoryController.deleteCategoryById);
categoryRoute.get('/:id', itemController.getItemsByCategory);

module.exports = categoryRoute;
