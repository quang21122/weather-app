import { useState } from "react";
import { Button, Typography } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Layout,
  LocationSearch,
  WeatherCard,
  EmptyState,
  ErrorMessage,
} from "@/components";
import type { LocationData, WeatherData } from "@/types";

const { Title, Text } = Typography;

// Mock weather data for demonstration
const mockWeatherData: WeatherData = {
  coord: { lon: -74.006, lat: 40.7128 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 22,
    feels_like: 24,
    temp_min: 18,
    temp_max: 26,
    pressure: 1013,
    humidity: 65,
  },
  visibility: 10000,
  wind: {
    speed: 3.5,
    deg: 180,
  },
  clouds: {
    all: 0,
  },
  dt: 1640995200,
  sys: {
    country: "US",
    sunrise: 1640952000,
    sunset: 1640988000,
  },
  timezone: -18000,
  id: 5128581,
  name: "New York",
  cod: 200,
};

const HomePage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = async (location: LocationData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set mock data with selected location
      setWeather({
        ...mockWeatherData,
        name: location.name,
        sys: { ...mockWeatherData.sys, country: location.country },
        coord: { lon: location.lon, lat: location.lat },
      });
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!weather) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update with fresh data (in real app, this would be an API call)
      setWeather({
        ...weather,
        main: {
          ...weather.main,
          temp: weather.main.temp + (Math.random() - 0.5) * 4, // Random variation
        },
      });
    } catch (err) {
      setError("Failed to refresh weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSelect({
            name: "Current Location",
            country: "Unknown",
            lat: latitude,
            lon: longitude,
          });
        },
        () => {
          setError(
            "Unable to get your location. Please search for a city instead."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Layout title="Weather App">
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Title
            level={1}
            className="!text-white !mb-4 text-4xl md:text-5xl font-bold"
          >
            Weather Forecast
          </Title>
          <Text className="text-white/80 text-lg md:text-xl">
            Get real-time weather information for any location
          </Text>
        </div>

        {/* Search Section */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            loading={loading}
            className="w-full max-w-lg"
          />

          <Button
            type="primary"
            icon={<EnvironmentOutlined />}
            onClick={handleGetCurrentLocation}
            loading={loading}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Use Current Location
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex justify-center">
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => setError(null)}
              className="max-w-md"
            />
          )}

          {!error && !weather && !loading && (
            <EmptyState
              title="Welcome to Weather App"
              description="Search for a city or use your current location to get started"
              icon={
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm">
                  <SearchOutlined className="text-3xl text-white/60" />
                </div>
              }
            />
          )}

          {weather && (
            <div className="w-full max-w-md">
              <WeatherCard
                weather={weather}
                loading={loading}
                onRefresh={handleRefresh}
                showDetails={true}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
