const { Client } = require('pg');

const CONNECTION_STRING =
  'postgresql://hai:5Anhemsieunhan@localhost:5432/inventory_app';

const itemsToInsert = [
  {
    name: 'Longsword',
    category_id: 1,
    price: 150.0,
    quantity: 10,
  },
  {
    name: 'Battle Axe',
    category_id: 1,
    price: 120.0,
    quantity: 8,
  },
  {
    name: 'Short Bow',
    category_id: 1,
    price: 80.0,
    quantity: 15,
  },
  {
    name: 'Dagger of Swiftness',
    category_id: 1,
    price: 60.0,
    quantity: 20,
  },
  {
    name: 'Magic Staff',
    category_id: 1,
    price: 200.0,
    quantity: 5,
  },

  {
    name: 'Plate Chestguard',
    category_id: 2,
    price: 300.0,
    quantity: 7,
  },
  {
    name: 'Leather Vest',
    category_id: 2,
    price: 75.0,
    quantity: 12,
  },
  {
    name: 'Steel Gauntlets',
    category_id: 2,
    price: 90.0,
    quantity: 10,
  },
  {
    name: 'Kite Shield',
    category_id: 2,
    price: 110.0,
    quantity: 9,
  },
  {
    name: 'Elven Cloak',
    category_id: 2,
    price: 50.0,
    quantity: 18,
  },
  {
    name: 'Full Plate Helmet',
    category_id: 3,
    price: 180.0,
    quantity: 6,
  },
  {
    name: 'Leather Coif',
    category_id: 3,
    price: 40.0,
    quantity: 15,
  },
  {
    name: 'Royal Crown',
    category_id: 3,
    price: 500.0,
    quantity: 3,
  },
  {
    name: 'Mage Hood',
    category_id: 3,
    price: 70.0,
    quantity: 11,
  },
  {
    name: 'Spiked Helm',
    category_id: 3,
    price: 130.0,
    quantity: 8,
  },
  {
    name: 'Ring of Strength',
    category_id: 4,
    price: 250.0,
    quantity: 10,
  },
  {
    name: 'Amulet of Protection',
    category_id: 4,
    price: 200.0,
    quantity: 9,
  },
  {
    name: 'Sapphire Necklace',
    category_id: 4,
    price: 300.0,
    quantity: 7,
  },
  {
    name: 'Bracelet of Dexterity',
    category_id: 4,
    price: 180.0,
    quantity: 12,
  },
  {
    name: 'Ruby Earrings',
    category_id: 4,
    price: 160.0,
    quantity: 14,
  },
  {
    name: 'Leather Boots',
    category_id: 5,
    price: 80.0,
    quantity: 18,
  },
  {
    name: 'Plate Boots',
    category_id: 5,
    price: 150.0,
    quantity: 9,
  },
  {
    name: 'Swift Boots',
    category_id: 5,
    price: 110.0,
    quantity: 13,
  },
  {
    name: 'Traveler Boots',
    category_id: 5,
    price: 60.0,
    quantity: 25,
  },
  {
    name: 'Enchanted Boots',
    category_id: 5,
    price: 220.0,
    quantity: 6,
  },
];

async function seedItems() {
  console.log('Start seeding...');
  const client = new Client({
    connectionString: CONNECTION_STRING,
  });
  try {
    await client.connect();
    console.log('Database connected successfully.');

    // 1. Fetch categories to get their IDs
    console.log('Fetching existing categories...');
    const { rows: categories } = await client.query(
      'SELECT id, name FROM categories ORDER BY id;',
    );
    console.log('Categories found:', categories);

    if (categories.length === 0) {
      console.warn(
        'No categories found. Please ensure categories are populated before running this script.',
      );
      return; // Exit if no categories exist
    }

    // 3. Insert items into the database
    console.log('Inserting items...');
    for (const item of itemsToInsert) {
      const insertQuery = `
                INSERT INTO Items (name, category_id, price, quantity)
                VALUES ($1, $2, $3, $4);
            `;
      const values = [item.name, item.category_id, item.price, item.quantity];
      await client.query(insertQuery, values);
      console.log(`Inserted: ${item.name} (Category ID: ${item.category_id})`);
    }

    console.log('Item seeding completed successfully.');
  } catch (err) {
    console.error('Error during item seeding:', err);
  } finally {
    await client.end();
    console.log('done');
  }
}

seedItems();
