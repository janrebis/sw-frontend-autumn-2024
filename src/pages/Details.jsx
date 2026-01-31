import "./Details.css";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CITIES } from "../constants/cities";
import { fetchForecast } from "../pages/openmeteo.js";
import { CurrentWeatherCard, ForecastCard } from "../components";

export const Details = () => {
  const { cityId } = useParams();
  const city = useMemo(() => CITIES.find((c) => c.id === cityId), [cityId]);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const loadForecast = useCallback(() => {
    if (!city) return;

    setError("");
    setData(null);

    fetchForecast(city)
      .then(setData)
      .catch((e) => setError(e?.message || "Błąd pobierania pogody"));
  }, [city]);

  useEffect(() => {
    loadForecast();
  }, [loadForecast]);

  if (!city) {
    return (
      <div className="details">
        <Link to="/" className="back-link">← Wróć</Link>
        <p>Nie znaleziono miejscowości.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details">
        <Link to="/" className="back-link">← Wróć</Link>
        <p>Błąd: {error}</p>
        <button className="btn" onClick={loadForecast} type="button">
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="details">
        <Link to="/" className="back-link">← Wróć</Link>
        <p>Ładowanie...</p>
      </div>
    );
  }

  const d = data.daily;

  return (
    <div className="details">
        <Link to="/" className="back-btn">
            <span className="back-arrow">←</span>
            <span>Wróć</span>
        </Link>

      <h2 className="details-title">{city.name}</h2>

      <CurrentWeatherCard current={data.current} />

      <div className="section-title">Prognoza na 5 dni</div>

      <div className="forecast-grid">
        {d.time.map((day, i) => (
          <ForecastCard
            key={day}
            day={day}
            weatherCode={d.weather_code[i]}
            tempMin={d.temperature_2m_min[i]}
            tempMax={d.temperature_2m_max[i]}
            precipProb={d.precipitation_probability_max?.[i] ?? 0}
            precipSum={d.precipitation_sum?.[i] ?? 0}
            rainSum={d.rain_sum?.[i] ?? 0}
            snowSum={d.snowfall_sum?.[i] ?? 0}
            windSpeed={d.wind_speed_10m_max[i]}
            windDir={d.wind_direction_10m_dominant[i]}
            cloudCover={d.cloud_cover_mean[i]}
          />
        ))}
      </div>
    </div>
  );
};