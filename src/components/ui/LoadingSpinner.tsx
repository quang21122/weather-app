import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { LoadingSpinnerProps } from "@/types";
import { cn } from "@/utils/styling";

const { Text } = Typography;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  text,
  overlay = false,
  className,
}) => {
  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return { fontSize: 16, textSize: "text-sm" };
      case "large":
        return { fontSize: 32, textSize: "text-lg" };
      case "medium":
      default:
        return { fontSize: 24, textSize: "text-base" };
    }
  };

  const { fontSize, textSize } = getSizeConfig();

  const spinnerIcon = (
    <LoadingOutlined style={{ fontSize, color: "#0ea5e9" }} spin />
  );

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-3",
        overlay && "min-h-[200px]",
        className
      )}
    >
      <Spin
        indicator={spinnerIcon}
        size={
          size === "small" ? "small" : size === "large" ? "large" : "default"
        }
      />
      {text && (
        <Text className={cn("text-white/80 font-medium", textSize)}>
          {text}
        </Text>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
