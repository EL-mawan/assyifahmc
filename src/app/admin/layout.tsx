'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaBox, 
  FaImages, 
  FaStar, 
  FaCalendarCheck, 
  FaCog, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaUserTie,
  FaLayerGroup
} from 'react-icons/fa';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/login') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        // Load user data
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    }
  }, [pathname, router]);

  // Check if we are on the login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Show toast notification
    if (typeof window !== 'undefined') {
      const { toast } = require('react-toastify');
      toast.info('👋 Anda telah logout. Sampai jumpa!', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
    
    // Redirect to login
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: FaHome },
    { href: '/admin/bookings', label: 'Bookings', icon: FaCalendarCheck },
    { href: '/admin/services', label: 'Services', icon: FaUserTie },
    { href: '/admin/packages', label: 'Packages', icon: FaBox },
    { href: '/admin/portfolio', label: 'Portfolio', icon: FaLayerGroup },
    { href: '/admin/gallery', label: 'Gallery', icon: FaImages },
    { href: '/admin/testimonials', label: 'Testimonials', icon: FaStar },
    { href: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
            <h1 className="text-xl font-bold text-white font-display">Assyifah Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 font-semibold shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    >
                      <item.icon className={`text-lg mr-3 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                {user?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-700">{user?.full_name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@mc.com'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome back, Admin!</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
