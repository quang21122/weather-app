// Theme configuration for Ant Design
export const antdTheme = {
  token: {
    // Primary colors
    colorPrimary: '#0ea5e9', // sky-500
    colorPrimaryHover: '#0284c7', // sky-600
    colorPrimaryActive: '#0369a1', // sky-700
    
    // Background colors
    colorBgContainer: 'rgba(255, 255, 255, 0.9)',
    colorBgElevated: 'rgba(255, 255, 255, 0.95)',
    colorBgLayout: 'transparent',
    
    // Border radius
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    
    // Font
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    
    // Box shadow
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    boxShadowSecondary: '0 4px 16px rgba(0, 0, 0, 0.08)',
    
    // Motion
    motionDurationSlow: '0.3s',
    motionDurationMid: '0.2s',
    motionDurationFast: '0.1s',
  },
  components: {
    Card: {
      borderRadius: 16,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      headerBg: 'transparent',
      bodyPadding: 24,
    },
    Input: {
      borderRadius: 12,
      paddingBlock: 12,
      paddingInline: 16,
    },
    Button: {
      borderRadius: 8,
      fontWeight: 500,
      paddingBlock: 8,
      paddingInline: 16,
    },
    Modal: {
      borderRadius: 16,
      headerBg: 'rgba(255, 255, 255, 0.95)',
      contentBg: 'rgba(255, 255, 255, 0.95)',
    },
    Select: {
      borderRadius: 12,
    },
    Spin: {
      colorPrimary: '#0ea5e9',
    },
  },
};

// Tailwind CSS custom classes that work with Ant Design
export const customClasses = {
  // Glass morphism effects
  glass: 'bg-white/10 backdrop-blur-md border border-white/20',
  glassCard: 'bg-white/90 backdrop-blur-sm border border-white/20',
  
  // Gradient backgrounds
  gradientPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600',
  gradientSecondary: 'bg-gradient-to-br from-sky-400 to-blue-600',
  gradientBackground: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
  
  // Text gradients
  textGradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  
  // Shadows
  shadowSoft: 'shadow-lg shadow-blue-500/10',
  shadowGlow: 'shadow-xl shadow-blue-500/20',
  
  // Animations
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  bounceGentle: 'animate-bounce-gentle',
  
  // Layout
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSm: 'max-w-4xl mx-auto px-4 sm:px-6',
  
  // Responsive grid
  gridResponsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  gridCards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
};

// Weather condition color mappings
export const weatherColors = {
  clear: {
    primary: '#f59e0b', // amber-500
    secondary: '#fbbf24', // amber-400
    background: 'from-amber-400 to-orange-500',
  },
  clouds: {
    primary: '#6b7280', // gray-500
    secondary: '#9ca3af', // gray-400
    background: 'from-gray-400 to-gray-600',
  },
  rain: {
    primary: '#3b82f6', // blue-500
    secondary: '#60a5fa', // blue-400
    background: 'from-blue-400 to-blue-600',
  },
  snow: {
    primary: '#e5e7eb', // gray-200
    secondary: '#f3f4f6', // gray-100
    background: 'from-gray-200 to-gray-400',
  },
  thunderstorm: {
    primary: '#6366f1', // indigo-500
    secondary: '#818cf8', // indigo-400
    background: 'from-indigo-500 to-purple-600',
  },
  mist: {
    primary: '#8b5cf6', // violet-500
    secondary: '#a78bfa', // violet-400
    background: 'from-violet-400 to-purple-500',
  },
  default: {
    primary: '#0ea5e9', // sky-500
    secondary: '#38bdf8', // sky-400
    background: 'from-sky-400 to-blue-500',
  },
};

// Responsive breakpoints (matching Tailwind defaults)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
};
