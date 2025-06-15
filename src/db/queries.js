const pool = require('./pool');

const getAllCategories = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories;');
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
    }));
  } catch (error) {
    console.log('Error querying categories', error);
    throw error;
  }
};

const getItemsByCategory = async (categoryId) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM items WHERE category_id=$1;',
      [categoryId],
    );
    return rows;
  } catch (err) {
    console.log('Error querying items by categories', err);
    throw err;
  }
};

const createItem = async (item) => {
  try {
    const { name, categoryId, price, quantity } = item;
    const { rows } = await pool.query(
      'INSERT INTO items (name, category_id, price, quantity) VALUES ($1, $2, $3, $4)',
      [name, categoryId, price, quantity],
    );
    return rows;
  } catch (error) {
    console.log('Error create item', error);
    throw error;
  }
};

const getCategoryNameById = async (id) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id],
    );
    console.log('query category', rows);
    return rows[0];
  } catch (err) {
    console.log('Error getting category', err);
    throw err;
  }
};

module.exports = {
  getAllCategories,
  getItemsByCategory,
  createItem,
  getCategoryNameById,
};
