const pool = require('./pool');

getAllCategories = async () => {
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

getItemsByCategory = async (categoryId) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM items WHERE category_id=$1;',
      [categoryId],
    );
    return rows;
  } catch (err) {
    console.log('Error querying items by categories', err);
  }
};

module.exports = { getAllCategories, getItemsByCategory };
