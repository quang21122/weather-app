import { weatherColors } from "@/constants/theme";

/**
 * Utility function to combine CSS classes
 * Similar to clsx but simpler implementation
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Get weather-specific colors based on weather condition
 */
export const getWeatherColors = (weatherMain: string) => {
  const condition = weatherMain.toLowerCase();

  if (condition.includes("clear") || condition.includes("sun")) {
    return weatherColors.clear;
  }
  if (condition.includes("cloud")) {
    return weatherColors.clouds;
  }
  if (condition.includes("rain") || condition.includes("drizzle")) {
    return weatherColors.rain;
  }
  if (condition.includes("snow")) {
    return weatherColors.snow;
  }
  if (condition.includes("thunder")) {
    return weatherColors.thunderstorm;
  }
  if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    return weatherColors.mist;
  }

  return weatherColors.default;
};

/**
 * Generate dynamic gradient background based on weather
 */
export const getWeatherGradient = (weatherMain: string): string => {
  const colors = getWeatherColors(weatherMain);
  return `bg-gradient-to-br ${colors.background}`;
};

/**
 * Get weather icon URL from OpenWeatherMap
 */
export const getWeatherIconUrl = (
  iconCode: string,
  size: "2x" | "4x" = "2x"
): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Format temperature with unit
 */
export const formatTemperature = (
  temp: number,
  unit: "celsius" | "fahrenheit" | "kelvin" = "celsius"
): string => {
  const rounded = Math.round(temp);

  switch (unit) {
    case "fahrenheit":
      return `${Math.round((temp * 9) / 5 + 32)}°F`;
    case "kelvin":
      return `${Math.round(temp + 273.15)}K`;
    case "celsius":
    default:
      return `${rounded}°C`;
  }
};

/**
 * Format wind speed with unit
 */
export const formatWindSpeed = (
  speed: number,
  unit: "metric" | "imperial" = "metric"
): string => {
  if (unit === "imperial") {
    return `${Math.round(speed * 2.237)} mph`;
  }
  return `${Math.round(speed * 3.6)} km/h`;
};

/**
 * Format pressure value
 */
export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};

/**
 * Format humidity percentage
 */
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

/**
 * Format visibility distance
 */
export const formatVisibility = (
  visibility: number,
  unit: "metric" | "imperial" = "metric"
): string => {
  if (unit === "imperial") {
    const miles = visibility * 0.000621371;
    return `${miles.toFixed(1)} mi`;
  }
  return `${(visibility / 1000).toFixed(1)} km`;
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Format time from timestamp
 */
export const formatTime = (timestamp: number, timezone?: number): string => {
  const date = new Date((timestamp + (timezone || 0)) * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/**
 * Format date from timestamp
 */
export const formatDate = (timestamp: number, timezone?: number): string => {
  const date = new Date((timestamp + (timezone || 0)) * 1000);
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get time of day for styling (morning, afternoon, evening, night)
 */
export const getTimeOfDay = (
  timestamp: number,
  timezone?: number
): "morning" | "afternoon" | "evening" | "night" => {
  const date = new Date((timestamp + (timezone || 0)) * 1000);
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

/**
 * Generate responsive image sizes
 */
export const getResponsiveImageSizes = (baseSize: number) => ({
  sm: baseSize * 0.75,
  md: baseSize,
  lg: baseSize * 1.25,
  xl: baseSize * 1.5,
});

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
