'use client';

import Link from 'next/link';
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600 hover:text-white' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500 hover:text-white' },
    { icon: FaYoutube, href: '#', label: 'Youtube', color: 'hover:bg-red-600 hover:text-white' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Assyifah MC
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Jasa MC profesional untuk pernikahan, acara perusahaan, ulang tahun, dan lainnya. 
              Kami menghadirkan keanggunan dan energi di setiap momen spesial Anda.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Paket Harga
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Portofolio
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pesan Sekarang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li>
                <a href="tel:+6281234567890" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                  <FaPhone className="text-primary-500 group-hover:scale-110 transition-transform" />
                  <span>+62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@assyifahmc.com" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                  <FaEnvelope className="text-primary-500 group-hover:scale-110 transition-transform" />
                  <span>info@assyifahmc.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Berlangganan untuk mendapatkan update terbaru dan penawaran spesial.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Alamat Email Anda"
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              &copy; {currentYear} Assyifah MC. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
