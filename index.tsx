import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Users } from 'lucide-react';
import { Trip } from '../../types';
import { StarRating } from './StarRating';
import { motion } from 'framer-motion';
interface TripCardProps {
  trip: Trip;
}
export function TripCard({ trip }: TripCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  return (
    <motion.div
      whileHover={{
        y: -4
      }}
      className="bg-surface rounded-2xl shadow-soft overflow-hidden group border border-gray-100">
      
      <Link to={`/trips/${trip.id}`} className="block">
        {/* Image Area */}
        <div className="relative h-48 w-full overflow-hidden">
          <div
            className={`absolute inset-0 ${trip.images[0]} transition-transform duration-500 group-hover:scale-105`} />
          

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary shadow-sm">
            {trip.type === 'boat' ? '🚢 رحلة بحرية' : '🌿 مزرعة سياحية'}
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 left-3 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors">
            
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-error text-error' : 'text-gray-700'}`} />
            
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4">
          <div className="flex items-center text-text-muted text-xs mb-2">
            <MapPin className="w-3 h-3 ml-1" />
            <span>{trip.location}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-text-primary mb-2 line-clamp-1">
            {trip.title}
          </h3>

          <div className="flex items-center mb-4">
            <StarRating rating={trip.rating} size="sm" />
            <span className="text-xs text-text-muted mr-2">
              ({trip.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center">
              <Clock className="w-3 h-3 ml-1" />
              <span>{trip.durationHours} ساعات</span>
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 ml-1" />
              <span>حتى {trip.maxCapacity} فرد</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">
                {trip.pricePerPerson} ج.م
              </span>
              <span className="text-xs text-text-muted"> / للفرد</span>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-180">
                
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round" />
                
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>);

}