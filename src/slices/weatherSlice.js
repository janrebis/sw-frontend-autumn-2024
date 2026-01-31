import { createSlice } from "@reduxjs/toolkit";
import { TEMPERATURE_UNITS } from "../constants/temperatureUnits";

const initialState = {
  temperatureUnits: TEMPERATURE_UNITS.CELSIUS,
  favorites: [], 
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTemperatureUnits(state, action) {
      if (TEMPERATURE_UNITS.isValid(action.payload)) {
        state.temperatureUnits = action.payload;
      }
    },

    toggleFavorite(state, action) {
      const cityId = action.payload;
      if (!cityId) return;

      const idx = state.favorites.indexOf(cityId);
      if (idx >= 0) state.favorites.splice(idx, 1);
      else state.favorites.push(cityId);
    },

    clearFavorites(state) {
      state.favorites = [];
    },
  },
});

export const { setTemperatureUnits, toggleFavorite, clearFavorites } =
  weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;