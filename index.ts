import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ship, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate credentials here
    login(email || 'ahmed@example.com');
    // Redirect to previous page or home
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, {
      replace: true
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 relative z-10">
        
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <Ship className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-display font-bold text-text-primary">
            {isLogin ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            {isLogin ?
            'سجل دخولك لمتابعة حجوزاتك' :
            'انضم إلينا واكتشف أفضل الرحلات'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}>
            
            تسجيل الدخول
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}>
            
            حساب جديد
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin &&
            <>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    الاسم بالكامل
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    type="text"
                    required
                    className="appearance-none block w-full pr-10 pl-3 py-3 border border-gray-200 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-gray-50 focus:bg-white"
                    placeholder="أحمد محمد" />
                  
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    type="tel"
                    required
                    dir="ltr"
                    className="appearance-none block w-full pr-10 pl-3 py-3 border border-gray-200 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-gray-50 focus:bg-white text-left"
                    placeholder="+20 123 456 7890" />
                  
                  </div>
                </div>
              </>
            }

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  className="appearance-none block w-full pr-10 pl-3 py-3 border border-gray-200 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-gray-50 focus:bg-white text-left"
                  placeholder="you@example.com" />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                  className="appearance-none block w-full pr-10 pl-3 py-3 border border-gray-200 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-gray-50 focus:bg-white text-left"
                  placeholder="••••••••" />
                
              </div>
            </div>
          </div>

          {isLogin &&
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              
                <label
                htmlFor="remember-me"
                className="mr-2 block text-sm text-text-muted">
                
                  تذكرني
                </label>
              </div>

              <div className="text-sm">
                <a
                href="#"
                className="font-medium text-primary hover:text-primary-dark">
                
                  نسيت كلمة المرور؟
                </a>
              </div>
            </div>
          }

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-md">
            
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </button>

          <div className="mt-6 text-center text-sm text-text-muted">
            <p>
              للتجربة: استخدم أي بريد إلكتروني، أو admin@riverescape.com لحساب
              الإدارة
            </p>
          </div>
        </form>
      </motion.div>
    </div>);

}