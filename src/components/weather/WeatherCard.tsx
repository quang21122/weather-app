import React from "react";
import { Card, Spin, Alert } from "antd";
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
} from "lucide-react";
import type { WeatherDisplayData } from "@/types/weather";
import { formatTime, getWeatherIconUrl } from "@/utils/weather";

interface WeatherCardProps {
  weather?: WeatherDisplayData;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  loading = false,
  error = null,
  className = "",
}) => {
  if (loading) {
    return (
      <Card className={`weather-card ${className}`}>
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
          <span className="ml-3 text-lg">Loading weather data...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`weather-card ${className}`}>
        <Alert
          message="Weather Data Error"
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className={`weather-card ${className}`}>
        <div className="text-center text-gray-500 py-8">
          No weather data available
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`weather-card ${className}`}
      bodyStyle={{ padding: "24px" }}
    >
      {/* Header with location */}
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {weather.location}
          </h2>
          <p className="text-sm text-gray-500">{weather.country}</p>
        </div>
      </div>

      {/* Main weather display */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <img
            src={getWeatherIconUrl(weather.icon, "4x")}
            alt={weather.description}
            className="w-16 h-16 sm:w-20 sm:h-20 float-animation"
          />
          <div className="flex-1">
            <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
              {weather.temperature}°
            </div>
            <div className="text-base sm:text-lg text-gray-600 capitalize mb-1">
              {weather.description}
            </div>
            <div className="text-sm text-gray-500">
              Feels like {weather.feelsLike}°
            </div>
          </div>
        </div>
      </div>

      {/* Weather metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Humidity</div>
            <div className="font-semibold">{weather.humidity}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <Wind className="w-5 h-5 text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Wind</div>
            <div className="font-semibold">{weather.windSpeed} km/h</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <Gauge className="w-5 h-5 text-purple-500" />
          <div>
            <div className="text-sm text-gray-500">Pressure</div>
            <div className="font-semibold">{weather.pressure} hPa</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
          <Eye className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-sm text-gray-500">Visibility</div>
            <div className="font-semibold">{weather.visibility} km</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
          <Sunrise className="w-5 h-5 text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500">Sunrise</div>
            <div className="font-semibold">{formatTime(weather.sunrise)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
          <Sunset className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Sunset</div>
            <div className="font-semibold">{formatTime(weather.sunset)}</div>
          </div>
        </div>
      </div>

      {/* Last updated */}
      <div className="text-xs text-gray-400 text-center">
        Last updated: {new Date(weather.lastUpdated * 1000).toLocaleString()}
      </div>
    </Card>
  );
};
