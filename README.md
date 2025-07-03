# Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information, forecasts, and explore weather conditions for cities worldwide with an intuitive and beautiful interface.

## Features

- 🌤️ **Current Weather Conditions** - Real-time weather data with detailed metrics
- 📅 **7-Day Weather Forecast** - Extended forecasts using OpenWeatherMap One Call API
- 🔍 **Smart City Search** - Autocomplete search with debounced API calls
- 🌍 **Popular Cities** - Quick access to major cities with virtualized scrolling
- 📍 **Geolocation Support** - Automatic location detection with user permission
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean interface with Ant Design components and glass morphism effects
- ⚡ **Fast Performance** - Optimized with TanStack Query caching and code splitting
- 🔄 **Real-time Updates** - Automatic data refresh and error recovery
- 🛡️ **Error Handling** - Comprehensive error boundaries and user-friendly messages

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite with optimized build configuration
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Ant Design (antd)
- **State Management**: TanStack Query (React Query) for server state
- **HTTP Client**: Axios with custom interceptors
- **Icons**: Lucide React for modern iconography
- **Virtualization**: React Window for performance optimization
- **Package Manager**: pnpm for fast, efficient dependency management
- **Weather API**: OpenWeatherMap API (Current Weather, One Call 3.0, Geocoding)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:

```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

5. Start the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory, ready for static hosting.

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```text
src/
├── components/          # React components
│   ├── layout/         # Layout components (AppLayout, Header)
│   ├── ui/             # Reusable UI components (SearchBar, ErrorBoundary)
│   └── weather/        # Weather-specific components (WeatherCard, ForecastCard, PopularCities)
├── hooks/              # Custom React hooks (useWeather, useGeolocation)
├── lib/                # External service integrations
│   ├── api/           # API service functions (weather.ts)
│   └── query/         # TanStack Query configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (weather helpers)
├── constants/          # App constants and configuration (cities.ts)
└── assets/            # Static assets
```

## API Integration

This app integrates with multiple OpenWeatherMap API endpoints for comprehensive weather data:

- **Current Weather API**: Real-time weather conditions for any location
- **One Call API 3.0**: Enhanced 7-day forecasts with detailed daily data (falls back to 5-day forecast)
- **5-Day Forecast API**: Weather predictions with 3-hour intervals (fallback option)
- **Geocoding API**: Location search and coordinate resolution with autocomplete
- **Reverse Geocoding**: Get location names from coordinates for geolocation features

### API Key Setup

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Generate an API key from your dashboard
3. Add the API key to your `.env` file:

   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

**Note**: The app automatically tries to use One Call API 3.0 for enhanced forecasts and gracefully falls back to the standard 5-day forecast if the premium API is not available.

## Features in Detail

### 🌤️ Current Weather Display

- Real-time temperature and weather conditions
- "Feels like" temperature with heat index
- Humidity, wind speed, and atmospheric pressure
- Visibility and UV index (when available)
- Sunrise and sunset times
- Weather icons from OpenWeatherMap
- Location-based weather with coordinates display

### 📅 7-Day Weather Forecast

- Enhanced daily weather predictions using One Call API 3.0
- High and low temperatures with detailed ranges
- Weather conditions with descriptive icons
- Precipitation probability and amounts
- Wind speed and direction information
- Fallback to 5-day forecast when premium API unavailable

### 🔍 Smart Location Search

- Real-time autocomplete city search with debouncing
- Support for city, state, and country combinations
- Intelligent search suggestions with location details
- Error handling for invalid or unavailable locations
- Search results limited to prevent API overuse

### 🌍 Popular Cities

- Quick access to major cities worldwide
- Real-time weather display for each city
- Virtualized scrolling for optimal performance
- One-click weather viewing with smooth transitions
- Responsive grid layout adapting to screen size

### 📍 Geolocation Support

- Automatic location detection on app startup
- User permission-based location access
- Fallback handling for denied permissions
- Manual location refresh capability
- Error handling for unsupported browsers

### 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth animations and transitions

### 🛡️ Error Handling

- Comprehensive error boundaries
- Network error detection
- API key validation
- User-friendly error messages
- Retry mechanisms

## Performance Optimizations

- **Code Splitting**: Automatic chunk splitting with vendor, antd, and query bundles
- **Intelligent Caching**: TanStack Query with configurable stale times (5-10 minutes)
- **Debounced Search**: 300ms debouncing on search input to minimize API calls
- **Virtualization**: React Window for popular cities list to handle large datasets
- **Bundle Optimization**: Tree shaking, minification, and optimized asset loading
- **Lazy Loading**: Components and routes loaded on demand
- **API Optimization**: Efficient endpoint selection and fallback strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Environment Variables

| Variable                    | Description            | Required | Default                                   |
| --------------------------- | ---------------------- | -------- | ----------------------------------------- |
| `VITE_OPENWEATHER_API_KEY`  | OpenWeatherMap API key | Yes      | -                                         |
| `VITE_OPENWEATHER_BASE_URL` | API base URL           | No       | `https://api.openweathermap.org/data/2.5` |
| `VITE_GEOCODING_BASE_URL`   | Geocoding API URL      | No       | `https://api.openweathermap.org/geo/1.0`  |
| `VITE_APP_NAME`             | Application name       | No       | `Weather App`                             |
| `VITE_DEFAULT_CITY`         | Default city           | No       | `London`                                  |
| `VITE_DEFAULT_COUNTRY`      | Default country        | No       | `GB`                                      |

## Troubleshooting

### Common Issues

1. **API Key Errors**

   - Ensure your API key is valid and active
   - Check that the key is correctly set in `.env`
   - Verify the key has the necessary permissions

2. **Location Not Found**

   - Try different spelling variations
   - Include country code for better results
   - Use major city names when possible

3. **Network Errors**

   - Check your internet connection
   - Verify firewall settings
   - Try refreshing the page

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check Node.js version compatibility
   - Ensure all dependencies are up to date

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint (if configured)

### Code Structure

```text
src/
├── components/          # React components
│   ├── layout/         # Layout components (AppLayout, Header)
│   ├── ui/             # Reusable UI components (SearchBar, ErrorBoundary, LoadingSkeleton)
│   └── weather/        # Weather-specific components (WeatherCard, ForecastCard, PopularCities)
├── hooks/              # Custom React hooks (useWeather, useGeolocation)
├── lib/                # External service integrations
│   ├── api/           # API service functions (weather.ts with comprehensive endpoints)
│   └── query/         # TanStack Query configuration and query keys
├── types/              # TypeScript type definitions (weather.ts with comprehensive types)
├── utils/              # Utility functions (weather helpers, formatters)
├── constants/          # App constants and configuration (cities.ts with popular cities)
└── assets/            # Static assets (icons, images)
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Add proper error handling
- Write responsive CSS
- Test on multiple devices and browsers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Ant Design](https://ant.design/) for the UI components
- [Lucide React](https://lucide.dev/) for the icons
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styling
