import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM gallery_images';
    const params: any[] = [];
    
    if (category) {
      sql += ' WHERE category = $1';
      params.push(category);
    }
    
    sql += ' ORDER BY display_order ASC, created_at DESC';
    
    const result = await query(sql, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch gallery' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, image_url, thumbnail_url, category, description, display_order } = req.body;
    const result = await query(
      `INSERT INTO gallery_images (title, image_url, thumbnail_url, category, description, display_order)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, image_url, thumbnail_url, category, description, display_order || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create gallery image' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM gallery_images WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Gallery image not found' });
    res.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete gallery image' });
  }
});

export default router;
