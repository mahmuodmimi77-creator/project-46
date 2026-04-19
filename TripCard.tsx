import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
interface SearchBarProps {
  compact?: boolean;
}
export function SearchBar({ compact = false }: SearchBarProps) {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('1');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd pass these as query params
    navigate('/trips');
  };
  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 p-1 w-full max-w-2xl mx-auto">
        
        <div className="flex-1 flex items-center px-4">
          <Search className="w-4 h-4 text-text-muted ml-2" />
          <input
            type="text"
            placeholder="ابحث عن وجهة..."
            className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)} />
          
        </div>
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
          
          <Search className="w-5 h-5" />
        </button>
      </form>);

  }
  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-xl p-2 md:p-4 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-2 md:gap-4">
      
      <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
        <MapPin className="w-5 h-5 text-primary ml-3" />
        <div className="flex-1">
          <label className="block text-xs text-text-muted mb-1">الوجهة</label>
          <input
            type="text"
            placeholder="إلى أين تريد الذهاب؟"
            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)} />
          
        </div>
      </div>

      <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
        <Calendar className="w-5 h-5 text-primary ml-3" />
        <div className="flex-1">
          <label className="block text-xs text-text-muted mb-1">التاريخ</label>
          <input
            type="date"
            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium outline-none text-text-primary"
            value={date}
            onChange={(e) => setDate(e.target.value)} />
          
        </div>
      </div>

      <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
        <Users className="w-5 h-5 text-primary ml-3" />
        <div className="flex-1">
          <label className="block text-xs text-text-muted mb-1">الضيوف</label>
          <select
            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium outline-none"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}>
            
            <option value="1">1 فرد</option>
            <option value="2">2 أفراد</option>
            <option value="3">3 أفراد</option>
            <option value="4">4 أفراد</option>
            <option value="5+">5+ أفراد</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-accent hover:bg-accent-dark text-white rounded-xl py-3 px-8 font-bold text-lg transition-colors shadow-md flex items-center justify-center md:w-auto w-full">
        
        <Search className="w-5 h-5 ml-2" />
        ابحث الآن
      </button>
    </form>);

}