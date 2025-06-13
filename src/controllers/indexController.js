const db = require('../db/queries');

const indexController = {
  index: async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('index', {
      title: 'Inventory App',
      categories: categories,
    });
  },
  getItemsByCategory: async (req, res) => {
    const category = req.params.category;
    const id = req.query.id;

    const items = await db.getItemsByCategory(id);
    res.render('items', { title: category, items: items });
  },
};

module.exports = indexController;
