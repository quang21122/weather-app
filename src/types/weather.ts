// Weather data interfaces
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CloudsData {
  all: number;
}

export interface RainData {
  '1h'?: number;
  '3h'?: number;
}

export interface SnowData {
  '1h'?: number;
  '3h'?: number;
}

export interface SystemData {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  rain?: RainData;
  snow?: SnowData;
  dt: number;
  sys: SystemData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Forecast interfaces
export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: CloudsData;
  wind: WindData;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: RainData;
  snow?: SnowData;
  sys: {
    pod: string; // Part of day (n-night, d-day)
  };
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Location interfaces
export interface LocationData {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// API response interfaces
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

// Weather units
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';
export type SpeedUnit = 'metric' | 'imperial';

// Weather display preferences
export interface WeatherPreferences {
  temperatureUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  showFeelsLike: boolean;
  showHumidity: boolean;
  showPressure: boolean;
  showWind: boolean;
  showVisibility: boolean;
}
