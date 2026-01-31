import "./cards.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { iconForWeatherCode } from "../utils/weatherIcons";
import { convertFromCelsius, formatTemp } from "../utils/temperature";

export const ForecastCard = ({
  day,
  weatherCode,
  tempMin,
  tempMax,
  precipProb,
  precipSum,
  rainSum,
  snowSum,
  windSpeed,
  windDir,
  cloudCover,
}) => {
  const unit = useSelector((state) => state.weather.temperatureUnits);

  const minTxt = useMemo(() => formatTemp(convertFromCelsius(tempMin, unit), 0), [tempMin, unit]);
  const maxTxt = useMemo(() => formatTemp(convertFromCelsius(tempMax, unit), 0), [tempMax, unit]);

  const precipType = snowSum > 0 ? "śnieg" : rainSum > 0 ? "deszcz" : "brak";

  return (
    <div className="card forecast-card">
      <div className="forecast-top">
        <div className="forecast-day">
          <span className="small-icon">{iconForWeatherCode(weatherCode)}</span>
          <b>{day}</b>
        </div>
      </div>

      <div className="rows">
        <div>
          Temperatura: {minTxt}°{unit} – {maxTxt}°{unit}
        </div>
        <div>
          Opady: {precipProb}% • rodzaj: {precipType} • ilość: {precipSum} mm
        </div>
        <div>
          Wiatr: {windSpeed} km/h • kierunek: {windDir}°
        </div>
        <div>Zachmurzenie: {cloudCover}%</div>
      </div>
    </div>
  );
};