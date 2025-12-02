import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

// GET all packages
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM packages ORDER BY display_order ASC, created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch packages' });
  }
});

// GET featured packages
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM packages WHERE is_featured = true ORDER BY display_order ASC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch featured packages' });
  }
});

// GET single package by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM packages WHERE slug = $1', [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch package' });
  }
});

// POST create package (admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, duration, features, is_popular, is_featured, display_order } = req.body;
    
    const result = await query(
      `INSERT INTO packages (name, slug, description, price, duration, features, is_popular, is_featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, slug, description, price, duration, features, is_popular || false, is_featured || false, display_order || 0]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ success: false, error: 'Failed to create package' });
  }
});

// PUT update package (admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, duration, features, is_popular, is_featured, display_order } = req.body;
    
    const result = await query(
      `UPDATE packages 
       SET name = $1, slug = $2, description = $3, price = $4, duration = $5, 
           features = $6, is_popular = $7, is_featured = $8, display_order = $9
       WHERE id = $10 RETURNING *`,
      [name, slug, description, price, duration, features, is_popular, is_featured, display_order, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ success: false, error: 'Failed to update package' });
  }
});

// DELETE package (admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM packages WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }
    
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ success: false, error: 'Failed to delete package' });
  }
});

export default router;
