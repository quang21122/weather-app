import { Layout, Typography, Space, Divider } from "antd";
import { HeartFilled, GithubOutlined } from "@ant-design/icons";
import type { FooterProps } from "@/types";
import { cn } from "@/utils/styling";

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer: React.FC<FooterProps> = ({ className, showCredits = true }) => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      className={cn("glass-effect border-t border-white/20 mt-auto", className)}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(8px)",
        padding: "24px 24px 16px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {showCredits && (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              {/* Credits */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <Text className="text-white/80 text-sm">
                  Weather data provided by{" "}
                  <Link
                    href="https://openweathermap.org"
                    target="_blank"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    OpenWeatherMap
                  </Link>
                </Text>

                <Text className="text-white/60 text-xs hidden sm:block">•</Text>

                <Text className="text-white/80 text-sm">
                  Icons by{" "}
                  <Link
                    href="https://ant.design"
                    target="_blank"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    Ant Design
                  </Link>
                </Text>
              </div>

              {/* Social Links */}
              <Space size="large">
                <Link
                  href="https://github.com"
                  target="_blank"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <GithubOutlined className="text-lg" />
                </Link>
              </Space>
            </div>

            <Divider className="border-white/10 my-4" />
          </>
        )}

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <Text className="text-white/60 text-sm">
            © {currentYear} Weather App. All rights reserved.
          </Text>

          <div className="flex items-center space-x-1 text-white/60 text-sm">
            <Text className="text-white/60 text-sm">Made with</Text>
            <HeartFilled className="text-red-400 text-xs" />
            <Text className="text-white/60 text-sm">
              using React & Ant Design
            </Text>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
