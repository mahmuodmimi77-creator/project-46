import React from 'react';
import { motion } from 'framer-motion';
import {
  Ship,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Plus } from
'lucide-react';
import { mockBookings, mockTrips } from '../../data/mockData';
import { StatusBadge } from '../../components/ui/StatusBadge';
export function AdminDashboard() {
  // Calculate stats
  const totalTrips = mockTrips.length;
  const totalBookings = mockBookings.length;
  const pendingBookings = mockBookings.filter(
    (b) => b.status === 'pending'
  ).length;
  const totalRevenue = mockBookings.
  filter((b) => b.status === 'confirmed').
  reduce((sum, b) => sum + b.totalPrice, 0);
  const statCards = [
  {
    title: 'إجمالي الرحلات',
    value: totalTrips,
    icon: Ship,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'إجمالي الحجوزات',
    value: totalBookings,
    icon: Calendar,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'حجوزات قيد الانتظار',
    value: pendingBookings,
    icon: Users,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    title: 'الإيرادات المؤكدة',
    value: `${totalRevenue} ج.م`,
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  }];

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
              لوحة التحكم
            </h1>
            <p className="text-text-muted">نظرة عامة على أداء المنصة</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center">
            <Plus className="w-5 h-5 ml-2" />
            إضافة رحلة جديدة
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 ml-1" />
                  +12%
                </div>
              </div>
              <h3 className="text-text-muted text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-text-primary">
                {stat.value}
              </p>
            </motion.div>
          )}
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">
              أحدث الحجوزات
            </h2>
            <button className="text-primary text-sm font-medium hover:underline">
              عرض الكل
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">رقم الحجز</th>
                  <th className="px-6 py-4 font-medium">الرحلة</th>
                  <th className="px-6 py-4 font-medium">التاريخ</th>
                  <th className="px-6 py-4 font-medium">الأفراد</th>
                  <th className="px-6 py-4 font-medium">الإجمالي</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockBookings.map((booking) => {
                  const trip = mockTrips.find((t) => t.id === booking.tripId);
                  return (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors">
                      
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{booking.id.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 line-clamp-1 max-w-[200px]">
                        {trip?.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(booking.bookingDate).toLocaleDateString(
                          'ar-EG'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.numberOfPeople}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-primary">
                        {booking.totalPrice} ج.م
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none">
                          <option value="pending">تغيير الحالة</option>
                          <option value="confirmed">تأكيد</option>
                          <option value="cancelled">إلغاء</option>
                        </select>
                      </td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);

}