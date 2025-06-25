import { Alert, Button, Typography } from "antd";
import {
  ExclamationCircleOutlined,
  ReloadOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ErrorMessageProps } from "@/types";
import { cn } from "@/utils/styling";

const { Text } = Typography;

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  showRetryButton = true,
  type = "error",
  className,
}) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <WarningOutlined />;
      case "info":
        return <InfoCircleOutlined />;
      case "error":
      default:
        return <ExclamationCircleOutlined />;
    }
  };

  const getAlertType = () => {
    switch (type) {
      case "warning":
        return "warning";
      case "info":
        return "info";
      case "error":
      default:
        return "error";
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Alert
        message={
          <div className="flex flex-col space-y-3">
            <div className="flex items-start space-x-2">
              {getIcon()}
              <Text className="flex-1">{message}</Text>
            </div>

            {onRetry && showRetryButton && (
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={onRetry}
                size="small"
                className="self-start"
              >
                Try Again
              </Button>
            )}
          </div>
        }
        type={getAlertType()}
        showIcon={false}
        className="rounded-xl border-0 shadow-lg"
        style={{
          background:
            type === "error"
              ? "rgba(239, 68, 68, 0.1)"
              : type === "warning"
              ? "rgba(245, 158, 11, 0.1)"
              : "rgba(59, 130, 246, 0.1)",
          backdropFilter: "blur(8px)",
        }}
      />
    </div>
  );
};

export default ErrorMessage;
