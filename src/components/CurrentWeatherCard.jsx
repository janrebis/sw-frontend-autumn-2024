import "./cards.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { iconForWeatherCode } from "../utils/weatherIcons";
import { convertFromCelsius, formatTemp } from "../utils/temperature";

export const CurrentWeatherCard = ({ current }) => {
  const unit = useSelector((state) => state.weather.temperatureUnits);

  const temp = useMemo(() => {
    const v = convertFromCelsius(current.temperature_2m, unit);
    return formatTemp(v, unit === "K" ? 0 : 0);
  }, [current.temperature_2m, unit]);

  return (
    <div className="card current-card">
      <div className="current-row">
        <div className="big-icon">{iconForWeatherCode(current.weather_code)}</div>

        <div>
          <div className="temp">
            {temp}°{unit}
          </div>
          <div className="muted">Zachmurzenie: {current.cloud_cover}%</div>
          <div className="muted">
            Wiatr: {current.wind_speed_10m} km/h • kierunek {current.wind_direction_10m}°
          </div>
        </div>
      </div>
    </div>
  );
};