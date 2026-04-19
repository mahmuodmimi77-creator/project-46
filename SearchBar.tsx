import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Calendar, User } from 'lucide-react';
export function BottomNav() {
  const navItems = [
  {
    path: '/',
    icon: Home,
    label: 'الرئيسية'
  },
  {
    path: '/trips',
    icon: Map,
    label: 'الرحلات'
  },
  {
    path: '/bookings',
    icon: Calendar,
    label: 'حجوزاتي'
  },
  {
    path: '/profile',
    icon: User,
    label: 'حسابي'
  }];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) =>
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-primary/70'}`
          }>
          
            {({ isActive }) =>
          <>
                <item.icon
              className={`w-6 h-6 ${isActive ? 'fill-primary/10' : ''}`} />
            
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
          }
          </NavLink>
        )}
      </div>
    </div>);

}