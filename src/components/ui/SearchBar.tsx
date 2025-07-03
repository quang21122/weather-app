import React, { useState, useCallback, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useLocationSearch } from "@/hooks/useWeather";
import type { LocationSearchResult } from "@/types/weather";

// Simple debounce function
const debounce = (func: Function, delay: number) => {
  let timeoutId: number;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func.apply(null, args), delay);
  };
};

interface SearchBarProps {
  onLocationSelect: (location: LocationSearchResult) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onLocationSelect,
  className = "",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  // Debounce search input to avoid too many API calls
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchValue);
  }, [searchValue, debouncedSetSearch]);

  const { data: searchResults, isLoading } = useLocationSearch(
    debouncedSearchValue,
    debouncedSearchValue.length >= 2
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (value: string) => {
    const selectedLocation = searchResults?.find(
      (location) => `${location.name}, ${location.country}` === value
    );

    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      setSearchValue(value);
    }
  };

  const options =
    searchResults?.map((location) => ({
      value: `${location.name}, ${location.country}`,
      label: (
        <div
          className="flex items-center gap-3 py-2 px-1 rounded-lg hover:bg-primary-50/80
                      transition-colors duration-200 group"
        >
          <div
            className="p-1.5 bg-primary-100/60 rounded-lg group-hover:bg-primary-200/80
                        transition-colors duration-200"
          >
            <MapPin className="w-4 h-4 text-primary-600" />
          </div>
          <div className="flex-1">
            <div
              className="font-medium text-gray-800 group-hover:text-primary-700
                          transition-colors duration-200"
            >
              {location.name}
            </div>
            <div
              className="text-sm text-gray-500 group-hover:text-gray-600
                          transition-colors duration-200"
            >
              {location.state ? `${location.state}, ` : ""}
              {location.country}
            </div>
          </div>
        </div>
      ),
      location,
    })) || [];

  return (
    <div className={`relative group ${className}`}>
      <AutoComplete
        value={searchValue}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        className="w-full"
        size="large"
        notFoundContent={
          isLoading ? (
            <div className="flex items-center justify-center py-6 px-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100/60 rounded-lg">
                  <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                </div>
                <span className="text-gray-600 font-medium">
                  Searching locations...
                </span>
              </div>
            </div>
          ) : debouncedSearchValue.length >= 2 ? (
            <div className="text-center py-6 px-4">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-gray-500 font-medium">
                  No locations found
                </span>
                <span className="text-sm text-gray-400">
                  Try a different search term
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 px-4">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Search className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-gray-500 font-medium">
                  Start typing to search
                </span>
                <span className="text-sm text-gray-400">
                  Enter at least 2 characters
                </span>
              </div>
            </div>
          )
        }
      >
        <Input
          prefix={
            <div className="flex items-center">
              <Search className="w-4 h-4 text-primary-400 transition-colors duration-200" />
            </div>
          }
          className="search-input-modern"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(147, 197, 253, 0.3)",
            borderRadius: "16px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
      </AutoComplete>
    </div>
  );
};
