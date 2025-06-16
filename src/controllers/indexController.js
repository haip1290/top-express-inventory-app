const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters';
const numErr = 'must contain only numbers';
const lengthErr = 'must be between 1 to 20 characters';

const validateItem = [
  body('name')
    .trim()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage(`Item name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Item name ${lengthErr}`)
    .escape(),
  body('categoryId')
    .trim()
    .isNumeric()
    .withMessage(`Category ${numErr}`)
    .escape(),
  body('quantity').trim().isNumeric().withMessage(`Item quantity ${numErr}`),
  body('price').trim().isNumeric().withMessage(`Item price ${numErr}`).escape(),
];

const indexController = {
  index: asyncHandler(async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('index', {
      title: 'Inventory App',
      categories: categories,
    });
  }),
  getItemsByCategory: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const categoryName = req.query.name;

    const items = await db.getItemsByCategory(categoryId);
    res.render('items', {
      title: categoryName,
      categoryId: categoryId,
      items: items,
    });
  }),
  createItemGet: asyncHandler(async (req, res) => {
    const categories = await db.getAllCategories();
    return res.render('createItem', {
      title: 'Add Item',
      categories: categories,
    });
  }),
  createItemPost: [
    ...validateItem,
    asyncHandler(async (req, res) => {
      console.log('Creating Item ...');
      const { name, categoryId, price, quantity } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categories = await db.getAllCategories();
        return res.status(400).render('createItem', {
          title: 'Add Item',
          categories: categories,
          errors: errors.array(),
        });
      }

      await db.createItem({
        name,
        categoryId,
        price,
        quantity,
      });
      console.log('Done creating item');
      res.redirect(`/category/${categoryId}`);
    }),
  ],
  updateItemGet: asyncHandler(async (req, res) => {
    console.log('Fetching item to update ...');
    const item = await db.getItemById(req.params.id);
    const categories = await db.getAllCategories();
    console.log('Showing editing form');
    return res.render('updateItem', {
      title: 'Editing Item',
      categories: categories,
      item: item,
    });
  }),
  updateItemPost: [
    ...validateItem,
    asyncHandler(async (req, res) => {
      console.log('Updating Item ...');
      const id = req.params.id;
      const item = await db.getItemById(id);
      const { name, categoryId, price, quantity } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('updateItem', {
          title: 'Editing Item',
          item: item,
          errors: errors.array(),
        });
      }

      await db.updateItemById(id, { name, categoryId, price, quantity });
      console.log('Done updating item');
      return res.redirect(`/category/${item.category_id}`);
    }),
  ],
  deleteItemById: asyncHandler(async (req, res) => {
    const itemId = req.params.id;
    const categoryId = req.query.categoryId;
    await db.deleteItemById(itemId);
    return res.redirect(`/category/${categoryId}`);
  }),
};

module.exports = indexController;
