import { Card, Typography, Button, Row, Col, Divider, Space } from "antd";
import {
  ReloadOutlined,
  EyeOutlined,
  DashboardOutlined,
  CompassOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import type { WeatherCardProps } from "@/types";
import {
  cn,
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  formatPressure,
  formatVisibility,
  getWindDirection,
} from "@/utils/styling";
import WeatherIcon from "@/components/ui/WeatherIcon";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const { Title, Text } = Typography;

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  temperatureUnit = "celsius",
  speedUnit = "metric",
  showDetails = true,
  onRefresh,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <Card className={cn("weather-card relative", className)}>
        <LoadingSpinner text="Loading weather data..." overlay />
      </Card>
    );
  }

  const mainWeather = weather.weather[0];
  const temperature = formatTemperature(weather.main.temp, temperatureUnit);
  const feelsLike = formatTemperature(weather.main.feels_like, temperatureUnit);
  const windSpeed = formatWindSpeed(weather.wind.speed, speedUnit);
  const windDirection = getWindDirection(weather.wind.deg);

  return (
    <Card
      className={cn("weather-card relative overflow-hidden", className)}
      styles={{ body: { padding: "24px" } }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={3} className="!mb-1 text-gray-800">
            {weather.name}
          </Title>
          <Text className="text-gray-600">{weather.sys.country}</Text>
        </div>

        {onRefresh && (
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={onRefresh}
            className="text-gray-600 hover:text-blue-600"
          />
        )}
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <WeatherIcon
            iconCode={mainWeather.icon}
            size={80}
            alt={mainWeather.description}
          />
          <div>
            <Title level={1} className="!mb-0 text-4xl font-bold text-gray-800">
              {temperature}
            </Title>
            <Text className="text-gray-600 capitalize text-lg">
              {mainWeather.description}
            </Text>
          </div>
        </div>
      </div>

      {/* Feels Like */}
      <div className="mb-6">
        <Text className="text-gray-600">
          Feels like{" "}
          <span className="font-semibold text-gray-800">{feelsLike}</span>
        </Text>
      </div>

      {showDetails && (
        <>
          <Divider className="my-4" />

          {/* Weather Details */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex items-center space-x-2">
                  <CompassOutlined className="text-blue-500" />
                  <Text className="text-gray-600">Wind</Text>
                </div>
                <Text strong className="text-gray-800">
                  {windSpeed} {windDirection}
                </Text>
              </Space>
            </Col>

            <Col span={12}>
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex items-center space-x-2">
                  <CloudOutlined className="text-blue-500" />
                  <Text className="text-gray-600">Humidity</Text>
                </div>
                <Text strong className="text-gray-800">
                  {formatHumidity(weather.main.humidity)}
                </Text>
              </Space>
            </Col>

            <Col span={12}>
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex items-center space-x-2">
                  <DashboardOutlined className="text-blue-500" />
                  <Text className="text-gray-600">Pressure</Text>
                </div>
                <Text strong className="text-gray-800">
                  {formatPressure(weather.main.pressure)}
                </Text>
              </Space>
            </Col>

            <Col span={12}>
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex items-center space-x-2">
                  <EyeOutlined className="text-blue-500" />
                  <Text className="text-gray-600">Visibility</Text>
                </div>
                <Text strong className="text-gray-800">
                  {formatVisibility(weather.visibility, speedUnit)}
                </Text>
              </Space>
            </Col>
          </Row>

          {/* Temperature Range */}
          <Divider className="my-4" />
          <div className="flex items-center justify-between">
            <Text className="text-gray-600">High / Low</Text>
            <Text strong className="text-gray-800">
              {formatTemperature(weather.main.temp_max, temperatureUnit)} /{" "}
              {formatTemperature(weather.main.temp_min, temperatureUnit)}
            </Text>
          </div>
        </>
      )}
    </Card>
  );
};

export default WeatherCard;
