import React from "react";
import { Card, Button, Alert } from "antd";
import { RefreshCw, AlertTriangle, Wifi, Key } from "lucide-react";

interface ErrorDisplayProps {
  error: string | Error;
  onRetry?: () => void;
  type?: "weather" | "forecast" | "search" | "network";
  className?: string;
  title?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  className = "",
  title,
}) => {
  const errorMessage = typeof error === "string" ? error : error.message;

  // Determine error type and provide helpful messages
  const getErrorInfo = () => {
    if (
      errorMessage.includes("API key") ||
      errorMessage.includes("401") ||
      errorMessage.includes("403")
    ) {
      return {
        icon: <Key className="w-6 h-6 text-orange-500" />,
        title: "API Key Issue",
        description: "Please check your OpenWeatherMap API key configuration.",
        suggestion: "Make sure you have a valid API key in your .env file.",
        type: "warning" as const,
      };
    }

    if (
      errorMessage.includes("Network") ||
      errorMessage.includes("fetch") ||
      errorMessage.includes("timeout")
    ) {
      return {
        icon: <Wifi className="w-6 h-6 text-red-500" />,
        title: "Network Error",
        description: "Unable to connect to the weather service.",
        suggestion: "Please check your internet connection and try again.",
        type: "error" as const,
      };
    }

    if (
      errorMessage.includes("location") ||
      errorMessage.includes("geocoding")
    ) {
      return {
        icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
        title: "Location Error",
        description: "Unable to find the requested location.",
        suggestion:
          "Please try searching for a different city or check the spelling.",
        type: "warning" as const,
      };
    }

    return {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: title || "Error",
      description: errorMessage,
      suggestion:
        "Please try again or contact support if the problem persists.",
      type: "error" as const,
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <Card className={`weather-card ${className}`}>
      <div className="text-center py-8">
        <div className="mb-4">{errorInfo.icon}</div>

        <Alert
          message={errorInfo.title}
          description={
            <div className="space-y-2">
              <p>{errorInfo.description}</p>
              <p className="text-sm text-gray-600">{errorInfo.suggestion}</p>
            </div>
          }
          type={errorInfo.type}
          showIcon={false}
          className="mb-4"
        />

        {onRetry && (
          <Button
            type="primary"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={onRetry}
            className="flex items-center gap-2 mx-auto"
          >
            Try Again
          </Button>
        )}

        {import.meta.env.DEV && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              Debug Info (Development Only)
            </summary>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {typeof error === "string" ? error : error.stack}
            </pre>
          </details>
        )}
      </div>
    </Card>
  );
};
