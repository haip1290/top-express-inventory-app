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

const getCategoryNameById = async (id) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id],
    );
    return rows[0];
  } catch (err) {
    console.log('Error getting category', err);
    throw err;
  }
};

const createCategory = async ({ name }) => {
  try {
    await pool.query('insert into categories (name) values ($1) ', [name]);
  } catch (err) {
    console.log('Error creating Category', err);
    throw err;
  }
};

const deletingCategoryById = async (id) => {
  try {
    console.log('Start query to delete category', id);
    const { rowCount } = await pool.query(
      'DELETE FROM categories WHERE id = $1',
      [id],
    );
    console.log(`Deleted ${rowCount} category from db`);
  } catch (err) {
    if (err.code === '23503') {
      console.log(`Foreign key violation for category ID ${id}`);
      throw err;
    } else {
      console.log('Error deleting Category', err, id);
      throw err;
    }
  }
};

module.exports = {
  getAllCategories,
  getCategoryNameById,
  createCategory,
  deletingCategoryById,
};
