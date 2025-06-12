const db = require('../db/queries');

const indexController = {
  index: async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('index', { title: 'Inventory App' });
  },
};

module.exports = indexController;
