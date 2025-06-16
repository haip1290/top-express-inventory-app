const pool = require('./pool');

const getItemById = async (id) => {
  console.log('Query item with id', id);
  try {
    const { rows } = await pool.query('SELECT * FROM items WHERE id=$1', [id]);
    console.log('found item', rows);
    return rows[0];
  } catch (err) {
    console.log('Error getting item', err);
    throw err;
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

const createItem = async ({ name, categoryId, price, quantity }) => {
  try {
    await pool.query(
      'INSERT INTO items (name, category_id, price, quantity) VALUES ($1, $2, $3, $4)',
      [name, categoryId, price, quantity],
    );
  } catch (error) {
    console.log('Error create item', error);
    throw error;
  }
};

const updateItemById = async (id, { name, categoryId, price, quantity }) => {
  console.log('Updating item in db with info', id, {
    name,
    categoryId,
    price,
    quantity,
  });
  try {
    const { rowCount } = await pool.query(
      'Update items set name = $1, category_id = $2, price = $3, quantity = $4 where id = $5',
      [name, categoryId, price, quantity, id],
    );
    console.log(`update ${rowCount} result:`);
  } catch (err) {
    console.log('Error updating item', err);
    throw err;
  }
};

const deleteItemById = async (id) => {
  console.log('Deleting item with id', id);
  try {
    const { rowCount } = await pool.query('DELETE FROM items WHERE id = $1', [
      id,
    ]);
    console.log(`deleted ${rowCount} item`);
  } catch (err) {
    console.log('Error deleting item', err);
    throw err;
  }
};

module.exports = {
  getItemsByCategory,
  createItem,
  updateItemById,
  getItemById,
  deleteItemById,
};
