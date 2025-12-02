import express, { Request, Response } from 'express';
import { query } from '../config/database';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    let sql = 'SELECT * FROM bookings';
    const params: any[] = [];
    
    if (status) {
      sql += ' WHERE status = $1';
      params.push(status);
    }
    
    sql += ' ORDER BY event_date DESC, created_at DESC';
    
    const result = await query(sql, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM bookings WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch booking' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone, whatsapp, event_type, event_date, event_time, event_location, package_id, guest_count, message } = req.body;
    const result = await query(
      `INSERT INTO bookings (full_name, email, phone, whatsapp, event_type, event_date, event_time, event_location, package_id, guest_count, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending') RETURNING *`,
      [full_name, email, phone, whatsapp, event_type, event_date, event_time, event_location, package_id, guest_count, message]
    );
    res.status(201).json({ success: true, data: result.rows[0], message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create booking' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    const result = await query(
      'UPDATE bookings SET status = $1, notes = $2 WHERE id = $3 RETURNING *',
      [status, notes, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update booking' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('DELETE FROM bookings WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete booking' });
  }
});

export default router;
