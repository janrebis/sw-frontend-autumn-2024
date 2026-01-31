import "./TemperatureUnitToogle.css";
import { useDispatch, useSelector } from "react-redux";
import { setTemperatureUnits } from "../slices/weatherSlice.js";
import { TEMPERATURE_UNITS } from "../constants/temperatureUnits";

export const TemperatureUnitToggle = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather.temperatureUnits);

  return (
    <div className="unit-toggle">
      <span className="unit-label">Jednostka:</span>

      <div className="unit-buttons">
        {TEMPERATURE_UNITS.getAll().map((u) => (
          <button
            key={u}
            className={`unit-btn ${unit === u ? "active" : ""}`}
            onClick={() => dispatch(setTemperatureUnits(u))}
            type="button"
          >
            °{u}
          </button>
        ))}
      </div>
    </div>
  );
};