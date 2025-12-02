'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '@/lib/api';

interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  event_type: string;
  event_date: string;
  event_time: string;
  event_location: string;
  package_id: number;
  guest_count: number;
  message: string;
  status: string;
  notes: string;
  created_at: string;
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/bookings');
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.put(`/bookings/${id}`, { status: newStatus, notes: adminNotes });
      toast.success(`Booking status updated to ${newStatus}`);
      fetchBookings();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      toast.error('Failed to update booking status');
      console.error(error);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setAdminNotes(booking.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedBooking) return;
    try {
      await api.put(`/bookings/${selectedBooking.id}`, { 
        status: selectedBooking.status, 
        notes: adminNotes 
      });
      toast.success('Notes saved successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to save notes');
      console.error(error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.event_type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Manage Bookings</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="relative w-full md:w-48">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No bookings found</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{booking.full_name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{booking.event_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(booking.event_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-end gap-1 ml-auto"
                      >
                        <FaEye /> Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
                <p className="text-sm text-gray-500">ID: #{selectedBooking.id}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Client Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedBooking.full_name}</p>
                    <p><span className="font-medium">Email:</span> {selectedBooking.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedBooking.phone}</p>
                    <p><span className="font-medium">WhatsApp:</span> {selectedBooking.whatsapp || '-'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Event Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Type:</span> {selectedBooking.event_type}</p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedBooking.event_date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {selectedBooking.event_time || '-'}</p>
                    <p><span className="font-medium">Location:</span> {selectedBooking.event_location || '-'}</p>
                    <p><span className="font-medium">Guests:</span> {selectedBooking.guest_count || '-'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Message</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedBooking.message || 'No message'}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Status Management</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedBooking.id, 'pending')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${selectedBooking.status === 'pending' ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedBooking.id, 'confirmed')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${selectedBooking.status === 'confirmed' ? 'bg-green-100 border-green-200 text-green-800' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${selectedBooking.status === 'completed' ? 'bg-blue-100 border-blue-200 text-blue-800' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedBooking.id, 'cancelled')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${selectedBooking.status === 'cancelled' ? 'bg-red-100 border-red-200 text-red-800' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Admin Notes</h3>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Add internal notes about this booking..."
                  ></textarea>
                  <button
                    onClick={handleSaveNotes}
                    className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
