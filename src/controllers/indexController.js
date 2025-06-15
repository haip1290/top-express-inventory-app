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
    const category = await db.getCategoryNameById(categoryId);

    const items = await db.getItemsByCategory(categoryId);
    res.render('items', {
      categoryName: category.name,
      categoryId: categoryId,
      items: items,
    });
  }),
  createItem: [
    ...validateItem,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const itemDTO = req.body;
      itemDTO.categoryId = +itemDTO.categoryId;
      console.log('item: ', itemDTO);
      const addedItem = await db.createItem(itemDTO);
      console.log('created: ', addedItem);
      const category = await db.getCategoryNameById(itemDTO.categoryId);
      res.redirect(`/category/${category.id}`);
    }),
  ],
};

module.exports = indexController;
