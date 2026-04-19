import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Ship, User as UserIcon, LogOut } from 'lucide-react';
export function TopNav() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navItems = [
  {
    path: '/',
    label: 'الرئيسية'
  },
  {
    path: '/trips',
    label: 'تصفح الرحلات'
  }];

  if (isAuthenticated) {
    navItems.push({
      path: '/bookings',
      label: 'حجوزاتي'
    });
  }
  return (
    <header className="hidden md:block sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-primary text-white p-2 rounded-xl">
              <Ship className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-primary">
              RiverEscape
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-8 space-x-reverse">
            {navItems.map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
              `text-base font-medium transition-colors ${isActive ? 'text-primary border-b-2 border-accent pb-1' : 'text-text-muted hover:text-primary'}`
              }>
              
                {item.label}
              </NavLink>
            )}
            {isAdmin &&
            <NavLink
              to="/admin"
              className={({ isActive }) =>
              `text-base font-medium transition-colors ${isActive ? 'text-primary border-b-2 border-accent pb-1' : 'text-text-muted hover:text-primary'}`
              }>
              
                لوحة التحكم
              </NavLink>
            }
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {isAuthenticated ?
            <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                to="/profile"
                className="flex items-center space-x-2 space-x-reverse text-text-primary hover:text-primary transition-colors">
                
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">
                    {user?.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                onClick={logout}
                className="p-2 text-text-muted hover:text-error transition-colors rounded-full hover:bg-error/10"
                title="تسجيل الخروج">
                
                  <LogOut className="w-5 h-5" />
                </button>
              </div> :

            <Link
              to="/auth"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-soft">
              
                تسجيل الدخول
              </Link>
            }
          </div>
        </div>
      </div>
    </header>);

}