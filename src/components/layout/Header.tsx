import React, { useState, useEffect } from "react";
import { Layout, Badge, Tooltip, Button } from "antd";
import { Cloud, Wifi, WifiOff, RefreshCw } from "lucide-react";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showDate?: boolean;
  showStatus?: boolean;
  onRefresh?: () => void;
  showRefresh?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  className = "",
  title = "Weather App",
  subtitle = "Real-time weather updates",
  showDate = true,
  showStatus = true,
  onRefresh,
  showRefresh = false,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const formatDate = (date: Date) => ({
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    short: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  const dateInfo = formatDate(currentTime);

  return (
    <AntHeader
      className={`
        bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-primary-700/20
        backdrop-blur-md border-b border-primary-300/30 shadow-lg
        transition-all duration-300 hover:from-primary-600/25 hover:via-purple-600/25 hover:to-primary-700/25
        hover:shadow-xl hover:border-primary-300/40
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Section */}
          <div className="flex items-center gap-4 group">
            {/* Animated Logo Container */}
            <div className="relative">
              <div
                className="p-3 bg-gradient-to-br from-primary-400/30 via-purple-400/25 to-primary-500/30
                            rounded-xl float-animation shadow-lg backdrop-blur-sm
                            border border-primary-300/40 ring-1 ring-white/20
                            group-hover:from-primary-400/40 group-hover:via-purple-400/35 group-hover:to-primary-500/40
                            group-hover:border-primary-300/50 group-hover:ring-white/30
                            transition-all duration-300 hover-lift"
              >
                <Cloud className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              {/* Enhanced glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-purple-500/30
                            rounded-xl blur-lg opacity-0 group-hover:opacity-60
                            transition-opacity duration-300 -z-10"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <h1
                className="text-lg sm:text-xl lg:text-2xl font-bold text-white
                           drop-shadow-lg tracking-tight leading-tight
                           group-hover:text-primary-50 transition-colors duration-200"
              >
                {title}
              </h1>
              <p
                className="text-xs sm:text-sm text-primary-100/90 font-medium hidden sm:block
                          group-hover:text-primary-50/95 transition-colors duration-200"
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* Status and Date Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Status Indicators */}
            {showStatus && (
              <div className="flex items-center gap-3">
                {/* Refresh Button */}
                {showRefresh && onRefresh && (
                  <Tooltip title="Refresh Weather Data">
                    <Button
                      type="text"
                      size="small"
                      icon={<RefreshCw className="w-4 h-4" />}
                      onClick={onRefresh}
                      className="text-primary-100/90 hover:text-white border-primary-300/30
                               hover:border-primary-200/50 hover:bg-primary-500/20
                               transition-all duration-200 backdrop-blur-sm"
                    />
                  </Tooltip>
                )}

                {/* Online Status */}
                <Tooltip title={isOnline ? "Connected" : "Offline"}>
                  <div className="flex items-center gap-2">
                    {isOnline ? (
                      <Wifi className="w-4 h-4 text-emerald-300 drop-shadow-sm" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-300 drop-shadow-sm" />
                    )}
                    <Badge
                      status={isOnline ? "success" : "error"}
                      className="hidden sm:block"
                    />
                  </div>
                </Tooltip>
              </div>
            )}

            {/* Date and Time Display */}
            {showDate && (
              <div className="flex flex-col items-end">
                {/* Desktop Date */}
                <div
                  className="text-xs sm:text-sm text-primary-50/95 font-medium hidden md:block
                              hover:text-white transition-colors duration-200 drop-shadow-sm"
                >
                  {dateInfo.full}
                </div>

                {/* Mobile Date */}
                <div className="text-xs text-primary-100/90 font-medium md:hidden drop-shadow-sm">
                  {dateInfo.short}
                </div>

                {/* Time */}
                <div
                  className="text-xs text-primary-200/80 font-mono hidden sm:block
                              hover:text-primary-100/95 transition-colors duration-200 drop-shadow-sm"
                >
                  {dateInfo.time}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r
                    from-transparent via-primary-300/40 to-transparent"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r
                    from-transparent via-white/20 to-transparent blur-sm"
      />
    </AntHeader>
  );
};
