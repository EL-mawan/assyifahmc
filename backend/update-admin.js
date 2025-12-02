const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'sayla_mc',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function updateAdmin() {
  try {
    const result = await pool.query(
      `UPDATE admin_users 
       SET username = $1, email = $2, password_hash = $3, full_name = $4 
       WHERE id = 1 
       RETURNING *`,
      ['assyifah', 'assyifah@mc.com', '$2a$10$sHbx502lyhGFvCbzkhYhz..yzx7mXPRSnJh5uYE1V9Yq2cJbg9Eiu', 'Assyifah MC Admin']
    );
    
    console.log('✅ Admin user updated successfully:');
    console.log('Email:', result.rows[0].email);
    console.log('Username:', result.rows[0].username);
    console.log('Full Name:', result.rows[0].full_name);
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error updating admin:', error);
    await pool.end();
    process.exit(1);
  }
}

updateAdmin();
