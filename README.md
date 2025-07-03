# Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS.

## Features

- 🌤️ Current weather conditions
- 📅 7-day weather forecast
- 🔍 City search functionality
- 🌍 Popular cities quick access
- 📱 Responsive design (desktop & mobile)
- 🎨 Clean, modern UI with Ant Design components
- ⚡ Fast data fetching with TanStack Query
- 🔄 Real-time weather updates

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design
- **State Management**: TanStack Query (React Query)
- **Package Manager**: pnpm
- **Weather API**: OpenWeatherMap API

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

```
src/
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── ui/             # Reusable UI components
│   └── weather/        # Weather-specific components
├── lib/                # External service integrations
│   └── api/           # API service functions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # App constants and configuration
└── assets/            # Static assets
```

## API Integration

This app uses the OpenWeatherMap API for weather data:

- **Current Weather**: Real-time weather conditions for any location
- **5-Day Forecast**: Weather predictions with 3-hour intervals
- **Geocoding**: Location search and coordinate resolution
- **Reverse Geocoding**: Get location names from coordinates

### API Key Setup

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Generate an API key from your dashboard
3. Add the API key to your `.env` file:
   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

## Features in Detail

### 🌤️ Current Weather Display

- Real-time temperature and weather conditions
- "Feels like" temperature
- Humidity, wind speed, and atmospheric pressure
- Visibility and UV index
- Sunrise and sunset times
- Weather icons from OpenWeatherMap

### 📅 7-Day Weather Forecast

- Daily weather predictions
- High and low temperatures
- Weather conditions and icons
- Precipitation probability
- Wind speed information
- Summary statistics

### 🔍 Smart Location Search

- Autocomplete city search
- Support for city, state, and country
- Debounced search to reduce API calls
- Error handling for invalid locations

### 🌍 Popular Cities

- Quick access to major cities worldwide
- Real-time weather for each city
- One-click weather viewing
- Responsive city grid

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

- **Code Splitting**: Automatic chunk splitting for faster loading
- **Caching**: TanStack Query for intelligent data caching
- **Debouncing**: Search input debouncing to reduce API calls
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Optimized build with tree shaking

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

```
src/
├── components/          # React components
│   ├── layout/         # Layout components (AppLayout)
│   ├── ui/             # Reusable UI components (SearchBar, ErrorBoundary)
│   └── weather/        # Weather-specific components
├── hooks/              # Custom React hooks
├── lib/                # External service integrations
│   ├── api/           # API service functions
│   └── query/         # TanStack Query configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # App constants and configuration
└── assets/            # Static assets
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
