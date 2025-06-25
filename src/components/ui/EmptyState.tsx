import { Typography } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import type { EmptyStateProps } from "@/types";
import { cn } from "@/utils/styling";

const { Title, Text } = Typography;

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  const defaultIcon = (
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm">
      <CloudOutlined className="text-3xl text-white/60" />
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6",
        "min-h-[300px]",
        className
      )}
    >
      {icon || defaultIcon}

      <Title
        level={4}
        className="!text-white/90 !mb-2"
        style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px" }}
      >
        {title}
      </Title>

      {description && (
        <Text className="text-white/70 text-base mb-6 max-w-md">
          {description}
        </Text>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
