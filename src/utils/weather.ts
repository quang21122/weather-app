// Weather utility functions

/**
 * Convert temperature from Kelvin to Celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Convert temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5) + 32);
};

/**
 * Convert wind speed from m/s to km/h
 */
export const msToKmh = (ms: number): number => {
  return Math.round(ms * 3.6);
};

/**
 * Convert wind direction from degrees to cardinal direction
 */
export const degreeToCardinal = (degree: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
};

/**
 * Format timestamp to readable time
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format timestamp to readable date
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get weather icon URL from OpenWeatherMap
 */
export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '2x'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Get time of day based on current time and sunrise/sunset
 */
export const getTimeOfDay = (currentTime: number, sunrise: number, sunset: number): 'day' | 'night' => {
  return currentTime >= sunrise && currentTime <= sunset ? 'day' : 'night';
};
