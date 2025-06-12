const pool = require('./pool');
getAllCategories = async () => {
  const { rows } = pool.query('SELECT * FROM categories');
  return rows;
};

module.exports = { getAllCategories };
