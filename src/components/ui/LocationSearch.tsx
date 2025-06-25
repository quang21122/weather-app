import { useState, useCallback } from "react";
import { Input, List, Card, Typography, Space } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { LocationSearchProps, LocationData } from "@/types";
import { cn, debounce } from "@/utils/styling";

const { Text } = Typography;

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  placeholder = "Search for a city...",
  loading = false,
  disabled = false,
  className,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock search function - replace with actual API call
  const searchLocations = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);

      try {
        // Mock data - replace with actual API call
        const mockResults: LocationData[] = [
          {
            name: "New York",
            country: "US",
            state: "New York",
            lat: 40.7128,
            lon: -74.006,
          },
          {
            name: "London",
            country: "GB",
            lat: 51.5074,
            lon: -0.1278,
          },
          {
            name: "Tokyo",
            country: "JP",
            lat: 35.6762,
            lon: 139.6503,
          },
          {
            name: "Paris",
            country: "FR",
            lat: 48.8566,
            lon: 2.3522,
          },
        ].filter((location) =>
          location.name.toLowerCase().includes(query.toLowerCase())
        );

        setSuggestions(mockResults);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error searching locations:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    searchLocations(value);
  };

  const handleLocationSelect = (location: LocationData) => {
    setSearchValue(location.name);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Input
        size="large"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={disabled || loading}
        prefix={<SearchOutlined className="text-gray-400" />}
        suffix={
          (isSearching || loading) && (
            <LoadingOutlined className="text-blue-500" />
          )
        }
        className="rounded-xl shadow-lg border-0"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <Card
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border-0 shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <List
            dataSource={suggestions}
            renderItem={(location) => (
              <List.Item
                className="cursor-pointer hover:bg-blue-50/50 transition-colors px-4 py-3 border-0"
                onClick={() => handleLocationSelect(location)}
              >
                <Space className="w-full">
                  <EnvironmentOutlined className="text-blue-500" />
                  <div className="flex-1">
                    <Text strong className="text-gray-800">
                      {location.name}
                    </Text>
                    {location.state && (
                      <Text className="text-gray-500 ml-1">
                        , {location.state}
                      </Text>
                    )}
                    <Text className="text-gray-500 ml-1">
                      , {location.country}
                    </Text>
                  </div>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default LocationSearch;
