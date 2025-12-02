import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';

const router = express.Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const result = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_super_secret_jwt_key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Register (for initial setup)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, full_name } = req.body;
    
    // Check if user already exists
    const existing = await query('SELECT id FROM admin_users WHERE username = $1 OR email = $2', [username, email]);
    
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    const password_hash = await bcrypt.hash(password, 10);
    
    const result = await query(
      'INSERT INTO admin_users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING id, username, email, full_name',
      [username, email, password_hash, full_name]
    );
    
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Get current user (requires authentication)
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key');
    const result = await query('SELECT id, username, email, full_name FROM admin_users WHERE id = $1', [decoded.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// Get dashboard stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const bookingsCount = await query('SELECT COUNT(*) FROM bookings');
    const servicesCount = await query('SELECT COUNT(*) FROM services');
    const packagesCount = await query('SELECT COUNT(*) FROM packages');
    const portfolioCount = await query('SELECT COUNT(*) FROM portfolio_items');
    const galleryCount = await query('SELECT COUNT(*) FROM gallery_images');
    const testimonialsCount = await query('SELECT COUNT(*) FROM testimonials');
    
    // Get recent bookings
    const recentBookings = await query('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5');

    res.json({
      success: true,
      stats: {
        bookings: parseInt(bookingsCount.rows[0].count),
        services: parseInt(servicesCount.rows[0].count),
        packages: parseInt(packagesCount.rows[0].count),
        portfolio: parseInt(portfolioCount.rows[0].count),
        gallery: parseInt(galleryCount.rows[0].count),
        testimonials: parseInt(testimonialsCount.rows[0].count),
      },
      recentBookings: recentBookings.rows
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

export default router;
