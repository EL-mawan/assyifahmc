import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

// GET all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM services ORDER BY display_order ASC, created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
});

// GET featured services
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM services WHERE is_featured = true ORDER BY display_order ASC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching featured services:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch featured services' });
  }
});

// GET single service by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM services WHERE slug = $1', [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch service' });
  }
});

// POST create service (admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, slug, description, short_description, icon, image_url, features, is_featured, display_order } = req.body;
    
    const result = await query(
      `INSERT INTO services (title, slug, description, short_description, icon, image_url, features, is_featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, slug, description, short_description, icon, image_url, features, is_featured || false, display_order || 0]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, error: 'Failed to create service' });
  }
});

// PUT update service (admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, slug, description, short_description, icon, image_url, features, is_featured, display_order } = req.body;
    
    const result = await query(
      `UPDATE services 
       SET title = $1, slug = $2, description = $3, short_description = $4, icon = $5, 
           image_url = $6, features = $7, is_featured = $8, display_order = $9
       WHERE id = $10 RETURNING *`,
      [title, slug, description, short_description, icon, image_url, features, is_featured, display_order, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, error: 'Failed to update service' });
  }
});

// DELETE service (admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, error: 'Failed to delete service' });
  }
});

export default router;
