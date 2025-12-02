import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM site_settings LIMIT 1');
    res.json({ success: true, data: result.rows[0] || {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch site settings' });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const {
      site_name, site_tagline, site_description,
      contact_email, contact_phone, contact_whatsapp, contact_address,
      social_facebook, social_instagram, social_twitter, social_youtube,
      logo_url, favicon_url
    } = req.body;
    
    // Check if settings exist
    const existing = await query('SELECT id FROM site_settings LIMIT 1');
    
    let result;
    if (existing.rows.length === 0) {
      // Insert new settings
      result = await query(
        `INSERT INTO site_settings (site_name, site_tagline, site_description, contact_email, contact_phone, contact_whatsapp, contact_address, social_facebook, social_instagram, social_twitter, social_youtube, logo_url, favicon_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [site_name, site_tagline, site_description, contact_email, contact_phone, contact_whatsapp, contact_address, social_facebook, social_instagram, social_twitter, social_youtube, logo_url, favicon_url]
      );
    } else {
      // Update existing settings
      result = await query(
        `UPDATE site_settings SET site_name = $1, site_tagline = $2, site_description = $3, contact_email = $4, contact_phone = $5, contact_whatsapp = $6, contact_address = $7, social_facebook = $8, social_instagram = $9, social_twitter = $10, social_youtube = $11, logo_url = $12, favicon_url = $13
         WHERE id = $14 RETURNING *`,
        [site_name, site_tagline, site_description, contact_email, contact_phone, contact_whatsapp, contact_address, social_facebook, social_instagram, social_twitter, social_youtube, logo_url, favicon_url, existing.rows[0].id]
      );
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update site settings' });
  }
});

export default router;
