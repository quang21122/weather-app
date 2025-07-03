import axios from "axios";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  LocationSearchResult,
  WeatherDisplayData,
  ForecastDisplayData,
  OneCallResponse,
} from "@/types/weather";
import {
  kelvinToCelsius,
  capitalizeWords,
  formatDate,
  msToKmh,
} from "@/utils/weather";

// API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const GEOCODING_URL = import.meta.env.VITE_GEOCODING_BASE_URL;

// Create axios instance
const weatherClient = axios.create({
  timeout: 10000,
});

// API endpoints
const endpoints = {
  currentWeather: (lat: number, lon: number) =>
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  currentWeatherByCity: (city: string) =>
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`,
  forecast: (lat: number, lon: number) =>
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  forecastByCity: (city: string) =>
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`,
  oneCall: (lat: number, lon: number) =>
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`,
  geocoding: (query: string, limit: number = 5) =>
    `${GEOCODING_URL}/direct?q=${query}&limit=${limit}&appid=${API_KEY}`,
  reverseGeocoding: (lat: number, lon: number) =>
    `${GEOCODING_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
};

/**
 * Transform raw weather data to display format
 */
const transformWeatherData = (
  data: CurrentWeatherResponse
): WeatherDisplayData => {
  return {
    location: data.name,
    country: data.sys.country,
    temperature: kelvinToCelsius(data.main.temp),
    feelsLike: kelvinToCelsius(data.main.feels_like),
    condition: data.weather[0].main,
    description: capitalizeWords(data.weather[0].description),
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: msToKmh(data.wind.speed),
    windDirection: data.wind.deg,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000, // Convert to km
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    lastUpdated: data.dt,
  };
};

/**
 * Transform forecast data to display format with enhanced 7-day support
 */
const transformForecastData = (
  data: ForecastResponse
): ForecastDisplayData[] => {
  // Group forecast by day and collect all data points for each day
  const dailyData = new Map<
    string,
    {
      items: (typeof data.list)[0][];
      date: Date;
    }
  >();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();

    if (!dailyData.has(dateKey)) {
      dailyData.set(dateKey, { items: [], date });
    }
    dailyData.get(dateKey)!.items.push(item);
  });

  // Transform each day's data
  const dailyForecasts: ForecastDisplayData[] = [];

  for (const [, dayData] of dailyData) {
    const { items } = dayData;

    // Find the best representative item (prefer noon, fallback to closest to noon)
    let bestItem = items[0];
    let bestScore = Math.abs(new Date(bestItem.dt * 1000).getHours() - 12);

    for (const item of items) {
      const hour = new Date(item.dt * 1000).getHours();
      const score = Math.abs(hour - 12);
      if (score < bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }

    // Calculate daily min/max temperatures from all items
    const temps = items.map((item) => item.main.temp);
    const tempMax = Math.max(...temps);
    const tempMin = Math.min(...temps);

    // Calculate average precipitation probability
    const avgPrecipitation =
      items.reduce((sum, item) => sum + item.pop, 0) / items.length;

    dailyForecasts.push({
      date: bestItem.dt_txt,
      day: formatDate(bestItem.dt),
      tempMax: kelvinToCelsius(tempMax),
      tempMin: kelvinToCelsius(tempMin),
      condition: bestItem.weather[0].main,
      icon: bestItem.weather[0].icon,
      humidity: bestItem.main.humidity,
      windSpeed: msToKmh(bestItem.wind.speed),
      precipitation: avgPrecipitation * 100, // Convert to percentage
    });
  }

  // Sort by date and return up to 7 days
  return dailyForecasts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 7);
};

/**
 * Transform One Call API daily forecast data to display format
 */
const transformOneCallForecastData = (
  data: OneCallResponse
): ForecastDisplayData[] => {
  return data.daily.slice(0, 7).map((item) => ({
    date: new Date(item.dt * 1000).toISOString(),
    day: formatDate(item.dt),
    tempMax: kelvinToCelsius(item.temp.max),
    tempMin: kelvinToCelsius(item.temp.min),
    condition: item.weather[0].main,
    icon: item.weather[0].icon,
    humidity: item.humidity,
    windSpeed: msToKmh(item.wind_speed),
    precipitation: item.pop * 100, // Convert to percentage
    uvIndex: item.uvi,
    sunrise: item.sunrise,
    sunset: item.sunset,
  }));
};

/**
 * Weather API service
 */
export const weatherApi = {
  /**
   * Get current weather by coordinates
   */
  getCurrentWeather: async (
    lat: number,
    lon: number
  ): Promise<WeatherDisplayData> => {
    try {
      const response = await weatherClient.get<CurrentWeatherResponse>(
        endpoints.currentWeather(lat, lon)
      );
      return transformWeatherData(response.data);
    } catch (error: any) {
      console.error("Error fetching current weather:", error);

      if (error.response?.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OpenWeatherMap API key configuration."
        );
      }
      if (error.response?.status === 404) {
        throw new Error("Location not found. Please check the coordinates.");
      }
      if (error.response?.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (error.code === "ENOTFOUND" || error.code === "NETWORK_ERROR") {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }

      throw new Error(
        "Failed to fetch current weather data. Please try again."
      );
    }
  },

  /**
   * Get current weather by city name
   */
  getCurrentWeatherByCity: async (
    city: string
  ): Promise<WeatherDisplayData> => {
    try {
      const response = await weatherClient.get<CurrentWeatherResponse>(
        endpoints.currentWeatherByCity(city)
      );
      return transformWeatherData(response.data);
    } catch (error: any) {
      console.error("Error fetching weather by city:", error);

      if (error.response?.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OpenWeatherMap API key configuration."
        );
      }
      if (error.response?.status === 404) {
        throw new Error(
          `City "${city}" not found. Please check the spelling or try a different city.`
        );
      }
      if (error.response?.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (error.code === "ENOTFOUND" || error.code === "NETWORK_ERROR") {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }

      throw new Error(
        `Failed to fetch weather data for ${city}. Please try again.`
      );
    }
  },

  /**
   * Get weather forecast by coordinates
   */
  getForecast: async (
    lat: number,
    lon: number
  ): Promise<ForecastDisplayData[]> => {
    try {
      const response = await weatherClient.get<ForecastResponse>(
        endpoints.forecast(lat, lon)
      );
      return transformForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw new Error("Failed to fetch forecast data");
    }
  },

  /**
   * Get weather forecast by city name
   */
  getForecastByCity: async (city: string): Promise<ForecastDisplayData[]> => {
    try {
      const response = await weatherClient.get<ForecastResponse>(
        endpoints.forecastByCity(city)
      );
      return transformForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast by city:", error);
      throw new Error(`Failed to fetch forecast data for ${city}`);
    }
  },

  /**
   * Get enhanced 7-day weather forecast by coordinates
   * Uses One Call API 3.0 if available, falls back to enhanced 5-day forecast
   */
  getEnhancedForecast: async (
    lat: number,
    lon: number
  ): Promise<ForecastDisplayData[]> => {
    try {
      // Try One Call API 3.0 first
      const response = await weatherClient.get<OneCallResponse>(
        endpoints.oneCall(lat, lon)
      );
      return transformOneCallForecastData(response.data);
    } catch (error: any) {
      console.warn(
        "One Call API 3.0 not available, falling back to 5-day forecast:",
        error.response?.status
      );

      // Fall back to enhanced 5-day forecast
      try {
        const response = await weatherClient.get<ForecastResponse>(
          endpoints.forecast(lat, lon)
        );
        return transformForecastData(response.data);
      } catch (fallbackError) {
        console.error("Error fetching fallback forecast:", fallbackError);
        throw new Error("Failed to fetch forecast data");
      }
    }
  },

  /**
   * Get enhanced 7-day weather forecast by city name
   * First resolves city to coordinates, then uses enhanced forecast
   */
  getEnhancedForecastByCity: async (
    city: string
  ): Promise<ForecastDisplayData[]> => {
    try {
      // First, get coordinates for the city
      const locations = await weatherApi.searchLocations(city);
      if (locations.length === 0) {
        throw new Error(`City "${city}" not found`);
      }

      const { lat, lon } = locations[0];
      return await weatherApi.getEnhancedForecast(lat, lon);
    } catch (error) {
      console.error("Error fetching enhanced forecast by city:", error);
      throw new Error(`Failed to fetch enhanced forecast data for ${city}`);
    }
  },

  /**
   * Search for locations by query
   */
  searchLocations: async (query: string): Promise<LocationSearchResult[]> => {
    try {
      const response = await weatherClient.get<LocationSearchResult[]>(
        endpoints.geocoding(query)
      );
      return response.data;
    } catch (error) {
      console.error("Error searching locations:", error);
      throw new Error("Failed to search locations");
    }
  },

  /**
   * Get location name by coordinates (reverse geocoding)
   */
  getLocationByCoordinates: async (
    lat: number,
    lon: number
  ): Promise<LocationSearchResult | null> => {
    try {
      const response = await weatherClient.get<LocationSearchResult[]>(
        endpoints.reverseGeocoding(lat, lon)
      );
      return response.data[0] || null;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return null;
    }
  },
};
