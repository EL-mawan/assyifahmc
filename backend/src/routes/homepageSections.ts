import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM homepage_sections ORDER BY section_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch homepage sections' });
  }
});

router.get('/visible', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM homepage_sections WHERE is_visible = true ORDER BY section_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch visible sections' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { section_type, section_title, section_subtitle, section_content, section_order, is_visible, background_color, text_color, custom_css } = req.body;
    const result = await query(
      `INSERT INTO homepage_sections (section_type, section_title, section_subtitle, section_content, section_order, is_visible, background_color, text_color, custom_css)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [section_type, section_title, section_subtitle, section_content, section_order || 0, is_visible !== false, background_color, text_color, custom_css]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create section' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { section_title, section_subtitle, section_content, section_order, is_visible, background_color, text_color, custom_css } = req.body;
    const result = await query(
      `UPDATE homepage_sections SET section_title = $1, section_subtitle = $2, section_content = $3, 
       section_order = $4, is_visible = $5, background_color = $6, text_color = $7, custom_css = $8
       WHERE id = $9 RETURNING *`,
      [section_title, section_subtitle, section_content, section_order, is_visible, background_color, text_color, custom_css, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Section not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update section' });
  }
});

router.put('/reorder', async (req: Request, res: Response) => {
  try {
    const { sections } = req.body; // Array of { id, section_order }
    
    for (const section of sections) {
      await query('UPDATE homepage_sections SET section_order = $1 WHERE id = $2', [section.section_order, section.id]);
    }
    
    res.json({ success: true, message: 'Sections reordered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to reorder sections' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM homepage_sections WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Section not found' });
    res.json({ success: true, message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete section' });
  }
});

export default router;
