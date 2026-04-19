import React from 'react';
interface SkeletonLoaderProps {
  type: 'card' | 'detail' | 'list';
  count?: number;
}
export function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const renderCard = (key: number) =>
  <div
    key={key}
    className="bg-surface rounded-2xl shadow-soft overflow-hidden border border-gray-100 animate-pulse">
    
      <div className="h-48 bg-gray-200 w-full" />
      <div className="p-4 space-y-4">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="flex justify-between border-t border-gray-100 pt-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded w-8" />
        </div>
      </div>
    </div>;

  const renderDetail = () =>
  <div className="animate-pulse">
      <div className="h-64 md:h-96 bg-gray-200 w-full" />
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="flex space-x-4 space-x-reverse">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-24 bg-gray-200 rounded w-full" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded w-full" />
          <div className="h-12 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>;

  const renderList = (key: number) =>
  <div
    key={key}
    className="flex items-center space-x-4 space-x-reverse p-4 border-b border-gray-100 animate-pulse">
    
      <div className="h-16 w-16 bg-gray-200 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-16" />
    </div>;

  if (type === 'detail') return renderDetail();
  return (
    <>
      {[...Array(count)].map((_, i) =>
      type === 'card' ? renderCard(i) : renderList(i)
      )}
    </>);

}