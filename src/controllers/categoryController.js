const asyncHandler = require('express-async-handler');
const categoryQueries = require('../db/categoryQueries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must contain only alphabet characters';
const lengthErr = 'must be between 1 to 10 characters';

const validateCategory = [
  body('name')
    .trim()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Name ${lengthErr}`)
    .escape(),
];

const categoryController = {
  index: asyncHandler(async (req, res) => {
    const categories = await categoryQueries.getAllCategories();
    res.render('index', {
      title: 'Inventory App',
      categories: categories,
    });
  }),
  createCategoryGet: asyncHandler(async (req, res) => {
    console.log('Show add new category form');
    return res.render('createCategory', { title: 'Create category' });
  }),
  createCategoryPost: [
    ...validateCategory,
    asyncHandler(async (req, res) => {
      console.log('Validating create category DTO');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('createCategory', {
          title: 'Create category',
          errors: errors.array(),
        });
      }
      console.log('Begin creating new category');
      const { name } = req.body;
      await categoryQueries.createCategory({ name });
      return res.redirect('/');
    }),
  ],
};

module.exports = categoryController;
