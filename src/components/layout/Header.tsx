import { Layout, Typography, Button, Space } from "antd";
import {
  SettingOutlined,
  EnvironmentOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import type { HeaderProps } from "@/types";
import { cn } from "@/utils/styling";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC<HeaderProps> = ({
  title,
  className,
  onSettingsClick,
  onLocationClick,
}) => {
  return (
    <AntHeader
      className={cn(
        "glass-effect sticky top-0 z-50 px-4 sm:px-6 lg:px-8",
        "border-b border-white/20 backdrop-blur-md",
        className
      )}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        height: "auto",
        lineHeight: "normal",
        padding: "16px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <CloudOutlined className="text-white text-lg" />
          </div>
          <Title
            level={3}
            className="!mb-0 !text-white font-bold tracking-tight"
            style={{ margin: 0, color: "white" }}
          >
            {title}
          </Title>
        </div>

        {/* Action Buttons */}
        <Space size="middle">
          {onLocationClick && (
            <Button
              type="text"
              icon={<EnvironmentOutlined />}
              onClick={onLocationClick}
              className="text-white hover:bg-white/10 border-white/20"
              style={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="hidden sm:inline">Location</span>
            </Button>
          )}

          {onSettingsClick && (
            <Button
              type="text"
              icon={<SettingOutlined />}
              onClick={onSettingsClick}
              className="text-white hover:bg-white/10 border-white/20"
              style={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="hidden sm:inline">Settings</span>
            </Button>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
