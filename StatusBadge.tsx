import React from 'react';
import { Minus, Plus, Users } from 'lucide-react';
interface GuestSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}
export function GuestSelector({
  value,
  onChange,
  min = 1,
  max = 10
}: GuestSelectorProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
      <div className="flex items-center text-text-primary">
        <Users className="w-5 h-5 ml-2 text-primary" />
        <span className="font-medium">عدد الأفراد</span>
      </div>

      <div className="flex items-center space-x-3 space-x-reverse">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
          
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-6 text-center font-bold text-lg">{value}</span>

        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
          
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>);

}