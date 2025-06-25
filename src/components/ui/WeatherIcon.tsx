import type { WeatherIconProps } from "@/types";
import { getWeatherIconUrl, cn } from "@/utils/styling";

const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  size = 64,
  alt = "Weather icon",
  animated = true,
  className,
}) => {
  const iconUrl = getWeatherIconUrl(iconCode, size > 32 ? "4x" : "2x");

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        animated && "transition-transform duration-300 hover:scale-110",
        className
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={iconUrl}
        alt={alt}
        width={size}
        height={size}
        className={cn("object-contain", animated && "animate-bounce-gentle")}
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
        }}
        onError={(e) => {
          // Fallback to a default icon if the image fails to load
          const target = e.target as HTMLImageElement;
          target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNmMGY5ZmYiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxNiIgeT0iMTYiPgo8cGF0aCBkPSJNMTggMTBIMTlBMyAzIDAgMCAxIDIyIDEzQTMgMyAwIDAgMSAxOSAxNkg3QTUgNSAwIDAgMSA3IDZBNSA1IDAgMCAxIDEyIDJBNiA2IDAgMCAxIDE4IDEwWiIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+";
        }}
      />
    </div>
  );
};

export default WeatherIcon;
