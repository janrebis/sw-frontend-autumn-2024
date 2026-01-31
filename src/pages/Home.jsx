import "./Home.css";
import { useCallback, useMemo, useState } from "react";
import { CITIES } from "../constants/cities";
import { CityCard } from "../components/CityCard";

export const Home = () => {
  const [query, setQuery] = useState("");

  const onChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CITIES;

    return CITIES.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const onClear = useCallback(() => setQuery(""), []);

  return (
    <div className="home">
      <h2 className="home-title">Wybierz miejscowość</h2>

      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <label className="search-label" htmlFor="citySearch">
          Wyszukaj miejscowość:
        </label>

        <div className="search-row">
          <input
            id="citySearch"
            className="search-input"
            type="text"
            placeholder="np. Warszawa..."
            value={query}
            onChange={onChange}
          />

          {query.trim() && (
            <button className="search-clear" type="button" onClick={onClear}>
              Wyczyść
            </button>
          )}
        </div>

        <div className="search-hint">
          {filteredCities.length === 0 ? (
            <span>Brak wyników dla: <b>{query}</b></span>
          ) : (
            <span>
              Wyniki: <b>{filteredCities.length}</b>
            </span>
          )}
        </div>
      </form>

      <div className="city-grid">
        {filteredCities.map((c) => (
          <CityCard key={c.id} city={c} />
        ))}
      </div>
    </div>
  );
};