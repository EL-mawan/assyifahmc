import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
  }
});

router.get('/featured', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM testimonials WHERE is_featured = true ORDER BY display_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch featured testimonials' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { client_name, client_position, client_company, client_photo_url, testimonial_text, rating, event_type, event_date, is_featured, display_order } = req.body;
    const result = await query(
      `INSERT INTO testimonials (client_name, client_position, client_company, client_photo_url, testimonial_text, rating, event_type, event_date, is_featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [client_name, client_position, client_company, client_photo_url, testimonial_text, rating, event_type, event_date, is_featured || false, display_order || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create testimonial' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { client_name, client_position, client_company, client_photo_url, testimonial_text, rating, event_type, event_date, is_featured, display_order } = req.body;
    const result = await query(
      `UPDATE testimonials SET client_name = $1, client_position = $2, client_company = $3, client_photo_url = $4, 
       testimonial_text = $5, rating = $6, event_type = $7, event_date = $8, is_featured = $9, display_order = $10
       WHERE id = $11 RETURNING *`,
      [client_name, client_position, client_company, client_photo_url, testimonial_text, rating, event_type, event_date, is_featured, display_order, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update testimonial' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete testimonial' });
  }
});

export default router;
