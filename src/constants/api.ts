// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEO_URL: 'https://api.openweathermap.org/geo/1.0',
  ICON_URL: 'https://openweathermap.org/img/wn',
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
  DEFAULT_UNITS: 'metric',
  DEFAULT_LANG: 'en',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  GEOCODING: '/direct',
  REVERSE_GEOCODING: '/reverse',
} as const;

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;

// Cache duration in milliseconds
export const CACHE_DURATION = {
  WEATHER: 10 * 60 * 1000, // 10 minutes
  FORECAST: 30 * 60 * 1000, // 30 minutes
  GEOCODING: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// Rate limiting
export const RATE_LIMIT = {
  REQUESTS_PER_MINUTE: 60,
  REQUESTS_PER_HOUR: 1000,
} as const;
