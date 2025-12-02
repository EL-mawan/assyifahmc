'use client';

import { useState, useEffect } from 'react';
import { FaCalendarCheck, FaUserTie, FaBox, FaImages, FaStar, FaLayerGroup } from 'react-icons/fa';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    services: 0,
    packages: 0,
    portfolio: 0,
    gallery: 0,
    testimonials: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        if (response.data.success) {
          setStats(response.data.stats);
          setRecentBookings(response.data.recentBookings);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Total Bookings', value: stats.bookings, icon: FaCalendarCheck, color: 'bg-blue-500', link: '/admin/bookings' },
    { label: 'Active Services', value: stats.services, icon: FaUserTie, color: 'bg-purple-500', link: '/admin/services' },
    { label: 'Packages', value: stats.packages, icon: FaBox, color: 'bg-orange-500', link: '/admin/packages' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: FaLayerGroup, color: 'bg-indigo-500', link: '/admin/portfolio' },
    { label: 'Gallery Images', value: stats.gallery, icon: FaImages, color: 'bg-pink-500', link: '/admin/gallery' },
    { label: 'Testimonials', value: stats.testimonials, icon: FaStar, color: 'bg-yellow-500', link: '/admin/testimonials' },
  ];

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statItems.map((stat, index) => (
          <Link key={index} href={stat.link} className="bg-white rounded-xl shadow-sm p-6 flex items-center hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl mr-4 shadow-md`}>
              <stat.icon />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No recent bookings</td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{booking.full_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.event_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(booking.event_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href="/admin/bookings" className="text-primary-600 hover:text-primary-900 font-medium">Details</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
