import "./cards.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../slices/weatherSlice.js";

export const CityCard = ({ city }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.weather.favorites);
  const isFav = favorites.includes(city.id);

  const onToggleFav = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    dispatch(toggleFavorite(city.id));
  };

  return (
    <Link className="card city-card link-reset" to={`/details/${city.id}`}>
      <button
        type="button"
        className={`fav-btn ${isFav ? "fav-btn--active" : ""}`}
        onClick={onToggleFav}
        aria-label={isFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        title={isFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      >
        {isFav ? "★" : "☆"}
      </button>

      <div className="city-name">{city.name}</div>
      <div className="muted">
        {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
      </div>
      <div className="cta">Zobacz szczegóły →</div>
    </Link>
  );
};