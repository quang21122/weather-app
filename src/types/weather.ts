// Weather data type definitions

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
  "1h"?: number;
  "3h"?: number;
}

export interface SnowData {
  "1h"?: number;
  "3h"?: number;
}

export interface SysData {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CoordinatesData {
  lon: number;
  lat: number;
}

export interface CurrentWeatherResponse {
  coord: CoordinatesData;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  rain?: RainData;
  snow?: SnowData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: CloudsData;
  wind: WindData;
  visibility: number;
  pop: number;
  rain?: RainData;
  snow?: SnowData;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: CoordinatesData;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface LocationSearchResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherDisplayData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex?: number;
  sunrise: number;
  sunset: number;
  lastUpdated: number;
}

export interface ForecastDisplayData {
  date: string;
  day: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex?: number;
  sunrise?: number;
  sunset?: number;
}

// One Call API response types
export interface OneCallDailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OneCallDailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OneCallDailyItem {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: OneCallDailyTemp;
  feels_like: OneCallDailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: any; // We'll focus on daily for now
  minutely?: any[];
  hourly?: any[];
  daily: OneCallDailyItem[];
  alerts?: any[];
}

export interface PopularCity {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}
