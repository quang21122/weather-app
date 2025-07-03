import React from "react";
import { Card, Spin } from "antd";
import { MapPin } from "lucide-react";
import { FixedSizeList as List } from "react-window";
import { useMultipleCitiesWeather } from "@/hooks/useWeather";
import { POPULAR_CITIES } from "@/constants/cities";
import { getWeatherIconUrl } from "@/utils/weather";
import type { PopularCity } from "@/types/weather";

interface PopularCitiesProps {
  onCitySelect: (city: PopularCity) => void;
  className?: string;
  title?: string;
}

interface CityItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    cities: PopularCity[];
    weatherQueries: ReturnType<typeof useMultipleCitiesWeather>;
    onCitySelect: (city: PopularCity) => void;
  };
}

// Individual city item component for virtualization
const CityItem: React.FC<CityItemProps> = ({ index, style, data }) => {
  const { cities, weatherQueries, onCitySelect } = data;
  const city = cities[index];
  const weatherQuery = weatherQueries[index];
  const { data: weather, isLoading, error } = weatherQuery;

  const handleCityClick = () => {
    onCitySelect(city);
  };

  return (
    <div style={style}>
      <div
        onClick={handleCityClick}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group mx-3 mb-3"
      >
        {/* City info */}
        <div className="flex items-center gap-3 flex-1">
          <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
          <div>
            <div className="font-medium text-gray-800 group-hover:text-blue-600">
              {city.name}
            </div>
            <div className="text-sm text-gray-500">{city.country}</div>
          </div>
        </div>

        {/* Weather info */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Spin size="small" />
          ) : error ? (
            <div className="text-xs text-red-500">Error</div>
          ) : weather ? (
            <>
              <img
                src={getWeatherIconUrl(weather.icon)}
                alt={weather.description}
                className="w-8 h-8"
              />
              <div className="text-right">
                <div className="font-semibold text-gray-800">
                  {weather.temperature}°
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {weather.condition}
                </div>
              </div>
            </>
          ) : (
            <div className="text-xs text-gray-400">No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PopularCities: React.FC<PopularCitiesProps> = ({
  onCitySelect,
  className = "",
  title = "Popular Cities",
}) => {
  const cityNames = POPULAR_CITIES.map((city) => city.name);
  const weatherQueries = useMultipleCitiesWeather(cityNames);

  const handleCityClick = (city: PopularCity) => {
    onCitySelect(city);
  };

  // Constants for virtualization
  const ITEM_HEIGHT = 72; // Height of each city item (including margin)
  const VISIBLE_ITEMS = 5; // Number of items to show at once
  const LIST_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS; // Total height for 4 items

  // Data to pass to virtualized items
  const itemData = {
    cities: POPULAR_CITIES,
    weatherQueries,
    onCitySelect: handleCityClick,
  };

  return (
    <Card
      className={`weather-card ${className}`}
      title={title}
      styles={{ body: { padding: "16px" } }}
    >
      {/* Virtualized list container */}
      <div className="relative">
        <List
          height={LIST_HEIGHT}
          itemCount={POPULAR_CITIES.length}
          itemSize={ITEM_HEIGHT}
          itemData={itemData}
          width="100%"
        >
          {CityItem}
        </List>
      </div>
    </Card>
  );
};
