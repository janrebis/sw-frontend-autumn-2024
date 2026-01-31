export async function fetchForecast({ lat, lon }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone: "auto",
    forecast_days: "5",
    current: [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "cloud_cover",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "precipitation_sum",
      "rain_sum",
      "snowfall_sum",
      "wind_speed_10m_max",
      "wind_direction_10m_dominant",
      "cloud_cover_mean",
    ].join(","),
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Nie udało się pobrać danych pogodowych");
  return res.json();
}