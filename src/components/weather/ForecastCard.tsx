import React from "react";
import { Card, Spin, Alert } from "antd";
import { Droplets, Wind } from "lucide-react";
import type { ForecastDisplayData } from "@/types/weather";
import { getWeatherIconUrl } from "@/utils/weather";

interface ForecastCardProps {
  forecast?: ForecastDisplayData[];
  loading?: boolean;
  error?: string | null;
  className?: string;
  title?: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecast,
  loading = false,
  error = null,
  className = "",
  title = "5-Day Forecast",
}) => {
  if (loading) {
    return (
      <Card className={`weather-card ${className}`} title={title}>
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
          <span className="ml-3 text-lg">Loading forecast...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`weather-card ${className}`} title={title}>
        <Alert
          message="Forecast Data Error"
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!forecast || forecast.length === 0) {
    return (
      <Card className={`weather-card ${className}`} title={title}>
        <div className="text-center text-gray-500 py-8">
          No forecast data available
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`weather-card ${className}`}
      title={title}
      bodyStyle={{ padding: "16px" }}
    >
      {/* Horizontal grid layout for forecast items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors min-h-[180px] sm:min-h-[200px]"
          >
            {/* Day and date */}
            <div className="text-center mb-2 sm:mb-3">
              <div className="font-medium text-gray-800 text-sm sm:text-base truncate">
                {index === 0 ? "Today" : day.day.split(",")[0]}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {new Date(day.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Weather icon and condition */}
            <div className="flex flex-col items-center mb-2 sm:mb-3 flex-1">
              <img
                src={getWeatherIconUrl(day.icon)}
                alt={day.condition}
                className="w-10 h-10 sm:w-12 sm:h-12 mb-1 sm:mb-2"
              />
              <div className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
                {day.condition}
              </div>
            </div>

            {/* Temperature range */}
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">
                {day.tempMax}°
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">/</span>
              <span className="text-gray-500 text-sm sm:text-base">
                {day.tempMin}°
              </span>
            </div>

            {/* Weather details */}
            <div className="flex flex-col gap-1 sm:gap-2 w-full">
              {/* Precipitation */}
              <div className="flex items-center justify-center gap-1">
                <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {Math.round(day.precipitation)}%
                </span>
              </div>

              {/* Wind */}
              <div className="flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {Math.round(day.windSpeed)} km/h
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-500">Avg High</div>
            <div className="font-semibold text-gray-800">
              {Math.round(
                forecast.reduce((sum, day) => sum + day.tempMax, 0) /
                  forecast.length
              )}
              °
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Avg Low</div>
            <div className="font-semibold text-gray-800">
              {Math.round(
                forecast.reduce((sum, day) => sum + day.tempMin, 0) /
                  forecast.length
              )}
              °
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Avg Rain</div>
            <div className="font-semibold text-gray-800">
              {Math.round(
                forecast.reduce((sum, day) => sum + day.precipitation, 0) /
                  forecast.length
              )}
              %
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
