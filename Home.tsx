import { Trip, User, Booking, Review } from '../types';

export const mockUsers: User[] = [
{
  id: 'u1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+201234567890',
  role: 'user'
},
{
  id: 'u2',
  name: 'Admin',
  email: 'admin@riverescape.com',
  phone: '+201000000000',
  role: 'admin'
}];


// Helper to generate dates
const today = new Date();
const getFutureDate = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const mockTrips: Trip[] = [
{
  id: 't1',
  title: 'رحلة نيل أسوان الفاخرة',
  description:
  'استمتع برحلة لا تُنسى في نيل أسوان الساحر على متن مركب فاخر مع وجبة غداء تقليدية وموسيقى نوبية حية.',
  type: 'boat',
  location: 'مرسى أسوان السياحي',
  city: 'Aswan',
  pricePerPerson: 450,
  maxCapacity: 15,
  durationHours: 6,
  images: [
  'bg-gradient-to-br from-primary to-primary-light',
  'bg-gradient-to-br from-primary-light to-accent'],

  amenities: ['Food', 'Guide', 'Life Jackets', 'Music'],
  availableDates: [getFutureDate(1), getFutureDate(2), getFutureDate(5)],
  isActive: true,
  rating: 4.8,
  reviewCount: 124
},
{
  id: 't2',
  title: 'جولة المراكب الشراعية بالأقصر',
  description:
  'جولة هادئة وقت الغروب بالمراكب الشراعية التقليدية (الفلوكة) في الأقصر، مع إطلالة رائعة على المعابد.',
  type: 'boat',
  location: 'كورنيش النيل، الأقصر',
  city: 'Luxor',
  pricePerPerson: 280,
  maxCapacity: 8,
  durationHours: 3,
  images: [
  'bg-gradient-to-br from-accent to-orange-500',
  'bg-gradient-to-br from-orange-500 to-red-500'],

  amenities: ['Guide', 'Life Jackets', 'Photography'],
  availableDates: [getFutureDate(1), getFutureDate(3), getFutureDate(4)],
  isActive: true,
  rating: 4.9,
  reviewCount: 89
},
{
  id: 't3',
  title: 'رحلة نهر النيل بالقاهرة',
  description:
  'رحلة مسائية ممتعة في قلب القاهرة مع عشاء بوفيه مفتوح وعروض ترفيهية حية.',
  type: 'boat',
  location: 'مرسى الزمالك',
  city: 'Cairo',
  pricePerPerson: 350,
  maxCapacity: 50,
  durationHours: 4,
  images: [
  'bg-gradient-to-br from-indigo-900 to-primary',
  'bg-gradient-to-br from-primary to-teal-500'],

  amenities: ['Food', 'Music', 'WiFi', 'Parking'],
  availableDates: [getFutureDate(2), getFutureDate(4), getFutureDate(6)],
  isActive: true,
  rating: 4.5,
  reviewCount: 210
},
{
  id: 't4',
  title: 'مزرعة النخيل السياحية',
  description:
  'يوم كامل في الطبيعة الخلابة بالفيوم، استمتع بقطف الثمار، ركوب الخيل، ووجبة غداء ريفية أصيلة.',
  type: 'farm',
  location: 'قرية تونس، الفيوم',
  city: 'Fayoum',
  pricePerPerson: 200,
  maxCapacity: 30,
  durationHours: 8,
  images: [
  'bg-gradient-to-br from-green-700 to-green-500',
  'bg-gradient-to-br from-green-500 to-yellow-400'],

  amenities: ['Food', 'Kids Friendly', 'Pets Allowed', 'BBQ'],
  availableDates: [getFutureDate(3), getFutureDate(5), getFutureDate(7)],
  isActive: true,
  rating: 4.7,
  reviewCount: 56
},
{
  id: 't5',
  title: 'مزرعة الورود والعطور',
  description:
  'جولة ساحرة في مزارع الورود بالإسكندرية، تعرف على طرق استخلاص العطور واصنع عطرك الخاص.',
  type: 'farm',
  location: 'برج العرب، الإسكندرية',
  city: 'Alexandria',
  pricePerPerson: 180,
  maxCapacity: 20,
  durationHours: 4,
  images: [
  'bg-gradient-to-br from-pink-500 to-rose-400',
  'bg-gradient-to-br from-rose-400 to-orange-300'],

  amenities: ['Guide', 'Photography', 'Parking'],
  availableDates: [getFutureDate(1), getFutureDate(2), getFutureDate(8)],
  isActive: true,
  rating: 4.6,
  reviewCount: 42
},
{
  id: 't6',
  title: 'مزرعة الصحراء والنخيل',
  description:
  'تجربة فريدة في واحة سيوة، عيون المياه الكبريتية، سفاري، وعشاء بدوي تحت النجوم.',
  type: 'farm',
  location: 'واحة سيوة',
  city: 'Siwa',
  pricePerPerson: 320,
  maxCapacity: 12,
  durationHours: 8,
  images: [
  'bg-gradient-to-br from-yellow-600 to-accent',
  'bg-gradient-to-br from-accent to-orange-400'],

  amenities: ['Food', 'Guide', 'BBQ', 'Photography'],
  availableDates: [getFutureDate(4), getFutureDate(6), getFutureDate(10)],
  isActive: true,
  rating: 4.9,
  reviewCount: 115
}];


export const mockBookings: Booking[] = [
{
  id: 'b1',
  userId: 'u1',
  tripId: 't1',
  bookingDate: getFutureDate(2),
  numberOfPeople: 2,
  totalPrice: 900,
  status: 'confirmed',
  createdAt: new Date().toISOString()
},
{
  id: 'b2',
  userId: 'u1',
  tripId: 't4',
  bookingDate: getFutureDate(5),
  numberOfPeople: 4,
  totalPrice: 800,
  status: 'pending',
  createdAt: new Date().toISOString()
}];