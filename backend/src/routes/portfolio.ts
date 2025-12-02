import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM portfolio_items ORDER BY display_order ASC, created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio' });
  }
});

router.get('/featured', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM portfolio_items WHERE is_featured = true ORDER BY display_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch featured portfolio' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM portfolio_items WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Portfolio not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, slug, event_type, event_date, client_name, description, image_url, gallery_images, video_url, is_featured, display_order } = req.body;
    const result = await query(
      `INSERT INTO portfolio_items (title, slug, event_type, event_date, client_name, description, image_url, gallery_images, video_url, is_featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, slug, event_type, event_date, client_name, description, image_url, gallery_images, video_url, is_featured || false, display_order || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create portfolio' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, slug, event_type, event_date, client_name, description, image_url, gallery_images, video_url, is_featured, display_order } = req.body;
    const result = await query(
      `UPDATE portfolio_items SET title = $1, slug = $2, event_type = $3, event_date = $4, client_name = $5, 
       description = $6, image_url = $7, gallery_images = $8, video_url = $9, is_featured = $10, display_order = $11
       WHERE id = $12 RETURNING *`,
      [title, slug, event_type, event_date, client_name, description, image_url, gallery_images, video_url, is_featured, display_order, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Portfolio not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update portfolio' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM portfolio_items WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Portfolio not found' });
    res.json({ success: true, message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete portfolio' });
  }
});

export default router;
