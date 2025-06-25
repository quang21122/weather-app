import type { ReactNode } from "react";
import type {
  WeatherData,
  ForecastData,
  LocationData,
  TemperatureUnit,
  SpeedUnit,
} from "./weather";

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export interface HeaderProps extends BaseComponentProps {
  title: string;
  onSettingsClick?: () => void;
  onLocationClick?: () => void;
}

export interface FooterProps extends BaseComponentProps {
  showCredits?: boolean;
}

// Weather component props
export interface WeatherCardProps extends BaseComponentProps {
  weather: WeatherData;
  temperatureUnit?: TemperatureUnit;
  speedUnit?: SpeedUnit;
  showDetails?: boolean;
  onRefresh?: () => void;
  loading?: boolean;
}

export interface WeatherDetailsProps extends BaseComponentProps {
  weather: WeatherData;
  temperatureUnit?: TemperatureUnit;
  speedUnit?: SpeedUnit;
}

export interface ForecastCardProps extends BaseComponentProps {
  forecast: ForecastData;
  temperatureUnit?: TemperatureUnit;
  maxItems?: number;
}

export interface ForecastItemProps extends BaseComponentProps {
  item: ForecastData["list"][0];
  temperatureUnit?: TemperatureUnit;
  isCompact?: boolean;
}

// Search component props
export interface LocationSearchProps extends BaseComponentProps {
  onLocationSelect: (location: LocationData) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface LocationSuggestionProps extends BaseComponentProps {
  location: LocationData;
  onClick: (location: LocationData) => void;
  isSelected?: boolean;
}

// UI component props
export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: "small" | "medium" | "large";
  text?: string;
  overlay?: boolean;
}

export interface ErrorMessageProps extends BaseComponentProps {
  message: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  type?: "error" | "warning" | "info";
}

export interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export interface WeatherIconProps extends BaseComponentProps {
  iconCode: string;
  size?: number;
  alt?: string;
  animated?: boolean;
}

// Settings component props
export interface SettingsModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: WeatherSettings) => void;
  currentSettings: WeatherSettings;
}

export interface WeatherSettings {
  temperatureUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
  showNotifications: boolean;
  theme: "light" | "dark" | "auto";
  defaultLocation?: LocationData;
}

// Hook return types
export interface UseWeatherReturn {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (location: LocationData) => Promise<void>;
  refreshWeather: () => Promise<void>;
}

export interface UseLocationReturn {
  currentLocation: LocationData | null;
  loading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
  searchLocations: (query: string) => Promise<LocationData[]>;
}

export interface UseSettingsReturn {
  settings: WeatherSettings;
  updateSettings: (newSettings: Partial<WeatherSettings>) => void;
  resetSettings: () => void;
}

// Form component props
export interface SearchFormProps extends BaseComponentProps {
  onSubmit: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

// Navigation component props
export interface NavigationProps extends BaseComponentProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

// Modal component props
export interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  width?: number | string;
  centered?: boolean;
}
