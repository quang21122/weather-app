# Weather App 🌤️

A modern, responsive weather application built with React, TypeScript, Tailwind CSS, and Ant Design. Get real-time weather information for any location worldwide with a beautiful, intuitive interface.

## ✨ Features

- **Real-time Weather Data**: Current weather conditions and forecasts
- **Location Search**: Search for any city worldwide
- **Geolocation Support**: Use your current location automatically
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Beautiful glass-morphism design with smooth animations
- **TypeScript**: Full type safety and excellent developer experience
- **Accessible**: Built with accessibility best practices

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 + Ant Design 5
- **Package Manager**: pnpm
- **Code Quality**: ESLint + TypeScript strict mode

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer, Layout)
│   ├── ui/             # Generic UI components (LoadingSpinner, ErrorMessage, etc.)
│   └── weather/        # Weather-specific components (WeatherCard, etc.)
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── hooks/              # Custom React hooks
├── services/           # API services and data fetching
├── constants/          # App constants and configuration
└── assets/             # Static assets (images, icons)
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Build for production**

   ```bash
   pnpm build
   ```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎨 Design System

### Color Palette

- **Primary**: Sky blue (#0ea5e9)
- **Secondary**: Purple (#8b5cf6)
- **Background**: Gradient from blue to purple
- **Glass Effects**: Semi-transparent white with backdrop blur

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Cards**: Rounded corners with glass-morphism effect
- **Buttons**: Consistent styling with hover states
- **Inputs**: Rounded with backdrop blur
- **Icons**: Ant Design icons with custom weather icons

## 🌐 API Integration

The app is designed to work with the OpenWeatherMap API:

- **Current Weather**: Real-time weather data
- **Geocoding**: Location search and coordinates
- **Weather Icons**: Official OpenWeatherMap icons

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🔒 Type Safety

Full TypeScript implementation with:

- Strict mode enabled
- Comprehensive type definitions
- Path mapping for clean imports
- Interface definitions for all data structures

## 🎯 Performance

- **Vite**: Lightning-fast development and build
- **Code Splitting**: Automatic code splitting
- **Tree Shaking**: Unused code elimination
- **Optimized Images**: Responsive image loading

## 🧪 Testing

The project is set up for testing with:

- Component testing structure
- Type-safe test utilities
- Mock data for development

## 🚀 Deployment

The app is configured for static deployment:

- `output: 'export'` in Vite config
- Static file generation
- Compatible with Vercel, Netlify, GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data
- **Ant Design** for UI components
- **Tailwind CSS** for styling utilities
- **React Team** for the amazing framework
