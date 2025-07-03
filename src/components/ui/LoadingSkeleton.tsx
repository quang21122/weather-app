import React from 'react';
import { Card } from 'antd';

interface LoadingSkeletonProps {
  type?: 'weather' | 'forecast' | 'cities';
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'weather',
  className = '',
}) => {
  if (type === 'weather') {
    return (
      <Card className={`weather-card ${className}`}>
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          {/* Main weather skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-12 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Metrics grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer skeleton */}
          <div className="h-3 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </Card>
    );
  }

  if (type === 'forecast') {
    return (
      <Card className={`weather-card ${className}`} title="7-Day Forecast">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="flex items-center gap-3 flex-1 justify-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-center">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>
              <div className="flex items-center gap-4 flex-1 justify-end">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (type === 'cities') {
    return (
      <Card className={`weather-card ${className}`} title="Popular Cities">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-8 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return null;
};
