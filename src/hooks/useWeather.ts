import { useQuery, useQueries } from "@tanstack/react-query";
import { weatherApi } from "@/lib/api/weather";
import type {
  WeatherDisplayData,
  ForecastDisplayData,
  LocationSearchResult,
} from "@/types/weather";

// Query keys
export const weatherKeys = {
  all: ["weather"] as const,
  current: () => [...weatherKeys.all, "current"] as const,
  currentByCoords: (lat: number, lon: number) =>
    [...weatherKeys.current(), lat, lon] as const,
  currentByCity: (city: string) => [...weatherKeys.current(), city] as const,
  forecast: () => [...weatherKeys.all, "forecast"] as const,
  forecastByCoords: (lat: number, lon: number) =>
    [...weatherKeys.forecast(), lat, lon] as const,
  forecastByCity: (city: string) => [...weatherKeys.forecast(), city] as const,
  search: () => [...weatherKeys.all, "search"] as const,
  searchLocations: (query: string) => [...weatherKeys.search(), query] as const,
};

/**
 * Hook to get current weather by coordinates
 */
export const useCurrentWeather = (
  lat: number,
  lon: number,
  enabled: boolean = true
) => {
  return useQuery<WeatherDisplayData, Error>({
    queryKey: weatherKeys.currentByCoords(lat, lon),
    queryFn: () => weatherApi.getCurrentWeather(lat, lon),
    enabled: enabled && !!(lat && lon),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get current weather by city name
 */
export const useCurrentWeatherByCity = (
  city: string,
  enabled: boolean = true
) => {
  return useQuery<WeatherDisplayData, Error>({
    queryKey: weatherKeys.currentByCity(city),
    queryFn: () => weatherApi.getCurrentWeatherByCity(city),
    enabled: enabled && !!city,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get weather forecast by coordinates
 */
export const useForecast = (
  lat: number,
  lon: number,
  enabled: boolean = true
) => {
  return useQuery<ForecastDisplayData[], Error>({
    queryKey: weatherKeys.forecastByCoords(lat, lon),
    queryFn: () => weatherApi.getForecast(lat, lon),
    enabled: enabled && !!(lat && lon),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to get weather forecast by city name
 */
export const useForecastByCity = (city: string, enabled: boolean = true) => {
  return useQuery<ForecastDisplayData[], Error>({
    queryKey: weatherKeys.forecastByCity(city),
    queryFn: () => weatherApi.getForecastByCity(city),
    enabled: enabled && !!city,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to get enhanced 7-day weather forecast by coordinates
 * Uses One Call API 3.0 if available, falls back to enhanced 5-day forecast
 */
export const useEnhancedForecast = (
  lat: number,
  lon: number,
  enabled: boolean = true
) => {
  return useQuery<ForecastDisplayData[], Error>({
    queryKey: [...weatherKeys.forecast(), "enhanced", lat, lon],
    queryFn: () => weatherApi.getEnhancedForecast(lat, lon),
    enabled: enabled && !!(lat && lon),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to get enhanced 7-day weather forecast by city name
 */
export const useEnhancedForecastByCity = (
  city: string,
  enabled: boolean = true
) => {
  return useQuery<ForecastDisplayData[], Error>({
    queryKey: [...weatherKeys.forecast(), "enhanced", city],
    queryFn: () => weatherApi.getEnhancedForecastByCity(city),
    enabled: enabled && !!city,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to search for locations
 */
export const useLocationSearch = (query: string, enabled: boolean = true) => {
  return useQuery<LocationSearchResult[], Error>({
    queryKey: weatherKeys.searchLocations(query),
    queryFn: () => weatherApi.searchLocations(query),
    enabled: enabled && query.length >= 2, // Only search if query is at least 2 characters
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook to get multiple city weather data (for popular cities)
 */
export const useMultipleCitiesWeather = (
  cities: string[],
  enabled: boolean = true
) => {
  return useQueries({
    queries: cities.map((city) => ({
      queryKey: weatherKeys.currentByCity(city),
      queryFn: () => weatherApi.getCurrentWeatherByCity(city),
      enabled: enabled && !!city,
      staleTime: 5 * 60 * 1000,
    })),
  });
};
