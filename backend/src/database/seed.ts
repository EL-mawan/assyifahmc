import fs from 'fs';
import path from 'path';
import { pool } from '../config/database';

const seed = async () => {
  try {
    console.log('⏳ Starting seeding...');
    
    const seedPath = path.join(__dirname, '../../database/seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    await pool.query(seedSql);
    
    console.log('✅ Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
