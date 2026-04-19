import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockBookings, mockTrips } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
export function Bookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>(
    'upcoming'
  );
  // Enrich bookings with trip data
  const enrichedBookings = mockBookings.map((booking) => ({
    ...booking,
    trip: mockTrips.find((t) => t.id === booking.tripId)
  }));
  const filteredBookings = enrichedBookings.filter((booking) => {
    if (activeTab === 'upcoming')
    return booking.status === 'pending' || booking.status === 'confirmed';
    if (activeTab === 'past') return false; // Mock data doesn't have past dates easily filterable
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });
  return (
    <div className="bg-background min-h-screen pt-4 md:pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-6">
          حجوزاتي
        </h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'upcoming' ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}>
            
            القادمة
            {activeTab === 'upcoming' &&
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />

            }
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'past' ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}>
            
            السابقة
            {activeTab === 'past' &&
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />

            }
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'cancelled' ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}>
            
            الملغاة
            {activeTab === 'cancelled' &&
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />

            }
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ?
          filteredBookings.map((booking, index) =>
          <motion.div
            key={booking.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1
            }}
            className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden flex flex-col sm:flex-row">
            
                {/* Image */}
                <div
              className={`h-48 sm:h-auto sm:w-48 shrink-0 ${booking.trip?.images[0]}`} />
            

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg line-clamp-1">
                        {booking.trip?.title}
                      </h3>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="space-y-2 text-sm text-text-muted mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 ml-2" />
                        {booking.trip?.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-2" />
                        {new Date(booking.bookingDate).toLocaleDateString(
                      'ar-EG',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 ml-2" />
                        {booking.numberOfPeople} أفراد
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-text-muted block">
                        الإجمالي
                      </span>
                      <span className="font-bold text-primary">
                        {booking.totalPrice} ج.م
                      </span>
                    </div>

                    <div className="flex space-x-3 space-x-reverse">
                      {booking.status === 'pending' &&
                  <button className="text-error text-sm font-medium hover:underline px-3 py-2">
                          إلغاء الحجز
                        </button>
                  }
                      <Link
                    to={`/trips/${booking.tripId}`}
                    className="bg-gray-50 hover:bg-gray-100 text-text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    
                        التفاصيل
                        <ChevronLeft className="w-4 h-4 mr-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
          ) :

          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                لا توجد حجوزات
              </h3>
              <p className="text-text-muted mb-6">
                لم تقم بأي حجوزات في هذا القسم بعد.
              </p>
              <Link
              to="/trips"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
              
                استكشف الرحلات
              </Link>
            </div>
          }
        </div>
      </div>
    </div>);

}