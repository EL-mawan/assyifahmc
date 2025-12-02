-- Seed Data for Sayla MC Database

-- Insert default admin user (email: assyifah@mc.com, password: assyifahcantik)
INSERT INTO admin_users (username, email, password_hash, full_name) VALUES
('assyifah', 'assyifah@mc.com', '$2a$10$sHbx502lyhGFvCbzkhYhz..yzx7mXPRSnJh5uYE1V9Yq2cJbg9Eiu', 'Assyifah MC Admin');

-- Insert site settings
INSERT INTO site_settings (
    site_name, 
    site_tagline, 
    site_description,
    contact_email,
    contact_phone,
    contact_whatsapp,
    contact_address,
    social_facebook,
    social_instagram,
    social_twitter
) VALUES (
    'Sayla MC',
    'Professional Master of Ceremony for All Your Events',
    'Sayla MC menyediakan jasa MC profesional untuk berbagai jenis acara seperti pernikahan, corporate event, ulang tahun, seminar, dan acara spesial lainnya. Dengan pengalaman bertahun-tahun, kami siap membuat acara Anda berkesan dan memorable.',
    'info@saylamc.com',
    '+62 812-3456-7890',
    '+62 812-3456-7890',
    'Jakarta, Indonesia',
    'https://facebook.com/saylamc',
    'https://instagram.com/saylamc',
    'https://twitter.com/saylamc'
);

-- Insert homepage sections
INSERT INTO homepage_sections (section_type, section_title, section_subtitle, section_order, is_visible) VALUES
('hero', 'Sayla MC', 'Professional Master of Ceremony for All Your Events', 1, true),
('services', 'Our Services', 'Layanan MC profesional untuk berbagai jenis acara', 2, true),
('packages', 'Our Packages', 'Pilih paket yang sesuai dengan kebutuhan acara Anda', 3, true),
('portfolio', 'Our Portfolio', 'Lihat pengalaman kami dalam berbagai acara', 4, true),
('testimonials', 'Client Testimonials', 'Apa kata klien kami', 5, true),
('gallery', 'Gallery', 'Dokumentasi acara-acara yang telah kami handle', 6, true),
('about', 'About Us', 'Kenali lebih dekat Sayla MC', 7, true);

-- Insert services
INSERT INTO services (title, slug, description, short_description, icon, features, is_featured, display_order) VALUES
('Wedding MC', 'wedding-mc', 
'Jadikan hari pernikahan Anda lebih berkesan dengan MC profesional yang berpengalaman. Kami akan memandu acara pernikahan Anda dengan penuh kehangatan dan profesionalisme.',
'MC profesional untuk acara pernikahan yang berkesan',
'💍',
ARRAY['Pembawaan yang hangat dan profesional', 'Pengalaman menangani berbagai konsep pernikahan', 'Bilingual (Indonesia & English)', 'Koordinasi dengan vendor lain', 'Rundown acara yang terstruktur'],
true, 1),

('Corporate Event MC', 'corporate-event-mc',
'Tingkatkan profesionalisme acara corporate Anda dengan MC yang berpengalaman dalam menangani seminar, conference, product launching, dan gathering perusahaan.',
'MC untuk acara corporate, seminar, dan conference',
'💼',
ARRAY['Pembawaan formal dan profesional', 'Pengalaman dengan berbagai industri', 'Bilingual & Multilingual', 'Improvisasi yang baik', 'Penguasaan teknologi presentasi'],
true, 2),

('Birthday Party MC', 'birthday-party-mc',
'Buat pesta ulang tahun Anda lebih meriah dengan MC yang energik dan fun. Cocok untuk ulang tahun anak-anak hingga dewasa.',
'MC untuk pesta ulang tahun yang meriah dan fun',
'🎂',
ARRAY['Pembawaan yang fun dan energik', 'Interaksi dengan tamu', 'Games & entertainment', 'Cocok untuk segala usia', 'Menciptakan suasana meriah'],
false, 3),

('Seminar & Workshop MC', 'seminar-workshop-mc',
'MC profesional untuk acara seminar, workshop, dan training. Membantu kelancaran acara edukasi Anda.',
'MC untuk seminar, workshop, dan training',
'📚',
ARRAY['Pembawaan edukatif dan informatif', 'Time management yang baik', 'Moderasi diskusi & Q&A', 'Penguasaan materi umum', 'Koordinasi dengan pembicara'],
false, 4),

('Grand Opening MC', 'grand-opening-mc',
'MC untuk acara grand opening bisnis, toko, atau kantor baru Anda. Ciptakan kesan pertama yang memorable.',
'MC untuk grand opening bisnis dan acara launching',
'🎊',
ARRAY['Pembawaan yang antusias', 'Promosi yang efektif', 'Koordinasi dengan tim marketing', 'Handling media & press', 'Menciptakan buzz'],
false, 5);

-- Insert packages
INSERT INTO packages (name, slug, description, price, duration, features, is_popular, is_featured, display_order) VALUES
('Basic Package', 'basic-package',
'Paket dasar untuk acara dengan durasi singkat. Cocok untuk acara intimate dan sederhana.',
2500000.00,
'2-3 jam',
ARRAY['1 MC Profesional', 'Konsultasi pre-event', 'Rundown acara', 'Koordinasi dengan vendor', 'Dokumentasi audio'],
false, false, 1),

('Standard Package', 'standard-package',
'Paket standar untuk acara menengah. Paling populer dan value for money.',
4500000.00,
'4-5 jam',
ARRAY['1 MC Profesional', 'Konsultasi pre-event (2x)', 'Rundown acara detail', 'Koordinasi dengan semua vendor', 'Dokumentasi audio & video', 'Backup MC (on-call)', 'Games & entertainment'],
true, true, 2),

('Premium Package', 'premium-package',
'Paket premium untuk acara besar dan spesial. Layanan lengkap dan eksklusif.',
7500000.00,
'Full day',
ARRAY['1 MC Profesional Senior', 'Unlimited konsultasi pre-event', 'Rundown acara detail & custom', 'Full koordinasi dengan semua vendor', 'Dokumentasi lengkap', 'Backup MC (standby)', 'Games, entertainment & doorprize', 'Bilingual service', 'Custom script & personalization'],
false, true, 3),

('VIP Package', 'vip-package',
'Paket VIP untuk acara eksklusif dan high-profile. Layanan terbaik dengan MC berpengalaman tinggi.',
12000000.00,
'Full day + rehearsal',
ARRAY['2 MC Profesional (Bilingual)', 'Unlimited konsultasi & meeting', 'Full event planning support', 'Koordinasi penuh dengan semua pihak', 'Dokumentasi premium', 'Backup team (standby)', 'Full entertainment package', 'Multilingual service', 'Celebrity MC (optional)', 'Full customization'],
false, true, 4);

-- Insert portfolio items
INSERT INTO portfolio_items (title, slug, event_type, event_date, client_name, description, image_url, is_featured, display_order) VALUES
('Pernikahan Andi & Sari', 'wedding-andi-sari', 'Wedding', '2024-10-15', 'Andi & Sari',
'Acara pernikahan yang intimate dan elegant di Balai Samudra, Jakarta. Konsep rustic dengan nuansa natural.',
'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
true, 1),

('Product Launch PT. Tech Indonesia', 'product-launch-tech-indonesia', 'Corporate', '2024-09-20', 'PT. Tech Indonesia',
'Grand launching produk teknologi terbaru dengan 500+ undangan dari berbagai industri.',
'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
true, 2),

('Ulang Tahun ke-50 Ibu Ratna', 'birthday-ibu-ratna', 'Birthday', '2024-08-10', 'Keluarga Ratna',
'Perayaan ulang tahun ke-50 yang meriah dengan tema garden party di kediaman pribadi.',
'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
false, 3),

('Seminar Nasional Pendidikan', 'seminar-pendidikan-nasional', 'Seminar', '2024-07-05', 'Kementerian Pendidikan',
'Seminar nasional dengan 1000+ peserta dan 10 pembicara dari berbagai universitas.',
'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
true, 4),

('Grand Opening Cafe Kopi Nusantara', 'grand-opening-cafe-kopi', 'Grand Opening', '2024-06-12', 'Cafe Kopi Nusantara',
'Grand opening cafe dengan konsep modern minimalis, dihadiri influencer dan media.',
'https://images.unsplash.com/photo-1459749411177-287ce38e315f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
false, 5);

-- Insert testimonials
INSERT INTO testimonials (client_name, client_position, client_company, testimonial_text, rating, event_type, is_featured, display_order) VALUES
('Andi Wijaya', 'Groom', 'Personal', 
'Sayla MC sangat profesional dan membuat acara pernikahan kami berjalan lancar. Semua tamu terhibur dan acara berjalan sesuai jadwal. Highly recommended!',
5, 'Wedding', true, 1),

('Diana Putri', 'Marketing Manager', 'PT. Tech Indonesia',
'Kami sangat puas dengan layanan Sayla MC untuk product launch kami. MC-nya sangat menguasai acara dan bisa handle audience dengan baik. Terima kasih!',
5, 'Corporate', true, 2),

('Ratna Sari', 'Client', 'Personal',
'MC-nya fun, energik, dan bisa membuat suasana pesta ulang tahun saya jadi lebih meriah. Semua tamu senang dan terhibur. Thank you Sayla MC!',
5, 'Birthday', false, 3),

('Prof. Dr. Budi Santoso', 'Ketua Panitia', 'Universitas Indonesia',
'Profesional, tepat waktu, dan sangat membantu kelancaran seminar. MC-nya bisa moderasi diskusi dengan baik dan menjaga waktu dengan disiplin.',
5, 'Seminar', true, 4),

('Rini Kusuma', 'Owner', 'Cafe Kopi Nusantara',
'Grand opening cafe kami sukses berkat bantuan Sayla MC. MC-nya bisa create buzz dan membuat acara jadi memorable. Recommended!',
5, 'Grand Opening', false, 5);

-- Insert gallery images (placeholder)
INSERT INTO gallery_images (title, category, description, image_url, display_order) VALUES
('Wedding Ceremony', 'Wedding', 'Beautiful wedding ceremony moment', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 1),
('Corporate Event', 'Corporate', 'Professional corporate event', 'https://images.unsplash.com/photo-1519225468359-2996bc01c34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 2),
('Birthday Celebration', 'Birthday', 'Fun birthday party', 'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 3),
('Seminar Session', 'Seminar', 'Educational seminar', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 4),
('Grand Opening', 'Grand Opening', 'Exciting grand opening event', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 5);

-- Insert sample bookings
INSERT INTO bookings (full_name, email, phone, whatsapp, event_type, event_date, event_time, event_location, guest_count, message, status) VALUES
('John Doe', 'john@example.com', '+62 812-1111-1111', '+62 812-1111-1111', 'Wedding', '2025-03-15', '18:00:00', 'Balai Kartini, Jakarta', 300, 'Pernikahan outdoor dengan tema rustic', 'pending'),
('Jane Smith', 'jane@example.com', '+62 812-2222-2222', '+62 812-2222-2222', 'Corporate', '2025-02-20', '09:00:00', 'Hotel Grand Indonesia', 500, 'Product launching untuk produk baru', 'confirmed'),
('Ahmad Yani', 'ahmad@example.com', '+62 812-3333-3333', '+62 812-3333-3333', 'Birthday', '2025-01-25', '19:00:00', 'Rumah Pribadi', 100, 'Ulang tahun anak ke-7', 'pending');
