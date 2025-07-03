import { useState, useEffect } from "react";
import { Row, Col, Button, message } from "antd";
import { MapPin, RefreshCw } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/ui/SearchBar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { ForecastCard } from "@/components/weather/ForecastCard";
import { PopularCities } from "@/components/weather/PopularCities";
import { useCurrentWeather, useEnhancedForecast } from "@/hooks/useWeather";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { LocationSearchResult, PopularCity } from "@/types/weather";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  // Geolocation hook
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
    getCurrentPosition,
  } = useGeolocation();

  // Weather data hooks
  const {
    data: currentWeather,
    isLoading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useCurrentWeather(
    selectedLocation?.lat || latitude || 0,
    selectedLocation?.lon || longitude || 0,
    !!(selectedLocation || (latitude && longitude))
  );

  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
    refetch: refetchForecast,
  } = useEnhancedForecast(
    selectedLocation?.lat || latitude || 0,
    selectedLocation?.lon || longitude || 0,
    !!(selectedLocation || (latitude && longitude))
  );

  // Handle location selection from search
  const handleLocationSelect = (location: LocationSearchResult) => {
    setSelectedLocation({
      lat: location.lat,
      lon: location.lon,
      name: `${location.name}, ${location.country}`,
    });
    message.success(`Đã tải dữ liệu thời tiết cho ${location.name}`);
  };

  // Handle popular city selection
  const handleCitySelect = (city: PopularCity) => {
    setSelectedLocation({
      lat: city.coordinates.lat,
      lon: city.coordinates.lon,
      name: `${city.name}, ${city.country}`,
    });
    message.success(`Đã tải dữ liệu thời tiết cho ${city.name}`);
  };

  // Handle current location
  const handleCurrentLocation = () => {
    setSelectedLocation(null);
    getCurrentPosition();
    message.info("Đang lấy vị trí hiện tại của bạn...");
  };

  // Handle refresh
  const handleRefresh = () => {
    refetchWeather();
    refetchForecast();
    message.success("Đã cập nhật dữ liệu thời tiết");
  };

  // Show geolocation error and provide fallback
  useEffect(() => {
    if (geoError) {
      message.warning(
        `Không thể lấy vị trí hiện tại: ${geoError}. Sử dụng vị trí mặc định.`
      );
      // Set fallback location when geolocation fails
      if (!selectedLocation) {
        setSelectedLocation({
          lat: 51.5074,
          lon: -0.1278,
          name: "London, GB",
        });
      }
    }
  }, [geoError, selectedLocation]);

  // Set current location when available
  useEffect(() => {
    if (latitude && longitude && !selectedLocation) {
      // Only auto-set if no location is manually selected
      message.success("Đã lấy được vị trí hiện tại của bạn");
    }
  }, [latitude, longitude, selectedLocation]);

  // Fallback to default location if geolocation takes too long or fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedLocation && !latitude && !longitude && !geoLoading) {
        setSelectedLocation({
          lat: 51.5074,
          lon: -0.1278,
          name: "London, GB",
        });
        message.info(
          "Sử dụng vị trí mặc định. Bạn có thể tìm kiếm vị trí khác."
        );
      }
    }, 5000); // Wait 5 seconds for geolocation

    return () => clearTimeout(timer);
  }, [selectedLocation, latitude, longitude, geoLoading]);

  return (
    <ErrorBoundary>
      <AppLayout showHeaderRefresh={true} onHeaderRefresh={handleRefresh}>
        <div className="space-y-6">
          {/* Search and controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="flex-1 w-full">
              <SearchBar
                onLocationSelect={handleLocationSelect}
                className="w-full sm:max-w-md"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                type="default"
                icon={<MapPin className="w-4 h-4" />}
                onClick={handleCurrentLocation}
                loading={geoLoading}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                size="large"
              >
                <span className="hidden sm:inline">Current location</span>
              </Button>
              <Button
                type="primary"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleRefresh}
                loading={weatherLoading || forecastLoading}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                size="large"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Main content grid */}
          <Row gutter={[16, 16]} className="sm:gutter-24">
            {/* Current weather */}
            <Col xs={24} lg={16} className="order-1">
              <WeatherCard
                weather={currentWeather}
                loading={weatherLoading}
                error={weatherError?.message}
                className="h-full"
              />
            </Col>

            {/* Popular cities */}
            <Col xs={24} lg={8} className="order-3 lg:order-2">
              <PopularCities
                onCitySelect={handleCitySelect}
                className="h-full"
              />
            </Col>

            {/* Forecast */}
            <Col xs={24} className="order-2 lg:order-3">
              <ForecastCard
                forecast={forecast}
                loading={forecastLoading}
                error={forecastError?.message}
              />
            </Col>
          </Row>
        </div>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
