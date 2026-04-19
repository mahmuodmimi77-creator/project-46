import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Share2,
  Heart,
  MapPin,
  Clock,
  Users,
  Wifi,
  Coffee,
  Shield,
  Music,
  Camera,
  CheckCircle } from
'lucide-react';
import { mockTrips } from '../data/mockData';
import { Trip } from '../types';
import { StarRating } from '../components/ui/StarRating';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { GuestSelector } from '../components/ui/GuestSelector';
import { useAuth } from '../context/AuthContext';
export function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  // Booking state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guests, setGuests] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    const timer = setTimeout(() => {
      const found = mockTrips.find((t) => t.id === id);
      if (found) {
        setTrip(found);
        if (found.availableDates.length > 0) {
          setSelectedDate(found.availableDates[0]);
        }
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setShowBookingModal(true);
  };
  const confirmBooking = () => {
    // Simulate API call
    setTimeout(() => {
      setBookingSuccess(true);
    }, 1000);
  };
  if (loading) {
    return <SkeletonLoader type="detail" />;
  }
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">الرحلة غير موجودة</h2>
          <button
            onClick={() => navigate('/trips')}
            className="text-primary hover:underline">
            
            العودة للرحلات
          </button>
        </div>
      </div>);

  }
  const totalPrice = trip.pricePerPerson * guests;
  // Map amenity string to icon
  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />;
      case 'food':
        return <Coffee className="w-5 h-5" />;
      case 'life jackets':
        return <Shield className="w-5 h-5" />;
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'photography':
        return <Camera className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };
  return (
    <div className="bg-background min-h-screen pb-24 md:pb-10">
      {/* Image Gallery */}
      <div className="relative h-64 md:h-96 w-full">
        <div
          className={`absolute inset-0 ${trip.images[activeImage]} transition-all duration-500`} />
        

        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors">
            
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          <div className="flex space-x-3 space-x-reverse">
            <button className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Share2 className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors">
              
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-error text-error' : 'text-gray-800'}`} />
              
            </button>
          </div>
        </div>

        {/* Dots */}
        {trip.images.length > 1 &&
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 space-x-reverse">
            {trip.images.map((_, idx) =>
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`w-2 h-2 rounded-full transition-all ${activeImage === idx ? 'w-6 bg-white' : 'bg-white/50'}`} />

          )}
          </div>
        }
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
                {trip.type === 'boat' ? '🚢 رحلة بحرية' : '🌿 مزرعة سياحية'}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                {trip.title}
              </h1>
              <div className="flex items-center text-text-muted mb-4">
                <MapPin className="w-4 h-4 ml-1" />
                <span>{trip.location}</span>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-fit">
              <div className="text-left ml-3">
                <div className="font-bold text-lg">{trip.rating}</div>
                <div className="text-xs text-text-muted">
                  {trip.reviewCount} تقييم
                </div>
              </div>
              <StarRating rating={trip.rating} size="lg" />
            </div>
          </div>

          {/* Info Chips */}
          <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Clock className="w-5 h-5 text-primary ml-2" />
              <div>
                <div className="text-xs text-text-muted">المدة</div>
                <div className="font-medium">{trip.durationHours} ساعات</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Users className="w-5 h-5 text-primary ml-2" />
              <div>
                <div className="text-xs text-text-muted">السعة القصوى</div>
                <div className="font-medium">{trip.maxCapacity} فرد</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">عن الرحلة</h3>
            <p className="text-text-muted leading-relaxed">
              {trip.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">ماذا تشمل الرحلة؟</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trip.amenities.map((amenity, idx) =>
              <div key={idx} className="flex items-center text-text-primary">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary ml-3">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="font-medium text-sm">{amenity}</span>
                </div>
              )}
            </div>
          </div>

          {/* Booking Selection (Desktop only - mobile uses sticky bottom bar) */}
          <div className="hidden md:block bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">احجز رحلتك</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  اختر التاريخ
                </label>
                <div className="flex flex-wrap gap-2">
                  {trip.availableDates.map((date) =>
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${selectedDate === date ? 'bg-primary text-white border-primary' : 'bg-white text-text-primary border-gray-200 hover:border-primary'}`}>
                    
                      {new Date(date).toLocaleDateString('ar-EG', {
                      day: 'numeric',
                      month: 'short'
                    })}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  عدد الأفراد
                </label>
                <GuestSelector
                  value={guests}
                  onChange={setGuests}
                  max={trip.maxCapacity} />
                
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                <div className="text-sm text-text-muted">الإجمالي</div>
                <div className="text-3xl font-display font-bold text-accent">
                  {totalPrice} ج.م
                </div>
              </div>
              <button
                onClick={handleBookNow}
                className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-xl font-bold text-lg transition-colors shadow-md">
                
                احجز الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 pb-safe">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-text-muted">السعر للفرد</div>
            <div className="text-xl font-bold text-primary">
              {trip.pricePerPerson} ج.م
            </div>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-accent text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-md">
            
            احجز الآن
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            
              {!bookingSuccess ?
            <>
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-display font-bold">
                      تأكيد الحجز
                    </h2>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div
                    className={`w-16 h-16 rounded-xl ${trip.images[0]}`} />
                  
                      <div>
                        <h3 className="font-bold line-clamp-1">{trip.title}</h3>
                        <p className="text-sm text-text-muted">
                          {trip.location}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">التاريخ:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">عدد الأفراد:</span>
                        <span className="font-medium">{guests} أفراد</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200 flex justify-between">
                        <span className="font-bold">الإجمالي:</span>
                        <span className="font-bold text-lg text-primary">
                          {totalPrice} ج.م
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start">
                      <Shield className="w-5 h-5 ml-2 shrink-0 mt-0.5" />
                      <p>
                        الدفع يتم نقداً عند الوصول. لا حاجة لبطاقة ائتمان الآن.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 flex space-x-3 space-x-reverse">
                    <button
                  onClick={confirmBooking}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition-colors">
                  
                      تأكيد الحجز
                    </button>
                    <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-text-primary rounded-xl font-medium transition-colors">
                  
                      إلغاء
                    </button>
                  </div>
                </> :

            <div className="p-8 text-center">
                  <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                transition={{
                  type: 'spring',
                  bounce: 0.5
                }}
                className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold mb-2">
                    تم الحجز بنجاح!
                  </h2>
                  <p className="text-text-muted mb-8">
                    رقم الحجز: #
                    {Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </p>

                  <div className="space-y-3">
                    <button
                  onClick={() => {
                    setShowBookingModal(false);
                    navigate('/bookings');
                  }}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition-colors">
                  
                      عرض حجوزاتي
                    </button>
                    <button
                  onClick={() => {
                    setShowBookingModal(false);
                    navigate('/');
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary py-3 rounded-xl font-medium transition-colors">
                  
                      العودة للرئيسية
                    </button>
                  </div>
                </div>
            }
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}