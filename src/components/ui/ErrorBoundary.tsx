import { Component, type ErrorInfo, type ReactNode } from "react";
import { Result, Button } from "antd";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full">
            <Result
              icon={
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
              }
              title="Something went wrong"
              subTitle="We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists."
              extra={[
                <Button
                  key="retry"
                  type="primary"
                  icon={<RefreshCw className="w-4 h-4" />}
                  onClick={this.handleReset}
                  className="mr-2"
                >
                  Try Again
                </Button>,
                <Button key="reload" onClick={this.handleReload}>
                  Reload Page
                </Button>,
              ]}
            />

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <summary className="cursor-pointer font-medium text-red-800 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-700 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
